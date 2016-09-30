package com.byd.bms.setting.entity;

public class HZBean {
	private int id;
	private int factory_id;//工厂Id
	private String factory;
	private int workshop_id;//车间ID
	private String workshop;
	private String type_code;//
	private int hz_type_id;
	private String typeName;
	private String value;//值
	private String unit;
	private String effecDateStart;//有效日期开始
	private String effecDateEnd;//有效日期结束
	private int editor_id;//编辑者id
	private String editor;//编辑者名称
	private String edit_date;//编辑日期
	private String status;//状态 0 使用 1 删除
	
	
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
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
	public String getFactory() {
		return factory;
	}
	public void setFactory(String factory) {
		this.factory = factory;
	}
	public int getWorkshop_id() {
		return workshop_id;
	}
	public void setWorkshop_id(int workshop_id) {
		this.workshop_id = workshop_id;
	}
	public String getWorkshop() {
		return workshop;
	}
	public void setWorkshop(String workshop) {
		this.workshop = workshop;
	}
	public String getType_code() {
		return type_code;
	}
	public void setType_code(String type_code) {
		this.type_code = type_code;
	}
	public int getHz_type_id() {
		return hz_type_id;
	}
	public void setHz_type_id(int hz_type_id) {
		this.hz_type_id = hz_type_id;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getEffecDateStart() {
		return effecDateStart;
	}
	public void setEffecDateStart(String effecDateStart) {
		this.effecDateStart = effecDateStart;
	}
	public String getEffecDateEnd() {
		return effecDateEnd;
	}
	public void setEffecDateEnd(String effecDateEnd) {
		this.effecDateEnd = effecDateEnd;
	}
	public int getEditor_id() {
		return editor_id;
	}
	public void setEditor_id(int editor_id) {
		this.editor_id = editor_id;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public String getEdit_date() {
		return edit_date;
	}
	public void setEdit_date(String edit_date) {
		this.edit_date = edit_date;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

}
