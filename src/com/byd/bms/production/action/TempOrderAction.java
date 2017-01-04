package com.byd.bms.production.action;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.xwork.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.production.dao.IProductionDao;
import com.byd.bms.production.entity.BmsTempOrder;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class TempOrderAction extends BaseAction<Object> {

	private static final long serialVersionUID = -1241597014509321410L;
	static Logger logger = Logger.getLogger(TempOrderAction.class.getName());
	private Pager pager;
	private String conditions;
	private Map<String,Object> result;
	private IProductionDao productionDao;
	private String whflag;//工时操作类型 verify、reject
	private String tempOrderId;
	private String tempOrderStaus; //状态: 0已创建  2 已分配 3 已评估 4 已验收 5 已完成'
	private BmsTempOrder tempOrder;
	
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
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
	public IProductionDao getProductionDao() {
		return productionDao;
	}
	public void setProductionDao(IProductionDao productionDao) {
		this.productionDao = productionDao;
	}
	public String getWhflag() {
		return whflag;
	}
	public void setWhflag(String whflag) {
		this.whflag = whflag;
	}	
	public String getTempOrderId() {
		return tempOrderId;
	}
	public void setTempOrderId(String tempOrderId) {
		this.tempOrderId = tempOrderId;
	}
	public String getTempOrderStaus() {
		return tempOrderStaus;
	}
	public void setTempOrderStaus(String tempOrderStaus) {
		this.tempOrderStaus = tempOrderStaus;
	}
	public BmsTempOrder getTempOrder() {
		return tempOrder;
	}
	public void setTempOrder(BmsTempOrder tempOrder) {
		this.tempOrder = tempOrder;
	}
	/**
	 * 临时派工单创建界面
	 * @return
	 */
	public String createOrderPage(){
		BmsBaseUser user=getUser();
		result = new HashMap<String, Object>();
		result.put("applier", user.getUsername());
		result.put("applierId", user.getId());
		return "createPage";
	}
	/**
	 * 获取临时派工单列表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String orderList() throws UnsupportedEncodingException{
		result=new HashMap<String,Object>();
		BmsBaseUser user=getUser();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator<?> it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("applier", user.getDisplay_name());
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		if(request.getParameter("offset")!=null)conditionMap.put("offset", Integer.valueOf(request.getParameter("offset")));
		if(request.getParameter("limit")!=null)conditionMap.put("pageSize", Integer.valueOf(request.getParameter("limit")));
		conditionMap.put("sort", request.getParameter("sort"));
		conditionMap.put("order", request.getParameter("order"));
		result.put("rows", productionDao.getTmpOrderList(conditionMap));
		int totalCount = productionDao.getTmpOrderCount(conditionMap);
		result.put("total", totalCount);
		if(pager != null)result.put("curPage", String.valueOf(pager.getCurPage()));
		return SUCCESS;
	}
	/**
	 * 创建临时订单
	 * @return
	 */
	public String createOrder(){
		result=new HashMap<String,Object>();
		String applier=getUser().getDisplay_name();
		//JSONObject jo=JSONObject.fromObject(conditions);
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		/*Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("applyDate", createTime);
		long time=new Date().getTime();
		String orderNo="T"+Util.format(new Date(), "yyyyMMdd");
		int series=Integer.parseInt(productionDao.getOrderSeriesByDate(Util.format(new Date(), "yyyy-MM-dd")))+1; 
		if(series<10){
			orderNo+="0"+series;
		}else{
			orderNo+=""+series;
		}
		conditionMap.put("orderNo",orderNo);*/
		long time=new Date().getTime();
		String orderNo="T"+Util.format(new Date(), "yyyyMMdd");
		int series=Integer.parseInt(productionDao.getOrderSeriesByDate(Util.format(new Date(), "yyyy-MM-dd")))+1; 
		if(series<10){
			orderNo+="0"+series;
		}else{
			orderNo+=""+series;
		}
		tempOrder.setApplier(applier);
		tempOrder.setApply_date(createTime);
		tempOrder.setTmp_order_no(orderNo);
		//派工流水号唯一性校验
		int order_id=productionDao.queryTempOrderBySeries(tempOrder.getOrder_serial_no());
		if(order_id!=0){
			result.put("success", false);
		    result.put("message", "派工流水号"+tempOrder.getOrder_serial_no()+"已经存在！");
		}else{
			int i=productionDao.insertTmpOrder(tempOrder);
			if(i>0){
				result.put("success", true);
			    result.put("message", "新增成功");
			}else{
				result.put("success", false);
			    result.put("message", "新增失败");
			}
		}	
		return SUCCESS;		
	}
	/**
	 * 临时订单更新
	 * @return
	 */
	public String updateOrder(){
		result=new HashMap<String,Object>();
		//JSONObject jo=JSONObject.fromObject(conditions);
		/*Map<String,Object> conditionMap=new HashMap<String,Object>();
		Map<String,Object> cmap=new HashMap<String,Object>();*/
		/*for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}*/
		//派工流水号唯一性校验
		int order_id=productionDao.queryTempOrderBySeries(tempOrder.getOrder_serial_no());
		if(order_id!=tempOrder.getId()&&order_id!=0){
			result.put("success", false);
		    result.put("message", "派工流水号"+tempOrder.getOrder_serial_no()+"已经存在！");
		}else{
			int i=productionDao.updateTmpOrder(tempOrder);
			/*cmap.putAll(conditionMap);
			cmap.put("workDate", Util.format(new Date(), "yyyy-MM-dd"));
			cmap.put("recorder", getUser().getDisplay_name());
			productionDao.saveTmpOrderProcedure(cmap);*/
			if(i>0){
				result.put("success", true);
			    result.put("message", "更新成功");
			}else{
				result.put("success", false);
			    result.put("message", "更新失败");
			}
		}
		
		return SUCCESS;	
	}
	//更新工单进度
	public String updateOrderProcedure(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("workDate", Util.format(new Date(), "yyyy-MM-dd"));
		conditionMap.put("recorder", getUser().getDisplay_name());
		int i=productionDao.saveTmpOrderProcedure(conditionMap);
		tempOrder=new BmsTempOrder();
		tempOrder.setId((int)conditionMap.get("orderId"));
		tempOrder.setFinished_qty(String.valueOf(conditionMap.get("finishedQty")));
		tempOrder.setStatus((String) conditionMap.get("status"));
		
		productionDao.updateTmpOrder(tempOrder);
		if(i>0){
			result.put("success", true);
		    result.put("message", "更新成功");
		}else{
			result.put("success", false);
		    result.put("message", "更新失败");
		}
		return SUCCESS;
	}
	/**
	 * 临时订单删除
	 */
	public String deleteOrder(){
		result=new HashMap<String,Object>();
		
		int i=productionDao.deleteTmpOrder(tempOrderId);
		if(i>0){
			result.put("success", true);
		    result.put("message", "删除成功");
		}else{
			result.put("success", false);
		    result.put("message", "删除失败");
		}
		return SUCCESS;
	}
	/**
	 * 订单审批页面
	 * @return
	 */
	public String approveOrderPage(){
		BmsBaseUser user=getUser();
		result = new HashMap<String, Object>();
		result.put("applier", user.getUsername());
		result.put("applierId", user.getId());
		return "approvePage";
	}
	/**
	 * 订单审批
	 * @return
	 */
	public String approveOrder(){
		BmsBaseUser user=getUser();
		result=new HashMap<String,Object>();
		List<String> ids=Arrays.asList(conditions.split(","));
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		conditionMap.put("approverId", user.getId());
		conditionMap.put("approveDate", createTime);
		conditionMap.put("ids", ids);
		int i=productionDao.batchApproveOrder(conditionMap);
		if(i>0){
			result.put("success", true);
		    result.put("message", "审批成功");
		}else{
			result.put("success", false);
		    result.put("message", "审批失败");
		}
		return SUCCESS;	
	}
	/**
	 * 订单分配页面
	 * @return
	 */
	public String assignOrderPage(){
		BmsBaseUser user=getUser();
		result = new HashMap<String, Object>();
		result.put("applier", user.getUsername());
		result.put("applierId", user.getId());
		return "assignPage";
	}
	/**
	 * 订单分配
	 * @return
	 */
	public String assignOrder(){
		result=new HashMap<String,Object>();
		BmsBaseUser user=getUser();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONArray jsonArray=JSONArray.fromObject(conditions);
		List<Map<String,Object>> order_list=new ArrayList<Map<String,Object>>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);		
			 object.put("assignerId", user.getId());
			 object.put("assignDate", createTime);
			Map<String, Object> map = (Map<String, Object>) object;
			order_list.add(map);
		}
		int i=0;
		if(order_list.size()>0){
			i=productionDao.batchAssignOrder(order_list);
		}		
		if(i>0){
			result.put("success", true);
		    result.put("message", "分配成功");
		    
		}else{
			result.put("success", false);
		    result.put("message", "分配失败");
		}
		return SUCCESS;	
	}
	/**
	 * 工时评估页面
	 * @return
	 */
	public String assessOrderPage(){
		BmsBaseUser user=getUser();
		result = new HashMap<String, Object>();
		result.put("applier", user.getUsername());
		result.put("applierId", user.getId());
		return "assessPage";
	}
	/**
	 * 评估工时
	 * @return
	 */
	public String assessOrder(){
		result=new HashMap<String,Object>();
		
		/*JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		BmsBaseUser user=getUser();
		conditionMap.put("assessorId", user.getId());
		conditionMap.put("assessDate", createTime);
		conditionMap.put("status", "3");*/
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONArray jsa=JSONArray.fromObject(conditions);
		List<Map<String,Object>> order_list=new ArrayList<Map<String,Object>>();
		for(int i=0;i<jsa.size();i++){
			 JSONObject object = (JSONObject)jsa.get(i);
			 object.put("assessorId",getUser().getId());
			 object.put("assessDate", createTime);
			Map<String, Object> map = (Map<String, Object>) object;
			order_list.add(map);
		}
		int i=productionDao.batchAssessTmpOrder(order_list);
		if(i>0){
			result.put("success", true);
		    result.put("message", "保存成功");
		}else{
			result.put("success", false);
		    result.put("message", "保存失败");
		}
		return SUCCESS;	
	}
	/**
	 * 评估工时审核页面
	 * @return
	 */
	public String assessOrderVerifyPage(){
		return "assessOrderVerifyPage";
	}
	/**
	 * @method 评估工时审核，批准后修改BMS_PD_TMP_ORDER表status为 3（已评估）
	 * @return
	 */
	public String assessOrderVerify(){
		result=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONArray jsa=JSONArray.fromObject(conditions);
		List<Map<String,Object>> order_list=new ArrayList<Map<String,Object>>();
		for(int i=0;i<jsa.size();i++){
			 JSONObject object = (JSONObject)jsa.get(i);	
			 object.put("status", "3");
			 object.put("assessVerifierId",getUser().getId());
			 object.put("assessVerifyDate", createTime);
			Map<String, Object> map = (Map<String, Object>) object;
			order_list.add(map);
		}
		int i=productionDao.batchAssessTmpOrder(order_list);
		if(i>0){
			result.put("success", true);
		    result.put("message", "保存成功");
		}else{
			result.put("success", false);
		    result.put("message", "保存失败");
		}
		return SUCCESS;
	}
	/**
	 * 工时维护界面
	 * @return
	 */
	public String workHoursMtaPage(){
		BmsBaseUser user=getUser();
		result = new HashMap<String, Object>();
		result.put("applier", user.getUsername());
		result.put("applierId", user.getId());
		return "workHoursMtaPage";
	}
	/**
	 * 员工工时查询
	 * @return
	 */
	public String getStaffWorkHours(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("hourType", 2);
		result.put("dataList", productionDao.queryStaffWorkHours(conditionMap));
		result.put("tempScheduleList",productionDao.queryTmpOrderProcedureList(conditionMap));
		return SUCCESS;
	}
	/**
	 * 工时维护--保存工时信息
	 * @return
	 */
	public String saveWorkHourInfo(){
		result=new HashMap<String,Object>();
		BmsBaseUser user=getUser();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONArray jsonArray=JSONArray.fromObject(conditions);
		List<Map<String,Object>> swh_list=new ArrayList<Map<String,Object>>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);		
			 object.put("editorId", user.getId());
			 object.put("editDate", createTime);
			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
		}
		int i=productionDao.saveWorkHourInfo(swh_list);
		if(i>0){
			result.put("success", true);
		    result.put("message", "保存成功");
		}else{
			result.put("success", false);
		    result.put("message", "系统异常！保存失败");
		}
		return SUCCESS;	
	}
	/**
	 * 工时修改
	 * @return
	 */
	public String updateWorkHourInfo(){
		result=new HashMap<String,Object>();
		BmsBaseUser user=getUser();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONArray jsonArray=JSONArray.fromObject(conditions);
		List<Map<String,Object>> swh_list=new ArrayList<Map<String,Object>>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 if("verify".equals(whflag)){
				 object.put("approver_id", user.getId());
				 object.put("approve_date", createTime);
				 object.put("status", "1");
				 object.put("actionType", "verify");
			 }else if("reject".equals(whflag)){
				 object.put("approver_id", user.getId());
				 object.put("approve_date", createTime);
				 object.put("status", "2");
				 object.put("actionType", "reject");
			 }else{
				 object.put("editorId", user.getId());
				 object.put("editDate", createTime);
			 }
			 
			 		 
			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
		}
		 Map<String,Object> m=new HashMap<String,Object>();
		 m.put("tempOrderId", tempOrderId);
		 m.put("auditor", user.getDisplay_name());
		 m.put("auditDate", createTime);
		 if("verify".equals(tempOrderStaus)){
			 productionDao.verifyOrder(m);
		 }
		 if("reject".equals(tempOrderStaus)){
			 productionDao.rejectOrder(m);
		 }
		try{
			int i=productionDao.batchUpdateWorkHour(swh_list);
			result.put("success", true);
		    result.put("message", "保存成功");
		}catch(Exception e){
			result.put("success", false);
		    result.put("message", "系统异常！保存失败");
		}
		return SUCCESS;	
	}
	
	/**
	 * 批准、驳回工时计算临时派工单工资
	 * @return
	 */
	public String caculateSalary(){
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		productionDao.caculateTmpSalary(conditionMap);
		return null;
	}
	
	public String deleteWorkHourInfo(){
		result=new HashMap<String,Object>();
		JSONArray jsonArray=JSONArray.fromObject(conditions);
		List<String> idlist=new ArrayList<String>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 idlist.add(object.getString("id"));
		}	
		String ids=StringUtils.join(idlist, ",");
		System.out.println(ids);
		Map<String, Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("ids", ids);
		try{
			productionDao.deleteWorkHourInfo(conditionMap);
			result.put("success", true);
		    result.put("message", "删除成功");
		}catch(Exception e){
			result.put("success", false);
		    result.put("message", "系统异常！删除失败");
		}
		return SUCCESS;
	}
	/**
	 * 临时工单验收页面
	 * @return
	 */
	public String acceptOrderPage(){
		BmsBaseUser user=getUser();
		result = new HashMap<String, Object>();
		result.put("applier", user.getUsername());
		result.put("applierId", user.getId());
		return "acceptOrderPage";
	}
	/**
	 * 工时验收
	 * @return
	 */
	public String acceptOrder(){
		BmsBaseUser user=getUser();
		result=new HashMap<String,Object>();
		List<String> ids=Arrays.asList(conditions.split(","));
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		conditionMap.put("acceptorId", user.getId());
		conditionMap.put("acceptDate", createTime);
		conditionMap.put("ids", ids);
		int i=productionDao.batchAcceptOrder(conditionMap);
		if(i>0){
			result.put("success", true);
		    result.put("message", "验收成功");
		}else{
			result.put("success", false);
		    result.put("message", "验收失败");
		}
		return SUCCESS;	
	}
	/**
	 * 临时工单工时审核页面
	 * @return
	 */
	public String workHoursVerifyPage(){
		BmsBaseUser user=getUser();
		result = new HashMap<String, Object>();
		result.put("applier", user.getUsername());
		result.put("applierId", user.getId());
		return "workHoursVerifyPage";
	}	
	/**
	 * 临时工单工时审核页面
	 * @return
	 */
	public String tempOrderInfoPage(){
		result = new HashMap<String, Object>();
		result.put("tempOrderId", tempOrderId);
		return "tempOrderInfoPage";
	}
	public String getTempOrderInfo(){
		Map<String,Object> m=new HashMap<String,Object>();
		 m.put("tempOrderId", tempOrderId);
		 m.put("hourType", 2);
		result = new HashMap<String, Object>();
		result.put("baseInfo", productionDao.queryTempOrderInfo(tempOrderId));
		result.put("prodList", productionDao.queryTmpOrderProcedureList(m));
		result.put("whList", productionDao.queryStaffWorkHours(m));
		result.put("assignList", productionDao.queryAssignList(tempOrderId));
		return SUCCESS;
	}
	/**
	 * 临时派工单查询页面
	 * @return
	 */
	public String queryOrderPage(){
		
		return "queryOrderPage";
	}
	
}
