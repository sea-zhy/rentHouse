package com.qf.user.controller;

import com.qf.user.pojo.RentInfo;
import com.qf.user.service.RentInfoService;
import com.qf.user.vo.RentInfoVO;
import com.qf.user.vo.SearchVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("user")
public class RentInfoController {
    @Autowired
    RentInfoService rentInfoService;

    @RequestMapping("qiuzu")
    public Object qiuzu(@RequestBody RentInfo rentInfo) {
        return rentInfoService.qiuzu(rentInfo);
    }
    //查询所有的求助信息initRenthouse
    @RequestMapping(value = "initRenthouse",method = RequestMethod.POST)
    public List<RentInfoVO> initRenthouse(@RequestBody SearchVO searchVO){
        return rentInfoService.initRenthouse(searchVO);
    }
}
