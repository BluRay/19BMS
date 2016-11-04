package com.byd.bms.quality.action;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.OrderConfigBean;
import com.byd.bms.quality.entity.OrderConfigHeaderBean;
import com.byd.bms.quality.entity.OrderConfigTplHeaderBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class OrderConfigInAction extends BaseAction<Object> {

	private static final long serialVersionUID = -3996655126472800841L;
	private String conditions;
	private Map<String,Object> result;
	private Pager pager;
	private List<OrderConfigBean> ocList ;
	private OrderConfigHeaderBean ocHeader;
	private IQualityDao qualityDao;
	
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
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	public List<OrderConfigBean> getOcList() {
		return ocList;
	}
	public void setOcList(List<OrderConfigBean> ocList) {
		this.ocList = ocList;
	}
	public OrderConfigHeaderBean getOcHeader() {
		return ocHeader;
	}
	public void setOcHeader(OrderConfigHeaderBean ocHeader) {
		this.ocHeader = ocHeader;
	}
	public IQualityDao getQualityDao() {
		return qualityDao;
	}
	public void setQualityDao(IQualityDao qualityDao) {
		this.qualityDao = qualityDao;
	}
	/**
	 * 首页
	 */
	public String index(){
		return "index";
	}

	/**
	 * 查询列表信息
	 */
	public String showRecordList(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", qualityDao.getOrderConfigHeaderList(conditionMap));
		int totalCount = qualityDao.getOrderConfigHeaderCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	
	/**
	 * 新增界面
	 */
	public String recordAddPage(){
		return "addPage";
	}
	/**
	 * 新增界面模板查询
	 */
	public String getTplDetail(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		Map<String,Object> cMap=new HashMap<String,Object>();
		String busNo=(String) jo.get("busNo");
		String workshop=(String) jo.get("workshop");
		cMap.put("busNo", busNo);
		cMap.put("workshop", workshop);
		int tplsize=qualityDao.getOcTplHeaderByBusNo(cMap).size();
		OrderConfigTplHeaderBean tplHeader=null;
		if(tplsize>0){
			tplHeader=qualityDao.getOcTplHeaderByBusNo(cMap).get(0);
			int tplHeaderId=tplHeader.getId();
			conditionMap.put("tplHeaderId", tplHeaderId);
			conditionMap.put("workshop", workshop);
			result.put("tplHeader", tplHeader);
			result.put("tplDetails", qualityDao.getOcTplDetails(conditionMap));
		}else{
			result.put("tplHeader", null);
			result.put("tplDetails", null);
		}		
		
		return SUCCESS;
	}
	
	/**
	 * 记录新增
	 */
	public String addRecord(){
		
		result=new HashMap<String,Object>();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factoryId", ocList.get(0).getFactoryId());
		conditionMap.put("workshopId", ocList.get(0).getWorkshopId());
		conditionMap.put("busNo", ocList.get(0).getBusNo());
		
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		for(OrderConfigBean ocb:ocList){
			ocb.setEditorId(user_id);
			ocb.setEditDate(createTime);
		}
		try{
			int i=qualityDao.getOrderConfigList(conditionMap).size();
			if(i>0){
				result.put("success", false);
			    result.put("message", "不能重复添加");
			}else{
				qualityDao.insertOrderConfig(ocList);
				result.put("success", true);
			    result.put("message", "保存成功");
			    ocList.clear();
			}
			
		}catch(Exception e){
			e.printStackTrace();
			result.put("success", false);
		    result.put("message", "保存失败");
		}
		return SUCCESS;
	}
	
	/**
	 * 记录更新界面
	 */
	public String recordUpdatePage(){
		return "editPage";
	}
	
	/**
	 * 记录更新
	 */
	public String updateRecord(){
		
		result=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		for(OrderConfigBean ocb:ocList){
			ocb.setEditorId(user_id);
			ocb.setEditDate(createTime);
		}
		try{
			qualityDao.updateOrderConfig(ocList);
			result.put("success", true);
		    result.put("message", "保存成功");
		    ocList.clear();
		}catch(Exception e){
			e.printStackTrace();
			result.put("success", false);
		    result.put("message", "保存失败");
		}
		return SUCCESS;
	}
	
	/**
	 * 预览界面
	 */
	public String recordDetailPage(){
		
		return "detailPage";
	}
	/**
	 * 明细查询
	 */
	public String showRecordDetail(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			//System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		List<OrderConfigBean> detailList=qualityDao.getOrderConfigList(conditionMap);
		result.put("detailList", detailList);
		return SUCCESS;
	}
}
