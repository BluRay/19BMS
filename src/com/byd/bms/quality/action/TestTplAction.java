package com.byd.bms.quality.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.TestTplDetailBean;
import com.byd.bms.quality.entity.TestTplHeaderBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class TestTplAction extends BaseAction<Object> {

	private static final long serialVersionUID = 1618314131256864034L;
	private Map<String, Object> result ;
	private IQualityDao qualityDao;
	private TestTplHeaderBean testTplHeader;
	private TestTplDetailBean testTplDetail;
	private List<TestTplDetailBean> testTplDetailList;
	private String detailList;
	private Pager pager;

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

	public TestTplHeaderBean getTestTplHeader() {
		return testTplHeader;
	}

	public void setTestTplHeader(TestTplHeaderBean testTplHeader) {
		this.testTplHeader = testTplHeader;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public TestTplDetailBean getTestTplDetail() {
		return testTplDetail;
	}

	public void setTestTplDetail(TestTplDetailBean testTplDetail) {
		this.testTplDetail = testTplDetail;
	}

	public List<TestTplDetailBean> getTestTplDetailList() {
		return testTplDetailList;
	}

	public void setTestTplDetailList(List<TestTplDetailBean> testTplDetailList) {
		this.testTplDetailList = testTplDetailList;
	}
	
	public String getDetailList() {
		return detailList;
	}

	public void setDetailList(String detailList) {
		this.detailList = detailList;
	}

	/*
	 * 检验记录表模板列表页面
	 */
	public String index() {

		return "index";
	}

	/*
	 * 检验记录表模板列表
	 */
	public String showTestTplList() {
		result = new HashMap<String, Object>();
		Map conditionMap = new HashMap();
		conditionMap.put("busType", testTplHeader.getBusType());
		conditionMap.put("order", testTplHeader.getOrder());
		conditionMap.put("config", testTplHeader.getConfig());
		conditionMap.put("parts", testTplHeader.getParts());
		conditionMap.put("tpl_type", testTplHeader.getTplType());
		conditionMap.put("offset",
				(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", qualityDao.getTestTplHeaderList(conditionMap));
		int totalCount = qualityDao.getTestTplHeaderTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);

		return SUCCESS;
	}
	/*
	 * 检验记录表模板预览
	 */
	public String showTestTplDetailPage() {
		testTplHeader=qualityDao.getTestTplHeader(testTplHeader.getId());
		return "showTestTpl";
	};
	/*
	 * 查询检验记录表模板明细
	 */
	public String showTestTplDetail() {
		result = new HashMap<String, Object>();
		result.put("dataList",
				qualityDao.getTestTplDetailList(testTplHeader.getId()));
		return SUCCESS;
	};
	/*
	 * 检验记录表模板复制
	 */
	public String showTestTplDetailCopyPage() {
		return "showTestTplCopy";
	};
	/*
	 * 检验记录表模板复制-明细保存
	 */
	public String addTestTplDetailCopy(){
		result = new HashMap<String, Object>();
		//JSONObject jo=JSONObject.fromObject(detailList);
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		testTplDetailList=new ArrayList<TestTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TestTplDetailBean detail=(TestTplDetailBean) JSONObject.toBean(object, TestTplDetailBean.class);
			 testTplDetailList.add(detail);
		}
		//TestTplDetailBean [] details=(TestTplDetailBean[]) JSONArray.toArray(jsonArray, TestTplDetailBean.class);
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		testTplHeader.setEditDate(createTime);
		testTplHeader.setEditorId(user_id);
		String version=Util.format(new Date(), "yyyyMMddHHmmss");
		testTplHeader.setVersion(version);
		qualityDao.insertTestTplHeader(testTplHeader);
		int insertHeaderId=testTplHeader.getId();
		
		for(TestTplDetailBean detail:testTplDetailList){	
			detail.setTplRecordId(insertHeaderId);
		}
		Integer i = null;
		if(insertHeaderId>=0){
			i=qualityDao.insertTestTplDetail(testTplDetailList);
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
	/*
	 * 检验记录表模板编辑页面
	 */
	public String showTestTplDetailEditPage(){
		testTplHeader=qualityDao.getTestTplHeader(testTplHeader.getId());
		return "showTestTplEdit";
	}
	/*
	 * 检验记录表模板编辑-新增明细
	 */
	public String insertTestTplDetail(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		testTplDetailList=new ArrayList<TestTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TestTplDetailBean detail=(TestTplDetailBean) JSONObject.toBean(object, TestTplDetailBean.class);
			 testTplDetailList.add(detail);
		}
		int i=qualityDao.insertTestTplDetail(testTplDetailList);
		if(i>0){
			result.put("success", true);
			result.put("message", "新增成功");
		}else{
			result.put("success", false);
			result.put("message", "新增失败");
		}
		return SUCCESS;
	}
	/*
	 * 检验记录表模板编辑-删除明细
	 */
	public String deleteTestTplDetail(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		testTplDetailList=new ArrayList<TestTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TestTplDetailBean detail=(TestTplDetailBean) JSONObject.toBean(object, TestTplDetailBean.class);
			 testTplDetailList.add(detail);
		}
		int i=qualityDao.deleteTestTplDetail(testTplDetailList);
		if(i>0){
			result.put("success", true);
			result.put("message", "删除成功");
		}else{
			result.put("success", false);
			result.put("message", "删除失败");
		}
		return SUCCESS;
	}
	/*
	 * 检验记录表模板编辑-明细保存
	 */
	public String updateTestTplDetail(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		testTplDetailList=new ArrayList<TestTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TestTplDetailBean detail=(TestTplDetailBean) JSONObject.toBean(object, TestTplDetailBean.class);
			 testTplDetailList.add(detail);
		}
		qualityDao.updateTestTplHeader(testTplHeader);
		int i=qualityDao.updateTestTplDetail(testTplDetailList);
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
	 * 车型检验记录表模板首页
	 * @return
	 */
	public String carType(){
		
		return "car_type";
	}

}
