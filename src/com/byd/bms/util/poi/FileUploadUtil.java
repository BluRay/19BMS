package com.byd.bms.util.poi;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.byd.bms.util.FileBean;
import com.byd.bms.util.IoUtils;

/**
 * Author:Qingqing.cao Date: Nov 10, 2009 9:01:27 AM Desc:
 */

public class FileUploadUtil {
	private static final Log log = LogFactory.getLog(FileUploadUtil.class);
	private ServletFileUpload servletFileUpload;
	private int fileIndex = 0;
	private String filePath;
	private long singleSizeMax = 2 * 1024 * 1024;// 2M
	private long sizeMax = 20 * 1024 * 1024;// 20M
	private List<FileBean> fileList;
	private List upFileList;
	private String fileNameStart = "";
	private Map paramMap = new HashMap(); //用于存放上传的一些字段
	private HttpServletRequest request;
	private boolean saveFile = true; //是否需要把文件保存在硬盘上，默认需要，false为保存于内存

	/**
	 * 裝載事件
	 * 
	 * @param request
	 */
	public void init(HttpServletRequest request) throws Exception {
		this.refresh();
		this.request = request;
		this.servletFileUpload.setSizeMax(this.sizeMax);
		fileList = new ArrayList();

		List fileItem = this.servletFileUpload.parseRequest(this.request);
		Iterator iter = fileItem.iterator();
		this.upFileList = new ArrayList();
		this.paramMap.clear();
		while (iter.hasNext()) {
			FileItem item = (FileItem) iter.next();
			if (item.isFormField()) {// 是字段

				processFormField(item);
			} else {// 是file
				this.upFileList.add(item);
			}
		}
	}

	/**
	 * 取字段值
	 * 
	 * @param name
	 * @return
	 */
	public String getParameter(String name) {
		return (String) paramMap.get(name.toUpperCase());
	}

	/**
	 * 批量文件保存
	 * 
	 * @param request
	 * @param rollBack
	 *            當某個文件出錯是否回滾(刪除所有已經上傳的文件，竎throws Exception)
	 * @return list+FileBean
	 * @throws java.lang.Exception
	 */
	public List<FileBean> save(boolean rollBack) throws Exception {
		// filePath = request.getContextPath()+filePath;

		for (int i = 0; i < this.upFileList.size(); i++) {
			FileItem item = (FileItem) this.upFileList.get(i);
			if (!item.isFormField() && item.getSize() > 0) {
				try {
					this.fileList.add(processUploadedFile(item));
				} catch (Exception ufe) {
					ufe.printStackTrace();
					if (rollBack) {
						this.rollBack();
						throw new Exception("upload file wrong" + ufe);
					} else {
						log.info(ufe);
						throw new Exception("upload file wrong" + ufe);
					}
				}
			}
		}
		this.upFileList.clear();
		return fileList;
	}

	/**
	 * 提取所有上传的文件
	 * 
	 * @author : qinzhanxing
	 * @date : Nov 13, 2009 3:27:07 PM
	 * @return
	 */
	public List<FileBean> getFiles() {
		return fileList;
	}

	/**
	 * 批量文件保存(按字段名分組)
	 * 
	 * @param nameStartsWith
	 * @param rollBack
	 *            當某個文件出錯是否回滾(刪除所有已經上傳的文件，竎throws Exception)
	 * @return list+FileBean
	 * @throws java.lang.Exception
	 */
	public List<FileBean> getFilesByName(String nameStartsWith, boolean rollBack)
			throws Exception {
		// filePath = request.getContextPath()+filePath;
		this.save(rollBack);
		nameStartsWith = nameStartsWith.trim();
		List namefileList = new ArrayList();
		for (FileBean file : fileList) {
			String fieldName = file.getFieldName().trim();
			log.debug("fieldName=" + fieldName);
			if (fieldName.startsWith(nameStartsWith)) {
				namefileList.add(file);
			}
		}
		return namefileList;
	}

	/**
	 * 上傳單一文件
	 * 
	 * @return
	 * @throws java.lang.Exception
	 */
	public FileBean saveFile() throws Exception {
		// filePath = request.getContextPath()+filePath;
		fileList = new ArrayList();
		for (int i = 0; i < this.upFileList.size(); i++) {
			FileItem item = (FileItem) this.upFileList.get(i);
			if (!item.isFormField() && item.getSize() > 0) {
				try {
					this.fileList.add(processUploadedFile(item));
				} catch (Exception ufe) {
					log.info(ufe);
					throw new Exception("upload file wrong" + ufe);
				}
			}
		}
		if (fileList.size() > 0)
			return (FileBean) fileList.get(0);
		else
			return null;
	}

	/**
	 * 上傳單一文件(按表達字段字段)
	 * 
	 * @param colName
	 * @return
	 * @throws java.lang.Exception
	 */
	public FileBean saveFile(String colName) throws Exception {
		// filePath = request.getContextPath()+filePath;
		fileList = new ArrayList();
		for (int i = 0; i < this.upFileList.size(); i++) {
			FileItem item = (FileItem) this.upFileList.get(i);
			if (!item.isFormField() && item.getSize() > 0) {
				if (!item.getFieldName().equalsIgnoreCase(colName))
					continue;
				try {
					this.fileList.add(processUploadedFile(item));
				} catch (Exception ufe) {
					throw new Exception("upload file wrong" + ufe);
				}
			}
		}
		if (fileList.size() > 0)
			return (FileBean) fileList.get(0);
		else
			return null;
	}

	/**
	 * 數據回滾
	 * 
	 * @throws java.lang.Exception
	 */
	public void rollBack() throws Exception {
		this.delete(fileList);
		this.fileList = null;
		this.upFileList = null;
	}

	/**
	 * 刪除文件
	 * 
	 * @param filePath
	 * @throws java.lang.Exception
	 */
	public void delete(String filePath) throws Exception {
		IoUtils.deleteFile(this.filePath + filePath);
	}

	/**
	 * 刪除文件
	 * 
	 * @param fileList
	 * @throws java.lang.Exception
	 */
	public void delete(List fileList) throws Exception {
		String fileNames = "";
		if (fileList != null && fileList.size() > 0) {
			for (int i = 0; i < fileList.size(); i++) {
				FileBean file = (FileBean) fileList.get(i);
				fileNames += filePath + file.getPathName() + ",";
			}
			IoUtils.deleteFile(fileNames);
		}
	}

	/**
	 * 由於采用單例模式，所以要銷毀一些公共變量
	 */
	public void destroy() {
		this.paramMap.clear();
		this.upFileList.clear();
	}

	public void refresh() throws Exception {
		this.fileList = new ArrayList();
		this.paramMap.clear();
		this.fileIndex = 0;
		this.fileNameStart = "";
	}

	public ServletFileUpload getServletFileUpload() {
		return servletFileUpload;
	}

	public void setServletFileUpload(ServletFileUpload servletFileUpload) {
		this.servletFileUpload = servletFileUpload;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		IoUtils.createFolder(filePath);
		this.filePath = filePath;
	}

	public long getSingleSizeMax() {
		return singleSizeMax;
	}

	public void setSingleSizeMax(long singleSizeMax) {
		this.singleSizeMax = singleSizeMax;
	}

	public long getSizeMax() {
		return sizeMax;
	}

	public void setSizeMax(long SizeMax) {
		this.sizeMax = SizeMax;
	}

	/**
	 * ＊＊＊＊＊輔助方法＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
	 */

	/**
	 * 非file類型字段收集
	 * 
	 * @param item
	 */
	public void processFormField(FileItem item) {
		try {

			String filedName = item.getFieldName().trim().toUpperCase();
			String filedValue = item.getString(this.getServletFileUpload()
					.getHeaderEncoding());
			if (paramMap.get(filedName) != null) {
				paramMap.put(filedName, paramMap.get(filedName) + ","
						+ filedValue);
			} else {
				paramMap.put(filedName, filedValue);
			}

		} catch (Exception ex) {
		}
	}

	/**
	 * 取上傳文件的原始文件名稱（含後綴）
	 * 
	 * @param pathName
	 * @return
	 */
	public String getUploadFileName(String pathName) {
		int startIndex = pathName.lastIndexOf("\\");
		if (startIndex < 0)
			startIndex = 0;
		int endIndex = pathName.length();
		return pathName.substring(startIndex + 1, endIndex);
	}

	/**
	 * 生成不重複的保存文件名
	 * 
	 * @param pathName
	 * @return
	 */
	public String getSaveFileName(String pathName) {
		fileIndex++;
		java.util.Date date = new java.util.Date();
		java.text.DateFormat ft = new java.text.SimpleDateFormat(
				"yyyyMMddHHmmssSSS");
		String dateStr = ft.format(date);
		return this.getFileNameStart() + dateStr + "_"
				+ String.valueOf(fileIndex) + "."
				+ IoUtils.getFileType(pathName);
	}

	/**
	 * 用于解析物料的
	 */
	public FileBean processUploadedFile(FileItem item) throws Exception {
		String fileName = getUploadFileName(item.getName());
		String newName = getSaveFileName(item.getName());
		String fileType = IoUtils.getFileType(item.getName());
		// 如果需要把文件保存于硬盘上，就需要建立文件对象
		FileBean fileBean = new FileBean();
		if (this.saveFile) {
			File newFile = new File(this.filePath + newName);
			item.write(newFile);
		} else {
			// 否则就只需要把文件对象赋予fileBean
			fileBean.setFileItem(item);
		}

		fileBean.setFileName(fileName);
		fileBean.setFileSize(item.getSize());
		fileBean.setFileType(fileType);
		fileBean.setContentType(item.getContentType());
		fileBean.setPathName(newName);
		fileBean.setFieldName(item.getFieldName());
		return fileBean;
	}

	public String getFileNameStart() {
		return fileNameStart;
	}

	public void setFileNameStart(String fileNameStart) {
		this.fileNameStart = fileNameStart;
	}

	public boolean isSaveFile() {
		return saveFile;
	}

	public void setSaveFile(boolean saveFile) {
		this.saveFile = saveFile;
	}

}
