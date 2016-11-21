package com.byd.bms.util.poi;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * excel文件操作类
 * @company : 比亚迪股份有限公司
 */
public class ExcelOperator {
	
	
	/**
	 * 创建一个Excel文件
	 * @return Workbook
	 */
	public  Workbook createWorkbook(String fileType) throws Exception{
		Workbook workbook =null;
		try {
			if(".xlsx".equals(fileType)){
				//07版
				workbook = new XSSFWorkbook();
			}else if(".xls".equals(fileType)){
				//03版
				workbook = new HSSFWorkbook();
			}else{
				throw new Exception("设置的文件后缀："+fileType+"，为非excel文件格式！");
			}
		} catch (Exception e) {
			System.out.println("创建workbook出错："+e.getMessage());
			throw new Exception("创建workbook出错："+e.getMessage());
		}
		return workbook;
	}
	/**
	 * 根据文件路径（模板文件）创建一个workbook
	 * @param filePath 文件全路径
	 * @return
	 */
	public  Workbook createWorkbookByTemp(String filePath) throws Exception{
		Workbook workbook =null;
		try {
			String fileType = filePath.substring(filePath.lastIndexOf("."));
			File file = new File(filePath);
			FileInputStream fileIn=new FileInputStream(file);
			if(".xlsx".equals(fileType)){
				//07版
				workbook = new XSSFWorkbook(fileIn);
			}else if(".xls".equals(fileType)){
				//03版
				workbook = new HSSFWorkbook(fileIn);
			}else{
				throw new Exception("设置的文件后缀："+fileType+"，为非excel文件格式！");
			}
		} catch (Exception e) {
			throw new Exception("创建workbook出错："+e.getMessage());
		}
		return workbook;
	}
	/**
	 * 根据传入的输入流，创建一个workbook
	 * @param filePath 文件类型
	 * @return excel workbook
	 */
	public Workbook createWorkbookByInputStream(InputStream inputStream,String fileType) throws Exception{
		Workbook workbook =null;
		try {
			if(fileType.indexOf(".xlsx")>=0){
				//07版
				workbook = new XSSFWorkbook(inputStream);
			}else if(fileType.indexOf(".xls")>=0){
				//03版
				workbook = new HSSFWorkbook(inputStream);
			}else{
				throw new Exception("传入的文件类型:"+fileType+"，为非excel文件格式！");
			}
		} catch (Exception e) {
			throw new Exception("创建workbook出错:"+e.getMessage());
		}
		return workbook;
	}

	/**
	 * 读取excel中第sheetIndex sheet的数据
	 * @param workbook
	 * @param sheetIndex
	 * @return List<Map<String,Object>> String:列号，列值
	 */
	public  List<Object[]> getSheetData(Sheet sheet,Map<String,Integer> cellDataType,int start,ExcelModel excelModel) throws Exception{
		List<Object[]> result = new ArrayList<Object[]>();
		try {
			int lastRowNum = sheet.getLastRowNum();
			if(lastRowNum>0){
				for(int i=start;i<=lastRowNum;i++){
					Object[] objArr = this.getRowData(sheet, i,cellDataType,start,excelModel);
					if(null != objArr){
						result.add(objArr);
					}
				}
			}
		} catch (Exception e) {
			throw new Exception(e);
		}
		return result;
	}
	/**
	 * 获取sheet某行中的所有数据
	 * @param sheet sheet页
	 * @param rowIndex 行号
	 * @return 返回某行中数据数组，返回null（出现异常）
	 */
	public Object[] getRowData(Sheet sheet,int rowIndex,Map<String,Integer> cellDataType,int start,ExcelModel excelModel) throws Exception{
		StringBuffer errorMsg = new StringBuffer();
		Object[] rowData;
		try {
			Row row = sheet.getRow(rowIndex);
			if(null == row){
				errorMsg.append("第"+(rowIndex+1)+"行无数据，读取出错！");
				return null;
			}
			boolean flag = false;  
            for(Cell c:row){  
                if(c.getCellType() != Cell.CELL_TYPE_BLANK){  
                    flag = true;  
                    break;  
                }  
            }
			// 列数
			int columnNum = sheet.getRow(start) == null ? (start):(excelModel.getHeader()== null ? sheet.getRow(start).getLastCellNum() : excelModel.getHeader().size());
			rowData = new Object[columnNum];
            if(flag){
				for(int i=0;i<columnNum;i++){
					if(null != cellDataType){
						//取数据格式
						Integer must = cellDataType.get(String.valueOf(i));
						Cell cell = row.getCell(i);
						if (cell != null) {
							
							if(null != must && (must.intValue() == cell.getCellType() || must == ExcelModel.CELL_TYPE_DATE || must == ExcelModel.CELL_TYPE_CANNULL)){
								//数据格式正确
								String value = "";
								switch(cell.getCellType()){
								case Cell.CELL_TYPE_NUMERIC: 
									if (must.intValue() == ExcelModel.CELL_TYPE_DATE) {
										SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
										value = sdf.format(cell.getDateCellValue());
									} else {
										NumberFormat f = new DecimalFormat("##########.####");
										value = f.format(cell.getNumericCellValue());
									}
									break;
								case Cell.CELL_TYPE_STRING:
									value = cell.getStringCellValue();
									break;
								}
								rowData[i] = value;
							}else if(null == must){
								String value = "";
								switch(cell.getCellType()){
									case Cell.CELL_TYPE_NUMERIC: 
									     NumberFormat f = new DecimalFormat("##########.####");
									     value = f.format(cell.getNumericCellValue());
									     break;
									case Cell.CELL_TYPE_STRING:
										value = cell.getStringCellValue();
									     break;
									case Cell.CELL_TYPE_BLANK:
										value = "";
										break;
								}
								rowData[i] = value;
							}else if(cell.getCellType() == Cell.CELL_TYPE_BLANK){
								rowData[i] = "";
							}else{
								String mustType = must==null?"未知": must.intValue()==Cell.CELL_TYPE_NUMERIC?"数字":must.intValue()==Cell.CELL_TYPE_STRING?"字符串":"未知";
								String cellType = cell.getCellType()==Cell.CELL_TYPE_NUMERIC?"数字":cell.getCellType()==Cell.CELL_TYPE_STRING?"字符串":"未知";
								errorMsg.append("名称为"+sheet.getSheetName()+"的sheet页的第"+rowIndex+"行，第"+(i+1)+"列的数据格式有误，应为"+mustType+"类型，实际为"+cellType+"类型。");
								throw new Exception(errorMsg.toString());
							}
						}else{
							rowData[i] = "";
						}
					}else{
						Cell cell = row.getCell(i);
						String value = "";
						if(null != cell){
							switch(cell.getCellType()){
								case Cell.CELL_TYPE_NUMERIC: 
								     NumberFormat f = new DecimalFormat("##########.####");
								     value = f.format(cell.getNumericCellValue());
								     break;
								case Cell.CELL_TYPE_STRING:
									value = cell.getStringCellValue();
								     break;
								case Cell.CELL_TYPE_BLANK:
									value = "";
									break;
							}
						}
						rowData[i] = value;
					}
				}
            }else{
            	rowData=null;
            }
		} catch (Exception e) {
			//e.printStackTrace();
			rowData=null;
			throw new Exception(errorMsg.toString());
		}
		return rowData;
	}
	/**
	 * 将ExcelModel中的数据写入excel文件
	 * @param excelModel
	 * @return 生成的excel文件对象
	 * @throws Exception
	 */
	public Workbook writeExcel(ExcelModel excelModel) throws Exception{
		Workbook workbook = null;
		try {
			/*
			 * 文档主题
			 */
			String docCaption = excelModel.getDocCaption();
			int docCaptionRows = excelModel.getDocCaptionRows();
			/*
			 * 数据表头信息
			 */
            List header = excelModel.getHeader();
            /*
             * 数据信息
             */
            List<Object[]> dataList = excelModel.getData();
			/**
			 * 创建excel模型对象
			 */
			String fileType = excelModel.getPath().substring(excelModel.getPath().lastIndexOf("."));
			workbook = this.createWorkbook(fileType);
			Sheet sheet = this.createSheet(workbook, excelModel.getSheetName());
			int rowIndex = 0;

			if(null != docCaption && !"".equals(docCaption.trim())){
				//列数
				int cellNum = 0;
				if(null != header){
					cellNum = header.size();
				}
				//写入主题
				for(int i=0;i<docCaptionRows;i++){
					Row row = sheet.createRow((short)rowIndex);
					for(int j=0;j<cellNum;j++){
						Cell cell = row.createCell((short)i);
					}
				}
				//创建主题样式
				CellStyle cellStyle = this.creatDocCaptionStyle(workbook);
				//this.merged(sheet, 0, 0, docCaptionRows-1, cellNum-1, cellStyle);
				//插入主题内容
				Row captionRow = sheet.createRow((short)0);
				Cell captionCell = captionRow.createCell((short)0);
				captionCell.setCellStyle(cellStyle);
				captionCell.setCellValue(docCaption);
				
				rowIndex += docCaptionRows;
			}
            if(header!=null){
    			/**
    			 * 写入表头信息
    			 */
    			CellStyle cellStyle = this.creatHeadStyle(workbook);
                //创建行（最顶端的行）
                Row row = sheet.createRow((short)rowIndex);
	            for(int i=0;i<header.size();i++){
	            	sheet.setColumnWidth(i, 4500);
	            	//在索引0的位置创建单元格（左上端）
	            	Cell cell = row.createCell((short)i);
	            	// 定义单元格为字符串类型
	            	cell.setCellType(Cell.CELL_TYPE_STRING);
	            	//设置单元格的格式
	            	cell.setCellStyle(cellStyle);
	            	// 在单元格中写入表头信息
	            	cell.setCellValue((String)header.get(i));
	            }
	            ++rowIndex;
            }
			/**
			 * 写入数据信息
			 */
            CellStyle style = ExcelOperator.creatNameStyle(workbook);
            this.setRowData(sheet, rowIndex, dataList, style);
		} catch (Exception e) {
			throw new Exception("将excel模型对象workbook写入到输出流出错："+e.getMessage());
		}
		return workbook;
	}		
	/**
	 * 在workbook上创建一个名称为sheetName的sheet
	 * @param workbook
	 * @param sheetName sheet名
	 * @return 如果成功返回创建的sheet，否则为null
	 */
	private static Sheet createSheet(Workbook workbook,String sheetName) throws Exception{
		Sheet sheet = null;
		try {
			sheet=workbook.createSheet(sheetName);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("在workbook上创建一个名称为sheetName的sheet出错："+e.getMessage());
		}
		if(sheet!=null){
			return sheet;
		}
		return null;
	}
		
	/**
	 * 在sheet的指定行号上创建一行
	 * @param sheet
	 * @param rowIndex
	 * @param dataArr
	 * @param style
	 * @return 返回操作成功标记
	 */
	private boolean setRowData(Sheet sheet,int rowIndex,Object[] dataArr,CellStyle style){
		boolean success = false;
		if(rowIndex <0){
			rowIndex = sheet.getLastRowNum();
		}
		Row row = sheet.createRow(rowIndex);
		try {
			for(int i=0;i<dataArr.length;i++){
				Cell cell = row.createCell(i);
				if(null != style){
					cell.setCellStyle(style);
				}
				if(dataArr[i]!=null&&dataArr[i].toString().trim().length()>0){
					cell.setCellValue(dataArr[i].toString().trim());
				}else{
					cell.setCellValue("");
				}
				
			}
			success = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return success;
	}
	/**
	 * 在sheet上插入多行数据
	 * @param sheet
	 * @param rowIndex
	 * @param dataList
	 * @param style
	 * @return 返回
	 */
	private int setRowData(Sheet sheet,int rowIndex,List<Object[]> dataList,CellStyle style){
		if(rowIndex<0){
			rowIndex = sheet.getLastRowNum();
		}
		int lastIndex=rowIndex;	
		try {
			if(null == dataList && dataList.size()<1){
				return lastIndex;
			}
			Iterator<Object[]> it= dataList.iterator();
			while(it.hasNext()){
				Object[] obj=(Object[])it.next();
				if(this.setRowData(sheet,lastIndex,obj,style)){
					++lastIndex;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			lastIndex=rowIndex;	
		}
		return lastIndex;
	}
	/**
	 * 创建日期数据的显示类型
	 * @param work
	 * @return
	 */
    private  static CellStyle dataStyle(Workbook work) {   
        CellStyle dataStyle = work.createCellStyle();  
        dataStyle.setDataFormat(work.getCreationHelper().createDataFormat().getFormat("2010/08/12"));
        dataStyle.setBorderBottom((short)1);   
        dataStyle.setBorderLeft((short)1);   
        dataStyle.setBorderRight((short)1);   
        dataStyle.setBorderTop((short)1);   
        dataStyle.setFillForegroundColor(IndexedColors.RED.getIndex() );   
        dataStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);   
        dataStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);   
        return dataStyle;   
    }
    /**
     * 创建文档主题样式
     * @param workbook
     * @return
     */
    private static CellStyle creatDocCaptionStyle(Workbook workbook){
        //设置表头字体
		Font font_h = workbook.createFont();
		font_h.setBoldweight(Font.BOLDWEIGHT_BOLD);
		font_h.setFontHeightInPoints((short)14);
		font_h.setColor(IndexedColors.DARK_TEAL.getIndex());
        //设置格式
        CellStyle cellStyle= workbook.createCellStyle();
        cellStyle.setFont(font_h);
        cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        cellStyle.setBorderBottom((short)1);   
        cellStyle.setBorderLeft((short)1);   
        cellStyle.setBorderRight((short)1);   
        cellStyle.setBorderTop((short)1);
        cellStyle.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());   
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);   
        return cellStyle;
    }
    /**
     * 创建数据表头样式
     * @param workbook
     * @return
     */
    private static CellStyle creatHeadStyle(Workbook workbook) {
        //设置表头字体
		Font font_h = workbook.createFont();
		font_h.setBoldweight(Font.BOLDWEIGHT_BOLD);
		font_h.setFontHeightInPoints((short)12);
		font_h.setColor(IndexedColors.GREEN.getIndex());
        //设置格式
        CellStyle cellStyle= workbook.createCellStyle();
        cellStyle.setFont(font_h);
        cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        cellStyle.setBorderBottom((short)1);   
        cellStyle.setBorderLeft((short)1);   
        cellStyle.setBorderRight((short)1);   
        cellStyle.setBorderTop((short)1);
        cellStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());   
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);   
        return cellStyle;
    }
	/**
	 * 创建普通数据显示类型
	 * @param work
	 * @return
	 */
    private static CellStyle creatNameStyle(Workbook work) {
    	CellStyle nameStyle = work.createCellStyle();   
    	nameStyle.setBorderBottom((short)1);   
	    nameStyle.setBorderLeft((short)1);   
	    nameStyle.setBorderRight((short)1);   
	    nameStyle.setBorderTop((short)1);   
	    return nameStyle;   
    }
    /**
     * excel合并
     * @param sheet
     * @param startRow
     * @param startCell
     * @param endRow
     * @param endCell
     * @param cs
     * @throws Exception 
     */
    private static void merged(Sheet sheet, int startRow, int startCell,   
	                int endRow, int endCell, CellStyle cs) throws Exception { 
    	try{
	        CellRangeAddress cellRangeAddress = new CellRangeAddress(startRow,endRow, (short) startCell,(short) endCell);   
	        sheet.addMergedRegion(cellRangeAddress);   
	        //setRegionStyle(sheet, cellRangeAddress, cs);   
    	}catch(Exception e){
    		System.out.println("创建workbook出错："+e.getMessage());
    		throw new Exception("创建workbook出错："+e.getMessage());
    	}
    }   
	/**
	 * 设置合并后的样式
	 * @param sheet
	 * @param cellRangeAddress
	 * @param cs
	 */
    private static void setRegionStyle(Sheet sheet, CellRangeAddress cellRangeAddress,   
            CellStyle cs) {   
        for (int i = cellRangeAddress.getFirstRow(); i <= cellRangeAddress.getLastRow(); i++) {   
            Row row = sheet.getRow(i);   
            for (int j = cellRangeAddress.getFirstColumn(); j <= cellRangeAddress.getLastColumn(); j++) {   
                Cell cell = row.getCell((short) j);   
                cell.setCellStyle(cs);   
            }   
        }   
    } 
}
