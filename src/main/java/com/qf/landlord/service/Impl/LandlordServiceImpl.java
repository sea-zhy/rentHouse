package com.qf.landlord.service.Impl;

import com.qf.landlord.dao.LandlordMapper;
import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.dto.ShopInfoDTO;
import com.qf.landlord.service.LandlordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LandlordServiceImpl implements LandlordService {

    @Autowired
    LandlordMapper houseMapper;

    /**
     * 发布新的出租屋信息
     * @param houseDTO
     * @return
     */
    @Transactional
    public boolean addHouseNew(HouseDTO houseDTO) {
        boolean flg = false;
        if(houseMapper.addHouseNew(houseDTO)>0&&houseMapper.addHouseFacil(houseDTO)>0&&houseMapper.addHouseImg(houseDTO)>0&&houseMapper.addHouseContact(houseDTO)>0){
            flg = true;
        }
        return flg;
    }

    /**
     * 发布新的商铺信息
     * @param shopInfoDTO
     * @return
     */
    @Transactional
    public boolean addShopNew(ShopInfoDTO shopInfoDTO) {
        boolean flg = false;
        if(houseMapper.addShopNew(shopInfoDTO)>0&&houseMapper.addShopEquipment(shopInfoDTO)>0&&houseMapper.addShopImg(shopInfoDTO)>0&&houseMapper.addShopContact(shopInfoDTO)>0){
            flg = true;
        }
        return flg;
    }


}
