package com.byd.bms.hr.dao;

import java.util.List;
import java.util.Map;

public interface IOrgDao {
	public List<Map<String,Object>> getOrgData(Map<String,Object> conditionMap);
	public int addOrgData(Map<String,Object> conditionMap);
	public int editOrgData(Map<String,Object> conditionMap);
	public int sortOrgData(Map<String,Object> conditionMap);
	public int deleteOrgData(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getOrgDeptList(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getWorkGroupList(Map<String,Object> conditionMap);
	/**
	 * 根据工厂、车间、班组、小班组 信息查询org信息
	 * @param conditionMap small_workgroup、workgroup、workshop、factory
	 * @return
	 */
	public Map<String,Object> getOrgInfo(Map<String,Object> conditionMap);
	
	/**
	 * 根据工厂/部门、科室、车间、班组、小班组 信息查询org信息
	 * @param conditionMap small_workgroup、workgroup、workshop、factory
	 * @return
	 */
	public List<Map<String,Object>> getOrg(List<Map<String,Object>> conditionMap);
	
	public int addPositionData(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getParentPositionList(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getPositionData(Map<String,Object> conditionMap);
	public int editPositionData(Map<String,Object> conditionMap);
	public int deletePositionData(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getPositionGradeList();
	
	public int addStandardPositionData(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getStandardPositionData(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getWorkRelationshipChart(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getStandardPositionFuzzySelect(Map<String,Object> conditionMap);
	public int deleteStandardPositionData(Map<String,Object> conditionMap);
	
	public List<Map<String,Object>> getStandardHumanData(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getBusTypeData();
	public int addStandardHumanData(Map<String,Object> conditionMap);
	public int editStandardHumanData(Map<String,Object> conditionMap);
	
	public List<Map<String,Object>> getHumanConfigurationData(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getBusTypeData1(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getRealHumanData(Map<String,Object> conditionMap);
	public List<Map<String,Object>> getHumanDetailData(Map<String,Object> conditionMap);
	
	public List<Map<String,Object>> getFactoryCapacityData(Map<String,Object> conditionMap);
	public int addFactoryCapacityData(Map<String,Object> conditionMap);
	
	public List<Map<String,Object>> queryIsCustomerList(Map<String, Object> conditionMap);
	public int queryIsCustomerCount(Map<String, Object> conditionMap);
	public int updateIsCustomer(Map<String,Object> conditionMap);
}
