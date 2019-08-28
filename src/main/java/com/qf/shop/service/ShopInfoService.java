package com.qf.shop.service;

import com.qf.shop.dto.ReceiveConditionDTO;
import com.qf.shop.vo.*;

import java.util.List;

public interface ShopInfoService {

    public List<ShopIndexVO> listAllShopInfo();

    public List<ShopIndexVO> listShopInfoByConditions(ReceiveConditionDTO receiveConditionDTO);

    public List<ShopIndexVO> listAllShopInfoByLike(String keyword);

    public List<ShopIndexVO> getShopLocation(ShopLocationVO shopLocationVO);

    public ShopInfoVO listAllShopInfoByShopId(int shopid);

    public List<EquipmentVO> listEquipmentsByShopId(int shopid);

    public List<ImgsVO> listImgsByShopId(int shopid);
}