package com.qf.house.dao;
import com.qf.house.VO.FacilitiesVO;
import com.qf.house.VO.ImgsVO;
import com.qf.house.dto.RentalInfoDTO;
import com.qf.house.pojo.RentalInfo;


import java.util.List;

public interface RentalMapperMessage {
    //查询所有
    public List<RentalInfo> getRentalInfo(RentalInfoDTO rentalInfoDTO);
    //根据房型,价格查找
    public List<RentalInfo> getRent(RentalInfoDTO rentalInfoDTO);
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
