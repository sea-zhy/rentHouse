package com.qf.shop.service.Impl;

import com.qf.shop.dao.ShopInfoMapper;
import com.qf.shop.dto.ConditionsDTO;
import com.qf.shop.dto.ReceiveConditionDTO;
import com.qf.shop.service.ShopInfoService;
import com.qf.shop.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopInfoServiceImpl implements ShopInfoService {
    @Autowired
    ShopInfoMapper shopInfoMapper;

    public List<ShopIndexVO> listAllShopInfo() {
        return shopInfoMapper.listAllShopInfo();
    }

    /**
     * 依据用户前台页面选择条件查询
     * @param receiveConditionDTO 用户前台条件选择 数据类
     * @return
     */
    public List<ShopIndexVO> listShopInfoByConditions(ReceiveConditionDTO receiveConditionDTO) {
        String area = (String)receiveConditionDTO.getArea();
        String price = (String)receiveConditionDTO.getPrice();
        String provinceId = (String)receiveConditionDTO.getProvinceId();
        String cityId = (String) receiveConditionDTO.getCityId();
        String areaId = (String)receiveConditionDTO.getAreaId();
        int minarea;
        int maxarea;
        int minprice;
        int maxprice;
        if (area==null){
            minarea = 0;
            maxarea = 0;
        }else if(area.endsWith("以上")){
            minarea = Integer.parseInt(area.split("平")[0]);
            maxarea = 9999999;
        }else if (area.endsWith("以下")){
            minarea = 1;
            maxarea = Integer.parseInt(area.split("平")[0]);
        }else{
            String str = area.split("平")[0];
            minarea = Integer.parseInt(str.split("-")[0]);
            maxarea = Integer.parseInt(str.split("-")[1]);
        }

        if (price==null){
            minprice = 0;
            maxprice = 0;
        }else if(price.endsWith("以上")){
            minprice = Integer.parseInt(price.split("元")[0]);
            maxprice = 9999999;
        }else if (price.endsWith("以下")){
            minprice = 1;
            maxprice = Integer.parseInt(price.split("元")[0]);
        }else{
            String str = price.split("元")[0];
            minprice = Integer.parseInt(str.split("-")[0]);
            maxprice = Integer.parseInt(str.split("-")[1]);
        }
        ConditionsDTO conditionsDTO = new ConditionsDTO();
        conditionsDTO.setMaxArea(maxarea);
        conditionsDTO.setMinArea(minarea);
        conditionsDTO.setMaxPrice(maxprice);
        conditionsDTO.setMinPrice(minprice);
        conditionsDTO.setProvinceId(provinceId);
        conditionsDTO.setCityId(cityId);
        conditionsDTO.setAreaId(areaId);

        return shopInfoMapper.listShopInfoByConditions(conditionsDTO);
    }

    /**
     * 依据用户前台input搜索
     * 模糊查询，title 、shopType 、address
     * @param keyword 用户输入的关键字
     * @return
     */
    public List<ShopIndexVO> listAllShopInfoByLike(String keyword) {
        return shopInfoMapper.listAllShopInfoByLike(keyword);
    }

    /**
     * 由地址筛选商铺
     * @param shopLocationVO
     * @return
     */
    public List<ShopIndexVO> getShopLocation(ShopLocationVO shopLocationVO){
        return shopInfoMapper.getShopLocation(shopLocationVO);
    }


    /**
     * 根据商铺id
     * 找出商铺基本信息、商铺设备信息、房东信息、
     * @param shopid
     * @return
     */
    public ShopInfoVO listAllShopInfoByShopId(int shopid) {
        return shopInfoMapper.listAllShopInfoByShopId(shopid);
    }

    /**
     * 根据商铺id
     * 找出商铺配套设备
     * @param shopid
     * @return
     */
    public List<EquipmentVO> listEquipmentsByShopId(int shopid){
        return shopInfoMapper.listEquipmentsByShopId(shopid);
    }

    /**
     * 根据商铺id
     * 找出商铺的照片
     * @param shopid
     * @return
     */
    public List<ImgsVO> listImgsByShopId(int shopid){
        return shopInfoMapper.listImgsByShopId(shopid);
    }
}
