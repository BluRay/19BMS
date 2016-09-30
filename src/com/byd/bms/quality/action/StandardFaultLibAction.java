package com.byd.bms.quality.action;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.StdFaultLibBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;
import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

public class StandardFaultLibAction extends BaseAction<Object>{

	private static final long serialVersionUID = 4346236640685662310L;
	private IQualityDao qualityDao;
	private Map<String,Object> result=new HashMap<String,Object>();
	private String conditions;
	private StdFaultLibBean faultLib;
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

	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public StdFaultLibBean getFaultLib() {
		return faultLib;
	}

	public void setFaultLib(StdFaultLibBean faultLib) {
		this.faultLib = faultLib;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	/**
	 * 标准故障库首页
	 */
	public String index(){
		return "index";
	}
	/**
	 * 查询标准故障库列表
	 */
	public String getFaultLibList(){
		if(pager==null){
			pager=new Pager();
		}
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			if(key.equals("faultLevel")||key.equals("faultType")){
				Object[] arr=jo.getJSONArray(key).toArray();
				conditionMap.put(key, arr);
			}else
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		//Map<String,Object> conditionMap=(Map<String, Object>) JSONObject.toBean(jo, Map.class);
		result.put("dataList", qualityDao.getFaultLibList(conditionMap));
		int totalCount = qualityDao.getFaultLibCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	/**
	 * 模糊查询标准故障库列表
	 */
	public String getFaultLibFuzzyList(){
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		//Map<String,Object> conditionMap=(Map<String, Object>) JSONObject.toBean(jo, Map.class);
		result.put("dataList", qualityDao.getFaultLibFuzzyList(conditionMap));
		return SUCCESS;
	}
	
	/**
	 * 新增记录
	 */
	public String addParamRecord(){
		result=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		faultLib.setEditorId(user_id);
		faultLib.setEditDate(createTime);
		int i=qualityDao.insertFaultLib(faultLib);
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
		int i=qualityDao.updateFaultLib(faultLib);
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
