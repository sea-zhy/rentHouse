package com.qf.user.service.impl;

import com.qf.user.dao.HouseMapper;
import com.qf.user.pojo.House;
import com.qf.user.pojo.HouseUserInfo;
import com.qf.user.pojo.UserLand;
import com.qf.user.service.HouseService;
import com.qf.user.vo.FocusLandAndHouse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HouseServiceImpl implements HouseService {
    @Autowired(required=true)
    HouseMapper houseMapper;
    //根据房屋id查看房屋信息initByHousrId
    public House initByHousrId(int houseId){
        return houseMapper.initByHousrId(houseId);
    }
    //根据用户id查询房屋信息initHouseByUid
    public List<House> initHouseByUid(int uid){
        return houseMapper.initHouseByUid(uid);
    }
    //根据用户uid和房源的houseId删除deleteHouse
    public boolean deleteHouse(HouseUserInfo houseUserInfo){
        return houseMapper.deleteHouse(houseUserInfo)>0;
    }
    //根据houseId查询房屋的信息mapByhouseId
    public House mapByhouseId(int houseId){
        return houseMapper.mapByhouseId(houseId);
    }

    @Override
    public FocusLandAndHouse focusInit(FocusLandAndHouse focusLandAndHouse) {
        HouseUserInfo houseUserInfo = houseMapper.getFocusHouseId(focusLandAndHouse);
        if(houseUserInfo==null){
            focusLandAndHouse.setHouseid(0);
        }else{
            focusLandAndHouse.setHouseid(houseUserInfo.getHouseid());
        }
        UserLand userLand = houseMapper.getFocus(focusLandAndHouse);
        if(userLand == null){
            focusLandAndHouse.setLandid(0);
        }else{
            focusLandAndHouse.setLandid(userLand.getLandid());
        }
        return focusLandAndHouse;
    }
}
