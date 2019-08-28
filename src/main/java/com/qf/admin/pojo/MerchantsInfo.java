package com.qf.admin.pojo;

/**
 * Created by  2019/8/16
 */

public class MerchantsInfo {
    int landid;
    String landName;
    String password;
    String account;
    String email;
    String mobile;
    String icon;
    String landtype;

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getLandtype() {
        return landtype;
    }

    public void setLandtype(String landtype) {
        this.landtype = landtype;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public int getLandid() {
        return landid;
    }

    public void setLandid(int landid) {
        this.landid = landid;
    }

    public String getLandName() {
        return landName;
    }

    public void setLandName(String landName) {
        this.landName = landName;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
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

    @Override
    public String toString() {
        return "MerchantsInfo{" +
                "landid=" + landid +
                ", landName='" + landName + '\'' +
                ", password='" + password + '\'' +
                ", account='" + account + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", icon='" + icon + '\'' +
                ", landtype='" + landtype + '\'' +
                '}';
    }
}
