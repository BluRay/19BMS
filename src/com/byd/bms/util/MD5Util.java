package com.byd.bms.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;

import sun.misc.BASE64Encoder;

public class MD5Util {  
	  
    private static final String secureKey="19bms";
      
    /** 
     * 验证口令是否合法 
     *  
     * @param password 
     * @param passwordInDb 
     * @return 
     * @throws NoSuchAlgorithmException 
     * @throws UnsupportedEncodingException 
     */  
    public static boolean validPassword(String password, String passwordInDb)throws NoSuchAlgorithmException, UnsupportedEncodingException {  
        if(getEncryptedPwd(password).equals(passwordInDb)){
        	return true;
        }  else{
        	return false;
        }
    }  
  
    /** 
     * 获得加密后的16进制形式口令 
     *  
     * @param password 
     * @return 
     * @throws NoSuchAlgorithmException 
     * @throws UnsupportedEncodingException 
     */  
    public static String getEncryptedPwd(String password)  
            throws NoSuchAlgorithmException, UnsupportedEncodingException {  
    	//确定计算方法
        MessageDigest md5=MessageDigest.getInstance("MD5");
        BASE64Encoder base64en = new BASE64Encoder();
        //加密后的字符串
        StringBuffer sb=new StringBuffer(password);
        sb.append(secureKey);
        String encrptedPwd=base64en.encode(md5.digest(sb.toString().getBytes("utf-8")));
		return encrptedPwd;
    }  
}  
