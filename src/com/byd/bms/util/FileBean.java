package com.byd.bms.util;

import org.apache.commons.fileupload.FileItem;

/**
 * Author:Qingqing.cao
 * Date: Nov 10, 2009 9:03:33 AM
 * Desc: 文件BEAN
 */
public class FileBean {

    private String pathName;
    private String fileName;
    private String filePath;
    private String fileType;
    private String contentType;
    private String fieldName;
    private int file_id;
    private long   fileSize;
    //FCK所使用的属性
    private String oldPath;
    private boolean newFile;
    private boolean photo;
    //文件上传对象
    private FileItem fileItem;
    
	public String getPathName() {
		return pathName;
	}
	public void setPathName(String pathName) {
		this.pathName = pathName;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public String getFieldName() {
		return fieldName;
	}
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	public int getFile_id() {
		return file_id;
	}
	public void setFile_id(int file_id) {
		this.file_id = file_id;
	}
	public long getFileSize() {
		return fileSize;
	}
	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}
	public boolean isNewFile() {
		return newFile;
	}
	public void setNewFile(boolean newFile) {
		this.newFile = newFile;
	}
	public boolean isPhoto() {
		return photo;
	}
	public void setPhoto(boolean photo) {
		this.photo = photo;
	}
	public String getOldPath() {
		return oldPath;
	}
	public void setOldPath(String oldPath) {
		this.oldPath = oldPath;
	}
	public FileItem getFileItem() {
		return fileItem;
	}
	public void setFileItem(FileItem fileItem) {
		this.fileItem = fileItem;
	}
}
