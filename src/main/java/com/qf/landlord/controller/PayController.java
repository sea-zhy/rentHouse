package com.qf.landlord.controller;

import com.alipay.api.internal.util.AlipaySignature;
import com.qf.landlord.pay.AlipayConfig;
import com.qf.landlord.pojo.OrderForm;
import com.qf.landlord.service.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Controller
public class PayController {
    @Autowired
    PayService payService;

    @RequestMapping("payResult/return_url")
    public String index(HttpServletRequest request){
        try {
            /* *
             * 功能：支付宝服务器同步通知页面
             * 日期：2017-03-30
             * 说明：
             * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
             * 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
             *************************页面功能说明*************************
             * 该页面仅做页面展示，业务逻辑处理请勿在该页面执行
             */
            //获取支付宝GET过来反馈信息
            Map<String,String> params = new HashMap<String,String>();
            Map<String,String[]> requestParams = request.getParameterMap();
            for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
                String name = (String) iter.next();
                String[] values = (String[]) requestParams.get(name);
                String valueStr = "";
                for (int i = 0; i < values.length; i++) {
                    valueStr = (i == values.length - 1) ? valueStr + values[i]
                            : valueStr + values[i] + ",";
                }
                //乱码解决，这段代码在出现乱码时使用
                valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
                params.put(name, valueStr);
            }
            // 验签
            boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key, AlipayConfig.charset, AlipayConfig.sign_type); //调用SDK验证签名
            //——请在这里编写您的程序（以下代码仅作参考）——
            if(signVerified) {
                //商户订单号
                String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");
                //支付宝交易号
                String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");
                //付款金额
                String total_amount = new String(request.getParameter("total_amount").getBytes("ISO-8859-1"),"UTF-8");
                // 修改订单号的状态

                //out.println("trade_no:"+trade_no+"<br/>out_trade_no:"+out_trade_no+"<br/>total_amount:"+total_amount);
                request.setAttribute("reuslt", "trade_no:"+trade_no+"<br/>out_trade_no:"+out_trade_no+"<br/>total_amount:"+total_amount);
                boolean flg = payService.editUpTimeStatus(out_trade_no);
                if(flg){
                    return "landlord";
                }else{
                    return "payResult";
                }
            }else {
                //out.println("验签失败");
                return "payResult";
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "payResult";
        }
        //——请在这里编写您的程序（以上代码仅作参考）——

    }

    @ResponseBody
    @RequestMapping("generateOrder")
    public Object generateOrder(@RequestBody OrderForm orderForm){
        OrderForm orderFormNew = payService.generateOrder(orderForm);
        String result = payService.payStart(orderFormNew);
        return result;
    }
}
