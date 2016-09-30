package com.byd.bms.quality.entity;

public class TestTplDetailBean {
	private int id;
	private int tplRecordId;
	private int processNo;
	private String processName;
	private int testItemNo;
	private String testItemName;
	private int testStdNo;
	private String testStdName;
	private int frequencyId;
	private String frequency;
	private int testToolsId;
	private String testTools;
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
	public String getTestTools() {
		return testTools;
	}
	public void setTestTools(String testTools) {
		this.testTools = testTools;
	}
	public int getProcessNo() {
		return processNo;
	}
	public void setProcessNo(int processNo) {
		this.processNo = processNo;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public int getTestItemNo() {
		return testItemNo;
	}
	public void setTestItemNo(int testItemNo) {
		this.testItemNo = testItemNo;
	}
	public String getTestItemName() {
		return testItemName;
	}
	public void setTestItemName(String testItemName) {
		this.testItemName = testItemName;
	}
	public int getTestStdNo() {
		return testStdNo;
	}
	public void setTestStdNo(int testStdNo) {
		this.testStdNo = testStdNo;
	}
	public String getTestStdName() {
		return testStdName;
	}
	public void setTestStdName(String testStdName) {
		this.testStdName = testStdName;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public int getFrequencyId() {
		return frequencyId;
	}
	public void setFrequencyId(int frequencyId) {
		this.frequencyId = frequencyId;
	}
	public int getTestToolsId() {
		return testToolsId;
	}
	public void setTestToolsId(int testToolsId) {
		this.testToolsId = testToolsId;
	}
	
}
