package com.byd.bms.production.entity;

/**
 * 生产异常实体类  table:BMS_PD_PRODUCTION_EXCEPTION
 * @author YangKe 150626
 *
 */
public class BmsProductionException {
	private int id;
	private int factory_id;
	private int workshop_id;
	private int line_id;
	private int process_id;
	private String bus_number;
	private String exception_type;
	private int reason_type_id;
	private int lack_reason_id;
	private String detailed_reasons;
	private int editor_id;
	private String edit_date;
	private String start_time;
	private String pfinish_time;
	private String finish_time;
	private int severity_level;
	private int measures;
	private int duty_department_id;
	private String temporary_measures;
	private String processor;
	private String process_date;
	private String solution;
	private int closer_id;
	private String close_date;
	private int email_id;
	private String order_list;
	private String order_desc;	
	
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
	public int getLine_id() {
		return line_id;
	}
	public void setLine_id(int line_id) {
		this.line_id = line_id;
	}
	public int getProcess_id() {
		return process_id;
	}
	public void setProcess_id(int process_id) {
		this.process_id = process_id;
	}
	public String getBus_number() {
		return bus_number;
	}
	public void setBus_number(String bus_number) {
		this.bus_number = bus_number;
	}
	public String getException_type() {
		return exception_type;
	}
	public void setException_type(String exception_type) {
		this.exception_type = exception_type;
	}
	public int getReason_type_id() {
		return reason_type_id;
	}
	public void setReason_type_id(int reason_type_id) {
		this.reason_type_id = reason_type_id;
	}
	public int getLack_reason_id() {
		return lack_reason_id;
	}
	public void setLack_reason_id(int lack_reason_id) {
		this.lack_reason_id = lack_reason_id;
	}
	public String getDetailed_reasons() {
		return detailed_reasons;
	}
	public void setDetailed_reasons(String detailed_reasons) {
		this.detailed_reasons = detailed_reasons;
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
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getPfinish_time() {
		return pfinish_time;
	}
	public void setPfinish_time(String pfinish_time) {
		this.pfinish_time = pfinish_time;
	}
	public String getFinish_time() {
		return finish_time;
	}
	public void setFinish_time(String finish_time) {
		this.finish_time = finish_time;
	}
	public int getSeverity_level() {
		return severity_level;
	}
	public void setSeverity_level(int severity_level) {
		this.severity_level = severity_level;
	}
	public int getMeasures() {
		return measures;
	}
	public void setMeasures(int measures) {
		this.measures = measures;
	}
	public int getDuty_department_id() {
		return duty_department_id;
	}
	public void setDuty_department_id(int duty_department_id) {
		this.duty_department_id = duty_department_id;
	}
	public String getTemporary_measures() {
		return temporary_measures;
	}
	public void setTemporary_measures(String temporary_measures) {
		this.temporary_measures = temporary_measures;
	}
	public String getProcessor() {
		return processor;
	}
	public void setProcessor(String processor) {
		this.processor = processor;
	}
	public String getProcess_date() {
		return process_date;
	}
	public void setProcess_date(String process_date) {
		this.process_date = process_date;
	}
	public String getSolution() {
		return solution;
	}
	public void setSolution(String solution) {
		this.solution = solution;
	}
	public int getCloser_id() {
		return closer_id;
	}
	public void setCloser_id(int closer_id) {
		this.closer_id = closer_id;
	}
	public String getClose_date() {
		return close_date;
	}
	public void setClose_date(String close_date) {
		this.close_date = close_date;
	}
	public int getEmail_id() {
		return email_id;
	}
	public void setEmail_id(int email_id) {
		this.email_id = email_id;
	}
	public String getOrder_list() {
		return order_list;
	}
	public void setOrder_list(String order_list) {
		this.order_list = order_list;
	}
	public String getOrder_desc() {
		return order_desc;
	}
	public void setOrder_desc(String order_desc) {
		this.order_desc = order_desc;
	}

}
