package com.byd.bms.selfcost.entity;

public class BmsCostClassification {
	private int id;
	private int factory_id;
	private int cost_department_id;
	private String cost_month;
	private String machine_cost;
	private String tooling_cost;
	private String other_materials_cost;
	private String other_cost;
	private String fuel_power_cost;
	private String labor_cost;
	private String total_cost;
	private int creator_id;
	private String create_date;
	
	private String factory_name;
	private String cost_department_name;
	
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
	public int getCost_department_id() {
		return cost_department_id;
	}
	public void setCost_department_id(int cost_department_id) {
		this.cost_department_id = cost_department_id;
	}
	public String getCost_month() {
		return cost_month;
	}
	public void setCost_month(String cost_month) {
		this.cost_month = cost_month;
	}
	public String getMachine_cost() {
		return machine_cost;
	}
	public void setMachine_cost(String machine_cost) {
		this.machine_cost = machine_cost;
	}
	public String getTooling_cost() {
		return tooling_cost;
	}
	public void setTooling_cost(String tooling_cost) {
		this.tooling_cost = tooling_cost;
	}
	public String getOther_materials_cost() {
		return other_materials_cost;
	}
	public void setOther_materials_cost(String other_materials_cost) {
		this.other_materials_cost = other_materials_cost;
	}
	public String getOther_cost() {
		return other_cost;
	}
	public void setOther_cost(String other_cost) {
		this.other_cost = other_cost;
	}
	public String getFuel_power_cost() {
		return fuel_power_cost;
	}
	public void setFuel_power_cost(String fuel_power_cost) {
		this.fuel_power_cost = fuel_power_cost;
	}
	public String getLabor_cost() {
		return labor_cost;
	}
	public void setLabor_cost(String labor_cost) {
		this.labor_cost = labor_cost;
	}
	public String getTotal_cost() {
		return total_cost;
	}
	public void setTotal_cost(String total_cost) {
		this.total_cost = total_cost;
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
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public String getCost_department_name() {
		return cost_department_name;
	}
	public void setCost_department_name(String cost_department_name) {
		this.cost_department_name = cost_department_name;
	}	

}
