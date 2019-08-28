package com.qf.house.VO;

public class FacilitiesVO {
    int facId;
    String facName;

    public int getFacId() {
        return facId;
    }

    public void setFacId(int facId) {
        this.facId = facId;
    }

    public String getFacName() {
        return facName;
    }

    public void setFacName(String facName) {
        this.facName = facName;
    }

    @Override
    public String toString() {
        return "FacilitiesVO{" +
                "facId=" + facId +
                ", facName='" + facName + '\'' +
                '}';
    }
}
