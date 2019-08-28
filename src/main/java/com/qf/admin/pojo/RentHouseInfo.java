package com.qf.admin.pojo;

/**
 * Created by  2019/8/17
 */

public class RentHouseInfo {
    int houseId;
    String areaId;
    String community;
    int build;
    int unit;
    int num;
    int room;
    int hall;
    int toilet;
    int level;
    int allLevel;
    String elevator;
    int area;
    String housingtype;
    String decorate;
    String toward;


    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

    public String getHousingtype() {
        return housingtype;
    }

    public void setHousetype(String housetype) {
        this.housingtype = housetype;
    }

    public int getLandId() {
        return landId;
    }

    public void setLandId(int landId) {
        this.landId = landId;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    int rent;
    String payType;
    String roomType;
    String roomToward;
    String roommate;
    String roomArea;
    String title;
    String info;
    int status;
    long upTime;

    public void setHousingtype(String housingtype) {
        this.housingtype = housingtype;
    }

    public long getUpTime() {
        return upTime;
    }

    public void setUpTime(long upTime) {
        this.upTime = upTime;
    }

    int landId;
    String icon;

    public int getHouseId() {
        return houseId;
    }

    public void setHouseId(int houseId) {
        this.houseId = houseId;
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

    public String getRoomArea() {
        return roomArea;
    }

    public void setRoomArea(String roomArea) {
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

    @Override
    public String toString() {
        return "RentHouseInfo{" +
                "houseId=" + houseId +
                ", areaId=" + areaId +
                ", community='" + community + '\'' +
                ", build=" + build +
                ", unit=" + unit +
                ", num=" + num +
                ", room=" + room +
                ", hall=" + hall +
                ", toilet=" + toilet +
                ", level=" + level +
                ", allLevel=" + allLevel +
                ", elevator='" + elevator + '\'' +
                ", area=" + area +
                ", housingtype='" + housingtype + '\'' +
                ", decorate='" + decorate + '\'' +
                ", toward='" + toward + '\'' +
                ", rent=" + rent +
                ", payType='" + payType + '\'' +
                ", roomType='" + roomType + '\'' +
                ", roomToward='" + roomToward + '\'' +
                ", roommate='" + roommate + '\'' +
                ", roomArea='" + roomArea + '\'' +
                ", title='" + title + '\'' +
                ", info='" + info + '\'' +
                ", status=" + status +
                ", upTime=" + upTime +
                ", landId=" + landId +
                ", icon='" + icon + '\'' +
                '}';
    }
}
