package com.byd.bms.quality.entity;

public class TestFlowCardDetailBean {
	private int id;
	private int test_card_id;
	private int test_card_template_detail_id;
	private String test_result_name;//检验结果
	private String test_result;//标准故障库id串
	private String seriousLevel;
	private String result_judge;	//结果判定
	private String rework;//返工/返修
	private int workshop_id;
	private String workshop;
	private int workgroup_id;
	private String workgroup;
	private String memo;
	private String process_name;//工序
	private int process_no;
	private String quality_node;//节点
	private String test_item;//检验项目
	private int test_item_no;
	private String test_standard;//技术要求
	private String frequency;//检验频次
	private String test_tools;//检验工具
	private String quality_point_flag;//'质控点标识 N 否 Y 是质控点'
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTest_card_id() {
		return test_card_id;
	}
	public void setTest_card_id(int test_card_id) {
		this.test_card_id = test_card_id;
	}
	public String getTest_result() {
		return test_result;
	}
	public void setTest_result(String test_result) {
		this.test_result = test_result;
	}
	public String getSeriousLevel() {
		return seriousLevel;
	}
	public void setSeriousLevel(String seriousLevel) {
		this.seriousLevel = seriousLevel;
	}
	public String getResult_judge() {
		return result_judge;
	}
	public void setResult_judge(String result_judge) {
		this.result_judge = result_judge;
	}
	public String getRework() {
		return rework;
	}
	public void setRework(String rework) {
		this.rework = rework;
	}
	public int getWorkshop_id() {
		return workshop_id;
	}
	public void setWorkshop_id(int workshop_id) {
		this.workshop_id = workshop_id;
	}
	public String getWorkshop() {
		return workshop;
	}
	public void setWorkshop(String workshop) {
		this.workshop = workshop;
	}
	public int getWorkgroup_id() {
		return workgroup_id;
	}
	public void setWorkgroup_id(int workgroup_id) {
		this.workgroup_id = workgroup_id;
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
	public String getProcess_name() {
		return process_name;
	}
	public void setProcess_name(String process_name) {
		this.process_name = process_name;
	}
	public int getProcess_no() {
		return process_no;
	}
	public void setProcess_no(int process_no) {
		this.process_no = process_no;
	}
	public String getTest_item() {
		return test_item;
	}
	public void setTest_item(String test_item) {
		this.test_item = test_item;
	}
	public int getTest_item_no() {
		return test_item_no;
	}
	public void setTest_item_no(int test_item_no) {
		this.test_item_no = test_item_no;
	}
	public String getTest_standard() {
		return test_standard;
	}
	public void setTest_standard(String test_standard) {
		this.test_standard = test_standard;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public String getTest_tools() {
		return test_tools;
	}
	public void setTest_tools(String test_tools) {
		this.test_tools = test_tools;
	}
	public String getQuality_point_flag() {
		return quality_point_flag;
	}
	public void setQuality_point_flag(String quality_point_flag) {
		this.quality_point_flag = quality_point_flag;
	}
	public int getTest_card_template_detail_id() {
		return test_card_template_detail_id;
	}
	public void setTest_card_template_detail_id(int test_card_template_detail_id) {
		this.test_card_template_detail_id = test_card_template_detail_id;
	}
	public String getTest_result_name() {
		return test_result_name;
	}
	public void setTest_result_name(String test_result_name) {
		this.test_result_name = test_result_name;
	}
	public String getQuality_node() {
		return quality_node;
	}
	public void setQuality_node(String quality_node) {
		this.quality_node = quality_node;
	}
	
}
