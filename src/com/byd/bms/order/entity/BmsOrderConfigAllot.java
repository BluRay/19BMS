package com.byd.bms.order.entity;

/**
 * 订单配置分配实体类
 * @author YangKe 150619
 */
public class BmsOrderConfigAllot {
	private int id;
	private int order_id;
	private int factory_id;
	private int order_config_id;
	private int product_qty;
	private int sequence;
	private int busnum_start;
	private int busnum_end;
	private int editor_id;
	private String edit_date;
	
	private int o_id;
	private String order_no;
	private String order_name;
	private int order_qty;
	private String bus_type;
	private String factory_name;
	private String customer;
	private String order_config_name;
	private String delivery_date;
	
	private String color;
	private String seats;
	private int production_qty;
	private String config_file;
	
	public String getConfig_file() {
		return config_file;
	}
	public void setConfig_file(String config_file) {
		this.config_file = config_file;
	}
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
	public int getFactory_id() {
		return factory_id;
	}
	public void setFactory_id(int factory_id) {
		this.factory_id = factory_id;
	}
	public int getOrder_config_id() {
		return order_config_id;
	}
	public void setOrder_config_id(int order_config_id) {
		this.order_config_id = order_config_id;
	}
	public int getProduct_qty() {
		return product_qty;
	}
	public void setProduct_qty(int product_qty) {
		this.product_qty = product_qty;
	}
	public int getSequence() {
		return sequence;
	}
	public void setSequence(int sequence) {
		this.sequence = sequence;
	}
	public int getBusnum_start() {
		return busnum_start;
	}
	public void setBusnum_start(int busnum_start) {
		this.busnum_start = busnum_start;
	}
	public int getBusnum_end() {
		return busnum_end;
	}
	public void setBusnum_end(int busnum_end) {
		this.busnum_end = busnum_end;
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
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getOrder_config_name() {
		return order_config_name;
	}
	public void setOrder_config_name(String order_config_name) {
		this.order_config_name = order_config_name;
	}
	public String getDelivery_date() {
		return delivery_date;
	}
	public void setDelivery_date(String delivery_date) {
		this.delivery_date = delivery_date;
	}
	public int getProduction_qty() {
		return production_qty;
	}
	public void setProduction_qty(int production_qty) {
		this.production_qty = production_qty;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getSeats() {
		return seats;
	}
	public void setSeats(String seats) {
		this.seats = seats;
	}
	
}
