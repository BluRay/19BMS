/**
 * 技改任务action（第二版）
 */
package com.byd.bms.techtrans.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.byd.bms.techtrans.dao.ITechTaskDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

/**
 * @author xjw2084034
 *
 */
public class TechTaskAction extends BaseAction<Object> {

	private static final long serialVersionUID = 4878835279243968002L;

	private ITechTaskDao techTaskDao;

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

	private Map<String,Object> result;//返回前端的json数据
	private String conditions;//前台传输的查询条件map
	
	

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

	

	/**
	 * 技改任务分配界面
	 * 
	 * @return
	 */
	public String taskAssessPage() {
		return "assessPage";
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
	 * 获得技改任务维护列表
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getTaskMaintainList() throws UnsupportedEncodingException{
		/*SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();*/
		//logger.info("---->HrAction::getWorkTimePriceList " + curTime + " " + userid);
		
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
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List list = techTaskDao.queryTechTaskMaintainList(conditionMap);
		int totalCount=techTaskDao.queryTechTaskMaintainListTotalCount(conditionMap);
		
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
}
