package com.byd.bms.quality.entity;

public class StdFaultLibBean {
	private int id;
	private int partsId;
	private String parts;
	private String bugType;
	private String bug;
	private String faultLevel;
	private String faultType;
	private String workshop;
	private String workgroup;
	private int editorId;
	private String editor;
	private String editDate;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPartsId() {
		return partsId;
	}
	public void setPartsId(int partsId) {
		this.partsId = partsId;
	}
	public String getParts() {
		return parts;
	}
	public void setParts(String parts) {
		this.parts = parts;
	}
	public String getBug() {
		return bug;
	}
	public void setBug(String bug) {
		this.bug = bug;
	}
	public String getFaultLevel() {
		return faultLevel;
	}
	public void setFaultLevel(String faultLevel) {
		this.faultLevel = faultLevel;
	}
	public String getFaultType() {
		return faultType;
	}
	public void setFaultType(String faultType) {
		this.faultType = faultType;
	}
	public String getWorkshop() {
		return workshop;
	}
	public void setWorkshop(String workshop) {
		this.workshop = workshop;
	}
	public String getWorkgroup() {
		return workgroup;
	}
	public void setWorkgroup(String workgroup) {
		this.workgroup = workgroup;
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
	public String getBugType() {
		return bugType;
	}
	public void setBugType(String bugType) {
		this.bugType = bugType;
	}
	
}
