package com.byd.bms.quality.entity;

public class MaterialAbnormalBean {
	private int id;
	private int factoryId;
	private String factory;
	private int workshopId;
	private String workshop;
	private String occurDate;//发生日期
	private int busTypeId;
	private String busType;
	private int orderId;
	private String orderNo;
	private String order;
	private String material;//物料名称
	private String bugLevel;//异常等级
	private String bugDesc;//异常描述
	private String bugPhotoPath;//异常图片路径
	private String imPhotoPath;//改善后图片路径
	private String tmpMeasure;//临时措施
	private String faultReason;//原因分析
	private String impMeasure;//改善预防措施
	private String respUnit;//责任部门
	private String respPerson;//责任人
	private String expcFinishDate;//预计完成时间
	private String verifier;//验证人
	private String verifyResult;//验证结果
	private String memo;
	private int editorId;
	private String editor;
	private String editDate;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFactoryId() {
		return factoryId;
	}
	public void setFactoryId(int factoryId) {
		this.factoryId = factoryId;
	}
	public String getFactory() {
		return factory;
	}
	public void setFactory(String factory) {
		this.factory = factory;
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
	public String getOccurDate() {
		return occurDate;
	}
	public void setOccurDate(String occurDate) {
		this.occurDate = occurDate;
	}
	public int getBusTypeId() {
		return busTypeId;
	}
	public void setBusTypeId(int busTypeId) {
		this.busTypeId = busTypeId;
	}
	public String getBusType() {
		return busType;
	}
	public void setBusType(String busType) {
		this.busType = busType;
	}
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	public String getBugLevel() {
		return bugLevel;
	}
	public void setBugLevel(String bugLevel) {
		this.bugLevel = bugLevel;
	}
	public String getBugDesc() {
		return bugDesc;
	}
	public void setBugDesc(String bugDesc) {
		this.bugDesc = bugDesc;
	}
	public String getBugPhotoPath() {
		return bugPhotoPath;
	}
	public void setBugPhotoPath(String bugPhotoPath) {
		this.bugPhotoPath = bugPhotoPath;
	}
	public String getImPhotoPath() {
		return imPhotoPath;
	}
	public void setImPhotoPath(String imPhotoPath) {
		this.imPhotoPath = imPhotoPath;
	}
	public String getTmpMeasure() {
		return tmpMeasure;
	}
	public void setTmpMeasure(String tmpMeasure) {
		this.tmpMeasure = tmpMeasure;
	}
	public String getFaultReason() {
		return faultReason;
	}
	public void setFaultReason(String faultReason) {
		this.faultReason = faultReason;
	}
	public String getImpMeasure() {
		return impMeasure;
	}
	public void setImpMeasure(String impMeasure) {
		this.impMeasure = impMeasure;
	}
	public String getRespUnit() {
		return respUnit;
	}
	public void setRespUnit(String respUnit) {
		this.respUnit = respUnit;
	}
	public String getRespPerson() {
		return respPerson;
	}
	public void setRespPerson(String respPerson) {
		this.respPerson = respPerson;
	}
	public String getExpcFinishDate() {
		return expcFinishDate;
	}
	public void setExpcFinishDate(String expcFinishDate) {
		this.expcFinishDate = expcFinishDate;
	}
	public String getVerifier() {
		return verifier;
	}
	public void setVerifier(String verifier) {
		this.verifier = verifier;
	}
	public String getVerifyResult() {
		return verifyResult;
	}
	public void setVerifyResult(String verifyResult) {
		this.verifyResult = verifyResult;
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
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	
}
