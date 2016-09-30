package com.byd.bms.aftersale.action;

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

import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.aftersale.dao.IAfterSaleDao;
import com.byd.bms.aftersale.entity.AfterSalesProblems;
import com.byd.bms.aftersale.entity.ImproveSalesProblems;
import com.byd.bms.plan.entity.PlanVIN;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class AfterSaleAction extends BaseAction<Object>{

	private static final long serialVersionUID = 1L;
	private ImproveSalesProblems improveSalesProblems = new ImproveSalesProblems();
	public ImproveSalesProblems getImproveSalesProblems() {
		return improveSalesProblems;
	}

	public void setImproveSalesProblems(ImproveSalesProblems improveSalesProblems) {
		this.improveSalesProblems = improveSalesProblems;
	}


	private IAfterSaleDao afterSaleDao;	
	private File faultPhoto;
	private String faultPhotoFileName;
	private String faultPhotoContentType;
	
	private File modifyFaultPhoto;
	private String modifyFaultPhotoFileName;
	private String modifyFaultPhotoContentType;
	
	private File beforePhoto;
	private String beforePhotoFileName;
	private String beforePhotoContentType;
	private File afterPhoto;
	private String afterPhotoFileName;
	private String afterPhotoContentType;
	
	private File attachment;
	private String attachmentFileName;
	private String attachmentContentType;
	
	private Pager pager;
	
	public File getModifyFaultPhoto() {
		return modifyFaultPhoto;
	}

	public void setModifyFaultPhoto(File modifyFaultPhoto) {
		this.modifyFaultPhoto = modifyFaultPhoto;
	}

	public String getModifyFaultPhotoFileName() {
		return modifyFaultPhotoFileName;
	}

	public void setModifyFaultPhotoFileName(String modifyFaultPhotoFileName) {
		this.modifyFaultPhotoFileName = modifyFaultPhotoFileName;
	}

	public String getModifyFaultPhotoContentType() {
		return modifyFaultPhotoContentType;
	}

	public void setModifyFaultPhotoContentType(String modifyFaultPhotoContentType) {
		this.modifyFaultPhotoContentType = modifyFaultPhotoContentType;
	}

	public File getAttachment() {
		return attachment;
	}

	public void setAttachment(File attachment) {
		this.attachment = attachment;
	}

	public String getAttachmentFileName() {
		return attachmentFileName;
	}

	public void setAttachmentFileName(String attachmentFileName) {
		this.attachmentFileName = attachmentFileName;
	}

	public String getAttachmentContentType() {
		return attachmentContentType;
	}

	public void setAttachmentContentType(String attachmentContentType) {
		this.attachmentContentType = attachmentContentType;
	}
	public File getBeforePhoto() {
		return beforePhoto;
	}

	public void setBeforePhoto(File beforePhoto) {
		this.beforePhoto = beforePhoto;
	}

	public String getBeforePhotoFileName() {
		return beforePhotoFileName;
	}

	public void setBeforePhotoFileName(String beforePhotoFileName) {
		this.beforePhotoFileName = beforePhotoFileName;
	}

	public String getBeforePhotoContentType() {
		return beforePhotoContentType;
	}

	public void setBeforePhotoContentType(String beforePhotoContentType) {
		this.beforePhotoContentType = beforePhotoContentType;
	}

	public File getAfterPhoto() {
		return afterPhoto;
	}

	public void setAfterPhoto(File afterPhoto) {
		this.afterPhoto = afterPhoto;
	}

	public String getAfterPhotoFileName() {
		return afterPhotoFileName;
	}

	public void setAfterPhotoFileName(String afterPhotoFileName) {
		this.afterPhotoFileName = afterPhotoFileName;
	}

	public String getAfterPhotoContentType() {
		return afterPhotoContentType;
	}

	public void setAfterPhotoContentType(String afterPhotoContentType) {
		this.afterPhotoContentType = afterPhotoContentType;
	}
	
	public File getFaultPhoto() {
		return faultPhoto;
	}

	public void setFaultPhoto(File faultPhoto) {
		this.faultPhoto = faultPhoto;
	}

	public String getFaultPhotoFileName() {
		return faultPhotoFileName;
	}

	public void setFaultPhotoFileName(String faultPhotoFileName) {
		this.faultPhotoFileName = faultPhotoFileName;
	}

	public String getFaultPhotoContentType() {
		return faultPhotoContentType;
	}

	public void setFaultPhotoContentType(String faultPhotoContentType) {
		this.faultPhotoContentType = faultPhotoContentType;
	}

	public IAfterSaleDao getAfterSaleDao() {
		return afterSaleDao;
	}

	public void setAfterSaleDao(IAfterSaleDao afterSaleDao) {
		this.afterSaleDao = afterSaleDao;
	}
	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}
	
	//跳转到售后模块首页
	public String index(){
		return "index";
	}
	//跳转到售后问题录入页面
	public String afterSaleProblem(){
		return "afterSaleProblem";
	}
	//跳转到问题改善报告页面
	public String improveReport(){
		return "improveReport";
	}
	//跳转到查询售后问题页面
	public String queryAfterSaleProblems(){
		return "queryAfterSaleProblems";
	}
	
	/*
	 * 售后问题录入-查询已录入的售后问题清单
	 */
	public String getAfterSaleProblems() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("id") != null && request.getParameter("id") !="") conditionMap.put("id",Integer.parseInt(request.getParameter("id")));
		if (request.getParameter("seach_factory") != null && request.getParameter("seach_factory") !="") conditionMap.put("seach_factory",request.getParameter("seach_factory"));
		if (request.getParameter("search_customer_name") != null && request.getParameter("search_customer_name") !="") conditionMap.put("search_customer_name", new String(request.getParameter("search_customer_name").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("search_fault_phenomenon") != null&& request.getParameter("search_fault_phenomenon") !="") conditionMap.put("search_fault_phenomenon", new String(request.getParameter("search_fault_phenomenon").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("startDate") != null&& request.getParameter("startDate") !="") conditionMap.put("startDate", new String(request.getParameter("startDate").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("endDate") != null&& request.getParameter("endDate") !="") conditionMap.put("endDate", new String(request.getParameter("endDate").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("status") != null && !request.getParameter("status").equals("null")&& request.getParameter("status") !="") conditionMap.put("status", new String(request.getParameter("status").getBytes("UTF-8"),"UTF-8"));
		
		if (request.getParameter("search_VIN") != null&& request.getParameter("search_VIN") !="") conditionMap.put("search_VIN", new String(request.getParameter("search_VIN").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("search_bus_number") != null&& request.getParameter("search_bus_number") !="") conditionMap.put("search_bus_number", new String(request.getParameter("search_bus_number").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("search_parts_name") != null&& request.getParameter("search_parts_name") !="") conditionMap.put("search_parts_name", new String(request.getParameter("search_parts_name").getBytes("UTF-8"),"UTF-8"));
		
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist=afterSaleDao.getAfterSalesProblemsList(conditionMap);		
		int totalCount=afterSaleDao.getAfterSalesProblemsTotalCount(conditionMap);
		
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
	/*
	 * 售后问题录入
	 */
	public String addAfterSaleProblem() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		int userid=getUser().getId();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		PrintWriter out = null;
		
		AfterSalesProblems afterSalesProblem = new AfterSalesProblems();
		afterSalesProblem.setFactory_id(Integer.parseInt(request.getParameter("new_factory")));
		afterSalesProblem.setVin(request.getParameter("new_vin"));
		afterSalesProblem.setBus_number((new String(request.getParameter("new_bus_number").getBytes("UTF-8"),"UTF-8")));
		afterSalesProblem.setCustomer_name(new String(request.getParameter("new_customer_name").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setCustomer_bus_number(new String(request.getParameter("new_customer_bus_number").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setOrder_id(Integer.parseInt(request.getParameter("new_order_id")));
		afterSalesProblem.setOrder_describe(new String(request.getParameter("new_order_desc").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setLicense_number(new String(request.getParameter("new_license_number").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFactory_date(new String(request.getParameter("new_factory_date").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_type_ids(request.getParameter("fault_type_ids"));
		afterSalesProblem.setFault_type_name(new String(request.getParameter("fault_type_name").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_level_id(Integer.parseInt(request.getParameter("new_fault_level_id")));
		afterSalesProblem.setFault_date(new String(request.getParameter("new_fault_date").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_mils(new String(request.getParameter("new_fault_mils").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_components(new String(request.getParameter("new_fault_components").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_phenomenon(new String(request.getParameter("new_fault_phenomenon").getBytes("UTF-8"),"UTF-8"));
	//	afterSalesProblem.setFault_photo(new String(request.getParameter("fault_photo").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_reason(new String(request.getParameter("new_fault_reason").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setMemo(new String(request.getParameter("new_memo").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setEditor_id(userid);
		afterSalesProblem.setEdit_date(curTime);
		
	   	// 把上传的文件放到指定的路径下  
    	String path = ServletActionContext.getServletContext().getRealPath("/images/upload/aftersaleproblem/");
    	// 写到指定的路径中  
    	File file = new File(path);  
    	// 如果指定的路径没有就创建  
    	if (!file.exists()) {  
    		file.mkdirs();  
    	}
		// 把得到的文件的集合通过循环的方式读取并放在指定的路径下
    	if (faultPhoto != null){
    		df = new SimpleDateFormat("yyyyMMddHHmmss");
    		String nowTime = "faultPhoto_"+df.format(new Date())+getFaultPhotoFileName().substring(getFaultPhotoFileName().indexOf("."), getFaultPhotoFileName().length());
    		setFaultPhotoFileName(nowTime);
				try {
					// list集合通过get(i)的方式来获取索引
					FileUtils.copyFile(faultPhoto, new File(file, getFaultPhotoFileName()));
					afterSalesProblem.setFault_photo(getFaultPhotoFileName());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
    	}
		afterSaleDao.addAfterSaleProblem(afterSalesProblem);
		JSONObject json = Util.dataListToJson(true,"新增成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	/*
	 * 售后问题修改
	 */
	public String modifyAfterSaleProblem() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		int userid=getUser().getId();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		PrintWriter out = null;
		
		AfterSalesProblems afterSalesProblem = new AfterSalesProblems();
		afterSalesProblem.setId(Integer.parseInt(request.getParameter("modify_saleProblem_id")));
		afterSalesProblem.setFactory_id(Integer.parseInt(request.getParameter("modify_factory")));
		//afterSalesProblem.setVin(request.getParameter("modify_vin"));
		//afterSalesProblem.setBus_number(request.getParameter("modify_bus_number"));
		afterSalesProblem.setCustomer_name(new String(request.getParameter("modify_customer_name").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setCustomer_bus_number(new String(request.getParameter("modify_customer_bus_number").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setOrder_id(Integer.parseInt(request.getParameter("modify_order_id")));
		afterSalesProblem.setOrder_describe(new String(request.getParameter("modify_order_desc").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setLicense_number(new String(request.getParameter("modify_license_number").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFactory_date(new String(request.getParameter("modify_factory_date").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_type_ids(request.getParameter("modify_fault_type_ids"));
		afterSalesProblem.setFault_type_name(new String(request.getParameter("modify_fault_type_name").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_level_id(Integer.parseInt(request.getParameter("modify_fault_level_id")));
		afterSalesProblem.setFault_date(new String(request.getParameter("modify_fault_date").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_mils(new String(request.getParameter("modify_fault_mils").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_components(new String(request.getParameter("modify_fault_components").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_phenomenon(new String(request.getParameter("modify_fault_phenomenon").getBytes("UTF-8"),"UTF-8"));
	//	afterSalesProblem.setFault_photo(modify String(request.getParameter("fault_photo").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setFault_reason(new String(request.getParameter("modify_fault_reason").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setMemo(new String(request.getParameter("modify_memo").getBytes("UTF-8"),"UTF-8"));
		afterSalesProblem.setEditor_id(userid);
		afterSalesProblem.setEdit_date(curTime);
		
	   	// 把上传的文件放到指定的路径下  
    	String path = ServletActionContext.getServletContext().getRealPath("/images/upload/aftersaleproblem/");
    	// 写到指定的路径中  
    	File file = new File(path);  
    	// 如果指定的路径没有就创建  
    	if (!file.exists()) {  
    		file.mkdirs();  
    	}
		// 把得到的文件的集合通过循环的方式读取并放在指定的路径下
    	if (modifyFaultPhoto != null){
    		df = new SimpleDateFormat("yyyyMMddHHmmss");
    		String nowTime = "faultPhoto_"+df.format(new Date())+getModifyFaultPhotoFileName().substring(getModifyFaultPhotoFileName().indexOf("."), getModifyFaultPhotoFileName().length());
    		setModifyFaultPhotoFileName(nowTime);
				try {
					// list集合通过get(i)的方式来获取索引
					FileUtils.copyFile(modifyFaultPhoto, new File(file, getModifyFaultPhotoFileName()));
					afterSalesProblem.setFault_photo(getModifyFaultPhotoFileName());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
    	}
		afterSaleDao.modifyAfterSaleProblem(afterSalesProblem);
		JSONObject json = Util.dataListToJson(true,"修改成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	/**
	 * 根据售后问题id获取售后问题及改善报告
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getAfterSaleProblemReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("problem_id") != null && request.getParameter("problem_id") !="") conditionMap.put("problem_id",Integer.parseInt(request.getParameter("problem_id")));
		List datalist=new ArrayList();
		datalist=afterSaleDao.getImproveSalesProblemsList(conditionMap);		
		
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
	
	public String editImproveSalesProblems() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		int userid=getUser().getId();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		PrintWriter out = null;
		
//		String id =request.getParameter("id") ;
//		if(id!=null&&!id.equals("")){
//			improveSalesProblems.setId(Integer.parseInt(id));
//		}
//		improveSalesProblems.setProblem_id(Integer.parseInt(request.getParameter("problem_id")));
//		improveSalesProblems.setSeverity_level(request.getParameter("severity_level"));
//		improveSalesProblems.setProvisional_measures(request.getParameter("provisional_measures"));
//		improveSalesProblems.setReason(request.getParameter("reason"));
//		improveSalesProblems.setImproved_measure(request.getParameter("improved_measure"));
//		improveSalesProblems.setVerify(request.getParameter("verify"));
//		improveSalesProblems.setStandard(request.getParameter("standard"));
//		improveSalesProblems.setEditor_id(userid);
//		improveSalesProblems.setEdit_date(curTime);
		
	   	// 把上传的文件放到指定的路径下  
    	String path = ServletActionContext.getServletContext().getRealPath("/images/upload/aftersaleproblem/report/");
    	// 写到指定的路径中  
    	File file = new File(path);  
    	// 如果指定的路径没有就创建  
    	if (!file.exists()) {  
    		file.mkdirs();  
    	}
		// 把得到的文件的集合通过循环的方式读取并放在指定的路径下
    	if (beforePhoto != null){
    		df = new SimpleDateFormat("yyyyMMddHHmmss");
    		String nowTime = "beforePhoto_"+df.format(new Date())+getBeforePhotoFileName().substring(getBeforePhotoFileName().indexOf("."), getBeforePhotoFileName().length());
    		setBeforePhotoFileName(nowTime);
				try {
					// list集合通过get(i)的方式来获取索引
					FileUtils.copyFile(beforePhoto, new File(file, getBeforePhotoFileName()));
					improveSalesProblems.setBefore_photo(getBeforePhotoFileName());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
    	}
    	if (afterPhoto != null){
    		df = new SimpleDateFormat("yyyyMMddHHmmss");
    		String nowTime = "afterPhoto_"+df.format(new Date())+getAfterPhotoFileName().substring(getAfterPhotoFileName().indexOf("."), getAfterPhotoFileName().length());
    		setAfterPhotoFileName(nowTime);
				try {
					// list集合通过get(i)的方式来获取索引
					FileUtils.copyFile(afterPhoto, new File(file, getAfterPhotoFileName()));
					improveSalesProblems.setAfter_photo(getAfterPhotoFileName());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
    	} 	
    	if (attachment != null){
    		df = new SimpleDateFormat("yyyyMMddHHmmss");
    		String nowTime = "asProblem_"+df.format(new Date())+getAttachmentFileName().substring(getAttachmentFileName().indexOf("."), getAttachmentFileName().length());
    		setAttachmentFileName(nowTime);
				try {
					// list集合通过get(i)的方式来获取索引
					FileUtils.copyFile(attachment, new File(file, getAttachmentFileName()));
					improveSalesProblems.setAttachment(getAttachmentFileName());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
    	}
    	
    	if(improveSalesProblems.getId()!=0){
    		afterSaleDao.updateImproveSalesProblems(improveSalesProblems);
    	}else{
    		afterSaleDao.addImproveSalesProblems(improveSalesProblems);
    		afterSaleDao.updateAfterSaleProblem(improveSalesProblems);
    	}
		JSONObject json = Util.dataListToJson(true,"操作成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	public String exportVin() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("id") != null && request.getParameter("id") !="") conditionMap.put("id",Integer.parseInt(request.getParameter("id")));
		if (request.getParameter("seach_factory") != null && request.getParameter("seach_factory") !="") conditionMap.put("seach_factory",request.getParameter("seach_factory"));
		if (request.getParameter("search_customer_name") != null && request.getParameter("search_customer_name") !="") conditionMap.put("search_customer_name", new String(request.getParameter("search_customer_name").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("search_fault_phenomenon") != null&& request.getParameter("search_fault_phenomenon") !="") conditionMap.put("search_fault_phenomenon", new String(request.getParameter("search_fault_phenomenon").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("startDate") != null&& request.getParameter("startDate") !="") conditionMap.put("startDate", new String(request.getParameter("startDate").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("endDate") != null&& request.getParameter("endDate") !="") conditionMap.put("endDate", new String(request.getParameter("endDate").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("status") != null && !request.getParameter("status").equals("null")&& request.getParameter("status") !="") conditionMap.put("status", new String(request.getParameter("status").getBytes("UTF-8"),"UTF-8"));
		
		if (request.getParameter("search_VIN") != null&& request.getParameter("search_VIN") !="") conditionMap.put("search_VIN", new String(request.getParameter("search_VIN").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("search_bus_number") != null&& request.getParameter("search_bus_number") !="") conditionMap.put("search_bus_number", new String(request.getParameter("search_bus_number").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("search_parts_name") != null&& request.getParameter("search_parts_name") !="") conditionMap.put("search_parts_name", new String(request.getParameter("search_parts_name").getBytes("UTF-8"),"UTF-8"));
		
		List datalist=new ArrayList();
		datalist=afterSaleDao.getProblemsList(conditionMap);
		StringBuffer strBuffer = new StringBuffer();  
		strBuffer.append("工厂,VIN号,车号,客户车辆自编号,车牌号,订单,客户,出厂日期,故障类型,故障等级,故障日期,故障里程,故障零部件,故障现象,故障原因,临时措施,根本原因,改进措施,执行和验证,预防和标准化,\n"); 
		for(int i=0;i<datalist.size();i++){
			AfterSalesProblems problem = (AfterSalesProblems)datalist.get(i);
			String factory_name = (problem.getFactory_name()==null)?"":problem.getFactory_name();
			String vin = (problem.getVin()==null)?"":problem.getVin();
			String bus_number = (problem.getBus_number()==null)?"":problem.getBus_number();
			String customer_bus_number = (problem.getCustomer_bus_number()==null)?"":problem.getCustomer_bus_number(); //客户车辆自编号
			String license_number = (problem.getLicense_number()==null)?"":problem.getLicense_number();
			String order_describe = (problem.getOrder_describe()==null)?"":problem.getOrder_describe();
			String customer_name = (problem.getCustomer_name()==null)?"":problem.getCustomer_name();
			String factory_date = (problem.getFactory_date()==null)?"":problem.getFactory_date();
			String fault_type_name = (problem.getFault_type_name()==null)?"":problem.getFault_type_name();
			String faultLevelName = "";
			if(problem.getSeverity_level()!=null){
				faultLevelName =  problem.getSeverity_level();
			}else{
				faultLevelName = (problem.getFaultLevelName()==null)?"":problem.getFaultLevelName();
			}
			String fault_date = (problem.getFault_date()==null)?"":problem.getFault_date();
			String fault_mils = (problem.getFault_mils()==null)?"":problem.getFault_mils();
			String fault_components = (problem.getFault_components()==null)?"":problem.getFault_components();			
			String fault_phenomenon = (problem.getFault_phenomenon()==null)?"":problem.getFault_phenomenon();	
			String fault_reason = (problem.getFault_reason()==null)?"":problem.getFault_reason();
			
			String provisional_measures = (problem.getProvisional_measures()==null)?"":problem.getProvisional_measures();
			String reason = (problem.getReason()==null)?"":problem.getReason(); 
			String improved_measure = (problem.getImproved_measure()==null)?"":problem.getImproved_measure();
			String verify = (problem.getVerify()==null)?"":problem.getVerify();
			String standard = (problem.getStandard()==null)?"":problem.getStandard();
			strBuffer.append(factory_name+","+ vin +","+ bus_number + "," + customer_bus_number+ "," + license_number+ "," + order_describe 
					+ "," + customer_name + "," + factory_date + "," + fault_type_name + "," + faultLevelName + "," + fault_date
					+ "," + fault_mils+ "," + fault_components+ "," + fault_phenomenon+ "," + fault_reason+ "," + provisional_measures
					+ "," + reason+ "," + improved_measure+ "," + verify+ "," + standard+",,\n"); 
		}     
        HttpServletResponse response = ServletActionContext.getResponse();  
        response.setHeader("Content-Disposition","attachment;filename=afterSaleProblems.csv");  
        response.setContentType("APPLICATION/OCTET-STREAM;charset=GBK");  
        try {  
        	response.setCharacterEncoding("GBK");
        	   System.out.println(strBuffer.toString());
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
	
	
	/*
	 * 根据VIN号获取车辆信息
	 */
	public String getBusInformation() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		Map map = new HashMap();
		if (request.getParameter("vin") != null&& request.getParameter("vin") !="") map.put("vin", request.getParameter("vin"));
		if (request.getParameter("busNumber") != null&& request.getParameter("busNumber") !="") map.put("busNumber", request.getParameter("busNumber"));
		if (request.getParameter("factory_id") != null&& request.getParameter("factory_id") !="") map.put("factory_id", request.getParameter("factory_id"));
		Map<String,Object> busInfo = afterSaleDao.getBusInfo(map);
		List datalist=new ArrayList();
		PrintWriter out = null;
		JSONObject json ;
		if(busInfo!=null){
			datalist.add(busInfo);
			 json = Util.dataListToJson(true,"查询成功",datalist);
		}else{
			json = Util.dataListToJson(false,"查询失败，输入的vin码或者车号在本工厂下不存在",null);
		}
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

}
