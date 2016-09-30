package com.byd.bms.techtrans.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.setting.entity.WorkshopBean;
import com.byd.bms.techtrans.entity.BmsEcnTask;
import com.byd.bms.techtrans.entity.BmsEcnTaskDetail;
import com.byd.bms.techtrans.entity.BmsEcnTime;
import com.byd.bms.techtrans.entity.BmsSingleBusDetailList;
import com.byd.bms.techtrans.entity.BmsSingleTaskFollow;
import com.byd.bms.techtrans.entity.BmsSingleTaskOrderList;
import com.byd.bms.techtrans.entity.BmsTaskDetailConfig;



public interface IEcnTaskDao {
	//技改任务分配首页查询
	public List<BmsTaskDetailConfig> getEcnTaskList(Map<String,Object> queryMap);
	//技改工时查询
	public List<BmsEcnTime> workshoptimeinfo(Map<String,Object> queryMap);
	
	public int getEcnTaskListCount(Map<String,Object> queryMap);
	public List<BmsEcnTaskDetail> queryEcnTaskDetailList(Map<String,Object> queryMap);
	public int getTaskDepartmentCount(Map<String,Object> queryMap);
	public int insertEcnTaskTime(BmsEcnTime newbmsecntime);
	public int editEcnTaskTime(BmsEcnTime newbmsecntime);
	public int deleteEcnTaskTime(List list);
	
	//thw
	public int addEcnTaskDetail(List<BmsEcnTaskDetail> ecnTaskDetailList);
	public int updateEcnTaskDetail(List<BmsEcnTaskDetail> ecnTaskDetailList);
	public int deleteEcnTaskDetail(List list);
	public List<Map<String,String>> getBusNumberByOrder(Map<String, Object> conditionMap);
	public List<Map<String,String>> getEcnTasksByBusNumber(Map<String, Object> conditionMap);
	
	
	//单任务跟进查询
	public List<BmsSingleTaskFollow> getSingleTaskList(Map<String,Object> queryMap);
	public int getSingleTaskListCount(Map<String,Object> queryMap);
	//单任务查询-订单明细查询
	public List<BmsSingleTaskOrderList> getSingleTaskOrderList(String taskid);
	//单任务查询-车辆详情显示
	public List<BmsSingleBusDetailList> getBusDetaillist(String taskid,String orderno,String factoryid);
	public List<BmsSingleBusDetailList> queryBusDetaillist(String taskid,String orderno,String factoryid);
	//单任务跟进-车辆明细状态更新
	public int updatetaskdetailstate(String taskdetailid,String detailstate,Integer userid,String curtime);
	//查询任务在所有车辆明细是否均已经完成
	public List<BmsEcnTaskDetail> queryTaskCompleteIsOK(String taskid);
	//更新任务状态
	public int updateTaskState(String taskid);
	//为技改任务表插入图片路径 
	public int updateEcnTaskPicSrc(String taskid,String oldpath,String newpath);
	public List<BmsEcnTask> getTaskDetail(String taskid);
	//单车跟进查询方法
	public List<BmsSingleTaskFollow> getsinglecartaskdetail(String busno);
	//单车跟进，更新车辆明细状态
	public int updatetaskdetailstateForSingleFollow(String taskid,String busno,Integer userid,String curtime);
	
	public int updateEcnDocument(String ecn_id);
	public int updateEcnNumber(String taskId,String ecnNumber);
	//查询技改员工工时信息
	public List<Map<String, String>> queryStaffWorkHours(Map<String, Object> map);
	//保存技改员工工时信息
	public int saveWorkHourInfo(List<Map<String, Object>> whlist);
	//更改技改员工工时信息
	public int batchUpdateWorkHour(List<Map<String, Object>> swh_list);
	//查询技改工时分配明细
	public List<Map<String, String>> queryAssignList(String taskid);
	//删除技改工时信息
	public int deleteWorkHourInfo(Map<String, String> conditionMap);
	//计算技改工资
	public void caculateEcnSalary(Map<String, Object> conditionMap);

}	
