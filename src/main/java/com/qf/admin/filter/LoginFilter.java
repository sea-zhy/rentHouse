package com.qf.admin.filter;

import com.qf.admin.pojo.AdminInfo;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by DELL on 2019/8/8.
 */
public class LoginFilter implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        //1.查看session中有没有用户信息
        HttpSession session = httpServletRequest.getSession();
        //2.如果没有？如果有?
         AdminInfo adminInfo = (AdminInfo) session.getAttribute("adminInfo");
        if(adminInfo==null){
            //根据URI进行判定，如果是请求登录和注册，我就返回true，否则返回false
            String requestURI = httpServletRequest.getRequestURI();
            System.out.println(requestURI);
            if(requestURI.equals("/loginCheck")||requestURI.equals("/adminlogin.html")){
                System.out.println(requestURI);
                return true;
            }
        }else{
            return true;
        }
        return false;
    }

    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
