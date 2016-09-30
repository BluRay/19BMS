package com.byd.bms.plan.entity;

public class BusDispatchRecord {
	private int id;
	private int dispatch_plan_id;
	private String bus_number;
	private String dispatch_date;
	private int dispatcher_id;
	private String dispatcher;
	private String receiver;
	private String workcardid;
	private String department;
	private String batch_desc;
	private String flag_3c;
	private String number_3c;//3c编号
	private String qtys;
	
	public String getQtys() {
		return qtys;
	}
	public void setQtys(String qtys) {
		this.qtys = qtys;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getDispatch_plan_id() {
		return dispatch_plan_id;
	}
	public void setDispatch_plan_id(int dispatch_plan_id) {
		this.dispatch_plan_id = dispatch_plan_id;
	}
	public String getBus_number() {
		return bus_number;
	}
	public void setBus_number(String bus_number) {
		this.bus_number = bus_number;
	}
	public String getDispatch_date() {
		return dispatch_date;
	}
	public void setDispatch_date(String dispatch_date) {
		this.dispatch_date = dispatch_date;
	}
	public int getDispatcher_id() {
		return dispatcher_id;
	}
	public void setDispatcher_id(int dispatcher_id) {
		this.dispatcher_id = dispatcher_id;
	}
	public String getDispatcher() {
		return dispatcher;
	}
	public void setDispatcher(String dispatcher) {
		this.dispatcher = dispatcher;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public String getWorkcardid() {
		return workcardid;
	}
	public void setWorkcardid(String workcardid) {
		this.workcardid = workcardid;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getBatch_desc() {
		return batch_desc;
	}
	public void setBatch_desc(String batch_desc) {
		this.batch_desc = batch_desc;
	}
	public String getFlag_3c() {
		return flag_3c;
	}
	public void setFlag_3c(String flag_3c) {
		this.flag_3c = flag_3c;
	}
	public String getNumber_3c() {
		return number_3c;
	}
	public void setNumber_3c(String number_3c) {
		this.number_3c = number_3c;
	}
	
	
}
