package com.qf.house.VO;




public class RentalInfoVO {
    int id;
    int hall;
    int level;
    String rent;
    int area;
    String title;
    String roomType;

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getHall() {
        return hall;
    }

    public void setHall(int hall) {
        this.hall = hall;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getRent() {
        return rent;
    }

    public void setRent(String rent) {
        this.rent = rent;
    }

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "RentalInfoVO{" +
                "id=" + id +
                ", hall=" + hall +
                ", level=" + level +
                ", rent='" + rent + '\'' +
                ", area=" + area +
                ", title='" + title + '\'' +
                ", roomType='" + roomType + '\'' +
                '}';
    }
}
