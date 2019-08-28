package com.qf.landlord.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.qf.landlord.dto.HouseDTO;
import com.qf.landlord.dto.ShopInfoDTO;
import com.qf.landlord.pojo.Landlord;
import com.qf.landlord.service.LandlordService;
import com.qf.landlord.vo.HouseVO;
import com.qf.landlord.vo.ShopInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

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
    public Object addHouseNew(@RequestBody HouseDTO houseDTO,HttpSession session){
        Landlord landlord = (Landlord)session.getAttribute("landlord");
        int lanId = landlord.getLandId();
        houseDTO.setLanId(lanId);
        return landlordService.addHouseNew(houseDTO);
    }

    /**
     * 添加新商铺
     * @param shopInfoDTO
     * @return
     */
    @RequestMapping("addShopNew")
    public Object addShopNew(@RequestBody ShopInfoDTO shopInfoDTO,HttpSession session){
        Landlord landlord = (Landlord)session.getAttribute("landlord");
        int lanId = landlord.getLandId();
        shopInfoDTO.setLanId(lanId);
        return landlordService.addShopNew(shopInfoDTO);
    }

    /**
     * 根据商家id 获取出租屋列表
     * @param
     * @return
     */
    @RequestMapping("getHouseByLandlordId")
    public Object getHouseByLandlordId(@RequestParam(defaultValue="1",required = true,value="pageNum")
            Integer pageNum,HttpSession session){
        Landlord landlord = (Landlord)session.getAttribute("landlord");
        int lanId = landlord.getLandId();
        Integer pageSize = 4;
        System.out.println(pageNum);
        PageHelper.startPage(pageNum,pageSize);
        List<HouseDTO> houseList = landlordService.getHouseByLanId(lanId);
        PageInfo<HouseDTO> houseDTOList = new PageInfo<>(houseList);
        System.out.println(houseDTOList);
        return houseDTOList;
        //return landlordService.getHouseByLandlordId(lanId);
    }

    /**
     * 根据商家id获取商铺列表
     * @param
     * @return
     */
    @RequestMapping("getShopByLandlordId")
    public Object getShopByLandlordId(@RequestParam(defaultValue="1",required = true,value="pageNum")
            Integer pageNum,HttpSession session){
        Landlord landlord = (Landlord)session.getAttribute("landlord");
        int lanId = landlord.getLandId();
        Integer pageSize = 4;
        PageHelper.startPage(pageNum,pageSize);
        List<ShopInfoDTO> shopList = landlordService.getShopInfoByLanId(lanId);
        System.out.println("-----------------------"+shopList);
        PageInfo<ShopInfoDTO> shopInfoDTOList = new PageInfo<>(shopList);
        return shopInfoDTOList;
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
        return landlordService.removeHouse(houseId);
    }

    /**
     * 删除商铺信息
     * @param shopId
     * @return
     */
    @RequestMapping("removeShopInfo")
    public Object removeShopInfo(@RequestParam int shopId){
        return landlordService.removeShopInfo(shopId);
    }

    /**
     * 修改出租屋信息
     * @param houseDTO
     * @return
     */
    @RequestMapping("editHouseByHouseId")
    public Object editHouseByHouseId(@RequestBody HouseDTO houseDTO,HttpSession session){
        Landlord landlord = (Landlord)session.getAttribute("landlord");
        int lanId = landlord.getLandId();
        houseDTO.setLanId(lanId);
        return landlordService.editHouseByHouseId(houseDTO);
    }

    /**
     * 修改商铺信息
     * @param shopInfoDTO
     * @return
     */
    @RequestMapping("editShopInfoByShopId")
    public Object editShopInfoByShopId(@RequestBody ShopInfoDTO shopInfoDTO, HttpSession session){
        Landlord landlord = (Landlord)session.getAttribute("landlord");
        int lanId = landlord.getLandId();
        shopInfoDTO.setLanId(lanId);
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
            session.setAttribute("landlord",lan);
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
     * 获取商家具体信息
     * @param
     * @return
     */
    @RequestMapping("getLanInfo")
    public Object getLanInfo(HttpSession session){
        Landlord landlord = (Landlord)session.getAttribute("landlord");
        return landlordService.getLanInfo(landlord.getLandId());
    }

    /**
     * 退出登录
     * @param request
     * @return
     */
    @RequestMapping("loginOut")
    public Object loginOut(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.removeAttribute("landlord");
        return true;
    }

    /**
     * 修改出租屋地址
     * @param houseVO
     * @return
     */
    @RequestMapping("editHouseArea")
    public Object editHouseArea(@RequestBody HouseVO houseVO){
        return landlordService.editHouseArea(houseVO);
    }
    /**
     * 修改商铺地址
     * @param shopInfoVO
     * @return
     */
    @RequestMapping("editShopArea")
    public Object editShopArea(@RequestBody ShopInfoVO shopInfoVO){
        return landlordService.editShopArea(shopInfoVO);
    }

    /**
     * 获取所有的出租屋设备
     * @return
     */
    @RequestMapping("getAllFac")
    public Object getAllFac(){
        return landlordService.getAllFac();
    }

    /**
     * 根据所有商铺的设备
     * @return
     */
    @RequestMapping("getAllEqu")
    public Object getAllEqu(){
        return landlordService.getAllEqu();
    }


}
