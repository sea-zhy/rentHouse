package com.qf.filter;


import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginFilter implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        HttpSession session = httpServletRequest.getSession();
        Object userInfo = session.getAttribute("userInfo");
        Object landlord = session.getAttribute("landlord");
        Object adminInfo = session.getAttribute("adminInfo");
        String requestURI = httpServletRequest.getRequestURI();
        System.out.println(requestURI);
        if(userInfo == null && landlord == null &&adminInfo ==null){
            if("/shopIndex.html".equals(requestURI)||"/houseIndex.html".equals(requestURI)||"/shopinit.html".equals(requestURI)||"/shoplogin.html".equals(requestURI)||
                    "/shopreg.html".equals(requestURI)||"/userlogin.html".equals(requestURI)||"/userreg.html".equals(requestURI)||"/shopInfoMessage.html".equals(requestURI)||
                    "/houseInfoMessage.html".equals(requestURI)||"/adminlogin.html".equals(requestURI)){
                return true;
            }
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
