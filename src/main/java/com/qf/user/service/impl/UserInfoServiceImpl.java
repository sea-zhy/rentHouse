package com.qf.user.service.impl;

import com.qf.user.dao.UserInfoMapper;
import com.qf.user.pojo.Landlord;
import com.qf.user.pojo.UFHouse;
import com.qf.user.pojo.UserInfo;
import com.qf.user.pojo.UserLand;
import com.qf.user.service.UserInfoService;
import com.qf.user.toolkit.Md5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInfoServiceImpl implements UserInfoService {
    @Autowired
    UserInfoMapper userInfoMapper;

    //根据用户名和密码进行登录
    public UserInfo loginByUsernameAndPassword(UserInfo userInfo){
        String pwd = Md5.encodePassword(userInfo.getPassword());
        userInfo.setPassword(pwd);
       return userInfoMapper.loginByUsernameAndPassword(userInfo);
    }
    //判断用户名是否可用
    public boolean usernameIsExists(UserInfo userInfo){
        UserInfo userInfo1 = userInfoMapper.usernameIsExists(userInfo);
        if(userInfo1!=null){
            return true;
        }
        return false;
    }
    //注册
    public boolean register(UserInfo userInfo){
        String pwd = Md5.encodePassword(userInfo.getPassword());
        userInfo.setPassword(pwd);
        return userInfoMapper.register(userInfo)>0;
    }
    //关注房源
    public boolean addhouse(UFHouse ufHouse) {
        return userInfoMapper.addhouse(ufHouse)>0;
    }
    //根据UID查询信息initByUid
    public UserInfo initByUid(int uid){
        return userInfoMapper.initByUid(uid);
    }
    //修改个人信息changeByUid
    public boolean changeByUid(UserInfo userInfo){
        return userInfoMapper.changeByUid(userInfo)>0;
    }

    //根据uid查询关注的房产经里人initLandlord
    public List<Landlord> initLandlord(int uid){
        return userInfoMapper.initLandlord(uid);
    }
    //取消关注deleteLandlord
    public boolean deleteLandlord(UserLand userLand){
        return userInfoMapper.deleteLandlord(userLand)>0;
    }
}
