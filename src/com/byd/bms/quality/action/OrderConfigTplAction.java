package com.byd.bms.quality.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.OrderConfigTplDetailBean;
import com.byd.bms.quality.entity.OrderConfigTplHeaderBean;
import com.byd.bms.quality.entity.OrderConfigTplDetailBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class OrderConfigTplAction extends BaseAction<Object> {

	private static final long serialVersionUID = 2076916271395119857L;
	private Pager pager;
	private OrderConfigTplHeaderBean tplHeader;
	private Map<String, Object> result ;
	private IQualityDao qualityDao;
	private String detailList;
	private List<OrderConfigTplDetailBean> tplDetailList;
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	public OrderConfigTplHeaderBean getTplHeader() {
		return tplHeader;
	}
	public void setTplHeader(OrderConfigTplHeaderBean tplHeader) {
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
	public List<OrderConfigTplDetailBean> getTplDetailList() {
		return tplDetailList;
	}
	public void setTplDetailList(List<OrderConfigTplDetailBean> tplDetailList) {
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
		result.put("dataList", qualityDao.getOrderConfigTplHeaderList(conditionMap));
		int totalCount = qualityDao.getOrderConfigTplHeaderTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	/**
	 * 产品追踪卡模板明细页面
	 */
	public String showTplDetailPage(){
		tplHeader=qualityDao.getOrderConfigTplHeader(tplHeader.getId());
		return "showTplDetail";
	}
	/**
	 * 查询产品追踪卡模板明细
	 */
	public String getTplDetail() {
		result = new HashMap<String, Object>();
		Map<String, Object> conditionMap =new HashMap<String,Object>();
		conditionMap.put("tplHeaderId", tplHeader.getId());
		conditionMap.put("workshop", tplHeader.getWorkshop());
		result.put("dataList",
				qualityDao.getOrderConfigTplDetailList(conditionMap));
		return SUCCESS;
	};
	/**
	 * 产品追踪卡模板编辑页面
	 */
	public String showTplDetailEditPage(){
		tplHeader=qualityDao.getOrderConfigTplHeader(tplHeader.getId());
		return "showTplEdit";
	}
	/**
	 * 产品追踪卡模板编辑-明细保存
	 */
	public String updateTplDetail(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		tplDetailList=new ArrayList<OrderConfigTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 OrderConfigTplDetailBean detail=(OrderConfigTplDetailBean) JSONObject.toBean(object, OrderConfigTplDetailBean.class);
			 tplDetailList.add(detail);
		}
		
		int i=qualityDao.updateOrderConfigTplDetail(tplDetailList);
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
		tplDetailList=new ArrayList<OrderConfigTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 OrderConfigTplDetailBean detail=(OrderConfigTplDetailBean) JSONObject.toBean(object, OrderConfigTplDetailBean.class);
			 tplDetailList.add(detail);
		}
		//TestTplDetailBean [] details=(TestTplDetailBean[]) JSONArray.toArray(jsonArray, TestTplDetailBean.class);
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		tplHeader.setEditDate(createTime);
		tplHeader.setEditorId(user_id);
		String version=Util.format(new Date(), "yyyyMMddHms");
		tplHeader.setVersion(version);
		qualityDao.insertOrderConfigTplHeader(tplHeader);
		int insertHeaderId=tplHeader.getId();
		
		for(OrderConfigTplDetailBean detail:tplDetailList){	
			detail.setTplRecordId(insertHeaderId);
		}
		Integer i = null;
		if(insertHeaderId>=0){
			i=qualityDao.insertOrderConfigTplDetail(tplDetailList);
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
