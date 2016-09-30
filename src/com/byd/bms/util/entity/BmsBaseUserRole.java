package com.byd.bms.util.entity;

/**
 * 用户权限实体类 table:BMS_BASE_USER_ROLE
 * @author YangKe 150626
 * 
 */
public class BmsBaseUserRole {
	private int id;
	private int user_id;
	private int role_authority_id;
	private int workshop_id;
	private int factory_id;
	private String point;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getRole_authority_id() {
		return role_authority_id;
	}
	public void setRole_authority_id(int role_authority_id) {
		this.role_authority_id = role_authority_id;
	}
	public int getWorkshop_id() {
		return workshop_id;
	}
	public void setWorkshop_id(int workshop_id) {
		this.workshop_id = workshop_id;
	}
	public int getFactory_id() {
		return factory_id;
	}
	public void setFactory_id(int factory_id) {
		this.factory_id = factory_id;
	}
	public String getPoint() {
		return point;
	}
	public void setPoint(String point) {
		this.point = point;
	}
}
