package com.qf.admin.service;

import com.qf.admin.pojo.AdminInfo;
import com.qf.admin.pojo.RentHouseInfo;
import com.qf.admin.pojo.ShopInfo;
import com.qf.admin.pojo.UserInfo;


import java.util.List;

/**
 * Created by  2019/8/16
 */

public interface AdminInfoService {
    /**
     * 登录检查
     * @param adminInfo
     * @return
     */
    public AdminInfo loginCheckByAdminInfo(AdminInfo adminInfo);

    /**
     * 根据用户id来获得用户对的详细信息
     * @param uid
     * @return
     */
    public UserInfo getUserInfoById(int uid);
    /**
     * 获取所有用户的信息
     * @return
     */
    public List<UserInfo> listUserInfo();

    /**
     * 通过用户的id来修改用户的相关信息
     * @param userInfo
     * @return
     */
    public boolean editUserInfoById(UserInfo userInfo);

    /**
     * 根据用户uid来实现删除功能
     * @param userInfo
     * @return
     */
    public boolean deleteUserById(UserInfo userInfo);

    /**
     * 获取所有租房信息
     * @return
     */
    public List<RentHouseInfo> listRentHouseInfo();
    /**
     * 根据id来修改租房信息信息
     * @param rentHouseInfo
     * @return
     */
    public boolean editRentHouseInfoById(RentHouseInfo rentHouseInfo);

    /**
     * 根据id来删除租房信息
     * @param rentHouseInfo
     * @return
     */
    public boolean deleteRentHouseInfoById(RentHouseInfo rentHouseInfo);

    /**
     * 获取所有商铺信息
     * @return
     */
    public List<ShopInfo> listShopInfo();
    /**
     * 根据id来修改商铺信息
     * @param shopInfo
     * @return
     */
    public boolean editShopInfoById(ShopInfo shopInfo);

    /**
     * 根据id来删除商铺信息
     * @param shopInfo
     * @return
     */
    public boolean deleteShopInfoById(ShopInfo shopInfo);

    /***
     * 根据商户的ID来获取商户的详细信息
     * @param houseId
     * @return
     */
    public RentHouseInfo listRentHouseInfoById(int houseId);

    /**
     * 根据商铺的id来获取商户的详细信息
     * @param id
     * @return
     */
    public ShopInfo listShopInfoById(int id);

    /**
     * 鼠标脱离后 立即检测管理员的名字是否已存在
     * @param adminInfo
     * @return
     */
    public boolean loginCheckUserName(AdminInfo adminInfo);

}
