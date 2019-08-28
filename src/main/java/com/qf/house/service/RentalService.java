package com.qf.house.service;


import com.qf.house.VO.FacilitiesVO;
import com.qf.house.VO.ImgsVO;
import com.qf.house.VO.RentalInfoVO;
import com.qf.house.dto.RentalInfoDTO;
import com.qf.house.pojo.RentalInfo;

import java.util.List;

public interface RentalService {
    //模糊所有
    public List<RentalInfo> getRentalInfo(RentalInfoDTO rentalInfoDTO);
    //租金和房型查询
    public List<RentalInfo> getRent(RentalInfoVO rentalInfoVO);
    //根据地区查询
    public List<RentalInfo> getLocation(RentalInfo rentalInfo);
    //根据houseid查询详情信息
    public List<RentalInfo> listAllHouseInfoByShopId(int houseid);
    //根据houseid查询配套设施
    public List<FacilitiesVO> listEquipmentsByShopId(int houseid);
    //根据houseid查找图片吗
    public List<ImgsVO> listImgsByShopId(int houseid);
    //根据房型,整租合租查询
    public List<RentalInfo> getHallAndRoomType(RentalInfo rentalInfo);
}
