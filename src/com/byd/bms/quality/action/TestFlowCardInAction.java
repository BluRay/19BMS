package com.byd.bms.quality.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.TestFlowCardDetailBean;
import com.byd.bms.quality.entity.TestFlowCardHeaderBean;
import com.byd.bms.quality.entity.TestFlowTplHeaderBean;
import com.byd.bms.quality.entity.TestRecordDetailBean;
import com.byd.bms.quality.entity.TestTplHeaderBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class TestFlowCardInAction extends BaseAction<Object> {

	private static final long serialVersionUID = -1079080255768840661L;
	private IQualityDao qualityDao;
	private Map<String,Object> result;
	private String conditions;
	private Pager pager;
	private TestFlowCardHeaderBean header;
	private List<TestFlowCardDetailBean> detailList=new ArrayList<TestFlowCardDetailBean>();
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
	public TestFlowCardHeaderBean getHeader() {
		return header;
	}
	public void setHeader(TestFlowCardHeaderBean header) {
		this.header = header;
	}
	public List<TestFlowCardDetailBean> getDetailList() {
		return detailList;
	}
	public void setDetailList(List<TestFlowCardDetailBean> detailList) {
		this.detailList = detailList;
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
		result.put("dataList", qualityDao.getTestFlowCardHeaderList(conditionMap));
		int totalCount = qualityDao.getTestFlowCardHeaderCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	/**
	 *录入界面
	 */
	public String showRecordInPage(){
		
		return "addPage";
	}
	/**
	 * 录入界面-查询模板明细
	 */
	public String getRecordTplDetail(){
		result=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		String busNo=(String) jo.get("busNo");
		String workshop=(String) jo.get("workshop");
		int workshopId=(int) jo.get("workshopId");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("busNo", busNo);
		conditionMap.put("workshop", workshop);
		conditionMap.put("workshopId", workshopId);
		int i=qualityDao.getTestFlowCardHeaderCount(conditionMap);
		if(i>0){
			result.put("success", false);
		    result.put("message", "不能重复添加");
		}else{
			List<TestFlowTplHeaderBean> tplHeaderlist=qualityDao.getTestFlowTplHeaderByBusNo(conditionMap);
			int tplHeaderId=0;
			if(tplHeaderlist.size()>0){
				tplHeaderId=tplHeaderlist.get(0).getId();
				result.put("dataList",
						qualityDao.getTestFlowTplDetailList(tplHeaderId));
				result.put("header",tplHeaderlist.get(0));
				result.put("success", true);
			}
		}		
		return SUCCESS;
	}
	/**
	 * 新增
	 */
	public String addRecord(){
		result=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		header.setEdit_date(createTime);
		header.setEditor_id(user_id);
		try{	
			int i=qualityDao.insertTestFlowCardHeader(header);
			if(i>0){
				for(TestFlowCardDetailBean detail:detailList){
					detail.setTest_card_id(header.getId());
				}
				qualityDao.insertTestFlowCardDetail(detailList);
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
	 * 更新
	 */
	public String updateRecord(){
		result=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		header.setEdit_date(createTime);
		header.setEditor_id(user_id);
		try{	
			int i=qualityDao.updateTestFlowCardHeader(header);
			if(i>0){
				qualityDao.updateTestFlowCardDetail(detailList);
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
	 * 明细查询页面
	 */
	public String showDetail(){
		header=qualityDao.getTestFlowCardHeader(header.getId());
		return "detailPage";
	}
	/**
	 * 编辑界面
	 */
	public String showEditPage(){
		header=qualityDao.getTestFlowCardHeader(header.getId());
		return "editPage";
	}
	/**
	 * 明细查询 
	 */
	public String getRecordDetail(){
		result=new HashMap<String,Object>();
		result.put("dataList", qualityDao.getTestFlowCardDetailList(header.getId()));
		return SUCCESS;
	}
}
