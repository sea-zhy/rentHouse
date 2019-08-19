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
    private int areaId;
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
    private String type;
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

}
