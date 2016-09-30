package com.byd.bms.util.entity;

public class BmsBaseProcess {
	private int id;
	private int line_id;
	private String process_code;
	private String process_name;
	private String key_process_flag;
	private String monitory_point_flag;
	private String quality_monitory_flag;
	private int plan_node_id;
	private String memo;
	private String delete_flag;
	private int editor_id;
	private String edit_date;
	
	private String cur_key_name;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getLine_id() {
		return line_id;
	}
	public void setLine_id(int line_id) {
		this.line_id = line_id;
	}
	public String getProcess_code() {
		return process_code;
	}
	public void setProcess_code(String process_code) {
		this.process_code = process_code;
	}
	public String getProcess_name() {
		return process_name;
	}
	public void setProcess_name(String process_name) {
		this.process_name = process_name;
	}
	public String getKey_process_flag() {
		return key_process_flag;
	}
	public void setKey_process_flag(String key_process_flag) {
		this.key_process_flag = key_process_flag;
	}
	public String getMonitory_point_flag() {
		return monitory_point_flag;
	}
	public void setMonitory_point_flag(String monitory_point_flag) {
		this.monitory_point_flag = monitory_point_flag;
	}
	public String getQuality_monitory_flag() {
		return quality_monitory_flag;
	}
	public void setQuality_monitory_flag(String quality_monitory_flag) {
		this.quality_monitory_flag = quality_monitory_flag;
	}
	public int getPlan_node_id() {
		return plan_node_id;
	}
	public void setPlan_node_id(int plan_node_id) {
		this.plan_node_id = plan_node_id;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getDelete_flag() {
		return delete_flag;
	}
	public void setDelete_flag(String delete_flag) {
		this.delete_flag = delete_flag;
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
	public String getCur_key_name() {
		return cur_key_name;
	}
	public void setCur_key_name(String cur_key_name) {
		this.cur_key_name = cur_key_name;
	}	

}
