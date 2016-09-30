package com.byd.bms.techtrans.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.techtrans.entity.BmsEcnTackTemp;
import com.byd.bms.techtrans.entity.BmsSwrDocument;

public interface ISwrDocumentDao {
	public List<BmsSwrDocument> getBmsSwrDocumentList(Map<String,Object> queryMap);
	public int getSWRNoticeTotalCount(Map<String,Object> queryMap);
	public int insertSWRNotice(BmsSwrDocument bmsSwrDocument);
	public int updateSWRNotice(BmsSwrDocument bmsSwrDocument);
	public void deleteSWRNotice(List ids);
	
	public List<Map> getTechTransList(Map<String,Object> queryMap);
	public int getTechTransTotalCount(Map<String,Object> queryMap);
	
	public List<BmsEcnTackTemp> getTechOrderItemList(Map<String,Object> queryMap);
	public List<BmsEcnTackTemp> getTechBusNumItemList(Map<String,Object> queryMap);
}
