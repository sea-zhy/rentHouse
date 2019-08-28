package com.qf.admin.dao;

import com.qf.admin.pojo.AdminInfo;
import com.qf.admin.pojo.RentHouseInfo;
import com.qf.admin.pojo.ShopInfo;
import com.qf.admin.pojo.UserInfo;

import java.util.List;

/**
 * Created by  2019/8/16
 */

public interface AdminInfoDAO {

    /**
     * 管理员登录检测
     * @param
     * @return
     */
    public AdminInfo loginCheckByAdminInfo(AdminInfo adminInfo);

    /**
     * 获取用户所有信息
     * @param
     * @return
     */
    public List<UserInfo> listUserInfo();
    /**
     * 根据用户uid来修改用户信息
     * @param userInfo
     * @return
     */
    public int editUserInfoById(UserInfo userInfo);

    /**
     * 根据用户ID来获取用户的详细信息
     * @param uid
     * @return
     */
    public UserInfo getUserInfoById(int uid);
    /**
     * 根据用户uid来进行删除用户信息
     * @param userInfo
     * @return
     */
    public int deleteUserById(UserInfo userInfo);

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
    public int editRentHouseInfoById(RentHouseInfo rentHouseInfo);

    /**
     * 根据id来删除租房信息
     * @param rentHouseInfo
     * @return
     */
    public int deleteRentHouseInfoById(RentHouseInfo rentHouseInfo);
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
    public int editShopInfoById(ShopInfo shopInfo);

    /**
     * 根据id来删除商铺信息
     * @param shopInfo
     * @return
     */
    public int deleteShopInfoById(ShopInfo shopInfo);

    /**
     * 根据商户ID来获取详细信息
     * @param houseId
     * @return
     */
    public RentHouseInfo listRentHouseInfoById(int houseId);

    /**
     * 根据ID来获取商铺的详细信息
     * @param id
     * @return
     */
    public ShopInfo listShopInfoById(int id);

    /**
     * 鼠标拖离后 立即检测管理员的账户是否已经存在
     * @param adminInfo
     * @return
     */
    public int loginCheckUserName(AdminInfo adminInfo);
}
