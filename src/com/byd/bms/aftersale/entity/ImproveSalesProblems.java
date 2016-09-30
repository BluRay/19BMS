package com.byd.bms.aftersale.entity;

/**
 * 售后问题实体类
 */
public class ImproveSalesProblems {
	private int id;
	private int problem_id;
	private String fault_phenomenon;
	private String severity_level;
	private int fault_level_id;
	private String provisional_measures;
	private String reason; 
	private String improved_measure;
	private String verify;
	private String standard;
	private String before_photo;
	private String after_photo;
	private String attachment;
	private int editor_id;
	private String editor;
	private String edit_date;
	
	public int getFault_level_id() {
		return fault_level_id;
	}
	public void setFault_level_id(int fault_level_id) {
		this.fault_level_id = fault_level_id;
	}
	public String getAttachment() {
		return attachment;
	}
	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProblem_id() {
		return problem_id;
	}
	public void setProblem_id(int problem_id) {
		this.problem_id = problem_id;
	}
	public String getFault_phenomenon() {
		return fault_phenomenon;
	}
	public void setFault_phenomenon(String fault_phenomenon) {
		this.fault_phenomenon = fault_phenomenon;
	}
	public String getSeverity_level() {
		return severity_level;
	}
	public void setSeverity_level(String severity_level) {
		this.severity_level = severity_level;
	}
	public String getProvisional_measures() {
		return provisional_measures;
	}
	public void setProvisional_measures(String provisional_measures) {
		this.provisional_measures = provisional_measures;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getImproved_measure() {
		return improved_measure;
	}
	public void setImproved_measure(String improved_measure) {
		this.improved_measure = improved_measure;
	}
	public String getVerify() {
		return verify;
	}
	public void setVerify(String verify) {
		this.verify = verify;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getBefore_photo() {
		return before_photo;
	}
	public void setBefore_photo(String before_photo) {
		this.before_photo = before_photo;
	}
	public String getAfter_photo() {
		return after_photo;
	}
	public void setAfter_photo(String after_photo) {
		this.after_photo = after_photo;
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
	

}
