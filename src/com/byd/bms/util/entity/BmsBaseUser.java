package com.byd.bms.util.entity;

public class BmsBaseUser {
	
	private int id;
	private String username;
	private String password;
	private String card_number;
	private String card_8H10D;
	private int role_id;
	private String email;
	private String telephone;
	private String cellphone;
	private String display_name;
	private int department_id;
	private String admin;//0:非admin用户；1:admin用户
	private String isdelete;
	private int factory_id;
	private String factory;
	private String factory_name;
	private String department;
	private String workshop_org;
	private String workgroup_org;
	private String team_org;
	
	//add by wuxiao
	private String pwd_modified;
	
	public String getPwd_modified() {
		return pwd_modified;
	}
	public void setPwd_modified(String pwd_modified) {
		this.pwd_modified = pwd_modified;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getCard_number() {
		return card_number;
	}
	public void setCard_number(String card_number) {
		this.card_number = card_number;
	}
	public String getCard_8H10D() {
		return card_8H10D;
	}
	public void setCard_8H10D(String card_8h10d) {
		card_8H10D = card_8h10d;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getCellphone() {
		return cellphone;
	}
	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}
	public String getDisplay_name() {
		return display_name;
	}
	public void setDisplay_name(String display_name) {
		this.display_name = display_name;
	}
	public int getDepartment_id() {
		return department_id;
	}
	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}
	public String getAdmin() {
		return admin;
	}
	public void setAdmin(String admin) {
		this.admin = admin;
	}
	public String getIsdelete() {
		return isdelete;
	}
	public void setIsdelete(String isdelete) {
		this.isdelete = isdelete;
	}
	public int getFactory_id() {
		return factory_id;
	}
	public void setFactory_id(int factory_id) {
		this.factory_id = factory_id;
	}
	public String getFactory() {
		return factory;
	}
	public void setFactory(String factory) {
		this.factory = factory;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getWorkshop_org() {
		return workshop_org;
	}
	public void setWorkshop_org(String workshop_org) {
		this.workshop_org = workshop_org;
	}
	public String getWorkgroup_org() {
		return workgroup_org;
	}
	public void setWorkgroup_org(String workgroup_org) {
		this.workgroup_org = workgroup_org;
	}
	public String getTeam_org() {
		return team_org;
	}
	public void setTeam_org(String team_org) {
		this.team_org = team_org;
	}
	
}
