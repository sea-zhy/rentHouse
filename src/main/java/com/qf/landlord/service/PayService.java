package com.qf.landlord.service;

import com.qf.landlord.pay.PayParam;
import com.qf.landlord.pojo.OrderForm;
import org.springframework.http.HttpRequest;

import javax.servlet.http.HttpServletRequest;

public interface PayService {
    String payStart(OrderForm orderForm);
    OrderForm generateOrder(OrderForm orderForm);
    boolean editUpTimeStatus(String out_trade_no);
}
