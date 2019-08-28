package com.qf.house.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import com.qf.house.VO.RentalInfoVO;
import com.qf.house.dto.RentalInfoDTO;
import com.qf.house.pojo.RentalInfo;
import com.qf.house.service.RentalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RentalController {
@Autowired
RentalService rentalService;

        //查询所有
        @RequestMapping("SelectRentalInfo")
        public Object SelectRentalInfo( @RequestParam(required = true,defaultValue = "1",value = "pageNum")Integer pageNum ,@RequestBody RentalInfoDTO rentalInfoDTO){
//            //一页有多少条
            int defaultPageSize= 10;
//            //初始化PageHelper对象
            System.out.println(rentalInfoDTO);
            PageHelper.startPage(pageNum,defaultPageSize);
            List<RentalInfo> rentalInfo = rentalService.getRentalInfo(rentalInfoDTO);
            PageInfo<RentalInfo> rentalInfoPageInfo = new PageInfo<RentalInfo>(rentalInfo);
            return rentalInfoPageInfo;
        }
        @RequestMapping("SelectInformation")
        public Object SelectInformation(@RequestBody RentalInfoVO rentalInfoVO){
            System.out.println(rentalInfoVO);
            return  rentalService.getRent(rentalInfoVO);
        }

        //根据地区查找
        @RequestMapping("SelectLocation")
        public Object SelectLocation(@RequestBody RentalInfo rentalInfo){
            System.out.println(rentalInfo);
                return  rentalService.getLocation(rentalInfo);
        }

        //根据houseid查询详情信息
        @RequestMapping("SelectHouse")
        public Object SelectHouse(@RequestParam int houseid){
            System.out.println(houseid);
           return rentalService.listAllHouseInfoByShopId(houseid);
        }
        //根据houseid查询配套信息
        @RequestMapping("SelectFacilities")
        public Object SelectFacilities(@RequestParam int houseid){
            System.out.println(houseid);
            return rentalService.listEquipmentsByShopId(houseid);
        }
        //根据houseid查询图片
        @RequestMapping("SelectImg")
        public Object SelectImg(@RequestParam int houseid){
            System.out.println(houseid);
            return rentalService.listImgsByShopId(houseid);
        }
        @RequestMapping("SelectHallAndRoomType")
        public Object SelectHallAndRoomType(@RequestBody RentalInfo rentalInfo){
            System.out.println(rentalInfo);
            return  rentalService.getHallAndRoomType(rentalInfo);
        }

}
