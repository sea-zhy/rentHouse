package com.qf.shop.dao;

import com.qf.shop.dto.ConditionsDTO;
import com.qf.shop.vo.*;

import java.util.List;

public interface ShopInfoMapper {
    //查所有
    public List<ShopIndexVO> listAllShopInfo();

    /**
     * 依据用户前台页面选择条件查询
     * @param conditionsDTO 用户前台条件选择 数据类
     * @return
     */
    public List<ShopIndexVO> listShopInfoByConditions(ConditionsDTO conditionsDTO);

    /**
     * 依据用户前台input搜索
     * 模糊查询，title 、shopType 、address
     * @param keyword 用户输入的关键字
     * @return
     */
    public List<ShopIndexVO> listAllShopInfoByLike(String keyword);

    /**
     * 根据商铺id
     * 找出商铺基本信息、商铺设备信息、房东信息、
     * @param shopid
     * @return
     */
    public ShopInfoVO listAllShopInfoByShopId(int shopid);

    /**
     * 根据商铺id
     * 找出商铺配套设备
     * @param shopid
     * @return
     */
    public List<EquipmentVO> listEquipmentsByShopId(int shopid);

    /**
     * 由shopid搜对应照片
     * @param shopid
     * @return
     */
    public List<ImgsVO> listImgsByShopId(int shopid);

    public List<ShopIndexVO> getShopLocation(ShopLocationVO shopLocationVO);

}
