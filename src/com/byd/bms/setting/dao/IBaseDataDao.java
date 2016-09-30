package com.byd.bms.setting.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.setting.entity.BusTypeBean;
import com.byd.bms.setting.entity.FactoryBean;
import com.byd.bms.setting.entity.HZBean;
import com.byd.bms.setting.entity.KeysBean;
import com.byd.bms.setting.entity.LineBean;
import com.byd.bms.setting.entity.PartsBean;
import com.byd.bms.setting.entity.ProcessBean;
import com.byd.bms.setting.entity.WorkgroupBean;
import com.byd.bms.setting.entity.WorkshopBean;
import com.byd.bms.util.entity.Pager;

public interface IBaseDataDao {
	//工厂
	public List<FactoryBean> getFactoryList(Map<String,Object> queryMap);
	public int getFactoryTotalCount(Map<String,Object> queryMap);
	public void updateFactory(FactoryBean factory);
	public void deleteFactory(List ids);
	public int checkDeleteFactory(List ids);
	public int addFactory(FactoryBean factory);
	
	//车间
	public List<WorkshopBean> getWorkshopList(Map<String,Object> queryMap);
	public int getWorkshopTotalCount(Map<String,Object> queryMap);
	public int addWorkshop(WorkshopBean workshop);
	public void updateWorkshop(WorkshopBean workshop);
	public void deleteWorkshop(List ids);
	public int checkDeleteWorkshop(List ids);
	//线别
	public List<LineBean> getLineList(Map<String,Object> queryMap);
	public int getLineTotalCount(Map<String,Object> queryMap);
	public int addLine(LineBean line);
	public void updateLine(LineBean line);
	public void deleteLine(List ids);
	public int checkDeleteLine(List ids);
	//工序
	public List<ProcessBean> getProcessList(Map<String,Object> queryMap);
	public int getProcessTotalCount(Map<String,Object> queryMap);
	public int addProcess(ProcessBean process);
	public void updateProcess(ProcessBean process);
	public void deleteProcess(List ids);
	//车间班组
	public List<WorkgroupBean> getWorkgroupList(Map<String,Object> queryMap);
	public int getWorkgroupTotalCount(Map<String,Object> queryMap);
	public int addWorkgroup(WorkgroupBean workgroup);
	public void updateWorkgroup(WorkgroupBean workgroup);
	public void deleteWorkgroup(List ids);
	//车型
	public List<BusTypeBean> getBusTypeList(Map<String,Object> queryMap);
	public int getBusTypeTotalCount(Map<String,Object> queryMap);
	public int addBusType(BusTypeBean busType);
	public void updateBusType(BusTypeBean busType);
	//弹性键
	public List<KeysBean> getKeysList(Map<String,Object> queryMap);
	public int getKeysTotalCount(Map<String,Object> queryMap);
	public int addKey(KeysBean key);
	public void updateKey(KeysBean key);
	public List<KeysBean> getKeysByKeyName(Map<String,Object> queryMap);
	//频率
	public int addHZ(HZBean hz);
	public List<HZBean> getHZList(Map<String,Object> queryMap);
	public int getHZTotalCount(Map<String,Object> queryMap);
	public int updateHZ(HZBean hz);
	//零部件
	public int addParts(PartsBean parts);
	public List<PartsBean> getPartsList(Map<String,Object> queryMap);
	public int getPartsTotalCount(Map<String,Object> queryMap);
	public int updateParts(PartsBean parts);
	public List<PartsBean> getParts(Map<String,Object> queryMap);
	
	public List<Map<String,String>> getProcessExistPlanId(Map<String,Object> queryMap);
}
