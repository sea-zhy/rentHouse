package com.qf.landlord.dao;

import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.dto.ShopInfoDTO;
import com.qf.landlord.pojo.Equipment;
import com.qf.landlord.pojo.Facilities;
import com.qf.landlord.pojo.Landlord;
import com.qf.landlord.vo.EquipmentVO;
import com.qf.landlord.vo.FacilitiesVO;
import com.qf.landlord.vo.HouseVO;
import com.qf.landlord.vo.ShopInfoVO;
import com.sun.org.apache.bcel.internal.generic.LAND;

import java.util.List;

public interface LandlordMapper {
    int addHouseNew(HouseDTO houseDTO);
    int addHouseFacil(HouseDTO houseDTO);
    int addHouseImg(HouseDTO houseDTO);
    int addHouseContact(HouseDTO houseDTO);

    int addShopNew(ShopInfoDTO shopInfoDTO);
    int addShopEquipment(ShopInfoDTO shopInfoDTO);
    int addShopImg(ShopInfoDTO shopInfoDTO);
    int addShopContact(ShopInfoDTO shopInfoDTO);

    List<HouseDTO> getHouseByLandlordId(int lanId);
    List<ShopInfoDTO> getShopByLandlordId(int lanId);

    List<FacilitiesVO> getFacilitiesHouseByHouseId(int houseId);
    HouseVO getHouseInfoByHouseId(int houseId);

    List<EquipmentVO> getEquipmentShopById(int shopId);
    ShopInfoVO getShopInfoByShopId(int shopId);

    int removeHouseByHouseId(int houseId);
    int removeHouseContactByHouseId(int houseId);
    int removeHouseImgByHouseId(int houseId);
    int removeHouseFacByHouseId(int houseId);

    int removeShopInfoByShopId(int shopId);
    int removeShopInfoContactByShopId(int shopId);
    int removeShopInfoImgByShopId(int shopId);
    int removeShopInfoEquByShopId(int shopId);

    int updateHouseStatusToOne(long time);
    int updateShopInfoStatusToOne(long time);

    int editHouseByHouseId(HouseDTO houseDTO);
    int editShopInfoByShopId(ShopInfoDTO shopInfoDTO);

    Landlord getLanByName(String lanName);
    int registerLan(Landlord landlord);
    Landlord landlordLoginCheck(Landlord landlord);
    int editLandlord(Landlord landlord);

    Landlord getLanInfo(int landid);
    int editHouseArea(HouseVO houseVO);
    int editShopArea(ShopInfoVO shopInfoVO);

    List<Facilities> getAllFac();
    List<Equipment> getAllEqu();

    List<HouseDTO> getHouseByLanId(int lanId);
    List<ShopInfoDTO> getShopInfoByLanId(int lanId);
}
