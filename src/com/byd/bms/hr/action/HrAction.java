package com.byd.bms.hr.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.hr.dao.IHrDao;
import com.byd.bms.hr.dao.IOrgDao;
import com.byd.bms.hr.entity.BmsHrStaff;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;
import com.byd.bms.util.poi.ExcelModel;
import com.byd.bms.util.poi.ExcelTool;

public class HrAction extends BaseAction<Object>{

	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger(HrAction.class.getName());
	private IHrDao hrDao;
	/*文件上传组件*/
	private File file;					//获取上传文件
    private String fileFileName;		//获取上传文件名称
    private String fileContentType;		//获取上传文件类型    
    private String conditions;	
    
	public IHrDao getHrDao() {
		return hrDao;
	}
	public void setHrDao(IHrDao hrDao) {
		this.hrDao = hrDao;
	}

	private Pager pager;
	private IOrgDao orgDao;
	
	public IOrgDao getOrgDao() {
		return orgDao;
	}
	public void setOrgDao(IOrgDao orgDao) {
		this.orgDao = orgDao;
	}
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
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
	public String getConditions() {
		return conditions;
	}
	public void setConditions(String conditions) {
		this.conditions = conditions;
	}
	
	
	public String index(){
		return "index";
	}
	
	public String attendance(){
		return "attendance";
	}
	
	public String rewardspunishment(){
		return "rewardspunishment";
	}
	
	public String rewardsCollect(){
		return "rewardsCollect";
	}
	
	public String waitmanhourStatistic(){
		return "waitmanhourStatistic";		//等待工时统计
	}
	
	public String workTimePrice(){
		return "workTimePrice";
	}
	
	public String userrole(){
		return "userrole";
	}
	
	public String delWorkTimePrice() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::delWorkTimePrice " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		String price_id = request.getParameter("price_id");
		
		hrDao.delWorkTimePrice(price_id);
		
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String editWorkTimePrice() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::editWorkTimePrice " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		String editPrice_id = request.getParameter("editPrice_id");
		String editWorkTimeType = request.getParameter("editWorkTimeType");
		String editFactory = request.getParameter("editFactory");
		String editSkillParameter = request.getParameter("editSkillParameter");
		String editPrice = request.getParameter("editPrice");
		String editStartDate = request.getParameter("editStartDate");
		String editEndDate = request.getParameter("editEndDate");
		
		if(editWorkTimeType.equals("0")){
			editFactory = "";editSkillParameter="";
		}else if (editWorkTimeType.equals("1")){
			editFactory = "";editSkillParameter="";
		}else if(editWorkTimeType.equals("2")){
			editSkillParameter="";
		}else if(editWorkTimeType.equals("3")){
			editSkillParameter="";
		}
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		queryMap.put("editPrice_id", editPrice_id);
		queryMap.put("editWorkTimeType", editWorkTimeType);
		queryMap.put("editFactory", editFactory);
		queryMap.put("editSkillParameter", editSkillParameter);
		queryMap.put("editPrice", editPrice);
		queryMap.put("editStartDate", editStartDate);
		queryMap.put("editEndDate", editEndDate);
		queryMap.put("editor_id", userid);
		queryMap.put("edit_date", curTime);
		
		hrDao.editWorkTimePrice(queryMap);
		
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
		
	}
	
	public String addWorkTimePrice() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::addWorkTimePrice " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		String newWorkTimeType = request.getParameter("newWorkTimeType");
		String newFactory = request.getParameter("newFactory");
		String newSkillParameter = request.getParameter("newSkillParameter");
		String newPrice = request.getParameter("newPrice");
		String newStartDate = request.getParameter("newStartDate");
		String newEndDate = request.getParameter("newEndDate");
		
		if(newWorkTimeType.equals("0")){
			newFactory = "";newSkillParameter="";
		}else if(newWorkTimeType.equals("1")){
			newFactory = "";newSkillParameter="";
		}else if(newWorkTimeType.equals("2")){
			newSkillParameter="";
		}else if(newWorkTimeType.equals("3")){
			newSkillParameter="";
		}
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		queryMap.put("newWorkTimeType", newWorkTimeType);
		queryMap.put("newFactory", newFactory);
		queryMap.put("newSkillParameter", newSkillParameter);
		queryMap.put("newPrice", newPrice);
		queryMap.put("newStartDate", newStartDate);
		queryMap.put("newEndDate", newEndDate);
		queryMap.put("editor_id", userid);
		queryMap.put("edit_date", curTime);
		
		hrDao.addWorkTimePrice(queryMap);
		
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
		
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getWorkTimePriceList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::getWorkTimePriceList " + curTime + " " + userid);
		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("workTimeType", request.getParameter("workTimeType"));
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("skillParameter", request.getParameter("skillParameter"));
		conditionMap.put("stratDate", request.getParameter("stratDate"));
		conditionMap.put("endDate", request.getParameter("endDate"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List list = hrDao.getWorkTimePriceList(conditionMap);
		int totalCount=hrDao.getWorkTimePriceListTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);						
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		JSONObject json = Util.dataListToJson(true, "查询成功", list, page_map);
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getRewardsCollectList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::getRewardsCollectList " + curTime + " " + userid);
		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("org_id", request.getParameter("org_id"));
		conditionMap.put("orgType", request.getParameter("orgType"));
		conditionMap.put("staff_date", request.getParameter("staff_date"));
		conditionMap.put("staff_number", request.getParameter("staff_number"));
		conditionMap.put("month", request.getParameter("month"));
		conditionMap.put("orgStr", request.getParameter("orgStr"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List list = hrDao.getRewardsCollectList(conditionMap);
		int totalCount=hrDao.getRewardsCollectTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);						
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		JSONObject json = Util.dataListToJson(true, "查询成功", list, page_map);
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
		
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getRewardsList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::getRewardsList " + curTime + " " + userid);
		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("org_id", request.getParameter("org_id"));
		conditionMap.put("orgType", request.getParameter("orgType"));
		conditionMap.put("staff_date", request.getParameter("staff_date"));
		conditionMap.put("staff_number", request.getParameter("staff_number"));
		conditionMap.put("rewards_factory", request.getParameter("rewards_factory"));
		conditionMap.put("rewards_workshop", request.getParameter("rewards_workshop"));
		conditionMap.put("month", request.getParameter("month"));
		conditionMap.put("orgStr", request.getParameter("orgStr"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List list = hrDao.getRewardsList(conditionMap);
		int totalCount=hrDao.getRewardsTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);						
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		JSONObject json = Util.dataListToJson(true, "查询成功", list, page_map);
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
		
	}
	
	public String getWaitManHourList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::getWaitManHourList " + curTime + " " + userid);
		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		conditionMap.put("group", request.getParameter("group"));
		conditionMap.put("subgroup", request.getParameter("subgroup"));
		conditionMap.put("staff_number", request.getParameter("staff_number"));
		conditionMap.put("waitmanhourdate", request.getParameter("waitmanhourdate"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List<Map<String, String>> list = hrDao.getWaitManHourList(conditionMap);
		
		List<Map<String, String>> resultList = new ArrayList<Map<String,String>>();
		
		String cur_staff_number = "";
		Map<String, String> manhoursInfo = new HashMap<String, String>();

		double sum_hour = 0;
		double wpay_total=0;
		DecimalFormat sum_hourFormat = new DecimalFormat("#.00");
		
	/*	for(Map<String, String> manhours : list){
			String this_staff_number = manhours.get("staff_number");
			if(cur_staff_number.equals(this_staff_number)){
				manhoursInfo.put("staff_number", manhours.get("staff_number"));
				manhoursInfo.put("staff_name", manhours.get("staff_name"));
				manhoursInfo.put("job", manhours.get("job"));
				manhoursInfo.put("skill_parameter", manhours.get("skill_parameter"));
				manhoursInfo.put("distribution", manhours.get("distribution"));
				manhoursInfo.put("price", manhours.get("price"));
				manhoursInfo.put("D"+manhours.get("work_date").substring(8, 10), manhours.get("work_hour"));
				sum_hour += Double.parseDouble(manhours.get("work_hour"));
				wpay_total+=Double.parseDouble(manhours.get("wpay"));
				manhoursInfo.put("sum_hour", String.valueOf(sum_hourFormat.format(sum_hour)));
				manhoursInfo.put("wpay_total", String.valueOf(sum_hourFormat.format(wpay_total)));
			}else{
				if(!(cur_staff_number.equals(""))){
					resultList.add(manhoursInfo);
				}
				manhoursInfo = new HashMap<String, String>();
				sum_hour = 0;
				wpay_total=0;
				manhoursInfo.put("staff_number", manhours.get("staff_number"));
				manhoursInfo.put("staff_name", manhours.get("staff_name"));
				manhoursInfo.put("job", manhours.get("job"));
				manhoursInfo.put("skill_parameter", manhours.get("skill_parameter"));
				manhoursInfo.put("price", manhours.get("price"));
				manhoursInfo.put("D"+manhours.get("work_date").substring(8, 10), manhours.get("work_hour"));
				sum_hour += Double.parseDouble(manhours.get("work_hour"));
				wpay_total+=Double.parseDouble(manhours.get("wpay"));
				manhoursInfo.put("sum_hour", sum_hour>0?String.valueOf(sum_hourFormat.format(sum_hour)):"0");
				manhoursInfo.put("wpay_total", String.valueOf(sum_hourFormat.format(wpay_total)));
			}

			cur_staff_number = manhours.get("staff_number");
		}*/
	/*	resultList.add(manhoursInfo);*/

		int totalCount=list.size();
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);						
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		JSONObject json = Util.dataListToJson(true, "查询成功", list, page_map);
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
		
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getAttendanceList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::getAttendanc " + curTime + " " + userid);
		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("org_id", request.getParameter("org_id"));
		conditionMap.put("orgType", request.getParameter("orgType"));
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("dept", request.getParameter("dept"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		conditionMap.put("workgroup", request.getParameter("workgroup"));
		conditionMap.put("team", request.getParameter("team"));
		conditionMap.put("staff_number", request.getParameter("staff_number"));
		conditionMap.put("month", request.getParameter("month"));
		conditionMap.put("orgStr", request.getParameter("orgStr"));
		conditionMap.put("userid", userid);
		String model= request.getParameter("model");
		if(model.equals("production")){
			conditionMap.put("role_id","109");
		}
		if(model.equals("hr")){
			conditionMap.put("role_id","113");
		}
		
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List list = hrDao.getAttendanceList(conditionMap);
		int totalCount=hrDao.getAttendanceTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);						
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		JSONObject json = Util.dataListToJson(true, "查询成功", list, page_map);
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
		
	}
	
	public String addRewards() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::addRewards " + curTime + " " + userid);
		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		/**
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("date", request.getParameter("rewards_date"));
		conditionMap.put("staff_numbers", request.getParameter("staff_number"));
		hrDao.delRewards(conditionMap);
		**/
		
		List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
		Map<String, Object> rewardsInfo = new HashMap<String, Object>();
		rewardsInfo.put("staff_number", request.getParameter("staff_number"));
		rewardsInfo.put("rewards_factory", request.getParameter("rewards_factory"));
		rewardsInfo.put("rewards_workshop", request.getParameter("rewards_workshop"));
		rewardsInfo.put("rewards_date", request.getParameter("rewards_date"));
		rewardsInfo.put("reasons", request.getParameter("reasons"));
		rewardsInfo.put("deduct", request.getParameter("deduct"));
		rewardsInfo.put("add", request.getParameter("add"));
		rewardsInfo.put("group_leader", request.getParameter("group_leader"));
		rewardsInfo.put("gaffer", request.getParameter("gaffer"));
		rewardsInfo.put("proposer", request.getParameter("proposer"));
		rewardsInfo.put("editor_id", userid);
		rewardsInfo.put("edit_date", curTime);
		addList.add(rewardsInfo);
		
		hrDao.insertRewards(addList);
		
		JSONObject json = Util.dataListToJson(true, "success", null, null);	
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	public String delRewardsByID() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::delRewardsByID " + curTime + " " + userid);
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("reward_id", request.getParameter("reward_id"));
		hrDao.delRewardsByID(conditionMap);
		JSONObject json = Util.dataListToJson(true, "success", null, null);	
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 导入奖惩信息
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String uploadRewards() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::uploadRewards " + curTime + " " + userid + ";fileFileName = " + fileFileName);
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String result = "导入成功！";
		boolean success = true;
		try {
			out = response.getWriter();

			ExcelModel excelModel =new ExcelModel();
			excelModel.setReadSheets(1);
			excelModel.setStart(1);
			Map<String,Integer> dataType = new HashMap<String,Integer>();
			dataType.put("0", ExcelModel.CELL_TYPE_NUMERIC);
			dataType.put("1", ExcelModel.CELL_TYPE_STRING);
			dataType.put("2", ExcelModel.CELL_TYPE_STRING);
			dataType.put("3", ExcelModel.CELL_TYPE_STRING);
			dataType.put("4", ExcelModel.CELL_TYPE_DATE);
			dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("8", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("9", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("10", ExcelModel.CELL_TYPE_CANNULL);
			excelModel.setDataType(dataType);
	/*		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String curTime = df.format(new Date());
			String fileName ="员工信息批导入_"+curTime;*/
			excelModel.setPath(fileFileName);
			/**
			 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
			 */
    		InputStream is = new FileInputStream(file);
    		
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			 
			/*String date = excelModel.getData().get(0)[2].toString().trim();
			logger.info("---->date: " + date);
			StringBuffer staff_numbers = new StringBuffer();
			for(Object[] data : excelModel.getData()){
				if(null != data[0] && StringUtils.isNotBlank(data[0].toString().trim())){
					String staff_number = data[0].toString().trim();
					staff_numbers.append(staff_number);
					staff_numbers.append(",");
				}
			}
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("date", date);
			conditionMap.put("staff_numbers", staff_numbers.toString().trim());
			int delRewardsResult  = hrDao.delRewards(conditionMap);
			logger.info("---->delRewardsResult: " + delRewardsResult);*/
			
			List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
			int user_id=getUser().getId();
			String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");			
			
			for(Object[] data : excelModel.getData()){
				Map<String, Object> rewardsInfo = new HashMap<String, Object>();
				String staff_number = data[0].toString().trim();
				if(staff_number !=""){
					rewardsInfo.put("staff_number", staff_number);
					rewardsInfo.put("rewards_factory", data[2] == null?null:data[2].toString().trim());
					rewardsInfo.put("rewards_workshop", data[3] == null?null:data[3].toString().trim());
					rewardsInfo.put("rewards_date", data[4] == null?null:data[4].toString().trim());
					rewardsInfo.put("reasons", data[5] == null?null:data[5].toString().trim());
					rewardsInfo.put("deduct", data[6] == null?null:data[6].toString().trim());
					rewardsInfo.put("add", data[7] == null?null:data[7].toString().trim());
					rewardsInfo.put("group_leader", data[8] == null?null:data[8].toString().trim());
					rewardsInfo.put("gaffer", data[9] == null?null:data[9].toString().trim());
					rewardsInfo.put("proposer", data[10] == null?null:data[10].toString().trim());
					rewardsInfo.put("editor_id", user_id);
					rewardsInfo.put("edit_date", createTime);
					addList.add(rewardsInfo);
					
					/**
					Map<String, Object> conditionMap = new HashMap<String, Object>();
					conditionMap.put("date", data[2].toString().trim());
					conditionMap.put("staff_numbers", staff_number);
					hrDao.delRewards(conditionMap);
					**/
				}	

			}
			if(addList.size()>0){
				//批量新增用户信息
				@SuppressWarnings("unused")
				int r = hrDao.insertRewards(addList);
			}
			
		} catch (Exception e) {
			success = false;
			result = "用户信息上传出错："+e.getMessage();
			System.out.println("用户信息上传出错："+e.getMessage());
		} finally{
			JSONObject json = Util.dataListToJson(success, result, null, null);
			out.print(json);
			out.flush();
			out.close();
		}
		return null;
	}
	
	/**
	 * 导入考勤信息
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String uploadAttendance() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrAction::uploadAttendance " + curTime + " " + userid + ";fileFileName = " + fileFileName);
		
		HttpServletRequest request = ServletActionContext.getRequest();
		//request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		boolean success = true;
		int error=0; //定义一个错误类型；
		int lineCount=1; //表格数据行
		int staffIndex=-1;
		int lineTotal=0; //导入数据总行数
		String result = "导入成功！";
		try {
			out = response.getWriter();
			/**
			 * 创建excel对象类
			 */
			ExcelModel excelModel =new ExcelModel();
			excelModel.setReadSheets(1);
			excelModel.setStart(1);
			Map<String,Integer> dataType = new HashMap<String,Integer>();
			dataType.put("0", ExcelModel.CELL_TYPE_NUMERIC);
			dataType.put("1", ExcelModel.CELL_TYPE_STRING);
			dataType.put("2", ExcelModel.CELL_TYPE_DATE);
			dataType.put("3", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("8", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("9", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("10", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("11", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("12", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("13", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("14", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("15", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("16", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("17", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("18", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("19", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("20", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("21", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("22", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("23", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("24", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("25", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("26", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("27", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("28", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("29", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("30", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("31", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("32", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("33", ExcelModel.CELL_TYPE_CANNULL);
			excelModel.setDataType(dataType);
	/*		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String curTime = df.format(new Date());
			String fileName ="员工信息批导入_"+curTime;*/
			excelModel.setPath(fileFileName);
			/**
			 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
			 */
    		InputStream is = new FileInputStream(file);
    		
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			
			/*
			 * 数据校验
			 */
			String month = excelModel.getData().get(0)[2].toString().trim().substring(0,7);
			logger.info("---->month: " + month);
			StringBuffer staff_numbers = new StringBuffer();
			for(Object[] data : excelModel.getData()){
				if(null != data[0] && StringUtils.isNotBlank(data[0].toString().trim())){
					String staff_number = data[0].toString().trim(); //物料描述
					staff_numbers.append(staff_number);
					staff_numbers.append(",");
				}
			}
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("month", month);
			conditionMap.put("staff_numbers", staff_numbers.toString().trim());
			
			String[] staffArray=staff_numbers.toString().split(",");
			for(int i=0;i<staffArray.length-1;i++){
				lineCount=i+2;
				for(int j=i+1;j<=staffArray.length-1;j++){
					if(staffArray[i].equals(staffArray[j])){
						staffIndex=j+2;
						error=3;                 //员工数据重复类型
						throw new Exception();
					}
				}
			}
			
			List<Map<String,Object>> staff_list=new ArrayList<Map<String,Object>>();
			staff_list=hrDao.checkStaff(conditionMap);
			
			for(int i=0;i<=staffArray.length-1;i++){
				boolean flag=true;
				BmsHrStaff hrStaff = new BmsHrStaff();
				String hrStaff_status="在职";
				for(int j=0;j<=staff_list.size()-1;j++){
					hrStaff=(BmsHrStaff)staff_list.get(j);
					if(staffArray[i].equals(hrStaff.getStaff_number().trim())){
						flag=false;
						hrStaff_status=hrStaff.getStatus();
					} 
				}
				//System.out.println(staffArray[i]+":"+hrStaff_status);
				if(flag){
					lineCount=i+2;
					error=1;                 //员工不存在类型
					throw new Exception();
				}else if(hrStaff_status.equals("离职")){
					lineCount=i+2;
					error=2;             //员工已经离职
					throw new Exception();
				}
				
			}
			lineTotal=staff_list.size();
			result = "导入成功，总计导入"+lineTotal+"条数据！";
			
			//ModBy:Yangke 160420 导入考勤时，导入值为空值 时，不更新考勤数据。
			//int delAttendanceResult  = hrDao.delAttendance(conditionMap);  //覆盖重复数据
			//logger.info("---->delAttendanceResult: " + delAttendanceResult);
			
			
			
			List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
			//int user_id=getUser().getId();
			//String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
			for(Object[] data : excelModel.getData()){
				Map<String, Object> attendanceInfo = new HashMap<String, Object>();
				String staff_number = data[0].toString().trim();
				if(staff_number !=""){
					
					//查询原考勤数据
					Map<String, Object> conditionMap2 = new HashMap<String, Object>();
					conditionMap2.put("month", month);
					conditionMap2.put("staff_number", staff_number);
					List<Map<String, String>> list = hrDao.getAttendanceInfo(conditionMap2);
					if(list.size() == 1){
						System.out.println("---->" + staff_number + "D1 = " + list.get(0).get("D1"));
						
						attendanceInfo.put("D1", data[3] == ""?list.get(0).get("D1"):data[3].toString().trim());
						attendanceInfo.put("D2", data[4] == ""?list.get(0).get("D2"):data[4].toString().trim());
						attendanceInfo.put("D3", data[5] == ""?list.get(0).get("D3"):data[5].toString().trim());
						attendanceInfo.put("D4", data[6] == ""?list.get(0).get("D4"):data[6].toString().trim());
						attendanceInfo.put("D5", data[7] == ""?list.get(0).get("D5"):data[7].toString().trim());
						attendanceInfo.put("D6", data[8] == ""?list.get(0).get("D6"):data[8].toString().trim());
						attendanceInfo.put("D7", data[9] == ""?list.get(0).get("D7"):data[9].toString().trim());
						attendanceInfo.put("D8", data[10] == ""?list.get(0).get("D8"):data[10].toString().trim());
						attendanceInfo.put("D9", data[11] == ""?list.get(0).get("D9"):data[11].toString().trim());
						attendanceInfo.put("D10", data[12] == ""?list.get(0).get("D10"):data[12].toString().trim());
						attendanceInfo.put("D11", data[13] == ""?list.get(0).get("D11"):data[13].toString().trim());
						attendanceInfo.put("D12", data[14] == ""?list.get(0).get("D12"):data[14].toString().trim());
						attendanceInfo.put("D13", data[15] == ""?list.get(0).get("D13"):data[15].toString().trim());
						attendanceInfo.put("D14", data[16] == ""?list.get(0).get("D14"):data[16].toString().trim());
						attendanceInfo.put("D15", data[17] == ""?list.get(0).get("D15"):data[17].toString().trim());
						attendanceInfo.put("D16", data[18] == ""?list.get(0).get("D16"):data[18].toString().trim());
						attendanceInfo.put("D17", data[19] == ""?list.get(0).get("D17"):data[19].toString().trim());
						attendanceInfo.put("D18", data[20] == ""?list.get(0).get("D18"):data[20].toString().trim());
						attendanceInfo.put("D19", data[21] == ""?list.get(0).get("D19"):data[21].toString().trim());
						attendanceInfo.put("D20", data[22] == ""?list.get(0).get("D20"):data[22].toString().trim());
						attendanceInfo.put("D21", data[23] == ""?list.get(0).get("D21"):data[23].toString().trim());
						attendanceInfo.put("D22", data[24] == ""?list.get(0).get("D22"):data[24].toString().trim());
						attendanceInfo.put("D23", data[25] == ""?list.get(0).get("D23"):data[25].toString().trim());
						attendanceInfo.put("D24", data[26] == ""?list.get(0).get("D24"):data[26].toString().trim());
						attendanceInfo.put("D25", data[27] == ""?list.get(0).get("D25"):data[27].toString().trim());
						attendanceInfo.put("D26", data[28] == ""?list.get(0).get("D26"):data[28].toString().trim());
						attendanceInfo.put("D27", data[29] == ""?list.get(0).get("D27"):data[29].toString().trim());
						attendanceInfo.put("D28", data[30] == ""?list.get(0).get("D28"):data[30].toString().trim());
						attendanceInfo.put("D29", data[31] == ""?list.get(0).get("D29"):data[31].toString().trim());
						attendanceInfo.put("D30", data[32] == ""?list.get(0).get("D30"):data[32].toString().trim());
						attendanceInfo.put("D31", data[33] == ""?list.get(0).get("D31"):data[33].toString().trim());
						
						if(data[3] == "")data[3] = list.get(0).get("D1");
						if(data[4] == "")data[4] = list.get(0).get("D2");
						if(data[5] == "")data[5] = list.get(0).get("D3");
						if(data[6] == "")data[6] = list.get(0).get("D4");
						if(data[7] == "")data[7] = list.get(0).get("D5");
						if(data[8] == "")data[8] = list.get(0).get("D6");
						if(data[9] == "")data[9] = list.get(0).get("D7");
						if(data[10] == "")data[10] = list.get(0).get("D8");
						if(data[11] == "")data[11] = list.get(0).get("D9");
						if(data[12] == "")data[12] = list.get(0).get("D10");
						
						if(data[13] == "")data[13] = list.get(0).get("D11");
						if(data[14] == "")data[14] = list.get(0).get("D12");
						if(data[15] == "")data[15] = list.get(0).get("D13");
						if(data[16] == "")data[16] = list.get(0).get("D14");
						if(data[17] == "")data[17] = list.get(0).get("D15");
						if(data[18] == "")data[18] = list.get(0).get("D16");
						if(data[19] == "")data[19] = list.get(0).get("D17");
						if(data[20] == "")data[20] = list.get(0).get("D18");
						if(data[21] == "")data[21] = list.get(0).get("D19");
						if(data[22] == "")data[22] = list.get(0).get("D20");
						
						if(data[23] == "")data[23] = list.get(0).get("D21");
						if(data[24] == "")data[24] = list.get(0).get("D22");
						if(data[25] == "")data[25] = list.get(0).get("D23");
						if(data[26] == "")data[26] = list.get(0).get("D24");
						if(data[27] == "")data[27] = list.get(0).get("D25");
						if(data[28] == "")data[28] = list.get(0).get("D26");
						if(data[29] == "")data[29] = list.get(0).get("D27");
						if(data[30] == "")data[30] = list.get(0).get("D28");
						if(data[31] == "")data[31] = list.get(0).get("D29");
						if(data[32] == "")data[32] = list.get(0).get("D30");
						if(data[33] == "")data[33] = list.get(0).get("D31");
						
					}else{
						attendanceInfo.put("D1", data[3] == null?"0":data[3].toString().trim());
						attendanceInfo.put("D2", data[4] == null?"0":data[4].toString().trim());
						attendanceInfo.put("D3", data[5] == null?"0":data[5].toString().trim());
						attendanceInfo.put("D4", data[6] == null?"0":data[6].toString().trim());
						attendanceInfo.put("D5", data[7] == null?"0":data[7].toString().trim());
						attendanceInfo.put("D6", data[8] == null?"0":data[8].toString().trim());
						attendanceInfo.put("D7", data[9] == null?"0":data[9].toString().trim());
						attendanceInfo.put("D8", data[10] == null?"0":data[10].toString().trim());
						attendanceInfo.put("D9", data[11] == null?"0":data[11].toString().trim());
						attendanceInfo.put("D10", data[12] == null?"0":data[12].toString().trim());
						attendanceInfo.put("D11", data[13] == null?"0":data[13].toString().trim());
						attendanceInfo.put("D12", data[14] == null?"0":data[14].toString().trim());
						attendanceInfo.put("D13", data[15] == null?"0":data[15].toString().trim());
						attendanceInfo.put("D14", data[16] == null?"0":data[16].toString().trim());
						attendanceInfo.put("D15", data[17] == null?"0":data[17].toString().trim());
						attendanceInfo.put("D16", data[18] == null?"0":data[18].toString().trim());
						attendanceInfo.put("D17", data[19] == null?"0":data[19].toString().trim());
						attendanceInfo.put("D18", data[20] == null?"0":data[20].toString().trim());
						attendanceInfo.put("D19", data[21] == null?"0":data[21].toString().trim());
						attendanceInfo.put("D20", data[22] == null?"0":data[22].toString().trim());
						attendanceInfo.put("D21", data[23] == null?"0":data[23].toString().trim());
						attendanceInfo.put("D22", data[24] == null?"0":data[24].toString().trim());
						attendanceInfo.put("D23", data[25] == null?"0":data[25].toString().trim());
						attendanceInfo.put("D24", data[26] == null?"0":data[26].toString().trim());
						attendanceInfo.put("D25", data[27] == null?"0":data[27].toString().trim());
						attendanceInfo.put("D26", data[28] == null?"0":data[28].toString().trim());
						attendanceInfo.put("D27", data[29] == null?"0":data[29].toString().trim());
						attendanceInfo.put("D28", data[30] == null?"0":data[30].toString().trim());
						attendanceInfo.put("D29", data[31] == null?"0":data[31].toString().trim());
						attendanceInfo.put("D30", data[32] == null?"0":data[32].toString().trim());
						attendanceInfo.put("D31", data[33] == null?"0":data[33].toString().trim());
					}
					
					attendanceInfo.put("staff_number", staff_number);
					attendanceInfo.put("month", month);
					//attendanceInfo.put("attendance_days", data[3] == null?null:data[3].toString().trim());
					//attendanceInfo.put("attendance_hours", data[4] == null?null:data[4].toString().trim());
					
					
					int attendance_days = 0;
					float attendance_hours = 0;

					System.out.println(staff_number+"---->data[3] = " + data[3].toString());
					for(int i=3;i<=33;i++){
						if(!"0".equals(data[i])&&data[i]!=null&&StringUtils.isNotEmpty(data[i].toString().trim())){
							/*if(!"0".equals(data[i])){
							attendance_days++;
							attendance_hours+=Float.valueOf(data[i].toString().trim());
							}*/
							attendance_days++;
							attendance_hours+=Float.valueOf(data[i].toString().trim());
						}
					}
					attendanceInfo.put("attendance_days", attendance_days);
					attendanceInfo.put("attendance_hours", attendance_hours);
					addList.add(attendanceInfo);
				}	

			}
			int delAttendanceResult  = hrDao.delAttendance(conditionMap);  //覆盖重复数据
			logger.info("---->delAttendanceResult: " + delAttendanceResult);
			
			if(addList.size()>0){
				//批量新增用户信息
				@SuppressWarnings("unused")
				int r = hrDao.insertAttendance(addList);
			}
			
		} catch (Exception e) {
			switch(error){
			  case 0:
				  success = false;
				  result = "用户信息上传出错："+e.getMessage();
				  System.out.println("用户信息上传出错："+e.getMessage());
				  break;
			  case 1:
				  success = false;
				  result="第"+lineCount+"行数据有误，该行员工不存在，数据上传失败！";
				  break;
			  case 2:
				  success = false;
				  result="第"+lineCount+"行数据有误，该行员工已经离职，数据上传失败！";
				  break;
			  case 3:
				  success = false;
				  result="第"+staffIndex+"行数据与第"+lineCount+"行数据重复，数据上传失败！";
				  break;
			}
			
		}
		finally{
			JSONObject json = Util.dataListToJson(success, result, null, null);
			out.print(json);
			out.flush();
			out.close();
		}
		return null;
	}
	
	/**
	 * added by xjw 16/08/24 
	 * 班组承包单价页面
	 * @return
	 */
	public String workgroupPrice(){
		
		return "workgroupPrice";
	}
	/**
	 * added by xjw 16/08/24
	 * 导入班组承包单价
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String uploadWorkgroupPrice() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String result = "";
		boolean success = true;
		JSONObject jo=JSONObject.fromObject(conditions);
		String orderId=jo.getString("orderId");
		String effective_date=jo.getString("effective_date");
		try {
			out = response.getWriter();
			/**
			 * 创建excel对象类
			 */
			ExcelModel excelModel =new ExcelModel();
			excelModel.setReadSheets(1);
			
			excelModel.setStart(1);
			Map<String,Integer> dataType = new HashMap<String,Integer>();
			dataType.put("0", ExcelModel.CELL_TYPE_STRING);
			dataType.put("1", ExcelModel.CELL_TYPE_STRING);
			dataType.put("2", ExcelModel.CELL_TYPE_STRING);
			dataType.put("3", ExcelModel.CELL_TYPE_STRING);
			dataType.put("4", ExcelModel.CELL_TYPE_NUMERIC);

			excelModel.setDataType(dataType);
			excelModel.setPath(fileFileName);
			
			/**
			 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
			 */
    		InputStream is = new FileInputStream(file);
    		
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			List<String> headers=excelModel.getHeader();
			if(!headers.get(0).equals("工厂")||!headers.get(1).equals("车间")||
					!headers.get(2).equals("班组")||!headers.get(3).equals("小班组")||!headers.get(4).equals("承包单价")){
				Exception e=new Exception("请使用下载的模板导入！");
				throw e;			
			}
			/**
			 * 解析excelModel中的data
			 */
			List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
			List<Map<String, Object>> upDateList = new ArrayList<Map<String,Object>>();
			int user_id=getUser().getId();
			String createTime=Util.format(new Date(), "yyyy-MM-dd");
			int i = 1;
			int dataFlag = 0;
			for(Object[] data : excelModel.getData()){
				++i;
				Map<String, Object> info = new HashMap<String, Object>();
				String factory = data[0].toString().trim(); 
				info.put("factory", factory);
				info.put("workshop", data[1] == null?null:data[1].toString().trim());
				info.put("workgroup", data[2] == null?null:data[2].toString().trim());
				info.put("small_workgroup", data[3] == null?null:data[3].toString().trim());
				info.put("standard_price", data[4] == null?null:data[4].toString().trim());
				info.put("editor_id", user_id);
				info.put("edit_date", createTime);
				info.put("effective_date", effective_date);
				info.put("order_id", orderId);
				
				//校验用户填写的工厂、车间、班组、小班组、车型 信息是否正确
				Map orgMap =  orgDao.getOrgInfo(info);
				if(null == orgMap){
					++dataFlag;
					//用户填写的工厂、车间、班组、小班组信息有误
					success = false;
					result = result+i;
					break;
				}else{
					info.put("org_id", orgMap.get("id"));
					//根据工厂、车间、班组、小班组、订单、日期查询标准工时和单价
					Map<String,Object> map = hrDao.queryWorkgroupPrice(info);
					
					if(null != map && Integer.parseInt(map.get("id").toString()) >0){
						//修改
						info.put("id", map.get("id"));
						upDateList.add(info);
					}else{
						addList.add(info);
					}					
				}
			}
			if(dataFlag>0){
				result = result+"行数据输入的工厂、车间、班组或小班组信息有误，请确认组织结构是否存在！\n";
			}
			if(success && addList.size()>0){
				//批量新增标准工时/单价
				hrDao.addWorkgroupPrice(addList);
				result =  "导入成功！";
			}
			if(success && upDateList.size()>0){
				//批量修改标准工时/单价
				hrDao.updateWorkgroupPrice(upDateList);
				result =  "导入成功！";
			}
		} catch (Exception e) {
			success = false;
			result = "班组承包单价上传出错："+e.getMessage();
			System.out.println("班组承包单价上传出错："+e.getMessage());
		} finally{
			JSONObject json = Util.dataListToJson(success, result, null, null);
			out.print(json);
			out.flush();
			out.close();
		}
		return null;
	}
	
	/**
	 * added by xjw 16/08/24
	 * 查询班组承包单价列表信息
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String getWorkgroupPriceList() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		boolean success=true;
		String message="";
		List list=null;
		Map<String, String> page_map=new HashMap<String,String>();
		Map<String,Object> cMap=new HashMap<String,Object>();
		Map<String,Object> cMap1=new HashMap<String,Object>();
		
		JSONObject jo=JSONObject.fromObject(conditions);
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			cMap.put(key,jo.get(key));
			cMap1.put(key,jo.get(key));
		}
		if (pager != null){
			cMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			cMap.put("pageSize", pager.getPageSize());
		}
		
		int totalCount=0;
		try{
			out=response.getWriter();
			list=hrDao.getWorkgroupPriceList(cMap);
			totalCount=hrDao.getWorkgroupPriceCount(cMap1);
			if (pager != null){
				pager.setTotalCount(totalCount);						
				page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
				page_map.put("curPage", String.valueOf(pager.getCurPage()));
				page_map.put("pageSize", String.valueOf(pager.getPageSize()));
			}
			
		}catch(Exception e){
			success = false;
			message += "系统异常："+e.getMessage();
		}finally{
			JSONObject json = Util.dataListToJson(success, message, list, page_map);
			out.print(json);
			out.flush();
			out.close();
		}
		
		return null;
	}

}
