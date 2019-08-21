package com.qf.landlord.dao;

import com.qf.landlord.pay.PayParam;

public interface PayMapper {

    int addOrder(PayParam payParam);
    PayParam getOneOrder(int i);
}
