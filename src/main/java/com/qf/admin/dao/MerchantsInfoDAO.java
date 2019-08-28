package com.qf.admin.dao;

import com.qf.admin.pojo.MerchantsInfo;


import java.util.List;

/**
 * Created by  2019/8/16
 */

public interface MerchantsInfoDAO {
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
    public int editMerchantsInfoById(MerchantsInfo merchantsInfo);

    /**
     * 根据商户landid来进行删除用户信息
     * @param merchantsInfo
     * @return
     */
    public int deleteMerchantsById(MerchantsInfo merchantsInfo);

    /**
     * 根据id来查询商户的详细信息以便于修改
     * @param landid
     * @return
     */
    public MerchantsInfo listMerchantsInfoById(int landid);

}
