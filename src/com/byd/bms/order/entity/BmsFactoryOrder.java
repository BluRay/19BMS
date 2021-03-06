package com.byd.bms.order.entity;

/**
 * @author YangKe 150611
 * 订单工厂生产分配表
 */
public class BmsFactoryOrder {
	private int id;
	private int order_id;
	private int factory_id;
	private int production_qty;
	private int bus_number_start;
	private int bus_number_count;
	private int busnum_start;
	private int busnum_end;
	private int editor_id;
	private String edit_date;
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
	public int getProduction_qty() {
		return production_qty;
	}
	public void setProduction_qty(int production_qty) {
		this.production_qty = production_qty;
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
	public int getBus_number_start() {
		return bus_number_start;
	}
	public void setBus_number_start(int bus_number_start) {
		this.bus_number_start = bus_number_start;
	}
	public int getBus_number_count() {
		return bus_number_count;
	}
	public void setBus_number_count(int bus_number_count) {
		this.bus_number_count = bus_number_count;
	}

}
