package com.byd.bms.selfcost.entity;

public class BmsCostSchedule {
	private int id;
	private int factory_id;
	private String cost_month;
	private String cost_detail_file;
	private int creator_id;
	private String create_date;
	
	private String factory_name;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFactory_id() {
		return factory_id;
	}
	public void setFactory_id(int factory_id) {
		this.factory_id = factory_id;
	}
	public String getCost_detail_file() {
		return cost_detail_file;
	}
	public void setCost_detail_file(String cost_detail_file) {
		this.cost_detail_file = cost_detail_file;
	}
	public int getCreator_id() {
		return creator_id;
	}
	public void setCreator_id(int creator_id) {
		this.creator_id = creator_id;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	public String getCost_month() {
		return cost_month;
	}
	public void setCost_month(String cost_month) {
		this.cost_month = cost_month;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}

}
