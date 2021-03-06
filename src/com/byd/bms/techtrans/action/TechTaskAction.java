/**
 * 技改任务action（第二版）
 */
package com.byd.bms.techtrans.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.xwork.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.techtrans.dao.IEcnTaskDao;
import com.byd.bms.techtrans.dao.ITechTaskDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;
import com.byd.bms.util.poi.ExcelModel;
import com.byd.bms.util.poi.ExcelTool;

/**
 * @author xjw2084034
 *
 */
public class TechTaskAction extends BaseAction<Object> {

	private static final long serialVersionUID = 4878835279243968002L;

	private ITechTaskDao techTaskDao;

	/* 文件上传组件 */
	private File file; // 获取上传文件
	private File new_tech_order_file;
	private File edit_tech_order_file;
	private File new_custom_change_file;
	private File edit_custom_change_file;

	public File getEdit_tech_order_file() {
		return edit_tech_order_file;
	}

	public void setEdit_tech_order_file(File edit_tech_order_file) {
		this.edit_tech_order_file = edit_tech_order_file;
	}

	public File getEdit_custom_change_file() {
		return edit_custom_change_file;
	}

	public void setEdit_custom_change_file(File edit_custom_change_file) {
		this.edit_custom_change_file = edit_custom_change_file;
	}

	public File getNew_tech_order_file() {
		return new_tech_order_file;
	}

	public void setNew_tech_order_file(File new_tech_order_file) {
		this.new_tech_order_file = new_tech_order_file;
	}

	public File getNew_custom_change_file() {
		return new_custom_change_file;
	}

	public void setNew_custom_change_file(File new_custom_change_file) {
		this.new_custom_change_file = new_custom_change_file;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public ITechTaskDao getTechTaskDao() {
		return techTaskDao;
	}

	public void setTechTaskDao(ITechTaskDao techTaskDao) {
		this.techTaskDao = techTaskDao;
	}

	private Pager pager;

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	private Map<String, Object> result;// 返回前端的json数据
	private String conditions;// 前台传输的查询条件map

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}

	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	// ############# by xjw start ##############//
	private String whflag;
	
	public String getWhflag() {
		return whflag;
	}

	public void setWhflag(String whflag) {
		this.whflag = whflag;
	}

	/**
	 * 技改任务分配界面
	 * 
	 * @return
	 */
	public String taskAssignPage() {
		return "assignPage";
	}

	/**
	 * 技改任务列表查询
	 * @return
	 */
	public String getTaskList(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		int totalCount=techTaskDao.queryTechTaskListCount(conditionMap);
		
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List<Map<String,Object>> data_list=techTaskDao.queryTechTaskList(conditionMap);		
		if (pager != null){
			pager.setTotalCount(totalCount);			
		}
		result.put("pager", pager);
		result.put("dataList", data_list);
		result.put("total", totalCount);
		result.put("rows", data_list);
		return SUCCESS;
	}
	
	/**
	 * 查询技改实施范围信息列表
	 * @return
	 */
	public String getTechList(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		List<Map<String,Object>> data_list=techTaskDao.queryTechList(conditionMap);
		result.put("dataList", data_list);
		return SUCCESS;
	}
	/**
	 * 输入订单编号，查询工厂订单列表
	 * @return
	 */
	public String getOrderList(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		List<Map<String,Object>> data_list=techTaskDao.queryFactoryOrderList(conditionMap);
		result.put("dataList", data_list);
		return SUCCESS;
	}
	/**
	 * 勾选工厂后查询该工厂各车间技改车辆数
	 * @param conditions:{'order_no':xx,'factory_list':xx,'tech_date':xx,
	 * 'switch_mode':xx,'switch_node':xx,'node_list':xx}
	 * @return
	 */
	public String getTechBusNum(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		List<String> node_list=new ArrayList<String>();
		String nodes=(String) conditionMap.get("node_list");
		node_list=Arrays.asList(nodes.split(","));
		conditionMap.put("node_list", node_list);
		List<Map<String,Object>> data_list=null;
		if(conditionMap.containsKey("switch_mode")){
			if("全部切换".equals(conditionMap.get("switch_mode"))){
				data_list=techTaskDao.queryTechBusNum_All(conditionMap);
			}
			if("节点前切换".equals(conditionMap.get("switch_mode"))){
				data_list=techTaskDao.queryTechBusNum_Pre(conditionMap);
			}
			if("节点后切换".equals(conditionMap.get("switch_mode"))){
				data_list=techTaskDao.queryTechBusNum_After(conditionMap);
			}
		}
		result.put("dataList", data_list);		
		return SUCCESS;
	}
	/**
	 * 技改任务确认分配，先根据技改任务id、订单、工厂删除原有记录（表BMS_TECH_TASK_DETAIL、BMS_TECH_TASK_FOLLOW）
	 * @return
	 */
	public String assignTechTask(){
		result=new HashMap<String,Object>();
		//JSONObject jo=JSONObject.fromObject(conditions);
		JSONArray jsa=JSONArray.fromObject(conditions);
		Map<String,Object> cdmap=new HashMap<String,Object>();
		try{
			JSONObject jo=(JSONObject)jsa.get(0);
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			for(Iterator it=jo.keys();it.hasNext();){
				String key=(String) it.next();
				conditionMap.put(key, jo.get(key));
			}
			//删除技改跟进表中（BMS_TECH_TASK_FOLLOW）未跟进工厂的技改车辆
			int i=techTaskDao.deleteTechFollowBus(conditionMap);
			//删除技改明细中（BMS_TECH_TASK_DETAIL）技改明细
			techTaskDao.deleteTechTaskDetail(conditionMap);
			for(Object o:jsa){
				jo=(JSONObject)o;
				conditionMap=new HashMap<String,Object>();
				for(Iterator it=jo.keys();it.hasNext();){
					String key=(String) it.next();
					conditionMap.put(key, jo.get(key));
				}
				String switch_mode=(String) conditionMap.get("switch_mode");
				String switch_node=(String) conditionMap.get("switch_node");
				int tech_task_id=(int) conditionMap.get("tech_task_id");
				cdmap.put("switch_mode", switch_mode);
				cdmap.put("switch_node", switch_node);
				cdmap.put("tech_task_id", tech_task_id);
				
				List<String> node_list=new ArrayList<String>();
				String nodes=(String) conditionMap.get("node_list");
				node_list=Arrays.asList(nodes.split(","));
				conditionMap.put("node_list", node_list);
				List<Map<String,Object>> followList=new ArrayList<Map<String,Object>>();
				
				
				//查询需要技改的车辆信息
				if("全部切换".equals(switch_mode)){
					followList=techTaskDao.queryTechBusList_All(conditionMap);
				}
				if("节点前切换".equals(switch_mode)){
					followList=techTaskDao.queryTechBusList_Pre(conditionMap);
				}
				if("节点后切换".equals(switch_mode)){
					followList=techTaskDao.queryTechBusList_After(conditionMap);
				}
				//往技改跟进表中（BMS_TECH_TASK_FOLLOW）插入查询到的技改车辆信息
				if(followList.size()>0){
					i=techTaskDao.insertTechFollowBus(followList);
				}
				//插入技改明细
				techTaskDao.insertTechTaskDetail(conditionMap);										
			}	
			int editor_id=getUser().getId();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String curTime = df.format(new Date());
			cdmap.put("editor_id", editor_id);
			cdmap.put("edit_date", curTime);
			//修改技改任务相关内容
			techTaskDao.updateTechTaskInfo(cdmap);
			
			result.put("message", "分配成功！");
			result.put("success", true);
		}catch(Exception e){
			result.put("message", "分配失败！");
			result.put("success", false);
		}
	
		return SUCCESS;
	}
	
	/**
	 *  技改分配前段页面
	 * @return
	 */
	public String taskAssignPrePage(){
		return "assignPrePage";
	}
	/**
	 * 技改工时维护界面
	 * @return
	 */
	public String worktimeMaintain(){
		return "worktimeMaitain";
	}
	/**
	 * 根据工厂id,任务id 查询车间的工时配置信息
	 */
	@SuppressWarnings("rawtypes")
	public String workshoptimeinfo() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		if (request.getParameter("factoryId") != null)
			conditionMap.put( "factoryId", new String(request.getParameter("factoryId")));
		if (request.getParameter("taskid") != null)
			conditionMap.put("taskid", new String(request.getParameter("taskid")));

		List datalist = new ArrayList();
		datalist = techTaskDao.workshoptimeinfo(conditionMap);
		Map<String, String> page_map = new HashMap<String, String>();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist, page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	/**
	 * 查询技改跟进车辆信息
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getTaskBusNumber() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> map = new HashMap<String, Object>();

		// 获取参数
		String order_no = request.getParameter("order_no");
		map.put("order_no", order_no);
		int tech_task_id = Integer.parseInt(request.getParameter("tech_task_id"));
		map.put("tech_task_id", tech_task_id);
		String factory=request.getParameter("factory");
		map.put("factory", factory);
		String workshop=request.getParameter("workshop");
		map.put("workshop", workshop);
		String bus_num_start = request.getParameter("bus_num_start");
		if (bus_num_start != null && bus_num_start.trim() != "") {
			bus_num_start = StringUtils.leftPad(bus_num_start, 5, "0");
			map.put("bus_num_start", bus_num_start);
		}
		String bus_num_end = request.getParameter("bus_num_end");
		if (bus_num_end != null && bus_num_end.trim() != "") {
			bus_num_end = StringUtils.leftPad(bus_num_end, 5, "0");
			map.put("bus_num_end", bus_num_end);
		}
		if (request.getParameter("task_detail_status") != null
				&& request.getParameter("task_detail_status").trim() != "") {
			map.put("task_detail_status",
					request.getParameter("task_detail_status"));
		}

		List datalist = new ArrayList();
		datalist = techTaskDao.queryTaskBusNumber(map);

		JSONObject json = Util.dataListToJson(true, "查询成功", datalist, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	/**
	 * 员工工时查询
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getStaffWorkHours() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		/*
		 * Map<String,Object> map = new HashMap<String,Object>();
		 * map.put("ecnTaskId", request.getParameter("ecnTaskId"));
		 * map.put("staffNum", request.getParameter("staffNum"));
		 * map.put("workDate", request.getParameter("workDate"));
		 */

		JSONObject json = Util.dataListToJson(true, "查询成功",
				techTaskDao.queryStaffWorkHours(conditionMap));
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 工时维护--保存工时信息
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String saveWorkHourInfo() throws UnsupportedEncodingException {
		BmsBaseUser user = getUser();
		String createTime = Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONArray jsonArray = JSONArray.fromObject(conditions);
		List<Map<String, Object>> swh_list = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject object = (JSONObject) jsonArray.get(i);
			object.put("editorId", user.getId());
			object.put("editDate", createTime);
			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
		}
		int i = techTaskDao.saveWorkHourInfo(swh_list);
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = null;
		if (i > 0) {
			json = Util.dataListToJson(true, "保存成功", null);
		} else {
			json = Util.dataListToJson(false, "保存失败", null);
		}

		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	/**
	 * 工时修改
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String updateWorkHourInfo() throws UnsupportedEncodingException {
		BmsBaseUser user = getUser();
		String createTime = Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONArray jsonArray = JSONArray.fromObject(conditions);
		List<Map<String, Object>> swh_list = new ArrayList<Map<String, Object>>();
		String tech_task_id="0";
		String tech_single_price="0";
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject object = (JSONObject) jsonArray.get(i);
			
			if ("verify".equals(whflag)) {
				object.put("approverId", user.getId());
				object.put("approveDate", createTime);
				object.put("status", "1");
				object.put("actionType", "verify");
				tech_task_id=object.getString("tech_task_id");
				tech_single_price=object.getString("techSinglePrice");
			} else if ("reject".equals(whflag)) {
				object.put("approverId", user.getId());
				object.put("approveDate", createTime);
				object.put("status", "2");
				object.put("actionType", "reject");
			} else {
				object.put("editorId", user.getId());
				object.put("editDate", createTime);
			}
			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
		}

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = null;
		try{
			int i = techTaskDao.batchUpdateWorkHour(swh_list);
			if("verify".equals(whflag)){
				Map<String,Object> cdmap=new HashMap<String,Object>();
				cdmap.put("tech_task_id", tech_task_id);
				cdmap.put("tech_single_price", tech_single_price);
				techTaskDao.updateTechTaskInfo(cdmap);
			}
			json = Util.dataListToJson(true, "保存成功", null);
		}catch(Exception e){
			json = Util.dataListToJson(false, "保存失败", null);
		}

		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	/**
	 * 技改工时审核页面
	 * @return
	 */
	public String worktimeVerify(){
		return "worktimeVerify";
	} 
	/**
	 * 计算技改工资
	 * @return
	 */
	public String caculateSalary(){
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		techTaskDao.caculateEcnSalary(conditionMap);
		return null;
	}
	/**
	 * 技改查询页面
	 * @return
	 */
	public String taskSearch(){
		return "taskSearch";
	}
	
	public String searchTaskList(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		String workshops=(String) conditionMap.get("workshop_list");
		List<String> workshopList=Arrays.asList(workshops.split(","));
		conditionMap.put("workshop_list", workshopList);
		
		//int totalCount=techTaskDao.queryTechTaskListCount(conditionMap);
		
		/*if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}*/
		List<Map<String,Object>> data_list=techTaskDao.queryTechTaskList(conditionMap);	
		List<Map<String,Object>> rows=new ArrayList<Map<String,Object>>();
		
		for(Map<String,Object> data:data_list){			
			String tech_list=(String) data.get("tech_list");
			String time_list=(String) data.get("time_list");
			String follow_list=(String) data.get("follow_list");
			String ready_hour_list=(String) data.get("ready_hour_list");
			Pattern p=Pattern.compile(":");
			Pattern p1=Pattern.compile(",");
			JSONObject time_jso=new JSONObject();
			JSONObject follow_jso=new JSONObject();
			JSONObject readyHour_jso=new JSONObject();
			
			if(StringUtils.isNotEmpty(time_list)){
				time_list="{\""+time_list+"\"}";
				Matcher m=p.matcher(time_list);
				time_list=m.replaceAll("\":\"");
				Matcher m1=p1.matcher(time_list);
				time_list=m1.replaceAll("\",\"");
				time_jso=JSONObject.fromObject(time_list);
			}
			
			
			if(StringUtils.isNotEmpty(follow_list)){
				follow_list="{\""+follow_list+"\"}";
				Matcher m=p.matcher(follow_list);
				follow_list=m.replaceAll("\":\"");
				Matcher m1=p1.matcher(follow_list);
				follow_list=m1.replaceAll("\",\"");
				follow_jso=JSONObject.fromObject(follow_list);
			}
			
			if(StringUtils.isNotEmpty(ready_hour_list)){
				ready_hour_list="{\""+ready_hour_list+"\"}";
				Matcher m=p.matcher(ready_hour_list);
				ready_hour_list=m.replaceAll("\":\"");
				Matcher m1=p1.matcher(ready_hour_list);
				ready_hour_list=m1.replaceAll("\",\"");
				readyHour_jso=JSONObject.fromObject(ready_hour_list);
			}
			
			String[] techarr=tech_list.split(",");
			for(String tech:techarr){
				Map<String,Object> data_cp=new HashMap<String,Object>();
				data_cp.putAll(data);
				String workshop=tech.split(":")[0];
				String tech_num=tech.split(":")[1];
				if(StringUtils.contains((String) workshops, workshop)){
					data_cp.put("workshop", workshop);
					data_cp.put("tech_num", tech_num);
					data_cp.put("tech_time", time_jso.get(workshop));
					data_cp.put("follow_num", follow_jso.get(workshop));
					data_cp.put("ready_hour", readyHour_jso.get(workshop));
					rows.add(data_cp);
				}
				
			}
			
		}			
		
		/*if (pager != null){
			pager.setTotalCount(totalCount);			
		}*/
		result.put("pager", pager);
		result.put("dataList", data_list);
		//result.put("total", totalCount);
		result.put("rows", rows);
		return SUCCESS;
	}
	/**
	 * 分类型变更汇总报表页面
	 * @return
	 */
	public String changeTypeReport(){
			return "changeTypeReport";
	}
	/**
	 * 分类型变更汇总报表数据获取
	 * @return
	 */
	public String getChangeTypeReportData(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		List<Map<String,Object>> rows=new ArrayList<Map<String,Object>>();
		rows=techTaskDao.queryChangeTypeReport(conditionMap);
		
		result.put("rows", rows);
		return SUCCESS;
	}
	/**
	 * 技改汇总报表页面
	 * @return
	 */
	public String techCollectReport(){
			return "techCollectReport";
	}
	// ############# by xjw end #############//	

	// ############# by yk start #############//
	public String techTaskMaterialCheck() {
		return "techTaskMaterialCheck";
	}

	public String techTaskMaterialCheckPage() {
		return "techTaskMaterialCheckPage";
	}
	
	public String techTaskReport(){
		return "techTaskReport";
	}
	
	/**
	 * 分类型变更汇总
	 * @return
	 */
	public String techTaskCollect(){
		return "techTaskCollect";
	}

	public String getTaskInfo() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		String taskid = request.getParameter("taskid");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("taskid", taskid);
		List<Map<String, String>> dataBaseInfo = techTaskDao.queryTaskBaseInfo(conditionMap);
		List<Map<String, String>> dataMaterielInfo = techTaskDao.queryTaskMaterielInfo(conditionMap);
		List<Map<String, String>> dataOrderInfo = techTaskDao.queryTaskOrderInfo(conditionMap);

		Map<String, Object> m = new HashMap<String, Object>();
		m.put("ecnTaskId", taskid);

		result = new HashMap<String, Object>();
		result.put("dataBaseInfo", dataBaseInfo);
		result.put("dataMaterielInfo", dataMaterielInfo);
		result.put("dataOrderInfo", dataOrderInfo);
		result.put("whList", techTaskDao.queryStaffWorkHours(m));
		result.put("assignList", techTaskDao.queryAssignList(taskid));
		return SUCCESS;
	}

	public String getTaskOrderFinishInfo() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		String taskid = request.getParameter("taskid");
		String order_no = request.getParameter("order_no");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("taskid", taskid);
		conditionMap.put("order_no", order_no);
		List<Map<String, String>> dataOrderFinishInfo = techTaskDao.queryTaskOrderFinishInfo(conditionMap);
		result = new HashMap<String, Object>();
		result.put("dataOrderFinishInfo", dataOrderFinishInfo);
		return SUCCESS;
	}

	public String checkTaskMaterial() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		String taskid = request.getParameter("taskid");
		String check_id = request.getParameter("check_id");
		String curTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		int userid = getUser().getId();
		String[] check = check_id.split(",");

		// 更新物料确认信息
		for (int i = 0; i < check.length; i++) {
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("id", check[i]);
			conditionMap.put("userid", userid);
			conditionMap.put("curTime", curTime);
			techTaskDao.checkTaskMaterial(conditionMap);
		}
		// 判断当前技改的物料信息是否全部确认
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("taskid", taskid);
		int checkCount = techTaskDao.queryTaskMaterialCheckCount(conditionMap);
		if (checkCount == 0) {
			Map<String, Object> conditionMap2 = new HashMap<String, Object>();
			conditionMap2.put("id", taskid);
			conditionMap2.put("userid", userid);
			conditionMap2.put("curTime", curTime);
			techTaskDao.checkTask(conditionMap2);
		}
		result = new HashMap<String, Object>();
		result.put("result", true);
		return SUCCESS;
	}
	
	public String checkTaskReport() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		String task_content = request.getParameter("task_content");
		String tech_order_no = request.getParameter("tech_order_no");
		String order_no = request.getParameter("order_no");
		String status = request.getParameter("status");
		String factory = request.getParameter("factory");
		String workshop = request.getParameter("workshop");
		String tech_date_start = request.getParameter("tech_date_start");
		String tech_date_end = request.getParameter("tech_date_end");
		String tab_index = request.getParameter("tab_index");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("task_content", task_content);
		conditionMap.put("tech_order_no", tech_order_no);
		conditionMap.put("order_no", order_no);
		conditionMap.put("status", status);
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		conditionMap.put("tech_date_start", tech_date_start);
		conditionMap.put("tech_date_end", tech_date_end);
		
		if(request.getParameter("offset")!=null)conditionMap.put("offset", Integer.valueOf(request.getParameter("offset")));
		if(request.getParameter("limit")!=null)conditionMap.put("pageSize", Integer.valueOf(request.getParameter("limit")));
		conditionMap.put("sort", request.getParameter("sort"));
		conditionMap.put("order", request.getParameter("order"));

		result = new HashMap<String, Object>();
		List<Map<String, String>> dataList = null;
		int totalCount = 0;
		if(tab_index.equals("1")){
			dataList = techTaskDao.queryTechTaskReport(conditionMap);
			totalCount = techTaskDao.queryTechTaskReportCount(conditionMap);
		}else if(tab_index.equals("2")){
			dataList = techTaskDao.queryTechTaskReport2(conditionMap);
			totalCount = techTaskDao.queryTechTaskReportCount2(conditionMap);
		}
		result.put("rows", dataList);
		result.put("total", totalCount);
		return SUCCESS;
	}

	// ############# by yk end #############//

	// ############# by wx start #############//

	/**
	 * 技改任务查询明细界面
	 * 
	 * @return
	 */
	public String techTaskInfoPage() {
		return "techTaskInfoPage";
	}

	/**
	 * 获得技改任务维护列表
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getTaskMaintainList() throws UnsupportedEncodingException {
		/*
		 * SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 * String curTime = df.format(new Date()); int userid=getUser().getId();
		 */
		// logger.info("---->HrAction::getWorkTimePriceList " + curTime + " " +
		// userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("task_content", request.getParameter("task_content"));
		conditionMap.put("tech_order_no", request.getParameter("tech_order_no"));
		conditionMap.put("tech_date_start", request.getParameter("tech_date_start"));
		conditionMap.put("tech_date_end", request.getParameter("tech_date_end"));
		conditionMap.put("status", request.getParameter("status"));
		if (pager != null) {
			conditionMap.put("offset", (pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}

		List list = techTaskDao.queryTechTaskMaintainList(conditionMap);
		int totalCount = techTaskDao.queryTechTaskMaintainListTotalCount(conditionMap);

		Map<String, String> page_map = new HashMap<String, String>();
		if (pager != null) {
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

	/**
	 * 获得单条技改任务维护
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getSingleTaskMaintain() throws UnsupportedEncodingException {
		/*
		 * SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 * String curTime = df.format(new Date()); int userid=getUser().getId();
		 */
		// logger.info("---->HrAction::getWorkTimePriceList " + curTime + " " +
		// userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("id", request.getParameter("id"));

		List list = techTaskDao.querySingleTechTaskMaintain(conditionMap);

		JSONObject json = Util.dataListToJson(true, "查询成功", list, null);

		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 技改任务维护-修改
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String editTechTaskMaintain() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid = getUser().getId();
		// logger.info("---->HrAction::addRewards " + curTime + " " + userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		List<Map<String, Object>> editList = new ArrayList<Map<String, Object>>();
		Map<String, Object> infomap = new HashMap<String, Object>();
		infomap.put("task_content", request.getParameter("edit_task_content"));
		infomap.put("tech_order_no", request.getParameter("edit_tech_order_no"));
		infomap.put("tech_point_num", request.getParameter("edit_tech_point_num"));
		infomap.put("tech_order_type", request.getParameter("edit_tech_order_type"));
		infomap.put("tech_type", request.getParameter("edit_tech_type"));
		infomap.put("tech_date", request.getParameter("edit_tech_date"));
		infomap.put("duty_unit", request.getParameter("edit_duty_unit"));
		infomap.put("major_change", request.getParameter("edit_major_change") == null ? "N" : "Y");
		infomap.put("repeat_change", request.getParameter("edit_repeat_change") == null ? "N" : "Y");
		infomap.put("custom_change", request.getParameter("edit_custom_change") == null ? "N" : "Y");
		infomap.put("custom_change_no", request.getParameter("edit_custom_change_no"));

		infomap.put("tech_order_file", saveFileMethod(edit_tech_order_file));
		infomap.put("custom_change_file", saveFileMethod(edit_custom_change_file));

		infomap.put("editor_id", userid);
		infomap.put("edit_date", curTime);
		infomap.put("id", request.getParameter("tech_task_id"));
		editList.add(infomap);

		String selectedrows = request.getParameter("selectedrows");

		techTaskDao.updateTechTaskMaintain(editList);

		// 删除原来的变更物料清单
		Map<String, Object> deletemap = new HashMap<String, Object>();
		deletemap.put("tech_task_id", request.getParameter("tech_task_id"));
		techTaskDao.deleteChangedMaterialList(deletemap);

		List<Map<String, Object>> changeMaterialList = new ArrayList<Map<String, Object>>();
		JSONArray jsonArray = JSONArray.fromObject(selectedrows);
		JSONObject obj = null;
		for (int i = 0; i < jsonArray.size(); i++) {
			Map<String, Object> changeMaterialMap = new HashMap<String, Object>();
			obj = jsonArray.getJSONObject(i);
			// asns.add(obj.getString("asnNo"));
			changeMaterialMap.put("tech_task_id", request.getParameter("tech_task_id"));
			changeMaterialMap.put("sap_no", obj.getString("sap_no"));
			changeMaterialMap.put("material_desc", obj.getString("material_desc"));
			changeMaterialMap.put("material_type", obj.getString("material_type"));
			changeMaterialMap.put("material_spec", obj.getString("material_spec"));
			changeMaterialMap.put("unit", obj.getString("unit"));
			changeMaterialMap.put("supplier_code", obj.getString("supplier_code"));
			changeMaterialMap.put("single_loss", obj.getString("single_loss"));
			changeMaterialMap.put("level_usage", obj.getString("level_usage"));
			changeMaterialMap.put("single_weight", obj.getString("single_weight"));
			changeMaterialMap.put("single_usage", obj.getString("single_usage"));
			changeMaterialMap.put("workshop", obj.getString("workshop"));
			changeMaterialMap.put("process", obj.getString("process"));
			changeMaterialMap.put("assemb_site", obj.getString("assemb_site"));
			changeMaterialMap.put("remark", obj.getString("remark"));
			changeMaterialList.add(changeMaterialMap);
		}
		if (changeMaterialList.size() > 0) {
			techTaskDao.addChangedMaterialList(changeMaterialList);
		}

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
	 * 技改任务维护-新增
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String addTechTaskMaintain() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid = getUser().getId();
		// logger.info("---->HrAction::addRewards " + curTime + " " + userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		// List<Map<String, Object>> addList = new ArrayList<Map<String,
		// Object>>();
		Map<String, Object> infomap = new HashMap<String, Object>();
		infomap.put("task_content", request.getParameter("new_task_content"));
		infomap.put("tech_order_no", request.getParameter("new_tech_order_no"));
		infomap.put("tech_point_num", request.getParameter("new_tech_point_num"));
		infomap.put("tech_order_type", request.getParameter("new_tech_order_type"));
		infomap.put("tech_type", request.getParameter("new_tech_type"));
		infomap.put("tech_date", request.getParameter("new_tech_date"));
		infomap.put("duty_unit", request.getParameter("new_duty_unit"));
		infomap.put("major_change", request.getParameter("new_major_change") == null ? "N" : "Y");
		infomap.put("repeat_change", request.getParameter("new_repeat_change") == null ? "N" : "Y");
		infomap.put("custom_change", request.getParameter("new_custom_change") == null ? "N" : "Y");
		infomap.put("custom_change_no", request.getParameter("new_custom_change_no"));

		infomap.put("tech_order_file", saveFileMethod(new_tech_order_file));
		infomap.put("custom_change_file", saveFileMethod(new_custom_change_file));

		infomap.put("editor_id", userid);
		infomap.put("edit_date", curTime);
		infomap.put("id", -1);
		// addList.add(infomap);

		String selectedrows = request.getParameter("selectedrows");

		techTaskDao.addTechTaskMaintain(infomap);

		int tech_task_id = Integer.parseInt(infomap.get("id").toString());

		List<Map<String, Object>> changeMaterialList = new ArrayList<Map<String, Object>>();
		JSONArray jsonArray = JSONArray.fromObject(selectedrows);
		JSONObject obj = null;
		for (int i = 0; i < jsonArray.size(); i++) {
			Map<String, Object> changeMaterialMap = new HashMap<String, Object>();
			obj = jsonArray.getJSONObject(i);
			// asns.add(obj.getString("asnNo"));
			changeMaterialMap.put("tech_task_id", tech_task_id);
			changeMaterialMap.put("sap_no", obj.getString("sap_no"));
			changeMaterialMap.put("material_desc", obj.getString("material_desc"));
			changeMaterialMap.put("material_type", obj.getString("material_type"));
			changeMaterialMap.put("material_spec", obj.getString("material_spec"));
			changeMaterialMap.put("unit", obj.getString("unit"));
			changeMaterialMap.put("supplier_code", obj.getString("supplier_code"));
			changeMaterialMap.put("single_loss", obj.getString("single_loss"));
			changeMaterialMap.put("level_usage", obj.getString("level_usage"));
			changeMaterialMap.put("single_weight", obj.getString("single_weight"));
			changeMaterialMap.put("single_usage", obj.getString("single_usage"));
			changeMaterialMap.put("workshop", obj.getString("workshop"));
			changeMaterialMap.put("process", obj.getString("process"));
			changeMaterialMap.put("assemb_site", obj.getString("assemb_site"));
			changeMaterialMap.put("remark", obj.getString("remark"));
			changeMaterialList.add(changeMaterialMap);
		}
		if (changeMaterialList.size() > 0) {
			techTaskDao.addChangedMaterialList(changeMaterialList);
		}

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
	 * 变更物料清单查询
	 * 
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getChangedMaterialList() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("tech_task_id", request.getParameter("tech_task_id"));

		List list = techTaskDao.queryChangedMaterialList(conditionMap);

		JSONObject json = Util.dataListToJson(true, "查询成功", list, null);

		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 导入变更物料清单
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String uploadChangedMaterialList() throws UnsupportedEncodingException {
		// SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// String curTime = df.format(new Date());
		// int userid = getUser().getId();
		// logger.info("---->HrAction::uploadRewards " + curTime + " " + userid
		// + ";fileFileName = " + fileFileName);
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String result = "导入成功！";
		boolean success = true;
		JSONObject json = null;
		try {
			out = response.getWriter();

			ExcelModel excelModel = new ExcelModel();
			excelModel.setReadSheets(1);
			excelModel.setStart(1);
			Map<String, Integer> dataType = new HashMap<String, Integer>();
			dataType.put("0", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("1", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("2", ExcelModel.CELL_TYPE_CANNULL);
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
			excelModel.setDataType(dataType);
			/*
			 * SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd"); String
			 * curTime = df.format(new Date()); String fileName
			 * ="员工信息批导入_"+curTime;
			 */
			excelModel.setPath(request.getSession().getServletContext().getRealPath("/") + (new Date()).getTime() + ".xlsx");
			/**
			 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
			 */
			InputStream is = new FileInputStream(file);

			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);

			List<Map<String, String>> addList = new ArrayList<Map<String, String>>();
			// int user_id = getUser().getId();
			// String createTime = Util.format(new Date(),
			// "yyyy-MM-dd HH:mm:ss");

			for (Object[] data : excelModel.getData()) {
				Map<String, String> infomap = new HashMap<String, String>();

				infomap.put("sap_no", data[0] == null ? null : data[0].toString().trim());
				infomap.put("material_desc", data[1] == null ? null : data[1].toString().trim());
				infomap.put("material_type", data[2] == null ? null : data[2].toString().trim());
				infomap.put("material_spec", data[3] == null ? null : data[3].toString().trim());
				infomap.put("unit", data[4] == null ? null : data[4].toString().trim());
				infomap.put("supplier_code", data[5] == null ? null : data[5].toString().trim());
				infomap.put("single_loss", data[6] == null ? null : data[6].toString().trim());
				infomap.put("level_usage", data[7] == null ? null : data[7].toString().trim());
				infomap.put("single_weight", data[8] == null ? null : data[8].toString().trim());
				infomap.put("single_usage", data[9] == null ? null : data[9].toString().trim());
				infomap.put("workshop", data[10] == null ? null : data[10].toString().trim());
				infomap.put("process", data[11] == null ? null : data[11].toString().trim());
				infomap.put("assemb_site", data[12] == null ? null : data[12].toString().trim());
				infomap.put("remark", data[13] == null ? null : data[13].toString().trim());

				// infomap.put("editor_id", String.valueOf(user_id));
				// infomap.put("edit_date", String.valueOf(createTime));
				addList.add(infomap);
			}
			if (addList.size() > 0) {
				// 批量新增用户信息
				// @SuppressWarnings("unused")
				// int r = hrDao.insertRewards(addList);
				json = Util.dataListToJson(success, result, addList, null);
			} else {
				json = Util.dataListToJson(false, "上传数据为空!", null, null);
			}

		} catch (Exception e) {
			success = false;
			result = "上传出错：" + e.getMessage();
			System.out.println("上传出错：" + e.getMessage());
			json = Util.dataListToJson(success, result, null, null);
		} finally {
			out.print(json);
			out.flush();
			out.close();
		}
		return null;
	}

	private String saveFileMethod(File f) {
		String filepath = "";

		if (f != null) {
			try {
				// 把上传的文件放到指定的路径下
				String path = ServletActionContext.getServletContext().getRealPath("/file/upload/techTask/");
				// 写到指定的路径中
				File savedir = new File(path);
				// 如果指定的路径没有就创建
				if (!savedir.exists()) {
					savedir.mkdirs();
				}
				long fileLength = 0;

				File saveFile = new File(savedir, String.valueOf(System.currentTimeMillis()) + ".pdf");
				fileLength += f.length();
				/**
				 * if(fileLength>1024 * 1024 * 20){ JSONObject json =
				 * Util.dataListToJson(false,"新增失败，单个上传文件大小不能大于10M！",null); try
				 * { out = response.getWriter(); } catch (IOException e) {
				 * e.printStackTrace(); } out.print(json); }
				 **/
				FileUtils.copyFile(f, saveFile);
				filepath = "/19bms/file/upload/techTask/" + saveFile.getName();

			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return filepath;
	}

	/**
	 * 技改任务维护界面
	 * 
	 * @return
	 */
	public String taskMaintainPage() {
		return "taskMaintainPage";
	}

	/**
	 * 技改工时评估界面
	 * 
	 * @return
	 */
	public String workHourEstimatePage() {
		return "workHourEstimatePage";
	}

	/**
	 * 技改跟进页面
	 * 
	 * @return
	 */
	public String followingUpPage() {
		return "followingUpPage";
	}

	/**
	 * 获得技改工时评估列表
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getWorkHourEstimateList() throws UnsupportedEncodingException {
		/*
		 * SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 * String curTime = df.format(new Date()); int userid=getUser().getId();
		 */
		// logger.info("---->HrAction::getWorkTimePriceList " + curTime + " " +
		// userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("task_content", request.getParameter("task_content"));
		conditionMap.put("tech_order_no", request.getParameter("tech_order_no"));
		conditionMap.put("tech_date_start", request.getParameter("tech_date_start"));
		conditionMap.put("tech_date_end", request.getParameter("tech_date_end"));
		conditionMap.put("status", request.getParameter("status"));
		if (pager != null) {
			conditionMap.put("offset", (pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}

		List list = techTaskDao.queryTechWorkHourEstimateList(conditionMap);
		int totalCount = techTaskDao.queryTechWorkHourEstimateListTotalCount(conditionMap);

		Map<String, String> page_map = new HashMap<String, String>();
		if (pager != null) {
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

	/**
	 * 技改工时评估-修改
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String editTechWorkHourEstimate() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid = getUser().getId();
		// logger.info("---->HrAction::addRewards " + curTime + " " + userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		List<Map<String, Object>> editList = new ArrayList<Map<String, Object>>();
		Map<String, Object> infomap = new HashMap<String, Object>();
		infomap.put("time_list", request.getParameter("time_list"));
		infomap.put("single_time_total", request.getParameter("single_time_total"));
		infomap.put("time_total", request.getParameter("total_hour"));
		infomap.put("assesor_id", userid);
		if ("1".equals(request.getParameter("flg"))) {
			infomap.put("assess_date", "");
		} else {
			infomap.put("assess_date", curTime);
		}

		infomap.put("id", request.getParameter("id"));
		infomap.put("tech_task_id", request.getParameter("tech_task_id"));
		editList.add(infomap);

		techTaskDao.updateTechWorkHourEstimate(editList);

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
	 * 获得技改跟进列表
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getFollowingUpList() throws UnsupportedEncodingException {
		/*
		 * SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 * String curTime = df.format(new Date()); int userid=getUser().getId();
		 */
		// logger.info("---->HrAction::getWorkTimePriceList " + curTime + " " +
		// userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("task_content", request.getParameter("task_content"));
		conditionMap.put("tech_order_no", request.getParameter("tech_order_no"));
		conditionMap.put("tech_date_start", request.getParameter("tech_date_start"));
		conditionMap.put("tech_date_end", request.getParameter("tech_date_end"));
		conditionMap.put("status", request.getParameter("status"));
		if (pager != null) {
			conditionMap.put("offset", (pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}

		List list = techTaskDao.queryTechFollowingUpList(conditionMap);
		int totalCount = techTaskDao.queryTechFollowingUpListTotalCount(conditionMap);

		Map<String, String> page_map = new HashMap<String, String>();
		if (pager != null) {
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

	/**
	 * 获得技改跟进明细列表
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getFollowingUpDetailList() throws UnsupportedEncodingException {
		/*
		 * SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 * String curTime = df.format(new Date()); int userid=getUser().getId();
		 */
		// logger.info("---->HrAction::getWorkTimePriceList " + curTime + " " +
		// userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("tech_task_id", request.getParameter("tech_task_id"));
		if ("view".equals(request.getParameter("view"))) {
			conditionMap.put("view", request.getParameter("view"));
		}
		conditionMap.put("bus_num_start", request.getParameter("bus_num_start"));
		conditionMap.put("bus_num_end", request.getParameter("bus_num_end"));
		/*
		 * if (pager != null) { conditionMap.put("offset", (pager.getCurPage() -
		 * 1) * pager.getPageSize()); conditionMap.put("pageSize",
		 * pager.getPageSize()); }
		 */

		List list = techTaskDao.queryFollowingUpDetailList(conditionMap);
		// int totalCount =
		// techTaskDao.queryTechFollowingUpListTotalCount(conditionMap);

		/*
		 * Map<String, String> page_map = new HashMap<String, String>(); if
		 * (pager != null) { pager.setTotalCount(totalCount);
		 * page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
		 * page_map.put("curPage", String.valueOf(pager.getCurPage()));
		 * page_map.put("pageSize", String.valueOf(pager.getPageSize())); }
		 */
		JSONObject json = Util.dataListToJson(true, "查询成功", list, null);

		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 获得技改跟进明细列表1
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getFollowingUpDetailList1() throws UnsupportedEncodingException {
		/*
		 * SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 * String curTime = df.format(new Date()); int userid=getUser().getId();
		 */
		// logger.info("---->HrAction::getWorkTimePriceList " + curTime + " " +
		// userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("tech_task_id", request.getParameter("tech_task_id"));

		List list = techTaskDao.queryFollowingUpDetailList1(conditionMap);
		JSONObject json = Util.dataListToJson(true, "查询成功", list, null);

		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 技改跟进-修改
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String editFollowingUp() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid = getUser().getId();
		// logger.info("---->HrAction::addRewards " + curTime + " " + userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		JSONArray jsonArray = JSONArray.fromObject(request.getParameter("ids"));

		List<Map<String, Object>> editList = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < jsonArray.size(); i++) {
			Map<String, Object> infomap = new HashMap<String, Object>();

			infomap.put("id", jsonArray.getString(i).toString());
			infomap.put("confirmor_id", userid);
			infomap.put("confirmor_date", curTime);
			infomap.put("task_detail_id", request.getParameter("task_detail_id"));
			editList.add(infomap);
		}
		techTaskDao.updateFollowingUp(editList);
		
		if("1".equals(request.getParameter("update_status"))){
			List<Map<String, Object>> conditionList = new ArrayList<Map<String, Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("workshop", request.getParameter("workshop"));
			map.put("task_detail_id", request.getParameter("task_detail_id"));
			conditionList.add(map);
			techTaskDao.updateWorkshopStatus2(conditionList);
		}

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
	 * 技改跟进-修改1
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String editFollowingUp1() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid = getUser().getId();
		// logger.info("---->HrAction::addRewards " + curTime + " " + userid);

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		//List<Map<String, Object>> editList = new ArrayList<Map<String, Object>>();

		Map<String, Object> infomap = new HashMap<String, Object>();

		infomap.put("tech_task_id", request.getParameter("tech_task_id"));
		infomap.put("factory", request.getParameter("factory"));
		infomap.put("workshop", request.getParameter("workshop"));
		infomap.put("follow_num", request.getParameter("follow_num"));
		infomap.put("confirmor_id", userid);
		infomap.put("confirmor_date", curTime);
		infomap.put("order_no", request.getParameter("order_no"));
		infomap.put("task_detail_id", request.getParameter("task_detail_id"));
		//editList.add(infomap);

		techTaskDao.addFollowingUp1(infomap);
		
		if("1".equals(request.getParameter("update_status"))){
			List<Map<String, Object>> conditionList = new ArrayList<Map<String, Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("workshop", request.getParameter("workshop"));
			map.put("task_detail_id", request.getParameter("task_detail_id"));
			conditionList.add(map);
			techTaskDao.updateWorkshopStatus2(conditionList);
		}

		JSONObject json = Util.dataListToJson(true, "success", null, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	// ############# by wx end #############//
}
