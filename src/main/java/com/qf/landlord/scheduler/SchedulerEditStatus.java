package com.qf.landlord.scheduler;

import com.qf.landlord.dao.LandlordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SchedulerEditStatus {
    @Autowired
    LandlordMapper landlordMapper;
    @Scheduled(cron = "0 0 1/23 * * ?")
    public void run() {
        long time = System.currentTimeMillis();
        landlordMapper.updateHouseStatusToOne(time);
        landlordMapper.updateShopInfoStatusToOne(time);
    }

}
