package com.byd.bms.plan.action;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.byd.bms.plan.dao.IPlanDao;
import com.byd.bms.plan.entity.BusDispatchRecord;
import com.byd.bms.plan.entity.OrderDispatchRecord;
import com.byd.bms.plan.entity.PlanDispatch;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;
 
public class BusDispatchAction extends BaseAction<Object> {

	private static final long serialVersionUID = -7582763803338706670L;
	private PlanDispatch plan;
	private IPlanDao planDao;
	private String conditions;
	private Map<String,Object> result;
	private Pager pager;
	private List<BusDispatchRecord> dispatchRecordList;
	private List<OrderDispatchRecord> otDispatchRecordList;
	
	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public PlanDispatch getPlan() {
		return plan;
	}

	public void setPlan(PlanDispatch plan) {
		this.plan = plan;
	}

	public IPlanDao getPlanDao() {
		return planDao;
	}

	public void setPlanDao(IPlanDao planDao) {
		this.planDao = planDao;
	}

	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}

	public List<BusDispatchRecord> getDispatchRecordList() {
		return dispatchRecordList;
	}

	public void setDispatchRecordList(List<BusDispatchRecord> dispatchRecordList) {
		this.dispatchRecordList = dispatchRecordList;
	}

	public List<OrderDispatchRecord> getOtDispatchRecordList() {
		return otDispatchRecordList;
	}

	public void setOtDispatchRecordList(
			List<OrderDispatchRecord> otDispatchRecordList) {
		this.otDispatchRecordList = otDispatchRecordList;
	}

	//发车计划列表页
	public String planListPage(){
		
		return "plan_list";
	}
	//获取发车计划列表
	@SuppressWarnings("rawtypes")
	public String getDispatchPlanList(){
		result = new HashMap<String, Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		List<PlanDispatch> planList=new ArrayList<PlanDispatch>();
		planList=planDao.getDispatchPlanList(conditionMap);
		result.put("dataList", planList);
		int totalCount = planDao.getDispatchPlanCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	//新增发车计划
	public String addPlan(){
		result = new HashMap<String, Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		plan.setCreater_id(user_id);
		plan.setCreatdate(createTime);
		plan.setStatus("0");
		int i=planDao.insertDispatchPlan(plan);
		if(i>0){
			result.put("success", true);
			result.put("message", "新增计划成功！");
		}else{
			result.put("success", false);
			result.put("message", "新增计划失败！");
		}
		return SUCCESS;
	}
	//编辑发车计划
	public String updatePlan(){
		result = new HashMap<String, Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		plan.setCreater_id(user_id);
		plan.setCreatdate(createTime);
		int i=planDao.updateDispatchPlan(plan);
		if(i>0){
			result.put("success", true);
			result.put("message", "更新计划成功！");
		}else{
			result.put("success", false);
			result.put("message", "更新计划失败！");
		}
		return SUCCESS;
	}
	//获取订单已计划发车数量 
	public String getOrderDispatchQty(){
		result = new HashMap<String, Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		int orderId=jo.getInt("orderId");
		int dpqty=planDao.getOrderDispatchQty(orderId);
		result.put("order_dispatch_qty", dpqty);
		return SUCCESS;
	}
	//发车交接页面
	public String busDoDispatch(){
	
		return "doDispatch";
	}
	//发车交接--获取车辆信息
	@SuppressWarnings("rawtypes")
	public String getBusInfo(){
		result = new HashMap<String, Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		//String busNo=jo.getString("busNo");
		result.put("busInfo", planDao.getBusInfoByBusNo(conditionMap));
		result.put("toolList", planDao.getBusToolList());
		return SUCCESS;
	}
	//保存发车交接数据

	public String saveDispatchRecord(){
		result = new HashMap<String, Object>();
		BmsBaseUser user=getUser();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=user.getId();
		for(BusDispatchRecord bdr:dispatchRecordList){
			bdr.setDispatcher_id(user_id);
			bdr.setDispatch_date(createTime);
		}
		int i=0;
		if(dispatchRecordList.size()>0){
			i=planDao.insertDispatchRecord(dispatchRecordList);
		}		
		if(i>0){
			int s=planDao.updateDispatchPlanStatus(plan);
			planDao.updateBusDispatchDate(dispatchRecordList);
			if(s>0){
				result.put("success", true);
				result.put("message", "交接成功！");
			}else{
				result.put("success", true);
				result.put("message", "交接失败！");
			}
			
		}else{
			result.put("success", false);
			result.put("message", "交接失败！");
		}
		return SUCCESS;
	}
	
	public String saveDispatchRecordKD() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		/*HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		String order_no = request.getParameter("order_no");
		Map<String,Object> conditionMap=new HashMap<String,Object>();*/
		
		result = new HashMap<String, Object>();
		BmsBaseUser user=getUser();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=user.getId();
		BusDispatchRecord bdr = new BusDispatchRecord();
		bdr.setBus_number(request.getParameter("bus_number"));
		bdr.setQtys(request.getParameter("qtys"));
		bdr.setDispatcher_id(user_id);
		bdr.setDispatch_date(createTime);
		
		bdr.setWorkcardid(request.getParameter("cardNumber"));
		bdr.setReceiver(request.getParameter("username"));
		bdr.setDepartment(request.getParameter("department"));
		
		bdr.setDispatch_plan_id(plan.getId());
		
		/*for(BusDispatchRecord bdr:dispatchRecordList){
			bdr.setDispatcher_id(user_id);
			bdr.setDispatch_date(createTime);
		}*/
		dispatchRecordList=new ArrayList<BusDispatchRecord>();
		dispatchRecordList.add(bdr);
		int i=0;
		if(dispatchRecordList.size()>0){
			i=planDao.insertDispatchRecord(dispatchRecordList);
		}		
		if(i>0){
			int s=planDao.updateDispatchPlanStatus(plan);
			//planDao.updateBusDispatchDate(dispatchRecordList);
			if(s>0){
				result.put("success", true);
				result.put("message", "交接成功！");
			}else{
				result.put("success", true);
				result.put("message", "交接失败！");
			}
			
		}else{
			result.put("success", false);
			result.put("message", "交接失败！");
		}
		return SUCCESS;
	}
	
	//随车附件交接页面
	public String orderDispatch(){
		
		return "orderDispatch";
	}
	//根据订单编号查询订单附件信息
	public String getQueryOrderTool(){
		result = new HashMap<String, Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		String orderNo=jo.getString("orderNo");
		String dis_name=jo.getString("dis_name");
		String dis_receiver=jo.getString("dis_receiver");
		String dis_date_start=jo.getString("dis_date_start");
		String dis_date_end=jo.getString("dis_date_end");
		//System.out.println("---->dis_name = " + dis_name);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("orderNo", orderNo);
		conditionMap.put("dis_name", dis_name);
		conditionMap.put("dis_receiver", dis_receiver);
		conditionMap.put("dis_date_start", dis_date_start);
		conditionMap.put("dis_date_end", dis_date_end);
		
		result.put("recordList", planDao.getOrderDispatchList(conditionMap));
		
		return SUCCESS;
	}
	//随车附件交接记录保存
	@SuppressWarnings("rawtypes")
	public String saveOrderDispatchRecord(){
		BmsBaseUser user=getUser();
		int factory_id=user.getFactory_id();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=user.getId();
		String user_name=user.getUsername();
		
		Iterator it=otDispatchRecordList.iterator();
		while(it.hasNext()){
			OrderDispatchRecord odr=(OrderDispatchRecord) it.next();
			odr.setEditor_id(user_id);
			odr.setEditor(user_name);
			odr.setEdit_date(createTime);
			odr.setFactory_id(factory_id);
			//交接数量=0，不保存
			if(odr.getQuantity()==0){
				it.remove();
			}
		}
		result = new HashMap<String, Object>();
		int i=0;
		if(otDispatchRecordList.size()>0){
			i=planDao.insertOrderDispatchRecord(otDispatchRecordList);
		}
	
		if(i>0){
			result.put("success", true);
			result.put("message", "交接成功！");
			
		}else{
			result.put("success", false);
			result.put("message", "交接失败！");
		}
		return SUCCESS;
	}
	
	//发车查询--订单发车合计查询页面
	@SuppressWarnings("rawtypes")
	public String busDispatchQuery(){	
		if(conditions==""||conditions==null){
			return "dispatchQuery";
		}else{
			result = new HashMap<String, Object>();
			JSONObject jo=JSONObject.fromObject(conditions);
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			for(Iterator it=jo.keys();it.hasNext();){
				String key=(String) it.next();
				System.out.println(key);
				conditionMap.put(key, jo.get(key));
			}
			conditionMap.put("offset",
					(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
			result.put("dataList", planDao.getBusDispatchTotalList(conditionMap));
			int totalCount = planDao.getBusDispatchTotalCount(conditionMap);			
			pager.setTotalCount(totalCount);
			result.put("pager", pager);
			return SUCCESS;
		}
				
	}
	//发车详情查询页面
	public String busDispatchDesc(){
		result = new HashMap<String, Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		result.put("orderNo", jo.getString("orderNo"));
		return "dispatchDesc";
		
		
	}
	//发车详情查询
	@SuppressWarnings("rawtypes")
	public String busDispatchDescQuery(){
		result = new HashMap<String, Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("offset",
				(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", planDao.getBusDispatchDetailList(conditionMap));
		int totalCount = planDao.getBusDispatchDetailCount(conditionMap);			
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
}
