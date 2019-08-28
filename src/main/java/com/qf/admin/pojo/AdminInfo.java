package com.qf.admin.pojo;

import java.util.List;

/**
 * Created by  2019/8/16
 */

public class AdminInfo {
    int id;
    String adname;
    String password;
    String email;
    String mobile;
    String account;
    String icon;
    int status;
    String areacode;
    List<UserInfo> userInfoList;
    List<MerchantsInfo> merchantsInfoList;
    List<RentHouseInfo> rentHouseInfoList;
    List<ShopInfo> shopInfoList;

    @Override
    public String toString() {
        return "AdminInfo{" +
                "id=" + id +
                ", adname='" + adname + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", account='" + account + '\'' +
                ", icon='" + icon + '\'' +
                ", status=" + status +
                ", areacode='" + areacode + '\'' +
                ", userInfoList=" + userInfoList +
                ", merchantsInfoList=" + merchantsInfoList +
                ", rentHouseInfoList=" + rentHouseInfoList +
                ", shopInfoList=" + shopInfoList +
                '}';
    }

    public List<ShopInfo> getShopInfoList() {
        return shopInfoList;
    }

    public void setShopInfoList(List<ShopInfo> shopInfoList) {
        this.shopInfoList = shopInfoList;
    }

    public List<RentHouseInfo> getRentHouseInfoList() {
        return rentHouseInfoList;
    }

    public void setRentHouseInfoList(List<RentHouseInfo> rentHouseInfoList) {
        this.rentHouseInfoList = rentHouseInfoList;
    }

    public List<MerchantsInfo> getMerchantsInfoList() {
        return merchantsInfoList;
    }

    public void setMerchantsInfoList(List<MerchantsInfo> merchantsInfoList) {
        this.merchantsInfoList = merchantsInfoList;
    }

    public List<UserInfo> getUserInfoList() {
        return userInfoList;
    }

    public void setUserInfoList(List<UserInfo> userInfoList) {
        this.userInfoList = userInfoList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAdname() {
        return adname;
    }

    public void setAdname(String adname) {
        this.adname = adname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getAreacode() {
        return areacode;
    }

    public void setAreacode(String areacode) {
        this.areacode = areacode;
    }

}
