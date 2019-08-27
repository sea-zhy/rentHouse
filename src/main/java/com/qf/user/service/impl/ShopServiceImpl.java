package com.qf.user.service.impl;

import com.qf.user.dao.ShopMapper;
import com.qf.user.pojo.Landlord;
import com.qf.user.service.ShopService;
import com.qf.user.toolkit.Md5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopServiceImpl implements ShopService {
    @Autowired
    ShopMapper shopMapper;
    //根据用户名和密码进行登录loginByLandNameAndP
    public Landlord loginByLandNameAndP(Landlord landlord){
        String pwd = Md5.encodePassword(landlord.getPassword());
        landlord.setPassword(pwd);
        return shopMapper.loginByLandNameAndP(landlord);
    }
    //判断用户名是否可用landNameIsExists
    public boolean landNameIsExists(Landlord landlord){
        Landlord landlord1 = shopMapper.landNameIsExists(landlord);
        if(landlord1!=null){
            return true;
        }
        return false;
    }
    //注册registerLandlord
    public boolean registerLandlord(Landlord landlord){
        String pwd = Md5.encodePassword(landlord.getPassword());
        landlord.setPassword(pwd);
        return shopMapper.registerLandlord(landlord)>0;
    }
}
