package com.qf.user.service;

import com.qf.user.pojo.RentInfo;
import com.qf.user.vo.RentInfoVO;
import com.qf.user.vo.SearchVO;

import java.util.List;

public interface RentInfoService {
    public boolean qiuzu(RentInfo rentInfo);
    //查询所有的求助信息initRenthouse
    public List<RentInfoVO> initRenthouse(SearchVO searchVO);
}
