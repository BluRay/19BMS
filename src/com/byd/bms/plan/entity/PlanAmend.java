package com.byd.bms.plan.entity;

/**
 * 订单完成 数量修正
 * @author Yangke 150716
 *
 */
public class PlanAmend {
	private int id;
	private int plan_id;
	private int real_qty;
	private int amend_qty;
	private int reviser_id;
	private String amend_reason;
	private String revise_date;
	private int verifier_id;
	private String verify_date;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPlan_id() {
		return plan_id;
	}
	public void setPlan_id(int plan_id) {
		this.plan_id = plan_id;
	}
	public int getReal_qty() {
		return real_qty;
	}
	public void setReal_qty(int real_qty) {
		this.real_qty = real_qty;
	}
	public int getAmend_qty() {
		return amend_qty;
	}
	public void setAmend_qty(int amend_qty) {
		this.amend_qty = amend_qty;
	}
	public int getReviser_id() {
		return reviser_id;
	}
	public void setReviser_id(int reviser_id) {
		this.reviser_id = reviser_id;
	}
	public String getAmend_reason() {
		return amend_reason;
	}
	public void setAmend_reason(String amend_reason) {
		this.amend_reason = amend_reason;
	}
	public String getRevise_date() {
		return revise_date;
	}
	public void setRevise_date(String revise_date) {
		this.revise_date = revise_date;
	}
	public int getVerifier_id() {
		return verifier_id;
	}
	public void setVerifier_id(int verifier_id) {
		this.verifier_id = verifier_id;
	}
	public String getVerify_date() {
		return verify_date;
	}
	public void setVerify_date(String verify_date) {
		this.verify_date = verify_date;
	}

}
