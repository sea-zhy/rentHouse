package com.qf.landlord.controller;

import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.dto.ShopInfoDTO;
import com.qf.landlord.pojo.Landlord;
import com.qf.landlord.service.LandlordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class LandlordController {

    @Autowired
    LandlordService landlordService;

    /**
     * 添加新房源
     * @param houseDTO
     * @return
     */
    @RequestMapping("addHouseNew")
    public Object addHouseNew(@RequestBody HouseDTO houseDTO){
        System.out.println(houseDTO);
        return landlordService.addHouseNew(houseDTO);
    }

    /**
     * 添加新商铺
     * @param shopInfoDTO
     * @return
     */
    @RequestMapping("addShopNew")
    public Object addShopNew(@RequestBody ShopInfoDTO shopInfoDTO){
        System.out.println(shopInfoDTO);
        return landlordService.addShopNew(shopInfoDTO);
    }

    /**
     * 根据商家id 获取出租屋列表
     * @param lanId
     * @return
     */
    @RequestMapping("getHouseByLandlordId")
    public Object getHouseByLandlordId(@RequestParam int lanId){
        System.out.println(lanId);
        return landlordService.getHouseByLandlordId(lanId);
    }

    /**
     * 根据商家id获取商铺列表
     * @param lanId
     * @return
     */
    @RequestMapping("getShopByLandlordId")
    public Object getShopByLandlordId(@RequestParam int lanId){
        return landlordService.getShopByLandlordId(lanId);
    }

    /**
     * 根据houseid 获取出租屋详细信息
     * @param houseId
     * @return
     */
    @RequestMapping("getHouseByHouseId")
    public Object getHouseByHouseId(@RequestParam int houseId){
        return landlordService.getHouseByHouseId(houseId);
    }

    /**
     * 根据shopid获取商铺详细信息
     * @param shopId
     * @return
     */
    @RequestMapping("getEquipmentShopById")
    public Object getEquipmentShopById(@RequestParam int shopId){
        System.out.println("inner");
        return landlordService.getShopById(shopId);
    }

    /**
     * 删除出租屋信息
     * @param houseId
     * @return
     */
    @RequestMapping("removeHouse")
    public Object removeHouse(@RequestParam int houseId){
        System.out.println(houseId);
        return landlordService.removeHouse(houseId);
    }

    /**
     * 删除商铺信息
     * @param shopId
     * @return
     */
    @RequestMapping("removeShopInfo")
    public Object removeShopInfo(@RequestParam int shopId){
        System.out.println(shopId);
        return landlordService.removeShopInfo(shopId);
    }

    /**
     * 修改出租屋信息
     * @param houseDTO
     * @return
     */
    @RequestMapping("editHouseByHouseId")
    public Object editHouseByHouseId(@RequestBody HouseDTO houseDTO){
        System.out.println(houseDTO);
        return landlordService.editHouseByHouseId(houseDTO);
    }

    /**
     * 修改商铺信息
     * @param shopInfoDTO
     * @return
     */
    @RequestMapping("editShopInfoByShopId")
    public Object editShopInfoByShopId(@RequestBody ShopInfoDTO shopInfoDTO){
        System.out.println(shopInfoDTO);
        return landlordService.editShopInfoByShopId(shopInfoDTO);
    }

    /**
     * 商家注册检测用户名
     * @param lanName
     * @return
     */
    @RequestMapping("getLanByName")
    public Object getLanByName(@RequestParam String lanName){
        return landlordService.getLanByName(lanName);
    }

    /**
     * 商家注册
     * @param landlord
     * @return
     */
    @RequestMapping("registerLan")
    public Object registerLan(@RequestBody Landlord landlord){
        return landlordService.registerLan(landlord);
    }

    /**
     * 商家登录检测
     * @param landlord
     * @param session
     * @return
     */
    @RequestMapping("landlordLoginCheck")
    public Object landlordLoginCheck(@RequestBody Landlord landlord, HttpSession session){
        Landlord lan = landlordService.landlordLoginCheck(landlord);
        if(lan!=null){
            session.setAttribute("user",lan);
            return true;
        }
        return false;
    }

    /**
     * 完善商家个人信息
     * @param landlord
     * @return
     */
    @RequestMapping("editLandlord")
    public Object editLandlord(@RequestBody Landlord landlord){
        return landlordService.editLandlord(landlord);
    }

    /**
     * 支付接口
     * @return
     */
    @RequestMapping("payBack")
    public Object payBack(){
        return null;
    }
}
