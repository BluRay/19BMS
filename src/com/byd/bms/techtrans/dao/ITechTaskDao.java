package com.byd.bms.techtrans.dao;

import java.util.List;
import java.util.Map;

public interface ITechTaskDao {
	
	//by xjw start	
	/**
	 * 技改任务列表查询
	 */
	public List<Map<String,Object>> queryTechTaskList(Map<String,Object> conditionMap);
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
	/**
	 * 更新技改任务表中的数据
	 * @param cdmap
	 */
	public void updateTechTaskInfo(Map<String, Object> cdmap);
	/**
	 * 技改工时分配明细查询
	 * @param conditionMap
	 * @return
	 */
	public List workshoptimeinfo(Map<String, Object> conditionMap);
	/**
	 * 技改任务跟进车辆信息查询
	 * @param map
	 * @return
	 */
	public List queryTaskBusNumber(Map<String, Object> map);
	/**
	 * 员工技改工时明细查询
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String, String>> queryStaffWorkHours(Map<String, Object> conditionMap);
	/**
	 * 员工技改工时保存
	 * @param swh_list
	 * @return
	 */
	public int saveWorkHourInfo(List<Map<String, Object>> swh_list);
	/**
	 * 员工技改工时修改
	 * @param swh_list
	 * @return
	 */
	public int batchUpdateWorkHour(List<Map<String, Object>> swh_list);
	/**
	 * 计算技改工资
	 * @param conditionMap
	 */
	public void caculateEcnSalary(Map<String, Object> conditionMap);
	//by xjw end
	 
	
	//by yk start
	public List<Map<String,String>> queryTaskBaseInfo(Map<String, Object> conditionMap);	
	public List<Map<String,String>> queryTaskMaterielInfo(Map<String, Object> conditionMap);
	public List<Map<String,String>> queryTaskOrderInfo(Map<String, Object> conditionMap);
	public List<Map<String,String>> queryTaskOrderFinishInfo(Map<String, Object> conditionMap);
	public int checkTaskMaterial(Map<String, Object> conditionMap);
	public int queryTaskMaterialCheckCount(Map<String, Object> conditionMap);
	public int checkTask(Map<String, Object> conditionMap);
	public List<Map<String, String>> queryAssignList(String taskid);
	public List<Map<String, String>> queryTechTaskReport(Map<String, Object> conditionMap);
	public int queryTechTaskReportCount(Map<String, Object> conditionMap);
	public List<Map<String, String>> queryTechTaskReport2(Map<String, Object> conditionMap);
	public int queryTechTaskReportCount2(Map<String, Object> conditionMap);
	//by yk end
	
	
	//by wx start
	/**
	 * 技改任务维护查询
	 */
	public List<Map<String,Object>> queryTechTaskMaintainList(Map<String,Object> conditionMap);
	public int queryTechTaskMaintainListTotalCount(Map<String,Object> conditionMap);
	/**
	 * 技改任务维护
	 */
	public List<Map<String,Object>> querySingleTechTaskMaintain(Map<String,Object> conditionMap);
	public int addTechTaskMaintain(Map<String, Object> conditionMap);
	public int updateTechTaskMaintain(List<Map<String, Object>> conditionList);
	public int addChangedMaterialList(List<Map<String, Object>> conditionList);
	public int deleteChangedMaterialList(Map<String,Object> conditionMap);
	public List<Map<String,Object>> queryChangedMaterialList(Map<String,Object> conditionMap);	
	/**
	 * 技改工时评估
	 */
	public List<Map<String,Object>> queryTechWorkHourEstimateList(Map<String,Object> conditionMap);
	public int queryTechWorkHourEstimateListTotalCount(Map<String,Object> conditionMap);
	//public List<Map<String,Object>> querySingleTechWorkHourEstimate(Map<String,Object> conditionMap);
	public int updateTechWorkHourEstimate(List<Map<String, Object>> conditionList);
	
	/**
	 * 技改跟进
	 */
	public List<Map<String,Object>> queryTechFollowingUpList(Map<String,Object> conditionMap);
	public int queryTechFollowingUpListTotalCount(Map<String,Object> conditionMap);
	
	public List<Map<String,Object>> queryFollowingUpDetailList(Map<String,Object> conditionMap);
	public List<Map<String,Object>> queryFollowingUpDetailList1(Map<String,Object> conditionMap);
	public int updateFollowingUp(List<Map<String, Object>> conditionList);
	public int addFollowingUp1(Map<String, Object> conditionMap);
	public int updateWorkshopStatus2(List<Map<String, Object>> conditionList);
	//by wx end

}
