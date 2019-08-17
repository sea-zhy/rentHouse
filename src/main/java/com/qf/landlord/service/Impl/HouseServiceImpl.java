package com.qf.landlord.service.Impl;

import com.qf.landlord.dao.HouseMapper;
import com.qf.landlord.pojo.House;
import com.qf.landlord.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class HouseServiceImpl implements HouseService {

    @Autowired
    HouseMapper houseMapper;

    public House selectOne() {
       /* System.err.println("faffa");
        House house = new House();
        house.houseId = 11;*/
        //house.aId=999;
        return houseMapper.selectOne();
    }



}
