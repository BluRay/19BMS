package com.byd.bms.production.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.byd.bms.production.dao.IProductionDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class WaitWorkTimeAction extends BaseAction<Object> {

	private static final long serialVersionUID = -9218768468608709502L;
	static Logger logger = Logger.getLogger(WaitWorkTimeAction.class.getName());
	private Pager pager;
	private IProductionDao productionDao;
	private String conditions;
	private Map<String,Object> result;
	private String whflag;//工时操作类型 verify、reject
	
	/**
	 * 工时维护页面
	 * @return
	 */
	public String mtaPage(){
		BmsBaseUser user= getUser();
		return "mtaPage";
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
		conditionMap.put("hourType", 4);
		if(pager!=null){
			conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
			int totalCount = productionDao.queryStaffWorkHoursCount(conditionMap);
			pager.setTotalCount(totalCount);
			result.put("pager", pager);
		}
		result.put("dataList", productionDao.queryStaffWorkHours(conditionMap));
	
		return SUCCESS;
	}
	/**
	 * 保存工时信息
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
			 object.put("editor_id", user.getId());
			 object.put("edit_date", createTime);
			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
		}
		int i=0;		
		i=productionDao.saveWaitWorkHourInfo(swh_list);
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
	 * 技改工时更改页面
	 * @return
	 */
	public String updatePage(){
		BmsBaseUser user= getUser();
		return "updatePage";
	}
	/**
	 * 工时修改/审批
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
				 //object.put("editor_id", user.getId());
				 //object.put("edit_date", createTime);
				 object.put("status", "1");
				 object.put("actionType", "verify");
			 }else if("reject".equals(whflag)){
				 //object.put("editor_id", user.getId());
				 //object.put("edit_date", createTime);
				 object.put("status", "2");
				 object.put("actionType", "reject");
			 }else{
				 object.put("editor_id", user.getId());
				 object.put("edit_date", createTime);
			 }
			 		 
			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
		}
		try{
			int i=productionDao.batchUpdateWaitPay(swh_list);
			result.put("success", true);
		    result.put("message", "保存成功");
		}catch(Exception e){
			result.put("success", false);
		    result.put("message", "系统异常！保存失败");
		}
		
		return SUCCESS;	
	}
	/**
	 * 等待工时审核、驳回时计算等待工资
	 * @return
	 */
	public String caculateSalary(){
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		productionDao.caculateWaitSalary(conditionMap);
		return null;
	}
	
	/**
	 * 删除工时信息
	 * @return
	 */
	public String deleteWorkHourInfo(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		int i=productionDao.deleteWaitHourInfo(conditionMap);
		if(i>0){
			result.put("success", true);
		    result.put("message", "删除成功");
		}else{
			result.put("success", false);
		    result.put("message", "系统异常！删除失败");
		}
		return SUCCESS;
	}
	/**
	 * 工时审核页面
	 * @return
	 */
	public String verifyPage(){
		BmsBaseUser user= getUser();
		return "verifyPage";
	}
	
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	public IProductionDao getProductionDao() {
		return productionDao;
	}
	public void setProductionDao(IProductionDao productionDao) {
		this.productionDao = productionDao;
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
	public String getWhflag() {
		return whflag;
	}
	public void setWhflag(String whflag) {
		this.whflag = whflag;
	}
	
}
