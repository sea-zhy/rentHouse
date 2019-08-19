package com.qf.landlord.controller;

import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.dto.ShopInfoDTO;
import com.qf.landlord.service.LandlordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LandlordController {

    @Autowired
    LandlordService landlordService;

    /**
     * 添加新房源
     * @param houseDTO
     * @return
     */
    @RequestMapping("addHouseNew")
    public Object addHouseNew(@RequestBody HouseDTO houseDTO){
        System.out.println(houseDTO);
        return landlordService.addHouseNew(houseDTO);
    }

    @RequestMapping("addShopNew")
    public Object addShopNew(@RequestBody ShopInfoDTO shopInfoDTO){
        System.out.println(shopInfoDTO);
        return landlordService.addShopNew(shopInfoDTO);
    }



}
