package com.byd.bms.plan.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.xwork.StringUtils;

import com.byd.bms.order.entity.BmsFactoryOrder;
import com.byd.bms.order.entity.BmsOrder;
import com.byd.bms.plan.dao.IPlanDao;
import com.byd.bms.plan.entity.BmsPDException;
import com.byd.bms.plan.entity.PlanAmend;
import com.byd.bms.plan.entity.PlanBus;
import com.byd.bms.plan.entity.PlanBusNumber;
import com.byd.bms.plan.entity.PlanBusTransfer;
import com.byd.bms.plan.entity.PlanConfigIssedQty;
import com.byd.bms.plan.entity.PlanIssuance;
import com.byd.bms.plan.entity.PlanIssuanceCount;
import com.byd.bms.plan.entity.PlanIssuanceTotal;
import com.byd.bms.plan.entity.PlanMasterPlan;
import com.byd.bms.plan.entity.PlanProductionPlan;
import com.byd.bms.plan.entity.PlanVIN;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseOperateChangeLog;
import com.byd.bms.util.entity.Pager;

public class PlanAction extends BaseAction<Object> {

	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger(PlanAction.class.getName());
	private static final Map<String,String> vinYearMap=new HashMap<String,String>();
	private static final Map<String,Integer> vinCharMap=new HashMap<String,Integer>();
	private static final Map<Integer,Integer> weightMap=new HashMap<Integer,Integer>();
	static{
		vinYearMap.put("2015", "F");vinYearMap.put("2016", "G");vinYearMap.put("2017", "H");
		vinYearMap.put("2018", "J");vinYearMap.put("2019", "K");vinYearMap.put("2020", "L");
		vinYearMap.put("2021", "M");vinYearMap.put("2022", "N");vinYearMap.put("2023", "P");
		vinYearMap.put("2024", "R");vinYearMap.put("2025", "S");vinYearMap.put("2026", "T");
		
		vinCharMap.put("A", 1);vinCharMap.put("B", 2);vinCharMap.put("C", 3);
		vinCharMap.put("D", 4);vinCharMap.put("E", 5);vinCharMap.put("F", 6);
		vinCharMap.put("G", 7);vinCharMap.put("H", 8);vinCharMap.put("J", 1);
		vinCharMap.put("K", 2);vinCharMap.put("L", 3);vinCharMap.put("M", 4);
		vinCharMap.put("N", 5);vinCharMap.put("P", 7);vinCharMap.put("R", 9);
		vinCharMap.put("S", 2);vinCharMap.put("T", 3);vinCharMap.put("U", 4);
		vinCharMap.put("V", 5);vinCharMap.put("W", 6);vinCharMap.put("X", 7);
		vinCharMap.put("Y", 8);vinCharMap.put("Z", 9);vinCharMap.put("0", 0);
		vinCharMap.put("1", 1);vinCharMap.put("2", 2);vinCharMap.put("3", 3);
		vinCharMap.put("4", 4);vinCharMap.put("5", 5);vinCharMap.put("6", 6);
		vinCharMap.put("7", 7);vinCharMap.put("8", 8);vinCharMap.put("9", 9);
		
		weightMap.put(1, 8);weightMap.put(2, 7);weightMap.put(3, 6);weightMap.put(4, 5);
		weightMap.put(5, 4);weightMap.put(6, 3);weightMap.put(7, 2);weightMap.put(8, 10);
		weightMap.put(10, 9);weightMap.put(11, 8);weightMap.put(12, 7);weightMap.put(13, 6);
		weightMap.put(14, 5);weightMap.put(15, 4);weightMap.put(16, 3);weightMap.put(17, 2);
		
	}
	private IPlanDao planDao;	
	private Pager pager;
	private File file;					//获取上传文件
    private String fileFileName;		//获取上传文件名称
    private String fileContentType;		//获取上传文件类型    
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
	public IPlanDao getPlanDao() {
		return planDao;
	}
	public void setPlanDao(IPlanDao planDao) {
		this.planDao = planDao;
	}
	
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	public String index(){
		return "index";
	}
	
	public String importMaster(){
		return "importMaster";
	}
	
	public String preview(){
		return "preview";
	}
	
	public String revision(){
		return "revision";
	}
	
	public String month(){
		return "month";
	}
	
	public String issuance(){
		return "issuance2";
	}
	
	public String issuance2(){
		return "issuance2";
	}
	
	public String generatevin(){
		return "generatevin";
	}
	
	public String busnumbersearch(){
		return "busnumbersearch";
	}
	
	public String plandone(){
		return "plandone";
	}
	
	public String plansearch(){
		return "plansearch";
	}
	
	public String bustransfer(){
		return "bustransfer";
	}
	
	public String exceptionmanager(){
		return "exceptionmanager";
	}
	
	public String pausemanager(){
		return "pausemanager";
	}
	
	@SuppressWarnings({ "resource", "rawtypes" })
	public String uploadvin(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::uploadvin " + curTime + " " + userid);
		
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		logger.info("---->PlanAction::uploadvin");
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String path = ServletActionContext.getServletContext().getRealPath("/images/upload/planImportVin/");  
    	// 写到指定的路径中  
    	File savefile = new File(path);
    	// 如果指定的路径没有就创建  
    	if (!savefile.exists()) {  
    		savefile.mkdirs();  
    	}
    	try {
			BufferedReader br = new BufferedReader(new FileReader(file));
			String line = "";
			int lineCount = 0;
			List<String> vincheckArray = new ArrayList<String>(); 
			List plan_code=new ArrayList();
			int bus_numberCount = 0;
			while ((line = br.readLine()) != null) {
				if (lineCount > 0){
					String[] vinArray=line.split(",",-1);
					//验证数据
					if(vinArray.length < 4){
						out.print("第"+(lineCount+1)+"行数据有误，请检查后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
					if(!vinArray[4].equals("")){	//VIN号与车号是否匹配校验  K8-SB-2016-1220
						System.out.println("---->" + vinArray[4]);
						Map<String,Object> conditionMap=new HashMap<String,Object>();
						conditionMap.put("vin", vinArray[1]);
						conditionMap.put("bus_number", vinArray[4].substring(0,vinArray[4].lastIndexOf("-")));
						plan_code.add(conditionMap);
						bus_numberCount++;
					}
					vincheckArray.add(vinArray[1]);
				}
				lineCount ++;
			}
			
			//160519 生成VIN号程序，导入模板删除“生产日期”列，同时新增导入校验重复值（车号、VIN号重复）逻辑
			//导入文件VIN号重复校验   VIN号与车号是否匹配校验 
			boolean flag = true;   //假设不重复 
            for(int i = 0;i < vincheckArray.size()-1;i++){ //循环开始元素 
            	for(int j = i + 1;j < vincheckArray.size();j++){ //循环后续所有元素 
            		//如果相等，则重复 
	            	if(vincheckArray.get(i).equals(vincheckArray.get(j))){ 
	                	flag = false; //设置标志变量为重复 
	                	break;      //结束循环 
	                } 
	        	} 
            }
            if(!flag){
            	out.print("导入的VIN号有重复，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
				return null;
            }
            List result=new ArrayList();
    		if(plan_code.size()>0){result = planDao.checkVinBusnumber(plan_code);}
            System.out.println("----> bus_numberCount = " + bus_numberCount + "|result.size = " + result.size());
            if(result.size()>0){
            	String checkVin = "";
            	for(int c=0 ;c<result.size(); c++){
            		checkVin += ((Map<String, String>)result.get(c)).get("vin") + " ";
            	}
            	
            	out.print("导入的VIN号"+checkVin+"存在与车号规则不相符的，请检查后重新上传！<a href=\"javascript:history.back();\">返回</a>");
				return null;
            }
			
			//验证通过保存上传文件并开始写入数据库
			SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String creatTime = df2.format(new Date());
			String userName=getUser().getDisplay_name();
			int userId=getUser().getId();
			String fileFileName = userName + curTime + ".csv";
			FileUtils.copyFile(file, new File(savefile, fileFileName));
			
			lineCount = 0;
			BufferedReader br2 = new BufferedReader(new FileReader(file));
			
			while ((line = br2.readLine()) != null) {
				logger.info("---->验证通过开始更新数据库" + lineCount);
				if (lineCount > 0){
					String[] vinArray=line.split(",",-1);
					PlanVIN vin = new PlanVIN();
					vin.setVin(vinArray[1]);
					vin.setLeft_motor_number(vinArray[2]);
					vin.setRight_motor_number(vinArray[3]);
					vin.setCreator_id(userId);
					vin.setCreat_date(creatTime);
					vin.setBus_number(vinArray[4]);
					
					//校验VIN、左右电机号是否重复绑定
					List<String> busList=planDao.selectBusByMotorVin(vin);
					if(busList==null){
						//如果用户填了车号，需同步更新【BMS_PLAN_BUS】
						if(vinArray[4]!=""){
							planDao.updatePlanBus(vin);
						}else
							planDao.updatePlanVin(vin);
					}else if(busList.size()==1&&vin.getBus_number().equals(busList.get(0))){
						//如果用户填了车号，需同步更新【BMS_PLAN_BUS】
						if(vinArray[4]!=""){
							planDao.updatePlanBus(vin);
						}else
							planDao.updatePlanVin(vin);
					}else{
						out.print("导入的VIN号："+vin.getVin()+",左/右电机号："+vin.getLeft_motor_number()+"/"+vin.getRight_motor_number()+"不能重复绑定，请检查后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
					
					
				}
				lineCount++;
			}			
			
    	}catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}				
		return "generatevin";
	}
	
	@SuppressWarnings({ "resource", "rawtypes" })
	public String upload(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date dd = new Date();
		String curTime = df.format(dd);
		int userid=getUser().getId();
		logger.info("---->PlanAction::upload " + curTime + " " + userid);
		
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String path = ServletActionContext.getServletContext().getRealPath("/images/upload/planImport/");  
    	// 写到指定的路径中  
    	File savefile = new File(path);
    	// 如果指定的路径没有就创建  
    	if (!savefile.exists()) {  
    		savefile.mkdirs();  
    	}
    	
    	try {
    		InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "GBK");
    		BufferedReader br = new BufferedReader(isr);   
    		//BufferedReader br = new BufferedReader(new FileReader(file));
			// 读取直到最后一行
			String line = "";
			String plan_no = "";		//订单编号
			String factory_name = "";
			String plan_date = "";
			int lineCount = 0;
			
			while ((line = br.readLine()) != null) {
				// logger.info("---->lineGBK = " + line);
				if (lineCount > 0){
					String[] planArray=line.split(",",-1);
					//验证数据
					//logger.info("---->length = " + planArray.length);
					if(planArray.length != 35){
						out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
					
					int lineCountSwitch = lineCount % 12;
					switch(lineCountSwitch){
					case 0:
						if(!planArray[2].equals("入库")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						
						break; 
					case 1:
						plan_no = planArray[0];
						factory_name = planArray[1];
						plan_date = planArray[3];
						//判断上传计划的工厂是否属于些订单
						Map<String,Object> importPlanMap=new HashMap<String,Object>();
						importPlanMap.put("order_no", plan_no);
						importPlanMap.put("factory_name", factory_name);
						String factory_order_id = planDao.checkImportPlanFactory(importPlanMap);
						if (factory_order_id == null){
							out.print(plan_no + " 订单没有 "+factory_name+"的计划，不能上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						
						//判断plan_no在plan_date月份内是否有发布，发布后不能重复导入
						Map<String,Object> conditionMap=new HashMap<String,Object>();
						conditionMap.put("order_no", plan_no);
						conditionMap.put("factory_name", factory_name);
						conditionMap.put("plan_date", plan_date);
						List datalist=new ArrayList();
						datalist = planDao.checkProductionPlan(conditionMap);
						
						if(datalist.size()>0){
							out.print(plan_no + " 订单已有发布数据,不能重复导入！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						
						if(!planArray[2].equals("自制件下线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; 
					case 2:
						if(!planArray[2].equals("部件上线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; 
					case 3:
						if(!planArray[2].equals("部件下线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; 
					case 4:
						if(!planArray[2].equals("焊装上线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; 
					case 5:
						if(!planArray[2].equals("焊装下线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; 
					/**case 6:
						if(!planArray[2].equals("玻璃钢下线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; **/
					case 6:
						if(!planArray[2].equals("涂装上线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; 
					case 7:
						if(!planArray[2].equals("涂装下线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; 
					case 8:
						if(!planArray[2].equals("底盘上线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; 
					case 9:
						if(!planArray[2].equals("底盘下线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break; 
					case 10:
						if(!planArray[2].equals("总装上线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break;
					case 11:
						if(!planArray[2].equals("总装下线")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break;
						/*case 12:
						if(!planArray[2].equals("入库")){
							out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[0].equals(plan_no)){
							out.print("第"+(lineCount+1)+"行订单编号不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[1].equals(factory_name)){
							out.print("第"+(lineCount+1)+"行生产工厂不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						if(!planArray[3].equals(plan_date)){
							out.print("第"+(lineCount+1)+"行生产年月不一致，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
							return null;
						}
						break;*/
					}	
				}
				lineCount++;
			}			
			//上传的文件行数验证
			if(((lineCount - 1)%12) != 0){				
				out.print("导入文件的行数有误！<a href=\"javascript:history.back();\">返回</a>");
				return null;
			}
			
			//验证通过保存上传文件并开始写入数据库
			SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String creatTime = df2.format(new Date());
			String userName=getUser().getDisplay_name();
			int userId=getUser().getId();
			String fileFileName = userName + curTime + ".csv";
			logger.info("---->验证通过开始写入数据库");
			
			lineCount = 0;
			InputStreamReader isr2 = new InputStreamReader(new FileInputStream(file), "GBK");
    		BufferedReader br2  = new BufferedReader(isr2);   
			while ((line = br2.readLine()) != null) {
				logger.info("---->验证通过开始写入数据库" + lineCount);
				if (lineCount > 0){
					String[] planArray=line.split(",",-1);
					PlanMasterPlan newMasterPlan = new PlanMasterPlan();
					//modify by wuxiao 2015/9/29
					newMasterPlan.setVersion(new SimpleDateFormat("yyyyMMddHHmmss").format(dd));
					newMasterPlan.setOrder_no(planArray[0]);
					newMasterPlan.setFactory_name(planArray[1]);
					newMasterPlan.setPlan_code_keyname(planArray[2]);
					newMasterPlan.setPlan_month(planArray[3]);
					newMasterPlan.setFlag("0");
					if (!planArray[4].equals("")) newMasterPlan.setD1(Integer.parseInt(planArray[4]));
					if (!planArray[5].equals("")) newMasterPlan.setD2(Integer.parseInt(planArray[5]));
					if (!planArray[6].equals("")) newMasterPlan.setD3(Integer.parseInt(planArray[6]));
					if (!planArray[7].equals("")) newMasterPlan.setD4(Integer.parseInt(planArray[7]));
					if (!planArray[8].equals("")) newMasterPlan.setD5(Integer.parseInt(planArray[8]));
					if (!planArray[9].equals("")) newMasterPlan.setD6(Integer.parseInt(planArray[9]));
					if (!planArray[10].equals("")) newMasterPlan.setD7(Integer.parseInt(planArray[10]));
					if (!planArray[11].equals("")) newMasterPlan.setD8(Integer.parseInt(planArray[11]));
					if (!planArray[12].equals("")) newMasterPlan.setD9(Integer.parseInt(planArray[12]));
					if (!planArray[13].equals("")) newMasterPlan.setD10(Integer.parseInt(planArray[13]));
					
					if (!planArray[14].equals("")) newMasterPlan.setD11(Integer.parseInt(planArray[14]));
					if (!planArray[15].equals("")) newMasterPlan.setD12(Integer.parseInt(planArray[15]));
					if (!planArray[16].equals("")) newMasterPlan.setD13(Integer.parseInt(planArray[16]));
					if (!planArray[17].equals("")) newMasterPlan.setD14(Integer.parseInt(planArray[17]));
					if (!planArray[18].equals("")) newMasterPlan.setD15(Integer.parseInt(planArray[18]));
					if (!planArray[19].equals("")) newMasterPlan.setD16(Integer.parseInt(planArray[19]));
					if (!planArray[20].equals("")) newMasterPlan.setD17(Integer.parseInt(planArray[20]));
					if (!planArray[21].equals("")) newMasterPlan.setD18(Integer.parseInt(planArray[21]));
					if (!planArray[22].equals("")) newMasterPlan.setD19(Integer.parseInt(planArray[22]));
					if (!planArray[23].equals("")) newMasterPlan.setD20(Integer.parseInt(planArray[23]));
					
					if (!planArray[24].equals("")) newMasterPlan.setD21(Integer.parseInt(planArray[24]));
					if (!planArray[25].equals("")) newMasterPlan.setD22(Integer.parseInt(planArray[25]));
					if (!planArray[26].equals("")) newMasterPlan.setD23(Integer.parseInt(planArray[26]));
					if (!planArray[27].equals("")) newMasterPlan.setD24(Integer.parseInt(planArray[27]));
					if (!planArray[28].equals("")) newMasterPlan.setD25(Integer.parseInt(planArray[28]));
					if (!planArray[29].equals("")) newMasterPlan.setD26(Integer.parseInt(planArray[29]));
					if (!planArray[30].equals("")) newMasterPlan.setD27(Integer.parseInt(planArray[30]));
					if (!planArray[31].equals("")) newMasterPlan.setD28(Integer.parseInt(planArray[31]));
					if (!planArray[32].equals("")) newMasterPlan.setD29(Integer.parseInt(planArray[32]));
					if (!planArray[33].equals("")) newMasterPlan.setD30(Integer.parseInt(planArray[33]));
					if (!planArray[34].equals("")) newMasterPlan.setD31(Integer.parseInt(planArray[34]));
					
					newMasterPlan.setCreator_id(userId);
					newMasterPlan.setCreate_date(creatTime);
					
					planDao.insertMasterPlan(newMasterPlan);
				}
				lineCount++;
			}
			br.close();
			br2.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return "importMasterSuccess";
	}
	
	public String reVisionPlan() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::reVisionPlan " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		int userId=getUser().getId();
		String factory_id = request.getParameter("factory_id");
		String order_no = request.getParameter("order_no");
		String revision_str = request.getParameter("revision_str");
		String plan_month = request.getParameter("plan_month");
		logger.info("----> order_no = " + order_no + ",factory_id = " + factory_id);
		logger.info("----> revision_str = " + revision_str);
		
		//复制指定工厂ID指定订单编号 最新版本 最大flag 的计划，保存flag+1
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("version", "");
		conditionMap.put("factory_id", factory_id);
		conditionMap.put("order_no", order_no);
		conditionMap.put("plan_month", plan_month);
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List<PlanMasterPlan> datalist=new ArrayList<PlanMasterPlan>();
		datalist=planDao.getPlanMasterList(conditionMap);
		SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatTime = df2.format(new Date());
		logger.info("---->datalist.size() = " + datalist.size());
		for(int i=0;i<datalist.size();i++){
			PlanMasterPlan copyPlanMasterPlan = (PlanMasterPlan) datalist.get(i);
			copyPlanMasterPlan.setFlag(String.valueOf(Integer.parseInt(copyPlanMasterPlan.getFlag())+1));
			copyPlanMasterPlan.setCreate_date(creatTime);
			
			planDao.insertMasterPlan(copyPlanMasterPlan);
			//更新 新增的 id 到list
			datalist.set(i, copyPlanMasterPlan);
		}

		//根据revision_str 更新计划信息  11,3,0,201507,1,8,0; [order_id,factory,i,month,day,num,old_num]
		if (revision_str.length()>0){
		String[] revisionStrArray=revision_str.split(";");
		logger.info("length = " + revisionStrArray.length);
		for(int i = 0; i < revisionStrArray.length; i++){
			String[] revisionArray = revisionStrArray[i].split(",");
			PlanMasterPlan editPlanMasterPlan = (PlanMasterPlan) datalist.get(Integer.parseInt(revisionArray[2]));
			//revisionArray[6] = String.valueOf(editPlanMasterPlan.getD1()); //原值
			switch(Integer.parseInt(revisionArray[4])){
			case 1:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD1());editPlanMasterPlan.setD1(Integer.parseInt(revisionArray[5]));break;
			case 2:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD2());editPlanMasterPlan.setD2(Integer.parseInt(revisionArray[5]));break;
			case 3:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD3());editPlanMasterPlan.setD3(Integer.parseInt(revisionArray[5]));break;
			case 4:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD4());editPlanMasterPlan.setD4(Integer.parseInt(revisionArray[5]));break;
			case 5:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD5());editPlanMasterPlan.setD5(Integer.parseInt(revisionArray[5]));break;
			case 6:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD6());editPlanMasterPlan.setD6(Integer.parseInt(revisionArray[5]));break;
			case 7:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD7());editPlanMasterPlan.setD7(Integer.parseInt(revisionArray[5]));break;
			case 8:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD8());editPlanMasterPlan.setD8(Integer.parseInt(revisionArray[5]));break;
			case 9:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD9());editPlanMasterPlan.setD9(Integer.parseInt(revisionArray[5]));break;
			case 10:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD10());editPlanMasterPlan.setD10(Integer.parseInt(revisionArray[5]));break;

			case 11:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD11());editPlanMasterPlan.setD11(Integer.parseInt(revisionArray[5]));break;
			case 12:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD12());editPlanMasterPlan.setD12(Integer.parseInt(revisionArray[5]));break;
			case 13:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD13());editPlanMasterPlan.setD13(Integer.parseInt(revisionArray[5]));break;
			case 14:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD14());editPlanMasterPlan.setD14(Integer.parseInt(revisionArray[5]));break;
			case 15:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD15());editPlanMasterPlan.setD15(Integer.parseInt(revisionArray[5]));break;
			case 16:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD16());editPlanMasterPlan.setD16(Integer.parseInt(revisionArray[5]));break;
			case 17:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD17());editPlanMasterPlan.setD17(Integer.parseInt(revisionArray[5]));break;
			case 18:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD18());editPlanMasterPlan.setD18(Integer.parseInt(revisionArray[5]));break;
			case 19:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD19());editPlanMasterPlan.setD19(Integer.parseInt(revisionArray[5]));break;
			case 20:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD20());editPlanMasterPlan.setD20(Integer.parseInt(revisionArray[5]));break;

			case 21:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD21());editPlanMasterPlan.setD21(Integer.parseInt(revisionArray[5]));break;
			case 22:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD22());editPlanMasterPlan.setD22(Integer.parseInt(revisionArray[5]));break;
			case 23:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD23());editPlanMasterPlan.setD23(Integer.parseInt(revisionArray[5]));break;
			case 24:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD24());editPlanMasterPlan.setD24(Integer.parseInt(revisionArray[5]));break;
			case 25:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD25());editPlanMasterPlan.setD25(Integer.parseInt(revisionArray[5]));break;
			case 26:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD26());editPlanMasterPlan.setD26(Integer.parseInt(revisionArray[5]));break;
			case 27:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD27());editPlanMasterPlan.setD27(Integer.parseInt(revisionArray[5]));break;
			case 28:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD28());editPlanMasterPlan.setD28(Integer.parseInt(revisionArray[5]));break;
			case 29:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD29());editPlanMasterPlan.setD29(Integer.parseInt(revisionArray[5]));break;
			case 30:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD30());editPlanMasterPlan.setD30(Integer.parseInt(revisionArray[5]));break;
			case 31:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD31());editPlanMasterPlan.setD31(Integer.parseInt(revisionArray[5]));break;
			
			}
			
			logger.info("---->id = " + editPlanMasterPlan.getId());
			logger.info("---->month = " + editPlanMasterPlan.getPlan_month());
			logger.info("---->D1 = " + editPlanMasterPlan.getD1());
			logger.info("---->flag = " + editPlanMasterPlan.getFlag());
			planDao.updatePlanMasterInfo(editPlanMasterPlan);
			
			//根据revision_str 更新日志表 operate_change_type_id = 63 table_name = BMS_PLAN_MASTER_PLAN
			BmsBaseOperateChangeLog changLog = new BmsBaseOperateChangeLog();
			changLog.setOperate_change_type_id(63);
			changLog.setTable_name("BMS_PLAN_MASTER_PLAN");
			changLog.setField_id(editPlanMasterPlan.getId());
			changLog.setField_name("D" + revisionArray[4]);
			changLog.setOld_value(revisionArray[6]);
			changLog.setNew_value(revisionArray[5]);
			changLog.setChanger_id(userId);
			changLog.setChange_date(creatTime);
			planDao.insertOperateChangeLog(changLog);
		}
		}
		
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"调整成功",null,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showPlanMasterIndex() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::showPlanMasterIndex " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != null) conditionMap.put("order_no", request.getParameter("order_no"));
		//if (request.getParameter("plan_month") != null) conditionMap.put("plan_month", request.getParameter("plan_month").replaceAll("-", ""));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List datalist=new ArrayList();
		datalist=planDao.getplanMasterIndex(conditionMap);
		int totalCount=planDao.getplanMasterIndexCount(conditionMap);
		
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
	
	/**
	 * 查询已经发布的计划，已发布的计划不能再修改
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getPlanIssed() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::getPlanIssed " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");		
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		List datalist=new ArrayList();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		datalist = planDao.getPlanIssed(conditionMap);
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		
		return null;
	}
	
	public String addPause() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::addPause " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	

		logger.info("---->lines = " + request.getParameter("lines"));
		String[] staffArray=request.getParameter("lines").toString().split(",");
		for(int i=0;i<staffArray.length;i++){
			logger.info("---->line = " + staffArray[i]);
			BmsPDException exception = new BmsPDException();
			exception.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
			exception.setWorkshop_id(Integer.parseInt(request.getParameter("workshop_id")));
			exception.setLine_id(Integer.parseInt(staffArray[i]));
			exception.setStart_time(request.getParameter("pause_date_start"));
			//exception.setFinish_time(request.getParameter("pause_date_end"));
			exception.setPfinish_time(request.getParameter("pfinish_time"));
			exception.setDetailed_reasons(request.getParameter("detailed_reasons"));
			exception.setEmail_id(Integer.parseInt(request.getParameter("email_id")));
			exception.setBus_type_id(Integer.parseInt(request.getParameter("bus_type_id")));
			exception.setDuty_department_id(Integer.parseInt(request.getParameter("duty_department_id")));
			exception.setReason_type_id(Integer.parseInt(request.getParameter("reason_type_id")));
			exception.setWaste_num(Integer.parseInt(request.getParameter("waste_num")));
			exception.setMemo(request.getParameter("memo"));
			exception.setEmail_send(request.getParameter("email_send"));
			exception.setEditor_id(userid);
			exception.setEdit_date(curTime);
			exception.setException_type("1");
			exception.setOrder(request.getParameter("order"));
			exception.setOrderDesc(request.getParameter("orderDesc"));
			exception.setP_pause_time(request.getParameter("p_pause_time"));
			
			planDao.addException(exception);
		}
		
		JSONObject json = Util.dataListToJson(true,"新增成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings("rawtypes")
	public String addException() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::addException " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		String bus_number = request.getParameter("bus_number");
		//判断车号是否存在
		List busInfo=new ArrayList();
		busInfo = planDao.getBusInfo(bus_number);
		logger.info("---->busInfo.size() = " + busInfo.size());
		if(busInfo.size()==0){
			JSONObject json = Util.dataListToJson(false,"车号有误！",null,null);
			out = response.getWriter();
			out.print(json);
			return null;
		}
		
		BmsPDException exception = new BmsPDException();
		exception.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
		exception.setWorkshop_id(Integer.parseInt(request.getParameter("workshop_id")));
		exception.setLine_id(Integer.parseInt(request.getParameter("line_id")));
		exception.setBus_number(request.getParameter("bus_number"));
		exception.setProcess_id(Integer.parseInt(request.getParameter("process_id")));
		exception.setReason_type_id(Integer.parseInt(request.getParameter("reason_type_id")));
		exception.setDetailed_reasons(request.getParameter("detailed_reasons"));
		exception.setSeverity_level(Integer.parseInt(request.getParameter("severity_level")));
		exception.setDuty_department_id(Integer.parseInt(request.getParameter("duty_department_id")));
		exception.setMeasures(Integer.parseInt(request.getParameter("measures")));
		exception.setEditor_id(userid);
		exception.setEdit_date(curTime);
		exception.setException_type("0");
		
		planDao.addException(exception);
		
		JSONObject json = Util.dataListToJson(true,"新增成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String editExceptionInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::editExceptionInfo " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		BmsPDException exception = new BmsPDException();
		exception.setId(Integer.parseInt(request.getParameter("id")));
		if(StringUtils.isNotEmpty(request.getParameter("factory_id"))) exception.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
		if(StringUtils.isNotEmpty(request.getParameter("workshop_id"))) exception.setWorkshop_id(Integer.parseInt(request.getParameter("workshop_id")));
		if(StringUtils.isNotEmpty(request.getParameter("line_id"))) exception.setLine_id(Integer.parseInt(request.getParameter("line_id")));
		if(StringUtils.isNotEmpty(request.getParameter("bus_number"))) exception.setBus_number(request.getParameter("bus_number"));
		if(StringUtils.isNotEmpty(request.getParameter("process_id"))) exception.setProcess_id(Integer.parseInt(request.getParameter("process_id")));
		if(StringUtils.isNotEmpty(request.getParameter("reason_type_id"))) exception.setReason_type_id(Integer.parseInt(request.getParameter("reason_type_id")));
		if(StringUtils.isNotEmpty(request.getParameter("detailed_reasons"))) exception.setDetailed_reasons(request.getParameter("detailed_reasons"));
		if(StringUtils.isNotEmpty(request.getParameter("severity_level"))) exception.setSeverity_level(Integer.parseInt(request.getParameter("severity_level")));
		if(StringUtils.isNotEmpty(request.getParameter("duty_department_id"))) exception.setDuty_department_id(Integer.parseInt(request.getParameter("duty_department_id")));
		if(StringUtils.isNotEmpty(request.getParameter("measures"))) exception.setMeasures(Integer.parseInt(request.getParameter("measures")));
		if(StringUtils.isNotEmpty(request.getParameter("solution"))) exception.setSolution(request.getParameter("solution"));
		if(StringUtils.isNotEmpty(request.getParameter("close_date"))) exception.setClose_date(request.getParameter("close_date"));
		if(StringUtils.isNotEmpty(request.getParameter("start_time"))) exception.setStart_time(request.getParameter("start_time"));
		if(StringUtils.isNotEmpty(request.getParameter("finish_time"))) exception.setFinish_time(request.getParameter("finish_time"));
		if(StringUtils.isNotEmpty(request.getParameter("pfinish_time"))) exception.setPfinish_time(request.getParameter("pfinish_time"));
		if(StringUtils.isNotEmpty(request.getParameter("memo"))) exception.setMemo(request.getParameter("memo"));
		if(StringUtils.isNotEmpty(request.getParameter("email_id"))) exception.setEmail_id(Integer.parseInt(request.getParameter("email_id")));
		if(StringUtils.isNotEmpty(request.getParameter("email_send"))) exception.setEmail_send(request.getParameter("email_send"));
		if(StringUtils.isNotEmpty(request.getParameter("bus_type"))) exception.setBus_type_id(Integer.parseInt(request.getParameter("bus_type")));
		if(StringUtils.isNotEmpty(request.getParameter("waste_num"))) exception.setWaste_num(Integer.parseInt(request.getParameter("waste_num")));
		if(StringUtils.isNotEmpty(request.getParameter("pause_time"))) exception.setPause_time(request.getParameter("pause_time"));
		
		if(StringUtils.isNotEmpty(request.getParameter("finish_time"))) exception.setCloser_id(userid);
		if(StringUtils.isNotEmpty(request.getParameter("finish_time"))) exception.setStatus(1);
		exception.setCapacityLoss(request.getParameter("capacityLoss"));
		exception.setException_type(request.getParameter("exception_type"));
		exception.setEditor_id(userid);
		exception.setEdit_date(curTime);
		if(!StringUtils.isNotEmpty(request.getParameter("finish_time"))){
			planDao.updateExceptionInfo(exception);
		}else{
			planDao.manageExceptionInfo(exception);
		}
		
		
		JSONObject json = Util.dataListToJson(true,"编辑成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getExceptionList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::getExceptionList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (StringUtils.isNotEmpty(request.getParameter("factory_id"))) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (StringUtils.isNotEmpty(request.getParameter("workshop_id"))) conditionMap.put("workshop_id", request.getParameter("workshop_id"));
		if (StringUtils.isNotEmpty(request.getParameter("line_id"))) conditionMap.put("line_id", request.getParameter("line_id"));
		if (StringUtils.isNotEmpty(request.getParameter("bus_number"))) conditionMap.put("bus_number", request.getParameter("bus_number"));
		if (StringUtils.isNotEmpty(request.getParameter("severity_level"))) conditionMap.put("severity_level", request.getParameter("severity_level"));
		if (StringUtils.isNotEmpty(request.getParameter("measures"))) conditionMap.put("measures", request.getParameter("measures"));
		if (StringUtils.isNotEmpty(request.getParameter("status"))) conditionMap.put("status", request.getParameter("status"));
		if (StringUtils.isNotEmpty(request.getParameter("date_start"))) conditionMap.put("date_start", request.getParameter("date_start"));
		if (StringUtils.isNotEmpty(request.getParameter("date_end"))) conditionMap.put("date_end", request.getParameter("date_end"));
		if (StringUtils.isNotEmpty(request.getParameter("exception_id"))) conditionMap.put("exception_id", request.getParameter("exception_id"));
		if (StringUtils.isNotEmpty(request.getParameter("exception_type"))) conditionMap.put("exception_type", request.getParameter("exception_type"));
		if (StringUtils.isNotEmpty(request.getParameter("reason_type_id"))) conditionMap.put("reason_type_id", request.getParameter("reason_type_id"));
		if (StringUtils.isNotEmpty(request.getParameter("order_no"))) conditionMap.put("order_no", request.getParameter("order_no"));
		if (StringUtils.isNotEmpty(request.getParameter("date_start2"))) conditionMap.put("date_start2", request.getParameter("date_start2"));
		if (StringUtils.isNotEmpty(request.getParameter("date_end2"))) conditionMap.put("date_end2", request.getParameter("date_end2"));
		if (StringUtils.isNotEmpty(request.getParameter("factory_name"))) conditionMap.put("factory_name", request.getParameter("factory_name"));
			
		//if(StringUtils.isNotEmpty(request.getParameter("query_type"))){
			if (pager != null){
				conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
				conditionMap.put("pageSize", pager.getPageSize());
				
				/*if (request.getParameter("factory_id") == null){
					conditionMap.put("offset", 0);
					conditionMap.put("pageSize", 10);
				}*/
			}
		//}
		
		List datalist=new ArrayList();
		datalist=planDao.getExceptionList(conditionMap);
		int totalCount=planDao.getExceptionListCount(conditionMap);
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
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showPlanMasterList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::showPlanMasterList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("version") != null) conditionMap.put("version", request.getParameter("version"));
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != null) conditionMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("plan_month") != null) conditionMap.put("plan_month", request.getParameter("plan_month"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List datalist=new ArrayList();
		datalist=planDao.getPlanMasterList(conditionMap);
		int totalCount=0;
		
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
	
	public String issuancePlanSubmit() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::issuancePlanSubmit " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");	
		int userId=getUser().getId();
		PrintWriter out = null;
		logger.info("---->factory_id = "
				+ request.getParameter("factory_id") + ",issuance_date = " + request.getParameter("issuance_date") 
				+ ",issuance_str = " + request.getParameter("issuance_str") );
		/**
		String order_no = request.getParameter("order_no");
		//通过order_no获取订单生产年份
		BmsOrder order_info =planDao.getOrderInfoByOrderNo(order_no);
		String bus_type = order_info.getBus_type();
		String order_code = order_info.getOrder_code();
		String year = order_info.getProductive_year();
		String order_type = order_info.getOrder_type();		//订单类型，KD件不产生车号	
		**/
		
		String issuance_date = request.getParameter("issuance_date");
		int factory_id = Integer.valueOf(request.getParameter("factory_id"));
		String issuance_str = request.getParameter("issuance_str");
		
		//60:,1,2,3,4,5,6,7,8,9,10,11;59:,0,0,0,0,0,0,0,0,0,0,0;
		String[] issuanceStrArray=issuance_str.split(";");
		//int plan_code_id[]={0,9,10,11,12,13,15,16,17,18,19,20};
		int plan_code_id[]={0,4,9,10,11,12,15,16,17,18,19,20,70};		//删除玻璃钢，增加自制件、入库
		//发布前验证：已发布数 + 当天发布数 必须 小于 总计划数

		//当前车号的生成规则是通过SQL自动产生，产生规则见planDao::insertPlanBusNumber		
		int bus_count = 0;				//【BMS_FACTORY_ORDER】 已发布数计数
		for(int i = 0; i < issuanceStrArray.length; i++){
			String[] issuanceArray = issuanceStrArray[i].split(",");
			//根据 config_id 获取 order_id
			String order_id = planDao.getOrderIdByConfigId(issuanceArray[0].substring(0, issuanceArray[0].length()-1));
			logger.info("---->config_id = " + issuanceArray[0].substring(0, issuanceArray[0].length()-1) + ",plan1=" 
					+ issuanceArray[1] + ",order_id="+ order_id);
			
			BmsOrder order_info =planDao.getOrderInfoByOrderID(order_id);
			String order_no = order_info.getOrder_no();
			String bus_type = order_info.getBus_type();
			String order_code = order_info.getOrder_code();
			String year = order_info.getProductive_year();
			String order_type = order_info.getOrder_type();		//订单类型，KD件不产生车号	
			
			for(int j=1;j<issuanceArray.length;j++){
				if (Integer.valueOf(issuanceArray[j])>0){
					PlanProductionPlan productionPlan = new PlanProductionPlan();
					productionPlan.setOrder_no(order_no);
					productionPlan.setFactory_id(factory_id);
					productionPlan.setPlan_code_id(plan_code_id[j]);
					productionPlan.setPlan_date(issuance_date);
					productionPlan.setOrder_config_id(Integer.valueOf(issuanceArray[0].substring(0, issuanceArray[0].length()-1)));
					productionPlan.setPlan_qty(Integer.valueOf(issuanceArray[j]));
					productionPlan.setCreator_id(userId);
					productionPlan.setCreat_date(curTime);				
					int production_plan_id = 0;
					planDao.insertPlanIssuance(productionPlan);
					production_plan_id = productionPlan.getId();
					
					//焊装上线节点 开始生成车号 					
					if(plan_code_id[j]==11){
						if(order_type.equals("KD件")){
							logger.info("---->当前订单为KD件，不产生车号");
						}else{
							int busPlanQty=Integer.valueOf(issuanceArray[j]);	//发布数量
							for (int n=0;n<busPlanQty;n++){//START循环生成车号
								//查询当前订单 当前工厂  【BMS_FACTORY_ORDER_DETAIL】
								Map<String,Object> orderDetailMap=new HashMap<String,Object>();
								orderDetailMap.put("factory_id", factory_id);
								orderDetailMap.put("order_no", order_no);
								List datalist=new ArrayList();
								datalist = planDao.getFactoryOrderDetail(orderDetailMap);
								for(int k=0;k<datalist.size();k++){
									Map<String,String> result = new HashMap<String,String>();
									result = (Map<String, String>) datalist.get(k);
									//System.out.println(String.valueOf(result.get("id")) + "|" + String.valueOf(result.get("busnum_start")) + "|" + String.valueOf(result.get("busnum_end")) + "|" + String.valueOf(result.get("qty")));
									if(Integer.valueOf(String.valueOf(result.get("bus_number_count")))<Integer.valueOf(String.valueOf(result.get("qty")))){
										//车号生成数 < 总数
										int cur_bus_number = Integer.valueOf(String.valueOf(result.get("bus_number_start"))) + Integer.valueOf(String.valueOf(result.get("bus_number_count")));
										int detail_id = Integer.valueOf(String.valueOf(result.get("detail_id")));
										logger.info("---->当前车号为:" + cur_bus_number);
										//判断生成的车号是否已经生成
										Map<String,Object> queryMap2=new HashMap<String,Object>();
										queryMap2.put("order_no", order_no);
										queryMap2.put("num", cur_bus_number);
										PlanBusNumber TempbusNumber = new PlanBusNumber();
										TempbusNumber = planDao.checkBusNumber(queryMap2);
										int countNumber = 0;
										if(TempbusNumber!=null){
											//车号已经存在，计算新车号
											logger.info("---->当前车号已经存在:" + cur_bus_number);										
										}else{
											PlanBusNumber busNumber = new PlanBusNumber();
											busNumber.setCreator_id(userId);
											busNumber.setPrint_sign("0");
											busNumber.setCreat_date(curTime);
											busNumber.setNum(cur_bus_number);
											busNumber.setBus_code(bus_type);
											busNumber.setOrder_code(order_code);
											busNumber.setYear(year);
											int busNumberId = planDao.insertPlanBusNumber(busNumber);
											logger.info("---->busNumberId = " + busNumberId + "=" + busNumber.getId());
											
											PlanBus bus = new PlanBus();
											bus.setBus_number_id(busNumber.getId());
											bus.setFactory_id(factory_id);
											bus.setStatus("0");
											bus.setOrder_no(order_no);
											bus.setOrder_cofig_id(Integer.valueOf(issuanceArray[0].substring(0, issuanceArray[0].length()-1)));
											bus.setSequence(i+1);
											bus.setProduction_plan_id(production_plan_id);
											planDao.insertPlanBus(bus);
											
										}	
										//更新工厂已发布数:已发布数+1
										planDao.updateFactoryOrderDetail(detail_id);
										bus_count++;								
										break;
									}
								}
								
							}//END循环生成车号
						}
						
					}
				}			
			}
		}		

		JSONObject json = Util.dataListToJson(true,String.valueOf(bus_count),null,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);		
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String issuancePlan2() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		//String order_no = request.getParameter("order_no");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("issuance_date") != null) conditionMap.put("issuance_date", request.getParameter("issuance_date"));
		conditionMap.put("day",Integer.valueOf(request.getParameter("issuance_date").substring(6, 8)));		
		conditionMap.put("issuance_month",request.getParameter("issuance_date").substring(0, 6));	
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != null) conditionMap.put("order_no", request.getParameter("order_no"));

		//判断发布订单是否已经发布到工厂
		String msg = "查询成功";
		List checkdatalist=new ArrayList();
		checkdatalist = planDao.checkPlanIssuanceList(conditionMap);
		if (checkdatalist.size() == 0){
			msg = "当前没有可发布的计划";
		}else{
			for(int i=0;i<checkdatalist.size(); i++){
				Map<String,String> cerMap = (Map<String, String>) checkdatalist.get(i);
				if(cerMap.get("product_qty") == null){
					msg = cerMap.get("order_no") + "没有发布工厂配置！";
					//System.out.println(cerMap.get("order_no") + "没有发布工厂配置！");
				}
			}
		}
		
		List datalist=new ArrayList();
		List resultlist=new ArrayList();
		datalist = planDao.getPlanIssuanceList(conditionMap);		
		
		int cur_order_id = 0;
		List total_datalist=new ArrayList();
		int issed_count_4 = 0;
		int issed_count_9 = 0;
		int issed_count_10 = 0;
		int issed_count_11 = 0;
		int issed_count_12 = 0;
		//int issed_count_13 = 0;
		int issed_count_15 = 0;
		int issed_count_16 = 0;
		int issed_count_17 = 0;
		int issed_count_18 = 0;
		int issed_count_19 = 0;
		int issed_count_20 = 0;
		int issed_count_70 = 0;
		for(int i=0;i<datalist.size(); i++){
			PlanIssuance cur_planIssuance = (PlanIssuance)datalist.get(i);
			int this_order_id = cur_planIssuance.getOrder_id();
			if(cur_order_id == 0 || cur_order_id != this_order_id){
				System.out.println("---->this_order_id = " + this_order_id);
				//获取调整后的计划总数
				PlanIssuance newIssuance = new PlanIssuance();
				newIssuance.setOrder_config_name(cur_planIssuance.getOrder_no() + "总数");
				Map<String,Object> conditionMap2=new HashMap<String,Object>();				
				conditionMap2.put("day",Integer.valueOf(request.getParameter("issuance_date").substring(6, 8)));		
				conditionMap2.put("month",request.getParameter("issuance_date").substring(0, 6));		
				conditionMap2.put("factory_id", request.getParameter("factory_id"));
				conditionMap2.put("order_id", cur_planIssuance.getOrder_id());
				//conditionMap2.put("day",7);		
				
				total_datalist = planDao.getPlanIssuanceTotal(conditionMap2);
				
				//判断当前订单是否有调整后的计划
				if(total_datalist.size() != 0){
					newIssuance.setPlan_code_4(((PlanIssuanceTotal)total_datalist.get(0)).getNum());
					newIssuance.setPlan_code_9(((PlanIssuanceTotal)total_datalist.get(1)).getNum());
					newIssuance.setPlan_code_10(((PlanIssuanceTotal)total_datalist.get(2)).getNum());
					newIssuance.setPlan_code_11(((PlanIssuanceTotal)total_datalist.get(3)).getNum());
					newIssuance.setPlan_code_12(((PlanIssuanceTotal)total_datalist.get(4)).getNum());
					//newIssuance.setPlan_code_13(((PlanIssuanceTotal)total_datalist.get(4)).getNum());
					newIssuance.setPlan_code_15(((PlanIssuanceTotal)total_datalist.get(5)).getNum());
					newIssuance.setPlan_code_16(((PlanIssuanceTotal)total_datalist.get(6)).getNum());
					newIssuance.setPlan_code_17(((PlanIssuanceTotal)total_datalist.get(7)).getNum());
					newIssuance.setPlan_code_18(((PlanIssuanceTotal)total_datalist.get(8)).getNum());
					newIssuance.setPlan_code_19(((PlanIssuanceTotal)total_datalist.get(9)).getNum());
					newIssuance.setPlan_code_20(((PlanIssuanceTotal)total_datalist.get(10)).getNum());
					newIssuance.setPlan_code_70(((PlanIssuanceTotal)total_datalist.get(11)).getNum());
				}
				issed_count_4 = 0;
				issed_count_9 = 0;
				issed_count_10 = 0;
				issed_count_11 = 0;
				issed_count_12 = 0;
				//int issed_count_13 = 0;
				issed_count_15 = 0;
				issed_count_16 = 0;
				issed_count_17 = 0;
				issed_count_18 = 0;
				issed_count_19 = 0;
				issed_count_20 = 0;
				issed_count_70 = 0;
				resultlist.add(newIssuance);
			}
			System.out.println("---->conf = " + cur_planIssuance.getOrder_config_name());
			cur_order_id = cur_planIssuance.getOrder_id();
			
			
			//计算配置发布数的推荐值
			//获取当前配置的总计划数及已发布数量
			
			

			PlanIssuance planIssuance = (PlanIssuance)datalist.get(i);
			// 判断planIssuance的生产节点是否已经发布
			logger.info("---->判断planIssuance的生产节点是否已经发布" + planIssuance.getOrder_config_id() + "|" + request.getParameter("issuance_date"));
			//planIssuance.setPlan_code_issed_9_done(1);
			List iss_done_list=new ArrayList();
			Map<String,Object> iss_queryMap=new HashMap<String,Object>();
			iss_queryMap.put("factory_id", request.getParameter("factory_id"));
			iss_queryMap.put("plan_date", request.getParameter("issuance_date"));
			iss_queryMap.put("order_id", planIssuance.getOrder_id());
			iss_done_list = planDao.getProductionPlanIssuanceList(iss_queryMap);
			logger.info("---->iss_done_list.size = " + iss_done_list.size());
			for(int j=0;j<iss_done_list.size();j++){
				PlanProductionPlan issedPlan = (PlanProductionPlan)iss_done_list.get(j);
				//logger.info("----XXXX" + issedPlan.getPlan_code_id());
				
				switch (issedPlan.getPlan_code_id()){
				case 4:
					planIssuance.setPlan_code_issed_4_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_4(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_4(0);
					}	
					break;
				case 9:
					planIssuance.setPlan_code_issed_9_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_9(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_9(0);
					}	
					break;
				case 10:
					planIssuance.setPlan_code_issed_10_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_10(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_10(0);
					}	
					break;
				case 11:
					planIssuance.setPlan_code_issed_11_done(1);
					logger.info("---->getPlan_qty = " + issedPlan.getPlan_qty());
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_11(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_11(0);
					}	
					break;
				case 12:
					planIssuance.setPlan_code_issed_12_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_12(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_12(0);
					}	
					break;
				case 13:
					planIssuance.setPlan_code_issed_13_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_13(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_13(0);
					}	
					break;
				case 15:
					planIssuance.setPlan_code_issed_15_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_15(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_15(0);
					}	
					break;
				case 16:
					planIssuance.setPlan_code_issed_16_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_16(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_16(0);
					}	
					break;
				case 17:
					planIssuance.setPlan_code_issed_17_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_17(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_17(0);
					}	
					break;
				case 18:
					planIssuance.setPlan_code_issed_18_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_18(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_18(0);
					}	
					break;
				case 19:
					planIssuance.setPlan_code_issed_19_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_19(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_19(0);
					}	
					break;
				case 20:
					planIssuance.setPlan_code_issed_20_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_20(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_20(0);
					}	
					break;
				case 70:
					planIssuance.setPlan_code_issed_70_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_70(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_70(0);
					}	
					break;
				}
				
			}
			
			Map<String,Object> conditionMap3=new HashMap<String,Object>();
			conditionMap3.put("order_id", ((PlanIssuance)datalist.get(i)).getOrder_id());
			conditionMap3.put("factory_id", request.getParameter("factory_id"));
			conditionMap3.put("order_config_id", ((PlanIssuance)datalist.get(i)).getOrder_config_id());
			conditionMap3.put("plan_date", request.getParameter("issuance_date"));
			List total_data_count=new ArrayList();			//已分配数
			total_data_count = planDao.getPlanIssuanceCount(conditionMap3);
			for(int j=0;j<total_data_count.size();j++){
				PlanIssuanceCount tempIssuanceCount = (PlanIssuanceCount)total_data_count.get(j);
				logger.info("---->getPlan_code_id = " + tempIssuanceCount.getPlan_code_id());
				switch(tempIssuanceCount.getPlan_code_id()){
				case 4:
					planIssuance.setPlan_code_issed_4(tempIssuanceCount.getIssed_qty());
					break;
				case 9:
					planIssuance.setPlan_code_issed_9(tempIssuanceCount.getIssed_qty());
					break;
				case 10:
					planIssuance.setPlan_code_issed_10(tempIssuanceCount.getIssed_qty());
					break;
				case 11:
					planIssuance.setPlan_code_issed_11(tempIssuanceCount.getIssed_qty());
					break;
				case 12:
					planIssuance.setPlan_code_issed_12(tempIssuanceCount.getIssed_qty());
					break;
				case 13:
					planIssuance.setPlan_code_issed_13(tempIssuanceCount.getIssed_qty());
					break;
				case 15:
					planIssuance.setPlan_code_issed_15(tempIssuanceCount.getIssed_qty());
					break;
				case 16:
					planIssuance.setPlan_code_issed_16(tempIssuanceCount.getIssed_qty());
					break;
				case 17:
					planIssuance.setPlan_code_issed_17(tempIssuanceCount.getIssed_qty());
					break;
				case 18:
					planIssuance.setPlan_code_issed_18(tempIssuanceCount.getIssed_qty());
					break;
				case 19:
					planIssuance.setPlan_code_issed_19(tempIssuanceCount.getIssed_qty());
					break;
				case 20:
					planIssuance.setPlan_code_issed_20(tempIssuanceCount.getIssed_qty());
					break;	
				case 70:
					planIssuance.setPlan_code_issed_70(tempIssuanceCount.getIssed_qty());
					break;	
				}				
			}
			
			//获取当前工厂  当前配置  当前月份  总计划数  及 已发布数之和
			int order_config_Qty = 0;
			order_config_Qty = planDao.getPlanConfigQty(((PlanIssuance)datalist.get(i)).getOrder_config_id());
			planIssuance.setPlan_config_qty(order_config_Qty);
			
			Map<String,Object> conditionMap4=new HashMap<String,Object>();
			conditionMap4.put("order_id", ((PlanIssuance)datalist.get(i)).getOrder_id());
			conditionMap4.put("factory_id", request.getParameter("factory_id"));
			conditionMap4.put("order_config_id", ((PlanIssuance)datalist.get(i)).getOrder_config_id());
			List plan_config_issed_qty = new ArrayList();
			plan_config_issed_qty = planDao.getPlanConfigIssedQty(conditionMap4);
			for(int j=0;j<plan_config_issed_qty.size();j++){
				PlanConfigIssedQty config_issed_qty = (PlanConfigIssedQty) plan_config_issed_qty.get(j);
				int plan_code_id = config_issed_qty.getPlan_code_id();
				logger.info("-->plan_code_id = " + plan_code_id + ";getSum_plan_qty = " + config_issed_qty.getSum_plan_qty());
				switch(plan_code_id){
				case 4:
					planIssuance.setPlan_config_qty_4_done(config_issed_qty.getSum_plan_qty());
					break;
				case 9:
					planIssuance.setPlan_config_qty_9_done(config_issed_qty.getSum_plan_qty());
					break;
				case 10:
					planIssuance.setPlan_config_qty_10_done(config_issed_qty.getSum_plan_qty());
					break;
				case 11:
					planIssuance.setPlan_config_qty_11_done(config_issed_qty.getSum_plan_qty());
					break;
				case 12:
					planIssuance.setPlan_config_qty_12_done(config_issed_qty.getSum_plan_qty());
					break;
				case 13:
					planIssuance.setPlan_config_qty_13_done(config_issed_qty.getSum_plan_qty());
					break;
				case 15:
					planIssuance.setPlan_config_qty_15_done(config_issed_qty.getSum_plan_qty());
					break;
				case 16:
					planIssuance.setPlan_config_qty_16_done(config_issed_qty.getSum_plan_qty());
					break;
				case 17:
					planIssuance.setPlan_config_qty_17_done(config_issed_qty.getSum_plan_qty());
					break;
				case 18:
					planIssuance.setPlan_config_qty_18_done(config_issed_qty.getSum_plan_qty());
					break;
				case 19:
					planIssuance.setPlan_config_qty_19_done(config_issed_qty.getSum_plan_qty());
					break;
				case 20:
					planIssuance.setPlan_config_qty_20_done(config_issed_qty.getSum_plan_qty());
					break;
				case 70:
					planIssuance.setPlan_config_qty_70_done(config_issed_qty.getSum_plan_qty());
					break;
				}
			}
			
			int plan_qty_4 = ((PlanIssuanceTotal)total_datalist.get(0)).getNum();
			logger.info("-->plan_qty_4 = " + plan_qty_4);
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_4()) < plan_qty_4){
				planIssuance.setPlan_code_4(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_4()) > plan_qty_4){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_4_done() < plan_qty_4){
					//当前配置总计划数 - 当前配置已发布部 < 当天计划数
					planIssuance.setPlan_code_4((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_4_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_4_done():0);
					issed_count_4 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_4_done();
				}else{
					planIssuance.setPlan_code_4((plan_qty_4 - issed_count_4>=0)?plan_qty_4 - issed_count_4:0);
					issed_count_4 += plan_qty_4;
				}
			}else{
				planIssuance.setPlan_code_4(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_4() - issed_count_4);
				issed_count_4 += plan_qty_4;
			}
			
			int plan_qty_9 = ((PlanIssuanceTotal)total_datalist.get(1)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_9()) < plan_qty_9){
				planIssuance.setPlan_code_9(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_9()) > plan_qty_9){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_9_done() < plan_qty_9){
					//当前配置总计划数 - 当前配置已发布部 < 当天计划数
					planIssuance.setPlan_code_9((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_9_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_9_done():0);
					issed_count_9 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_9_done();
				}else{
					planIssuance.setPlan_code_9((plan_qty_9 - issed_count_9>=0)?plan_qty_9 - issed_count_9:0);
					issed_count_9 += plan_qty_9;
				}
				
				//planIssuance.setPlan_code_9((plan_qty_9 - issed_count_9>=0)?plan_qty_9 - issed_count_9:0);
				//issed_count_9 += plan_qty_9;
			}else{
				planIssuance.setPlan_code_9(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_9() - issed_count_9);
				issed_count_9 += plan_qty_9;
			}
			//logger.info("-->issed_count_9 = " + issed_count_9);
			int plan_qty_10 = ((PlanIssuanceTotal)total_datalist.get(2)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_10()) < plan_qty_10){
				planIssuance.setPlan_code_10(0);
				//issed_count_10 += plan_qty_10;
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_10()) > plan_qty_10){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_10_done() < plan_qty_10){
					planIssuance.setPlan_code_10((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_10_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_10_done():0);
					issed_count_10 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_10_done();
				}else{
					planIssuance.setPlan_code_10((plan_qty_10 - issed_count_10>=0)?plan_qty_10 - issed_count_10:0);
					issed_count_10 += plan_qty_10;
				}
				
			}else{
				planIssuance.setPlan_code_10(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_10() - issed_count_10);
				issed_count_10 += plan_qty_10;
			}

			int plan_qty_11 = ((PlanIssuanceTotal)total_datalist.get(3)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_11()) < plan_qty_11){
				planIssuance.setPlan_code_11(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_11()) > plan_qty_11){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_11_done() < plan_qty_11){
					planIssuance.setPlan_code_11((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_11_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_11_done():0);
					issed_count_11 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_11_done();
				}else{
					planIssuance.setPlan_code_11((plan_qty_11 - issed_count_11>=0)?plan_qty_11 - issed_count_11:0);
					issed_count_11 += plan_qty_11;
				}
				
			}else{
				planIssuance.setPlan_code_11(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_11() - issed_count_11);
				issed_count_11 += plan_qty_11;
			}
			
			int plan_qty_12 = ((PlanIssuanceTotal)total_datalist.get(4)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_12()) < plan_qty_12){
				planIssuance.setPlan_code_12(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_12()) > plan_qty_12){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_12_done() < plan_qty_12){
					planIssuance.setPlan_code_12((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_12_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_12_done():0);
					issed_count_12 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_12_done();
				}else{
					planIssuance.setPlan_code_12((plan_qty_12 - issed_count_12 >=0)?plan_qty_12 - issed_count_12:0);
					issed_count_12 += plan_qty_12;
				}
				
			}else{
				planIssuance.setPlan_code_12(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_12() - issed_count_12);
				issed_count_12 += plan_qty_12;
			}
			/**
			int plan_qty_13 = ((PlanIssuanceTotal)total_datalist.get(4)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_13()) < plan_qty_13){
				planIssuance.setPlan_code_13(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_13()) > plan_qty_13){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_13_done() < plan_qty_13){
					planIssuance.setPlan_code_13(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_13_done());
					issed_count_13 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_13_done();
				}else{
					planIssuance.setPlan_code_13((plan_qty_13 - issed_count_13>=0)?plan_qty_13 - issed_count_13:0);
					issed_count_13 += plan_qty_13;
				}
				
			}else{
				planIssuance.setPlan_code_13(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_13() - issed_count_13);
				issed_count_13 += plan_qty_13;
			}**/

			int plan_qty_15 = ((PlanIssuanceTotal)total_datalist.get(5)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_15()) < plan_qty_15){
				planIssuance.setPlan_code_15(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_15()) > plan_qty_15){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_15_done() < plan_qty_15){
					planIssuance.setPlan_code_15((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_15_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_15_done():0);
					issed_count_15 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_15_done();
				}else{
					planIssuance.setPlan_code_15((plan_qty_15 - issed_count_15>=0)?plan_qty_15 - issed_count_15:0);
					issed_count_15 += plan_qty_15;
				}
				
			}else{
				planIssuance.setPlan_code_15(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_15() - issed_count_15);
				issed_count_15 += plan_qty_15;
			}

			int plan_qty_16 = ((PlanIssuanceTotal)total_datalist.get(6)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_16()) < plan_qty_16){
				planIssuance.setPlan_code_16(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_16()) > plan_qty_16){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_16_done() < plan_qty_16){
					planIssuance.setPlan_code_16((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_16_done()>0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_16_done():0);
					issed_count_16 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_16_done();
				}else{
					planIssuance.setPlan_code_16((plan_qty_16 - issed_count_16>=0)?plan_qty_16 - issed_count_16:0);
					issed_count_16 += plan_qty_16;
				}
				
			}else{
				planIssuance.setPlan_code_16(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_16() - issed_count_16);
				issed_count_16 += plan_qty_16;
			}

			int plan_qty_17 = ((PlanIssuanceTotal)total_datalist.get(7)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_17()) < plan_qty_17){
				planIssuance.setPlan_code_17(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_17()) > plan_qty_17){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_17_done() < plan_qty_17){
					planIssuance.setPlan_code_17((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_17_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_17_done():0);
					issed_count_17 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_17_done();
				}else{
					planIssuance.setPlan_code_17((plan_qty_17 - issed_count_17>=0)?plan_qty_17 - issed_count_17:0);
					issed_count_17 += plan_qty_17;
				}
				
			}else{
				planIssuance.setPlan_code_17(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_17() - issed_count_17);
				issed_count_17 += plan_qty_17;
			}

			int plan_qty_18 = ((PlanIssuanceTotal)total_datalist.get(8)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_18()) < plan_qty_18){
				planIssuance.setPlan_code_18(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_18()) > plan_qty_18){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_18_done() < plan_qty_18){
					planIssuance.setPlan_code_18((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_18_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_18_done():0);
					issed_count_18 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_18_done();
				}else{
					planIssuance.setPlan_code_18((plan_qty_18 - issed_count_18>=0)?plan_qty_18 - issed_count_18:0);
					issed_count_18 += plan_qty_18;
				}
				
			}else{
				planIssuance.setPlan_code_18(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_18() - issed_count_18);
				issed_count_18 += plan_qty_18;
			}

			int plan_qty_19 = ((PlanIssuanceTotal)total_datalist.get(9)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_19()) < plan_qty_19){
				planIssuance.setPlan_code_19(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_19()) > plan_qty_19){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_19_done() < plan_qty_19){
					planIssuance.setPlan_code_19((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_19_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_19_done():0);
					issed_count_19 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_19_done();
				}else{
					planIssuance.setPlan_code_19((plan_qty_19 - issed_count_19>=0)?plan_qty_19 - issed_count_19:0);
					issed_count_19 += plan_qty_19;
				}
				
			}else{
				planIssuance.setPlan_code_19(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_19() - issed_count_19);
				issed_count_19 += plan_qty_19;
			}

			int plan_qty_20 = ((PlanIssuanceTotal)total_datalist.get(10)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_20()) < plan_qty_20){
				planIssuance.setPlan_code_20(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_20()) > plan_qty_20){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_20_done() < plan_qty_20){
					planIssuance.setPlan_code_20((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_20_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_20_done():0);
					issed_count_20 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_20_done();
				}else{
					planIssuance.setPlan_code_20((plan_qty_20 - issed_count_20>=0)?plan_qty_20 - issed_count_20:0);
					issed_count_20 += plan_qty_20;
				}
				
			}else{
				planIssuance.setPlan_code_20(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_20() - issed_count_20);
				issed_count_20 += plan_qty_20;
			}
			
			int plan_qty_70 = ((PlanIssuanceTotal)total_datalist.get(11)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_70()) < plan_qty_70){
				planIssuance.setPlan_code_70(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_70()) > plan_qty_70){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_70_done() < plan_qty_70){
					planIssuance.setPlan_code_70((planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_70_done()>=0)?planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_70_done():0);
					issed_count_70 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_70_done();
				}else{
					planIssuance.setPlan_code_70((plan_qty_70 - issed_count_70>=0)?plan_qty_70 - issed_count_70:0);
					issed_count_70 += plan_qty_70;
				}
				
			}else{
				planIssuance.setPlan_code_70(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_70() - issed_count_70);
				issed_count_70 += plan_qty_70;
			}
			resultlist.add(planIssuance);
		}		
		
		JSONObject json = Util.dataListToJson(true,msg,resultlist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);		
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String issuancePlan() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::issuancePlan " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		logger.info("---->order_no = " + request.getParameter("order_no") + ",factory_id = "
				+ request.getParameter("factory_id") + ",issuance_date = " + request.getParameter("issuance_date"));	
		
		String order_no = request.getParameter("order_no");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("issuance_date") != null) conditionMap.put("issuance_date", request.getParameter("issuance_date"));
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != null) conditionMap.put("order_no", request.getParameter("order_no"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List datalist=new ArrayList();
		datalist = planDao.getPlanIssuanceList(conditionMap);
		//判断当前订单是否有调整后的计划
		if(datalist.size() == 0){
			JSONObject json = Util.dataListToJson(false,"当前订单没有分配配置！",null,null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);		
			return null;
		}
		
		//获取调整后的计划总数
		PlanIssuance newIssuance = new PlanIssuance();
		newIssuance.setOrder_config_name(order_no + "计划总数");
		datalist.add(0, newIssuance);
		//request.getParameter("issuance_date").substring(0, 6);
		//logger.info("day = " + request.getParameter("issuance_date").substring(6, 8).replace("0", ""));
		Map<String,Object> conditionMap2=new HashMap<String,Object>();
		
		conditionMap2.put("day",Integer.valueOf(request.getParameter("issuance_date").substring(6, 8)));		
		conditionMap2.put("month",request.getParameter("issuance_date").substring(0, 6));		
		conditionMap2.put("factory_id", request.getParameter("factory_id"));
		conditionMap2.put("order_no", request.getParameter("order_no"));
		//conditionMap2.put("day",7);		
		List total_datalist=new ArrayList();
		total_datalist = planDao.getPlanIssuanceTotal(conditionMap2);
		
		//判断当前订单是否有调整后的计划
		if(total_datalist.size() == 0){
			JSONObject json = Util.dataListToJson(false,"当前订单还没在相应计划信息！",null,null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);		
			return null;
		}
		
		newIssuance.setPlan_code_4(((PlanIssuanceTotal)total_datalist.get(0)).getNum());
		newIssuance.setPlan_code_9(((PlanIssuanceTotal)total_datalist.get(1)).getNum());
		newIssuance.setPlan_code_10(((PlanIssuanceTotal)total_datalist.get(2)).getNum());
		newIssuance.setPlan_code_11(((PlanIssuanceTotal)total_datalist.get(3)).getNum());
		newIssuance.setPlan_code_12(((PlanIssuanceTotal)total_datalist.get(4)).getNum());
		//newIssuance.setPlan_code_13(((PlanIssuanceTotal)total_datalist.get(4)).getNum());
		newIssuance.setPlan_code_15(((PlanIssuanceTotal)total_datalist.get(5)).getNum());
		newIssuance.setPlan_code_16(((PlanIssuanceTotal)total_datalist.get(6)).getNum());
		newIssuance.setPlan_code_17(((PlanIssuanceTotal)total_datalist.get(7)).getNum());
		newIssuance.setPlan_code_18(((PlanIssuanceTotal)total_datalist.get(8)).getNum());
		newIssuance.setPlan_code_19(((PlanIssuanceTotal)total_datalist.get(9)).getNum());
		newIssuance.setPlan_code_20(((PlanIssuanceTotal)total_datalist.get(10)).getNum());
		newIssuance.setPlan_code_70(((PlanIssuanceTotal)total_datalist.get(11)).getNum());
		
		//计算配置发布数的推荐值
		//获取当前配置的总计划数及已发布数量
		int issed_count_4 = 0;
		int issed_count_9 = 0;
		int issed_count_10 = 0;
		int issed_count_11 = 0;
		int issed_count_12 = 0;
		//int issed_count_13 = 0;
		int issed_count_15 = 0;
		int issed_count_16 = 0;
		int issed_count_17 = 0;
		int issed_count_18 = 0;
		int issed_count_19 = 0;
		int issed_count_20 = 0;
		int issed_count_70 = 0;
		
		for(int i=1;i<datalist.size(); i++){
			PlanIssuance planIssuance = (PlanIssuance)datalist.get(i);
			// 判断planIssuance的生产节点是否已经发布
			logger.info("---->判断planIssuance的生产节点是否已经发布" + planIssuance.getOrder_config_id() + "|" + request.getParameter("issuance_date"));
			//planIssuance.setPlan_code_issed_9_done(1);
			List iss_done_list=new ArrayList();
			Map<String,Object> iss_queryMap=new HashMap<String,Object>();
			iss_queryMap.put("factory_id", request.getParameter("factory_id"));
			iss_queryMap.put("plan_date", request.getParameter("issuance_date"));
			iss_queryMap.put("order_id", planIssuance.getOrder_id());
			iss_done_list = planDao.getProductionPlanIssuanceList(iss_queryMap);
			logger.info("---->iss_done_list.size = " + iss_done_list.size());
			for(int j=0;j<iss_done_list.size();j++){
				PlanProductionPlan issedPlan = (PlanProductionPlan)iss_done_list.get(j);
				//logger.info("----XXXX" + issedPlan.getPlan_code_id());
				
				switch (issedPlan.getPlan_code_id()){
				case 4:
					planIssuance.setPlan_code_issed_4_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_4(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_4(0);
					}	
					break;
				case 9:
					planIssuance.setPlan_code_issed_9_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_9(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_9(0);
					}	
					break;
				case 10:
					planIssuance.setPlan_code_issed_10_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_10(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_10(0);
					}	
					break;
				case 11:
					planIssuance.setPlan_code_issed_11_done(1);
					logger.info("---->getPlan_qty = " + issedPlan.getPlan_qty());
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_11(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_11(0);
					}	
					break;
				case 12:
					planIssuance.setPlan_code_issed_12_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_12(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_12(0);
					}	
					break;
				case 13:
					planIssuance.setPlan_code_issed_13_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_13(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_13(0);
					}	
					break;
				case 15:
					planIssuance.setPlan_code_issed_15_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_15(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_15(0);
					}	
					break;
				case 16:
					planIssuance.setPlan_code_issed_16_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_16(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_16(0);
					}	
					break;
				case 17:
					planIssuance.setPlan_code_issed_17_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_17(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_17(0);
					}	
					break;
				case 18:
					planIssuance.setPlan_code_issed_18_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_18(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_18(0);
					}	
					break;
				case 19:
					planIssuance.setPlan_code_issed_19_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_19(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_19(0);
					}	
					break;
				case 20:
					planIssuance.setPlan_code_issed_20_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_20(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_20(0);
					}	
					break;
				case 70:
					planIssuance.setPlan_code_issed_70_done(1);
					if(issedPlan.getOrder_config_id() == planIssuance.getOrder_config_id()){
						planIssuance.setPlan_code_issed_70(issedPlan.getPlan_qty());
					}else{
						planIssuance.setPlan_code_issed_70(0);
					}	
					break;
				}
				
			}
			
			Map<String,Object> conditionMap3=new HashMap<String,Object>();
			conditionMap3.put("order_id", ((PlanIssuance)datalist.get(i)).getOrder_id());
			conditionMap3.put("factory_id", request.getParameter("factory_id"));
			conditionMap3.put("order_config_id", ((PlanIssuance)datalist.get(i)).getOrder_config_id());
			conditionMap3.put("plan_date", request.getParameter("issuance_date"));
			List total_data_count=new ArrayList();			//已分配数
			total_data_count = planDao.getPlanIssuanceCount(conditionMap3);
			for(int j=0;j<total_data_count.size();j++){
				PlanIssuanceCount tempIssuanceCount = (PlanIssuanceCount)total_data_count.get(j);
				logger.info("---->getPlan_code_id = " + tempIssuanceCount.getPlan_code_id());
				switch(tempIssuanceCount.getPlan_code_id()){
				case 4:
					planIssuance.setPlan_code_issed_4(tempIssuanceCount.getIssed_qty());
					break;
				case 9:
					planIssuance.setPlan_code_issed_9(tempIssuanceCount.getIssed_qty());
					break;
				case 10:
					planIssuance.setPlan_code_issed_10(tempIssuanceCount.getIssed_qty());
					break;
				case 11:
					planIssuance.setPlan_code_issed_11(tempIssuanceCount.getIssed_qty());
					break;
				case 12:
					planIssuance.setPlan_code_issed_12(tempIssuanceCount.getIssed_qty());
					break;
				case 13:
					planIssuance.setPlan_code_issed_13(tempIssuanceCount.getIssed_qty());
					break;
				case 15:
					planIssuance.setPlan_code_issed_15(tempIssuanceCount.getIssed_qty());
					break;
				case 16:
					planIssuance.setPlan_code_issed_16(tempIssuanceCount.getIssed_qty());
					break;
				case 17:
					planIssuance.setPlan_code_issed_17(tempIssuanceCount.getIssed_qty());
					break;
				case 18:
					planIssuance.setPlan_code_issed_18(tempIssuanceCount.getIssed_qty());
					break;
				case 19:
					planIssuance.setPlan_code_issed_19(tempIssuanceCount.getIssed_qty());
					break;
				case 20:
					planIssuance.setPlan_code_issed_20(tempIssuanceCount.getIssed_qty());
					break;	
				case 70:
					planIssuance.setPlan_code_issed_70(tempIssuanceCount.getIssed_qty());
					break;	
				}				
			}
			
			//获取当前工厂  当前配置  当前月份  总计划数  及 已发布数之和
			int order_config_Qty = 0;
			order_config_Qty = planDao.getPlanConfigQty(((PlanIssuance)datalist.get(i)).getOrder_config_id());
			planIssuance.setPlan_config_qty(order_config_Qty);
			
			Map<String,Object> conditionMap4=new HashMap<String,Object>();
			conditionMap4.put("order_id", ((PlanIssuance)datalist.get(i)).getOrder_id());
			conditionMap4.put("factory_id", request.getParameter("factory_id"));
			conditionMap4.put("order_config_id", ((PlanIssuance)datalist.get(i)).getOrder_config_id());
			List plan_config_issed_qty = new ArrayList();
			plan_config_issed_qty = planDao.getPlanConfigIssedQty(conditionMap4);
			for(int j=0;j<plan_config_issed_qty.size();j++){
				PlanConfigIssedQty config_issed_qty = (PlanConfigIssedQty) plan_config_issed_qty.get(j);
				int plan_code_id = config_issed_qty.getPlan_code_id();
				logger.info("-->plan_code_id = " + plan_code_id + ";getSum_plan_qty = " + config_issed_qty.getSum_plan_qty());
				switch(plan_code_id){
				case 4:
					planIssuance.setPlan_config_qty_4_done(config_issed_qty.getSum_plan_qty());
					break;
				case 9:
					planIssuance.setPlan_config_qty_9_done(config_issed_qty.getSum_plan_qty());
					break;
				case 10:
					planIssuance.setPlan_config_qty_10_done(config_issed_qty.getSum_plan_qty());
					break;
				case 11:
					planIssuance.setPlan_config_qty_11_done(config_issed_qty.getSum_plan_qty());
					break;
				case 12:
					planIssuance.setPlan_config_qty_12_done(config_issed_qty.getSum_plan_qty());
					break;
				case 13:
					planIssuance.setPlan_config_qty_13_done(config_issed_qty.getSum_plan_qty());
					break;
				case 15:
					planIssuance.setPlan_config_qty_15_done(config_issed_qty.getSum_plan_qty());
					break;
				case 16:
					planIssuance.setPlan_config_qty_16_done(config_issed_qty.getSum_plan_qty());
					break;
				case 17:
					planIssuance.setPlan_config_qty_17_done(config_issed_qty.getSum_plan_qty());
					break;
				case 18:
					planIssuance.setPlan_config_qty_18_done(config_issed_qty.getSum_plan_qty());
					break;
				case 19:
					planIssuance.setPlan_config_qty_19_done(config_issed_qty.getSum_plan_qty());
					break;
				case 20:
					planIssuance.setPlan_config_qty_20_done(config_issed_qty.getSum_plan_qty());
					break;
				case 70:
					planIssuance.setPlan_config_qty_70_done(config_issed_qty.getSum_plan_qty());
					break;
				}
			}
			
			int plan_qty_4 = ((PlanIssuanceTotal)total_datalist.get(0)).getNum();
			logger.info("-->plan_qty_4 = " + plan_qty_4);
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_4()) < plan_qty_4){
				planIssuance.setPlan_code_4(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_4()) > plan_qty_4){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_4_done() < plan_qty_4){
					//当前配置总计划数 - 当前配置已发布部 < 当天计划数
					planIssuance.setPlan_code_4(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_4_done());
					issed_count_4 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_4_done();
				}else{
					planIssuance.setPlan_code_4((plan_qty_4 - issed_count_4>=0)?plan_qty_4 - issed_count_4:0);
					issed_count_4 += plan_qty_4;
				}
			}else{
				planIssuance.setPlan_code_4(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_4() - issed_count_4);
				issed_count_4 += plan_qty_4;
			}
			
			int plan_qty_9 = ((PlanIssuanceTotal)total_datalist.get(1)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_9()) < plan_qty_9){
				planIssuance.setPlan_code_9(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_9()) > plan_qty_9){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_9_done() < plan_qty_9){
					//当前配置总计划数 - 当前配置已发布部 < 当天计划数
					planIssuance.setPlan_code_9(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_9_done());
					issed_count_9 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_9_done();
				}else{
					planIssuance.setPlan_code_9((plan_qty_9 - issed_count_9>=0)?plan_qty_9 - issed_count_9:0);
					issed_count_9 += plan_qty_9;
				}
				
				//planIssuance.setPlan_code_9((plan_qty_9 - issed_count_9>=0)?plan_qty_9 - issed_count_9:0);
				//issed_count_9 += plan_qty_9;
			}else{
				planIssuance.setPlan_code_9(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_9() - issed_count_9);
				issed_count_9 += plan_qty_9;
			}
			//logger.info("-->issed_count_9 = " + issed_count_9);
			int plan_qty_10 = ((PlanIssuanceTotal)total_datalist.get(2)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_10()) < plan_qty_10){
				planIssuance.setPlan_code_10(0);
				//issed_count_10 += plan_qty_10;
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_10()) > plan_qty_10){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_10_done() < plan_qty_10){
					planIssuance.setPlan_code_10(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_10_done());
					issed_count_10 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_10_done();
				}else{
					planIssuance.setPlan_code_10((plan_qty_10 - issed_count_10>=0)?plan_qty_10 - issed_count_10:0);
					issed_count_10 += plan_qty_10;
				}
				
			}else{
				planIssuance.setPlan_code_10(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_10() - issed_count_10);
				issed_count_10 += plan_qty_10;
			}

			int plan_qty_11 = ((PlanIssuanceTotal)total_datalist.get(3)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_11()) < plan_qty_11){
				planIssuance.setPlan_code_11(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_11()) > plan_qty_11){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_11_done() < plan_qty_11){
					planIssuance.setPlan_code_11(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_11_done());
					issed_count_11 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_11_done();
				}else{
					planIssuance.setPlan_code_11((plan_qty_11 - issed_count_11>=0)?plan_qty_11 - issed_count_11:0);
					issed_count_11 += plan_qty_11;
				}
				
			}else{
				planIssuance.setPlan_code_11(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_11() - issed_count_11);
				issed_count_11 += plan_qty_11;
			}
			
			int plan_qty_12 = ((PlanIssuanceTotal)total_datalist.get(4)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_12()) < plan_qty_12){
				planIssuance.setPlan_code_12(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_12()) > plan_qty_12){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_12_done() < plan_qty_12){
					planIssuance.setPlan_code_12(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_12_done());
					issed_count_12 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_12_done();
				}else{
					planIssuance.setPlan_code_12((plan_qty_12 - issed_count_12 >=0)?plan_qty_12 - issed_count_12:0);
					issed_count_12 += plan_qty_12;
				}
				
			}else{
				planIssuance.setPlan_code_12(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_12() - issed_count_12);
				issed_count_12 += plan_qty_12;
			}
			/**
			int plan_qty_13 = ((PlanIssuanceTotal)total_datalist.get(4)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_13()) < plan_qty_13){
				planIssuance.setPlan_code_13(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_13()) > plan_qty_13){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_13_done() < plan_qty_13){
					planIssuance.setPlan_code_13(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_13_done());
					issed_count_13 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_13_done();
				}else{
					planIssuance.setPlan_code_13((plan_qty_13 - issed_count_13>=0)?plan_qty_13 - issed_count_13:0);
					issed_count_13 += plan_qty_13;
				}
				
			}else{
				planIssuance.setPlan_code_13(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_13() - issed_count_13);
				issed_count_13 += plan_qty_13;
			}**/

			int plan_qty_15 = ((PlanIssuanceTotal)total_datalist.get(5)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_15()) < plan_qty_15){
				planIssuance.setPlan_code_15(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_15()) > plan_qty_15){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_15_done() < plan_qty_15){
					planIssuance.setPlan_code_15(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_15_done());
					issed_count_15 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_15_done();
				}else{
					planIssuance.setPlan_code_15((plan_qty_15 - issed_count_15>=0)?plan_qty_15 - issed_count_15:0);
					issed_count_15 += plan_qty_15;
				}
				
			}else{
				planIssuance.setPlan_code_15(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_15() - issed_count_15);
				issed_count_15 += plan_qty_15;
			}

			int plan_qty_16 = ((PlanIssuanceTotal)total_datalist.get(6)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_16()) < plan_qty_16){
				planIssuance.setPlan_code_16(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_16()) > plan_qty_16){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_16_done() < plan_qty_16){
					planIssuance.setPlan_code_16(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_16_done());
					issed_count_16 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_16_done();
				}else{
					planIssuance.setPlan_code_16((plan_qty_16 - issed_count_16>=0)?plan_qty_16 - issed_count_16:0);
					issed_count_16 += plan_qty_16;
				}
				
			}else{
				planIssuance.setPlan_code_16(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_16() - issed_count_16);
				issed_count_16 += plan_qty_16;
			}

			int plan_qty_17 = ((PlanIssuanceTotal)total_datalist.get(7)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_17()) < plan_qty_17){
				planIssuance.setPlan_code_17(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_17()) > plan_qty_17){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_17_done() < plan_qty_17){
					planIssuance.setPlan_code_17(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_17_done());
					issed_count_17 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_17_done();
				}else{
					planIssuance.setPlan_code_17((plan_qty_17 - issed_count_17>=0)?plan_qty_17 - issed_count_17:0);
					issed_count_17 += plan_qty_17;
				}
				
			}else{
				planIssuance.setPlan_code_17(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_17() - issed_count_17);
				issed_count_17 += plan_qty_17;
			}

			int plan_qty_18 = ((PlanIssuanceTotal)total_datalist.get(8)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_18()) < plan_qty_18){
				planIssuance.setPlan_code_18(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_18()) > plan_qty_18){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_18_done() < plan_qty_18){
					planIssuance.setPlan_code_18(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_18_done());
					issed_count_18 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_18_done();
				}else{
					planIssuance.setPlan_code_18((plan_qty_18 - issed_count_18>=0)?plan_qty_18 - issed_count_18:0);
					issed_count_18 += plan_qty_18;
				}
				
			}else{
				planIssuance.setPlan_code_18(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_18() - issed_count_18);
				issed_count_18 += plan_qty_18;
			}

			int plan_qty_19 = ((PlanIssuanceTotal)total_datalist.get(9)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_19()) < plan_qty_19){
				planIssuance.setPlan_code_19(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_19()) > plan_qty_19){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_19_done() < plan_qty_19){
					planIssuance.setPlan_code_19(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_19_done());
					issed_count_19 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_19_done();
				}else{
					planIssuance.setPlan_code_19((plan_qty_19 - issed_count_19>=0)?plan_qty_19 - issed_count_19:0);
					issed_count_19 += plan_qty_19;
				}
				
			}else{
				planIssuance.setPlan_code_19(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_19() - issed_count_19);
				issed_count_19 += plan_qty_19;
			}

			int plan_qty_20 = ((PlanIssuanceTotal)total_datalist.get(10)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_20()) < plan_qty_20){
				planIssuance.setPlan_code_20(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_20()) > plan_qty_20){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_20_done() < plan_qty_20){
					planIssuance.setPlan_code_20(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_20_done());
					issed_count_20 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_20_done();
				}else{
					planIssuance.setPlan_code_20((plan_qty_20 - issed_count_20>=0)?plan_qty_20 - issed_count_20:0);
					issed_count_20 += plan_qty_20;
				}
				
			}else{
				planIssuance.setPlan_code_20(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_20() - issed_count_20);
				issed_count_20 += plan_qty_20;
			}
			
			int plan_qty_70 = ((PlanIssuanceTotal)total_datalist.get(11)).getNum();
			if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_70()) < plan_qty_70){
				planIssuance.setPlan_code_70(0);
			}
			else if((planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_70()) > plan_qty_70){
				if(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_70_done() < plan_qty_70){
					planIssuance.setPlan_code_70(planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_70_done());
					issed_count_70 += planIssuance.getProduct_qty() - planIssuance.getPlan_config_qty_70_done();
				}else{
					planIssuance.setPlan_code_70((plan_qty_70 - issed_count_70>=0)?plan_qty_70 - issed_count_70:0);
					issed_count_70 += plan_qty_70;
				}
				
			}else{
				planIssuance.setPlan_code_70(planIssuance.getProduct_qty() - planIssuance.getPlan_code_issed_70() - issed_count_70);
				issed_count_70 += plan_qty_70;
			}

		}

		JSONObject json = Util.dataListToJson(true,"发布成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);		
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showBusNumberList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::showBusNumberList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id") != "") conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != "") conditionMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("bus_number") != "") conditionMap.put("bus_number", request.getParameter("bus_number"));
		if (request.getParameter("bus_vin") != "") conditionMap.put("bus_vin", request.getParameter("bus_vin"));	
		
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List datalist=new ArrayList();
		datalist=planDao.getBusNumber(conditionMap);
		int totalCount=planDao.getBusNumberCount(conditionMap);
		
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
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showPlanVinList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::showPlanVinList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (StringUtils.isNotEmpty(request.getParameter("factory_id"))) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (StringUtils.isNotEmpty(request.getParameter("order_no"))) conditionMap.put("order_no", request.getParameter("order_no"));
		if (StringUtils.isNotEmpty(request.getParameter("bus_number"))) conditionMap.put("bus_number", request.getParameter("bus_number"));
		if (StringUtils.isNotEmpty(request.getParameter("bus_vin"))) conditionMap.put("bus_vin", request.getParameter("bus_vin"));	
		
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List datalist=new ArrayList();
		datalist=planDao.getPlanVin(conditionMap);
		int totalCount=planDao.getPlanVinCount(conditionMap);
		
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
	
	public String getGenerateVin() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::getGenerateVin " + curTime + " " + userid);
		
		//查询 指定工厂下指定订单的生产数量
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != null) conditionMap.put("order_no", request.getParameter("order_no"));
		
		int vinCount = Integer.valueOf(request.getParameter("vinCount"));
		
		//BmsFactoryOrder factoryOrder = new BmsFactoryOrder();
		int factoryOrderQty = planDao.getFactoryOrderInfo(conditionMap);
		//logger.info("---->factoryOrder production_qty = " + factoryOrder.getProduction_qty() + " id = " + factoryOrder.getId());
		//查询 指定工厂下指定订单 已生成的VIN数
		int totalCount=planDao.getPlanVinCount(conditionMap);
		logger.info("---->已产生的VIN号数 = " + totalCount);
		int genVinCount = factoryOrderQty - totalCount;
		if(genVinCount <= 0){
			JSONObject json = Util.dataListToJson(false,"该订单的VIN号已经全部生成！",null,null);
			try {
				out = response.getWriter();
			} catch (IOException e) { 
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
		
		if(vinCount > genVinCount){
			JSONObject json = Util.dataListToJson(false,"生成数大于剩余车辆数！",null,null);
			try {
				out = response.getWriter();
			} catch (IOException e) { 
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
		
		//获取VIN前8位
		String order_no = request.getParameter("order_no");
		String vin_prefix = planDao.getVinPrefixByOrderNo(order_no);
		//logger.info("---->vin_prefix = " + vin_prefix);
		String year = planDao.getOrderInfoByOrderNo(order_no).getProductive_year();
		//logger.info("---->Productive_year = " + year + ";vinYearMap = " + vinYearMap.get("2015"));
		//获取工厂vin编码
		String factory_prefix = planDao.GetFactoryVinPrefix(Integer.valueOf(request.getParameter("vin_factory_id")));
		//logger.info("---->factory_prefix = " + factory_prefix);
		//获取当前年份最大的VIN流水号
		int vin_count = 0;
		vin_count = planDao.getVinCountByYear(vinYearMap.get(year));
		for(int i=0;i<genVinCount;i++){
			if (vinCount >0){
				vin_count++;
				String vin_count_str = String.format("%06d", vin_count);
				//logger.info("---->vin_count_str = " + vin_count_str);
				String vin = vin_prefix + "-" + vinYearMap.get(year) + factory_prefix + vin_count_str;
				logger.info("---->vin = " + vin);
				logger.info("---->verifyVin " + i + " = " + verifyVin(vin));
				PlanVIN planVIN = new PlanVIN();
				planVIN.setVin(verifyVin(vin));
				planVIN.setFactory_id(Integer.valueOf(request.getParameter("factory_id")));
				planVIN.setOrder_no(order_no);
				planVIN.setCreator_id(userid);
				planVIN.setCreat_date(curTime);
				planDao.insertPlanVin(planVIN);
				vinCount--;
			}
		}		
		
		JSONObject json = Util.dataListToJson(true,"VIN号已生成！",null,null);
		try {
			out = response.getWriter();
		} catch (IOException e) { 
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings("rawtypes")
	public String exportPause() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::exportPause " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("workshop_id") != null) conditionMap.put("workshop_id", request.getParameter("workshop_id"));
		if (request.getParameter("line_id") != null) conditionMap.put("line_id", request.getParameter("line_id"));
		if (request.getParameter("bus_number") != null) conditionMap.put("bus_number", request.getParameter("bus_number"));
		if (request.getParameter("severity_level") != null) conditionMap.put("severity_level", request.getParameter("severity_level"));
		if (request.getParameter("measures") != null) conditionMap.put("measures", request.getParameter("measures"));
		if (request.getParameter("status") != null) conditionMap.put("status", request.getParameter("status"));
		if (request.getParameter("date_start") != null) conditionMap.put("date_start", request.getParameter("date_start"));
		if (request.getParameter("date_end") != null) conditionMap.put("date_end", request.getParameter("date_end"));
		if (request.getParameter("exception_id") != null) conditionMap.put("exception_id", request.getParameter("exception_id"));
		if (request.getParameter("exception_type") != null) conditionMap.put("exception_type", request.getParameter("exception_type"));
		if (request.getParameter("reason_type_id") != null) conditionMap.put("reason_type_id", request.getParameter("reason_type_id"));
		if (request.getParameter("order_no") != null) conditionMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("date_start2") != null) conditionMap.put("date_start2", request.getParameter("date_start2"));
		if (request.getParameter("date_end2") != null) conditionMap.put("date_end2", request.getParameter("date_end2"));
		
		List datalist=new ArrayList();
		datalist=planDao.getExceptionList(conditionMap);
		
		StringBuffer strBuffer = new StringBuffer();  
		strBuffer.append("序号,生产工厂,生产车间,线别,生产订单,停线时间,预计恢复时间,实际恢复时间,严重等级,异常纪录点,异常原因,责任部门,状态,\n"); 
		for(int i=0;i<datalist.size();i++){
			@SuppressWarnings("unchecked")
			Map<String,String> result = (Map<String, String>) datalist.get(i);
			String severity_level = "严重";
			if(String.valueOf(result.get("severity_level")).equals("0")){
				severity_level="不影响";
			}else if(String.valueOf(result.get("severity_level")).equals("1")){
				severity_level="普通";
			}
			String status = "处理完成";
			if(String.valueOf(result.get("status")).equals("0")){
				status = "处理中";
			}
			String order_no = "";
			String start_time = "";
			String pfinish_time = "";
			String finish_time = "";
			String process_code = "";
			String detailed_reasons = "";
			String department = "";
			if (result.get("order_no") !=null)order_no = result.get("order_no");
			if (result.get("start_time") !=null)start_time = result.get("start_time");
			if (result.get("pfinish_time") !=null)pfinish_time = result.get("pfinish_time");
			if (result.get("finish_time") !=null)finish_time = result.get("finish_time");
			if (result.get("process_code") !=null)process_code = result.get("process_code");
			if (result.get("detailed_reasons") !=null)detailed_reasons = result.get("detailed_reasons");
			if (result.get("department") !=null)order_no = result.get("department");
			
			
			strBuffer.append((i+1)+","+result.get("factory_name")+","+result.get("workshop_name")+","+result.get("line")
					+","+order_no+","+start_time+","+pfinish_time
					+","+finish_time+","+severity_level+","+process_code
					+","+detailed_reasons+","+department+","+status+",\n"); 
			
		}   
		HttpServletResponse response = ServletActionContext.getResponse();  
        response.setHeader("Content-Disposition","attachment;filename=exportPause.csv");  
        response.setContentType("APPLICATION/OCTET-STREAM;charset=GBK");  
        try {  
        	response.setCharacterEncoding("GBK");
            response.getWriter().print(strBuffer.toString());  
            response.getWriter().flush();  
        } catch (IOException e) {
            e.printStackTrace();  
        }finally{  
            try {  
                response.getWriter().close();  
            } catch (IOException e) {
                e.printStackTrace();  
            }  
        }  
        return NONE;   		
	}
	
	@SuppressWarnings("rawtypes")
	public String exportVin() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::exportVin " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		List datalist=new ArrayList();
		datalist=planDao.getPlanVin(conditionMap);
		StringBuffer strBuffer = new StringBuffer();  

		strBuffer.append("id,VIN,左电机号,右电机号,车号,\n"); 
		for(int i=0;i<datalist.size();i++){
			PlanVIN vin = (PlanVIN)datalist.get(i);
			String left_motor_number = (vin.getLeft_motor_number() == null)?"":vin.getLeft_motor_number();
			String right_motor_number = (vin.getRight_motor_number() == null)?"":vin.getRight_motor_number();
			String bus_number = (vin.getBus_number() == null)?"":vin.getBus_number();
			strBuffer.append((i+1)+","+vin.getVin()+","+ left_motor_number +","+ right_motor_number + "," + bus_number +",\n"); 
		}     
        HttpServletResponse response = ServletActionContext.getResponse(); 
        response.setCharacterEncoding("GBK");
        response.setHeader("Content-Disposition","attachment;filename=exportvin.csv");  
        response.setContentType("APPLICATION/OCTET-STREAM");  
        try {   
            response.getOutputStream().write(strBuffer.toString().getBytes("GBK"));  
            response.getOutputStream().flush();  
        } catch (IOException e) {
            e.printStackTrace();  
        }finally{  
            try {  
                response.getOutputStream().close();  
            } catch (IOException e) {
                e.printStackTrace();  
            }  
        }  
        return NONE;  
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<String[]> getPlanDetailByOrder(String order_no,String date_array,HttpServletRequest request){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::getPlanDetailByOrder " + curTime + " " + userid);
		
		String[] dateArray = date_array.split(",");		
		String month = dateArray[0].substring(0, 7);
		logger.info("-->month = " + month);
		String workshop = "";
		if (!request.getParameter("workshop").equals("全部")) workshop = request.getParameter("workshop");
		
		String[] detailArray_4 = new String[35];  String[] detailArray_4_real = new String[35];
		String[] detailArray_9 = new String[35];  String[] detailArray_9_real = new String[35];
		String[] detailArray_10 = new String[35]; String[] detailArray_10_real = new String[35];
		String[] detailArray_11 = new String[35]; String[] detailArray_11_real = new String[35];
		String[] detailArray_12 = new String[35]; String[] detailArray_12_real = new String[35];
		//String[] detailArray_13 = new String[35]; String[] detailArray_13_real = new String[35];
		String[] detailArray_15 = new String[35]; String[] detailArray_15_real = new String[35];
		String[] detailArray_16 = new String[35]; String[] detailArray_16_real = new String[35];
		String[] detailArray_17 = new String[35]; String[] detailArray_17_real = new String[35];
		String[] detailArray_18 = new String[35]; String[] detailArray_18_real = new String[35];
		String[] detailArray_19 = new String[35]; String[] detailArray_19_real = new String[35];
		String[] detailArray_20 = new String[35]; String[] detailArray_20_real = new String[35];
		String[] detailArray_70 = new String[35]; String[] detailArray_70_real = new String[35];
		
		List<String[]> detailList = new ArrayList<String[]>();
		detailList.add(detailArray_4);  detailList.add(detailArray_4_real);
		detailList.add(detailArray_9);  detailList.add(detailArray_9_real);
		detailList.add(detailArray_10); detailList.add(detailArray_10_real);
		detailList.add(detailArray_11); detailList.add(detailArray_11_real);
		detailList.add(detailArray_12); detailList.add(detailArray_12_real);
		//detailList.add(detailArray_13); detailList.add(detailArray_13_real);
		detailList.add(detailArray_15); detailList.add(detailArray_15_real);
		detailList.add(detailArray_16); detailList.add(detailArray_16_real);
		detailList.add(detailArray_17); detailList.add(detailArray_17_real);
		detailList.add(detailArray_18); detailList.add(detailArray_18_real);
		detailList.add(detailArray_19); detailList.add(detailArray_19_real);
		detailList.add(detailArray_20); detailList.add(detailArray_20_real);
		detailList.add(detailArray_70); detailList.add(detailArray_70_real);
		
		for(int i = 0; i < dateArray.length; i++) {			//循环查询每一天所有车间的数据			
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			conditionMap.put("order_no", order_no);
			conditionMap.put("workshop", workshop);
			conditionMap.put("plan_date", dateArray[i].replaceAll("-", ""));
			
			List datalist=new ArrayList();
			datalist = planDao.getPlanSearchPlanQty(conditionMap);
			
			//logger.info("-->"+ dateArray[i].replaceAll("-", ""));
			logger.info("-->datalist.size() = " + datalist.size());
			
			for (int j = 0; j < datalist.size(); j++) {	
				Map<String,String> resultMap=new HashMap<String,String>();
				resultMap = (Map<String, String>) datalist.get(j);
				//logger.info("---->" + j + " = " + String.valueOf(resultMap.get("plan_code_id")) + "|sum_plan_qty = " + String.valueOf(resultMap.get("sum_plan_qty")));
				//查询各车间的实际完成数				
				Map<String,Object> conditionMap2=new HashMap<String,Object>();
				conditionMap2.put("factory_id", request.getParameter("factory_id"));
				//conditionMap2.put("order_id", resultMap.get("order_id"));
				conditionMap2.put("order_no", order_no);
				conditionMap2.put("workshop", resultMap.get("key_name_en") + "_date");
				//logger.info("---->order_id = " + String.valueOf(resultMap.get("order_id")));
				//---->dateArray[0] = 2015-09-01
				conditionMap2.put("plan_date", dateArray[i]);
				
				// 部件车间完成数另外计算
				if(resultMap.get("key_name_en").equals("parts_online") || resultMap.get("key_name_en").equals("parts_offline")){
					conditionMap2.put("plan_date", dateArray[i].replaceAll("-", ""));
					if (resultMap.get("key_name_en").equals("parts_online")){
						conditionMap2.put("parts", "online_real_qty");
					}else{
						conditionMap2.put("parts", "offline_real_qty");
					}					
					int real_qty = planDao.getPlanSearchRealPartsQty(conditionMap2);
					resultMap.put("sum_real_qty", String.valueOf(real_qty));
				}else if(resultMap.get("key_name_en").equals("ZZJ_offline")){
					// 自制件下线完成数另外计算
					logger.info("---->自制件下线完成数另外计算 plan_date = " + dateArray[i]);
					Map<String,Object> conditionMap3=new HashMap<String,Object>();
					conditionMap3.put("factory_id", request.getParameter("factory_id"));
					conditionMap3.put("order_no", order_no);
					conditionMap3.put("plan_date", dateArray[i]);
					int real_qty = planDao.getPlanSearchRealZzjQty(conditionMap3);
					
					resultMap.put("sum_real_qty", String.valueOf(real_qty));
				}else{
					int real_qty = planDao.getPlanSearchRealQty(conditionMap2);
					logger.info("---->real_qty = " + conditionMap2.get("factory_id") + "|" + conditionMap2.get("order_no") + "|" + conditionMap2.get("workshop") + "|" + String.valueOf(real_qty));
					resultMap.put("sum_real_qty", String.valueOf(real_qty));
				}
				
			}			
			
			if (i==0){	//第一天
				detailArray_4[0]=request.getParameter("factory_id");
				detailArray_4[1]=request.getParameter("order_no");
				detailArray_4[2]="自制件下线计划";detailArray_4[34]="4";	
				
				detailArray_9[0]=request.getParameter("factory_id");
				detailArray_9[1]=request.getParameter("order_no");
				detailArray_9[2]="部件上线计划";detailArray_9[34]="9";	
				detailArray_10[0]=request.getParameter("factory_id");
				detailArray_10[1]=request.getParameter("order_no");
				detailArray_10[2]="部件下线计划";detailArray_10[34]="10";				
				
				detailArray_4_real[0]=request.getParameter("factory_id");
				detailArray_4_real[1]=request.getParameter("order_no");
				detailArray_4_real[2]="自制件下线完成";detailArray_4_real[34]="4";	
				
				detailArray_9_real[0]=request.getParameter("factory_id");
				detailArray_9_real[1]=request.getParameter("order_no");
				detailArray_9_real[2]="部件上线完成";detailArray_9_real[34]="9";			
				detailArray_10_real[0]=request.getParameter("factory_id");
				detailArray_10_real[1]=request.getParameter("order_no");
				detailArray_10_real[2]="部件下线完成";detailArray_10_real[34]="10";
				
				detailArray_11[0]=request.getParameter("factory_id");
				detailArray_11[1]=request.getParameter("order_no");
				detailArray_11[2]="焊装上线计划";detailArray_11[34]="11";			
				detailArray_12[0]=request.getParameter("factory_id");
				detailArray_12[1]=request.getParameter("order_no");
				detailArray_12[2]="焊装下线计划";detailArray_12[34]="12";
				
				detailArray_11_real[0]=request.getParameter("factory_id");
				detailArray_11_real[1]=request.getParameter("order_no");
				detailArray_11_real[2]="焊装上线完成";detailArray_11_real[34]="11";
				detailArray_12_real[0]=request.getParameter("factory_id");
				detailArray_12_real[1]=request.getParameter("order_no");
				detailArray_12_real[2]="焊装下线完成";detailArray_12_real[34]="12";
				/**
				detailArray_13[0]=request.getParameter("factory_id");
				detailArray_13[1]=request.getParameter("order_no");
				detailArray_13[2]="玻璃钢下线计划";detailArray_13[34]="13";
				
				detailArray_13_real[0]=request.getParameter("factory_id");
				detailArray_13_real[1]=request.getParameter("order_no");
				detailArray_13_real[2]="玻璃钢下线完成";detailArray_13_real[34]="13";**/
				
				detailArray_15[0]=request.getParameter("factory_id");
				detailArray_15[1]=request.getParameter("order_no");
				detailArray_15[2]="涂装上线计划";detailArray_15[34]="15";
				detailArray_16[0]=request.getParameter("factory_id");
				detailArray_16[1]=request.getParameter("order_no");
				detailArray_16[2]="涂装下线计划";detailArray_16[34]="16";
				
				detailArray_15_real[0]=request.getParameter("factory_id");
				detailArray_15_real[1]=request.getParameter("order_no");
				detailArray_15_real[2]="涂装上线完成";detailArray_15_real[34]="15";
				detailArray_16_real[0]=request.getParameter("factory_id");
				detailArray_16_real[1]=request.getParameter("order_no");
				detailArray_16_real[2]="涂装下线完成";detailArray_16_real[34]="16";
				
				detailArray_17[0]=request.getParameter("factory_id");
				detailArray_17[1]=request.getParameter("order_no");
				detailArray_17[2]="底盘上线计划";detailArray_17[34]="17";
				detailArray_18[0]=request.getParameter("factory_id");
				detailArray_18[1]=request.getParameter("order_no");
				detailArray_18[2]="底盘下线计划";detailArray_18[34]="18";
				
				detailArray_17_real[0]=request.getParameter("factory_id");
				detailArray_17_real[1]=request.getParameter("order_no");
				detailArray_17_real[2]="底盘上线完成";detailArray_17_real[34]="17";
				detailArray_18_real[0]=request.getParameter("factory_id");
				detailArray_18_real[1]=request.getParameter("order_no");
				detailArray_18_real[2]="底盘下线完成";detailArray_18_real[34]="18";
				
				detailArray_19[0]=request.getParameter("factory_id");
				detailArray_19[1]=request.getParameter("order_no");
				detailArray_19[2]="总装上线计划";detailArray_19[34]="19";
				detailArray_20[0]=request.getParameter("factory_id");
				detailArray_20[1]=request.getParameter("order_no");
				detailArray_20[2]="总装下线计划";detailArray_20[34]="20";
				
				detailArray_70[0]=request.getParameter("factory_id");
				detailArray_70[1]=request.getParameter("order_no");
				detailArray_70[2]="入库计划";detailArray_70[34]="70";
				
				detailArray_19_real[0]=request.getParameter("factory_id");
				detailArray_19_real[1]=request.getParameter("order_no");
				detailArray_19_real[2]="总装上线完成";detailArray_19_real[34]="19";
				detailArray_20_real[0]=request.getParameter("factory_id");
				detailArray_20_real[1]=request.getParameter("order_no");
				detailArray_20_real[2]="总装下线完成";detailArray_20_real[34]="20";
				
				detailArray_70_real[0]=request.getParameter("factory_id");
				detailArray_70_real[1]=request.getParameter("order_no");
				detailArray_70_real[2]="入库完成";detailArray_70_real[34]="70";
				
				for (int j = 0; j < datalist.size(); j++) {	
					Map<String,String> resultMap=new HashMap<String,String>();
					resultMap = (Map<String, String>) datalist.get(j);
					
					switch(Integer.valueOf(String.valueOf(resultMap.get("plan_code_id")))){
					case 4:
						detailArray_4[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_4_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 9:
						detailArray_9[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_9_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 10:
						detailArray_10[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_10_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 11:
						detailArray_11[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_11_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 12:
						detailArray_12[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_12_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					/**case 13:
						detailArray_13[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_13_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;**/
					case 15:
						detailArray_15[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_15_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 16:
						detailArray_16[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_16_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 17:
						detailArray_17[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_17_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 18:
						detailArray_18[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_18_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 19:
						detailArray_19[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_19_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 20:
						detailArray_20[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_20_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					case 70:
						detailArray_70[3]=String.valueOf(resultMap.get("sum_plan_qty"));
						detailArray_70_real[3]=String.valueOf(resultMap.get("sum_real_qty"));
						break;
					}
					
					//detailArray_9[3]=String.valueOf(resultMap.get("sum_plan_qty"));
				}
				
			}else {		//1,2,3,4...
				for (int j = 0; j < datalist.size(); j++) {	
					Map<String,String> resultMap=new HashMap<String,String>();
					resultMap = (Map<String, String>) datalist.get(j);
					switch(Integer.valueOf(String.valueOf(resultMap.get("plan_code_id")))){
						case 4:
							detailArray_4[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_4_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 9:
							detailArray_9[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_9_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 10:
							detailArray_10[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_10_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 11:
							detailArray_11[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_11_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 12:
							detailArray_12[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_12_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						/**case 13:
							detailArray_13[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_13_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;**/
						case 15:
							detailArray_15[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_15_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 16:
							detailArray_16[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_16_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 17:
							detailArray_17[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_17_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 18:
							detailArray_18[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_18_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 19:
							detailArray_19[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_19_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 20:
							detailArray_20[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_20_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
						case 70:
							detailArray_70[3+i]=String.valueOf(resultMap.get("sum_plan_qty"));
							detailArray_70_real[3+i]=String.valueOf(resultMap.get("sum_real_qty"));
							break;
					}
				}
				
			}		
			
		}
		
		return detailList;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showPlanSearchDetail() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::showPlanSearchDetail " + curTime + " " + userid);

		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
				
		//String order_no = request.getParameter("order_no");
		String date_array =  request.getParameter("date_array");
		
		String[] dateArray = date_array.split(",");
		String month = dateArray[0].substring(0, 7);
		//logger.info("---->date_array = " + date_array);
		String startDate = dateArray[0].replaceAll("-", "");
		String endDate = dateArray[dateArray.length-1].replaceAll("-", "");
		logger.info("---->startDate = " + startDate + "|endDate = " + endDate);
		
		
			
		
		List datalist=new ArrayList();		
		List<String> order_list = new ArrayList<String>();
		if(request.getParameter("order_no").equals("")){
			List orderlist = new ArrayList();
			Map<String,Object> conditionMap2=new HashMap<String,Object>();
			conditionMap2.put("factory_id", request.getParameter("factory_id"));
			conditionMap2.put("start_date", startDate);
			conditionMap2.put("end_date", endDate);
			orderlist = planDao.getPlanOrderList(conditionMap2);
			
			for(int m=0;m<orderlist.size();m++){
				//logger.info("---->order_no = " + ((Map<String,String>)orderlist.get(m)).get("order_no"));
				order_list.add(((Map<String,String>)orderlist.get(m)).get("order_no"));
			}
			
		}else{
			order_list.add(request.getParameter("order_no"));
		}
		
		//List<String> order_list = new ArrayList<String>();
		//order_list.add("D2015029");order_list.add("D2015030");
		
		for(int n=0;n<order_list.size();n++){
			List<String[]> detailList = this.getPlanDetailByOrder(order_list.get(n),date_array,request);		
			for(int i = 0; i < detailList.size(); i++) {	
				Map<String,String> resultMap=new HashMap<String,String>();
				int total = 0;int total_month = 0;int total_order = 0;
				resultMap.put("factory_id", detailList.get(i)[0]);
				resultMap.put("order_no", order_list.get(n));
				resultMap.put("workshop", detailList.get(i)[2]);
				
				logger.info("---->" + detailList.get(i)[3]);
				
				resultMap.put("D1", detailList.get(i)[3]);  total+=Integer.parseInt((detailList.get(i)[3]==null)?"0":detailList.get(i)[3]);
				resultMap.put("D2", detailList.get(i)[4]);  total+=Integer.parseInt((detailList.get(i)[4]==null)?"0":detailList.get(i)[4]);
				resultMap.put("D3", detailList.get(i)[5]);  total+=Integer.parseInt((detailList.get(i)[5]==null)?"0":detailList.get(i)[5]);
				resultMap.put("D4", detailList.get(i)[6]);  total+=Integer.parseInt((detailList.get(i)[6]==null)?"0":detailList.get(i)[6]);
				resultMap.put("D5", detailList.get(i)[7]);  total+=Integer.parseInt((detailList.get(i)[7]==null)?"0":detailList.get(i)[7]);
				resultMap.put("D6", detailList.get(i)[8]);  total+=Integer.parseInt((detailList.get(i)[8]==null)?"0":detailList.get(i)[8]);
				resultMap.put("D7", detailList.get(i)[9]);  total+=Integer.parseInt((detailList.get(i)[9]==null)?"0":detailList.get(i)[9]);
				resultMap.put("D8", detailList.get(i)[10]); total+=Integer.parseInt((detailList.get(i)[10]==null)?"0":detailList.get(i)[10]);
				resultMap.put("D9", detailList.get(i)[11]); total+=Integer.parseInt((detailList.get(i)[11]==null)?"0":detailList.get(i)[11]);
				resultMap.put("D10", detailList.get(i)[12]);total+=Integer.parseInt((detailList.get(i)[12]==null)?"0":detailList.get(i)[12]);

				resultMap.put("D11", detailList.get(i)[13]);total+=Integer.parseInt((detailList.get(i)[13]==null)?"0":detailList.get(i)[13]);
				resultMap.put("D12", detailList.get(i)[14]);total+=Integer.parseInt((detailList.get(i)[14]==null)?"0":detailList.get(i)[14]);
				resultMap.put("D13", detailList.get(i)[15]);total+=Integer.parseInt((detailList.get(i)[15]==null)?"0":detailList.get(i)[15]);
				resultMap.put("D14", detailList.get(i)[16]);total+=Integer.parseInt((detailList.get(i)[16]==null)?"0":detailList.get(i)[16]);
				resultMap.put("D15", detailList.get(i)[17]);total+=Integer.parseInt((detailList.get(i)[17]==null)?"0":detailList.get(i)[17]);
				resultMap.put("D16", detailList.get(i)[18]);total+=Integer.parseInt((detailList.get(i)[18]==null)?"0":detailList.get(i)[18]);
				resultMap.put("D17", detailList.get(i)[19]);total+=Integer.parseInt((detailList.get(i)[19]==null)?"0":detailList.get(i)[19]);
				resultMap.put("D18", detailList.get(i)[20]);total+=Integer.parseInt((detailList.get(i)[20]==null)?"0":detailList.get(i)[20]);
				resultMap.put("D19", detailList.get(i)[21]);total+=Integer.parseInt((detailList.get(i)[21]==null)?"0":detailList.get(i)[21]);
				resultMap.put("D20", detailList.get(i)[22]);total+=Integer.parseInt((detailList.get(i)[22]==null)?"0":detailList.get(i)[22]);

				resultMap.put("D21", detailList.get(i)[23]);total+=Integer.parseInt((detailList.get(i)[23]==null)?"0":detailList.get(i)[23]);
				resultMap.put("D22", detailList.get(i)[24]);total+=Integer.parseInt((detailList.get(i)[24]==null)?"0":detailList.get(i)[24]);
				resultMap.put("D23", detailList.get(i)[25]);total+=Integer.parseInt((detailList.get(i)[25]==null)?"0":detailList.get(i)[25]);
				resultMap.put("D24", detailList.get(i)[26]);total+=Integer.parseInt((detailList.get(i)[26]==null)?"0":detailList.get(i)[26]);
				resultMap.put("D25", detailList.get(i)[27]);total+=Integer.parseInt((detailList.get(i)[27]==null)?"0":detailList.get(i)[27]);
				resultMap.put("D26", detailList.get(i)[28]);total+=Integer.parseInt((detailList.get(i)[28]==null)?"0":detailList.get(i)[28]);
				resultMap.put("D27", detailList.get(i)[29]);total+=Integer.parseInt((detailList.get(i)[29]==null)?"0":detailList.get(i)[29]);
				resultMap.put("D28", detailList.get(i)[30]);total+=Integer.parseInt((detailList.get(i)[30]==null)?"0":detailList.get(i)[30]);
				resultMap.put("D29", detailList.get(i)[31]);total+=Integer.parseInt((detailList.get(i)[31]==null)?"0":detailList.get(i)[31]);
				resultMap.put("D30", detailList.get(i)[32]);total+=Integer.parseInt((detailList.get(i)[32]==null)?"0":detailList.get(i)[32]);
				resultMap.put("D31", detailList.get(i)[33]);total+=Integer.parseInt((detailList.get(i)[33]==null)?"0":detailList.get(i)[33]);
				resultMap.put("total", String.valueOf(total));
				
				//计算本月合计（跨月取第一个月的数据）
				//计划
				String workshop = detailList.get(i)[2];
				//logger.info("---->workshop = " + workshop.substring(workshop.length()-2, workshop.length()));
				if(workshop.substring(workshop.length()-2, workshop.length()).equals("计划")){
					Map<String,Object> conditionMap2=new HashMap<String,Object>();
					conditionMap2.put("factory_id", detailList.get(i)[0]);
					conditionMap2.put("order_no", order_list.get(n));
					conditionMap2.put("month", month.replaceAll("-", ""));
					conditionMap2.put("plan_code_id", detailList.get(i)[34]);
					//logger.info("-->factory_id = " + detailList.get(i)[0] + "|order_no = " + detailList.get(i)[1] + "|plan_code_id = " + detailList.get(i)[34]);
					total_month = planDao.getPlanSearchTotalMonthPlanQty(conditionMap2);
					Map<String,Object> conditionMap3=new HashMap<String,Object>();
					conditionMap3.put("factory_id", detailList.get(i)[0]);
					conditionMap3.put("order_no", order_list.get(n));
					conditionMap3.put("month", "");
					conditionMap3.put("plan_code_id", detailList.get(i)[34]);
					logger.info("-->factory_id = " + detailList.get(i)[0] + "|order_no = " + detailList.get(i)[1] + "|plan_code_id = " + detailList.get(i)[34]);
					total_order = planDao.getPlanSearchTotalMonthPlanQty(conditionMap3);
				}else{
					//完成数
					Map<String,Object> conditionMap2=new HashMap<String,Object>();
					conditionMap2.put("factory_id", detailList.get(i)[0]);
					conditionMap2.put("order_no", order_list.get(n));
					conditionMap2.put("month", month);
					
					Map<String,Object> conditionMap3=new HashMap<String,Object>();
					conditionMap3.put("factory_id", detailList.get(i)[0]);
					conditionMap3.put("order_no", order_list.get(n));
					conditionMap3.put("month", "");
					
					int plan_code_id = Integer.valueOf(detailList.get(i)[34]);
					switch(plan_code_id){
					/*case 9:
						conditionMap2.put("workshop", "parts_online_date");break;
					case 10:
						conditionMap2.put("workshop", "parts_offline_date");break;*/
					case 11:
						conditionMap2.put("workshop", "welding_online_date");conditionMap3.put("workshop", "welding_online_date");break;
					case 12:
						conditionMap2.put("workshop", "welding_offline_date");conditionMap3.put("workshop", "welding_offline_date");break;
					case 13:
						conditionMap2.put("workshop", "fiberglass_offline_date");conditionMap3.put("workshop", "fiberglass_offline_date");break;
					case 15:
						conditionMap2.put("workshop", "painting_online_date");conditionMap3.put("workshop", "painting_online_date");break;
					case 16:
						conditionMap2.put("workshop", "painting_offline_date");conditionMap3.put("workshop", "painting_offline_date");break;
					case 17:
						conditionMap2.put("workshop", "chassis_online_date");conditionMap3.put("workshop", "chassis_online_date");break;
					case 18:
						conditionMap2.put("workshop", "chassis_offline_date");conditionMap3.put("workshop", "chassis_offline_date");break;
					case 19:
						conditionMap2.put("workshop", "assembly_online_date");conditionMap3.put("workshop", "assembly_online_date");break;
					case 20:
						conditionMap2.put("workshop", "assembly_offline_date");conditionMap3.put("workshop", "assembly_offline_date");break;
					}
					if(plan_code_id==9||plan_code_id==10){
						if(plan_code_id==9){
							conditionMap2.put("parts", "online_real_qty");
							conditionMap2.put("month", month.replaceAll("-", ""));
							
							conditionMap3.put("parts", "online_real_qty");
							conditionMap3.put("month", "");
						}else{
							conditionMap2.put("parts", "offline_real_qty");
							conditionMap2.put("month", month.replaceAll("-", ""));
							
							conditionMap3.put("parts", "online_real_qty");
							conditionMap3.put("month", "");
						}
						logger.info("--->getPlanSearchTotalRealPartsQty:" + conditionMap2.get("factory_id") + "|" + conditionMap2.get("order_no") + "|" + conditionMap2.get("month")+ "|" + conditionMap2.get("parts"));//--->month2015-09
						
						total_month = planDao.getPlanSearchTotalRealPartsQty(conditionMap2);
						logger.info("----> total_month = " + total_month);
						total_order = planDao.getPlanSearchTotalRealPartsQty(conditionMap3);
					}else if(plan_code_id==4){	//自制件下线
						logger.info("----> month = " + month + detailList.get(i)[0] + order_list.get(n));
						Map<String,Object> conditionMap4=new HashMap<String,Object>();
						Map<String,Object> conditionMap5=new HashMap<String,Object>();
						conditionMap4.put("factory_id", detailList.get(i)[0]);
						conditionMap4.put("order_no", order_list.get(n));
						conditionMap4.put("month", "");
						conditionMap5.put("factory_id", detailList.get(i)[0]);
						conditionMap5.put("order_no", order_list.get(n));
						conditionMap5.put("month", month);
						
						total_month = planDao.getPlanSearchTotalRealZzjQty(conditionMap4);
						total_order = planDao.getPlanSearchTotalRealZzjQty(conditionMap5);
					}else{
						total_month = planDao.getPlanSearchTotalRealQty(conditionMap2);
						total_order = planDao.getPlanSearchTotalRealQty(conditionMap3);
					}
					
					
				}
				
				resultMap.put("total_month", String.valueOf(total_month));
				resultMap.put("total_order", String.valueOf(total_order));
				datalist.add(resultMap);
			}
		}
		

		
		
		
		
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
	public String showPlanSearch() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::showPlanSearch " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		String workshop = "";
		if (!request.getParameter("workshop").equals("全部")) workshop = request.getParameter("workshop");
		if(workshop.equals("成品库")) workshop="入库";
		conditionMap.put("workshop", workshop);
		conditionMap.put("start_date", request.getParameter("start_date"));
		conditionMap.put("end_date", request.getParameter("end_date"));
		
		
		List<Map<String, String>> datalist=new ArrayList<Map<String,String>>();
		
		datalist=planDao.getPlanSerach(conditionMap);
		
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
	public String showPlanAmend() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::showPlanAmend " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("amend_date", request.getParameter("amend_date"));
		conditionMap.put("workshop_name", request.getParameter("workshop_name"));
		
		List datalist=new ArrayList();
		datalist = planDao.getPlanAmendList(conditionMap);
		//TODO 计算计划实际完成数 其中部件完成数见表【BMS_PD_PARTS_PLAN_FINISH】
		for (int i = 0; i < datalist.size(); i++) {
			Map<String,String> resultMap=new HashMap<String,String>();
			resultMap = (Map<String, String>) datalist.get(i);
			logger.info("---->" + i + " = " 
			+ resultMap.get("plan_date").substring(0, 4) + "-" + resultMap.get("plan_date").substring(4, 6) + "-" + resultMap.get("plan_date").substring(6, 8)  
			+ resultMap.get("key_name"));
			Map<String,Object> conditionMap2=new HashMap<String,Object>();
			conditionMap2.put("factory_id", resultMap.get("factory_id"));
			conditionMap2.put("order_id", resultMap.get("order_id"));
			conditionMap2.put("plan_date", resultMap.get("plan_date").substring(0, 4) + "-" + resultMap.get("plan_date").substring(4, 6) + "-" + resultMap.get("plan_date").substring(6, 8));
			conditionMap2.put("workshop", "id");
			//部件上线;部件下线;焊装上线;焊装下线;玻璃钢下线;涂装上线;涂装下线;
			//底盘上线;底盘下线;总装上线;总装下线
			if (resultMap.get("key_name").equals("焊装上线"))conditionMap2.put("workshop", "welding_online_date");
			if (resultMap.get("key_name").equals("焊装下线"))conditionMap2.put("workshop", "welding_offline_date");
			if (resultMap.get("key_name").equals("玻璃钢下线"))conditionMap2.put("workshop", "fiberglass_offline_date");
			if (resultMap.get("key_name").equals("涂装上线"))conditionMap2.put("workshop", "painting_online_date");
			if (resultMap.get("key_name").equals("涂装下线"))conditionMap2.put("workshop", "painting_offline_date");
			if (resultMap.get("key_name").equals("底盘上线"))conditionMap2.put("workshop", "chassis_online_date");
			if (resultMap.get("key_name").equals("底盘下线"))conditionMap2.put("workshop", "chassis_offline_date");
			if (resultMap.get("key_name").equals("总装上线"))conditionMap2.put("workshop", "assembly_online_date");
			if (resultMap.get("key_name").equals("总装下线"))conditionMap2.put("workshop", "assembly_offline_date");
			
			if (resultMap.get("key_name").equals("部件上线")){
				conditionMap2.put("workshop", "online_real_qty");
				conditionMap2.put("order_no", request.getParameter("order_no"));
				conditionMap2.put("start_date", resultMap.get("plan_date"));
				conditionMap2.put("end_date", resultMap.get("plan_date"));
				
				int realNum = planDao.getPlanPartsRealCount(conditionMap2);
				resultMap.put("real_qty", String.valueOf(realNum));
			}else if (resultMap.get("key_name").equals("部件下线")){
				conditionMap2.put("workshop", "offline_real_qty");
				conditionMap2.put("order_no", request.getParameter("order_no"));
				conditionMap2.put("start_date", resultMap.get("plan_date"));
				conditionMap2.put("end_date", resultMap.get("plan_date"));
				int realNum = planDao.getPlanPartsRealCount(conditionMap2);
				resultMap.put("real_qty", String.valueOf(realNum));
			}else{
				int realNum = planDao.getPlanRealCount(conditionMap2);
				resultMap.put("real_qty", String.valueOf(realNum));
				
			}
			

		}
		
		
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
	public String busTransferInQuery() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::busTransferInQuery " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		String bus_number = request.getParameter("bus_number");
		String factory_id = request.getParameter("factory_id");
		String factory_id_in = request.getParameter("factory_id_in");
		String[] busNumberList = bus_number.split("\n");
		//查询调入车辆信息
		List busInfo=new ArrayList();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if(bus_number.equals("")){
			conditionMap.put("busNumbers", "");
		}else{
			conditionMap.put("busNumbers", busNumberList);
		}
		conditionMap.put("tfrom_factory_id", factory_id);
		conditionMap.put("factory_id_in", factory_id_in);
		busInfo = planDao.getBusTransferInList(conditionMap);
		
		JSONObject json = Util.dataListToJson(true,"查询成功",busInfo,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String busTransferQuery() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::busTransferQuery " + curTime + " " + userid);

		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		String bus_number = request.getParameter("bus_number");
		//String bus_number_str = "";
		logger.info("-->bus_number = " + bus_number);
		String[] busNumberList = bus_number.split("\n");
		
		//查询调出车辆信息
		List busInfo=new ArrayList();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("busNumbers", busNumberList);
		busInfo = planDao.getBusTransferOutList(conditionMap);
		
		JSONObject json = Util.dataListToJson(true,"查询成功",busInfo,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		
		return null;
	}
	
	public String busTransferIn() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::busTransferIn " + curTime + " " + userid);

		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		String bus_numbers = request.getParameter("bus_number");
		//调整入工厂
		String transfer_in_factory = request.getParameter("transfer_in_factory");
		String[] busNumberList = bus_numbers.split(",");
		for(int i=0;i<busNumberList.length;i++){
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", transfer_in_factory);
			conditionMap.put("bus_number", busNumberList[i]);
			conditionMap.put("status", "0");
			planDao.updatePlanBusTranIn(conditionMap);
			//更新调出记录【BMS_PLAN_BUS_TRANSFER_LOG】
			PlanBusTransfer busTransfer = new PlanBusTransfer();
			busTransfer.setBus_number(busNumberList[i]);
			busTransfer.setTto_date(curTime);
			busTransfer.setTto_people_id(userid);
			planDao.updateBusTransferLog(busTransfer);			
		}
		
		JSONObject json = Util.dataListToJson(true,"车辆调入成功！",null,null);
		try {
			out = response.getWriter();
		} catch (IOException e) { 
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked", "null" })
	public String busTransferOut() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::busTransferOut " + curTime + " " + userid);

		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		String bus_numbers = request.getParameter("bus_number");
		String factory_out_id = request.getParameter("transfer_out_factory");
		String[] busNumberList = bus_numbers.split(",");
		for(int i=0;i<busNumberList.length;i++){
			logger.info("---->"+ busNumberList[i]);			
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", factory_out_id);
			conditionMap.put("bus_number", busNumberList[i]);
			conditionMap.put("status", "1");
			//校验，不能调出到自己工厂
			List busInfo=new ArrayList();
			busInfo = planDao.getBusInfo(busNumberList[i]);
			Map<String,Object> busInfoMap=new HashMap<String,Object>();
			busInfoMap = (Map<String, Object>) busInfo.get(0);
			//logger.info("---->busInfoMap.factory_id = " + busInfoMap.get("factory_id").toString());
			//int fromFactoryId = Integer.valueOf(busInfoMap.get("factory_id").toString());
			if(factory_out_id.equals(busInfoMap.get("factory_id").toString())){
				JSONObject json = Util.dataListToJson(false,"调出工厂有误，车号"+busNumberList[i]+"已经在调出工厂，请重新选择！",null,null);
				try {
					out = response.getWriter();
				} catch (IOException e) { 
					e.printStackTrace();
				}
				out.print(json);
				return null;
			}			
		}
		
		for(int i=0;i<busNumberList.length;i++){
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", factory_out_id);
			conditionMap.put("bus_number", busNumberList[i]);
			conditionMap.put("status", "1");
			List busInfo=new ArrayList();
			busInfo = planDao.getBusInfo(busNumberList[i]);
			Map<String,Object> busInfoMap=new HashMap<String,Object>();
			busInfoMap = (Map<String, Object>) busInfo.get(0);
			int fromFactoryId = Integer.valueOf(busInfoMap.get("factory_id").toString());
			//冻结【BMS_PLAN_BUS】中对应的车号status 0->1
			planDao.updatePlanBusStatus(conditionMap);
			//记录调出记录【BMS_PLAN_BUS_TRANSFER_LOG】
			PlanBusTransfer busTransfer = new PlanBusTransfer();
			busTransfer.setBus_number(busNumberList[i]);
			busTransfer.setTto_factory_id(Integer.valueOf(factory_out_id));
			busTransfer.setTfrom_factory_id(fromFactoryId);
			busTransfer.setTfrom_date(curTime);
			busTransfer.setTfrom_people_id(userid);
			planDao.insertBusTransferLog(busTransfer);
			
		}

		JSONObject json = Util.dataListToJson(true,"车辆调出成功！",null,null);
		try {
			out = response.getWriter();
		} catch (IOException e) { 
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String busTransferHisQuery() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::busTransferHisQuery " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("transfer_his_busnumber", request.getParameter("transfer_his_busnumber"));
		conditionMap.put("transfer_his_vin", request.getParameter("transfer_his_vin"));
		conditionMap.put("transfer_his_orderno", request.getParameter("transfer_his_orderno"));

		conditionMap.put("transfer_his_out_factory", request.getParameter("transfer_his_out_factory"));
		conditionMap.put("transfer_his_out_date_start", request.getParameter("transfer_his_out_date_start"));
		conditionMap.put("transfer_his_out_date_end", request.getParameter("transfer_his_out_date_end"));
		
		conditionMap.put("transfer_his_in_factory", request.getParameter("transfer_his_in_factory"));
		conditionMap.put("transfer_his_in_date_start", request.getParameter("transfer_his_in_date_start"));
		conditionMap.put("transfer_his_in_date_end", request.getParameter("transfer_his_in_date_end"));
		
		
		List busTransferHisInfo=new ArrayList();
		busTransferHisInfo = planDao.getBusTransferHisList(conditionMap);
		
		JSONObject json = Util.dataListToJson(true,"查询成功",busTransferHisInfo,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		
		return null;
	}
	

	public String planAmend() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->PlanAction::planAmend " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		String planDone_str = request.getParameter("planDone_str");
		String[] planAmendList = planDone_str.split(";");
		for(int i=0;i<planAmendList.length;i++){
			//logger.info("---->planAmendList = " + i + planAmendList[i]);
			String[] amendList = planAmendList[i].split(",");
			PlanAmend planAmend = new PlanAmend();
			planAmend.setPlan_id(Integer.valueOf(amendList[0]));
			planAmend.setReal_qty(Integer.valueOf(amendList[1]));
			planAmend.setAmend_qty(Integer.valueOf(amendList[2]));
			planAmend.setAmend_reason(amendList[3]);
			planAmend.setReviser_id(userid);
			planAmend.setRevise_date(curTime);
			//先删除原修正数据
			planDao.deletePlanAmend(planAmend);
			planDao.insertPlanAmend(planAmend);
		}
		
		JSONObject json = Util.dataListToJson(true,"修正成功",null,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		
		return null;
	}
	
	/**
	 * 校验VIN码
	 * @param vin
	 * @return
	 */
	public String verifyVin(String vin){
		int vin_sum = 0;
		for(int i=0;i<17;i++){
			if (i!=8){
				vin_sum += vinCharMap.get(vin.substring(i, i+1)) * weightMap.get(i+1);
			}
		}
		if (vin_sum%11 == 10){
			return vin.substring(0, 8) + "X" + vin.substring(9,17);
		}else{
			return vin.substring(0, 8) + vin_sum%11 + vin.substring(9,17);
		}
	}
	
	public String updateVinMotor() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		String vin=request.getParameter("vin");
		String update_val=request.getParameter("update_val");
		String update_flg=request.getParameter("update_flg");
		Map<String,Object> cdmap=new HashMap<String,Object>();
		cdmap.put("vin", vin);
		cdmap.put("update_val", update_val);
		cdmap.put("update_flg", update_flg);
	
		JSONObject json=null;
		//查询vin号、左右电机号是否已经绑定，已绑定返回错误信息
		Map<String,String> busMap=planDao.queryBusByVinMotor(cdmap);
		StringBuffer message=new StringBuffer();
		if(busMap!=null){
			if("vin".equals(update_flg)){
				message.append("vin号："+update_val+"已经绑定，请先解绑该vin号！");
			}
			if("left_motor".equals(update_flg)){
				message.append("左电机号："+update_val+"已经绑定，请先解绑该左电机号！");
			}
			if("right_motor".equals(update_flg)){
				message.append("右电机号："+update_val+"已经绑定，请先解绑该右电机号！");
			}
			json=Util.dataListToJson(false, message.toString(), null,null);
		}
		//未绑定，更新vin号、左右电机号
		else{
			planDao.updateVinMotor(cdmap);
			planDao.updateBusVinMotor(cdmap);
			json= Util.dataListToJson(true,"修改成功",null,null);
		}		
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
			json= Util.dataListToJson(false,"系统异常，修改失败",null,null);
		}
		out.print(json);
		return null;
	}

}
