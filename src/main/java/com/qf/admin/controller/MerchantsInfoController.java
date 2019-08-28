package com.qf.admin.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.qf.admin.pojo.MerchantsInfo;
import com.qf.admin.service.MerchantsInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by  2019/8/16
 */
@RestController
public class MerchantsInfoController {
    @Autowired
    MerchantsInfoService merchantsInfoService;

    /**
     * 获取所有商户信息
     * @return
     */
    @RequestMapping("listMerchantsInfo")
    public Object listMerchantsInfo(@RequestParam(value = "pageNum",defaultValue = "1",required = true)Integer pageNum){
        int defaultPageSize = 2;
        PageHelper.startPage(pageNum,defaultPageSize);
        List<MerchantsInfo> merchantsInfos = merchantsInfoService.listMerchantsInfo();
        PageInfo<MerchantsInfo> merchantsInfoPageInfo = new PageInfo<MerchantsInfo>(merchantsInfos);
        return merchantsInfoPageInfo;
        //return merchantsInfoService.listMerchantsInfo();
    }
    /**
     * 根据商户id进行商户信息的修改
     * @return
     */
    @RequestMapping("editMerchantsInfoById")
    public Object editMerchantsInfoById(@RequestBody MerchantsInfo merchantsInfo){
        System.out.println(merchantsInfo+"========");
        return merchantsInfoService.editMerchantsInfoById(merchantsInfo);
    }
    /**
     * 根据商户id进行商户的删除
     * @return
     */
    @RequestMapping("deleteMerchantsById")
    public Object deleteMerchantsById(@RequestBody MerchantsInfo merchantsInfo){
        return merchantsInfoService.deleteMerchantsById(merchantsInfo);
    }
    /**
     * 根据商户id获取商户的详细信息
     * @return
     */
    @RequestMapping("listMerchantsInfoById")
    public Object listMerchantsInfoById(@RequestParam int landid){
        return merchantsInfoService.listMerchantsInfoById(landid);
    }
}
