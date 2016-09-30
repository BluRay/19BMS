package com.byd.bms.production.entity;

/**
 * 人员工时实体类
 * @author YangKe 150731
 *
 */
public class BmsProductionHours {
	private int id;
	private int factory_id;
	private int workshop_id;
	private String date;
	private int order_id;
	private int employees;
	private int arrivals_qty;
	private int working_hours;
	private int wait_employees;
	private int wait_hours;
	private int wait_process_id;
	private String wait_reason;
	private String wait_department;
	private String wait_user;
	private int pause_employees;
	private int pause_hours;
	private String pause_reason;
	private String pause_department;
	private String pause_user;
	private int editor_id;
	private String edit_date;
	
	private String order_no;
	private String factory_name;
	private String workshop_name;
	
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
	public int getWorkshop_id() {
		return workshop_id;
	}
	public void setWorkshop_id(int workshop_id) {
		this.workshop_id = workshop_id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public int getEmployees() {
		return employees;
	}
	public void setEmployees(int employees) {
		this.employees = employees;
	}
	public int getArrivals_qty() {
		return arrivals_qty;
	}
	public void setArrivals_qty(int arrivals_qty) {
		this.arrivals_qty = arrivals_qty;
	}
	public int getWorking_hours() {
		return working_hours;
	}
	public void setWorking_hours(int working_hours) {
		this.working_hours = working_hours;
	}
	public int getWait_employees() {
		return wait_employees;
	}
	public void setWait_employees(int wait_employees) {
		this.wait_employees = wait_employees;
	}
	public int getWait_hours() {
		return wait_hours;
	}
	public void setWait_hours(int wait_hours) {
		this.wait_hours = wait_hours;
	}
	public int getWait_process_id() {
		return wait_process_id;
	}
	public void setWait_process_id(int wait_process_id) {
		this.wait_process_id = wait_process_id;
	}
	public String getWait_reason() {
		return wait_reason;
	}
	public void setWait_reason(String wait_reason) {
		this.wait_reason = wait_reason;
	}
	public int getPause_employees() {
		return pause_employees;
	}
	public void setPause_employees(int pause_employees) {
		this.pause_employees = pause_employees;
	}
	public int getPause_hours() {
		return pause_hours;
	}
	public void setPause_hours(int pause_hours) {
		this.pause_hours = pause_hours;
	}
	public String getPause_reason() {
		return pause_reason;
	}
	public void setPause_reason(String pause_reason) {
		this.pause_reason = pause_reason;
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
	public String getWait_department() {
		return wait_department;
	}
	public void setWait_department(String wait_department) {
		this.wait_department = wait_department;
	}
	public String getWait_user() {
		return wait_user;
	}
	public void setWait_user(String wait_user) {
		this.wait_user = wait_user;
	}
	public String getPause_department() {
		return pause_department;
	}
	public void setPause_department(String pause_department) {
		this.pause_department = pause_department;
	}
	public String getPause_user() {
		return pause_user;
	}
	public void setPause_user(String pause_user) {
		this.pause_user = pause_user;
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

}
