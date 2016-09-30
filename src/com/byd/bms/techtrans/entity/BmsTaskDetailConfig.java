package com.byd.bms.techtrans.entity;

public class BmsTaskDetailConfig {
	private int countbusnum;//已分配车号总数
	private int task_number;//技改任务号
	private String ecn_number;//总技改台数
	private String task_content;
	private String ecn_document_number;
	private int order_id;
	private String orderno;
	private String order_desc;
	private String  switch_mode;
	private String factory_code;
	private String factory_name;
	private int total_hours;
	private String status;
	private String taskid;
	private String factoryid;
	private int isConfig;
	
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public int getTask_number() {
		return task_number;
	}
	public void setTask_number(int task_number) {
		this.task_number = task_number;
	}
	public String getEcn_number() {
		return ecn_number;
	}
	public void setEcn_number(String ecn_number) {
		this.ecn_number = ecn_number;
	}
	public String getOrder_desc() {
		return order_desc;
	}
	public void setOrder_desc(String order_desc) {
		this.order_desc = order_desc;
	}
	public String getTaskid() {
		return taskid;
	}
	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}
	public int getCountbusnum() {
		return countbusnum;
	}
	public void setCountbusnum(int countbusnum) {
		this.countbusnum = countbusnum;
	}
	public String getTask_content() {
		return task_content;
	}
	public void setTask_content(String task_content) {
		this.task_content = task_content;
	}
	public String getEcn_document_number() {
		return ecn_document_number;
	}
	public void setEcn_document_number(String ecn_document_number) {
		this.ecn_document_number = ecn_document_number;
	}
	public String getSwitch_mode() {
		return switch_mode;
	}
	public void setSwitch_mode(String switch_mode) {
		this.switch_mode = switch_mode;
	}
	public String getFactory_code() {
		return factory_code;
	}
	public void setFactory_code(String factory_code) {
		this.factory_code = factory_code;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public int getTotal_hours() {
		return total_hours;
	}
	public void setTotal_hours(int total_hours) {
		this.total_hours = total_hours;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getOrderno() {
		return orderno;
	}
	public void setOrderno(String orderno) {
		this.orderno = orderno;
	}
	public String getFactoryid() {
		return factoryid;
	}
	public void setFactoryid(String factoryid) {
		this.factoryid = factoryid;
	}
	public int getIsConfig() {
		return isConfig;
	}
	public void setIsConfig(int isConfig) {
		this.isConfig = isConfig;
	}
}
