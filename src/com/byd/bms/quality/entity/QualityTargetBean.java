package com.byd.bms.quality.entity;

public class QualityTargetBean {
	private int id;
	private int factoryId;//工厂Id
	private String factory;
	private int workshopId;//车间ID
	private String workshop;
	private int targetTypeId;//参数类别Id
	private String targetType;
	private String targetVal;//目标值
	private String effecDateStart;//有效日期开始
	private String effecDateEnd;//有效日期结束
	private int editorId;//编辑者id
	private String editor;//编辑者名称
	private String editDate;//编辑日期
	private String status;//状态 0 使用 1 删除
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFactoryId() {
		return factoryId;
	}
	public void setFactoryId(int factoryId) {
		this.factoryId = factoryId;
	}
	public String getFactory() {
		return factory;
	}
	public void setFactory(String factory) {
		this.factory = factory;
	}
	public int getWorkshopId() {
		return workshopId;
	}
	public void setWorkshopId(int workshopId) {
		this.workshopId = workshopId;
	}
	public String getWorkshop() {
		return workshop;
	}
	public void setWorkshop(String workshop) {
		this.workshop = workshop;
	}
	public int getTargetTypeId() {
		return targetTypeId;
	}
	public void setTargetTypeId(int targetTypeId) {
		this.targetTypeId = targetTypeId;
	}
	public String getTargetType() {
		return targetType;
	}
	public void setTargetType(String targetType) {
		this.targetType = targetType;
	}
	public String getTargetVal() {
		return targetVal;
	}
	public void setTargetVal(String targetVal) {
		this.targetVal = targetVal;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

}
