package com.byd.bms.techtrans.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.order.entity.BmsOrder;
import com.byd.bms.techtrans.entity.BmsEcnDocument;
import com.byd.bms.techtrans.entity.BmsEcnTask;

public interface IEcnDocumentDao {
	public List<BmsEcnDocument> getEcnDocumentList(Map<String,Object> queryMap);
	public int getEcnDocumentTotalCount(Map<String,Object> queryMap);
	public int addEcnDocument(BmsEcnDocument ecnDocument);
	public int editEcnDocument(BmsEcnDocument ecnDocument);
	public int deleteEcnDocument(List ecnIdList);
	
	public Map getFactoryOrderQty(Map<String,Object> queryMap);
	
	public int addEcnTask(BmsEcnTask ecnTask);
	public int editEcnTask(BmsEcnTask ecnTask);
	public int deleteEcnTask(List taskIdList);
	public List<BmsEcnTask> getEcnTaskList (Map<String,Object> queryMap);
	
	public int deleteEcnTaskDetail(List taskIdList);
	public void addEcnTime(Map<String, Object> pmap);
	public void deleteEcnTime(List taskIdList);
	public void editEcnTime(Map<String, Object> pmap);
}
