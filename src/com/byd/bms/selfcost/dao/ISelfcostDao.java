package com.byd.bms.selfcost.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.selfcost.entity.BmsCostClassification;
import com.byd.bms.selfcost.entity.BmsCostSchedule;
import com.byd.bms.selfcost.entity.BmsCostSinglebusManufacturing;

public interface ISelfcostDao {
	public List<Map<String,String>> getCostDeptList();
	public int insertSingleBusManufacturing(BmsCostSinglebusManufacturing facturing);
	public int deleteSingleBusManufacturing(Map<String,Object> queryMap);
	public List<BmsCostSinglebusManufacturing> querySingleBusManufacturing(Map<String,Object> queryMap);

	public int insertClassification(BmsCostClassification classification);
	public int deleteClassification(Map<String,Object> queryMap);
	public List<BmsCostClassification> queryClassification(Map<String,Object> queryMap);
	
	public int insertSchedule(BmsCostSchedule schedule);
	public int deleteSchedule(Map<String,Object> queryMap);
	public int deleteScheduleById (int schedule_id);
	public List<BmsCostSchedule> querySchedule(Map<String,Object> queryMap);
	public int queryScheduleCount(Map<String,Object> queryMap);
	
	public int getFactory_id(String factory_name);
}
