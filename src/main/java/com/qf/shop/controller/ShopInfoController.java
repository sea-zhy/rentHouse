package com.qf.shop.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.qf.shop.dto.ReceiveConditionDTO;
import com.qf.shop.service.ShopInfoService;
import com.qf.shop.vo.ShopIndexVO;
import com.qf.shop.vo.ShopLocationVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("shop")
public class ShopInfoController {
    @Autowired
    ShopInfoService shopService;

    @RequestMapping("listAllShopInfo")
    @ResponseBody
    public Object listAllShopInfo(@RequestParam(required = true,defaultValue = "1",value = "pageNum")Integer pageNum){
        //一页有多少条
        int defaultPageSize= 3;
        //初始化PageHelper对象
        PageHelper.startPage(pageNum,defaultPageSize);
        List<ShopIndexVO> shopIndexVO = shopService.listAllShopInfo();
        PageInfo<ShopIndexVO> shopIndexVOPageInfo = new PageInfo<ShopIndexVO>(shopIndexVO);
        return shopIndexVOPageInfo;
    }

    /**
     * 依据用户前台页面选择条件查询
     * @param receiveConditionDTO 用户前台条件选择 数据类
     * @return
     */
    @RequestMapping("listShopInfoByConditions")
    @ResponseBody
    public List<ShopIndexVO> listShopInfoByConditions(@RequestBody ReceiveConditionDTO receiveConditionDTO){
        System.out.println(receiveConditionDTO);
        return shopService.listShopInfoByConditions(receiveConditionDTO);
    }

    /**
     * 依据用户前台input搜索
     * 模糊查询，title 、shopType 、address
     * @return
     */
    @RequestMapping("listAllShopInfoByLike")
    @ResponseBody
    public Object listAllShopInfoByLike(@RequestBody Map<String,Object> map){
        System.out.println("map = " + map);
        //一页有多少条
        int defaultPageSize= 3;
        //初始化PageHelper对象
        PageHelper.startPage((Integer) map.get("pageNum"),defaultPageSize);
        List<ShopIndexVO> shopIndexVO = shopService.listAllShopInfoByLike((String) map.get("keyword"));
        PageInfo<ShopIndexVO> shopIndexVOPageInfos = new PageInfo<ShopIndexVO>(shopIndexVO);
        return shopIndexVOPageInfos;
    }

    /**
     * 根据商铺id
     * 找出商铺基本信息、商铺设备信息、房东信息、
     * @param shopid
     * @return
     */
    @RequestMapping("listAllShopInfoByShopId")
    @ResponseBody
    public Object listAllShopInfoByShopId(@RequestParam int shopid){
        System.out.println(shopid);
        return shopService.listAllShopInfoByShopId(shopid);
    }

    /**
     * 根据商铺id
     * 找出商铺配套设备
     * @param shopid
     * @return
     */
    @RequestMapping("listEquipmentsByShopId")
    @ResponseBody
    public Object listEquipmentsByShopId(@RequestParam int shopid){
        System.out.println(shopid);
        System.out.println(shopService.listEquipmentsByShopId(shopid));
        return shopService.listEquipmentsByShopId(shopid);
    }

    /**
     * 根据商铺id
     * 找出商铺配套设备
     * @param shopid
     * @return
     */
    @RequestMapping("listImgsByShopId")
    @ResponseBody
    public Object listImgsByShopId(@RequestParam int shopid){
        System.out.println(shopService.listImgsByShopId(shopid));
        return shopService.listImgsByShopId(shopid);
    }

    /**
     * 根据地区查找
     * @param shopLocationVO
     * @return
     */
    @RequestMapping("getShopLocation")
    @ResponseBody
    public Object getShopLocation(@RequestBody ShopLocationVO shopLocationVO){
        System.out.println(shopLocationVO);
        return shopService.getShopLocation(shopLocationVO);
    }
}
