package com.byd.bms.techtrans.entity;


/**
 * 技改工时
 * @author dll1177762
 *
 */
public class BmsEcnTime {
	/**ID**/
	private int id;
	private String ecn_task_id;
	private String factoryid;
	private String factory_name;
	private String workshop_name;
	private String workshopid;
	private String unit_time;
	private String unit="H";
	
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEcn_task_id() {
		return ecn_task_id;
	}
	public void setEcn_task_id(String ecn_task_id) {
		this.ecn_task_id = ecn_task_id;
	}
	public String getFactoryid() {
		return factoryid;
	}
	public void setFactoryid(String factoryid) {
		this.factoryid = factoryid;
	}
	public String getWorkshopid() {
		return workshopid;
	}
	public void setWorkshopid(String workshopid) {
		this.workshopid = workshopid;
	}
	public String getUnit_time() {
		return unit_time;
	}
	public void setUnit_time(String unit_time) {
		this.unit_time = unit_time;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getWorkshop_name() {
		return workshop_name;
	}
	public void setWorkshop_name(String workshop_name) {
		this.workshop_name = workshop_name;
	}
	
}
