package com.qf.admin.service;

import com.qf.admin.pojo.MerchantsInfo;


import java.util.List;

/**
 * Created by  2019/8/16
 */

public interface MerchantsInfoService {
    /**
     * 获取所有商户信息
     * @return
     */
    public List<MerchantsInfo> listMerchantsInfo();
    /**
     * 根据商户landid来修改商户信息
     * @param merchantsInfo
     * @return
     */
    public boolean editMerchantsInfoById(MerchantsInfo merchantsInfo);

    /**
     * 根据商户landid来进行删除用户信息
     * @param merchantsInfo
     * @return
     */
    public boolean deleteMerchantsById(MerchantsInfo merchantsInfo);

    /**
     * 根据用户id进行查商户详细情况
     * @param landid
     * @return
     */
    public MerchantsInfo listMerchantsInfoById(int landid);

}
