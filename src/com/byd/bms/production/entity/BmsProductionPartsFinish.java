package com.byd.bms.production.entity;

/**
 * 部件上下线
 * @author YangKe 150728
 *
 */
public class BmsProductionPartsFinish {
	private int id;
	private int factory_id;
	private int order_id;
	private int parts_id;
	private String date;
	private int online_plan_qty;
	private int offline_plan_qty;
	private int online_real_qty;
	private int offline_real_qty;
	private int editor_id;
	private String edit_date;
	private int online_total;
	private int offline_total;
	private String parts_name;
	private String order_no;
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
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public int getParts_id() {
		return parts_id;
	}
	public void setParts_id(int parts_id) {
		this.parts_id = parts_id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getOnline_plan_qty() {
		return online_plan_qty;
	}
	public void setOnline_plan_qty(int online_plan_qty) {
		this.online_plan_qty = online_plan_qty;
	}
	public int getOffline_plan_qty() {
		return offline_plan_qty;
	}
	public void setOffline_plan_qty(int offline_plan_qty) {
		this.offline_plan_qty = offline_plan_qty;
	}
	public int getOnline_real_qty() {
		return online_real_qty;
	}
	public void setOnline_real_qty(int online_real_qty) {
		this.online_real_qty = online_real_qty;
	}
	public int getOffline_real_qty() {
		return offline_real_qty;
	}
	public void setOffline_real_qty(int offline_real_qty) {
		this.offline_real_qty = offline_real_qty;
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
	public String getParts_name() {
		return parts_name;
	}
	public void setParts_name(String parts_name) {
		this.parts_name = parts_name;
	}
	public String getOrder_no() {
		return order_no;
	}
	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public int getOnline_total() {
		return online_total;
	}
	public void setOnline_total(int online_total) {
		this.online_total = online_total;
	}
	public int getOffline_total() {
		return offline_total;
	}
	public void setOffline_total(int offline_total) {
		this.offline_total = offline_total;
	}

}
