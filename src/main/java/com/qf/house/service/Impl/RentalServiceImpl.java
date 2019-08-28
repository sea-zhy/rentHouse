package com.qf.house.service.Impl;


import com.qf.house.VO.FacilitiesVO;
import com.qf.house.VO.ImgsVO;
import com.qf.house.VO.RentalInfoVO;
import com.qf.house.dao.RentalMapperMessage;
import com.qf.house.dto.RentalInfoDTO;
import com.qf.house.pojo.RentalInfo;
import com.qf.house.service.RentalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentalServiceImpl implements RentalService {
    @Autowired
    RentalMapperMessage rentalMapper;
    //查询所有
    public List<RentalInfo> getRentalInfo(RentalInfoDTO rentalInfoDTO) {
        return rentalMapper.getRentalInfo(rentalInfoDTO);
    }

    public List<RentalInfo> getRent(RentalInfoVO rentalInfoVO) {
        String rent = rentalInfoVO.getRent();
        int minrent;
        int maxrent;
        if (rent==null){
            minrent = 0;
            maxrent = 0;
        }else if(rent.endsWith("以上")){
            minrent = Integer.parseInt(rent.split("元")[0]);
            maxrent = 9999999;
        }else if (rent.endsWith("以下")){
            minrent = 1;
            maxrent = Integer.parseInt(rent.split("元")[0]);
        }else{
            String str = rent.split("元")[0];
            minrent = Integer.parseInt(str.split("-")[0]);
            maxrent = Integer.parseInt(str.split("-")[1]);
        }

        RentalInfoDTO rentalInfoDto = new RentalInfoDTO();
        rentalInfoDto.setMinrent(minrent);
        rentalInfoDto.setMaxrent(maxrent);
        System.out.println(rentalInfoDto);
        return rentalMapper.getRent(rentalInfoDto);
    }
    //根据地区查询
    public List<RentalInfo> getLocation(RentalInfo rentalInfo) {
        return rentalMapper.getLocation(rentalInfo);
    }
    //根据houseid查询详情信息
    public List<RentalInfo> listAllHouseInfoByShopId(int houseid) {
        return rentalMapper.listAllHouseInfoByShopId(houseid);
    }
    //根据houseid查询配套设施
    public List<FacilitiesVO> listEquipmentsByShopId(int houseid) {
        return rentalMapper.listEquipmentsByShopId(houseid);
    }
    //根据houseid查找图片吗
    public List<ImgsVO> listImgsByShopId(int houseid) {
        return rentalMapper.listImgsByShopId(houseid);
    }

    public List<RentalInfo> getHallAndRoomType(RentalInfo rentalInfo) {
        return rentalMapper.getHallAndRoomType(rentalInfo);
    }


}
