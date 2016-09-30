package com.byd.bms.techtrans.entity;

public class BmsSingleTaskFollow {
	private int ecn_task_id;
	private String ecn_number;
	private String order_desc;
	private String task_content;
	private String factory_name;
	private String ecn_document_number;
	private String taskstatus;
	private String photo;
	private int already;
	private int noalready;
	
	
	public String getOrder_desc() {
		return order_desc;
	}
	public void setOrder_desc(String order_desc) {
		this.order_desc = order_desc;
	}
	public String getFactory_name() {
		return factory_name;
	}
	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
	}
	public String getEcn_number() {
		return ecn_number;
	}
	public void setEcn_number(String ecn_number) {
		this.ecn_number = ecn_number;
	}
	public String getTask_content() {
		return task_content;
	}
	public void setTask_content(String task_content) {
		this.task_content = task_content;
	}
	public String getEcn_document_number() {
		return ecn_document_number;
	}
	public void setEcn_document_number(String ecn_document_number) {
		this.ecn_document_number = ecn_document_number;
	}
	public String getTaskstatus() {
		return taskstatus;
	}
	public void setTaskstatus(String taskstatus) {
		this.taskstatus = taskstatus;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public int getEcn_task_id() {
		return ecn_task_id;
	}
	public void setEcn_task_id(int ecn_task_id) {
		this.ecn_task_id = ecn_task_id;
	}
	public int getAlready() {
		return already;
	}
	public void setAlready(int already) {
		this.already = already;
	}
	public int getNoalready() {
		return noalready;
	}
	public void setNoalready(int noalready) {
		this.noalready = noalready;
	}
}
