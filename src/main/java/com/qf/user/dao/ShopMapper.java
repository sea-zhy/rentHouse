package com.qf.user.dao;


import com.qf.landlord.pojo.Landlord;
import com.qf.user.pojo.UserLand;

public interface ShopMapper {
    //根据用户名和密码进行登录loginByLandNameAndP
    public Landlord loginByLandNameAndP(Landlord landlord);
    //判断用户名是否可用landNameIsExists
    public Landlord landNameIsExists(Landlord landlord);
    //注册registerLandlord
    public int registerLandlord(Landlord landlord);
    public int addUserLandFocus(UserLand userLand);
}
