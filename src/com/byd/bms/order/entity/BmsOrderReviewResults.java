package com.byd.bms.order.entity;

/**
 * 订单评审实体类
 * @author YangKe 150612
 */
public class BmsOrderReviewResults {
	private int id;
	private int o_id;
	private int factory_order_id;
	private String deliery_date;
	private String assembly_online_date;	//部件上线日期
	//以下为评审字段
	private String risk_point_technics;
	private String solutions_technics;
	private String meet_requirements_flag_technics;

	private String risk_point_production;
	private String solutions_production;
	private String meet_requirements_flag_production;
	
	private String risk_point_materiel;
	private String solutions_materiel;
	private String meet_requirements_flag_materiel;
	
	private String risk_point_device;
	private String solutions_device;
	private String meet_requirements_flag_device;
	
	private String risk_point_plan;
	private String solutions_plan;
	private String meet_requirements_flag_plan;

	private int editor_id;
	private String display_name;
	private String edit_date;
	//以下为工厂订单基本信息字段
	private String order_no;
	private String order_name;
	private String status;			//订单状态
	private int bus_type_id;
	private String bus_type;
	private int order_qty;
	private String delivery_date;
	private String factory_name;
	private int production_qty;
	

	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getO_id() {
		return o_id;
	}
	public void setO_id(int o_id) {
		this.o_id = o_id;
	}
	public String getDisplay_name() {
		return display_name;
	}
	public void setDisplay_name(String display_name) {
		this.display_name = display_name;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public int getProduction_qty() {
		return production_qty;
	}
	public void setProduction_qty(int production_qty) {
		this.production_qty = production_qty;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFactory_order_id() {
		return factory_order_id;
	}
	public void setFactory_order_id(int factory_order_id) {
		this.factory_order_id = factory_order_id;
	}
	public String getDeliery_date() {
		return deliery_date;
	}
	public void setDeliery_date(String deliery_date) {
		this.deliery_date = deliery_date;
	}
	public String getAssembly_online_date() {
		return assembly_online_date;
	}
	public void setAssembly_online_date(String assembly_online_date) {
		this.assembly_online_date = assembly_online_date;
	}
	public String getRisk_point_technics() {
		return risk_point_technics;
	}
	public void setRisk_point_technics(String risk_point_technics) {
		this.risk_point_technics = risk_point_technics;
	}
	public String getSolutions_technics() {
		return solutions_technics;
	}
	public void setSolutions_technics(String solutions_technics) {
		this.solutions_technics = solutions_technics;
	}
	public String getMeet_requirements_flag_technics() {
		return meet_requirements_flag_technics;
	}
	public void setMeet_requirements_flag_technics(
			String meet_requirements_flag_technics) {
		this.meet_requirements_flag_technics = meet_requirements_flag_technics;
	}
	
	public String getMeet_requirements_flag_production() {
		return meet_requirements_flag_production;
	}
	public void setMeet_requirements_flag_production(
			String meet_requirements_flag_production) {
		this.meet_requirements_flag_production = meet_requirements_flag_production;
	}
	
	public String getRisk_point_production() {
		return risk_point_production;
	}
	public void setRisk_point_production(String risk_point_production) {
		this.risk_point_production = risk_point_production;
	}
	public String getSolutions_production() {
		return solutions_production;
	}
	public void setSolutions_production(String solutions_production) {
		this.solutions_production = solutions_production;
	}

	public String getRisk_point_materiel() {
		return risk_point_materiel;
	}
	public void setRisk_point_materiel(String risk_point_materiel) {
		this.risk_point_materiel = risk_point_materiel;
	}
	public String getSolutions_materiel() {
		return solutions_materiel;
	}
	public void setSolutions_materiel(String solutions_materiel) {
		this.solutions_materiel = solutions_materiel;
	}
	public String getMeet_requirements_flag_materiel() {
		return meet_requirements_flag_materiel;
	}
	public void setMeet_requirements_flag_materiel(
			String meet_requirements_flag_materiel) {
		this.meet_requirements_flag_materiel = meet_requirements_flag_materiel;
	}
	public String getRisk_point_device() {
		return risk_point_device;
	}
	public void setRisk_point_device(String risk_point_device) {
		this.risk_point_device = risk_point_device;
	}
	public String getSolutions_device() {
		return solutions_device;
	}
	public void setSolutions_device(String solutions_device) {
		this.solutions_device = solutions_device;
	}
	public String getMeet_requirements_flag_device() {
		return meet_requirements_flag_device;
	}
	public void setMeet_requirements_flag_device(
			String meet_requirements_flag_device) {
		this.meet_requirements_flag_device = meet_requirements_flag_device;
	}
	public String getRisk_point_plan() {
		return risk_point_plan;
	}
	public void setRisk_point_plan(String risk_point_plan) {
		this.risk_point_plan = risk_point_plan;
	}
	public String getSolutions_plan() {
		return solutions_plan;
	}
	public void setSolutions_plan(String solutions_plan) {
		this.solutions_plan = solutions_plan;
	}
	public String getMeet_requirements_flag_plan() {
		return meet_requirements_flag_plan;
	}
	public void setMeet_requirements_flag_plan(String meet_requirements_flag_plan) {
		this.meet_requirements_flag_plan = meet_requirements_flag_plan;
	}
	public int getEditor_id() {
		return editor_id;
	}
	public void setEditor_id(int editor_id) {
		this.editor_id = editor_id;
	}
	public String getEdit_date() {
		return edit_date;
	}
	public void setEdit_date(String edit_date) {
		this.edit_date = edit_date;
	}
	public String getOrder_no() {
		return order_no;
	}
	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}
	public String getOrder_name() {
		return order_name;
	}
	public void setOrder_name(String order_name) {
		this.order_name = order_name;
	}
	public int getBus_type_id() {
		return bus_type_id;
	}
	public void setBus_type_id(int bus_type_id) {
		this.bus_type_id = bus_type_id;
	}
	public String getBus_type() {
		return bus_type;
	}
	public void setBus_type(String bus_type) {
		this.bus_type = bus_type;
	}
	public int getOrder_qty() {
		return order_qty;
	}
	public void setOrder_qty(int order_qty) {
		this.order_qty = order_qty;
	}
	public String getDelivery_date() {
		return delivery_date;
	}
	public void setDelivery_date(String delivery_date) {
		this.delivery_date = delivery_date;
	}
	
}
