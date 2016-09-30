package com.byd.bms.util.entity;

/**
 * 操作日志纪录表实体类 Table:BMS_BASE_OPERATE_CHANGE_LOG
 * @author YangKe 150706
 *
 */
public class BmsBaseOperateChangeLog {
	private int id;
	private int operate_change_type_id;
	private String table_name;
	private int field_id;
	private String field_name;
	private String old_value;
	private String new_value;
	private int changer_id;
	private String change_date;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOperate_change_type_id() {
		return operate_change_type_id;
	}
	public void setOperate_change_type_id(int operate_change_type_id) {
		this.operate_change_type_id = operate_change_type_id;
	}
	public String getTable_name() {
		return table_name;
	}
	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}
	public int getField_id() {
		return field_id;
	}
	public void setField_id(int field_id) {
		this.field_id = field_id;
	}
	public String getField_name() {
		return field_name;
	}
	public void setField_name(String field_name) {
		this.field_name = field_name;
	}
	public String getOld_value() {
		return old_value;
	}
	public void setOld_value(String old_value) {
		this.old_value = old_value;
	}
	public String getNew_value() {
		return new_value;
	}
	public void setNew_value(String new_value) {
		this.new_value = new_value;
	}
	public int getChanger_id() {
		return changer_id;
	}
	public void setChanger_id(int changer_id) {
		this.changer_id = changer_id;
	}
	public String getChange_date() {
		return change_date;
	}
	public void setChange_date(String change_date) {
		this.change_date = change_date;
	}
	
}
