package com.byd.bms.aftersale.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.aftersale.entity.AfterSalesProblems;
import com.byd.bms.aftersale.entity.ImproveSalesProblems;

/**
 * 售后模块数据访问接口
 */
public interface IAfterSaleDao {
	public List<AfterSalesProblems> getAfterSalesProblemsList(Map<String,Object> queryMap);
	public int getAfterSalesProblemsTotalCount(Map<String,Object> queryMap);
	
	public int addAfterSaleProblem(AfterSalesProblems afterSalesProblems);
	public int modifyAfterSaleProblem(AfterSalesProblems afterSalesProblems);
	public Map<String,Object> getBusInfo(Map map);
	
	public List<ImproveSalesProblems> getImproveSalesProblemsList(Map<String,Object> queryMap);
	public int addImproveSalesProblems(ImproveSalesProblems improveSalesProblems);
	public int updateImproveSalesProblems(ImproveSalesProblems improveSalesProblems);
	public int updateAfterSaleProblem(ImproveSalesProblems improveSalesProblems);
	
	public List<AfterSalesProblems> getProblemsList(Map<String,Object> queryMap);
}
