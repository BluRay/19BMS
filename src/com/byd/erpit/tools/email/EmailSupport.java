package com.byd.erpit.tools.email;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.ResourceUtils;
/**
 * Email工具类
 * @company : 比亚迪股份有限公司
 * @author CaoQingqing
 * @date : Nov 29, 2009 11:09:46 PM
 */
public class EmailSupport {
	private String templet;
	private String encode;
	
	private static final Log log = LogFactory.getLog(EmailSupport.class);
	
	public InternetAddress[] parseAddress(String addressString){	
		if(addressString == null) return  new InternetAddress[0];
		try {
			log.info("開始解析email address ==>"+addressString);
			return InternetAddress.parse(addressString.replaceAll("\\s*[;,]\\s*", ","));
		} catch (AddressException e) {
			throw new UnsupportedOperationException("解析email address出錯!", e);
		}
	}
	protected String getTempletInner(){
		log.info("讀mail的模板文件 ==>"+this.getTemplet());
		StringBuffer buf = new StringBuffer();
		FileInputStream instr = null;
		InputStreamReader instrR = null;
		BufferedReader bufferedReaderObj = null;
		try {
			File file = ResourceUtils.getFile(templet);
			if(!file.exists())throw new UnsupportedOperationException("模板文件不存在==>file path:"+file.getPath());
//            java.io.FileReader fileReaderObj = new java.io.FileReader(file);
//            BufferedReader bufferedReaderObj = new BufferedReader(fileReaderObj);
			instr = new FileInputStream(file);
			instrR = new InputStreamReader(instr,this.getEncode());
			bufferedReaderObj = new BufferedReader(instrR);
			String strVal = "";
            while ((strVal = bufferedReaderObj.readLine()) != null) {
            	buf.append(strVal);
            }
            
        } catch (Exception ex) {
            throw new UnsupportedOperationException("讀取模板文件失敗!",ex);
        } finally{
        	if(instr != null){
        		try {
					instr.close();
				} catch (IOException e) {
					log.warn("fileInputStream can be not closed! \n\t"+e);
				}
        	}
        	if(instrR != null){
        		try {
					instrR.close();
				} catch (IOException e) {
					log.warn("InputStreamReader can be not closed! \n\t"+e);
				}
        	}
        	if(bufferedReaderObj != null){        		
        		try {
					bufferedReaderObj.close();
				} catch (IOException e) {
					log.warn("BufferedReader can be not closed! \n\t"+e);
				}
        	}
        }
		return buf.toString();
	}
	public void setTemplet(String templet) {
		this.templet = templet;
	}

	public String getTemplet() {
		return templet;
	}
	public void setEncode(String encode) {
		this.encode = encode;
	}
	public String getEncode() {
		return encode;
	}

	
}
