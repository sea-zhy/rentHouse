package com.qf.landlord.service.Impl;

import com.qf.landlord.dao.LandlordMapper;
import com.qf.landlord.dao.PayMapper;
import com.qf.landlord.pay.PayParam;
import com.qf.landlord.service.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@Service
public class PayServiceImpl implements PayService {
    @Autowired
    PayMapper payMapper;
    @Autowired
    LandlordMapper landlordMapper;
    @Override
    public boolean addOrder(PayParam payParam) {
        return payMapper.addOrder(payParam)>0;
    }
}
