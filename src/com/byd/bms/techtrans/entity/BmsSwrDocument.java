package com.byd.bms.techtrans.entity;

/**
 *swr单据
 * @author dll1177762
 *
 */
public class BmsSwrDocument {
	/**主键**/
	private int id;
	/**SWR单号**/
	private String swr_number;
	/**主题**/
	private String subject;
	/**发起人**/
	private String initiator;
	/**日期**/
	private String date;
	/**备注**/
	private String memo;
	/**维护人**/
	private String editor_id;
	private String username;
	/**维护日期**/
	private String edit_date;
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSwr_number() {
		return swr_number;
	}
	public void setSwr_number(String swr_number) {
		this.swr_number = swr_number;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getInitiator() {
		return initiator;
	}
	public void setInitiator(String initiator) {
		this.initiator = initiator;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getEditor_id() {
		return editor_id;
	}
	public void setEditor_id(String editor_id) {
		this.editor_id = editor_id;
	}
	public String getEdit_date() {
		return edit_date;
	}
	public void setEdit_date(String edit_date) {
		this.edit_date = edit_date;
	}
}
