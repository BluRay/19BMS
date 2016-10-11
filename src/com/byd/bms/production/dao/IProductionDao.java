package com.byd.bms.production.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.production.entity.BmsBus;
import com.byd.bms.production.entity.BmsProductionException;
import com.byd.bms.production.entity.BmsProductionHours;
import com.byd.bms.production.entity.BmsProductionPartsFinish;
import com.byd.bms.production.entity.BmsProductionWorkshopSupply;
import com.byd.bms.production.entity.BmsScan;
import com.byd.bms.production.entity.BmsTempOrder;

public interface IProductionDao {
	public BmsBus getBmsBusInfo(Map<String,Object> queryMap);
	public BmsScan getBmsLastScanInfo(Map<String,Object> queryMap);//查询【此车号】【此节点】最后一条扫描记录
	public int insertBmsScan(BmsScan scan);
	public int insertProductionException(BmsProductionException exception);
	
	public int updateBusScanStatus(Map<String,Object> queryMap);
	public List<Map<String,String>> getScanProcessInfo(Map<String,Object> queryMap);
	public List<Map<String,String>> getLastScanInfo(String bus_number);		//查询【此车号】最后一条扫描记录,不包含返修技改
	public List<Map<String,String>> getAllLastScanInfo(String bus_number);	//查询【此车号】最后一条扫描记录,包含返修技改
	public List<Map<String,String>> getScanOnline(Map<String,Object> queryMap);//判断是否经过当前车间的上线节点
	public List<Map<String,String>> getScanOnlineFiberglass(Map<String,Object> queryMap);//判断是否经过当前车间的上线节点(玻璃钢改为校验焊装下线)
	
	//add by wuxiao 2015/9/22
	public List<Map<String,String>> getOfflineScanInfo(Map<String,Object> queryMap);//获得是否在当前车间下线
	
	public List<Map<String,String>> getKeyProcessInfo(Map<String,Object> queryMap);
	public List<Map<String,String>> getWorkshopSupplyList(Map<String,Object> queryMap);
	public int getWorkshopSupplyListCount(Map<String,Object> queryMap);
	public int insertWorkshopSupply(BmsProductionWorkshopSupply workshopSupply);
	public List<BmsProductionWorkshopSupply> getWorkshopSupplyInfo(int workshopSupply_id);
	public int editWorkshopSupplyInfo(BmsProductionWorkshopSupply workshopSupply);
	/**
	 * added by xjw 160721 根据订单编号、工厂、车间查询总供货数
	 * @param queryMap
	 * @return
	 */
	public List<Map<String,String>> getSupplyTotalCount(Map<String,Object> queryMap);
	
	public int insertPartsfinish(BmsProductionPartsFinish partsFinish);
	public List<BmsProductionPartsFinish> getPartsfinishList(Map<String,Object> queryMap);
	public int getPartsfinishListCount(Map<String,Object> queryMap);
	public List<BmsProductionPartsFinish> getPartsfinishInfo(int partsFinish_id);
	public int editPartsfinishInfo(BmsProductionPartsFinish partsFinish);
	/**
	 * added by xjw 160801 
	 * 根据订单编号、工厂、零部件id查询该零部件上下线累计数量以及工厂订单生产数量
	 * @param queryMap
	 * @return
	 */
	public List<Map<String,String>> selectPartsFinishTotal(Map<String,Object> queryMap);
	
	public int updateBusCustomerNumber(Map<String,Object> queryMap);
	public List<Map<String,String>> getBusCustomerNumberList(Map<String,Object> queryMap);
	public int getBusCustomerNumberListCount(Map<String,Object> queryMap);
	public List<Map<String,String>> getBusCustomerNumberInfo(int bus_id);

	public int insertProductionHours(BmsProductionHours hours);
	public int updateProductionHours(BmsProductionHours hours);
	public List<BmsProductionHours> getProductionHoursList(Map<String,Object> queryMap);
	public int getProductionHoursListCount(Map<String,Object> queryMap);
	public List<BmsProductionHours> getProductionHoursInfo(int hours_id);
	public int editProductionHours(BmsProductionHours hours);
	
	public List<Map<String,String>> getBusColorList(Map<String,Object> queryMap);
	public int getBusColorListCount(Map<String,Object> queryMap);
	public int updateBusColorByOrder(Map<String,Object> queryMap);
	public int updateBusColorByBusNumber(Map<String,Object> queryMap);
	
	//add by wuxiao 2016/4/25
	public List<Map<String,String>> getBusCCCList(Map<String,Object> queryMap);
	public int getBusCCCListCount(Map<String,Object> queryMap);
	public int updateBusCCCByOrder(Map<String,Object> queryMap);
	public int updateBusCCCByBusNumber(Map<String,Object> queryMap);
	
	public List<Map<String,String>> getProductionDateList(Map<String,Object> queryMap);
	public int getProductionDateListCount(Map<String,Object> queryMap);
	public int updateProductionDateByOrder(Map<String,Object> queryMap);
	public int updateProductionDateByBusNumber(Map<String,Object> queryMap);
	//add by wuxiao end
	
	//add by xjw 查询车辆列表
	public List<Map<String,String>> queryBusList(Map<String,Object> queryMap);	
	public int queryBusListCount(Map<String, Object> queryMap);
	
	public List<Map<String,String>> getBusSeatsList(Map<String,Object> queryMap);
	public int getBusSeatsListCount(Map<String,Object> queryMap);
	public int updateBusSeatsByOrder(Map<String,Object> queryMap);
	public int updateBusSeatsByBusNumber(Map<String,Object> queryMap);
	public int updateBusProcessDate(Map<String,Object> queryMap);
	public String getVinByBusNumber(String busNumber);
	public String getLeftMotoByBusNumber(String busNumber);
	public String getRightMotoByBusNumber(String busNumber);
	
	public List<Map<String,String>> getCertificationList(Map<String,Object> queryMap);
	public int getCertificationCount(Map<String,Object> queryMap);

	public List<Map<String,String>> getProductionSearch(Map<String,Object> queryMap);
	public List<Map<String,String>> getProductionSearchCarinfo(Map<String,Object> queryMap);
	/**
	 * added by xjw 160720  查询WIP车辆信息
	 * @param bus_number
	 * @return
	 */
	public List<Map<String,String>> getProductionWIPBusInfo(Map<String,Object> queryMap);
	
	public List<Map<String,String>> getProductionSearchBusinfo(String bus_number);
	public List<Map<String,String>> getProductionSearchScan(String bus_number);
	//add by wuxiao 2015/9/30
	public List<Map<String,String>> getNamePlateInfo(String bus_number);
	public List<Map<String,String>> getCertificationInfo(String bus_number);
	//end
	public List<Map<String,String>> getProductionSearchException(String bus_number);
	
	/**
	 * 查询车号打印列表 added by xjw on 2015-08-03
	 * @param conditionMap
	 * @return List
	 */
	public List<Map<String,Object>> getBusNoPrintList(Map<String, Object> conditionMap);
	/**
	 * 更加工厂、订单、配置查询bus表中已分配的车号数量
	 * @param conditionMap
	 * @return
	 */
	public int getOrderConfigDoneQty(Map<String, Object> conditionMap);

	/**
	 * 查询车号打印列表总数 added by xjw on 2015-08-03
	 * @param conditionMap
	 * @return int
	 */
	public int getBusNoPrintCount(Map<String, Object> conditionMap);
	/**
	 * 打印后更新车号表打印次数，打印人，打印时间，打印状态
	 * @param busNoList
	 * @return
	 */
	public int updateBusPrint(Map<String,Object> conditionMap);
	/**
	 * 打印后更新bus表订单配置
	 * @param conditionMap
	 * @return
	 */
	public int updateBusConfig(Map<String,Object> conditionMap);
	/**
	 * 查询VIN码打印列表
	 * @return
	 */
	public List<Map<String,Object>> getVinPrintList(Map<String,Object> conditionMap);
	/**
	 * 查询VIN码打印列表总数 
	 * @return
	 */
	public int getVinPrintCount(Map<String,Object> conditionMap);
	/**
	 * 打印后更新VIN表打印次数，打印人，打印时间，打印状态
	 * @param vinList
	 * @return
	 */
	public int updateVinPrint(Map<String,Object> conditionMap);
	/**
	 * 保存左右电机号到bus表
	 * @param buslist
	 * @return
	 */
	public int updateBusMotorNumber(Map<String, Object> buslist);
	/**
	 * 保存左右电机号到Vin表
	 * @param buslist
	 * @return
	 */
	public int updateVinMotorNumber(Map<String, Object> buslist);
	/**
	 * 查询铭牌打印列表
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,Object>> getNameplatePrintList(Map<String, Object> conditionMap);
	/**
	 * 查询铭牌打印列表总数
	 * @param conditionMap
	 * @return
	 */
	public int getNameplatePrintCount(Map<String, Object> conditionMap);
	/**
	 * 打印后更新bus表nameplate打印人，打印时间
	 * @param conditionMap
	 * @return
	 */
	public int updateNameplatePrint(Map<String, Object> conditionMap);
	/**
	 * 临时派工单列表查询
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,String>> getTmpOrderList(Map<String, Object> conditionMap);
	/**
	 * 查询临时派工单总数
	 * @param conditionMap
	 * @return
	 */
	public int getTmpOrderCount(Map<String, Object> conditionMap);
	/**
	 * 查询
	 * @param conditionMap
	 * @return
	 */
	public Map<String,String> queryTempOrderInfo(String tempOrderId);
	/**
	 * 新增临时派工单
	 * @param tempOrder
	 * @return
	 */
	public int insertTmpOrder(BmsTempOrder tempOrder);
	/**
	 * 更改临时派工单
	 * @param tempOrder
	 * @return
	 */
	public int updateTmpOrder(BmsTempOrder tempOrder);
	/**
	 * 获取某一天临时派工单最大流水
	 * @param conditionMap
	 * @return
	 */
	public String getOrderSeriesByDate(String curDate);
	/**
	 * 批量审批
	 * @param ids
	 * @return
	 */
	public int batchApproveOrder(Map<String, Object> conditionMap);
	/**
	 * 分配订单
	 * @param order_list
	 * @return
	 */
	public int batchAssignOrder(List<Map<String, Object>> order_list);
	/**
	 * 查询员工工时明细
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,String>> queryStaffWorkHours(Map<String, Object> conditionMap);
	/**
	 * 查询员工工时列表总数
	 * @param conditionMap
	 * @return
	 */
	public int queryStaffWorkHoursCount(Map<String, Object> conditionMap);
	/**
	 * 保存临时工单工时信息
	 * @param conditionMap
	 * @return
	 */
	public int saveWorkHourInfo(List<Map<String, Object>> swh_list);
	/**
	 *  修改临时工单工时信息
	 * @param swh_list
	 * @return
	 */
	public int batchUpdateWorkHour(List<Map<String, Object>> swh_list);
	/**
	 * 批量验收临时工单
	 * @param conditionMap
	 * @return
	 */
	public int batchAcceptOrder(Map<String, Object> conditionMap);
	/**
	 * 驳回
	 * @param m
	 */
	public void rejectOrder(Map<String, Object> m);
	/**
	 * 批准
	 * @param m
	 */
	public void verifyOrder(Map<String, Object> m);
	/**
	 * 评估临时派工单
	 * @param order_list
	 * @return
	 */
	public int batchAssessTmpOrder(List<Map<String, Object>> order_list);
	/**
	 * 临时派工单工时分配明细
	 * @param tempOrderId
	 * @return
	 */
	public List<Map<String,String>> queryAssignList(String tempOrderId);
	/**
	 * 保存计件工时信息
	 * @param swh_list
	 * @return
	 */
	public int savePieceWorkHourInfo(List<Map<String, Object>> swh_list);
	/**
	 * 检验车号
	 * @param busNumber
	 * @return
	 */
	public int validateBusNumber(Map<String, Object> m);
	/**
	 * 删除工时信息
	 * @param conditionMap
	 * @return
	 */
	public int deleteWorkHourInfo(Map<String, Object> conditionMap);	
	/**
	 * 保存等待工时信息
	 * @param swh_list
	 * @return
	 */
	public int saveWaitWorkHourInfo(List<Map<String, Object>> swh_list);
	
	public int getBusTypeCount(String busType);
	/**
	 * 根据车号修改人员工时表中车辆对应的补贴车倍数bonus
	 * @param conditionMap
	 * @return
	 */
	public int updateBonusByBusNumber(Map<String, Object> conditionMap);
	/**
	 * 根据临时工单Id删除临时工单
	 * @param tempOrderId
	 * @return
	 */
	public int deleteTmpOrder(String tempOrderId);
	/**
	 * 保存临时派工单进度信息
	 * @param cmap
	 * @return 
	 */
	public int saveTmpOrderProcedure(Map<String, Object> cmap);
	/**
	 * @author xjw
	 * @method 根据临时派工单Id查询该工单产量维护明细
	 * @param cmap
	 * @return
	 */
	public List queryTmpOrderProcedureList(Map<String, Object> cmap);
	/**
	 * @author xjw
	 * @method 根据工厂、订单类型查询扫描逻辑配置
	 * @param factory_name
	 * @param orderType
	 * @return
	 */
	public String queryScanConfig(String factory, String orderType);
	
	/**
	 * @author xjw
	 * @param queryMap
	 * @return
	 */
	public BmsScan getBmsLastScanInfo_F(Map<String, Object> queryMap);
	/**
	 * @author xjw
	 * 根据process_id 查询计划节点
	 * @param process_id
	 * @return
	 */
	public List queryPlanNodeByProcess(int process_id);
	/**
	 * @author xjw
	 *	根据车号查询产品追踪卡模板id
	 * @param busNo
	 * @return
	 */
	public Integer getTrackTplHeaderIdByBusNo(String busNo);
	/**
	 * @author xjw
	 * 查询关键零部件列表
	 * @param queryMap
	 * @return
	 */
	public List queryPartsList(Map<String,Object> queryMap);
	/**
	 * 存储关键零部件扫描信息
	 * @param partsList
	 * @return
	 */
	public int savePartsInfo(List<Map<String, Object>> partsList);
	/**
	 * 工时审核时计算计件工时工资
	 * @param conditionMap
	 */
	public String caculateSalary(Map<String, Object> conditionMap);
	/**
	 * 工时审核时计算临时工单工时工资
	 * @param conditionMap
	 */
	public String caculateTmpSalary(Map<String, Object> conditionMap);
	/**
	 * 工时审核时计算等待工时工资
	 * @param conditionMap
	 */
	public String caculateWaitSalary(Map<String, Object> conditionMap);
	
	public void updateBusInfoByOrder(Map<String, Object> conditionMap);
	
	public void updateBusInfoByBusNumber(Map<String, Object> conditionMap);
	
	/**
	 * added by xjw 16/08/30 
	 * 保存计件工资信息（班组承包制）
	 * @param swh_list
	 * @return
	 */
	public int savePieceSalaryInfo(List<Map<String, Object>> swh_list);
	/**
	 * added by xjw 16/09/01 
	 * 批量更新BMS_PIECE_PAY_CAL表数据
	 * @param swh_list
	 * @return
	 */
	public int batchUpdatePiecePay(List<Map<String, Object>> swh_list);
	/**
	 * added by xjw 16/09/01 
	 * 删除BMS_PIECE_PAY_CAL表数据
	 * @param condMap
	 * @return
	 */
	public int deletePiecePay(Map<String, Object> condMap);
	/**
	 * added by xjw 16/09/02 
	 * 计件工时审核页面批量删除BMS_PIECE_PAY_CAL表数据，根据swh_list数据中的factory,workshop,workgroup,team,bus_number,work_date
	 * @param swh_list
	 */
	public void batchDeletePiecePay(List<Map<String, Object>> swh_list);
	/**
	 * added by xjw 16/09/08 
	 * 等待工时审核页面批量删除BMS_WAIT_PAY_CAL表数据
	 * @param swh_list
	 */
	public int batchUpdateWaitPay(List<Map<String, Object>> swh_list);
	/**
	 * added by xjw 16/09/08 
	 * 等待工时修改页面删除BMS_WAIT_PAY_CAL表数据
	 * @param conditionMap
	 */
	public int deleteWaitHourInfo(Map<String, Object> conditionMap);
	/**
	 * added by xjw 16/09/23
	 * 临时派工单查询派工流水号是否存在
	 * @param conditionMap
	 * @return
	 */
	public int querySerialNoCount(Map<String, Object> conditionMap);
	/**
	 * added by xjw 16/10/10
	 * 根据派工单流水号查询临时派工单
	 * @param order_serial_no
	 * @return orderId
	 */
	public int queryTempOrderBySeries(String order_serial_no);
}
