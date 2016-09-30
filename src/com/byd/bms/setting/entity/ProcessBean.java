package com.byd.bms.setting.entity;

public class ProcessBean {
	private int id;
	private int factoryId;
	private String factoryName;
	private int workshopId;
	private String workshopName;
	private int lineId;
	private String lineName;
	private String processCode;
	private String processName;
	private String keyProcessFlag;
	private String monitoryPointFlag;
	private String qualityMonitoryFlag;
	private String planNodeId;
	private String planNodeName;
	private String deleteFlag;
	private String memo;
	private int editorId;
	private String editor;
	private String editDate;
	
	public String getPlanNodeId() {
		return planNodeId;
	}
	public void setPlanNodeId(String planNodeId) {
		this.planNodeId = planNodeId;
	}
	public String getPlanNodeName() {
		return planNodeName;
	}
	public void setPlanNodeName(String planNodeName) {
		this.planNodeName = planNodeName;
	}

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
	public String getFactoryName() {
		return factoryName;
	}
	public void setFactoryName(String factoryName) {
		this.factoryName = factoryName;
	}
	public int getWorkshopId() {
		return workshopId;
	}
	public void setWorkshopId(int workshopId) {
		this.workshopId = workshopId;
	}
	public String getWorkshopName() {
		return workshopName;
	}
	public void setWorkshopName(String workshopName) {
		this.workshopName = workshopName;
	}
	public int getLineId() {
		return lineId;
	}
	public void setLineId(int lineId) {
		this.lineId = lineId;
	}
	public String getLineName() {
		return lineName;
	}
	public void setLineName(String lineName) {
		this.lineName = lineName;
	}
	public String getProcessCode() {
		return processCode;
	}
	public void setProcessCode(String processCode) {
		this.processCode = processCode;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public String getKeyProcessFlag() {
		return keyProcessFlag;
	}
	public void setKeyProcessFlag(String keyProcessFlag) {
		this.keyProcessFlag = keyProcessFlag;
	}
	public String getMonitoryPointFlag() {
		return monitoryPointFlag;
	}
	public void setMonitoryPointFlag(String monitoryPointFlag) {
		this.monitoryPointFlag = monitoryPointFlag;
	}
	public String getQualityMonitoryFlag() {
		return qualityMonitoryFlag;
	}
	public void setQualityMonitoryFlag(String qualityMonitoryFlag) {
		this.qualityMonitoryFlag = qualityMonitoryFlag;
	}
	public String getDeleteFlag() {
		return deleteFlag;
	}
	public void setDeleteFlag(String deleteFlag) {
		this.deleteFlag = deleteFlag;
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
