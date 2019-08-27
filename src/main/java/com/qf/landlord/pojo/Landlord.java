package com.qf.landlord.pojo;

import lombok.Data;

@Data
public class Landlord {
    private int landId;
    private String landName;
    private String password;
    private String account;
    private String email;
    private String mobile;
    private String icon;
    private String landType;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getLandId() {
        return landId;
    }

    public void setLandId(int landId) {
        this.landId = landId;
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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getLandType() {
        return landType;
    }

    public void setLandType(String landType) {
        this.landType = landType;
    }
}
