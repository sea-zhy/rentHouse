package com.qf.user.toolkit;

import org.apache.commons.codec.digest.DigestUtils;

/**
 * Created by DELL on 2019/8/7.
 */
public class Md5 {

    public static String encodePassword(String pwd){
        String s = DigestUtils.md5Hex(pwd);
        for(int i=0;i<10;i++){
            s = DigestUtils.md5Hex(s.substring(15));
        }
        return s;
    }
}
