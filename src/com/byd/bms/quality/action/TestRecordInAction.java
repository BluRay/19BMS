package com.byd.bms.quality.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.TestRecordDetailBean;
import com.byd.bms.quality.entity.TestRecordHeaderBean;
import com.byd.bms.quality.entity.TestTplHeaderBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class TestRecordInAction extends BaseAction<Object> {
	
	private static final long serialVersionUID = 3477902694366112976L;
	private IQualityDao qualityDao;
	private Map<String,Object> result;
	private String conditions;
	private Pager pager;
	private TestRecordHeaderBean header;
	private List<TestRecordDetailBean> detailList=new ArrayList<TestRecordDetailBean>();
	
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

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public TestRecordHeaderBean getHeader() {
		return header;
	}

	public void setHeader(TestRecordHeaderBean header) {
		this.header = header;
	}

	public List<TestRecordDetailBean> getDetailList() {
		return detailList;
	}

	public void setDetailList(List<TestRecordDetailBean> detailList) {
		this.detailList = detailList;
	}
	/**
	 * 品质模块首页
	 */
	public String qualityIndex(){
		return "qualityIndex";
	}
	
	/**
	 * 检验记录录入首页
	 */
	public String index(){
		return "index";
	}
	/**
	 * 检验记录列表查询
	 */
	public String getRecordList(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			if(key.equals("testResult")){
				Object[] arr=jo.getJSONArray(key).toArray();
				conditionMap.put(key, arr);
			}else
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", qualityDao.getTestRecordHeaderList(conditionMap));
		int totalCount = qualityDao.getTestRecordHeaderCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	/**
	 * 检验记录录入界面
	 */
	public String showRecordInPage(){
		
		return "recordin";
	}
	/**
	 * 检验记录录入界面-查询模板明细
	 */
	public String getRecordTplDetail(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		List<TestTplHeaderBean> tplHeaderlist=qualityDao.getTestTplHeaderListMatch(conditionMap);
		int tplHeaderId=0;
		if(tplHeaderlist.size()>0){
			tplHeaderId=tplHeaderlist.get(0).getId();
		}
		result.put("dataList",
				qualityDao.getTestTplDetailList(tplHeaderId));
		return SUCCESS;
	}
	/**
	 * 检验记录新增
	 */
	public String addRecord(){
		result=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		header.setEditDate(createTime);
		header.setEditorId(user_id);
		try{	
			int i=qualityDao.insertTestRecordHeader(header);
			if(i>0){
				for(TestRecordDetailBean detail:detailList){
					detail.setHeaderId(header.getId());
				}
				qualityDao.insertTestRecordDetail(detailList);
			}
			result.put("success", true);
		    result.put("message", "保存成功");
		}catch(Exception e){
			e.printStackTrace();
			result.put("success", false);
		    result.put("message", "保存失败");
		}				
		return SUCCESS;	
	}
	/**
	 * 检验记录更新
	 */
	public String updateRecord(){
		result=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		header.setEditDate(createTime);
		header.setEditorId(user_id);
		try{	
			int i=qualityDao.updateTestRecordHeader(header);
			if(i>0){
				qualityDao.updateTestRecordDetail(detailList);
			}
		}catch(Exception e){
			e.printStackTrace();
		}	
		result.put("success", true);
	    result.put("message", "保存成功");	
		return SUCCESS;	
	}
	/**
	 * 检验记录明细查询页面
	 */
	public String showDetail(){
		header=qualityDao.getTestRecordHeader(header.getId());
		return "detail";
	}
	/**
	 * 
	 */
	public String showEditPage(){
		header=qualityDao.getTestRecordHeader(header.getId());
		return "editPage";
	}
	/**
	 * 检验记录明细查询 
	 */
	public String getRecordDetail(){
		result=new HashMap<String,Object>();
		result.put("dataList", qualityDao.getTestRecordDetailList(header.getId()));
		return SUCCESS;
	}
	
}
