package com.qf.landlord.service;

import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.dto.ShopInfoDTO;
import com.qf.landlord.pojo.Landlord;
import com.qf.landlord.vo.HouseVO;
import com.qf.landlord.vo.ShopInfoVO;

import java.util.List;

public interface LandlordService {
     boolean addHouseNew(HouseDTO houseDTO);
     boolean addShopNew(ShopInfoDTO shopInfoDTO);

     List<HouseDTO> getHouseByLandlordId(int lanId);
     List<ShopInfoDTO> getShopByLandlordId(int lanId);

     HouseVO getHouseByHouseId(int houseId);
     ShopInfoVO getShopById(int shopId);

     boolean removeHouse(int houseId);
     boolean removeShopInfo(int shopId);

     boolean editHouseByHouseId(HouseDTO houseDTO);
     boolean editShopInfoByShopId(ShopInfoDTO shopInfoDTO);

     boolean getLanByName(String lanName);
     boolean registerLan(Landlord landlord);
     Landlord landlordLoginCheck(Landlord landlord);
     boolean editLandlord(Landlord landlord);
}
