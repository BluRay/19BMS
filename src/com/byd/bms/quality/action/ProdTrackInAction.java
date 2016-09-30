package com.byd.bms.quality.action;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.ProdTrackBean;
import com.byd.bms.quality.entity.ProdTrackHeaderBean;
import com.byd.bms.quality.entity.TrackTplHeaderBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class ProdTrackInAction extends BaseAction<Object>{

	private static final long serialVersionUID = 6570233086212424401L;
	private IQualityDao qualityDao;
	private String conditions;
	private Map<String,Object> result;
	private Pager pager;
	private List<ProdTrackBean> prodTrackList ;
	private ProdTrackHeaderBean trackHeader;
	public IQualityDao getQualityDao() {
		return qualityDao;
	}

	public void setQualityDao(IQualityDao qualityDao) {
		this.qualityDao = qualityDao;
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

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public List<ProdTrackBean> getProdTrackList() {
		return prodTrackList;
	}

	public void setProdTrackList(List<ProdTrackBean> prodTrackList) {
		this.prodTrackList =prodTrackList ;
	}

	public ProdTrackHeaderBean getTrackHeader() {
		return trackHeader;
	}

	public void setTrackHeader(ProdTrackHeaderBean trackHeader) {
		this.trackHeader = trackHeader;
	}

	/**
	 * 产品追踪卡录入首页
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
		result.put("dataList", qualityDao.getProdTrackHeaderList(conditionMap));
		int totalCount = qualityDao.getProdTrackHeaderCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	
	/**
	 * 产品追踪卡新增界面
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
		String busNo=(String) jo.get("busNo");
		String workshop=(String) jo.get("workshop");
		List<TrackTplHeaderBean> thblist=qualityDao.getTrackTplHeaderByBusNo(busNo);
		TrackTplHeaderBean tplHeader=new TrackTplHeaderBean();
		if(thblist.size()>0){
			tplHeader=qualityDao.getTrackTplHeaderByBusNo(busNo).get(0);
		}
		
		int tplHeaderId=tplHeader.getId();
		conditionMap.put("tplHeaderId", tplHeaderId);
		conditionMap.put("workshop", workshop);
		result.put("tplHeader", tplHeader);
		result.put("tplDetails", qualityDao.getTrackTplDetails(conditionMap));
		result.put("busInfo", qualityDao.queryBusInfoByBusNo(busNo));
		return SUCCESS;
	}
	
	/**
	 * 记录新增
	 */
	public String addRecord(){
		
		result=new HashMap<String,Object>();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factoryId", prodTrackList.get(0).getFactoryId());
		conditionMap.put("workshopId", prodTrackList.get(0).getWorkshopId());
		conditionMap.put("busNo", prodTrackList.get(0).getBusNo());
		
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		for(ProdTrackBean ptb:prodTrackList){
			ptb.setEditorId(user_id);
			ptb.setEditDate(createTime);
		}
		try{
			int i=qualityDao.getProdTrackList(conditionMap).size();
			if(i>0){
				result.put("success", false);
			    result.put("message", "不能重复添加");
			}else{
				qualityDao.insertProdTrack(prodTrackList);
				result.put("success", true);
			    result.put("message", "保存成功");
			    prodTrackList.clear();
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
		for(ProdTrackBean ptb:prodTrackList){
			ptb.setEditorId(user_id);
			ptb.setEditDate(createTime);
		}
		try{
			qualityDao.updateProdTrack(prodTrackList);
			result.put("success", true);
		    result.put("message", "保存成功");
		    prodTrackList.clear();
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
		List<ProdTrackBean> detailList=qualityDao.getProdTrackList(conditionMap);
		result.put("detailList", detailList);
		String busNo=(String) conditionMap.get("busNo");
		result.put("busInfo", qualityDao.queryBusInfoByBusNo(busNo));
		return SUCCESS;
	}
	
	/**
	 * 根据车号查询工厂信息
	 */
	public String getFactoryByBusNo(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		String busNo=(String) jo.get("busNo");
		result.put("factoryInfo", qualityDao.getFactoryByBusNo(busNo));
		return SUCCESS;
	}
}
