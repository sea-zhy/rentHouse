package com.qf.landlord.service;

import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.dto.ShopInfoDTO;

public interface LandlordService {
     boolean addHouseNew(HouseDTO houseDTO);
     boolean addShopNew(ShopInfoDTO shopInfoDTO);
}
