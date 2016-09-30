package com.byd.bms.techtrans.action;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import com.byd.bms.aftersale.dao.IAfterSaleDao;
import com.byd.bms.aftersale.entity.AfterSalesProblems;
import com.byd.bms.quality.entity.TestFlowTplDetailBean;
import com.byd.bms.techtrans.dao.IEcnDocumentDao;
import com.byd.bms.techtrans.dao.IEcnTaskDao;
import com.byd.bms.techtrans.entity.BmsEcnDocument;
import com.byd.bms.techtrans.entity.BmsEcnTask;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class EcnDocumentAction extends BaseAction<BmsEcnDocument>{
	private static final long serialVersionUID = 1L;
	private IEcnDocumentDao ecnDocumentDao;
	private IEcnTaskDao ecnTaskDao;
	private String startDate="";
	private String endDate="";
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
	
	private File ecndocumentfile;
	private String ecndocumentfileFileName;
	private String ecndocumentfileContentType;
	
	private File changedbom;
	private String changedbomFileName;
	private String changedbomContentType;
	
	private TransactionTemplate transactionTemplate;
	
	/**
	 * 显示主页面
	 * @return
	 */
	public String index(){
		return "index";
	}
	/**
	 * 显示技改单录入页面
	 * @return
	 */
	public String maintain(){
		return "maintain";
	}
	
	/**
	 * 查询技改单列表
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings("rawtypes")
	public String showEchTransList() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("ecn_document_number") != null) conditionMap.put("ecn_document_number", new String(request.getParameter("ecn_document_number").getBytes("ISO8859-1"),"UTF-8"));
		if (request.getParameter("subject") != null) conditionMap.put("subject", new String(request.getParameter("subject").getBytes("ISO8859-1"),"UTF-8"));
		if (request.getParameter("status") != null) conditionMap.put("status", new String(request.getParameter("status").getBytes("ISO8859-1"),"UTF-8"));
		if (request.getParameter("tecn_flag") != null) conditionMap.put("tecn_flag", new String(request.getParameter("tecn_flag").getBytes("ISO8859-1"),"UTF-8"));

		if(startDate!=null) conditionMap.put("startDate", startDate);
		if(endDate!=null)conditionMap.put("endDate",endDate);
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist=ecnDocumentDao.getEcnDocumentList(conditionMap);	
		int totalCount=ecnDocumentDao.getEcnDocumentTotalCount(conditionMap);
		
		
		
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
	//新增技改单
	public String addECN() throws UnsupportedEncodingException{
		transactionTemplate.execute(new TransactionCallbackWithoutResult(){
			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				HttpServletRequest request= ServletActionContext.getRequest();
				try {
					request.setCharacterEncoding("UTF-8");
				} catch (UnsupportedEncodingException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				}
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				int userid=getUser().getId();
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String curTime = df.format(new Date());
				PrintWriter out = null;
				BmsEcnDocument ecnDocument = new BmsEcnDocument();
				String message = "";
				try{
					ecnDocument.setEcn_type(Integer.parseInt(request.getParameter("new_ecn_type")));
					ecnDocument.setSubject(request.getParameter("new_subject"));
					ecnDocument.setResponsible_organization((new String(request.getParameter("new_responsible_organization").getBytes("UTF-8"),"UTF-8")));
					ecnDocument.setEcn_document_number(new String(request.getParameter("new_ecn_document_number").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setEcn_document_date(new String(request.getParameter("new_ecn_document_date").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setGcy_contacts(new String(request.getParameter("new_gcy_contacts").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setGy_contacts(new String(request.getParameter("new_gy_contacts").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setTecn_flag(new String(request.getParameter("new_tecn_flagValue").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setEditor_id(userid);
					ecnDocument.setEdit_date(curTime);
					
				   	// 把上传的文件放到指定的路径下  
			    	String path = ServletActionContext.getServletContext().getRealPath("/file/upload/ecn/");
			    	// 写到指定的路径中  
			    	File file = new File(path);  
			    	// 如果指定的路径没有就创建  
			    	if (!file.exists()) {  
			    		file.mkdirs();  
			    	}
			    	long fileLength = 0;
					// 把得到的文件的集合通过循环的方式读取并放在指定的路径下
			    	if (ecndocumentfile != null){
			    		df = new SimpleDateFormat("yyyyMMddHHmmss");
			    		String nowTime = "ecnFile_"+df.format(new Date())+getEcndocumentfileFileName().substring(getEcndocumentfileFileName().indexOf("."), getEcndocumentfileFileName().length());
			    		setEcndocumentfileFileName(nowTime);
							try {
								// list集合通过get(i)的方式来获取索引
								File ecnFile = new File(file, getEcndocumentfileFileName());
								fileLength += ecnFile.length();
								FileUtils.copyFile(ecndocumentfile, ecnFile);
								ecnDocument.setEcn_document_file(getEcndocumentfileFileName());
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
			    	}
			    	if (changedbom != null){
			    		df = new SimpleDateFormat("yyyyMMddHHmmss");
			    		String nowTime = "changedbomFile_"+df.format(new Date())+getChangedbomFileName().substring(getChangedbomFileName().indexOf("."), getChangedbomFileName().length());
			    		setChangedbomFileName(nowTime);
							try {
								// list集合通过get(i)的方式来获取索引
								File bomFile = new File(file, getChangedbomFileName());
								fileLength += bomFile.length();
								FileUtils.copyFile(changedbom, bomFile);
								ecnDocument.setChanged_bom(getChangedbomFileName());
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
			    	}
			    	if(fileLength>1024 * 1024 * 20){
						JSONObject json = Util.dataListToJson(false,"新增失败，单个上传文件大小不能大于10M！",null);
						try {
							out = response.getWriter();
						} catch (IOException e) {
							e.printStackTrace();
						}
						out.print(json);
			    	}else{
				    	ecnDocumentDao.addEcnDocument(ecnDocument);
				    	int ecn_id = ecnDocument.getId();
				    	//获取技改任务字符串
				    	String allEcnTask = request.getParameter("new_allEcnTask");
				    	System.out.println("技改范围字符串："+allEcnTask);
				    	JSONArray allEcnTaskJSONArray = JSONArray.fromObject(allEcnTask);
				    	System.out.println("技改范围字符串："+allEcnTaskJSONArray);
				    	for (int i = 0; i < allEcnTaskJSONArray.size(); i++){
				    		JSONObject taskJSON = allEcnTaskJSONArray.getJSONObject(i);
				    		String task_content = taskJSON.getString("task_content");
				    		String switch_mode = taskJSON.getString("switch_mode");
				    		String total_hours = taskJSON.getString("total_hours");
				    		JSONArray task_areaJSONArray = taskJSON.getJSONArray("task_area");
							JSONArray ecn_timeArray=taskJSON.getJSONArray("ecn_time");
				    		for (int j = 0; j < task_areaJSONArray.size(); j++){
				    			JSONObject taskAreaJSON = task_areaJSONArray.getJSONObject(j);
				    			int ecn_order_id = Integer.parseInt(taskAreaJSON.getString("ecn_order_id"));
				    			int ecn_factory_id = Integer.parseInt(taskAreaJSON.getString("ecn_factory_id"));
								String ecn_number = taskAreaJSON.getString("ecn_number");
								
								BmsEcnTask ecnTask = new BmsEcnTask();
								ecnTask.setEcn_id(ecn_id);
								ecnTask.setTask_number((i+1));
								ecnTask.setTask_content(task_content);
								ecnTask.setSwitch_mode(switch_mode);
								ecnTask.setEcn_order_id(ecn_order_id);
								ecnTask.setEcn_factory_id(ecn_factory_id);
								ecnTask.setEcn_number(ecn_number);
								ecnTask.setCreat_date(curTime);
								ecnTask.setTotal_hours(total_hours);
								ecnDocumentDao.addEcnTask(ecnTask);
								
								//获取返回的task id插入BMS_ECN_TIME表数据
								int ecn_task_id=ecnTask.getId();
								for(int k=0;k<ecn_timeArray.size();k++){
									JSONObject ecnTimeJSON = ecn_timeArray.getJSONObject(k);
									int workshop_id=Integer.parseInt(ecnTimeJSON.getString("workshop_id"));
									String unit_time=ecnTimeJSON.getString("unit_time");
									String unit=ecnTimeJSON.getString("unit");
									Map<String,Object> pmap=new HashMap<String,Object>();
									pmap.put("ecn_task_id", ecn_task_id);
									pmap.put("workshop_id", workshop_id);
									pmap.put("unit_time", unit_time);
									pmap.put("unit", unit);
									ecnDocumentDao.addEcnTime(pmap);
								}
				    		}
				    	}
						JSONObject json = Util.dataListToJson(true,"新增成功",null);
						try {
							out = response.getWriter();
						} catch (IOException e) {
							e.printStackTrace();
						}
						out.print(json);	
			    	}

				}catch(Exception e){
					JSONObject json = Util.dataListToJson(false,"新增失败",null);
					try {
						out = response.getWriter();
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					out.print(json);	
					e.printStackTrace(); 
					status.setRollbackOnly(); 	
				}
				
			}
			
		});
		return null;
	}
	//编辑技改单
	public String editECN() throws UnsupportedEncodingException{
		transactionTemplate.execute(new TransactionCallbackWithoutResult(){
			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				HttpServletRequest request= ServletActionContext.getRequest();
				try {
					request.setCharacterEncoding("UTF-8");
				} catch (UnsupportedEncodingException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				}
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				int userid=getUser().getId();
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String curTime = df.format(new Date());
				PrintWriter out = null;
				try{
					BmsEcnDocument ecnDocument = new BmsEcnDocument();
					ecnDocument.setId(Integer.parseInt(request.getParameter("edit_id")));
					ecnDocument.setEcn_type(Integer.parseInt(request.getParameter("edit_ecn_type")));
					ecnDocument.setSubject(request.getParameter("edit_subject"));
					ecnDocument.setResponsible_organization((new String(request.getParameter("edit_responsible_organization").getBytes("UTF-8"),"UTF-8")));
					ecnDocument.setEcn_document_number(new String(request.getParameter("edit_ecn_document_number").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setEcn_document_date(new String(request.getParameter("edit_ecn_document_date").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setGcy_contacts(new String(request.getParameter("edit_gcy_contacts").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setGy_contacts(new String(request.getParameter("edit_gy_contacts").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setTecn_flag(new String(request.getParameter("edit_tecn_flagValue").getBytes("UTF-8"),"UTF-8"));
					ecnDocument.setEditor_id(userid);
					ecnDocument.setEdit_date(curTime);
					
				   	// 把上传的文件放到指定的路径下  
			    	String path = ServletActionContext.getServletContext().getRealPath("/file/upload/ecn/");
			    	// 写到指定的路径中  
			    	File file = new File(path);  
			    	// 如果指定的路径没有就创建  
			    	if (!file.exists()) {  
			    		file.mkdirs();  
			    	}
			    	long fileLength = 0;
					// 把得到的文件的集合通过循环的方式读取并放在指定的路径下
			    	if (ecndocumentfile != null){
			    		df = new SimpleDateFormat("yyyyMMddHHmmss");
			    		String nowTime = "ecnFile_"+df.format(new Date())+getEcndocumentfileFileName().substring(getEcndocumentfileFileName().indexOf("."), getEcndocumentfileFileName().length());
			    		setEcndocumentfileFileName(nowTime);
							try {
								// list集合通过get(i)的方式来获取索引
								File ecnFile = new File(file, getEcndocumentfileFileName());
								fileLength += ecnFile.length();
								FileUtils.copyFile(ecndocumentfile, ecnFile);
								ecnDocument.setEcn_document_file(getEcndocumentfileFileName());
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
			    	}
			    	if (changedbom != null){
			    		df = new SimpleDateFormat("yyyyMMddHHmmss");
			    		String nowTime = "changedbomFile_"+df.format(new Date())+getChangedbomFileName().substring(getChangedbomFileName().indexOf("."), getChangedbomFileName().length());
			    		setChangedbomFileName(nowTime);
							try {
								// list集合通过get(i)的方式来获取索引
								File bomFile = new File(file, getChangedbomFileName());
								fileLength += bomFile.length();
								FileUtils.copyFile(changedbom, bomFile);
								ecnDocument.setChanged_bom(getChangedbomFileName());
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
			    	}
			    	if(fileLength>1024 * 1024 * 20){
						JSONObject json = Util.dataListToJson(false,"维护失败，单个上传文件大小不能大于10M！",null);
						try {
							out = response.getWriter();
						} catch (IOException e) {
							e.printStackTrace();
						}
						out.print(json);
			    	}else{
				    	ecnDocumentDao.editEcnDocument(ecnDocument);
				    	int ecn_id = ecnDocument.getId();
				    	//获取新增、修改技改任务字符串
				    	String allEcnTask = request.getParameter("edit_allEcnTask");
				    	JSONArray allEcnTaskJSONArray = JSONArray.fromObject(allEcnTask);
				    	System.out.println("获取新增、修改技改任务字符串："+allEcnTaskJSONArray);
				    	//获取删除技改任务字符串
				    	String deletedEcnTaskId = request.getParameter("edit_deleteTaskId");
				    	JSONArray deletedEcnTaskIdJSONArray = JSONArray.fromObject(deletedEcnTaskId);
				    	List taskIdList = new ArrayList();
				    	System.out.println("删除技改任务字符串："+deletedEcnTaskIdJSONArray);
				    	for (int i = 0; i < deletedEcnTaskIdJSONArray.size(); i++){
				    		if(deletedEcnTaskIdJSONArray.get(i)!=""&&Integer.parseInt(deletedEcnTaskIdJSONArray.get(i).toString())!=0){
				    			taskIdList.add(Integer.parseInt(deletedEcnTaskIdJSONArray.get(i).toString()));
				    		}
				    	}
				    	//删除技改任务
				    	if(taskIdList.size()>0){
				    		ecnDocumentDao.deleteEcnTask(taskIdList);
				    		ecnDocumentDao.deleteEcnTaskDetail(taskIdList);
				    		ecnDocumentDao.deleteEcnTime(taskIdList);//删除ECN time记录
				    	}
				    	if(allEcnTaskJSONArray.size()==0){
				    		//删除技改单
				    		List list = new ArrayList();
				    		list.add(ecnDocument.getId());
				    		ecnDocumentDao.deleteEcnDocument(list);
				    	}
				    	//新增、修改技改任务
				    	for (int i = 0; i < allEcnTaskJSONArray.size(); i++){
				    		JSONObject taskJSON = allEcnTaskJSONArray.getJSONObject(i);
				    		String task_content = taskJSON.getString("task_content");
				    		String switch_mode = taskJSON.getString("switch_mode");
				    		String total_hours = taskJSON.getString("total_hours");
				    		JSONArray task_areaJSONArray = taskJSON.getJSONArray("task_area");
				    		JSONArray ecn_timeArray=taskJSON.getJSONArray("ecn_time");
				    		for (int j = 0; j < task_areaJSONArray.size(); j++){
				    			JSONObject taskAreaJSON = task_areaJSONArray.getJSONObject(j);
				    			int task_id = Integer.parseInt(taskAreaJSON.getString("ecn_task_id"));
				    			int ecn_order_id = Integer.parseInt(taskAreaJSON.getString("ecn_order_id"));
				    			int ecn_factory_id = Integer.parseInt(taskAreaJSON.getString("ecn_factory_id"));
								String ecn_number = taskAreaJSON.getString("ecn_number");
								int task_number = Integer.parseInt(taskAreaJSON.getString("ecn_task_number"));
								
								BmsEcnTask ecnTask = new BmsEcnTask();
								ecnTask.setEcn_id(ecn_id);
								ecnTask.setTask_number(task_number);
								ecnTask.setTask_content(task_content);
								ecnTask.setSwitch_mode(switch_mode);
								ecnTask.setEcn_order_id(ecn_order_id);
								ecnTask.setEcn_factory_id(ecn_factory_id);
								ecnTask.setEcn_number(ecn_number);
								ecnTask.setCreat_date(curTime);
								ecnTask.setTotal_hours(total_hours);
																
								if(task_id!=0){
									ecnTask.setId(task_id);
									ecnDocumentDao.editEcnTask(ecnTask);
									for(int k=0;k<ecn_timeArray.size();k++){
										JSONObject ecnTimeJSON = ecn_timeArray.getJSONObject(k);
										int ecn_time_id=Integer.parseInt(ecnTimeJSON.getString("id"));
										int workshop_id=Integer.parseInt(ecnTimeJSON.getString("workshop_id"));
										String unit_time=ecnTimeJSON.getString("unit_time");
										String unit=ecnTimeJSON.getString("unit");
										Map<String,Object> pmap=new HashMap<String,Object>();
										pmap.put("ecn_task_id", task_id);
										pmap.put("workshop_id", workshop_id);
										pmap.put("unit_time", unit_time);
										pmap.put("unit", unit);
										pmap.put("id", ecn_time_id);
										if(ecn_time_id!=0){
											ecnDocumentDao.editEcnTime(pmap);
										}else{
											ecnDocumentDao.addEcnTime(pmap);
										}
										
									}
								}else{
									ecnDocumentDao.addEcnTask(ecnTask);
									//获取返回的task id插入BMS_ECN_TIME表数据								
									int ecn_task_id=ecnTask.getId();
									for(int k=0;k<ecn_timeArray.size();k++){
										JSONObject ecnTimeJSON = ecn_timeArray.getJSONObject(k);
										int workshop_id=Integer.parseInt(ecnTimeJSON.getString("workshop_id"));
										String unit_time=ecnTimeJSON.getString("unit_time");
										String unit=ecnTimeJSON.getString("unit");
										Map<String,Object> pmap=new HashMap<String,Object>();
										pmap.put("ecn_task_id", ecn_task_id);
										pmap.put("workshop_id", workshop_id);
										pmap.put("unit_time", unit_time);
										pmap.put("unit", unit);
										ecnDocumentDao.addEcnTime(pmap);
									}
								}
				    		}
				    	}
						JSONObject json = Util.dataListToJson(true,"维护成功",null);
						try {
							out = response.getWriter();
						} catch (IOException e) {
							e.printStackTrace();
						}
						out.print(json);	
			    	}
				}catch(Exception e){
					JSONObject json = Util.dataListToJson(false,"维护失败",null);
					try {
						out = response.getWriter();
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					out.print(json);	
					e.printStackTrace(); 
					status.setRollbackOnly(); 	
				}
			}
			
		});
			
		return null;
	}
	

	/**
	 * 根据ecnid获取技改单内容和技改任务
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getEcnDocumentAndEcnTask() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("ecn_id") != null && request.getParameter("ecn_id") !="") conditionMap.put("ecn_id",Integer.parseInt(request.getParameter("ecn_id")));
		List datalist=new ArrayList();
		datalist=ecnDocumentDao.getEcnDocumentList(conditionMap);		
		if(datalist.size()==1){
			BmsEcnDocument ecnDocument = (BmsEcnDocument)datalist.get(0);
			Map<String,Object> task=new HashMap<String,Object>();
			task.put("ecn_id", ecnDocument.getId());
			List taskList=new ArrayList();
			taskList = ecnDocumentDao.getEcnTaskList(task);
			ecnDocument.setEcn_task_list(taskList);
		}
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
	/**
	 * 获取工厂订单数量
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getFactoryOrderQty() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("order_id") != null && request.getParameter("order_id") !="") conditionMap.put("order_id",Integer.parseInt(request.getParameter("order_id")));
		if (request.getParameter("factory_id") != null && request.getParameter("factory_id") !="") conditionMap.put("factory_id",Integer.parseInt(request.getParameter("factory_id")));
		List datalist=new ArrayList();
		Map map = new HashMap();
		map=ecnDocumentDao.getFactoryOrderQty(conditionMap);		
		datalist.add(map);
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
	
	public IEcnTaskDao getEcnTaskDao() {
		return ecnTaskDao;
	}
	public void setEcnTaskDao(IEcnTaskDao ecnTaskDao) {
		this.ecnTaskDao = ecnTaskDao;
	}
	public File getEcndocumentfile() {
		return ecndocumentfile;
	}
	public void setEcndocumentfile(File ecndocumentfile) {
		this.ecndocumentfile = ecndocumentfile;
	}
	public String getEcndocumentfileFileName() {
		return ecndocumentfileFileName;
	}
	public void setEcndocumentfileFileName(String ecndocumentfileFileName) {
		this.ecndocumentfileFileName = ecndocumentfileFileName;
	}
	public String getEcndocumentfileContentType() {
		return ecndocumentfileContentType;
	}
	public void setEcndocumentfileContentType(String ecndocumentfileContentType) {
		this.ecndocumentfileContentType = ecndocumentfileContentType;
	}
	public File getChangedbom() {
		return changedbom;
	}
	public void setChangedbom(File changedbom) {
		this.changedbom = changedbom;
	}
	public String getChangedbomFileName() {
		return changedbomFileName;
	}
	public void setChangedbomFileName(String changedbomFileName) {
		this.changedbomFileName = changedbomFileName;
	}
	public String getChangedbomContentType() {
		return changedbomContentType;
	}
	public void setChangedbomContentType(String changedbomContentType) {
		this.changedbomContentType = changedbomContentType;
	}
	private Pager pager;
	

	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public IEcnDocumentDao getEcnDocumentDao() {
		return ecnDocumentDao;
	}
	public void setEcnDocumentDao(IEcnDocumentDao ecnDocumentDao) {
		this.ecnDocumentDao = ecnDocumentDao;
	}
	public TransactionTemplate getTransactionTemplate() {
		return transactionTemplate;
	}
	public void setTransactionTemplate(TransactionTemplate transactionTemplate) {
		this.transactionTemplate = transactionTemplate;
	}
}
