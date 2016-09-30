package com.byd.bms.techtrans.entity;

import java.util.List;

import com.byd.bms.order.entity.BmsOrder;

/**
 * 技改单明细
 * @author dll1177762
 *
 */
public class BmsEcnTaskDetail {
	/**主键**/
	private int id;
	/**技改任务明细**/
	private String ecn_task_id;
	private int ecn_number;
	/**车号**/
	private String bus_number;
	/**订单编号**/
	private String  order_id;
	/**技改工厂**/
	private String factoryID;
	private String factory_name;
	/**技改状态**/
	private String status;
	/**确认人**/
	private String confirmor_id;
	private String user_name;
	/**确认时间**/
	private String  confirmor_date;
	private String process_name;
	
	
	public int getEcn_number() {
		return ecn_number;
	}
	public void setEcn_number(int ecn_number) {
		this.ecn_number = ecn_number;
	}
	public String getProcess_name() {
		return process_name;
	}
	public void setProcess_name(String process_name) {
		this.process_name = process_name;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getBus_number() {
		return bus_number;
	}
	public void setBus_number(String bus_number) {
		this.bus_number = bus_number;
	}
	
	public String getFactoryID() {
		return factoryID;
	}
	public void setFactoryID(String factoryID) {
		this.factoryID = factoryID;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getConfirmor_id() {
		return confirmor_id;
	}
	public void setConfirmor_id(String confirmor_id) {
		this.confirmor_id = confirmor_id;
	}
	public String getConfirmor_date() {
		return confirmor_date;
	}
	public void setConfirmor_date(String confirmor_date) {
		this.confirmor_date = confirmor_date;
	}
	public String getEcn_task_id() {
		return ecn_task_id;
	}
	public void setEcn_task_id(String ecn_task_id) {
		this.ecn_task_id = ecn_task_id;
	}
	public String getOrder_id() {
		return order_id;
	}
	public void setOrder_id(String order_id) {
		this.order_id = order_id;
	}
}
