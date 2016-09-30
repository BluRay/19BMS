package com.byd.bms.order.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.order.dao.IOrderDao;
import com.byd.bms.order.entity.BmsFactoryOrder;
import com.byd.bms.order.entity.BmsFactoryOrderDetail;
import com.byd.bms.order.entity.BmsOrder;
import com.byd.bms.order.entity.BmsOrderConfigAllot;
import com.byd.bms.order.entity.BmsOrderReviewResults;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class OrderAction extends BaseAction<BmsOrder>{

	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger ( OrderAction.class.getName());
	private IOrderDao orderDao;	
	private Pager pager;
	
	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public IOrderDao getOrderDao() {
		return orderDao;
	}

	public void setOrderDao(IOrderDao orderDao) {
		this.orderDao = orderDao;
	}

	public String index() throws UnsupportedEncodingException{
		return "index";
	}
	
	public String maintain(){
		return "maintain";
	}
	
	public String maintain2(){
		return "maintain2";
	}
	
	public String review(){
		return "review";
	}
	
	public String config(){
		return "config";
	}
	
	public String configAllot(){
		return "configAllot";
	}
	
	public String busnumber(){
		return "busnumber";
	}
	
	public String ordersearch(){
		return "ordersearch";
	}
	
	public String orderConfigAllot()throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::OrderConfigAllot " + curTime + " " + userid);
		
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		
		String configStr = request.getParameter("configStr");
		logger.info("---->configStr = " + configStr);
		String[] configStrArray=configStr.split(";");
		//分配数量不能小于该配置已生成车号数
		for(int i = 0; i < configStrArray.length; i++) {
			String[] configArray = configStrArray[i].split(",");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("order_id", request.getParameter("order_id"));
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			conditionMap.put("order_cofig_id", Integer.parseInt(configArray[0]));
			
			int busNumberCount = orderDao.getOrderBusNumberCount(conditionMap);
			logger.info("order_cofig_id :" + configArray[0] + " 已发布车号数 = " + busNumberCount);
			logger.info("order_cofig_id :" + configArray[0] + " 修改配置数量 = " + configArray[2]);
			if(Integer.parseInt(configArray[2]) < busNumberCount){
				PrintWriter out = null;
				JSONObject json = Util.dataListToJson(false,"配置编号："+configArray[0] + "的分配数量："+configArray[2]+"不能小于该配置已生成车号数：" + busNumberCount,null);
				try {
					out = response.getWriter();
				} catch (IOException e) {
					e.printStackTrace();
				}
				out.print(json);
				return null;
			}
			
		}
		
		//删除订单及工厂及原分配数据
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("order_id") != null) conditionMap.put("order_id", request.getParameter("order_id"));
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		orderDao.deleteOrderConfigAllot(conditionMap);
		
		for(int i = 0; i < configStrArray.length; i++) {
			String[] configArray = configStrArray[i].split(",");
			BmsOrderConfigAllot newConfigAllot = new BmsOrderConfigAllot();
			newConfigAllot.setOrder_id(Integer.parseInt(request.getParameter("order_id")));
			newConfigAllot.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
			newConfigAllot.setOrder_config_id(Integer.parseInt(configArray[0]));
			newConfigAllot.setProduct_qty(Integer.parseInt(configArray[2]));
			newConfigAllot.setSequence(Integer.parseInt(configArray[1]));
			newConfigAllot.setEditor_id(userid);
			newConfigAllot.setEdit_date(curTime);
			orderDao.insertOrderConfigAllot(newConfigAllot);
		}
		
		
//		BmsOrderConfigAllot configAllot = new BmsOrderConfigAllot();
//		configAllot.setOrder_id(Integer.parseInt(request.getParameter("order_id")));
//		configAllot.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
		
		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"修改成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings("rawtypes")
	public String reviewOrder()throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::reviewOrder " + curTime + " " + userid);
		
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		BmsOrderReviewResults orderReviewResult = new BmsOrderReviewResults();
		orderReviewResult.setId(Integer.parseInt(request.getParameter("id")));
		orderReviewResult.setFactory_order_id(Integer.parseInt(request.getParameter("factory_order_id")));
		orderReviewResult.setDeliery_date(request.getParameter("deliery_date"));
		orderReviewResult.setAssembly_online_date(request.getParameter("assembly_online_date"));
		
		orderReviewResult.setRisk_point_technics(request.getParameter("risk_point_technics"));
		orderReviewResult.setSolutions_technics(request.getParameter("solutions_technics"));
		orderReviewResult.setMeet_requirements_flag_technics(request.getParameter("meet_requirements_flag_technics"));
		
		orderReviewResult.setRisk_point_production(request.getParameter("risk_point_production"));
		orderReviewResult.setSolutions_production(request.getParameter("solutions_production"));
		orderReviewResult.setMeet_requirements_flag_production(request.getParameter("meet_requirements_flag_production"));
		
		orderReviewResult.setRisk_point_materiel(request.getParameter("risk_point_materiel"));
		orderReviewResult.setSolutions_materiel(request.getParameter("solutions_materiel"));
		orderReviewResult.setMeet_requirements_flag_materiel(request.getParameter("meet_requirements_flag_materiel"));
		
		orderReviewResult.setRisk_point_device(request.getParameter("risk_point_device"));
		orderReviewResult.setSolutions_device(request.getParameter("solutions_device"));
		orderReviewResult.setMeet_requirements_flag_device(request.getParameter("meet_requirements_flag_device"));
		
		orderReviewResult.setRisk_point_plan(request.getParameter("risk_point_plan"));
		orderReviewResult.setSolutions_plan(request.getParameter("solutions_plan"));
		orderReviewResult.setMeet_requirements_flag_plan(request.getParameter("meet_requirements_flag_plan"));
		
		orderReviewResult.setEdit_date(curTime);
		orderReviewResult.setEditor_id(userid);
		
		//判断BMS_ORDER_REVIEW_RESULTS中是否存在指定Factory_order_id ，存在则修改，不存在则添加
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("factory_order_id") != null) conditionMap.put("order_id", request.getParameter("factory_order_id"));
		List OrderReviewList = orderDao.getOrderReviewList(conditionMap);
		//logger.info("---->factory_order_id = " + request.getParameter("factory_order_id") + ";ListSize() = " + OrderReviewList.size());		
		BmsOrderReviewResults temp_orderReviewResult = (BmsOrderReviewResults) OrderReviewList.get(0);
		//logger.info("---->getFactory_order_id = " + temp_orderReviewResult.getFactory_order_id());
		if(temp_orderReviewResult.getFactory_order_id() == 0){
			logger.info("----> Add orderReviewResult");
			orderDao.insertOrderReviewResults(orderReviewResult);
		}else{
			logger.info("----> Edit orderReviewResult id=" + orderReviewResult.getId());
			orderDao.updateOrderReviewResults(orderReviewResult);
		}
		
		JSONObject json = Util.dataListToJson(true,"修改成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	public String editOrder2()throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::editOrder2 " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		BmsOrder order = new BmsOrder();
		order.setId(Integer.parseInt(request.getParameter("data_order_id")));
		order.setColor(request.getParameter("color"));
		order.setSeats(request.getParameter("seats"));
		order.setDelivery_date(request.getParameter("delivery_date"));
		order.setMemo(request.getParameter("memo"));
		orderDao.updateOrder(order);
		
		String factoryOrderNum = request.getParameter("factoryOrderNum");
		//add by wuxiao
		if(!"".equals(factoryOrderNum)){
		logger.info("---->factoryOrderNum = " + factoryOrderNum);
		//---->factoryOrderNum = 16:100,18:20,16:100,
		String[] strarray=factoryOrderNum.split(",");
		int busnum_start = 1;		//开始流水号
		int busnum_end = 1;			//开始流水号				
		//计算当前订单 车号起始值busNumberStart
		//查询当前订单当前工厂已发布的车辆数 存入bus_number_count 修改后的车辆数不能小于此数量
		
		//删除当前订单的全部工厂订单数据
		orderDao.deleteFactoryOrderDetail(request.getParameter("data_order_id"));
		orderDao.deleteFactoryOrder(request.getParameter("data_order_id"));
		
		//计算当前订单 车号起始值
		String productive_year = request.getParameter("productive_year");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("productive_year", productive_year);
		conditionMap.put("order_id", request.getParameter("data_order_id"));
		int busNumberStart = orderDao.getBusNumberStart(conditionMap);
		
		logger.info("---->busNumberStart = " + busNumberStart + "|productive_year = " + productive_year + "|order_id = " + request.getParameter("data_order_id"));

		for(int i = 0; i < strarray.length; i++) {			
			int factory_id = Integer.parseInt(strarray[i].substring(0, strarray[i].indexOf(":")));
			int production_qty = Integer.parseInt(strarray[i].substring(strarray[i].indexOf(":") + 1, strarray[i].indexOf("_")));
			//int bus_number_count = Integer.parseInt(strarray[i].substring(strarray[i].indexOf("_") + 1, strarray[i].length()));			
			int bus_number_start = Integer.parseInt(strarray[i].substring(strarray[i].indexOf("_") + 1, strarray[i].indexOf("|")));
			int bus_number_end = Integer.parseInt(strarray[i].substring(strarray[i].indexOf("|") + 1, strarray[i].length()));
			int bus_number_count = bus_number_end - bus_number_start + 1;
			
			logger.info("---->factory_id = " + factory_id + "|production_qty = " + production_qty + "|bus_number_start = " + bus_number_start + "|bus_number_end = " + bus_number_end);
			
			busnum_end = busnum_start + production_qty - 1;			
			//开始写入订单工厂表BMS_FACTORY_ORDER
			BmsFactoryOrder factoryOrder = new BmsFactoryOrder();
			factoryOrder.setOrder_id(Integer.valueOf(request.getParameter("data_order_id")));
			factoryOrder.setFactory_id(factory_id);
			factoryOrder.setProduction_qty(production_qty);
			//factoryOrder.setBus_number_start(busNumberStart);
			//busNumberStart+=production_qty;
			//factoryOrder.setBusnum_start(busnum_start);
			//factoryOrder.setBusnum_end(busnum_end);
			factoryOrder.setEditor_id(userid);
			factoryOrder.setEdit_date(curTime);
			//如果此工厂纪录已经存在，则修改工厂订单数量为累加值，均新增一条【BMS_FACTORY_ORDER_DETAIL】
			int factory_order_id = 0;
			Map<String,Object> conditionMap2=new HashMap<String,Object>();
			conditionMap2.put("order_id", Integer.valueOf(request.getParameter("data_order_id")));
			conditionMap2.put("factory_id", factory_id);
			factory_order_id = orderDao.getFactoryOrderID(conditionMap2);
			
			if(factory_order_id == 0){
				orderDao.insertFactoryOrder(factoryOrder);
				factory_order_id = factoryOrder.getId();
								
			}else{
				factoryOrder.setId(factory_order_id);
				orderDao.updateFactoryOrder(factoryOrder);
						
			}
			
			BmsFactoryOrderDetail factoryOrderDetail = new BmsFactoryOrderDetail();
			factoryOrderDetail.setFactory_order_id(factory_order_id);
			factoryOrderDetail.setBus_number_start(busNumberStart + bus_number_start);		//busNumberStart->bus_number_start
			factoryOrderDetail.setBus_number_count(bus_number_count);
			//busNumberStart+=production_qty;
			factoryOrderDetail.setBusnum_start(bus_number_start);	//取用户填写的起始号
			factoryOrderDetail.setBusnum_end(bus_number_end);
			factoryOrderDetail.setEditor_id(userid);
			factoryOrderDetail.setEdit_date(curTime);
			
			orderDao.insertFactoryOrderDetail(factoryOrderDetail);
			
			busnum_start = busnum_end + 1;
			
			//订单数据修改后，清除未上线的车号，同时清除该订单当天及以后的计划发布数据，
			//要求重新发布此订单今天及以后的计划，发布计划的同时再重新生成车号
			//统计 【BMS_FACTORY_ORDER_DETAIL】已上线的车辆数
			//orderDao.deleteUnDoPlanBus(Integer.valueOf(request.getParameter("data_order_id")));	
			orderDao.deleteUnDoPlanBusNumber(Integer.valueOf(request.getParameter("data_order_id")));		//同时删除【BMS_PLAN_BUS_NUMBER】【BMS_PLAN_BUS】中该订单未打印的车号
			
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("order_id", Integer.valueOf(request.getParameter("data_order_id")));
			updateMap.put("factory_id", factory_id);
			orderDao.updateFactoryOrderDetailCount(updateMap);
			
			Map<String,Object> updateMap2=new HashMap<String,Object>();
			updateMap2.put("order_id", Integer.valueOf(request.getParameter("data_order_id")));
			updateMap2.put("factory_id", factory_id);
			updateMap2.put("plan_date", curTime.substring(0, 10).replaceAll("-", ""));
			orderDao.deleteUnDoProductionPlan(updateMap2);
			
		}	
		}
		JSONObject json = Util.dataListToJson(true,"查询成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes", "null" })
	public String editOrder()throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::editOrder " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		//订单发布后不能修改
		
		
		BmsOrder order = new BmsOrder();
		order.setId(Integer.parseInt(request.getParameter("data_order_id")));
		order.setColor(request.getParameter("color"));
		order.setSeats(request.getParameter("seats"));
		order.setDelivery_date(request.getParameter("delivery_date"));
		order.setMemo(request.getParameter("memo"));
		orderDao.updateOrder(order);
		
		String factoryOrderNum = request.getParameter("factoryOrderNum");
		logger.info("---->factoryOrderNum = " + factoryOrderNum);
		//---->factoryOrderNum = 3:40,7:60,
		String[] strarray=factoryOrderNum.split(",");
		int busnum_start = 1;		//开始流水号
		int busnum_end = 1;			//开始流水号
				
		//计算当前订单 车号起始值busNumberStart
		//查询当前订单当前工厂已发布的车辆数 存入bus_number_count 修改后的车辆数不能小于此数量
		List factory_order_list=new ArrayList();
		factory_order_list = orderDao.getFactoryOrderList(Integer.parseInt(request.getParameter("data_order_id")));
		Map<Integer, Integer> map = new HashMap();
		
		for (int j=0;j<factory_order_list.size();j++){
			BmsFactoryOrder factoryOrder = (BmsFactoryOrder)factory_order_list.get(j);
			map.put(factoryOrder.getFactory_id(), factoryOrder.getBus_number_count());
			if (factoryOrder.getBus_number_count()>0){		//此工厂如果已经发布，则不能删除此工厂的数据
				String f_id = String.valueOf(factoryOrder.getFactory_id());
				if (factoryOrderNum.indexOf(f_id)<0){
					JSONObject json = Util.dataListToJson(false,"不能删除已发布的工厂生产数量！",null);
					try {
						out = response.getWriter();
					} catch (IOException e) {
						e.printStackTrace();
					}
					out.print(json);
					return null;
				}
			}
		}
		
		for(int i = 0; i < strarray.length; i++) {
			int factory_id = Integer.parseInt(strarray[i].substring(0, strarray[i].indexOf(":")));
			int production_qty = Integer.parseInt(strarray[i].substring(strarray[i].indexOf(":") + 1, strarray[i].length()));			
			
			for (int j=0;j<factory_order_list.size();j++){
				BmsFactoryOrder factoryOrder = (BmsFactoryOrder)factory_order_list.get(j);
				
				
				if (factoryOrder.getFactory_id() == factory_id){
					logger.info("---->factory_id = " + factory_id + ";production_qty = " + production_qty + ";已发布数=" + factoryOrder.getBus_number_count());
					if (production_qty < factoryOrder.getBus_number_count()){
						JSONObject json = Util.dataListToJson(false,"工厂计划数不能超过已发布数",null);
						try {
							out = response.getWriter();
						} catch (IOException e) {
							e.printStackTrace();
						}
						out.print(json);
						return null;
					}
				}
				
			}
		}
		
		//删除原数据
		orderDao.deleteFactoryOrder(request.getParameter("data_order_id"));

		String productive_year = request.getParameter("productive_year");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("productive_year", productive_year);
		conditionMap.put("order_id", Integer.parseInt(request.getParameter("data_order_id")));
		int busNumberStart = orderDao.getBusNumberStart(conditionMap) + 1;
		//int busNumberStart = orderDao.getBusNumberStart(productive_year) +1;
		logger.info("---->busNumberStart = " + busNumberStart);
		for(int i = 0; i < strarray.length; i++) {			
			int factory_id = Integer.parseInt(strarray[i].substring(0, strarray[i].indexOf(":")));
			int production_qty = Integer.parseInt(strarray[i].substring(strarray[i].indexOf(":") + 1, strarray[i].length()));			
			busnum_end = busnum_start + production_qty - 1;			
			//开始更新订单工厂表BMS_FACTORY_ORDER
			BmsFactoryOrder factoryOrder = new BmsFactoryOrder();
			//填充原完成数
			if(map.get(factory_id) !=null)factoryOrder.setBus_number_count( map.get(factory_id));
			
			factoryOrder.setOrder_id(Integer.parseInt(request.getParameter("data_order_id")));
			factoryOrder.setFactory_id(factory_id);
			factoryOrder.setProduction_qty(production_qty);
			factoryOrder.setBus_number_start(busNumberStart);
			busNumberStart+=production_qty;			
			factoryOrder.setBusnum_start(busnum_start);
			factoryOrder.setBusnum_end(busnum_end);
			factoryOrder.setEditor_id(1);
			factoryOrder.setEdit_date(curTime);			
			orderDao.insertFactoryOrder(factoryOrder);
			busnum_start = busnum_end + 1;
		}		
				
		JSONObject json = Util.dataListToJson(true,"修改成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	public String addOrder2() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::addOrder2 " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		BmsOrder order = new BmsOrder();
		order.setOrder_no(getOrderSerialByYear(request.getParameter("data_productive_year")));
		order.setOrder_name(request.getParameter("data_order_name"));
		order.setOrder_code(request.getParameter("data_order_code"));
		//added by xjw for adding order type on 2016-05-03
		order.setOrder_type(request.getParameter("data_order_type"));
		
		order.setBus_type_id(Integer.parseInt(request.getParameter("data_bus_type_id")));
		order.setOrder_qty(Integer.parseInt(request.getParameter("data_order_qty")));
		order.setProductive_year(request.getParameter("data_productive_year"));
		order.setColor(request.getParameter("color"));
		order.setSeats(request.getParameter("seats"));
		order.setDelivery_date(request.getParameter("delivery_date"));
		order.setStatus(request.getParameter("status"));
		order.setMemo(request.getParameter("memo"));
		order.setEditor_id(userid);
		order.setEdit_date(curTime);
		
		orderDao.insertOrder(order);
		int newOrderId = order.getId();		
		//logger.info("插入后主键为："+ order.getId());
		String factoryOrderNum = request.getParameter("factoryOrderNum");
		String[] strarray=factoryOrderNum.split(",");
		int busnum_start = 1;		//开始流水号
		int busnum_end = 1;			//开始流水号
		
		//计算当前订单 车号起始值
		String productive_year = request.getParameter("data_productive_year");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("productive_year", productive_year);
		conditionMap.put("order_id", newOrderId);
		int busNumberStart = orderDao.getBusNumberStart(conditionMap) + 1;
		
		logger.info("---->busNumberStart = " + busNumberStart);
		for(int i = 0; i < strarray.length; i++) {			
			int factory_id = Integer.parseInt(strarray[i].substring(0, strarray[i].indexOf(":")));
			int production_qty = Integer.parseInt(strarray[i].substring(strarray[i].indexOf(":") + 1, strarray[i].length()));			
			busnum_end = busnum_start + production_qty - 1;			
			//开始写入订单工厂表BMS_FACTORY_ORDER
			BmsFactoryOrder factoryOrder = new BmsFactoryOrder();
			factoryOrder.setOrder_id(newOrderId);
			factoryOrder.setFactory_id(factory_id);
			factoryOrder.setProduction_qty(production_qty);
			//factoryOrder.setBus_number_start(busNumberStart);
			//busNumberStart+=production_qty;
			//factoryOrder.setBusnum_start(busnum_start);
			//factoryOrder.setBusnum_end(busnum_end);
			factoryOrder.setEditor_id(userid);
			factoryOrder.setEdit_date(curTime);
			//如果此工厂纪录已经存在，则修改工厂订单数量为累加值，均新增一条【BMS_FACTORY_ORDER_DETAIL】
			int factory_order_id = 0;
			Map<String,Object> conditionMap2=new HashMap<String,Object>();
			conditionMap2.put("order_id", newOrderId);
			conditionMap2.put("factory_id", factory_id);
			factory_order_id = orderDao.getFactoryOrderID(conditionMap2);
			
			if(factory_order_id == 0){
				orderDao.insertFactoryOrder(factoryOrder);
				factory_order_id = factoryOrder.getId();
								
			}else{
				factoryOrder.setId(factory_order_id);
				orderDao.updateFactoryOrder(factoryOrder);
						
			}
			
			BmsFactoryOrderDetail factoryOrderDetail = new BmsFactoryOrderDetail();
			factoryOrderDetail.setFactory_order_id(factory_order_id);
			if(request.getParameter("data_order_type").equals("KD件")){
				factoryOrderDetail.setBus_number_start(0);
			}else{
				factoryOrderDetail.setBus_number_start(busNumberStart);
			}
			busNumberStart+=production_qty;
			factoryOrderDetail.setBusnum_start(busnum_start);
			factoryOrderDetail.setBusnum_end(busnum_end);
			factoryOrderDetail.setEditor_id(userid);
			factoryOrderDetail.setEdit_date(curTime);
			
			orderDao.insertFactoryOrderDetail(factoryOrderDetail);
			
			busnum_start = busnum_end + 1;
			
		}		
		JSONObject json = Util.dataListToJson(true,"查询成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	public String addOrder() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::addOrder " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		BmsOrder order = new BmsOrder();
		order.setOrder_no(getOrderSerialByYear(request.getParameter("data_productive_year")));
		order.setOrder_name(request.getParameter("data_order_name"));
		order.setOrder_code(request.getParameter("data_order_code"));
		order.setBus_type_id(Integer.parseInt(request.getParameter("data_bus_type_id")));
		order.setOrder_qty(Integer.parseInt(request.getParameter("data_order_qty")));
		order.setProductive_year(request.getParameter("data_productive_year"));
		order.setColor(request.getParameter("color"));
		order.setSeats(request.getParameter("seats"));
		order.setDelivery_date(request.getParameter("delivery_date"));
		order.setStatus(request.getParameter("status"));
		order.setMemo(request.getParameter("memo"));
		order.setEditor_id(userid);
		order.setEdit_date(curTime);
		
		orderDao.insertOrder(order);
		int newOrderId = order.getId();		
		//logger.info("插入后主键为："+ order.getId());
		String factoryOrderNum = request.getParameter("factoryOrderNum");
		String[] strarray=factoryOrderNum.split(",");
		int busnum_start = 1;		//开始流水号
		int busnum_end = 1;			//开始流水号
		
		//计算当前订单 车号起始值
		String productive_year = request.getParameter("data_productive_year");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("productive_year", productive_year);
		conditionMap.put("order_id", newOrderId);
		int busNumberStart = orderDao.getBusNumberStart(conditionMap) + 1;
		
		logger.info("---->busNumberStart = " + busNumberStart);
		for(int i = 0; i < strarray.length; i++) {			
			int factory_id = Integer.parseInt(strarray[i].substring(0, strarray[i].indexOf(":")));
			int production_qty = Integer.parseInt(strarray[i].substring(strarray[i].indexOf(":") + 1, strarray[i].length()));			
			busnum_end = busnum_start + production_qty - 1;			
			//开始写入订单工厂表BMS_FACTORY_ORDER
			BmsFactoryOrder factoryOrder = new BmsFactoryOrder();
			factoryOrder.setOrder_id(newOrderId);
			factoryOrder.setFactory_id(factory_id);
			factoryOrder.setProduction_qty(production_qty);
			factoryOrder.setBus_number_start(busNumberStart);
			busNumberStart+=production_qty;
			factoryOrder.setBusnum_start(busnum_start);
			factoryOrder.setBusnum_end(busnum_end);
			factoryOrder.setEditor_id(1);
			factoryOrder.setEdit_date(curTime);
			orderDao.insertFactoryOrder(factoryOrder);
			busnum_start = busnum_end + 1;
		}		
		JSONObject json = Util.dataListToJson(true,"查询成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	public String showOrderInfo(){
		
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showOrderDetailList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::showOrderDetailList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("search_order_no") != null) conditionMap.put("search_order_no", request.getParameter("search_order_no"));
		if (request.getParameter("search_order_name") != null) conditionMap.put("search_order_name", request.getParameter("search_order_name"));
		if (request.getParameter("search_productive_year") != null) conditionMap.put("search_productive_year", request.getParameter("search_productive_year"));
		if ((request.getParameter("search_factory") != "")&&(request.getParameter("search_factory") != null)) conditionMap.put("search_factory", Integer.valueOf(request.getParameter("search_factory")));
		if (request.getParameter("order_id") != null){
			conditionMap.put("order_id", request.getParameter("order_id"));
		}else{
			if (pager != null){
				conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
				conditionMap.put("pageSize", pager.getPageSize());
			}
		}	
				
		List datalist=new ArrayList();
		datalist=orderDao.getOrderDetailList(conditionMap);		
		//int totalCount=orderDao.getOrderTotalCount(conditionMap);	

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showOrderList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::showOrderList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("search_order_no") != null) conditionMap.put("search_order_no", request.getParameter("search_order_no"));
		if (request.getParameter("search_order_name") != null) conditionMap.put("search_order_name", request.getParameter("search_order_name"));
		if (request.getParameter("search_productive_year") != null) conditionMap.put("search_productive_year", request.getParameter("search_productive_year"));
		if ((request.getParameter("search_factory") != "")&&(request.getParameter("search_factory") != null)) conditionMap.put("search_factory", Integer.valueOf(request.getParameter("search_factory")));
		if (request.getParameter("order_id") != null){
			conditionMap.put("order_id", request.getParameter("order_id"));
		}else{
			if (pager != null){
				conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
				conditionMap.put("pageSize", pager.getPageSize());
			}
		}	
		
		
		List datalist=new ArrayList();
		datalist=orderDao.getOrderList(conditionMap);		
		int totalCount=orderDao.getOrderTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getOrderProgress() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::getOrderProgress " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("search_order_no") != null) conditionMap.put("search_order_no", request.getParameter("search_order_no"));
		if (request.getParameter("search_order_name") != null) conditionMap.put("search_order_name", request.getParameter("search_order_name"));
		if (request.getParameter("search_productive_year") != null) conditionMap.put("search_productive_year", request.getParameter("search_productive_year"));
		if ((request.getParameter("search_factory") != "")&&(request.getParameter("search_factory") != null)) conditionMap.put("search_factory", Integer.valueOf(request.getParameter("search_factory")));
		if (request.getParameter("order_id") != null) conditionMap.put("order_id", request.getParameter("order_id"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = orderDao.getOrderProgress(conditionMap);
		int totalCount=orderDao.getOrderProgressCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 查询订单配置分配列表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showOrderConfigAllotList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::showOrderConfigAllotList " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("search_order_no") != null) conditionMap.put("search_order_no", request.getParameter("search_order_no"));
		if (request.getParameter("search_order_name") != null) conditionMap.put("search_order_name", request.getParameter("search_order_name"));
		if (request.getParameter("search_productive_year") != null) conditionMap.put("search_productive_year", request.getParameter("search_productive_year"));
		if ((request.getParameter("search_factory") != "")&&(request.getParameter("search_factory") != null)) conditionMap.put("search_factory", Integer.valueOf(request.getParameter("search_factory")));
		if (request.getParameter("order_id") != null) conditionMap.put("order_id", request.getParameter("order_id"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist=orderDao.getOrderConfigAllotList(conditionMap);		
		int totalCount=orderDao.getOrderConfigAllotTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 查询订单评审列表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showOrderReviewList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::showOrderReviewList " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("search_order_no") != null) conditionMap.put("search_order_no", request.getParameter("search_order_no"));
		if (request.getParameter("search_order_name") != null) conditionMap.put("search_order_name", request.getParameter("search_order_name"));
		if (request.getParameter("search_productive_year") != null) conditionMap.put("search_productive_year", request.getParameter("search_productive_year"));
		if ((request.getParameter("search_factory") != "")&&(request.getParameter("search_factory") != null)) conditionMap.put("search_factory", Integer.valueOf(request.getParameter("search_factory")));
		if (request.getParameter("order_id") != null) conditionMap.put("order_id", request.getParameter("order_id"));
		
		List datalist=new ArrayList();
		datalist=orderDao.getOrderReviewList(conditionMap);		
		int totalCount=orderDao.getOrderReviewTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * @return 查询订单配置信息列表
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showOrderConfigList() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::showOrderConfigList " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("search_order_no") != null) conditionMap.put("search_order_no", request.getParameter("search_order_no"));
		if (request.getParameter("search_order_name") != null) conditionMap.put("search_order_name", request.getParameter("search_order_name"));
		if (request.getParameter("search_productive_year") != null) conditionMap.put("search_productive_year", request.getParameter("search_productive_year"));
		if (request.getParameter("order_id") != null) conditionMap.put("order_id", request.getParameter("order_id"));
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));

		List datalist=new ArrayList();
		datalist=orderDao.getOrderConfigList(conditionMap);		
		int totalCount=orderDao.getOrderConfigTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);						
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	public String orderConfigConfirm(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::orderConfigConfirm " + curTime + " " + userid);
		
		return "config";
	}	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String showOrderBusDetail() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::showOrderBusDetail " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		List datalist=new ArrayList();
		Map<String,Object> queryMap =new HashMap<String,Object>();
		queryMap.put("order_id", request.getParameter("order_id"));
		queryMap.put("factory_id", request.getParameter("factory_id"));
		datalist = orderDao.getOrderBusDetail(queryMap);
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String showBusNumber() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->OrderAction::showBusNumber " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		List datalist=new ArrayList();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("order_id",request.getParameter("order_id"));
		conditionMap.put("factory_id",request.getParameter("factory_id"));
		datalist = orderDao.getBusNumberByOrder(conditionMap);
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	/**
	 * AddBy:YangKe 150610 查询指定年份当前订单流水号
	 * @param year YYYY
	 * @return 
	 */
	public String getOrderSerialByYear(String year){
		String order_no = orderDao.getOrderSerial(year);
		String new_order_no = "";
		if (order_no == null){
			return "D" + year + "001";
		}
		int serial = Integer.parseInt(order_no.substring(5, 8)) + 1;
		if (serial < 10){
			new_order_no = order_no.substring(0, 5) + "00" + String.valueOf(serial);
		}else if (serial < 100){
			new_order_no = order_no.substring(0, 5) + "0" + String.valueOf(serial);
		}else{
			new_order_no = order_no.substring(0, 5) + String.valueOf(serial);
		}
		return new_order_no;		
	}
	
	
}
