package com.byd.bms.report.action;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.xwork.StringUtils;
import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONObject;

import com.byd.bms.report.dao.IReportDao;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class QualityReportAction extends BaseAction<Object> {

	private static final long serialVersionUID = 2116609348169021093L;
	private Map<String, Object> result;
	private String conditions;
	private IReportDao reportDao;
	private Pager pager;

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

	public IReportDao getReportDao() {
		return reportDao;
	}

	public void setReportDao(IReportDao reportDao) {
		this.reportDao = reportDao;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	/**
	 * 品质分析报表
	 * 
	 * @return
	 */
	public String qualityIndex() {
		return "qualityIndex";
	}

	/**
	 * DPU报表页面
	 * 
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String dpuReport() throws UnsupportedEncodingException {
		result = new HashMap<String, Object>();
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		String department="";
		if(!StringUtils.isEmpty(request.getParameter("department"))){
			department=request.getParameter("department");
		}else {
			if(!StringUtils.isEmpty(user.getDepartment())){
				department=user.getDepartment();
			}
		}
		result.put("department", department);
		return "DPU";
	}
	/**
	 * 获取DPU报表数据
	 * @return
	 * @throws ParseException
	 */
	public String getDPUReportData() throws ParseException {
		result = new HashMap<String, Object>();
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		String sdate=(String) conditionMap.get("startDate");
		String edate=(String) conditionMap.get("endDate");
		//查询维度为日,将查询日期范围内的所有日期添加到list中
		if(conditionMap.get("queryItem").equals("day")){			
			result.put("itemList", this.getDateList(sdate, edate));
		}
		//查询维度为周，获取日期范围内周数
		if(conditionMap.get("queryItem").equals("week")){			
			result.put("itemList",this.getWeekList(sdate, edate));
		}
		//查询维度为月，获取日期范围内详细月列表
		if(conditionMap.get("queryItem").equals("month")){
			result.put("itemList", this.getMonthList(sdate, edate));
		}		
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		
		result.put("chartList", reportDao.queryDPUData(conditionMap));
		result.put("detailList", reportDao.queryDPUDetail(conditionMap));
		int totalCount = reportDao.queryDPUDetailCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	
	/**
	 * 一次校检合格率报表页面
	 * 
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String passRateReport() throws UnsupportedEncodingException {
		result = new HashMap<String, Object>();
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		String department="";
		if(!StringUtils.isEmpty(request.getParameter("department"))){
			department=request.getParameter("department");
		}else {
			if(!StringUtils.isEmpty(user.getDepartment())){
				department=user.getDepartment();
			}
		}
		result.put("department", department);
		return "passRate";
	}
	/**
	 * 获取一次校检合格率报表数据
	 * @return
	 * @throws ParseException
	 */
	public String getPassRateReportData() throws ParseException {
		result = new HashMap<String, Object>();
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		String sdate=(String) conditionMap.get("startDate");
		String edate=(String) conditionMap.get("endDate");
		//查询维度为日,将查询日期范围内的所有日期添加到list中
		if(conditionMap.get("queryItem").equals("day")){			
			result.put("itemList", this.getDateList(sdate, edate));
		}
		//查询维度为周，获取日期范围内周数
		if(conditionMap.get("queryItem").equals("week")){			
			result.put("itemList",this.getWeekList(sdate, edate));
		}
		//查询维度为月，获取日期范围内详细月列表
		if(conditionMap.get("queryItem").equals("month")){
			result.put("itemList", this.getMonthList(sdate, edate));
		}	
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		
		result.put("chartList", reportDao.queryPassRateData(conditionMap));
		result.put("detailList", reportDao.queryPassRateDetail(conditionMap));
		int totalCount = reportDao.queryPassRateDetailCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	/**
	 * 制程问题严重等级分布报表页面
	 * @return
	 */
	public String processProblemReport(){
		return "processProblem";
	}
	/**
	 * 获取制程问题严重等级分布报表数据
	 * @return
	 */
	public String getProcessProblemReportData(){
		result = new HashMap<String, Object>();
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		
		result.put("chartList", reportDao.queryProcessProblemData(conditionMap));
		result.put("detailList", reportDao.queryProcessProblemDetail(conditionMap));
		int totalCount = reportDao.queryProcessProblemCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	/**
	 * 品质评比得分报表
	 * @return
	 */
	public String qcScoreCompareReport(){
		return "qcScoreCompare";
	}
	/**
	 * 获取品质评比得分报表数据
	 * @return
	 * @throws ParseException
	 */
	public String getQCScoreCompareData() throws ParseException{
		result = new HashMap<String, Object>();
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		String sdate=(String) conditionMap.get("startDate");
		String edate=(String) conditionMap.get("endDate");
		//查询维度为周，获取日期范围内周数
		List<String> weekList=this.getWeekList(sdate, edate);
		result.put("itemList",weekList);
		//查询工厂车间对应班组列表
		List<Map<String,Object>> workgroupList=reportDao.queryWorkgroupList(conditionMap);
		//DPU得分（只有四大车间，无部件车间，部件车间DPU得分为50）
		List<Map<String,Object>> dpuScoreList=new ArrayList();
		//制程问题扣分
		List<Map<String,Object>> bugScoreList=new ArrayList();
		//封装各周各班组的品质评比得分,默认100分
		List<Map<String,Object>> scoreList=new ArrayList<Map<String,Object>>();
		for(int i=0;i<weekList.size();i++){
			Map smap=new HashMap();
			for(Map m:workgroupList){			
				smap.put(m.get("workgroup_name"), 100.00);
			}
			scoreList.add(i, smap);
		}
		//如果班组列表为空不查询dpu得分和制程问题扣分
		if(workgroupList!=null && workgroupList.size()>0){
			dpuScoreList=reportDao.queryDPUScore(conditionMap);
			bugScoreList=reportDao.queryProcessProlemScore(conditionMap);		
		//循环dpuScoreList 更新scoreList的值
			for(Map dmap:dpuScoreList){
				int item=(int) dmap.get("item");
				Map<String,Object> m=scoreList.get(item-1);
				double dpu_score=(double) dmap.get("dpu_score");	
				double score=100.00-(50.00-dpu_score);
				if(score<0){
					score=0;
				}
				m.put((String) dmap.get("workgroup_name"),score);				
			}
			//循环bugScoreList 更新scoreList的值	
			for(Map bmap:bugScoreList){
				int item=(int) bmap.get("item");
				Map<String,Object> m=scoreList.get(item-1);
				BigDecimal bug_score=(BigDecimal)bmap.get("bug_score");
				double m_score=(double)m.get(bmap.get("workgroup_name"));
				double score=m_score-bug_score.doubleValue();
				if(score<0){
					score=0;
				}
				m.put((String) bmap.get("workgroup_name"),score);	
			}
		}
		result.put("workgroupList",workgroupList);	
		result.put("chartList",scoreList);
		return SUCCESS;
	}
	/**
	 * 车间制程问题报表页面
	 * @return
	 */
	public String wProcessProblemReport(){
		
		return "processProblem_W";
	}
	/**
	 * 获取车间制程问题报表数据
	 * @return
	 */
	public String getWProcessProblemData(){
		result = new HashMap<String, Object>();
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		//查询报表统计数据
		result.put("chartList", reportDao.queryWProcessProblemData(conditionMap));
		//查询报表明细数据
		result.put("detailList", reportDao.queryWProcessProblemDetail(conditionMap));
		//查询报表明细记录数
		int totalCount=reportDao.queryWProcessProblemCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	
	/**
	 * 获取日期范围内所有日期
	 * @param sdate
	 * @param edate
	 * @return
	 * @throws ParseException
	 */
	private List<String> getDateList(String sdate, String edate) throws ParseException {
		Calendar startCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate = df.parse(sdate);
		startCalendar.setTime(startDate);
		Date endDate = df.parse(edate);
		endCalendar.setTime(endDate);
		List<String> datelist=new ArrayList<String>();
		while (true) {
			if (startCalendar.getTimeInMillis() <= endCalendar.getTimeInMillis()) {
				datelist.add(df.format(startCalendar.getTime()));
			} else {
				break;
			}
			startCalendar.add(Calendar.DAY_OF_MONTH, 1);
		}
		return datelist;
	}
	/**
	 * 获取日期范围内周数
	 * @param sdate
	 * @param edate
	 * @return
	 * @throws ParseException
	 */
	private List getWeekList(String sdate, String edate) throws ParseException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar startCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		startCalendar.setTime(df.parse(sdate));
		endCalendar.setTime(df.parse(edate));
		int s_week = startCalendar.get(Calendar.WEEK_OF_YEAR);
		int e_week = endCalendar.get(Calendar.WEEK_OF_YEAR);
		int weekcount=1;
		List weeklist=new ArrayList();
		while(weekcount<=(e_week-s_week+1)){
			weeklist.add(weekcount);
			weekcount+=1;
		}
		return weeklist; 
	}
	/**
	 * 获取日期范围内月数
	 * @param sdate
	 * @param edate
	 * @return
	 * @throws ParseException
	 */
	private List getMonthList(String sdate, String edate) throws ParseException{
		List monthlist=new ArrayList();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar startCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		startCalendar.setTime(df.parse(sdate));
		endCalendar.setTime(df.parse(edate));
		int s_month = startCalendar.get(Calendar.MONTH)+1;
		int e_month = endCalendar.get(Calendar.MONTH)+1;
		while(s_month<=e_month){
			monthlist.add(s_month);
			s_month+=1;
		}
		return monthlist;
	}
}
