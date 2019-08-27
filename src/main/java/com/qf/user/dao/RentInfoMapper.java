package com.qf.user.dao;



import com.qf.user.pojo.RentInfo;
import com.qf.user.vo.RentInfoVO;
import com.qf.user.vo.SearchVO;

import java.util.List;

public interface RentInfoMapper {
    //发布求租信息
    public int qiuzu(RentInfo rentInfo);
    //查询所有的求助信息initRenthouse
    public List<RentInfoVO> initRenthouse(SearchVO searchVO);
}
