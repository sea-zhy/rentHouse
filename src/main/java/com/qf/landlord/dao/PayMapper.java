package com.qf.landlord.dao;

import com.qf.landlord.pay.PayParam;
import com.qf.landlord.pojo.OrderForm;

public interface PayMapper {

    int addOrder(OrderForm orderForm);
    OrderForm getOrderForm(String getOrderForm);
    int editHouseStatus(OrderForm orderForm);
    int editShopStatus(OrderForm orderForm);
}
