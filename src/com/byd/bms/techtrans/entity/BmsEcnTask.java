package com.byd.bms.techtrans.entity;

import java.util.List;

/**
 * 技改任务实体类
 * @author dll1177762
 *
 */
public class BmsEcnTask {
	/**技改任务**/
	private int id;
	/**技改单**/
	private int ecn_id;
	private int task_number;
	/**技改项内容**/
	private String task_content;
	/**切换方式**/
	private String switch_mode;
	/**
	 * added by xjw 160920 变更类型
	 */
	private String change_type;
	/**
	 * added by xjw 160920 顾客变更单号
	 */
	private String change_order_no;
	
	private int ecn_order_id;
	private String order_no;
	private int order_qty;
	private int ecn_factory_id;
	private String ecn_number;
	/**总工时**/
	private String total_hours;
	/**原效果图**/
	private String old_photo;
	/**整改后效果图**/
	private String new_photo;
	/**状态**/
	private String status;
	/**下达时间**/
	private String creat_date;
	
	
	public int getOrder_qty() {
		return order_qty;
	}
	public void setOrder_qty(int order_qty) {
		this.order_qty = order_qty;
	}
	public String getOrder_no() {
		return order_no;
	}
	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getEcn_id() {
		return ecn_id;
	}
	public void setEcn_id(int ecn_id) {
		this.ecn_id = ecn_id;
	}
	public int getTask_number() {
		return task_number;
	}
	public void setTask_number(int task_number) {
		this.task_number = task_number;
	}
	public String getTask_content() {
		return task_content;
	}
	public void setTask_content(String task_content) {
		this.task_content = task_content;
	}
	public String getSwitch_mode() {
		return switch_mode;
	}
	public void setSwitch_mode(String switch_mode) {
		this.switch_mode = switch_mode;
	}
	public int getEcn_order_id() {
		return ecn_order_id;
	}
	public void setEcn_order_id(int ecn_order_id) {
		this.ecn_order_id = ecn_order_id;
	}
	public int getEcn_factory_id() {
		return ecn_factory_id;
	}
	public void setEcn_factory_id(int ecn_factory_id) {
		this.ecn_factory_id = ecn_factory_id;
	}
	public String getEcn_number() {
		return ecn_number;
	}
	public void setEcn_number(String ecn_number) {
		this.ecn_number = ecn_number;
	}
	public String getTotal_hours() {
		return total_hours;
	}
	public void setTotal_hours(String total_hours) {
		this.total_hours = total_hours;
	}
	public String getOld_photo() {
		return old_photo;
	}
	public void setOld_photo(String old_photo) {
		this.old_photo = old_photo;
	}
	public String getNew_photo() {
		return new_photo;
	}
	public void setNew_photo(String new_photo) {
		this.new_photo = new_photo;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCreat_date() {
		return creat_date;
	}
	public void setCreat_date(String creat_date) {
		this.creat_date = creat_date;
	}
	public String getChange_type() {
		return change_type;
	}
	public void setChange_type(String change_type) {
		this.change_type = change_type;
	}
	public String getChange_order_no() {
		return change_order_no;
	}
	public void setChange_order_no(String change_order_no) {
		this.change_order_no = change_order_no;
	}
	
}
