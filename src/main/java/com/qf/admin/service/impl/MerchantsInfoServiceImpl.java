package com.qf.admin.service.impl;

import com.qf.admin.dao.MerchantsInfoDAO;
import com.qf.admin.pojo.MerchantsInfo;
import com.qf.admin.service.MerchantsInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by  2019/8/16
 */
@Service
public class MerchantsInfoServiceImpl implements MerchantsInfoService {
    @Autowired
    MerchantsInfoDAO merchantsInfoDAO;

    /**
     * 获取所有商户的信息
     * @return
     */
    public List<MerchantsInfo> listMerchantsInfo() {
        return merchantsInfoDAO.listMerchantsInfo() ;
    }

    /**
     * 根据商户的id进行信息系修改
     * @param merchantsInfo
     * @return
     */
    public boolean editMerchantsInfoById(MerchantsInfo merchantsInfo) {
        return merchantsInfoDAO.editMerchantsInfoById(merchantsInfo)>0;
    }
    /**
     * 根据商户的id进行删除操作
     * @param merchantsInfo
     * @return
     */
    public boolean deleteMerchantsById(MerchantsInfo merchantsInfo) {
        return merchantsInfoDAO.deleteMerchantsById(merchantsInfo)>0;
    }

    /**
     *根据商户id来查询商户详细信息
     * @param landid
     * @return
     */
    public MerchantsInfo listMerchantsInfoById(int landid) {
        return merchantsInfoDAO.listMerchantsInfoById(landid);
    }
}
