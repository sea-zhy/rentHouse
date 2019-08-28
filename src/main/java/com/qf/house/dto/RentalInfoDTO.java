package com.qf.house.dto;

public class RentalInfoDTO {
    String title;
    int rent;
    int hall;
    String roomType;
    int status;
    int maxrent;
    int minrent;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getRent() {
        return rent;
    }

    public void setRent(int rent) {
        this.rent = rent;
    }

    public int getHall() {
        return hall;
    }

    public void setHall(int hall) {
        this.hall = hall;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getMaxrent() {
        return maxrent;
    }

    public void setMaxrent(int maxrent) {
        this.maxrent = maxrent;
    }

    public int getMinrent() {
        return minrent;
    }

    public void setMinrent(int minrent) {
        this.minrent = minrent;
    }

    @Override
    public String toString() {
        return "RentalInfoDTO{" +
                "title='" + title + '\'' +
                ", rent='" + rent + '\'' +
                ", hall='" + hall + '\'' +
                ", roomType='" + roomType + '\'' +
                ", status=" + status +
                ", maxrent=" + maxrent +
                ", minrent=" + minrent +
                '}';
    }
}
