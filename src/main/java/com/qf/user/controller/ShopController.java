package com.qf.user.controller;

import com.qf.landlord.pojo.Landlord;
import com.qf.user.pojo.UserInfo;
import com.qf.user.pojo.UserLand;
import com.qf.user.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@CrossOrigin
@RestController
@RequestMapping("user")
public class ShopController {
    @Autowired
    ShopService shopService;
    //根据用户名和密码进行登录loginByLandNameAndP
    @RequestMapping("loginByLandNameAndP")
    public Object loginByLandNameAndP(@RequestBody Landlord landlord, HttpSession session){
        Landlord landlord1 = shopService.loginByLandNameAndP(landlord);
       if(landlord1!=null){
           session.setAttribute("landlord",landlord1);
       }
        return landlord1;
    }
    //判断用户名是否可用landNameIsExists
    @RequestMapping("landNameIsExists")
    public Object landNameIsExists(@RequestBody Landlord landlord){
        return shopService.landNameIsExists(landlord);
    }
    //注册registerLandlord
    @RequestMapping("registerLandlord")
    public Object registerLandlord(@RequestBody Landlord landlord){
        return shopService.registerLandlord(landlord);
    }

    @RequestMapping("outLandlord")
    public Object outLandlord(HttpServletRequest req, HttpSession session){
        HttpSession session1 = req.getSession();
        session1.removeAttribute("landlord");
        return true;
    }

    /**
     * 用户房东关注
     * @param landid
     * @param session
     * @return
     */
    @RequestMapping("addUserLandFocus")
    public Object addUserLandFocus(@RequestParam String landid, HttpSession session){
        UserInfo userInfo = (UserInfo)session.getAttribute("userInfo");
        if(userInfo ==null){
            return false;
        }
        System.out.println(landid );
        UserLand userLand = new UserLand();
        userLand.setUid(userInfo.getUid());
        userLand.setLandid(Integer.parseInt(landid));
        System.out.println(userLand);
        return shopService.addUserLandFocus(userLand);
    }

}
