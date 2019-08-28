package com.qf.house.pojo;

public class ImgInfo {
    int imgId;
    String img_url;
    int houseId;

    public int getImgId() {
        return imgId;
    }

    public void setImgId(int imgId) {
        this.imgId = imgId;
    }

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public int getHouseId() {
        return houseId;
    }

    public void setHouseId(int houseId) {
        this.houseId = houseId;
    }

    @Override
    public String toString() {
        return "ImgInfo{" +
                "imgId=" + imgId +
                ", img_url='" + img_url + '\'' +
                ", houseId=" + houseId +
                '}';
    }
}
