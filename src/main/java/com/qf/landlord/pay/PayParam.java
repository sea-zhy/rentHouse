package com.qf.landlord.pay;

import lombok.Data;

@Data
public class PayParam {
    public String out_trade_no ="234123423";
    //付款金额，必填
    public String total_amount ="0.01";
    //订单名称，必填
    public String subject = "测试商品";
    //商品描述，可空
    public String body ="sfdsdf";

}
