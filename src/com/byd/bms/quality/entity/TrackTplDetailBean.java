package com.byd.bms.quality.entity;

public class TrackTplDetailBean {
	private int id;
	private int tplRecordId;
	private int workshopId;
	private String workshop;
	private String processNo;
	private String processName;
	private int sequence;
	private int partsId;
	private String parts;
	private String memo;
	private String keyParts;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTplRecordId() {
		return tplRecordId;
	}
	public void setTplRecordId(int tplRecordId) {
		this.tplRecordId = tplRecordId;
	}
	public int getWorkshopId() {
		return workshopId;
	}
	public void setWorkshopId(int workshopId) {
		this.workshopId = workshopId;
	}
	public String getWorkshop() {
		return workshop;
	}
	public void setWorkshop(String workshop) {
		this.workshop = workshop;
	}
	public int getSequence() {
		return sequence;
	}
	public void setSequence(int sequence) {
		this.sequence = sequence;
	}
	public int getPartsId() {
		return partsId;
	}
	public void setPartsId(int partsId) {
		this.partsId = partsId;
	}
	public String getParts() {
		return parts;
	}
	public void setParts(String parts) {
		this.parts = parts;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getProcessNo() {
		return processNo;
	}
	public void setProcessNo(String processNo) {
		this.processNo = processNo;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public String getKeyParts() {
		return keyParts;
	}
	public void setKeyParts(String keyParts) {
		this.keyParts = keyParts;
	}
	
}
