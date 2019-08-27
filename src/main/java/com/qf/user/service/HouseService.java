package com.qf.user.service;

import com.qf.user.pojo.House;
import com.qf.user.pojo.HouseUserInfo;

import java.util.List;

public interface HouseService {
    //根据房屋id查看房屋信息initByHousrId
    public House initByHousrId(int houseId);
    //根据用户id查询房屋信息initHouseByUid
    public List<House> initHouseByUid(int uid);
    //根据用户uid和房源的houseId删除deleteHouse
    public boolean deleteHouse(HouseUserInfo houseUserInfo);
    //根据houseId查询房屋的信息mapByhouseId
    public House mapByhouseId(int houseId);
}
