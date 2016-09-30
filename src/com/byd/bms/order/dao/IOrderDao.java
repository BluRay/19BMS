package com.byd.bms.order.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.order.entity.BmsFactoryOrder;
import com.byd.bms.order.entity.BmsFactoryOrderDetail;
import com.byd.bms.order.entity.BmsOrder;
import com.byd.bms.order.entity.BmsOrderConfig;
import com.byd.bms.order.entity.BmsOrderConfigAllot;
import com.byd.bms.order.entity.BmsOrderReviewResults;

/**
 * @author Yangke 150609
 * 订单模块数据访问接口
 */
public interface IOrderDao {
	public List<BmsOrder> getOrderList();
	public int insertOrder(BmsOrder order);
	public int updateOrder(BmsOrder order);
	public int insertFactoryOrder(BmsFactoryOrder factoryorder);
	public int updateFactoryOrder(BmsFactoryOrder factoryorder);
	public int insertFactoryOrderDetail(BmsFactoryOrderDetail factoryorderdetail);
	
	public int deleteUnDoPlanBusNumber(int order_id);		//删除已生成未上线的车号
	public int deleteUnDoPlanBus(int order_id);				//删除已生成未上线的车辆
	public int updateFactoryOrderDetailCount(Map<String,Object> queryMap);	//统计 【BMS_FACTORY_ORDER_DETAIL】已上线的车辆数
	public int deleteUnDoProductionPlan(Map<String,Object> queryMap);		//清除该订单当天及以后的计划发布数据
	
	public int deleteFactoryOrder(String orderID);
	public int deleteFactoryOrderDetail(String orderID);
	public List<BmsFactoryOrder> getFactoryOrderList(int orderID);
	public int getFactoryOrderID(Map<String,Object> queryMap);
	
	public List<BmsOrder> getOrderList(Map<String,Object> queryMap);
	public List<BmsOrder> getOrderDetailList(Map<String,Object> queryMap);
	public BmsOrder getOrderInfo(String orderID);
	public int getOrderTotalCount(Map<String,Object> queryMap);
	public String getOrderSerial(String year);
	public List<BmsOrderReviewResults> getOrderReviewList(Map<String,Object> queryMap);
	public int getOrderReviewTotalCount(Map<String,Object> queryMap);
	public int insertOrderReviewResults(BmsOrderReviewResults orderReviewResults);
	public int updateOrderReviewResults(BmsOrderReviewResults orderReviewResults);
	public List<BmsOrderConfig> getOrderConfigList(Map<String,Object> queryMap);
	public int getOrderConfigTotalCount(Map<String,Object> queryMap);
	
	public int insertOrderConfig(BmsOrderConfig orderConfig);
	public int deleteOrderConfig(String order_no);
	public List<BmsOrderConfig> getOrderConfigInfo(int orderConfig_id);
	public int updateOrderConfigInfo(BmsOrderConfig order_config);
	
	public List<BmsOrderConfigAllot> getOrderConfigAllotList(Map<String,Object> queryMap);
	public int getOrderConfigAllotTotalCount(Map<String,Object> queryMap);
	public int deleteOrderConfigAllotByOrder(String order_no);
	
	public int insertOrderConfigAllot(BmsOrderConfigAllot orderConfigAttot);
	public int deleteOrderConfigAllot(Map<String,Object> queryMap);
	
	public int getBusNumberStart(Map<String,Object> queryMap); //计算指定年份的订单 车号起始值
	public List<Map<String,String>> getBusNumberByOrder(Map<String,Object> queryMap);
	
	public List<Map<String,String>> getOrderProgress(Map<String,Object> queryMap);
	public int getOrderProgressCount(Map<String,Object> queryMap);
	public List<Map<String,String>> getOrderBusDetail(Map<String,Object> queryMap);
	
	public int getProductionPlanCount(String order_no);
	public int getOrderBusNumberCount(Map<String,Object> queryMap);
	public int getAllOrderBusNumberCount(Map<String,Object> queryMap);

}
