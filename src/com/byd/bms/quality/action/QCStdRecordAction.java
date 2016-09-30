package com.byd.bms.quality.action;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.quality.entity.QCStdRecordBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class QCStdRecordAction extends BaseAction<Object> {

	private static final long serialVersionUID = -6049277883809438624L;
	private IQualityDao qualityDao;
	private File afile;
	private String afileFileName;
	private String afileContentType;
	private File bfile;
	private String bfileFileName;
	private String bfileContentType;
	private QCStdRecordBean stdRecord;
	private Map<String, Object> result;
	private String recordNo;
	private String stdFileName;
	private String update_start;
	private String update_end;
	private int recordId;
	private Pager pager;

	public IQualityDao getQualityDao() {
		return qualityDao;
	}

	public void setQualityDao(IQualityDao qualityDao) {
		this.qualityDao = qualityDao;
	}

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}

	public File getAfile() {
		return afile;
	}

	public void setAfile(File afile) {
		this.afile = afile;
	}

	public String getAfileFileName() {
		return afileFileName;
	}

	public void setAfileFileName(String afileFileName) {
		this.afileFileName = afileFileName;
	}

	public String getAfileContentType() {
		return afileContentType;
	}

	public void setAfileContentType(String afileContentType) {
		this.afileContentType = afileContentType;
	}

	public File getBfile() {
		return bfile;
	}

	public void setBfile(File bfile) {
		this.bfile = bfile;
	}

	public String getBfileFileName() {
		return bfileFileName;
	}

	public void setBfileFileName(String bfileFileName) {
		this.bfileFileName = bfileFileName;
	}

	public String getBfileContentType() {
		return bfileContentType;
	}

	public void setBfileContentType(String bfileContentType) {
		this.bfileContentType = bfileContentType;
	}

	public QCStdRecordBean getStdRecord() {
		return stdRecord;
	}

	public void setStdRecord(QCStdRecordBean stdRecord) {
		this.stdRecord = stdRecord;
	}

	public String getRecordNo() {
		return recordNo;
	}

	public void setRecordNo(String recordNo) {
		this.recordNo = recordNo;
	}

	public String getStdFileName() {
		return stdFileName;
	}

	public void setStdFileName(String stdFileName) {
		this.stdFileName = stdFileName;
	}

	public String getUpdate_start() {
		return update_start;
	}

	public void setUpdate_start(String update_start) {
		this.update_start = update_start;
	}

	public String getUpdate_end() {
		return update_end;
	}

	public void setUpdate_end(String update_end) {
		this.update_end = update_end;
	}

	public int getRecordId() {
		return recordId;
	}

	public void setRecordId(int recordId) {
		this.recordId = recordId;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	/**
	 * 品质标准更新记录首页
	 */
	public String index() {
		return "index";
	}

	/**
	 * 
	 */
	public String showRecordList() {
		result = new HashMap<String, Object>();
		Map conditionMap = new HashMap();
		// 封装查询条件
		conditionMap.put("recordNo", recordNo);
		conditionMap.put("stdFileName", stdFileName);
		conditionMap.put("updateStart", update_start);
		conditionMap.put("updateEnd", update_end);
		conditionMap.put("offset",
				(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", qualityDao.getStdRecordList(conditionMap));
		int totalCount = qualityDao.getStdRecordCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}

	/**
	 * 品质标准更新记录保存
	 */
	public String addRecord() {
		String createTime = Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id = getUser().getId();
		String bpath = "docs/upload/qcStandard/";
		// 把上传的文件放到指定的路径下
		String path = ServletActionContext.getServletContext().getRealPath(
				bpath);
		// 写到指定的路径中
		File file = new File(path);
		// 如果指定的路径没有就创建
		if (!file.exists()) {
			file.mkdirs();
		}
		String afile_db = "qcAfile_"
				+ createTime.replace("-", "").replace(":", "").replace(" ", "")
				+ afileFileName.substring(afileFileName.indexOf("."),
						afileFileName.length());
		String bfile_db= "qcBfile_"
				+ createTime.replace("-", "").replace(":", "").replace(" ", "")
				+ bfileFileName.substring(bfileFileName.indexOf("."),
						bfileFileName.length());
		if (afile != null) {
			try {
				FileUtils.copyFile(afile, new File(file, afile_db));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (bfile != null) {
			try {
				FileUtils.copyFile(bfile, new File(file, bfile_db));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		stdRecord.setAfilePath(bpath + afile_db);
		stdRecord.setBfilePath(bpath + bfile_db);
		stdRecord.setEditorId(user_id);
		stdRecord.setEditDate(createTime);
		qualityDao.insertStdRecord(stdRecord);
		result = new HashMap<String, Object>();
		result.put("success", true);
		result.put("message", "保存成功");
		return SUCCESS;
	}

	/**
	 * 品质标准更新记录预览
	 */
	public String showStdRecord() {
		result = new HashMap<String, Object>();
		QCStdRecordBean stdRecord = qualityDao.selectStdRecord(recordId);
		result.put("stdRecord", stdRecord);
		return SUCCESS;
	}
}
