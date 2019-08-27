package com.qf.landlord.dto;

import com.qf.landlord.pojo.Contact;
import com.qf.landlord.pojo.Facilities;
import com.qf.landlord.pojo.Img;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class HouseDTO {
    private int houseId;
    private String provinceId;
    private String cityId;
    private String areaId;
    private int lanId;
    private String community;
    private int build;
    private int unit;
    private int num;
    private int room;
    private int hall;
    private int toilet;
    private int level;
    private int allLevel;
    private String elevator;
    private int area;
    private String housingType;
    private String decorate;
    private String toward;
    private int rent;
    private String payType;
    private String roomType;
    private String roomToward;
    private String roommate;
    private int roomArea;
    private String title;
    private String info;
    private int status;
    private long upTime;
    private Contact contact;
    private List<Img> imgList = new ArrayList<>();
    private List<Facilities> facilitiesList = new ArrayList<>();

    public int getHouseId() {
        return houseId;
    }

    public void setHouseId(int houseId) {
        this.houseId = houseId;
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

    public int getLanId() {
        return lanId;
    }

    public void setLanId(int lanId) {
        this.lanId = lanId;
    }

    public String getCommunity() {
        return community;
    }

    public void setCommunity(String community) {
        this.community = community;
    }

    public int getBuild() {
        return build;
    }

    public void setBuild(int build) {
        this.build = build;
    }

    public int getUnit() {
        return unit;
    }

    public void setUnit(int unit) {
        this.unit = unit;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public int getRoom() {
        return room;
    }

    public void setRoom(int room) {
        this.room = room;
    }

    public int getHall() {
        return hall;
    }

    public void setHall(int hall) {
        this.hall = hall;
    }

    public int getToilet() {
        return toilet;
    }

    public void setToilet(int toilet) {
        this.toilet = toilet;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getAllLevel() {
        return allLevel;
    }

    public void setAllLevel(int allLevel) {
        this.allLevel = allLevel;
    }

    public String getElevator() {
        return elevator;
    }

    public void setElevator(String elevator) {
        this.elevator = elevator;
    }

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }

    public String getHousingType() {
        return housingType;
    }

    public void setHousingType(String housingType) {
        this.housingType = housingType;
    }

    public String getDecorate() {
        return decorate;
    }

    public void setDecorate(String decorate) {
        this.decorate = decorate;
    }

    public String getToward() {
        return toward;
    }

    public void setToward(String toward) {
        this.toward = toward;
    }

    public int getRent() {
        return rent;
    }

    public void setRent(int rent) {
        this.rent = rent;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getRoomToward() {
        return roomToward;
    }

    public void setRoomToward(String roomToward) {
        this.roomToward = roomToward;
    }

    public String getRoommate() {
        return roommate;
    }

    public void setRoommate(String roommate) {
        this.roommate = roommate;
    }

    public int getRoomArea() {
        return roomArea;
    }

    public void setRoomArea(int roomArea) {
        this.roomArea = roomArea;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getUpTime() {
        return upTime;
    }

    public void setUpTime(long upTime) {
        this.upTime = upTime;
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

    public List<Facilities> getFacilitiesList() {
        return facilitiesList;
    }

    public void setFacilitiesList(List<Facilities> facilitiesList) {
        this.facilitiesList = facilitiesList;
    }
}
