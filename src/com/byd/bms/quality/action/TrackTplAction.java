package com.byd.bms.quality.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.TrackTplDetailBean;
import com.byd.bms.quality.entity.TrackTplHeaderBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class TrackTplAction extends BaseAction<Object> {

	private static final long serialVersionUID = -5909985430305923598L;
	private Pager pager;
	private TrackTplHeaderBean tplHeader;
	private Map<String, Object> result ;
	private IQualityDao qualityDao;
	private String detailList;
	private List<TrackTplDetailBean> tplDetailList;
	
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	public TrackTplHeaderBean getTplHeader() {
		return tplHeader;
	}
	public void setTplHeader(TrackTplHeaderBean tplHeader) {
		this.tplHeader = tplHeader;
	}
	public Map<String, Object> getResult() {
		return result;
	}
	public void setResult(Map<String, Object> result) {
		this.result = result;
	}
	public IQualityDao getQualityDao() {
		return qualityDao;
	}
	public void setQualityDao(IQualityDao qualityDao) {
		this.qualityDao = qualityDao;
	}
	public String getDetailList() {
		return detailList;
	}
	public void setDetailList(String detailList) {
		this.detailList = detailList;
	}
	public List<TrackTplDetailBean> getTplDetailList() {
		return tplDetailList;
	}
	public void setTplDetailList(List<TrackTplDetailBean> tplDetailList) {
		this.tplDetailList = tplDetailList;
	}
	/**
	 * 产品追踪卡模板首页
	 */
	public String index(){
		return "index";
	}
	/**
	 * 产品追踪卡模板列表
	 */
	public String showTplList(){
		result = new HashMap<String, Object>();
		Map conditionMap = new HashMap();
		//封装查询条件
		conditionMap.put("busType", tplHeader.getBusType());
		conditionMap.put("order", tplHeader.getOrder());
		conditionMap.put("config", tplHeader.getConfig());
		conditionMap.put("workshop", tplHeader.getWorkshop());
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", qualityDao.getTrackTplHeaderList(conditionMap));
		int totalCount = qualityDao.getTrackTplHeaderTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	/**
	 * 产品追踪卡模板明细页面
	 */
	public String showTplDetailPage(){
		tplHeader=qualityDao.getTrackTplHeader(tplHeader.getId());
		return "showTplDetail";
	}
	/**
	 * 查询产品追踪卡模板明细
	 */
	public String getTplDetail() {
		result = new HashMap<String, Object>();
		Map<String, Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("tplHeaderId", tplHeader.getId());
		conditionMap.put("workshop", tplHeader.getWorkshop());
		result.put("dataList",
				qualityDao.getTrackTplDetailList(conditionMap));
		return SUCCESS;
	};
	/**
	 * 产品追踪卡模板编辑页面
	 */
	public String showTplDetailEditPage(){
		tplHeader=qualityDao.getTrackTplHeader(tplHeader.getId());
		return "showTplEdit";
	}
	/**
	 * 产品追踪卡模板编辑-明细保存
	 */
	public String updateTplDetail(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		tplDetailList=new ArrayList<TrackTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TrackTplDetailBean detail=(TrackTplDetailBean) JSONObject.toBean(object, TrackTplDetailBean.class);
			 tplDetailList.add(detail);
		}
		
		int i=qualityDao.updateTrackTplDetail(tplDetailList);
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
	 * 产品追踪卡模板复制
	 */
	public String showTplDetailCopyPage() {
		return "showTplCopy";
	};
	/**
	 * 产品追踪卡模板复制-明细保存
	 */
	public String addTplDetailCopy(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		tplDetailList=new ArrayList<TrackTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TrackTplDetailBean detail=(TrackTplDetailBean) JSONObject.toBean(object, TrackTplDetailBean.class);
			 tplDetailList.add(detail);
		}
		//TestTplDetailBean [] details=(TestTplDetailBean[]) JSONArray.toArray(jsonArray, TestTplDetailBean.class);
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		tplHeader.setEditDate(createTime);
		tplHeader.setEditorId(user_id);
		String version=Util.format(new Date(), "yyyyMMddHms");
		tplHeader.setVersion(version);
		qualityDao.insertTrackTplHeader(tplHeader);
		int insertHeaderId=tplHeader.getId();
		
		for(TrackTplDetailBean detail:tplDetailList){	
			detail.setTplRecordId(insertHeaderId);
		}
		Integer i = null;
		if(insertHeaderId>=0){
			i=qualityDao.insertTrackTplDetail(tplDetailList);
		}
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
