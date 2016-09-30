package com.byd.bms.production.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.xwork.StringUtils;
import org.apache.log4j.Logger;

import com.byd.bms.production.dao.IProductionDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class PieceWorkTimeAction extends BaseAction<Object> {

	private static final long serialVersionUID = 7424569688794684930L;
	static Logger logger = Logger.getLogger(PieceWorkTimeAction.class.getName());
	private Pager pager;
	private IProductionDao productionDao;
	private String conditions;
	private Map<String,Object> result;
	private String whflag;//工时操作类型 verify、reject
	
	/**
	 * 计件工时维护页面
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
		conditionMap.put("hourType", 1);

		List<Map<String, String>> dataList=null;
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		try{
			dataList=productionDao.queryStaffWorkHours(conditionMap);
			result.put("dataList", dataList);
			int totalCount = productionDao.queryStaffWorkHoursCount(conditionMap);
			pager.setTotalCount(totalCount);
			result.put("pager", pager);
		}catch(Exception e){
			result.put("dataList", new ArrayList<Map<String,String>>());
		}

		
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
			 object.put("editorId", user.getId());
			 object.put("editDate", createTime);
			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
		}
		int i=0;
		Map<String, Object> map = new HashMap<String,Object>();
		String busNumber=(String) swh_list.get(0).get("busNumber");
		String workshop=(String) swh_list.get(0).get("workshop");
		String isCustomer=(String) swh_list.get(0).get("isCustomer");
		map.put("busNumber", busNumber);
		map.put("workshop", workshop);
		if((!"自制件".equals(workshop)&& !"部件".equals(workshop)&&isCustomer.equals("0"))){
			if(productionDao.validateBusNumber(map)>0){
				i=productionDao.savePieceWorkHourInfo(swh_list);
				if(i>0){
					result.put("success", true);
				    result.put("message", "保存成功");
				}else{
					result.put("success", false);
				    result.put("message", "系统异常！保存失败");
				}
			}else{
				result.put("success", false);
			    result.put("message", busNumber+"未在"+workshop+"上线！");
			}	
			
		}else	
		/*if(("自制件".equals(workshop)||"部件".equals(workshop)))*/{
			String busType=busNumber.split("-")[0];
			/*String bus_number_start="1";
			String bus_number_end="1";
			if(busNumber.split("#").length>1){
				String area=busNumber.split("#")[1];
				if(area.split("-").length>1){
					bus_number_start=area.split("-")[0];
					bus_number_end=area.split("-")[1];
				}					
			}*/
			
			if(productionDao.getBusTypeCount(busType)==0){
				result.put("success", false);
			    result.put("message", "自编号必须符合格式：‘车型-xxx’！");
			}/*else if(!StringUtils.isNumeric(bus_number_start)||!StringUtils.isNumeric(bus_number_end)){
				result.put("success", false);
			    result.put("message", "起始号和结束号必须为整数！");
			}else if(Integer.parseInt(bus_number_start)>Integer.parseInt(bus_number_end)){
				result.put("success", false);
			    result.put("message", "起始号不能大于结束号！");
			}*/else{
				i=productionDao.savePieceWorkHourInfo(swh_list);
				if(i>0){
					result.put("success", true);
				    result.put("message", "保存成功");
				}else{
					result.put("success", false);
				    result.put("message", "系统异常！保存失败");
				}
			}
		}
		
		return SUCCESS;
	}
	/**
	 * 技件工时更改页面
	 * @return
	 */
	public String updatePage(){
		BmsBaseUser user= getUser();
		return "updatePage";
	}
	
	public String updateBonus(){
		result=new HashMap<String,Object>();
		BmsBaseUser user=getUser();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("editorId", user.getId());
		conditionMap.put("editDate", createTime);
		
		int i=productionDao.updateBonusByBusNumber(conditionMap);
		if(i>0){
			result.put("success", true);
		    result.put("message", "修改成功");
		}else{
			result.put("success", false);
		    result.put("message", "系统异常！保存失败");
		}
		return SUCCESS;
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
				 object.put("approverId", user.getId());
				 object.put("approveDate", createTime);
				 object.put("status", "1");
				 object.put("actionType", "verify");
			 }else if("reject".equals(whflag)){
				 object.put("approverId", user.getId());
				 object.put("approveDate", createTime);
				 object.put("status", "2");
				 object.put("actionType", "verify");
			 }else{
				 object.put("editorId", user.getId());
				 object.put("editDate", createTime);
			 }
			 		 
			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
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
	public String caculateSalary(){
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		productionDao.caculateSalary(conditionMap);
		return null;
	}
	
	/**
	 * 删除工时信息
	 * @return
	 */
	public String deleteWorkHourInfo(){
		result=new HashMap<String,Object>();
		JSONObject jso=JSONObject.fromObject(conditions);
		String swhid=jso.containsKey("swhid")?jso.getString("swhid"):"";
		String busNumber=jso.containsKey("busNumber")?jso.getString("busNumber"):"";
		String workDate=jso.containsKey("workDate")?jso.getString("workDate"):"";
		String orgId=jso.containsKey("orgId")?jso.getString("orgId"):"";
		
		Map<String, Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("swhid", swhid);
		conditionMap.put("busNumber", busNumber);
		conditionMap.put("workDate", workDate);
		conditionMap.put("orgId", orgId);
		int i=productionDao.deleteWorkHourInfo(conditionMap);
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
	 * 计件工时审核页面
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
