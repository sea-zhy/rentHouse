package com.qf.landlord.dao;

import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.dto.ShopInfoDTO;

public interface LandlordMapper {
    int addHouseNew(HouseDTO houseDTO);
    int addHouseFacil(HouseDTO houseDTO);
    int addHouseImg(HouseDTO houseDTO);
    int addHouseContact(HouseDTO houseDTO);

    int addShopNew(ShopInfoDTO shopInfoDTO);
    int addShopEquipment(ShopInfoDTO shopInfoDTO);
    int addShopImg(ShopInfoDTO shopInfoDTO);
    int addShopContact(ShopInfoDTO shopInfoDTO);
}
