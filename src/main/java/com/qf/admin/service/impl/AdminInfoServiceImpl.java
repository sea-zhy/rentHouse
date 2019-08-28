package com.qf.admin.service.impl;

import com.qf.admin.dao.AdminInfoDAO;
import com.qf.admin.pojo.AdminInfo;
import com.qf.admin.pojo.RentHouseInfo;
import com.qf.admin.pojo.ShopInfo;
import com.qf.admin.pojo.UserInfo;
import com.qf.admin.service.AdminInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by  2019/8/16
 */
@Service
public class AdminInfoServiceImpl implements AdminInfoService {
    @Autowired
    AdminInfoDAO adminInfoDAO;

    /**
     * 管理员登录检测
     *
     * @param adminInfo
     * @return
     */
    public AdminInfo loginCheckByAdminInfo(AdminInfo adminInfo) {
//        登录加密
       return adminInfoDAO.loginCheckByAdminInfo(adminInfo);
    }

    /**
     * 获取所有用户信息
     *
     * @return
     */
    public List<UserInfo> listUserInfo() {
        return adminInfoDAO.listUserInfo();
    }

    /**
     * 根据id来获取用户的详细信息
     *
     * @param uid
     * @return
     */
    public UserInfo getUserInfoById(int uid) {
        return adminInfoDAO.getUserInfoById(uid);
    }

    /**
     * 通过用户的ID来进行修改用户的信息操作
     *
     * @param userInfo
     * @return
     */
    public boolean editUserInfoById(UserInfo userInfo) {
        return adminInfoDAO.editUserInfoById(userInfo) > 0;
    }

    /**
     * 根据用户id来删除信息
     *
     * @param userInfo
     * @return
     */
    public boolean deleteUserById(UserInfo userInfo) {
        return adminInfoDAO.deleteUserById(userInfo) > 0;
    }

    /**
     * 获取所有租房信息
     *
     * @return
     */
    public List<RentHouseInfo> listRentHouseInfo() {
     //   System.out.println("====");
        //System.out.println(adminInfoDAO.listRentHouseInfo());
       // System.out.println("111111");
        return adminInfoDAO.listRentHouseInfo();
    }

    /**
     * 根据id来修改租房信息信息
     *
     * @param rentHouseInfo
     * @return
     */
    public boolean editRentHouseInfoById(RentHouseInfo rentHouseInfo) {
        return adminInfoDAO.editRentHouseInfoById(rentHouseInfo) > 0;
    }

    /**
     * 根据id来删除租房信息
     *
     * @param rentHouseInfo
     * @return
     */
    public boolean deleteRentHouseInfoById(RentHouseInfo rentHouseInfo) {
        return adminInfoDAO.deleteRentHouseInfoById(rentHouseInfo) > 0;
    }

    /**
     * 管理员获取所有商铺信息
     *
     * @return
     */
    public List<ShopInfo> listShopInfo() {
        return adminInfoDAO.listShopInfo();
    }

    /**
     * 根据id来修改商铺的信息
     *
     * @param shopInfo
     * @return
     */
    public boolean editShopInfoById(ShopInfo shopInfo) {
        return adminInfoDAO.editShopInfoById(shopInfo) > 0;
    }

    /**
     * 根据id来删除商铺信息
     *
     * @param shopInfo
     * @return
     */
    public boolean deleteShopInfoById(ShopInfo shopInfo) {
        return adminInfoDAO.deleteShopInfoById(shopInfo) > 0;
    }

    /**
     * 根据商户的id来获取详细信息
     *
     * @param houseId
     * @return
     */
    public RentHouseInfo listRentHouseInfoById(int houseId) {
        return adminInfoDAO.listRentHouseInfoById(houseId);
    }

    /**
     * 根据商铺的id来获取商铺的详细信息
     *
     * @param id
     * @return
     */
    public ShopInfo listShopInfoById(int id) {
        return adminInfoDAO.listShopInfoById(id);
    }
    /**
     * 鼠标拖离后立马检测 管理员的名字是否已经存在
     * @param adminInfo
     * @return
     */
    public boolean loginCheckUserName(AdminInfo adminInfo) {
        boolean flag = false;
        int i = adminInfoDAO.loginCheckUserName(adminInfo);
        if(i==1){
            flag = true;
        }else{
            flag=false;
        }
        return  flag;
    }

}
