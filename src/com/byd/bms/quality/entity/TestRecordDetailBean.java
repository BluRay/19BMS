package com.byd.bms.quality.entity;

public class TestRecordDetailBean {
	private int id;
	private int headerId;
	private int tplDetailId;
	private String result;//检验结果
	private String faultIds;//标准故障库id串
	private String seriousLevel;
	private String resultJudge;	//结果判定
	private String reworkResult;//返工/返修
	private int workshopId;
	private String workshop;
	private int workgroupId;
	private String workgroup;
	private String memo;
	private String process;//工序节点
	private int processNo;
	private String testItem;//检验项目
	private int testItemNo;
	private String standard;//技术要求
	private String frequency;//检验频次
	private String testTools;//检验工具
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getHeaderId() {
		return headerId;
	}
	public void setHeaderId(int headerId) {
		this.headerId = headerId;
	}
	public int getTplDetailId() {
		return tplDetailId;
	}
	public void setTplDetailId(int tplDetailId) {
		this.tplDetailId = tplDetailId;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getSeriousLevel() {
		return seriousLevel;
	}
	public void setSeriousLevel(String seriousLevel) {
		this.seriousLevel = seriousLevel;
	}
	public String getResultJudge() {
		return resultJudge;
	}
	public void setResultJudge(String resultJudge) {
		this.resultJudge = resultJudge;
	}
	public String getReworkResult() {
		return reworkResult;
	}
	public void setReworkResult(String reworkResult) {
		this.reworkResult = reworkResult;
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
	public int getWorkgroupId() {
		return workgroupId;
	}
	public void setWorkgroupId(int workgroupId) {
		this.workgroupId = workgroupId;
	}
	public String getWorkgroup() {
		return workgroup;
	}
	public void setWorkgroup(String workgroup) {
		this.workgroup = workgroup;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getProcess() {
		return process;
	}
	public void setProcess(String process) {
		this.process = process;
	}
	public String getTestItem() {
		return testItem;
	}
	public void setTestItem(String testItem) {
		this.testItem = testItem;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
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
	public int getTestItemNo() {
		return testItemNo;
	}
	public void setTestItemNo(int testItemNo) {
		this.testItemNo = testItemNo;
	}
	public String getFaultIds() {
		return faultIds;
	}
	public void setFaultIds(String faultIds) {
		this.faultIds = faultIds;
	}	
	
}
