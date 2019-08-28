package com.qf.admin.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.qf.admin.pojo.AdminInfo;
import com.qf.admin.pojo.RentHouseInfo;
import com.qf.admin.pojo.ShopInfo;
import com.qf.admin.pojo.UserInfo;
import com.qf.admin.service.AdminInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;


/**
 * Created by  2019/8/16
 */
@RestController
@RequestMapping("/admin")
public class AdminInfoController {
    @Autowired
    AdminInfoService adminInfoService;

    /**
     * 管理员登录检测
     * @param adminInfo
     * @return
     */
    @RequestMapping("loginCheck")
    public Object loginCheck(@RequestBody AdminInfo adminInfo, HttpSession session){
       // System.out.println(adminInfo.getAdname()+":"+adminInfo.getAreacode());
        AdminInfo adminInfo1 = adminInfoService.loginCheckByAdminInfo(adminInfo);
        System.out.println(adminInfo);
        //放到session里面
        if(adminInfo!=null){

            session.setAttribute("adminInfo",adminInfo1);
        }
        return adminInfo1;
    }

    /**
     * 获取所有用户的信息
     * @return
     */
    @RequestMapping("listUserInfo")
    public Object  listUserInfo(@RequestParam(required = true,defaultValue = "1",value = "pageNum")Integer pageNum){
        //System.out.println("====");
        //      一页有多少条数据
        int defaultPageSize = 7;
        //      初始化PagrHelper
        PageHelper.startPage(pageNum,defaultPageSize);
        List<UserInfo> userInfos = adminInfoService.listUserInfo();
        PageInfo<UserInfo> userInfoPageInfo = new PageInfo<UserInfo>(userInfos);
        return  userInfoPageInfo;
    }

    /**
     * g根据用户id来获取详细信息以便于修改
     * @param uid
     * @return
     */
    @RequestMapping("getUserInfo")
    public Object  getUserInfo(@RequestParam int  uid){
        return adminInfoService.getUserInfoById(uid);
    }
    /**
     * 根据用户id来修改用户信息
     * @param userInfo
     * @return
     */
    @RequestMapping("editUserInfoById")
    public Object editUserInfoById(@RequestBody UserInfo userInfo){
        System.out.println(userInfo);
        return adminInfoService.editUserInfoById(userInfo);
    }

    /**
     * 根据用户id来进行删除操作
     */
    @RequestMapping("deleteUserById")
    public Object deleteUserById(@RequestBody UserInfo userInfo){
        return adminInfoService.deleteUserById(userInfo);
    }
    /**
     *获取所有出租房屋的信息
     * @return
     */
    @RequestMapping("listRentHouse")
   public Object listRentHouse(@RequestParam(required =true,defaultValue = "1",value = "pagNum")Integer pagNum){
   //     System.out.println("去了哪里");
        int defaultPagSize = 7;
        System.out.println(defaultPagSize);
     //   System.out.println("我的分页呢");
        PageHelper.startPage(pagNum,defaultPagSize);
        List<RentHouseInfo> rentHouseInfos = adminInfoService.listRentHouseInfo();
        PageInfo<RentHouseInfo> rentHouseInfoPageInfo = new PageInfo<RentHouseInfo>(rentHouseInfos);
        return rentHouseInfoPageInfo;
    }
    /**
     * 根据商户id进行商户信息的修改
     * @return
     */
    @RequestMapping("editRentHouseInfoById")
    public Object editMerchantsInfoById(@RequestBody RentHouseInfo rentHouseInfo){
        return adminInfoService.editRentHouseInfoById(rentHouseInfo);
    }
    /**
     * 根据商户id进行商户的删除
     * @return
     */
    @RequestMapping("deleteRentHouseInfoById")
    public Object deleteRentHouseInfoById(@RequestBody RentHouseInfo rentHouseInfo){
        return adminInfoService.deleteRentHouseInfoById(rentHouseInfo);
    }

    /**
     * 获取所有商铺信息
     * @return
     */
    @RequestMapping("listShopInfo")
    public Object listShopInfo(@RequestParam(defaultValue = "1",required = true,value = "pageNum")Integer pageNum){
        int defaultPageSize = 2;
        PageHelper.startPage(pageNum,defaultPageSize);
        List<ShopInfo> shopInfos = adminInfoService.listShopInfo();
        PageInfo<ShopInfo> shopInfoPageInfo = new PageInfo<ShopInfo>(shopInfos);
        return shopInfoPageInfo;
    }
    /**
     * 根据商户id进行商户信息的修改
     * @return
     */
    @RequestMapping("editShopInfoById")
    public Object editShopInfoById(@RequestBody ShopInfo shopInfo){
        return adminInfoService.editShopInfoById(shopInfo);
    }
    /**
     * 根据商户id进行商户的删除
     * @return
     */
    @RequestMapping("deleteShopInfoById")
    public Object deleteShopInfoById(@RequestBody ShopInfo shopInfo){
        return adminInfoService.deleteShopInfoById(shopInfo);
    }

    /**
     *根据id来获取商户的详细信息
     * @param houseId
     * @return
     */
    @RequestMapping("listRentHouseInfoById")
    public Object listRentHouseInfoById(@RequestParam int houseId){
        return adminInfoService.listRentHouseInfoById(houseId);
    }

    /**
     * 根据商铺的ID来获取商铺的详细信息
     * @param id
     * @return
     */
    @RequestMapping("listShopInfoById")
    public Object listShopInfoById(@RequestParam int id){
        return adminInfoService.listShopInfoById(id);
    }

    /**
     * 鼠标脱离后立马检测管理员是否已经存在
     * @param adminInfo
     * @return
     */
    @RequestMapping("loginCheckUserName")
    public Object loginCheckUserName(@RequestBody AdminInfo adminInfo){
        boolean b = adminInfoService.loginCheckUserName(adminInfo);
        return  b;
    }

//    管理员登录页面加入验证码
//    @RequestMapping(value = "/captcha", method = RequestMethod.GET)
//
//  public Object captcha(HttpServletRequest request, HttpServletResponse response)
//      throws ServletException, IOException
//              {
//    CaptchaUtil.outputCaptcha(request, response);
//                  /*String parameter = request.getParameter("captcha");
//                  System.out.println(parameter);*/
//                  String code = (String) request.getSession().getAttribute("randomString");
//                  System.out.println(code);
//                  return code;
//  }

}


