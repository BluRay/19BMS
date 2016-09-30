package com.byd.bms.techtrans.entity;

import java.util.Date;
import java.util.List;
/**
 * 技改单实体类
 * @author dll1177762
 *
 */
public class BmsEcnDocument {
	/**技改ID**/
	private int id;
	/**技改类型**/
	private int ecn_type;
	private String typeName;
	/**技改单编号**/
	private String ecn_document_number;
	/**技改单日期**/
	private String ecn_document_date;
	/**主题**/
	private String subject;
	/**技改单附件**/
	private String ecn_document_file;
	/**临时技改单**/
	private String  tecn_flag;
	/**责任单位**/
	private String responsible_organization;
	/**变更物料清单**/
	private String changed_bom;
	/**工程院联系人**/
	private String gcy_contacts;
	/**工艺联系人**/
	private String gy_contacts;
	/**状态**/
	private String status;
	private int editor_id;
	/**维护人**/
	private String editor;
	/**维护日期**/
	private String edit_date;
	
	private List ecn_task_list;
	
	public List getEcn_task_list() {
		return ecn_task_list;
	}
	public void setEcn_task_list(List ecn_task_list) {
		this.ecn_task_list = ecn_task_list;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public int getEcn_type() {
		return ecn_type;
	}
	public void setEcn_type(int ecn_type) {
		this.ecn_type = ecn_type;
	}
	public int getEditor_id() {
		return editor_id;
	}
	public void setEditor_id(int editor_id) {
		this.editor_id = editor_id;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public String getEdit_date() {
		return edit_date;
	}
	public void setEdit_date(String edit_date) {
		this.edit_date = edit_date;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getResponsible_organization() {
		return responsible_organization;
	}
	public void setResponsible_organization(String responsible_organization) {
		this.responsible_organization = responsible_organization;
	}
	public String getGcy_contacts() {
		return gcy_contacts;
	}
	public void setGcy_contacts(String gcy_contacts) {
		this.gcy_contacts = gcy_contacts;
	}
	public String getGy_contacts() {
		return gy_contacts;
	}
	public void setGy_contacts(String gy_contacts) {
		this.gy_contacts = gy_contacts;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getEcn_document_file() {
		return ecn_document_file;
	}
	public void setEcn_document_file(String ecn_document_file) {
		this.ecn_document_file = ecn_document_file;
	}
	public String getTecn_flag() {
		return tecn_flag;
	}
	public void setTecn_flag(String tecn_flag) {
		this.tecn_flag = tecn_flag;
	}
	public String getChanged_bom() {
		return changed_bom;
	}
	public void setChanged_bom(String changed_bom) {
		this.changed_bom = changed_bom;
	}
}
