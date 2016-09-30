package com.byd.bms.order.entity;

/**
 * 订单配置实体类
 * @author YangKe 150616
 */
public class BmsOrderConfig {
	private int id;
	private int order_id;
	private String order_config_name;
	private String customer;
	private String tire_type;			//160428 增加轮胎规格
	private int config_qty;
	private String config_file;
	private int editor_id;
	private String edit_date;
	
	private int o_id;
	private String order_no;
	private String order_name;
	private int order_qty;
	private String bus_type;
	private String bus_vehicle_type;	//added by xjw on 160506 车身型号
	private int allot_qty;
	private int issed_qty;
	private int online_count;	//上线数，订单配置分配 编辑时不能小于此值
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public String getOrder_config_name() {
		return order_config_name;
	}
	public void setOrder_config_name(String order_config_name) {
		this.order_config_name = order_config_name;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public int getConfig_qty() {
		return config_qty;
	}
	public void setConfig_qty(int config_qty) {
		this.config_qty = config_qty;
	}
	public String getConfig_file() {
		return config_file;
	}
	public void setConfig_file(String config_file) {
		this.config_file = config_file;
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
	public String getTire_type() {
		return tire_type;
	}
	public void setTire_type(String tire_type) {
		this.tire_type = tire_type;
	}
	public int getO_id() {
		return o_id;
	}
	public void setO_id(int o_id) {
		this.o_id = o_id;
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
	public int getOrder_qty() {
		return order_qty;
	}
	public void setOrder_qty(int order_qty) {
		this.order_qty = order_qty;
	}
	public String getBus_type() {
		return bus_type;
	}
	public void setBus_type(String bus_type) {
		this.bus_type = bus_type;
	}
	public int getAllot_qty() {
		return allot_qty;
	}
	public void setAllot_qty(int allot_qty) {
		this.allot_qty = allot_qty;
	}
	public int getIssed_qty() {
		return issed_qty;
	}
	public void setIssed_qty(int issed_qty) {
		this.issed_qty = issed_qty;
	}
	public int getOnline_count() {
		return online_count;
	}
	public void setOnline_count(int online_count) {
		this.online_count = online_count;
	}
	public String getBus_vehicle_type() {
		return bus_vehicle_type;
	}
	public void setBus_vehicle_type(String bus_vehicle_type) {
		this.bus_vehicle_type = bus_vehicle_type;
	}
	
}
