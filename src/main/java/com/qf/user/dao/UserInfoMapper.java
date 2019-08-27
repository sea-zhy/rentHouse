package com.qf.user.dao;


import com.qf.user.pojo.Landlord;
import com.qf.user.pojo.UFHouse;
import com.qf.user.pojo.UserInfo;
import com.qf.user.pojo.UserLand;

import java.util.List;

public interface UserInfoMapper {
    //根据用户名和密码进行登录
    public UserInfo loginByUsernameAndPassword(UserInfo userInfo);
    //判断用户名是否可用
    public UserInfo usernameIsExists(UserInfo userInfo);
    //注册
    public int register(UserInfo userInfo);
    //关注房源
    public int addhouse(UFHouse ufHouse);
    //根据UID查询信息initByUid
    public UserInfo initByUid(int uid);
    //修改个人信息changeByUid
    public int changeByUid(UserInfo userInfo);
    //根据uid查询关注的房产经里人initLandlord
    public List<Landlord>  initLandlord(int uid);
    //取消关注deleteLandlord
    public int deleteLandlord(UserLand userLand);

}
