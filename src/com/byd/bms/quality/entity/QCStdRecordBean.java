package com.byd.bms.quality.entity;

public class QCStdRecordBean {
	private int id;
	private String recordNo;//记录编号
	private String usynopsis;//更新内容摘要
	private String ureason;//标准更新原因
	private String standardfile;//标准文件名称
	private String uchapter;//标准更新章节
	private String uscope;//发放范围
	private String bdescription;//更替前标准描述
	private String bfilePath;//更替前附件
	private String adescription;//更替后标准描述
	private String afilePath;//更替后附件
	private String memo;//备注
	private int editorId;//编辑者id
	private String editor;//编辑者名称
	private String editDate;//编辑日期
	private String mailAddrs;//接收邮箱地址
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRecordNo() {
		return recordNo;
	}
	public void setRecordNo(String recordNo) {
		this.recordNo = recordNo;
	}
	public String getUsynopsis() {
		return usynopsis;
	}
	public void setUsynopsis(String usynopsis) {
		this.usynopsis = usynopsis;
	}
	public String getUreason() {
		return ureason;
	}
	public void setUreason(String ureason) {
		this.ureason = ureason;
	}
	public String getStandardfile() {
		return standardfile;
	}
	public void setStandardfile(String standardfile) {
		this.standardfile = standardfile;
	}
	public String getUchapter() {
		return uchapter;
	}
	public void setUchapter(String uchapter) {
		this.uchapter = uchapter;
	}
	public String getUscope() {
		return uscope;
	}
	public void setUscope(String uscope) {
		this.uscope = uscope;
	}
	public String getBdescription() {
		return bdescription;
	}
	public void setBdescription(String bdescription) {
		this.bdescription = bdescription;
	}
	public String getAdescription() {
		return adescription;
	}
	public void setAdescription(String adescription) {
		this.adescription = adescription;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public int getEditorId() {
		return editorId;
	}
	public void setEditorId(int editorId) {
		this.editorId = editorId;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public String getEditDate() {
		return editDate;
	}
	public void setEditDate(String editDate) {
		this.editDate = editDate;
	}
	public String getMailAddrs() {
		return mailAddrs;
	}
	public void setMailAddrs(String mailAddrs) {
		this.mailAddrs = mailAddrs;
	}
	public String getBfilePath() {
		return bfilePath;
	}
	public void setBfilePath(String bfilePath) {
		this.bfilePath = bfilePath;
	}
	public String getAfilePath() {
		return afilePath;
	}
	public void setAfilePath(String afilePath) {
		this.afilePath = afilePath;
	}
	
}
