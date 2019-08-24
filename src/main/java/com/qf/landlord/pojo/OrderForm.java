package com.qf.landlord.pojo;

import lombok.Data;

@Data
public class OrderForm {
    private int ordId;
    private long createTime;
    private int landId;
    private long upTime;
    private int houseId;
    private int shopId;
    private int dayNum;
    private String out_trade_no;
    private int total_amount;
    private String subject;

    public int getOrdId() {
        return ordId;
    }

    public void setOrdId(int ordId) {
        this.ordId = ordId;
    }

    public long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(long createTime) {
        this.createTime = createTime;
    }

    public int getLandId() {
        return landId;
    }

    public void setLandId(int landId) {
        this.landId = landId;
    }

    public long getUpTime() {
        return upTime;
    }

    public void setUpTime(long upTime) {
        this.upTime = upTime;
    }

    public int getHouseId() {
        return houseId;
    }

    public void setHouseId(int houseId) {
        this.houseId = houseId;
    }

    public int getShopId() {
        return shopId;
    }

    public void setShopId(int shopId) {
        this.shopId = shopId;
    }

    public int getDayNum() {
        return dayNum;
    }

    public void setDayNum(int dayNum) {
        this.dayNum = dayNum;
    }

    public String getOut_trade_no() {
        return out_trade_no;
    }

    public void setOut_trade_no(String out_trade_no) {
        this.out_trade_no = out_trade_no;
    }

    public int getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(int total_amount) {
        this.total_amount = total_amount;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("orderForm{");
        sb.append("ordId=").append(ordId);
        sb.append(", createTime=").append(createTime);
        sb.append(", landId=").append(landId);
        sb.append(", upTime=").append(upTime);
        sb.append(", houseId=").append(houseId);
        sb.append(", shopId=").append(shopId);
        sb.append(", dayNum=").append(dayNum);
        sb.append(", out_trade_no=").append(out_trade_no);
        sb.append(", total_amount=").append(total_amount);
        sb.append(", subject='").append(subject).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
