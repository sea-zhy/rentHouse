package com.qf.landlord;

import com.qf.landlord.pojo.House;
import com.qf.landlord.service.HouseService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

public class TestDemo1 {
    //sdnkfoksjahdfk sf
    @Test
    public void aa(){
        ClassPathXmlApplicationContext classPathXmlApplicationContext = new ClassPathXmlApplicationContext("springmvc.xml", "spring-service.xml", "spring-mybatis.xml");
//        HouseService bean = classPathXmlApplicationContext.getBean(HouseService.class);
//        House house = bean.selectOne();
//        System.out.println("house = " + house);
    }
}
