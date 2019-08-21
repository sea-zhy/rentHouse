package com.qf.landlord.service.Impl;

import com.qf.landlord.dao.LandlordMapper;
import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.dto.ShopInfoDTO;
import com.qf.landlord.pojo.Landlord;
import com.qf.landlord.service.LandlordService;
import com.qf.landlord.tool.MD5;
import com.qf.landlord.vo.EquipmentVO;
import com.qf.landlord.vo.FacilitiesVO;
import com.qf.landlord.vo.HouseVO;
import com.qf.landlord.vo.ShopInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LandlordServiceImpl implements LandlordService {

    @Autowired
    LandlordMapper landlordMapper;

    /**
     * 发布新的出租屋信息
     * @param houseDTO
     * @return
     */
    @Transactional
    public boolean addHouseNew(HouseDTO houseDTO) {
        boolean flg = false;
        if(landlordMapper.addHouseNew(houseDTO)>0&&landlordMapper.addHouseFacil(houseDTO)>0&&landlordMapper.addHouseImg(houseDTO)>0&&landlordMapper.addHouseContact(houseDTO)>0){
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
        if(landlordMapper.addShopNew(shopInfoDTO)>0&&landlordMapper.addShopEquipment(shopInfoDTO)>0&&landlordMapper.addShopImg(shopInfoDTO)>0&&landlordMapper.addShopContact(shopInfoDTO)>0){
            flg = true;
        }
        return flg;
    }

    /**
     * 根据商家id 查询发布的出租信息
     * @param lanId
     * @return
     */
    @Override
    public List<HouseDTO> getHouseByLandlordId(int lanId) {
        return landlordMapper.getHouseByLandlordId(lanId);
    }

    /**
     * 根据商家id查询发布的商铺信息
     * @param lanId
     * @return
     */
    @Override
    public List<ShopInfoDTO> getShopByLandlordId(int lanId) {
        return landlordMapper.getShopByLandlordId(lanId);
    }

    /**
     * 根据houseid 查询详细信息
     * @param houseId
     * @return
     */
    @Override
    public HouseVO getHouseByHouseId(int houseId) {
        List<FacilitiesVO> facilitiesVOList= landlordMapper.getFacilitiesHouseByHouseId(houseId);
        HouseVO houseVO = landlordMapper.getHouseInfoByHouseId(houseId);
        houseVO.setFacilitiesVOList(facilitiesVOList);
        return houseVO;
    }

    /**
     * 根据shopid查询详细信息
     * @param shopId
     * @return
     */
    @Override
    public ShopInfoVO getShopById(int shopId) {
        List<EquipmentVO> equipmentVOList = landlordMapper.getEquipmentShopById(shopId);
        System.out.println(equipmentVOList);
        ShopInfoVO shopInfoVO = landlordMapper.getShopInfoByShopId(shopId);
        shopInfoVO.setEquipmentList(equipmentVOList);
        System.out.println(shopInfoVO);
        return null;
    }

    /**
     * 根据houseid 删除出租信息
     * @param houseId
     * @return
     */
    @Transactional
    public boolean removeHouse(int houseId) {
        boolean flg = false;
        if(landlordMapper.removeHouseByHouseId(houseId)>0&&landlordMapper.removeHouseContactByHouseId(houseId)>0&&landlordMapper.removeHouseImgByHouseId(houseId)>0&&landlordMapper.removeHouseFacByHouseId(houseId)>0){
            flg = true;
        }
        return flg;
    }

    /**
     * 根据shopid删除商铺信息
     * @param shopId
     * @return
     */
    @Transactional
    public boolean removeShopInfo(int shopId) {
        boolean flg = false;
        if(landlordMapper.removeShopInfoByShopId(shopId)>0&&landlordMapper.removeShopInfoContactByShopId(shopId)>0&&landlordMapper.removeShopInfoImgByShopId(shopId)>0&&landlordMapper.removeShopInfoEquByShopId(shopId)>0){
            flg = true;
        }
        return flg;
    }

    /**
     * 根据houseid 修改出租信息
     * @param houseDTO
     * @return
     */
    @Transactional
    public boolean editHouseByHouseId(HouseDTO houseDTO) {
        boolean flg = false;
        if(landlordMapper.editHouseByHouseId(houseDTO)>0&landlordMapper.removeHouseImgByHouseId(houseDTO.getHouseId())>0&landlordMapper.addHouseImg(houseDTO)>0&
                landlordMapper.removeHouseContactByHouseId(houseDTO.getHouseId())>0&landlordMapper.addHouseContact(houseDTO)>0&landlordMapper.removeHouseFacByHouseId(houseDTO.getHouseId())>0&landlordMapper.addHouseFacil(houseDTO)>0){
            flg = true;
        }
        return flg;
    }

    /**
     * 根据shopid修改商铺信息
     * @param shopInfoDTO
     * @return
     */
    @Transactional
    public boolean editShopInfoByShopId(ShopInfoDTO shopInfoDTO){
        boolean flg = false;
        if(landlordMapper.editShopInfoByShopId(shopInfoDTO)>0&landlordMapper.editShopInfoByShopId(shopInfoDTO)>0&landlordMapper.removeShopInfoImgByShopId(shopInfoDTO.getId())>0&
                landlordMapper.addShopImg(shopInfoDTO)>0&landlordMapper.removeShopInfoContactByShopId(shopInfoDTO.getId())>0&
                landlordMapper.addShopEquipment(shopInfoDTO)>0&landlordMapper.removeShopInfoContactByShopId(shopInfoDTO.getId())>0&landlordMapper.addShopContact(shopInfoDTO)>0){
            flg = true;
        }
        return flg;
    }

    @Override
    public boolean getLanByName(String lanName) {
        Landlord landlord = landlordMapper.getLanByName(lanName);
        if(landlord==null){
            return false;
        }
        return true;
    }

    @Override
    public boolean registerLan(Landlord landlord) {
        landlord.setPassword(MD5.getNewString(landlord.getPassword()));
        return landlordMapper.registerLan(landlord)>0;
    }

    @Override
    public Landlord landlordLoginCheck(Landlord landlord) {
        landlord.setPassword(MD5.getNewString(landlord.getPassword()));
        Landlord lan = landlordMapper.landlordLoginCheck(landlord);
        return lan;
    }

    @Override
    public boolean editLandlord(Landlord landlord) {
        landlord.setPassword(MD5.getNewString(landlord.getPassword()));
        return landlordMapper.editLandlord(landlord)>0;
    }

}
