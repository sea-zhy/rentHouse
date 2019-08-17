package com.qf.landlord.controller;

import com.qf.landlord.pojo.House;
import com.qf.landlord.scheduler.SchedulerDemo;
import com.qf.landlord.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Method;

@RestController
public class HouseController {

    @Autowired
    HouseService houseService;
    @RequestMapping("selectOne")
    public Object selectOne(){
        House house = houseService.selectOne();
        System.out.println(house);
        return house;
    }


}
