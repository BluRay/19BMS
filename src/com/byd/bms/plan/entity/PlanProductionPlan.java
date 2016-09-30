package com.byd.bms.plan.entity;

public class PlanProductionPlan {
	private int id;
	private int order_id;
	private int factory_id;
	private int plan_code_id;
	private String plan_date;
	private int order_config_id;
	private int plan_qty;
	private String plan_status;
	private int creator_id;
	private String creat_date;
	private int releaser_id;
	private String release_date;
	
	private String order_no;
	private String key_name;
	private int real_qty;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public int getPlan_code_id() {
		return plan_code_id;
	}
	public void setPlan_code_id(int plan_code_id) {
		this.plan_code_id = plan_code_id;
	}
	public String getPlan_date() {
		return plan_date;
	}
	public void setPlan_date(String plan_date) {
		this.plan_date = plan_date;
	}
	public int getOrder_config_id() {
		return order_config_id;
	}
	public void setOrder_config_id(int order_config_id) {
		this.order_config_id = order_config_id;
	}
	public int getPlan_qty() {
		return plan_qty;
	}
	public void setPlan_qty(int plan_qty) {
		this.plan_qty = plan_qty;
	}
	public String getPlan_status() {
		return plan_status;
	}
	public void setPlan_status(String plan_status) {
		this.plan_status = plan_status;
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
	public int getReleaser_id() {
		return releaser_id;
	}
	public void setReleaser_id(int releaser_id) {
		this.releaser_id = releaser_id;
	}
	public String getRelease_date() {
		return release_date;
	}
	public void setRelease_date(String release_date) {
		this.release_date = release_date;
	}
	public String getOrder_no() {
		return order_no;
	}
	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}
	public String getKey_name() {
		return key_name;
	}
	public void setKey_name(String key_name) {
		this.key_name = key_name;
	}
	public int getReal_qty() {
		return real_qty;
	}
	public void setReal_qty(int real_qty) {
		this.real_qty = real_qty;
	}

}
