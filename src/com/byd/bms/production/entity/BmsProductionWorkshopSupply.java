package com.byd.bms.production.entity;

/**
 * 供焊装交付实体类
 * @author YangKe 150722
 */
public class BmsProductionWorkshopSupply {
	private int id;
	private int factory_id;
	private int order_id;
	private int supply_workshop_id;
	private int receive_workshop_id;
	private int quantity;
	private String supply_date;
	private String editor;
	private int editor_id;
	private String edit_date;
	
	private String order_no;
	private String factory_name;
	private String workshop_name;
	private String receive_workshop;
	private String supply_total;
	
	public String getReceive_workshop() {
		return receive_workshop;
	}
	public void setReceive_workshop(String receive_workshop) {
		this.receive_workshop = receive_workshop;
	}
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
	public int getSupply_workshop_id() {
		return supply_workshop_id;
	}
	public void setSupply_workshop_id(int supply_workshop_id) {
		this.supply_workshop_id = supply_workshop_id;
	}
	public int getReceive_workshop_id() {
		return receive_workshop_id;
	}
	public void setReceive_workshop_id(int receive_workshop_id) {
		this.receive_workshop_id = receive_workshop_id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getSupply_date() {
		return supply_date;
	}
	public void setSupply_date(String supply_date) {
		this.supply_date = supply_date;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
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
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public String getWorkshop_name() {
		return workshop_name;
	}
	public void setWorkshop_name(String workshop_name) {
		this.workshop_name = workshop_name;
	}
	public String getSupply_total() {
		return supply_total;
	}
	public void setSupply_total(String supply_total) {
		this.supply_total = supply_total;
	}

}
