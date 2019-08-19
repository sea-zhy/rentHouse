package com.qf.landlord.dto;

import com.qf.landlord.pojo.Contact;
import com.qf.landlord.pojo.Equipment;
import com.qf.landlord.pojo.Img;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ShopInfoDTO {
    public int id;
    private String title;
    private String price;
    private String icon;
    private String type;
    private String pay_type;
    private String floor;
    private String area;
    private String info;
    private String crowd;
    private String business_type;
    private String operating_state;
    private String specification;
    private String property;
    private String rentDate;
    private int address_id;
    private int lanId;
    private long upTime;
    private Contact contact;
    private List<Img> imgList = new ArrayList<>();
    private List<Equipment> equipmentList = new ArrayList<>();
}
