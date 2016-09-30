package com.byd.bms.plan.entity;

/**
 * 半成品调动 实体类
 * @author YangKe 150716
 *
 */
public class PlanBusTransfer {
	private int id;
	private String bus_number;
	private int tfrom_factory_id;
	private int current_workshop_id;
	private int current_process_id;
	private String tfrom_date;
	private int tfrom_people_id;
	private int tto_factory_id;
	private String tto_date;
	private int tto_people_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBus_number() {
		return bus_number;
	}
	public void setBus_number(String bus_number) {
		this.bus_number = bus_number;
	}
	public int getTfrom_factory_id() {
		return tfrom_factory_id;
	}
	public void setTfrom_factory_id(int tfrom_factory_id) {
		this.tfrom_factory_id = tfrom_factory_id;
	}
	public int getCurrent_workshop_id() {
		return current_workshop_id;
	}
	public void setCurrent_workshop_id(int current_workshop_id) {
		this.current_workshop_id = current_workshop_id;
	}
	public int getCurrent_process_id() {
		return current_process_id;
	}
	public void setCurrent_process_id(int current_process_id) {
		this.current_process_id = current_process_id;
	}
	public String getTfrom_date() {
		return tfrom_date;
	}
	public void setTfrom_date(String tfrom_date) {
		this.tfrom_date = tfrom_date;
	}
	public int getTfrom_people_id() {
		return tfrom_people_id;
	}
	public void setTfrom_people_id(int tfrom_people_id) {
		this.tfrom_people_id = tfrom_people_id;
	}
	public int getTto_factory_id() {
		return tto_factory_id;
	}
	public void setTto_factory_id(int tto_factory_id) {
		this.tto_factory_id = tto_factory_id;
	}
	public String getTto_date() {
		return tto_date;
	}
	public void setTto_date(String tto_date) {
		this.tto_date = tto_date;
	}
	public int getTto_people_id() {
		return tto_people_id;
	}
	public void setTto_people_id(int tto_people_id) {
		this.tto_people_id = tto_people_id;
	}

}
