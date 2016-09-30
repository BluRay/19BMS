package com.byd.bms.util.poi;

import java.util.List;
import java.util.Map;
/**
 * excel模型对象
 * @company : 比亚迪股份有限公司
 */
public class ExcelModel {
	//用于判断excel文件cell中的数据类型
	public static final Integer CELL_TYPE_NUMERIC = 0; //数字
	public static final Integer CELL_TYPE_STRING = 1; //字符串
	public static final Integer CELL_TYPE_DATE = 11; //日期
	public static final Integer CELL_TYPE_CANNULL = 12; // 值可以为空
	
    /** 
     * 文件路径，这里是包含文件名的路径
     */
    private String path;
	/** 
     * 工作表名
     */
    private String sheetName = "sheet1";
    
    /**
     * 文档主题
     */
    private String docCaption = null; //写操作时
    private int docCaptionRows = 1; //文档主题所占行数
    /** 
     * 数据表的标题内容
     */
    private List<String> header = null;
	/** 
     * 表内数据
     */
    private List<Object[]> data;
    //数据格式 读取excel时，用于简单验证数据的类型
    private Map<String,Integer> dataType;
    private int start = 0; //此参数主要用于设置从sheet页的第几行开始读取数据
    private int readSheets = 0; //读取的excel页数
    
    
    public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getSheetName() {
		return sheetName;
	}
	public void setSheetName(String sheetName) {
		this.sheetName = sheetName;
	}
	public List<String> getHeader() {
		return header;
	}
	public void setHeader(List<String> header) {
		this.header = header;
	}
	public List<Object[]> getData() {
		return data;
	}
	public void setData(List<Object[]> data) {
		this.data = data;
	}
	public Map<String, Integer> getDataType() {
		return dataType;
	}
	public void setDataType(Map<String, Integer> dataType) {
		this.dataType = dataType;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public String getDocCaption() {
		return docCaption;
	}
	public void setDocCaption(String docCaption) {
		this.docCaption = docCaption;
	}
	public int getDocCaptionRows() {
		return docCaptionRows;
	}
	public void setDocCaptionRows(int docCaptionRows) {
		this.docCaptionRows = docCaptionRows;
	}
	public int getReadSheets() {
		return readSheets;
	}
	public void setReadSheets(int readSheets) {
		this.readSheets = readSheets;
	}

}

