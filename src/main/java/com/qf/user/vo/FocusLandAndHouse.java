package com.qf.user.vo;

import lombok.Data;

@Data
public class FocusLandAndHouse {
    private int landid;
    private int uid;
    private int Houseid;

    public int getLandid() {
        return landid;
    }

    public void setLandid(int landid) {
        this.landid = landid;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getHouseid() {
        return Houseid;
    }

    public void setHouseid(int houseid) {
        Houseid = houseid;
    }
}
