package com.qf.landlord.dto;

import com.qf.landlord.pojo.Contact;
import com.qf.landlord.pojo.Equipment;
import com.qf.landlord.pojo.Img;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ShopInfoDTO {
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
    private int status;
    private Contact contact;
    private List<Img> imgList = new ArrayList<>();
    private List<Equipment> equipmentList = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(String provinceId) {
        this.provinceId = provinceId;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getShopType() {
        return shopType;
    }

    public void setShopType(String shopType) {
        this.shopType = shopType;
    }

    public String getPay_type() {
        return pay_type;
    }

    public void setPay_type(String pay_type) {
        this.pay_type = pay_type;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getCrowd() {
        return crowd;
    }

    public void setCrowd(String crowd) {
        this.crowd = crowd;
    }

    public String getBusiness_type() {
        return business_type;
    }

    public void setBusiness_type(String business_type) {
        this.business_type = business_type;
    }

    public String getOperating_state() {
        return operating_state;
    }

    public void setOperating_state(String operating_state) {
        this.operating_state = operating_state;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getRentDate() {
        return rentDate;
    }

    public void setRentDate(String rentDate) {
        this.rentDate = rentDate;
    }

    public int getLanId() {
        return lanId;
    }

    public void setLanId(int lanId) {
        this.lanId = lanId;
    }

    public long getUpTime() {
        return upTime;
    }

    public void setUpTime(long upTime) {
        this.upTime = upTime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public List<Img> getImgList() {
        return imgList;
    }

    public void setImgList(List<Img> imgList) {
        this.imgList = imgList;
    }

    public List<Equipment> getEquipmentList() {
        return equipmentList;
    }

    public void setEquipmentList(List<Equipment> equipmentList) {
        this.equipmentList = equipmentList;
    }
}
