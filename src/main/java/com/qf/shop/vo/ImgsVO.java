package com.qf.shop.vo;

public class ImgsVO {
    String img_url;

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    @Override
    public String toString() {
        return "ImgsVO{" +
                "img_url='" + img_url + '\'' +
                '}';
    }
}
