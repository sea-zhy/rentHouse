package com.qf.landlord.tool;

import org.apache.commons.codec.digest.DigestUtils;

public class MD5 {
    public static String getNewString(String str){
        String s = DigestUtils.md5Hex(str);
        for(int i=0;i<10;i++){
            s = DigestUtils.md5Hex(s.substring(16));
        }
        return s;
    }
}
