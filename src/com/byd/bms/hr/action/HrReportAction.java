package com.byd.bms.hr.action;

import java.io.IOException;
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

import org.apache.commons.lang.xwork.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.hr.dao.IHrDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class HrReportAction extends BaseAction<Object> {

	private static final long serialVersionUID = -707472542307803768L;
	static Logger logger = Logger.getLogger(HrReportAction.class.getName());
	private String conditions;
	private String savestrs;
	private IHrDao hrDao;
	private Pager pager;
	private Map<String,Object> result;
	/**
	 * 计件工资查询页面
	 * @return
	 */
	public String pieceSalaryPage(){
		return "pieceSalaryPage";
	}
	/**
	 * 计件工资结算页面
	 * @return
	 */
	public String pieceSalaryBalancePage(){
		return "pieceSalaryBalancePage";
	}
	/**
	 * 技改工时统计
	 * @return
	 */
	public String ecnReport(){
		return "ecnReport";
	}
	
	/**
	 * 额外工时统计
	 * @return
	 */
	public String tmpReport(){
		return "tmpReport";
	}
	
	/**
	 * @author YangKe 160127
	 * 工时统计报表
	 * @return
	 */
	public String workTimeReport(){
		return "workTimeReport";
	}
	
	public String pieceTimeReport(){
		return "pieceTimeReport";
	}
	
	/**
	 * 计件工时统计 车辆维度
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getPieceTimeReport() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrReportAction::getPieceTimeReport " + curTime + " " + userid);
		
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
		conditionMap.put("bus_number", request.getParameter("bus_number"));
		conditionMap.put("date_start", request.getParameter("date_start"));
		conditionMap.put("date_end", request.getParameter("date_end"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		//List<Map<String, String>> list = hrDao.getPieceTimeReportList(conditionMap);
		//int count = hrDao.getPieceTimeReportListCount(conditionMap);
		int count = hrDao.getPieceTimeReportBusListCount(conditionMap);
		
		
		//160418 先查询车号，再根据车号查询视图
		List<String> bus_number_list = hrDao.getPieceTimeReportBusList(conditionMap);
		/*Map<String, Object> conditionMap2 = new HashMap<String, Object>();
		conditionMap2.put("staff_number", request.getParameter("staff_number"));
		conditionMap2.put("date_start", request.getParameter("date_start"));
		conditionMap2.put("date_end", request.getParameter("date_end"));
		conditionMap2.put("list", bus_number_list);*/
		conditionMap.put("list", bus_number_list);
		//System.out.println("bus_number_list size = " + bus_number_list.size());
		List<Map<String, String>> list = hrDao.getPieceTimeReportList(conditionMap);
		
		for(int i = 0; i < bus_number_list.size(); i++){
			Map<String,String> result = new HashMap<String,String>();
			//result = (Map<String, String>) bus_number_list.get(i);
			//System.out.println("bus_number_list = " + result.get("bus_number"));
		}
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(count);						
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
	 * 计件工时统计 人员维度
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getPieceTimeReport2() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrReportAction::getPieceTimeReport2 " + curTime + " " + userid);
		
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
		conditionMap.put("bus_number", request.getParameter("bus_number"));
		conditionMap.put("date_start", request.getParameter("date_start"));
		conditionMap.put("date_end", request.getParameter("date_end"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		int count = hrDao.getPieceTimeReportListCount2(conditionMap);
		//160418 先查询车号，再根据车号查询视图
		List<String> staff_number_list=new ArrayList<String>();
		//staff_number_list = hrDao.getPieceTimeReportStaffList(conditionMap);
		conditionMap.put("list", staff_number_list);
		//System.out.println("bus_number_list size = " + bus_number_list.size());		
		List<Map<String, String>> list = hrDao.getPieceTimeReportList2(conditionMap);
		
		//int count = hrDao.getPieceTimeReportStaffListCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(count);						
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
	
	public String getWorkTimeReport() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->HrReportAction::getWorkTimeReport " + curTime + " " + userid);
		
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
		conditionMap.put("work_date", request.getParameter("work_date"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List<Map<String, String>> list = hrDao.getWorkHourReportList(conditionMap);
		int count = hrDao.getWorkHourReportListCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(count);						
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
	 * 获取计件工资列表；起始月份和结束月份不都等于上月 查询历史记录
	 * @return
	 */
	public String getPieceSalaryList(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		String month_start=(String) conditionMap.get("monthStart");
		String month_end=(String) conditionMap.get("monthEnd");
		//String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		String curMonth=Util.format(new Date(), "yyyy-MM");
		String lastMonth=Util.format(Util.addMonth(new Date(), -1), "yyyy-MM");
		
		
		if(pager!=null){
			conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
			int totalCount=0;
			if(!(month_start.equals(curMonth))&&!(month_start.equals(lastMonth))){
				totalCount = hrDao.queryPieceSalaryHistoryCount(conditionMap);
			}else
			 totalCount = hrDao.queryPieceSalaryCount(conditionMap);
			pager.setTotalCount(totalCount);
			result.put("pager", pager);
		}
		if(!(month_start.equals(curMonth))&&!(month_start.equals(lastMonth))){
			result.put("salaryList", hrDao.queryPieceSalaryHistory(conditionMap));
		}else
		result.put("salaryList", hrDao.queryPieceSalary(conditionMap));
		
		return SUCCESS;
	}
	/**
	 * 计件工资归档
	 * @return
	 */
	public String savePieceSalaryHistory(){
		result=new HashMap<String,Object>();
		BmsBaseUser user=getUser();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		String factory=(String) conditionMap.get("factory");
		String workshop=(String) conditionMap.get("workshop");
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");		
		//根据车间主任姓名+月份+提交工厂+提交车间删除之前该月该车间提交的工资记录
		Map<String,Object> conditionMap1=new HashMap<String,Object>();
		conditionMap1.put("saver", getUser().getDisplay_name());
		conditionMap1.put("submit_factory", factory);
		conditionMap1.put("submit_workshop", workshop);
		conditionMap1.put("month", conditionMap.get("monthStart"));
		conditionMap1.put("staff", conditionMap.get("staff"));
		
		//先判断 月份+提交工厂+提交车间 是否存在已结算的工资记录
		int salarycount=hrDao.queryBalanceSalaryCount(conditionMap1);
		if(salarycount>0){
			result.put("success", false);
		    result.put("message", "该车间该月工资已结算，不能再提交该月工资！");
			return SUCCESS;
		}else{
			List<Map<String,Object>> salary_list=hrDao.queryPieceSalary(conditionMap);	

			for(int i=0;i<salary_list.size();i++){	
				Map<String,Object> m=salary_list.get(i);
				 m.put("saver", user.getDisplay_name());
				 m.put("save_date", createTime);	
				 m.put("submit_factory", factory);
				 m.put("submit_workshop", workshop);
				salary_list.set(i, m);
			}
			
			int a=hrDao.deletePieceSalaryHistory(conditionMap1);//删除对应计件工资历史记录
			
			int i=hrDao.savePieceSalaryHistory(salary_list);
			Map<String,Object> m1=new HashMap<String,Object>();
			Map<String,Object> m2=new HashMap<String,Object>();
			Map<String,Object> m3=new HashMap<String,Object>();
			m1.putAll(conditionMap);
			//m1.put("monthStart", conditionMap.get("monthStart"));
			m1.put("status", "3");
			m1.put("q_status", "1");//added by xjw 160510 提交已审批状态工时
			m2.putAll(conditionMap);
			//m2.put("monthStart", conditionMap.get("monthStart"));
			m2.put("status", "1");
			m3.putAll(conditionMap);
			//m3.put("monthStart", conditionMap.get("monthStart"));
			m3.put("status", "1");
			hrDao.updateWorkHourStatus(m1);
			hrDao.updateAttendanceStatus(m2);
			hrDao.updateRewordsStatus(m3);
			
			result.put("success", true);
		    result.put("message", "保存成功");
			return SUCCESS;
		}
		
	} 
	/**
	 * 查询已提交的上月工资列表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String getSubmitSalaryList() throws UnsupportedEncodingException{
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		Map<String,Object> conditionMapAll=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		conditionMapAll.putAll(conditionMap);
		
		String month_start=(String) conditionMap.get("monthStart");
		String month_end=(String) conditionMap.get("monthEnd");
		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		conditionMap.put("offset", Integer.valueOf(request.getParameter("offset")));
		conditionMap.put("pageSize", Integer.valueOf(request.getParameter("limit")));
		/**
		if(pager!=null){
			conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());	
			int totalCount=0;
			totalCount = hrDao.queryPieceSalaryHistoryCount(conditionMapAll);
			pager.setTotalCount(totalCount);
			result.put("pager", pager);
			
		}**/
		int totalCount=0;
		totalCount = hrDao.queryPieceSalaryHistoryCount(conditionMapAll);
		result.put("total", totalCount);
		result.put("rows", hrDao.queryPieceSalaryHistory(conditionMap));
		return SUCCESS;
	}
	/**
	 * 工资驳回:工时状态返回到“已审批”状态，工资归档表中状态标为“已驳回”,考勤和奖惩状态变为“已维护”（0）
	 * @return
	 */
	public String rejectPieceSalary(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		//根据查询条件查找出符合条件的staff number 列表
		List<String> staffList = hrDao.querySalaryStaffList(conditionMap);
		Map<String,Object> m1=new HashMap<String,Object>();
		Map<String,Object> m2=new HashMap<String,Object>();
		Map<String,Object> m3=new HashMap<String,Object>();
		String factory=getUser().getFactory();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");	
		
		m1.putAll(conditionMap);
		m1.put("status", "已驳回");
		m1.put("calculator", getUser().getDisplay_name());
		m1.put("calculateDate", createTime);
		m1.put("staffList", staffList);
		m2.putAll(conditionMap);
		m3.putAll(conditionMap);
		m2.put("status", "1");//工时状态1--已审批
		m2.put("q_status", "3");//added by xjw 160510 驳回已锁定工时
		m3.put("status", "0");
		
		try{
			hrDao.updateWorkHourStatus(m2);
			hrDao.updatePieceSalaryHistory(m1);
			hrDao.updateAttendanceStatus(m3);
			hrDao.updateRewordsStatus(m3);
			result.put("success", true);
			result.put("message", "驳回成功！");
		}catch(Exception e){
			result.put("success", false);
			result.put("message", "驳回失败！");
		}
		
		return SUCCESS;
	}
	/**
	 * 工资结算：工资归档表中状态标为“已结算”
	 * @return
	 */
	public String balacePieceSalary(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		//根据查询条件查找出符合条件的staff number 列表
		List<String> staffList = hrDao.querySalaryStaffList(conditionMap);
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");	
		Map<String,Object> m1=new HashMap<String,Object>();
		m1.putAll(conditionMap);
		m1.put("status", "已结算");
		m1.put("staffList", staffList);
		m1.put("calculator", getUser().getDisplay_name());
		m1.put("calculateDate", createTime);
		try{
			hrDao.updatePieceSalaryHistory(m1);
			result.put("success", true);
			result.put("message", "结算成功！");
		}catch(Exception e){
			result.put("success", false);
			result.put("message", "结算失败！");
		}
		return SUCCESS;
	}
	
	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public IHrDao getHrDao() {
		return hrDao;
	}

	public void setHrDao(IHrDao hrDao) {
		this.hrDao = hrDao;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}
	public String getSavestrs() {
		return savestrs;
	}
	public void setSavestrs(String savestrs) {
		this.savestrs = savestrs;
	}
	
	/**
	 * 技改工时统计数据，工单维度
	 * @return
	 */
	public String getEcnReportData(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		/*String month_start=(String) conditionMap.get("monthStart");
		String month_end=(String) conditionMap.get("monthEnd");
		//String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		String curMonth=Util.format(Util.addMonth(new Date(), -1), "yyyy-MM");*/
		
		
		/*if(pager!=null){
			conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
			int totalCount=0;
			if(!(month_start.equals(curMonth)&&month_end.equals(curMonth))){
				totalCount = hrDao.queryPieceSalaryHistoryCount(conditionMap);
			}else
			 totalCount = hrDao.queryPieceSalaryCount(conditionMap);
			pager.setTotalCount(totalCount);
			result.put("pager", pager);
		}*/
		/*if(!(month_start.equals(curMonth)&&month_end.equals(curMonth))){
			result.put("salaryList", hrDao.queryPieceSalaryHistory(conditionMap));
		}else*/
		result.put("ecnReportData", hrDao.getEcnReportData(conditionMap));
		
		return SUCCESS;
	}
	
	/**
	 * 技改工时统计数据，人员维度
	 * @return
	 */
	public String getEcnReportData1(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		/*String month_start=(String) conditionMap.get("monthStart");
		String month_end=(String) conditionMap.get("monthEnd");
		//String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		String curMonth=Util.format(Util.addMonth(new Date(), -1), "yyyy-MM");*/
		
		
		/*if(pager!=null){
			conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
			int totalCount=0;
			if(!(month_start.equals(curMonth)&&month_end.equals(curMonth))){
				totalCount = hrDao.queryPieceSalaryHistoryCount(conditionMap);
			}else
			 totalCount = hrDao.queryPieceSalaryCount(conditionMap);
			pager.setTotalCount(totalCount);
			result.put("pager", pager);
		}*/
		/*if(!(month_start.equals(curMonth)&&month_end.equals(curMonth))){
			result.put("salaryList", hrDao.queryPieceSalaryHistory(conditionMap));
		}else*/
		result.put("ecnReportData", hrDao.getEcnReportData1(conditionMap));
		
		return SUCCESS;
	}
	
	/**
	 * 额外工时统计数据，工单维度
	 * @return
	 */
	public String getTmpReportData(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		/*String month_start=(String) conditionMap.get("monthStart");
		String month_end=(String) conditionMap.get("monthEnd");
		//String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		String curMonth=Util.format(Util.addMonth(new Date(), -1), "yyyy-MM");*/
		
		
		/*if(pager!=null){
			conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
			int totalCount=0;
			if(!(month_start.equals(curMonth)&&month_end.equals(curMonth))){
				totalCount = hrDao.queryPieceSalaryHistoryCount(conditionMap);
			}else
			 totalCount = hrDao.queryPieceSalaryCount(conditionMap);
			pager.setTotalCount(totalCount);
			result.put("pager", pager);
		}*/
		/*if(!(month_start.equals(curMonth)&&month_end.equals(curMonth))){
			result.put("salaryList", hrDao.queryPieceSalaryHistory(conditionMap));
		}else*/
		result.put("tmpReportData", hrDao.getTmpReportData(conditionMap));
		
		return SUCCESS;
	}
	
	/**
	 * 额外工时统计数据，人员维度
	 * @return
	 */
	public String getTmpReportData1(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		/*String month_start=(String) conditionMap.get("monthStart");
		String month_end=(String) conditionMap.get("monthEnd");
		//String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		String curMonth=Util.format(Util.addMonth(new Date(), -1), "yyyy-MM");*/
		
		
		/*if(pager!=null){
			conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
			int totalCount=0;
			if(!(month_start.equals(curMonth)&&month_end.equals(curMonth))){
				totalCount = hrDao.queryPieceSalaryHistoryCount(conditionMap);
			}else
			 totalCount = hrDao.queryPieceSalaryCount(conditionMap);
			pager.setTotalCount(totalCount);
			result.put("pager", pager);
		}*/
		/*if(!(month_start.equals(curMonth)&&month_end.equals(curMonth))){
			result.put("salaryList", hrDao.queryPieceSalaryHistory(conditionMap));
		}else*/
		result.put("tmpReportData", hrDao.getTmpReportData1(conditionMap));
		
		return SUCCESS;
	}
	
	/**
	 * 员工姓名、工号模糊查询、弹出下拉列表
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getStaffInfoFuzzySelect() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("job_no", request.getParameter("job_no"));

			List list = hrDao.getStaffInfoFuzzySelect(conditionMap);

			JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
}
