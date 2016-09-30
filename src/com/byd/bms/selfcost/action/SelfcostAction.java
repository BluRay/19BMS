package com.byd.bms.selfcost.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.selfcost.dao.ISelfcostDao;
import com.byd.bms.selfcost.entity.BmsCostClassification;
import com.byd.bms.selfcost.entity.BmsCostSchedule;
import com.byd.bms.selfcost.entity.BmsCostSinglebusManufacturing;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class SelfcostAction extends BaseAction<Object>{

	private static final long serialVersionUID = 1L;
	private Pager pager;
	private File file;					//获取上传文件
    private String fileFileName;		//获取上传文件名称
    private String fileContentType;		//获取上传文件类型   
    private String cost_month;
    private String query_factory_id;
    private String query_cost_month;
	private ISelfcostDao selfcostDao;
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	public ISelfcostDao getSelfcostDao() {
		return selfcostDao;
	}
	public void setSelfcostDao(ISelfcostDao selfcostDao) {
		this.selfcostDao = selfcostDao;
	}	
	public File getFile() {
		return file;
	}
	public void setFile(File file) {
		this.file = file;
	}
	public String getFileFileName() {
		return fileFileName;
	}
	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
	public String getFileContentType() {
		return fileContentType;
	}
	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}		
	public String getQuery_factory_id() {
		return query_factory_id;
	}
	public void setQuery_factory_id(String query_factory_id) {
		this.query_factory_id = query_factory_id;
	}
	public String getQuery_cost_month() {
		return query_cost_month;
	}
	public void setQuery_cost_month(String query_cost_month) {
		this.query_cost_month = query_cost_month;
	}
	public String getCost_month() {
		return cost_month;
	}
	public void setCost_month(String cost_month) {
		this.cost_month = cost_month;
	}
	public String index(){
		return "index";
	}
	
	public String singlebusmanufacturing(){
		return "singlebusmanufacturing";
	}
	
	public String classification(){
		return "classification";
	}
	
	public String schedule(){
		return "schedule";
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showClassification() throws IOException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("cost_month") != null) conditionMap.put("cost_month", request.getParameter("cost_month"));
		
		List datalist=new ArrayList();
		datalist=selfcostDao.queryClassification(conditionMap);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showSinglebusManufacturing() throws IOException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("cost_month") != null) conditionMap.put("cost_month", request.getParameter("cost_month"));
		
		List datalist=new ArrayList();
		datalist=selfcostDao.querySingleBusManufacturing(conditionMap);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
		
	}
	
	public String deleteSchedule() throws IOException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");

		selfcostDao.deleteScheduleById(Integer.valueOf(request.getParameter("schedule_id")));
		PrintWriter out = null;	
		
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showSchedule() throws IOException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		//if (request.getParameter("cost_month") != null) conditionMap.put("cost_month", request.getParameter("cost_month"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist=selfcostDao.querySchedule(conditionMap);
		int totalCount = selfcostDao.queryScheduleCount(conditionMap);
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	public String uploadSchedule(){
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		System.out.println("---->PlanAction::uploadSchedule");
	
		String path = ServletActionContext.getServletContext().getRealPath("/images/upload/planSchedule/");  
    	// 写到指定的路径中
    	File savefile = new File(path);
    	// 如果指定的路径没有就创建  
    	if (!savefile.exists()) {  
    		savefile.mkdirs();  
    	}
    	
    	//验证通过保存上传文件并开始写入数据库
    	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String curTime = df.format(new Date());
		SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatTime = df2.format(new Date());
		//String userName=getUser().getDisplay_name();
		int userId=getUser().getId();
		
		String fileType = fileFileName.substring(fileFileName.indexOf("."),fileFileName.length());
		System.out.println("---->fileType = " + fileType);
		String fileFileName = "schedule_" + userId + "_" + curTime + fileType;
		try {
			FileUtils.copyFile(file, new File(savefile, fileFileName));
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("---->验证通过开始写入数据库");		
		System.out.println("---->cost_month = " + cost_month);
		System.out.println("---->query_factory_id = " + query_factory_id);
		
		//先删除当前工厂当前月份原数据
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", query_factory_id);
		conditionMap.put("cost_month", cost_month);
		selfcostDao.deleteSchedule(conditionMap);

		BmsCostSchedule schedule = new BmsCostSchedule();
		schedule.setFactory_id(Integer.valueOf(query_factory_id));
		schedule.setCost_month(cost_month);
		schedule.setCost_detail_file(fileFileName);
		schedule.setCreator_id(userId);
		schedule.setCreate_date(creatTime);
		selfcostDao.insertSchedule(schedule);
		
		return "uploadschedule";
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked", "resource" })
	public String uploadClassification(){
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		System.out.println("---->PlanAction::uploadsinglebus");
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String path = ServletActionContext.getServletContext().getRealPath("/images/upload/planClassification/");  
    	// 写到指定的路径中
    	File savefile = new File(path);
    	// 如果指定的路径没有就创建  
    	if (!savefile.exists()) {  
    		savefile.mkdirs();  
    	}
    	//获取弹性键COST_DEPARTMENT
		List datalist=new ArrayList();
		datalist = selfcostDao.getCostDeptList();
		int costdeptcount = datalist.size();
		System.out.println("-->datalist.size() = " + datalist.size());
		String[] cost_dept_array = new String[costdeptcount];
		String[] cost_dept_array_key = new String[costdeptcount];
		for(int i=0;i<costdeptcount;i++){
			Map<String, String> costdept_map = new HashMap<String, String>();
			costdept_map = (Map<String, String>) datalist.get(i);
			cost_dept_array_key[i] = costdept_map.get("key_name");
			System.out.println("-->cost_dept_array_key = " + cost_dept_array_key[i]);
		}
		
		try {
			InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "GBK");
    		BufferedReader br  = new BufferedReader(isr);
			String line = "";
			int lineCount = 0;
			String factory_name ="";
			String data_month="";
			while ((line = br.readLine()) != null) {
				if (lineCount > 0){
					String[] planArray=line.split(",",-1);
					//验证数据
					if(planArray.length != 10){
						out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
					if (lineCount == 1){
						factory_name = planArray[0];
						data_month = planArray[2];
					}else{
						if(!planArray[0].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行工厂数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[2].equals(data_month)){
							out.print("第"+(lineCount+1)+"行月份数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
					}
					
					cost_dept_array[lineCount-1] = planArray[1];
				}
				lineCount ++;
			}
		//System.out.println("-->lineCount = " + lineCount + ";costdeptcount = " + costdeptcount);	
    	if ((lineCount-1) != costdeptcount){
    		out.print("导入文件的车间、部门有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
			return null;
    	}
    	for(int i=0;i<lineCount-1;i++){
    		//System.out.println("---->" + i + ":" + cost_dept_array[i]);
    		if (!isIn(cost_dept_array[i],cost_dept_array_key)){
    			out.print(cost_dept_array[i] + "数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
    			return null;
    		}
    	}
    	//验证通过保存上传文件并开始写入数据库
    	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String curTime = df.format(new Date());
		SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatTime = df2.format(new Date());
		String userName=getUser().getDisplay_name();
		int userId=getUser().getId();
		String fileFileName = userName + curTime + ".csv";
		FileUtils.copyFile(file, new File(savefile, fileFileName));
		System.out.println("---->验证通过开始写入数据库");

		//删除当前工厂当前月份数据
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_name", factory_name);
		conditionMap.put("cost_month", data_month);
		selfcostDao.deleteClassification(conditionMap);
		
		//获取工厂名称对应的factory_id
		this.query_factory_id=String.valueOf(getFactoryId(factory_name));
		this.query_cost_month=data_month;
		lineCount = 0;
		InputStreamReader isr2 = new InputStreamReader(new FileInputStream(file), "GBK");
		BufferedReader br2  = new BufferedReader(isr2);
		while ((line = br2.readLine()) != null) {
			System.out.println("---->验证通过开始写入数据库" + lineCount);
			
			if (lineCount > 0){
				String[] dataArray=line.split(",",-1);
				BmsCostClassification classification = new BmsCostClassification();
				classification.setFactory_name(dataArray[0]);
				classification.setCost_department_name(dataArray[1]);
				classification.setCost_month(dataArray[2]);
				classification.setMachine_cost(dataArray[3]);
				classification.setTooling_cost(dataArray[4]);
				classification.setOther_materials_cost(dataArray[5]);
				classification.setOther_cost(dataArray[6]);
				classification.setFuel_power_cost(dataArray[7]);
				classification.setLabor_cost(dataArray[8]);
				classification.setTotal_cost(dataArray[9]);
				classification.setCreator_id(userId);
				classification.setCreate_date(creatTime);
				selfcostDao.insertClassification(classification);			
			}
			lineCount++;
		}
		br.close();
		br2.close();
		
    	}catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}	
    	
    	return "uploadclassification";
    	
	}

	@SuppressWarnings({ "rawtypes", "unchecked", "resource" })
	public String uploadsinglebus(){
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		System.out.println("---->SelfActionAction::uploadsinglebus");
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String path = ServletActionContext.getServletContext().getRealPath("/images/upload/planSingleBus/");  
    	// 写到指定的路径中
    	File savefile = new File(path);
    	// 如果指定的路径没有就创建  
    	if (!savefile.exists()) {  
    		savefile.mkdirs();  
    	}

		//获取弹性键COST_DEPARTMENT
		List datalist=new ArrayList();
		datalist = selfcostDao.getCostDeptList();
		int costdeptcount = datalist.size();
		System.out.println("-->datalist.size() = " + datalist.size());
		String[] cost_dept_array = new String[costdeptcount];
		String[] cost_dept_array_key = new String[costdeptcount];
		for(int i=0;i<costdeptcount;i++){
			Map<String, String> costdept_map = new HashMap<String, String>();
			costdept_map = (Map<String, String>) datalist.get(i);
			cost_dept_array_key[i] = costdept_map.get("key_name");
			System.out.println("-->cost_dept_array_key = " + cost_dept_array_key[i]);
		}
		
    	try {
    		//BufferedReader br = new BufferedReader(new FileReader(file));
    		InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "GBK");
    		BufferedReader br  = new BufferedReader(isr);
			String line = "";
			int lineCount = 0;
			String factory_name ="";
			String data_month="";
			while ((line = br.readLine()) != null) {
				if (lineCount > 0){
					String[] planArray=line.split(",",-1);
					//验证数据
					if(planArray.length != 13){
						out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
					if (lineCount == 1){
						factory_name = planArray[0];
						data_month = planArray[2];
					}else{
						if(!planArray[0].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行工厂数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[2].equals(data_month)){
							out.print("第"+(lineCount+1)+"行月份数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
					}
					
					cost_dept_array[lineCount-1] = planArray[1];
					System.out.println("--->cost_dept_array = " + cost_dept_array[lineCount-1]);
				}
				lineCount ++;
			}
		//System.out.println("-->lineCount = " + lineCount + ";costdeptcount = " + costdeptcount);	
    	if ((lineCount-1) != costdeptcount){
    		out.print("导入文件的车间、部门有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
			return null;
    	}
    	/*for(int i=0;i<lineCount-1;i++){
    		//System.out.println("---->" + i + ":" + cost_dept_array[i]);
    		if (!isIn(cost_dept_array[i],cost_dept_array_key)){
    			out.print(cost_dept_array[i] + "数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
    			return null;
    		}
    	}*/
    	//验证通过保存上传文件并开始写入数据库
    	SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String curTime = df.format(new Date());
		SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatTime = df2.format(new Date());
		String userName=getUser().getDisplay_name();
		int userId=getUser().getId();
		String fileFileName = userName + curTime + ".csv";
		FileUtils.copyFile(file, new File(savefile, fileFileName));
		System.out.println("---->验证通过开始写入数据库");

		//删除当前工厂当前月份数据
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_name", factory_name);
		conditionMap.put("cost_month", data_month);
		selfcostDao.deleteSingleBusManufacturing(conditionMap);
		
		//获取工厂名称对应的factory_id
		this.query_factory_id=String.valueOf(getFactoryId(factory_name));
		this.query_cost_month=data_month;
		lineCount = 0;
		InputStreamReader isr2 = new InputStreamReader(new FileInputStream(file), "GBK");
		BufferedReader br2  = new BufferedReader(isr2);
		//BufferedReader br2 = new BufferedReader(new FileReader(file));
		while ((line = br2.readLine()) != null) {
			System.out.println("---->验证通过开始写入数据库" + lineCount);
			
			if (lineCount > 0){
				String[] dataArray=line.split(",",-1);
				BmsCostSinglebusManufacturing facturing = new BmsCostSinglebusManufacturing();
				facturing.setFactory_name(dataArray[0]);
				facturing.setCost_department_name(dataArray[1]);
				facturing.setCost_month(dataArray[2]);
				facturing.setReal_offline_qty(dataArray[3]);
				facturing.setAssess_offline_qty(dataArray[4]);
				facturing.setMachine_cost(dataArray[5]);
				facturing.setTooling_cost(dataArray[6]);
				facturing.setOther_materials_cost(dataArray[7]);
				facturing.setOther_cost(dataArray[8]);
				facturing.setFuel_power_cost(dataArray[9]);
				facturing.setLabor_cost(dataArray[10]);
				facturing.setTotal_cost(dataArray[11]);
				facturing.setEliminate_abnormal_total(dataArray[12]);
				facturing.setCreator_id(userId);
				facturing.setCreate_date(creatTime);
				
				selfcostDao.insertSingleBusManufacturing(facturing);				
			}
			lineCount++;
		}
		br.close();
		br2.close();
		
    	}catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
    	
    	return "uploadsinglebusmanufacturing";
	}
	
	public static boolean isIn(String substring, String[] source) {
		if (source == null || source.length == 0) {
			return false;
		}
		for (int i = 0; i < source.length; i++) {
			String aSource = source[i];
			if (aSource.equals(substring)) {
				return true;
			}
		}
		return false;
	}
	
	public int getFactoryId(String factory_name){
		//HttpServletRequest request = ServletActionContext.getRequest();
		int factory_id = 0;
		factory_id = selfcostDao.getFactory_id(factory_name);
		return factory_id;
	}
	
}
