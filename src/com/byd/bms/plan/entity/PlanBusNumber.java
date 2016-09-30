package com.byd.bms.plan.entity;

/**
 * 车号实体类
 * @author YangKe 150709
 *
 */
public class PlanBusNumber {
	private int id;
	private String bus_serial_number;
	private String bus_number;
	private int creator_id;
	private String creat_date;
	private String print_sign;
	private int printer_id;
	private String print_date;
	private int print_times;
	
	//车号组成部分：车型+“-”+订单+“-”+年份+四位流水号 （K9A-CS-2015-0001）
	private String bus_code;
	private String order_code;
	private String year;
	
	private int num;	//新增车号时车号后4位
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBus_serial_number() {
		return bus_serial_number;
	}
	public void setBus_serial_number(String bus_serial_number) {
		this.bus_serial_number = bus_serial_number;
	}
	public String getBus_number() {
		return bus_number;
	}
	public void setBus_number(String bus_number) {
		this.bus_number = bus_number;
	}
	public int getCreator_id() {
		return creator_id;
	}
	public void setCreator_id(int creator_id) {
		this.creator_id = creator_id;
	}
	public String getCreat_date() {
		return creat_date;
	}
	public void setCreat_date(String creat_date) {
		this.creat_date = creat_date;
	}
	public String getPrint_sign() {
		return print_sign;
	}
	public void setPrint_sign(String print_sign) {
		this.print_sign = print_sign;
	}
	public int getPrinter_id() {
		return printer_id;
	}
	public void setPrinter_id(int printer_id) {
		this.printer_id = printer_id;
	}
	public String getPrint_date() {
		return print_date;
	}
	public void setPrint_date(String print_date) {
		this.print_date = print_date;
	}
	public int getPrint_times() {
		return print_times;
	}
	public void setPrint_times(int print_times) {
		this.print_times = print_times;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getBus_code() {
		return bus_code;
	}
	public void setBus_code(String bus_code) {
		this.bus_code = bus_code;
	}
	public String getOrder_code() {
		return order_code;
	}
	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}
	

}
