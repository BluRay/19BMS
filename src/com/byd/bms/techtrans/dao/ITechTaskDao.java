package com.byd.bms.techtrans.dao;

import java.util.List;
import java.util.Map;

public interface ITechTaskDao {

	/**
	 * 技改任务维护
	 */
	public List<Map<String,Object>> querySingleTechTaskMaintain(Map<String,Object> conditionMap);
	public int addTechTaskMaintain(Map<String, Object> conditionMap);
	public int updateTechTaskMaintain(List<Map<String, Object>> conditionList);
	public int addChangedMaterialList(List<Map<String, Object>> conditionList);
	public int deleteChangedMaterialList(Map<String,Object> conditionMap);
	public List<Map<String,Object>> queryChangedMaterialList(Map<String,Object> conditionMap);	
	public List<Map<String,String>> queryTaskBaseInfo(Map<String, Object> conditionMap);	
	public List<Map<String,String>> queryTaskMaterielInfo(Map<String, Object> conditionMap);
	
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
	/**
	 * 根据订单、工厂查询各车间技改车辆数（全部切换）
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,Object>> queryTechBusNum_All(Map<String, Object> conditionMap);
	/**
	 * 根据订单、工厂查询各车间技改车辆数（节点前切换）
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,Object>> queryTechBusNum_Pre(Map<String, Object> conditionMap);
	/**
	 * 根据订单、工厂查询各车间技改车辆数（节点后切换）
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,Object>> queryTechBusNum_After(Map<String, Object> conditionMap);
	/**
	 * 根据订单、工厂查询各车间技改车辆明细列表（全部切换）
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,Object>> queryTechBusList_All(Map<String, Object> conditionMap);
	/**
	 * 根据订单、工厂查询各车间技改车辆明细列表（全部切换）
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,Object>> queryTechBusList_After(Map<String, Object> conditionMap);
	/**
	 * 根据订单、工厂查询各车间技改车辆明细列表（全部切换）
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,Object>> queryTechBusList_Pre(Map<String, Object> conditionMap);
	/**
	 * 向BMS_TECH_TASK_FOLLOW表中插入技改车辆信息
	 * @param followList
	 * @return
	 */
	public int insertTechFollowBus(List<Map<String, Object>> followList);
	/**
	 * 根据技改任务id删除BMS_TECH_TASK_FOLLOW表中技改车辆信息
	 * @param conditionMap
	 * @return
	 */
	public int deleteTechFollowBus(Map<String, Object> conditionMap);
	/**
	 * 根据技改任务id删除BMS_TECH_TASK_DETAIL表中技改分配信息
	 * @param conditionMap
	 * @return
	 */
	public int deleteTechTaskDetail(Map<String, Object> conditionMap);
	/**
	 * 向BMS_TECH_TASK_DETAIL表中插入技改任务信息
	 * @param conditionMap
	 */
	public void insertTechTaskDetail(Map<String, Object> conditionMap);
}
