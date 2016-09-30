package com.byd.bms.quality.action;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.QualityTargetBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class QualityTargetAction extends BaseAction<Object>{

	private static final long serialVersionUID = 4502048666430772299L;
	private IQualityDao qualityDao;
	private Map<String,Object> result;
	private QualityTargetBean qualityTarget;
	private String conditions;
	private Pager pager;
	
	public IQualityDao getQualityDao() {
		return qualityDao;
	}
	public void setQualityDao(IQualityDao qualityDao) {
		this.qualityDao = qualityDao;
	}
	public Map<String, Object> getResult() {
		return result;
	}
	public void setResult(Map<String, Object> result) {
		this.result = result;
	}
	public QualityTargetBean getQualityTarget() {
		return qualityTarget;
	}
	public void setQualityTarget(QualityTargetBean qualityTarget) {
		this.qualityTarget = qualityTarget;
	}
	public String getConditions() {
		return conditions;
	}
	public void setConditions(String conditions) {
		this.conditions = conditions;
	}
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	/**
	 * 质量目标参数维护首页
	 */
	public String index(){
		return "index";
	}
	/**
	 * 
	 */
	public String getParamRecordList(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=(Map<String, Object>) JSONObject.toBean(jo, Map.class);
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", qualityDao.getQualityTargetList(conditionMap));
		int totalCount = qualityDao.getQualityTargetCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	/**
	 * 新增记录
	 */
	public String addParamRecord(){
		result=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		qualityTarget.setEditorId(user_id);
		qualityTarget.setEditDate(createTime);
		int i=qualityDao.insertQualityTarget(qualityTarget);
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
	 * 修改记录
	 */
	public String updateParamRecord(){
		result=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		qualityTarget.setEditorId(user_id);
		qualityTarget.setEditDate(createTime);
		int i=qualityDao.updateQualityTarget(qualityTarget);
		if(i>0){
			result.put("success", true);
			result.put("message", "保存成功");
		}else{
			result.put("success", false);
			result.put("message", "保存失败");
		}
		return SUCCESS;
	}
}
