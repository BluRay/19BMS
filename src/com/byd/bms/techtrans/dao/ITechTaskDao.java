package com.byd.bms.techtrans.dao;

import java.util.List;
import java.util.Map;

public interface ITechTaskDao {
	/**
	 * 技改任务列表查询
	 */
	public List<Map<String,Object>> queryTechTaskList(Map<String,Object> conditionMap);
	/**
	 * 技改任务维护查询
	 */
	public List<Map<String,Object>> queryTechTaskMaintainList(Map<String,Object> conditionMap);
	public int queryTechTaskMaintainListTotalCount(Map<String,Object> conditionMap);
	/**
	 * 技改任务列表数量查询
	 * @param conditionMap
	 * @return
	 */
	public int queryTechTaskListCount(Map<String,Object> conditionMap);
	/**
	 * 根据技改任务id、订单编号查询技改实施范围信息列表
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String, Object>> queryTechList( Map<String, Object> conditionMap);
	/**
	 * 根据订单编号查询工厂订单列表
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String, Object>> queryFactoryOrderList(Map<String, Object> conditionMap);
}