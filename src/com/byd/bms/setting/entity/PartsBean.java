package com.byd.bms.setting.entity;

public class PartsBean {
	private int id;
	private String parts_type;
	private String partsTypeName;
	private String parts_name;
	private String parts_code;
	private String quality_flag;
	private int workshop_id;
	private String workshop_name;
	private String status;
	private String memo;
	private int editorId;
	private String editor;
	private String editDate;
	
	public String getParts_type() {
		return parts_type;
	}
	public void setParts_type(String parts_type) {
		this.parts_type = parts_type;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPartsTypeName() {
		return partsTypeName;
	}
	public void setPartsTypeName(String partsTypeName) {
		this.partsTypeName = partsTypeName;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getParts_name() {
		return parts_name;
	}
	public void setParts_name(String parts_name) {
		this.parts_name = parts_name;
	}
	public String getParts_code() {
		return parts_code;
	}
	public void setParts_code(String parts_code) {
		this.parts_code = parts_code;
	}
	public String getQuality_flag() {
		return quality_flag;
	}
	public void setQuality_flag(String quality_flag) {
		this.quality_flag = quality_flag;
	}
	public int getWorkshop_id() {
		return workshop_id;
	}
	public void setWorkshop_id(int workshop_id) {
		this.workshop_id = workshop_id;
	}
	public String getWorkshop_name() {
		return workshop_name;
	}
	public void setWorkshop_name(String workshop_name) {
		this.workshop_name = workshop_name;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public int getEditorId() {
		return editorId;
	}
	public void setEditorId(int editorId) {
		this.editorId = editorId;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public String getEditDate() {
		return editDate;
	}
	public void setEditDate(String editDate) {
		this.editDate = editDate;
	}

}
