package com.byd.bms.report.action;

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

import net.sf.json.JSONObject;

import com.byd.bms.report.dao.IReportDao;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.dao.ICommDao;
import com.byd.bms.util.entity.BmsKeys;

public class ProductionReportAction extends BaseAction<Object> {

	private static final long serialVersionUID = -5678166042927677993L;
	private String conditions;
	private IReportDao reportDao;
	private ICommDao commDao;
	private Map<String,Object> result;
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
	public Map<String, Object> getResult() {
		return result;
	}
	public void setResult(Map<String, Object> result) {
		this.result = result;
	}
	public ICommDao getCommDao() {
		return commDao;
	}
	public void setCommDao(ICommDao commDao) {
		this.commDao = commDao;
	}
	/**
	 * 生产分析报表首页
	 */
	public String productionIndex(){
		return "productionIndex";
	}
	/**
	 * 生产日报表首页
	 * @return
	 */
	public String dailyReport(){
		user=getUser();
		return "daily";	
	}
	/**
	 * 获取生产日报表数据
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public String getDailyReportData(){
		result=new HashMap<String,Object>();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		result.put("reportList", reportDao.queryProductionDaily(conditionMap));
		return SUCCESS;
	}
	/**
	 * 获取生产日报表图形报表数据
	 * @return
	 */
	public String getDailyChartData(){
		result=new HashMap<String,Object>();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		/*List categories=new ArrayList();
		categories.add("上线数");
		categories.add("下线数");
		categories.add("返修上线数");
		categories.add("返修下线数");
		result.put("categories",categories);*/
		List<Map<String,Object>> reportList=reportDao.queryProductionDailyChart(conditionMap);
		result.put("reportList", reportList);
		return SUCCESS;
	}
	/**
	 * 生产停线报表页面
	 * @return
	 */
	public String pauseReport(){
		return "pauseReport";
	}
	/**
	 * 生产停线报表-查询数据
	 * @return
	 */
	public String getPauseReportData(){
		result=new HashMap<String,Object>();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		//获取工厂车间列表
		List<Map<String, String>> workshopList=commDao.getWorkshopSelect(Integer.parseInt((String) conditionMap.get("factoryId")));
		List<String> itemList=new ArrayList<String>();
		for(Map<String,String> m:workshopList){
			itemList.add(m.get("name"));
		}
		//获取异常类别列表
		List<BmsKeys> pauseMapList=commDao.getKeysSelect("REASON_TYPE");
		List<String> pauseTypeList=new ArrayList<String>();
		for(BmsKeys m:pauseMapList){
			pauseTypeList.add(m.getKey_name());
		}
		//获取停线统计数据
		List<Map<String,Object>> dataList=reportDao.queryPauseReportData(conditionMap);
		List<Map<String,Object>> pieMapList=reportDao.queryPausePieData(conditionMap);
		Map<String,Object> pieList=new HashMap<String,Object>();
		//计算饼图百分比
		double totalCount=0;
		for(Map<String,Object> m:pieMapList){
			BigDecimal f=(BigDecimal) m.get("pause_hour");
			totalCount+=f.doubleValue();
		}
		
		for(Map<String,Object> m:pieMapList){
			BigDecimal f=(BigDecimal) m.get("pause_hour");
			pieList.put((String)m.get("reason_type"), f.doubleValue()/totalCount*100);
		}
		
		result.put("itemList", itemList);
		result.put("pauseTypeList", pauseTypeList);
		result.put("reportList", dataList);
		result.put("pieList", pieList);
		return SUCCESS;
	}
	/**
	 * 生产异常报表页面
	 * @return
	 */
	public String exceptionReport(){
		return "exceptionReport";
	}
	/**
	 * 生产异常报表-查询数据
	 * @return
	 * @throws ParseException
	 */
	public String getExceptionReportData() throws ParseException{
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
		result.put("itemList", this.getDateList(sdate, edate));

		result.put("reportList", reportDao.queryExceptionReportData(conditionMap));
		
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
}
