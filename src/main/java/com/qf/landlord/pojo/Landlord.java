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
}
