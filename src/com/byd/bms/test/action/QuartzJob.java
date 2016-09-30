package com.byd.bms.test.action;

import java.text.SimpleDateFormat;
import java.util.Date;

public class QuartzJob {
	 public void work(){
		 SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 String curTime = df.format(new Date());
		 System.out.println(curTime + "---->Quartz的任务调度！！！");
	 }
	 
	 

}
