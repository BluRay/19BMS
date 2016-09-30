package com.byd.bms.order.entity;

/**
 * 订单实体类
 * @author YangKe 150609
 */
public class BmsOrder {
	private int id;
	private String order_no;
	private String order_name;
	private String order_name_str;
	private String order_code;
	private String order_type;
	private int bus_type_id;
	private String bus_type;
	private int order_qty;
	private int production_qty;			//工厂生产数
	private int issed_qty;
	private String area;				//地区
	private String factory_name;		//生产工厂名
	private int factory_id;				//生产工编号 
	private int busnum_start;
	private int busnum_end;
	private int bus_number_count;
	private int minbusnum;				//当前订单指定工厂已上线最小车号
	private int maxbusnum;				//当前订单指定工厂已上线最大车号
	private String productive_year;
	private String color;
	private String seats;
	private String delivery_date;
	private String status;
	private String memo;
	private int editor_id;
	private String edit_date;
	private String user_name;
	private int bus_number_start;
	private int bus_number_end;
	
	public String getOrder_name_str() {
		return order_name_str;
	}
	public void setOrder_name_str(String order_name_str) {
		this.order_name_str = order_name_str;
	}
	public int getBus_number_start() {
		return bus_number_start;
	}
	public void setBus_number_start(int bus_number_start) {
		this.bus_number_start = bus_number_start;
	}
	public int getBus_number_end() {
		return bus_number_end;
	}
	public void setBus_number_end(int bus_number_end) {
		this.bus_number_end = bus_number_end;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public int getMinbusnum() {
		return minbusnum;
	}
	public void setMinbusnum(int minbusnum) {
		this.minbusnum = minbusnum;
	}
	public int getMaxbusnum() {
		return maxbusnum;
	}
	public void setMaxbusnum(int maxbusnum) {
		this.maxbusnum = maxbusnum;
	}
	public int getBus_number_count() {
		return bus_number_count;
	}
	public void setBus_number_count(int bus_number_count) {
		this.bus_number_count = bus_number_count;
	}
	public int getBusnum_start() {
		return busnum_start;
	}
	public void setBusnum_start(int busnum_start) {
		this.busnum_start = busnum_start;
	}
	public int getBusnum_end() {
		return busnum_end;
	}
	public void setBusnum_end(int busnum_end) {
		this.busnum_end = busnum_end;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public int getFactory_id() {
		return factory_id;
	}
	public void setFactory_id(int factory_id) {
		this.factory_id = factory_id;
	}
	public int getProduction_qty() {
		return production_qty;
	}
	public void setProduction_qty(int production_qty) {
		this.production_qty = production_qty;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getBus_type() {
		return bus_type;
	}
	public void setBus_type(String bus_type) {
		this.bus_type = bus_type;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOrder_no() {
		return order_no;
	}
	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}
	public String getOrder_name() {
		return order_name;
	}
	public void setOrder_name(String order_name) {
		this.order_name = order_name;
	}
	public String getOrder_code() {
		return order_code;
	}
	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}
	public int getBus_type_id() {
		return bus_type_id;
	}
	public void setBus_type_id(int bus_type_id) {
		this.bus_type_id = bus_type_id;
	}
	public int getOrder_qty() {
		return order_qty;
	}
	public void setOrder_qty(int order_qty) {
		this.order_qty = order_qty;
	}
	public String getProductive_year() {
		return productive_year;
	}
	public void setProductive_year(String productive_year) {
		this.productive_year = productive_year;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getSeats() {
		return seats;
	}
	public void setSeats(String seats) {
		this.seats = seats;
	}
	public String getDelivery_date() {
		return delivery_date;
	}
	public void setDelivery_date(String delivery_date) {
		this.delivery_date = delivery_date;
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
	public int getIssed_qty() {
		return issed_qty;
	}
	public void setIssed_qty(int issed_qty) {
		this.issed_qty = issed_qty;
	}
	public String getOrder_type() {
		return order_type;
	}
	public void setOrder_type(String order_type) {
		this.order_type = order_type;
	}	

}
