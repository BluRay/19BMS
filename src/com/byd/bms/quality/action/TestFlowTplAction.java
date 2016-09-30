package com.byd.bms.quality.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.TestFlowTplHeaderBean;
import com.byd.bms.quality.entity.TestFlowTplDetailBean;
import com.byd.bms.quality.entity.TestTplDetailBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class TestFlowTplAction extends BaseAction<Object>{

	private static final long serialVersionUID = -2972000690802127822L;
	private Pager pager;
	private TestFlowTplHeaderBean tplHeader;
	private Map<String, Object> result ;
	private IQualityDao qualityDao;
	private TransactionTemplate transactionTemplate;
	private String detailList;
	private List<TestFlowTplDetailBean> tplDetailList;
	
	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public TestFlowTplHeaderBean getTplHeader() {
		return tplHeader;
	}

	public void setTplHeader(TestFlowTplHeaderBean tplHeader) {
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

	public TransactionTemplate getTransactionTemplate() {
		return transactionTemplate;
	}

	public void setTransactionTemplate(TransactionTemplate transactionTemplate) {
		this.transactionTemplate = transactionTemplate;
	}

	public List<TestFlowTplDetailBean> getTplDetailList() {
		return tplDetailList;
	}

	public void setTplDetailList(List<TestFlowTplDetailBean> tplDetailList) {
		this.tplDetailList = tplDetailList;
	}

	//检验流程卡模板首页
	public String index(){
		
		return "index";
	}
	/*
	 * 检验流程卡模板列表
	 */
	public String showTplHeaderList(){
		result = new HashMap<String, Object>();
		Map conditionMap = new HashMap();
		//封装查询条件
		conditionMap.put("busType", tplHeader.getBusType());
		conditionMap.put("order", tplHeader.getOrder());
		conditionMap.put("config", tplHeader.getConfig());
		conditionMap.put("workshopId", tplHeader.getWorkshopId());
		conditionMap.put("offset",(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", qualityDao.getTestFlowTplHeaderList(conditionMap));
		int totalCount = qualityDao.getTestFlowTplHeaderTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);

		return SUCCESS;
	}
	/*
	 * 检验流程卡模板预览
	 */
	public String showTplDetailPage() {
		tplHeader=qualityDao.getTestFlowTplHeader(tplHeader.getId());
		return "showTplDetail";
	};
	/*
	 * 查询检验流程卡模板明细
	 */
	public String showTplDetail() {
		result = new HashMap<String, Object>();
		result.put("dataList",
				qualityDao.getTestFlowTplDetailList(tplHeader.getId()));
		return SUCCESS;
	};
	
	/*
	 * 检验流程卡模板复制
	 */
	public String showTplDetailCopyPage() {
		return "showTplCopy";
	};
	/*
	 * 检验流程卡模板复制-明细保存
	 */
	public String addTplDetailCopy(){

		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		tplDetailList=new ArrayList<TestFlowTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TestFlowTplDetailBean detail=(TestFlowTplDetailBean) JSONObject.toBean(object, TestFlowTplDetailBean.class);
			 tplDetailList.add(detail);
		}
		//TestTplDetailBean [] details=(TestTplDetailBean[]) JSONArray.toArray(jsonArray, TestTplDetailBean.class);
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		tplHeader.setEditDate(createTime);
		tplHeader.setEditorId(user_id);
		String version=Util.format(new Date(), "yyyyMMddHms");
		tplHeader.setVersion(version);
		transactionTemplate.execute(new TransactionCallbackWithoutResult(){

			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				try{
					Integer i = null;
					qualityDao.insertTestFlowTplHeader(tplHeader);
					int insertHeaderId=tplHeader.getId();
					
					for(TestFlowTplDetailBean detail:tplDetailList){	
						detail.setTplRecordId(insertHeaderId);
					}		
					if(insertHeaderId>=0){
						i=qualityDao.insertTestFlowTplDetail(tplDetailList);
					}
					if(i>0){
						result.put("success", true);
						result.put("message", "保存成功");
					}else{
						result.put("success", false);
						result.put("message", "保存失败");
					}
				}catch(Exception e){
					result.put("success", false);
					result.put("message", "保存失败");
					e.printStackTrace(); 
					status.setRollbackOnly(); 	
				}
				
			}
			
		});
			
		return SUCCESS;
	}
	/*
	 * 检验流程卡模板模板编辑页面
	 */
	public String showTplDetailEditPage(){
		tplHeader=qualityDao.getTestFlowTplHeader(tplHeader.getId());
		return "showTplEdit";
	}
	/*
	 * 检验流程卡模板模板编辑-新增明细
	 */
	public String insertTplDetail(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		tplDetailList=new ArrayList<TestFlowTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TestFlowTplDetailBean detail=(TestFlowTplDetailBean) JSONObject.toBean(object, TestFlowTplDetailBean.class);
			 tplDetailList.add(detail);
		}
		int i=qualityDao.insertTestFlowTplDetail(tplDetailList);
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
	 * 检验流程卡模板模板编辑-删除明细
	 */
	public String deleteTplDetail(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		tplDetailList=new ArrayList<TestFlowTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TestFlowTplDetailBean detail=(TestFlowTplDetailBean) JSONObject.toBean(object, TestFlowTplDetailBean.class);
			 tplDetailList.add(detail);
		}
		int i=qualityDao.deleteTestFlowTplDetail(tplDetailList);
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
	 * 检验流程卡模板模板编辑-明细保存
	 */
	public String updateTplDetail(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(detailList);	
		tplDetailList=new ArrayList<TestFlowTplDetailBean>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 TestFlowTplDetailBean detail=(TestFlowTplDetailBean) JSONObject.toBean(object, TestFlowTplDetailBean.class);
			 tplDetailList.add(detail);
		}
		qualityDao.updateTestFlowTplHeader(tplHeader);
		int i=qualityDao.updateTestFlowTplDetail(tplDetailList);
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
