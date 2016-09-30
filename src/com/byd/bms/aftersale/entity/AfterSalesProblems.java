package com.byd.bms.aftersale.entity;

/**
 * 售后问题实体类
 */
public class AfterSalesProblems {
	private int id;
	private int factory_id;
	private String factory_name;
	private String vin;
	private String bus_number;
	private String customer_bus_number; //客户车辆自编号
	private String license_number;//车牌号
	private int order_id;
	private String order_describe;
	private String customer_name;
	private String factory_date;
	private String fault_type_ids; //故障类别 弹性键ID 
	private String fault_type_name;
	private int fault_level_id; //故障等级 弹性键ID
	private String faultLevelName;
	private String fault_date;
	private String fault_mils;
	private String fault_components;			
	private String fault_phenomenon;		
	private String fault_photo;				
	private String fault_reason;
	private String status;
	private String memo;
	private int editor_id;
	private String editor;
	private String edit_date;
	
	private String provisional_measures;
	private String severity_level;
	private String reason; 
	private String improved_measure;
	private String verify;
	private String standard;
	private String report_editor;
	private String report_edit_date;
	
	
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
	public String getReport_editor() {
		return report_editor;
	}
	public void setReport_editor(String report_editor) {
		this.report_editor = report_editor;
	}
	public String getReport_edit_date() {
		return report_edit_date;
	}
	public void setReport_edit_date(String report_edit_date) {
		this.report_edit_date = report_edit_date;
	}
	public String getFault_type_ids() {
		return fault_type_ids;
	}
	public void setFault_type_ids(String fault_type_ids) {
		this.fault_type_ids = fault_type_ids;
	}
	public String getFault_type_name() {
		return fault_type_name;
	}
	public void setFault_type_name(String fault_type_name) {
		this.fault_type_name = fault_type_name;
	}
	public int getFault_level_id() {
		return fault_level_id;
	}
	public void setFault_level_id(int fault_level_id) {
		this.fault_level_id = fault_level_id;
	}
	public String getFaultLevelName() {
		return faultLevelName;
	}
	public void setFaultLevelName(String faultLevelName) {
		this.faultLevelName = faultLevelName;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public String getBus_number() {
		return bus_number;
	}
	public void setBus_number(String bus_number) {
		this.bus_number = bus_number;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public int getFactory_id() {
		return factory_id;
	}
	public void setFactory_id(int factory_id) {
		this.factory_id = factory_id;
	}
	public String getFault_date() {
		return fault_date;
	}
	public void setFault_date(String fault_date) {
		this.fault_date = fault_date;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getVin() {
		return vin;
	}
	public void setVin(String vin) {
		this.vin = vin;
	}
	public String getCustomer_bus_number() {
		return customer_bus_number;
	}
	public void setCustomer_bus_number(String customer_bus_number) {
		this.customer_bus_number = customer_bus_number;
	}
	public String getLicense_number() {
		return license_number;
	}
	public void setLicense_number(String license_number) {
		this.license_number = license_number;
	}
	public String getOrder_describe() {
		return order_describe;
	}
	public void setOrder_describe(String order_describe) {
		this.order_describe = order_describe;
	}
	public String getCustomer_name() {
		return customer_name;
	}
	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}
	public String getFactory_date() {
		return factory_date;
	}
	public void setFactory_date(String factory_date) {
		this.factory_date = factory_date;
	}
	public String getFault_mils() {
		return fault_mils;
	}
	public void setFault_mils(String fault_mils) {
		this.fault_mils = fault_mils;
	}
	public String getFault_components() {
		return fault_components;
	}
	public void setFault_components(String fault_components) {
		this.fault_components = fault_components;
	}
	public String getFault_phenomenon() {
		return fault_phenomenon;
	}
	public void setFault_phenomenon(String fault_phenomenon) {
		this.fault_phenomenon = fault_phenomenon;
	}
	public String getFault_photo() {
		return fault_photo;
	}
	public void setFault_photo(String fault_photo) {
		this.fault_photo = fault_photo;
	}
	public String getFault_reason() {
		return fault_reason;
	}
	public void setFault_reason(String fault_reason) {
		this.fault_reason = fault_reason;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
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
