package com.byd.bms.plan.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.order.entity.BmsFactoryOrder;
import com.byd.bms.order.entity.BmsOrder;
import com.byd.bms.plan.entity.BmsPDException;
import com.byd.bms.plan.entity.BusDispatchRecord;
import com.byd.bms.plan.entity.OrderDispatchRecord;
import com.byd.bms.plan.entity.PlanAmend;
import com.byd.bms.plan.entity.PlanBus;
import com.byd.bms.plan.entity.PlanBusNumber;
import com.byd.bms.plan.entity.PlanBusTransfer;
import com.byd.bms.plan.entity.PlanConfigIssedQty;
import com.byd.bms.plan.entity.PlanDispatch;
import com.byd.bms.plan.entity.PlanIssuance;
import com.byd.bms.plan.entity.PlanIssuanceCount;
import com.byd.bms.plan.entity.PlanIssuanceTotal;
import com.byd.bms.plan.entity.PlanMasterPlan;
import com.byd.bms.plan.entity.PlanProductionPlan;
import com.byd.bms.plan.entity.PlanVIN;
import com.byd.bms.plan.entity.planMasterIndex;
import com.byd.bms.util.entity.BmsBaseOperateChangeLog;

public interface IPlanDao {
	public int insertMasterPlan(PlanMasterPlan masterPlan);
	public List<planMasterIndex> getplanMasterIndex(Map<String,Object> queryMap);
	public int getplanMasterIndexCount(Map<String,Object> queryMap);
	
	public List<PlanMasterPlan> getPlanMasterList(Map<String,Object> queryMap);
	public List<Map<String,String>> getPlanIssed(Map<String,Object> queryMap);
	public int updatePlanMasterInfo(PlanMasterPlan masterPlan);
	
	public int insertOperateChangeLog(BmsBaseOperateChangeLog changLog);
	
	public List<PlanIssuance> checkPlanIssuanceList(Map<String,Object> queryMap);
	public List<PlanIssuance> getPlanIssuanceList(Map<String,Object> queryMap);
	public List<PlanIssuanceTotal> getPlanIssuanceTotal(Map<String,Object> queryMap);//查询发布总计划
	
	public List<PlanIssuanceCount> getPlanIssuanceCount(Map<String,Object> queryMap);
	public List<PlanConfigIssedQty> getPlanConfigIssedQty(Map<String,Object> queryMap);//获取当前配置已发布数量
	public List<PlanConfigIssedQty> getPlanConfigIssedQtyByOrderno(Map<String,Object> queryMap);//获取当前配置已发布数量
	
	public int getPlanConfigQty(int order_config_id); //获取当前工厂当前配置计划量
	
	public int insertPlanIssuance(PlanProductionPlan productionPlan);
	public List<PlanProductionPlan> getProductionPlanIssuanceList(Map<String,Object> queryMap);
	public List<Map<String,String>> checkProductionPlan(Map<String,Object> queryMap);//判断订单在指定月份是否有发布计划
	
	public int insertPlanBusNumber(PlanBusNumber busNumber);
	public int insertPlanBus(PlanBus bus);
	
	public int getFactoryOrderInfo(Map<String,Object> queryMap);
	public PlanBusNumber checkBusNumber(Map<String,Object> queryMap);
	public int getMaxNumByOrderNo(String order_no);
	public int updateFactoryOrderBusCount(Map<String,Object> queryMap);
	
	public int updateFactoryOrderDetail(int detail_id);
	
	public BmsOrder getOrderInfoByOrderNo(String order_no);
	public BmsOrder getOrderInfoByOrderID(String order_id);
	public String getOrderIdByConfigId(String config_id);
	
	public List<Map<String, Object>> getFactoryOrderDetail(Map<String,Object> queryMap);
	
	public List<Map<String,String>> getBusNumber(Map<String,Object> queryMap);
	public int getBusNumberCount(Map<String,Object> queryMap);
	public List<PlanVIN> getPlanVin(Map<String,Object> queryMap);
	public int getPlanVinCount(Map<String,Object> queryMap);
	public String getVinPrefixByOrderNo(String order_no);
	public String GetFactoryVinPrefix(int factory_id);
	public int insertPlanVin(PlanVIN vin);
	public int updatePlanVin(PlanVIN vin);
	public int updatePlanBus(PlanVIN vin);
	public int updatePlanBusStatus(Map<String,Object> queryMap);
	public int updatePlanBusTranIn(Map<String,Object> queryMap);	//半成口调入时修改【BMS_PLAN_BUS】
	public int insertBusTransferLog(PlanBusTransfer busTransfer);
	public int updateBusTransferLog(PlanBusTransfer busTransfer);
	public List<Map<String,String>> getBusInfo(String busNumber);
	public List<String> selectBusByMotorVin(PlanVIN vin); //根据VIN/左右电机查询车号，校验是否重复绑定
	
	public int getVinCountByYear(String year_code);
	
	public List<Map<String,String>> getBusTransferOutList(Map<String,Object> queryMap);
	public List<Map<String,String>> getBusTransferInList(Map<String,Object> queryMap);
	public List<Map<String,String>> getBusTransferHisList(Map<String,Object> queryMap);
	
	public List<PlanProductionPlan> getPlanAmendList(Map<String,Object> queryMap);
	public List<Map<String,String>> getPlanSerach(Map<String,Object> queryMap);
	public int insertPlanAmend(PlanAmend planAmend);
	public int deletePlanAmend(PlanAmend planAmend);
	public int getPlanRealCount(Map<String,Object> queryMap);			//查询订单完成实际完成数
	public List<Map<String,String>> getPlanSearchRealCount(List queryMapList);		//查询订单完成实际完成数[订单查询页面]
	public List<Map<String,String>> getPlanSearchAllRealCount(List queryMapList);	//查询订单累计完成数[订单查询页面]
	public List<Map<String,String>> checkVinBusnumber(List queryMapList);
	
	public int getPlanPartsRealCount(Map<String,Object> queryMap);
	public int getPlanPartsAllRealCount(Map<String,Object> queryMap);
	
	public int getPlanZzjRealCount(Map<String,Object> queryMap);
	public int getPlanZzjAllRealCount(Map<String,Object> queryMap);
	
	public String checkImportPlanFactory(Map<String,Object> queryMap);
	public List<Map<String,String>> getExceptionList(Map<String,Object> queryMap);
	public int getExceptionListCount(Map<String,Object> queryMap);
	public int updateExceptionInfo(BmsPDException exception);
	public int manageExceptionInfo(BmsPDException exception);
	public int addException(BmsPDException exception);
	
	public List<Map<String,String>> getPlanSearchPlanQty(Map<String,Object> queryMap);
	public int getPlanSearchRealQty(Map<String,Object> queryMap);
	public int getPlanSearchRealPartsQty(Map<String,Object> queryMap);
	public int getPlanSearchRealZzjQty(Map<String,Object> queryMap);
	public int getPlanSearchTotalMonthPlanQty(Map<String,Object> queryMap);
	public int getPlanSearchTotalRealQty(Map<String,Object> queryMap);
	public int getPlanSearchTotalRealPartsQty(Map<String,Object> queryMap);
	public int getPlanSearchTotalRealZzjQty(Map<String,Object> queryMap);
	public List<Map<String,String>> getPlanOrderList(Map<String,Object> queryMap);
	
	/**
	 * 发车模块
	 */
	public List<PlanDispatch> getDispatchPlanList(Map<String, Object> conditionMap);//获取发车计划列表
	public int getDispatchPlanCount(Map<String, Object> conditionMap);//获取发车计划总数
	public int getOrderDispatchQty(int orderId);//获取订单已计划发车数量
	public int insertDispatchPlan(PlanDispatch plan);//新增发车计划
	public int updateDispatchPlan(PlanDispatch plan);//编辑发车计划
	public List<PlanDispatch> getDispatchPlanToDoList();//获取未完成计划列表
	public PlanBus getBusInfoByBusNo(Map<String, Object> conditionMap);//获取车辆信息
	public List<Map<String,Object>> getBusToolList();//获取随车附件基础列表
	public int insertDispatchRecord(List<BusDispatchRecord> dispatchRecordList);//保存发车记录 
	public int updateBusDispatchDate(List<BusDispatchRecord> dispatchRecordList);//更新BUS表发车时间
	public int updateDispatchPlanStatus(PlanDispatch plan);//发车交接更新计划状态
	public List<OrderDispatchRecord> getOrderDispatchList(Map<String, Object> conditionMap);//根据订单编号查询该订单下附件交接记录
	public int insertOrderDispatchRecord(List<OrderDispatchRecord> odrlist);//订单附件交接记录保存
	public List<Map<String,Object>> getBusDispatchTotalList(Map<String, Object> conditionMap);//查询发车记录订单汇总
	public int getBusDispatchTotalCount(Map<String, Object> conditionMap);//查询发车记录订单汇总记录数
	public List<Map<String,Object>> getBusDispatchDetailList(Map<String, Object> conditionMap);//查询发车记录明细
	public int getBusDispatchDetailCount(Map<String, Object> conditionMap);//查询发车记录明细记录数
	public Map<String, String> queryBusByVinMotor(Map<String, Object> cdmap);//根据车号、vin、左右电机号查询车辆信息
	public Map<String,String> queryBusByVin(Map<String, Object> cdmap);//根据vin查询车辆信息
	public void updateVinMotor(Map<String, Object> cdmap);//更新vin号对应的vin、左右电机号
	public void updateBusVinMotor(Map<String, Object> cdmap);//更新vin号对应的vin、左右电机号
}
