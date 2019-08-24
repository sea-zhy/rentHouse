package com.qf.landlord.service.Impl;

import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.qf.landlord.dao.PayMapper;
import com.qf.landlord.pay.AlipayConfig;
import com.qf.landlord.pojo.OrderForm;
import com.qf.landlord.service.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.UUID;

@Service
public class PayServiceImpl implements PayService {
    @Autowired
    PayMapper payMapper;

    @Override
    public String payStart(OrderForm orderForm) {
        //获得初始化的AlipayClient
        AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, AlipayConfig.app_id, AlipayConfig.merchant_private_key, "json", AlipayConfig.charset, AlipayConfig.alipay_public_key, AlipayConfig.sign_type);
        //设置请求参数
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl(AlipayConfig.return_url);
        alipayRequest.setNotifyUrl(AlipayConfig.notify_url);
        //商户订单号，商户网站订单系统中唯一订单号，必填
        String out_trade_no = String.valueOf(orderForm.getOut_trade_no());
        //付款金额，必填
        String total_amount = String.valueOf(orderForm.getTotal_amount()*0.01);
        //订单名称，必填
        String subject = orderForm.getSubject();
        //商品描述，可空
        //String body = orderForm.getBody();
        String result=null;
        try {
            alipayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","
                    + "\"total_amount\":\""+ total_amount +"\","
                    + "\"subject\":\""+ subject +"\","
                    + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");
            //请求
            result = alipayClient.pageExecute(alipayRequest).getBody();
            //输出 pay页面取出
            return result;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public OrderForm generateOrder(OrderForm orderForm) {
        long createTime = System.currentTimeMillis();
        orderForm.setCreateTime(createTime);
        long upTime = System.currentTimeMillis()+orderForm.getDayNum()*3600*24;
        orderForm.setUpTime(upTime);
        int total_amount = orderForm.getTotal_amount()*100;
        orderForm.setTotal_amount(total_amount);
        String out_trade_no = System.currentTimeMillis()+UUID.randomUUID().toString();
        orderForm.setOut_trade_no(out_trade_no);
        if(payMapper.addOrder(orderForm)>0){
            return orderForm;
        }
        return null;
    }

    @Transactional
    public boolean editUpTimeStatus(String out_trade_no) {
        OrderForm orderForm = payMapper.getOrderForm(out_trade_no);
        boolean flg =false;
        if(orderForm.getHouseId()!=0){
            flg = payMapper.editHouseStatus(orderForm)>0;
        }else if(orderForm.getShopId()!=0){
            flg = payMapper.editShopStatus(orderForm)>0;
        }
        return flg;
    }
}
