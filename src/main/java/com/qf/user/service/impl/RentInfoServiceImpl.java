package com.qf.user.service.impl;

import com.qf.user.dao.RentInfoMapper;
import com.qf.user.pojo.RentInfo;
import com.qf.user.service.RentInfoService;
import com.qf.user.vo.RentInfoVO;
import com.qf.user.vo.SearchVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentInfoServiceImpl implements RentInfoService {
    @Autowired
    RentInfoMapper rentInfoMapper;

    public boolean qiuzu(RentInfo rentInfo) {
        return rentInfoMapper.qiuzu(rentInfo)>0;
    }
    //查询所有的求助信息initRenthouse
    public List<RentInfoVO> initRenthouse(SearchVO searchVO){
        return rentInfoMapper.initRenthouse(searchVO);
    }
}
