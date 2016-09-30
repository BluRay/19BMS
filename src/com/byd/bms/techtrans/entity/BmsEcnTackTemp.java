package com.byd.bms.techtrans.entity;

public class BmsEcnTackTemp {
	
	
	/**技改任务中的内容*/
	/**技改项内容**/
	private String task_content; 
	/**状态*/
	private String status;
	/**技改总工时*/
	private String total_hours;
	/**原效果图**/
	private String old_photo;
	/**整改后效果图**/
	private String new_photo;
	
	/**技改单中的内容*/
	/**技改单编号**/
	private String ecn_document_number;
	/**技改单日期**/
	private String ecn_document_date;
	
	
	/**订单中的内容*/
	/**订单号*/
	private String order_no;
	/**订单描述*/
	private String order_name;
	
	/**技改时间表中的内容*/
	/**车间*/
	private String workshop_id;
	private String workshop_name;
	
	/**技改台数  BMS_PLAN_ECN_TASK_DETAIL(技改任务明细(技改车明细))中统计的车号*/
	private String techTransNumber;
	/**已技改台数 */
	private String totalTechTransNumber;
	/**投入总工时 */
	private String totalTechTransTime;
	
	/**BMS_PLAN_ECN_TASK_DETAIL(技改任务明细(技改车明细))中*/
	/**车号*/
	private String bus_number;
	
	/**汽车类型*/
	private String bus_type_code;
	/**生产工厂*/
	private String factory_name;
	/**生产位置*/
	private String process_name;
	/**确认人**/
	private String confirmor_id;
	private String username;
	/**确认时间**/
	private String  confirmor_date;
	private int id;
	
	
	

	public String getProcess_name() {
		return process_name;
	}

	public void setProcess_name(String process_name) {
		this.process_name = process_name;
	}

	public String getConfirmor_id() {
		return confirmor_id;
	}

	public void setConfirmor_id(String confirmor_id) {
		this.confirmor_id = confirmor_id;
	}

	public String getConfirmor_date() {
		return confirmor_date;
	}

	public void setConfirmor_date(String confirmor_date) {
		this.confirmor_date = confirmor_date;
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

	public String getEcn_document_date() {
		return ecn_document_date;
	}

	public void setEcn_document_date(String ecn_document_date) {
		this.ecn_document_date = ecn_document_date;
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

	public String getWorkshop_id() {
		return workshop_id;
	}

	public void setWorkshop_id(String workshop_id) {
		this.workshop_id = workshop_id;
	}

	public String getTechTransNumber() {
		return techTransNumber;
	}

	public void setTechTransNumber(String techTransNumber) {
		this.techTransNumber = techTransNumber;
	}


	public String getTotalTechTransNumber() {
		return totalTechTransNumber;
	}

	public void setTotalTechTransNumber(String totalTechTransNumber) {
		this.totalTechTransNumber = totalTechTransNumber;
	}

	public String getTotalTechTransTime() {
		return totalTechTransTime;
	}

	public void setTotalTechTransTime(String totalTechTransTime) {
		this.totalTechTransTime = totalTechTransTime;
	}

	public String getBus_number() {
		return bus_number;
	}

	public void setBus_number(String bus_number) {
		this.bus_number = bus_number;
	}

	public String getTotal_hours() {
		return total_hours;
	}

	public void setTotal_hours(String total_hours) {
		this.total_hours = total_hours;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	

	public String getBus_type_code() {
		return bus_type_code;
	}

	public void setBus_type_code(String bus_type_code) {
		this.bus_type_code = bus_type_code;
	}

	public String getFactory_name() {
		return factory_name;
	}

	public void setFactory_name(String factory_name) {
		this.factory_name = factory_name;
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

	public String getWorkshop_name() {
		return workshop_name;
	}

	public void setWorkshop_name(String workshop_name) {
		this.workshop_name = workshop_name;
	}
	
	
	

}
