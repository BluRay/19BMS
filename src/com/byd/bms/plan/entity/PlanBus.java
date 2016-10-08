package com.byd.bms.plan.entity;

/**
 * 车辆信息实体类
 * @author YangKe 150709
 *
 */
public class PlanBus {
	private int id;
	private int factory_id;
	private String factory_name;
	private String bus_number;
	private String status;
	private int order_id;
	private int order_cofig_id;
	private int sequence;
	private String vin;
	private String customer_number;
	private String left_motor_number;
	private String right_motor_number;
	private String productive_date;
	private String bus_color;
	private String bus_seats;
	private int production_plan_id;
	private String warehousing_date;	//入库日期
	private String dispatch_date;		//发车日期
	private int bus_number_id;
	private String order_no;
	
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
	public String getBus_number() {
		return bus_number;
	}
	public void setBus_number(String bus_number) {
		this.bus_number = bus_number;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public int getOrder_cofig_id() {
		return order_cofig_id;
	}
	public void setOrder_cofig_id(int order_cofig_id) {
		this.order_cofig_id = order_cofig_id;
	}
	public int getSequence() {
		return sequence;
	}
	public void setSequence(int sequence) {
		this.sequence = sequence;
	}
	public String getVin() {
		return vin;
	}
	public void setVin(String vin) {
		this.vin = vin;
	}
	public String getCustomer_number() {
		return customer_number;
	}
	public void setCustomer_number(String customer_number) {
		this.customer_number = customer_number;
	}
	public String getLeft_motor_number() {
		return left_motor_number;
	}
	public void setLeft_motor_number(String left_motor_number) {
		this.left_motor_number = left_motor_number;
	}
	public String getRight_motor_number() {
		return right_motor_number;
	}
	public void setRight_motor_number(String right_motor_number) {
		this.right_motor_number = right_motor_number;
	}
	public String getBus_color() {
		return bus_color;
	}
	public void setBus_color(String bus_color) {
		this.bus_color = bus_color;
	}
	public String getBus_seats() {
		return bus_seats;
	}
	public void setBus_seats(String bus_seats) {
		this.bus_seats = bus_seats;
	}
	public int getBus_number_id() {
		return bus_number_id;
	}
	public void setBus_number_id(int bus_number_id) {
		this.bus_number_id = bus_number_id;
	}
	public String getOrder_no() {
		return order_no;
	}
	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}
	public String getProductive_date() {
		return productive_date;
	}
	public void setProductive_date(String productive_date) {
		this.productive_date = productive_date;
	}
	public int getProduction_plan_id() {
		return production_plan_id;
	}
	public void setProduction_plan_id(int production_plan_id) {
		this.production_plan_id = production_plan_id;
	}
	public String getWarehousing_date() {
		return warehousing_date;
	}
	public void setWarehousing_date(String warehousing_date) {
		this.warehousing_date = warehousing_date;
	}
	public String getDispatch_date() {
		return dispatch_date;
	}
	public void setDispatch_date(String dispatch_date) {
		this.dispatch_date = dispatch_date;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}


}
