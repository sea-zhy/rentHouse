package com.qf.landlord.service;

import com.qf.landlord.pay.PayParam;
import org.springframework.http.HttpRequest;

import javax.servlet.http.HttpServletRequest;

public interface PayService {
    boolean addOrder(PayParam payParam);
}
