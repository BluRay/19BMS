package com.byd.bms.util.quartzjob;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.ServletActionContext;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import com.byd.bms.util.dao.ICommDao;
import com.byd.bms.util.poi.ExcelModel;
import com.byd.bms.util.poi.ExcelTool;

/**
 * @author Yangke 160309
 * 员工工时数据定时转存，每月最后一天转存上上月的数据
 *
 */
@Component("StaffHoursUnloading")
public class StaffHoursUnloading implements Job{
	@Resource
	private ICommDao commDao;
	public ICommDao getCommDao() {
		return commDao;
	}

	public void setCommDao(ICommDao commDao) {
		this.commDao = commDao;
	}

	public void work() throws IllegalAccessException{
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String curTime = df.format(new Date());
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -3);    	//得到上上月
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH)+1;
		String work_date = String.valueOf(year) + "-" + ((month<10)?"0"+String.valueOf(month):String.valueOf(month));
		System.out.println("---->Start StaffHoursUnloading work_date : " + work_date + ";curTime : " + curTime);
		/**
		 * 封装EXCEL抬头
		 */
		List<String> header = new ArrayList<String>();
		header.add("id");
		header.add("serial_number");
		header.add("org_id");
		header.add("hour_type");
		header.add("bus_number");
		header.add("bonus");
		header.add("ecn_task_id");
		header.add("temp_order_id");
		header.add("wait_reason");
		header.add("exception_id");
		header.add("detailed_reasons");
		header.add("work_date");
		header.add("staff_id");
		header.add("skill_parameter");
		header.add("participation");
		header.add("real_participation");
		header.add("work_hour");
		header.add("real_work_hour");
		header.add("status");
		header.add("editor_id");
		header.add("edit_date");
		header.add("approver_id");
		header.add("approve_date");		
		
		String fileName ="StaffHoursUnloading_"+curTime;
		fileName = fileName+".xlsx";
		ExcelModel excelModel = new ExcelModel();
		excelModel.setPath(fileName);
		excelModel.setSheetName("标准单价");
		//excelModel.setDocCaption("员工信息");
		excelModel.setHeader(header);
		List<Object[]> data = new ArrayList<Object[]>();
		
		List<Map<String, Object>> list = commDao.queryStaffHoursUnloading(work_date);
		System.out.println("---->StaffHours num: " + list.size());
		
		for(int s=0;s<list.size();s++){
			Map<String, Object> map = list.get(s);			
			int i=0;
			Object[] objArr = new Object[header.size()];
			objArr[i]=map.get("id");
			objArr[++i]=map.get("serial_number");
			objArr[++i]=map.get("org_id");
			objArr[++i]=map.get("hour_type");
			objArr[++i]=map.get("bus_number");
			objArr[++i]=map.get("bonus");
			objArr[++i]=map.get("ecn_task_id");
			objArr[++i]=map.get("temp_order_id");
			objArr[++i]=map.get("wait_reason");
			objArr[++i]=map.get("exception_id");
			objArr[++i]=map.get("detailed_reasons");
			objArr[++i]=map.get("work_date");
			objArr[++i]=map.get("staff_id");
			objArr[++i]=map.get("skill_parameter");
			objArr[++i]=map.get("participation");
			objArr[++i]=map.get("real_participation");
			objArr[++i]=map.get("work_hour");
			objArr[++i]=map.get("real_work_hour");
			objArr[++i]=map.get("status");
			objArr[++i]=map.get("editor_id");
			objArr[++i]=map.get("edit_date");
			objArr[++i]=map.get("approver_id");
			objArr[++i]=map.get("approve_date");
			data.add(objArr);
		}
		
		excelModel.setData(data);
		//设置响应头和下载保存的文件名
		ExcelTool excelTool = new ExcelTool();
		String path = getWebRoot() + "file/StaffHoursUnloading/";
		excelTool.saveExcel(excelModel, path + fileName);
		//excelTool.saveExcel(excelModel, "D:\\BYD\\" + fileName);
		
		commDao.delStaffHoursUnloading(work_date);
		
		System.out.println("---->Finish StaffHoursUnloading");
	}
	
	public String getWebClassesPath() {
		String path = getClass().getProtectionDomain().getCodeSource().getLocation().getPath();
		return path;
	}

	public String getWebRoot() throws IllegalAccessException {
		String path = getWebClassesPath();
		if (path.indexOf("WEB-INF") > 0) {
			path = path.substring(0, path.indexOf("WEB-INF/classes"));
		} else {
			throw new IllegalAccessException("");
		}
		return path;
	}
	
	public static void main(String[] args) throws IllegalAccessException {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -3);    	//得到上上月
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH)+1;
		String work_date = String.valueOf(year) + "-" + ((month<10)?"0"+String.valueOf(month):String.valueOf(month));
		System.out.println("---->" + work_date);
		
		StaffHoursUnloading staffHoursUnloading = new StaffHoursUnloading();
		String path = staffHoursUnloading.getWebRoot();
		System.out.println("---->" + path);
	}

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		
	}
}
