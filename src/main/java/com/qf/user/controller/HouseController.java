package com.qf.user.controller;

import com.qf.user.pojo.House;
import com.qf.user.pojo.HouseUserInfo;
import com.qf.user.pojo.UserInfo;
import com.qf.user.service.HouseService;
import com.qf.user.vo.FocusLandAndHouse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpSession;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("user")
public class HouseController {
    @Autowired
    HouseService houseService;

    //根据房屋id查看房屋信息initByHousrId
    @RequestMapping("initByHousrId")
    public Object initByHousrId(@RequestParam int houseId){
        return houseService.initByHousrId(houseId);
    }

    //根据用户id查询房屋信息initHouseByUid
    @RequestMapping("initHouseByUid")
    public List<House> initHouseByUid(@RequestParam int uid){
        List<House> houses = houseService.initHouseByUid(uid);
        return houses;
    }

    //根据用户uid和房源的houseId删除deleteHouse
    @RequestMapping("deleteHouse")
    public Object deleteHouse(@RequestBody HouseUserInfo houseUserInfo){
        return houseService.deleteHouse(houseUserInfo);
    }

    //根据houseId查询房屋的信息mapByhouseId
    @RequestMapping("mapByhouseId")
    public House mapByhouseId(@RequestParam int houseId){
        return houseService.mapByhouseId(houseId);
    }

    @RequestMapping("focusInit")
    public Object focusInit(@RequestBody FocusLandAndHouse focusLandAndHouse, HttpSession session){
        UserInfo userInfo = (UserInfo)session.getAttribute("userInfo");
        if(userInfo == null){
            return false;
        }
        focusLandAndHouse.setUid(userInfo.getUid());
        return houseService.focusInit(focusLandAndHouse);
    }
}
