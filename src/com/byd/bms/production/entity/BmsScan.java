package com.byd.bms.production.entity;

public class BmsScan {
	private int id;
	private String bus_number;
	private int process_id;
	private String factory_name;
	private String workshop_name;
	private String line_name;
	private String process_name;
	private int scanner_id;
	private String scan_time;
	private String repair;
	private String ecn;
	private String onlineflag;
	private String offlineflag;
	
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
	public int getProcess_id() {
		return process_id;
	}
	public void setProcess_id(int process_id) {
		this.process_id = process_id;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public String getWorkshop_name() {
		return workshop_name;
	}
	public void setWorkshop_name(String workshop_name) {
		this.workshop_name = workshop_name;
	}
	public String getLine_name() {
		return line_name;
	}
	public void setLine_name(String line_name) {
		this.line_name = line_name;
	}
	public String getProcess_name() {
		return process_name;
	}
	public void setProcess_name(String process_name) {
		this.process_name = process_name;
	}
	public int getScanner_id() {
		return scanner_id;
	}
	public void setScanner_id(int scanner_id) {
		this.scanner_id = scanner_id;
	}
	public String getScan_time() {
		return scan_time;
	}
	public void setScan_time(String scan_time) {
		this.scan_time = scan_time;
	}
	public String getRepair() {
		return repair;
	}
	public void setRepair(String repair) {
		this.repair = repair;
	}
	public String getEcn() {
		return ecn;
	}
	public void setEcn(String ecn) {
		this.ecn = ecn;
	}
	public String getOnlineflag() {
		return onlineflag;
	}
	public void setOnlineflag(String onlineflag) {
		this.onlineflag = onlineflag;
	}
	public String getOfflineflag() {
		return offlineflag;
	}
	public void setOfflineflag(String offlineflag) {
		this.offlineflag = offlineflag;
	}
	
}
