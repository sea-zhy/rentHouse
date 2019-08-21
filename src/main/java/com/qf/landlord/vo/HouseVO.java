package com.qf.landlord.vo;

import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.pojo.Contact;
import com.qf.landlord.pojo.Facilities;
import com.qf.landlord.pojo.Img;
import lombok.Data;

import java.util.List;
@Data
public class HouseVO {
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
    private List<Img> imgList;
    private List<FacilitiesVO> facilitiesVOList;

    public List<FacilitiesVO> getFacilitiesVOList() {
        return facilitiesVOList;
    }

    public void setFacilitiesVOList(List<FacilitiesVO> facilitiesVOList) {
        this.facilitiesVOList = facilitiesVOList;
    }
}
