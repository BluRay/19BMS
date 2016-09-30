package com.byd.bms.report.dao;

import java.util.List;
import java.util.Map;

public interface IReportDao {
	//在制订单进度报表
	public List<Map<String,String>> getOrderSchedule();
	//工厂订单进度报表
	public List<Map<String,String>> getFactoryOrderSchedule(Map<String,Object> queryMap);
	
	public List<Map<String,String>> getPlanRate(Map<String,Object> queryMap);  //工厂计划达成率报表
	public List<Map<String,Object>> queryPlanQty(Map<String,Object> conditionMap);
	public List<Map<String,String>> getPlanSearchRealCount(List queryMapList);		//查询订单完成实际完成数[订单查询页面]
	public int getPlanPartsRealCount(Map<String,Object> conditionMap);
	public int getPlanZzjRealCount(Map<String,Object> conditionMap);
	
	//技改报表
	public List<Map<String,Object>> getEcnTime(Map<String,Object> conditionMap);//月技改总工时
	public List<Map<String,Object>> getEcnOrderSchedule(Map<String,Object> conditionMap);//订单技改进度 
	public List<Map<String,Object>> getEcnBusTypeReport(Map<String,Object> conditionMap);//车型技改分析
	
	//售后报表
	public List<Map<String,Object>> getAllAfterSaleProblems(Map<String,Object> conditionMap);//售后问题分类统计
	public List<Map<String,Object>> getFactoryAfterSaleProblems(Map<String,Object> conditionMap);//工厂售后问题
	public List<Map<String,Object>> getBusTypeAfterSaleProblems(Map<String,Object> conditionMap);//车型售后问题 
	public List<Map<String,Object>> getOrderAfterSaleProblems(Map<String,Object> conditionMap);//订单售后问题
	
	//成本报表
	public List<Map<String,Object>> getEcnCost(Map<String,Object> conditionMap);//月技改成本
	//add by wuxiao 2015/9/17
	public List<Map<String,Object>> getSingleBusManufacturingCost(Map<String,Object> conditionMap);//各车间单车制造费用
	public List<Map<String,Object>> getClassificationCost(Map<String,Object> conditionMap);//各车间月制造费用比例图
	public List<Map<String,Object>> getTotalCost(Map<String,Object> conditionMap);//各工厂总共制造费用
	
	//生产报表
	public List<Map<String,Object>> queryProductionDaily(Map<String,Object> conditionMap);//生产日报表
	public List<Map<String,Object>> queryProductionDailyChart(Map<String,Object> conditionMap);//生产日报表图形报表
	public List<Map<String,Object>> queryPauseReportData(Map<String,Object> conditionMap);//生产停线报表数据查询
	public List<Map<String,Object>> queryPausePieData(Map<String,Object> conditionMap);//生产停线报表饼图数据查询
	public List<Map<String,Object>> queryExceptionReportData(Map<String,Object> conditionMap);//生产异常报表数据查询
	
	//品质报表
	public List<Map<String,Object>> queryDPUData(Map<String, Object> conditionMap);//DPU报表
	public List<Map<String,Object>> queryDPUDetail(Map<String, Object> conditionMap);//DPU报表明细
	public int queryDPUDetailCount(Map<String, Object> conditionMap);//DPU报表明细数
	public List<Map<String,Object>> queryPassRateData(Map<String, Object> conditionMap);//一次校检合格率报表
	public List<Map<String,Object>> queryPassRateDetail(Map<String, Object> conditionMap);//一次校检合格率报表明细
	public int queryPassRateDetailCount(Map<String, Object> conditionMap);//一次校检合格率报表明细数
	public List<Map<String,Object>> queryProcessProblemData(Map<String, Object> conditionMap);//制程问题严重等级分布报表
	public List<Map<String,Object>> queryProcessProblemDetail(Map<String, Object> conditionMap);//制程问题严重等级分布报表明细
	public int queryProcessProblemCount(Map<String, Object> conditionMap);////制程问题严重等级分布报表明细数
	public List<Map<String,Object>> queryDPUScore(Map<String, Object> conditionMap);//查询各班组DPU得分
	public List<Map<String,Object>> queryProcessProlemScore(Map<String, Object> conditionMap);//查询各班组制程问题扣分
	public List<Map<String,Object>> queryWorkgroupList(Map<String, Object> conditionMap);//查询车间班组列表
	public List<Map<String,Object>> queryWProcessProblemDetail(Map<String, Object> conditionMap);//车间制程问题明细
	public int queryWProcessProblemCount(Map<String, Object> conditionMap);//车间制程问题明细数
	public List<Map<String,Object>> queryWProcessProblemData(Map<String, Object> conditionMap);//车间制程问题报表

}
