package com.qf.landlord.vo;

import com.qf.landlord.pojo.Contact;
import com.qf.landlord.pojo.Equipment;
import com.qf.landlord.pojo.Img;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class ShopInfoVO {
    private int id;
    private String provinceId;
    private String cityId;
    private String areaId;
    private String title;
    private int price;
    private String icon;
    private String shopType;
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
    private int lanId;
    private long upTime;
    private Contact contact;
    private List<Img> imgList = new ArrayList<>();
    private List<EquipmentVO> equipmentList = new ArrayList<>();

    public List<EquipmentVO> getEquipmentList() {
        return equipmentList;
    }

    public void setEquipmentList(List<EquipmentVO> equipmentList) {
        this.equipmentList = equipmentList;
    }
}
