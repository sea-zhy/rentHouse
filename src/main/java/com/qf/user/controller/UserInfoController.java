package com.qf.user.controller;

import com.qf.user.pojo.Landlord;
import com.qf.user.pojo.UFHouse;
import com.qf.user.pojo.UserInfo;
import com.qf.user.pojo.UserLand;
import com.qf.user.service.UserInfoService;
import com.qf.user.toolkit.MailUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Random;

@CrossOrigin
@RestController
@RequestMapping("user")
public class UserInfoController {
    @Autowired
    UserInfoService userInfoService;

    //根据用户名和密码进行登录
    @RequestMapping("loginByUsernameAndPassword")
    public Object loginByUsernameAndPassword(@RequestBody UserInfo userInfo, HttpSession session){
        UserInfo userInfo1 = userInfoService.loginByUsernameAndPassword(userInfo);
        if(userInfo1!=null){
            session.setAttribute("userInfo",userInfo1);
        }
       return userInfo1;
    }
    //判断用户名是否可用
    @RequestMapping("usernameIsExists")
    public Object usernameIsExists(@RequestBody UserInfo userInfo){
        boolean b = userInfoService.usernameIsExists(userInfo);
        System.out.println(b);
        return b;
    }
    //注册
    @RequestMapping("register")
    public boolean register(@RequestBody UserInfo userInfo){
        return userInfoService.register(userInfo);
    }

    //关注房源
    @RequestMapping("addhouse")
    public Object addhouse(@RequestBody UFHouse ufHouse){
        return userInfoService.addhouse(ufHouse);
    }
    //根据UID查询信息initByUid
    @RequestMapping("initByUid")
    public Object initByUid(@RequestParam int uid){
        return userInfoService.initByUid(uid);
    }

    //修改个人信息changeByUid
    @RequestMapping("changeByUid")
    public Object changeByUid(@RequestBody UserInfo userInfo){
        return userInfoService.changeByUid(userInfo);
    }

    //根据uid查询关注的房产经里人initLandlord
    @RequestMapping("initLandlord")
    public List<Landlord> initLandlord(@RequestParam int uid){
        return userInfoService.initLandlord(uid);
    }
    //取消关注deleteLandlord
    @RequestMapping("deleteLandlord")
    public Object deleteLandlord(@RequestBody UserLand userLand){
        return userInfoService.deleteLandlord(userLand);
    }
    @RequestMapping("outLogin")
    public Object outLogin(HttpServletRequest req,HttpSession session){
        HttpSession session1 = req.getSession();
        session1.removeAttribute("userInfo");
        return true;
    }

    @RequestMapping(name = "getCode",value = "/getCode")
    @ResponseBody
    public Object getCode(@RequestParam String email) throws Exception {
        System.err.println("email = " + email);
        Random random = new Random();
        int i = random.nextInt(9000)+1000;
        MailUtils mailUtils=new MailUtils();
        mailUtils.setReceiveMailAccount(email);
        mailUtils.run(i);
        System.err.println("i :"+i);
        return i;
    }
}
