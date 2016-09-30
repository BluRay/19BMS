package com.byd.bms.util.poi;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class ExcelTool {
	private ExcelOperator excelOperator;
	
	public ExcelTool(){
		excelOperator = new ExcelOperator();
	}
	/**
	 * 将excel模型对象workbook写入到输出流
	 * @param workbook
	 * @param out 输出流
	 * @throws Exception
	 */
	public void downLoad(ExcelModel excelModel,OutputStream out) throws Exception{
		try {
			Workbook workbook = excelOperator.writeExcel(excelModel);
			/**
			 * 写入输出流
			 */
			workbook.write(out);
		} catch (Exception e) {
			throw new Exception("将excel模型对象workbook写入到输出流出错："+e.getMessage());
		}
	}
	
	/**
	 * 保存excel 保存到硬盘上
	 * @param workbook 需要保存的excel
	 * @param savePath 保存路径
	 * @return 是否成功
	 */
	public boolean saveExcel(ExcelModel excelModel,String savePath){
		FileOutputStream fileOut=null;
		try {
			Workbook workbook = excelOperator.writeExcel(excelModel);
			File file = new File(savePath.toString());
			fileOut = new FileOutputStream(file);
			if(workbook == null)
				return false;
			workbook.write(fileOut);
			return true;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return false;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally{
			if(fileOut!=null){
				try {
					fileOut.flush();
					fileOut.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 读取filePath路径下的excel文件，并且将数据封装到ExcelModel
	 * @param filePath
	 * @param excelModel 封装了excel列的数据类型信息
	 * @return excelModel 读取的数据保存在此对象中
	 * @throws Exception
	 */
	public ExcelModel readExcel(String filePath,ExcelModel excelModel) throws Exception{
		List<Object[]> allData = new ArrayList<Object[]>();
		try {
			excelModel.setPath(filePath);
			Workbook workbook = excelOperator.createWorkbookByTemp(filePath);
			//取得所有sheet页数
			int allSheetNumber = excelModel.getReadSheets()!=0?excelModel.getReadSheets():workbook.getNumberOfSheets();
			List<Object[]> sheetDataList = new ArrayList<Object[]>();
			for(int i=0;i<allSheetNumber;i++){
				sheetDataList.clear();
				Sheet sheet = workbook.getSheetAt(i);
				if(null == excelModel.getHeader()){
					//读取头
					//默认的将第一行的数据当做头
					Object[] objArr = excelOperator.getRowData(sheet, (excelModel.getStart()-1), null,(excelModel.getStart()-1),excelModel);
					List<String> header = new ArrayList<String>();
					for(int a =0;a<objArr.length;a++){
						header.add(objArr[a].toString());
					}
					excelModel.setHeader(header);
				}
				//读取本sheet页的所有数据
				sheetDataList = excelOperator.getSheetData(sheet, excelModel.getDataType(),excelModel.getStart(),excelModel);
				allData.addAll(sheetDataList);
			}
			
			excelModel.setData(allData);
		} catch (Exception e) {
			throw new Exception("读取"+filePath+"路径下的excel文件，并且将数据封装到ExcelModel对象中出错："+e.getMessage());
		}
		return excelModel;
	}
	/**
	 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
	 * 前置条件：excelModel中必须提供excel文件的文件类型（文件后缀）信息
	 * @param inputStream
	 * @param excelModel 封装了excel文件的文件类型（文件后缀）信息，及excel列的数据类型信息
	 * @return ExcelModel 封装了从excel中读取出来的数据
	 * @throws Exception
	 */
	public ExcelModel readExcel(InputStream inputStream,ExcelModel excelModel) throws Exception{
		List<Object[]> allData = new ArrayList<Object[]>();
		try {
			Workbook workbook = excelOperator.createWorkbookByInputStream(inputStream, excelModel.getPath());
			//取得所有sheet页数
			int allSheetNumber = excelModel.getReadSheets()!=0?excelModel.getReadSheets():workbook.getNumberOfSheets();
			List<Object[]> sheetDataList = new ArrayList<Object[]>();
			for(int i=0;i<allSheetNumber;i++){
				sheetDataList.clear();
				Sheet sheet = workbook.getSheetAt(i);
				if(null == excelModel.getHeader()){
					//读取头
					//默认的将第一行的数据当做头
					Object[] objArr = excelOperator.getRowData(sheet, (excelModel.getStart()-1), null,(excelModel.getStart()-1),excelModel);
					if(null != objArr){
						List<String> header = new ArrayList<String>();
						for(int a =0;a<objArr.length;a++){
							header.add(objArr[a].toString());
						}
						excelModel.setHeader(header);
					}
				}
				//读取本sheet页的所有数据
				sheetDataList = excelOperator.getSheetData(sheet, excelModel.getDataType(),excelModel.getStart(),excelModel);
				allData.addAll(sheetDataList);
			}
			
			excelModel.setData(allData);
		} catch (Exception e) {
			throw new Exception("读取输入流中的excel文件，并且将数据封装到ExcelModel对象中出错:"+e.getMessage());
		}
		return excelModel;
	}
	
	public static void main(String[] args){
		ExcelTool excelTool = new ExcelTool();
		ExcelModel excelModel = new ExcelModel();
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("2", ExcelModel.CELL_TYPE_STRING);
		dataType.put("3", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("4", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("5", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("6", ExcelModel.CELL_TYPE_STRING);
		dataType.put("7", ExcelModel.CELL_TYPE_STRING);
		dataType.put("8", ExcelModel.CELL_TYPE_STRING);
		excelModel.setDataType(dataType);
		try {
			excelTool.readExcel("D:\\testest\\marcInfo2010-12-13.xlsx", excelModel);
			System.out.println(">>>>");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
