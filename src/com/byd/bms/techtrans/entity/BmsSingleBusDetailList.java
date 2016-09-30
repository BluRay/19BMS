package com.byd.bms.techtrans.entity;

public class BmsSingleBusDetailList {
	private Integer id;
	private String bus_number;
	private String order_id;
	private String process_name;
	private String status;
	private String username;
	private String confirmor_date;
	public String getBus_number() {
		return bus_number;
	}
	public void setBus_number(String bus_number) {
		this.bus_number = bus_number;
	}
	public String getOrder_id() {
		return order_id;
	}
	public void setOrder_id(String order_id) {
		this.order_id = order_id;
	}
	public String getProcess_name() {
		return process_name;
	}
	public void setProcess_name(String process_name) {
		this.process_name = process_name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getConfirmor_date() {
		return confirmor_date;
	}
	public void setConfirmor_date(String confirmor_date) {
		this.confirmor_date = confirmor_date;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
}
