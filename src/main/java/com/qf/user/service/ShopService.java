package com.qf.user.service;


import com.qf.landlord.pojo.Landlord;

public interface ShopService {

    //根据用户名和密码进行登录loginByLandNameAndP
    public Landlord loginByLandNameAndP(Landlord landlord);
    //判断用户名是否可用landNameIsExists
    public boolean landNameIsExists(Landlord landlord);
    //注册registerLandlord
    public boolean registerLandlord(Landlord landlord);
}
