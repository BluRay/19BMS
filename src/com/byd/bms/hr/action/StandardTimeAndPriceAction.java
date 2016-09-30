package com.byd.bms.hr.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.hr.dao.IHrDao;
import com.byd.bms.hr.dao.IOrgDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;
import com.byd.bms.util.poi.ExcelModel;
import com.byd.bms.util.poi.ExcelTool;

public class StandardTimeAndPriceAction extends BaseAction<Object>{

	private static final long serialVersionUID = 1L;
	private IHrDao hrDao;
	private IOrgDao orgDao;
	private Pager pager;
	
	/*文件上传组件*/
	private File file;					//获取上传文件
    private String fileFileName;		//获取上传文件名称
    private String fileContentType;		//获取上传文件类型    
	
	/**
	 * 首页
	 * @return
	 */
	public String index(){
		return "index";
	}
	
	/**
	 * 根据车型、月份、班组org_id查询标准工时和单价
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String getStandardTimeAndPriceList() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("org_id", request.getParameter("org_id"));
		conditionMap.put("bus_type_id", request.getParameter("bus_type_id"));
		conditionMap.put("month", request.getParameter("month"));
		List list = hrDao.getStandardTimeAndPriceList(conditionMap);
		//TreeNode t = recursiveTree("1",list);

		JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
		
		//JSONObject jn = JSONObject.fromObject(t);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 删除已维护的标准班组
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String deleteWorkGroup() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("workgroupId", Integer.parseInt(request.getParameter("workgroupId").toLowerCase()));
		String str = "查询成功";
		boolean b = true;
		//判断此标准班组下是否有小班组以及此标准班组是否已使用
		List list = hrDao.checkStandardWorkGroupUsed(conditionMap);
		if(list.size()>0){
			b = false;
			str = "标准班组正在使用中，不能删除！";
		}else{
			int result = hrDao.deleteStandardWorkGroup(conditionMap);
			if(result<0){
				b = false;
				str = "标准班组删除异常，请联系系统管理员！";
			}
		}
		JSONObject json = Util.dataListToJson(b, str, null, null);
		
		//JSONObject jn = JSONObject.fromObject(t);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 新增或者修改标准工时/单价
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String updateTimeAndPrice() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		int user_id=getUser().getId();
		String addDataArr = request.getParameter("addDataArr");
		String updateDataArr = request.getParameter("updateDataArr");
		int r=1;
		if(addDataArr!=null&&addDataArr.trim().length()>0){
			List<Map<String, Object>> conditionList = new ArrayList();
			String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
			//新增的标准工时/单价信息
			//[{'org_id':org_id,'bus_type_id':bus_type_id,'month':month,'standard_hour':standard_hour,'standard_price':standard_price}]
			JSONArray jsonArray=JSONArray.fromObject(addDataArr);
			for(int i=0;i<jsonArray.size();i++){
				Map<String, Object> map= new HashMap<String, Object>();
				JSONObject object = (JSONObject)jsonArray.get(i);
				map.put("factory", object.get("factory"));
				map.put("workshop", object.get("workshop"));
				map.put("workgroup", object.get("workgroup"));
				if(object.get("small_workgroup").toString().trim().length()>0){
					map.put("small_workgroup", object.get("small_workgroup"));
				}
				map.put("org_id", object.get("org_id"));
				map.put("bus_type_id", object.get("bus_type_id"));
				map.put("month", object.get("month"));
				map.put("standard_hour", object.get("standard_hour"));
				map.put("standard_price", object.get("standard_price"));
				map.put("editor_id", user_id);
				map.put("edit_date", createTime);
				conditionList.add(map);
			}
			if(conditionList.size()>0){
				r = hrDao.addStandardTimeAndPrice(conditionList);
			}
		}
		if(updateDataArr!=null&&updateDataArr.trim().length()>0){
			List<Map<String, Object>> conditionList = new ArrayList();
			String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
			//修改的标准班组信息
			//[{'id':tr.data("id"),'standard_hour':standard_hour,'standard_price':standard_price}]
			JSONArray jsonArray=JSONArray.fromObject(updateDataArr);
			for(int i=0;i<jsonArray.size();i++){
				Map<String, Object> map= new HashMap<String, Object>();
				JSONObject object = (JSONObject)jsonArray.get(i);
				map.put("id", object.get("id"));
				map.put("standard_hour", object.get("standard_hour"));
				map.put("standard_price", object.get("standard_price"));
				map.put("editor_id", user_id);
				map.put("edit_date", createTime);
				conditionList.add(map);
			}
			if(conditionList.size()>0){
				r = hrDao.updateStandardTimeAndPrice(conditionList);
			}
		}
		
		String str = "保存成功";
		boolean b = true;
		if(r<0){
			b = false;
			str = "标准工时/单价维护异常，请联系系统管理员！";
		}
		
		JSONObject json = Util.dataListToJson(b, str, null, null);
		
		//JSONObject jn = JSONObject.fromObject(t);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 导入标准工时/单价
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String uploadStandardTimeAndPrice() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String result = "";
		boolean success = true;
		try {
			out = response.getWriter();
			/**
			 * 创建excel对象类
			 */
			ExcelModel excelModel =new ExcelModel();
			excelModel.setReadSheets(1);
			excelModel.setStart(1);
			Map<String,Integer> dataType = new HashMap<String,Integer>();
			dataType.put("0", ExcelModel.CELL_TYPE_STRING);
			dataType.put("1", ExcelModel.CELL_TYPE_STRING);
			dataType.put("2", ExcelModel.CELL_TYPE_STRING);
			dataType.put("3", ExcelModel.CELL_TYPE_STRING);
			dataType.put("4", ExcelModel.CELL_TYPE_STRING);
			dataType.put("5", ExcelModel.CELL_TYPE_STRING);
			dataType.put("6", ExcelModel.CELL_TYPE_NUMERIC);
			dataType.put("7", ExcelModel.CELL_TYPE_NUMERIC);

			excelModel.setDataType(dataType);
			excelModel.setPath(fileFileName);
			/**
			 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
			 */
    		InputStream is = new FileInputStream(file);
    		
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			/**
			 * 解析excelModel中的data
			 */
			List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
			List<Map<String, Object>> upDateList = new ArrayList<Map<String,Object>>();
			int user_id=getUser().getId();
			String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
			int i = 1;
			int dataFlag = 0;
			for(Object[] data : excelModel.getData()){
				++i;
				Map<String, Object> info = new HashMap<String, Object>();
				String factory = data[0].toString().trim(); 
				info.put("factory", factory);
				info.put("workshop", data[1] == null?null:data[1].toString().trim());
				info.put("workgroup", data[2] == null?null:data[2].toString().trim());
				info.put("small_workgroup", data[3] == null?null:data[3].toString().trim());
				info.put("bus_type_id", data[4] == null?null:data[4].toString().trim());
				info.put("month", data[5] == null?null:data[5].toString().trim());
				info.put("standard_hour", data[6] == null?null:data[6].toString().trim());
				info.put("standard_price", data[7] == null?null:data[7].toString().trim());
				info.put("editor_id", user_id);
				info.put("edit_date", createTime);
				
				//校验用户填写的工厂、车间、班组、小班组、车型 信息是否正确
				Map orgMap =  orgDao.getOrgInfo(info);
				if(null == orgMap){
					++dataFlag;
					//用户填写的工厂、车间、班组、小班组信息有误
					success = false;
					result = result+i;
				}else{
					info.put("org_id", orgMap.get("id"));
					//根据工厂、车间、班组、小班组、车型、月份查询标准工时和单价
					Map<String,Object> map = hrDao.getStandardTimeAndPrice(info);
					
					if(null != map && Integer.parseInt(map.get("id").toString()) >0){
						//修改
						info.put("id", map.get("id"));
						upDateList.add(info);
					}else{
						addList.add(info);
					}
				}
			}
			if(dataFlag>0){
				result = result+"行数据输入的工厂、车间、班组或小班组信息有误，请确认组织结构是否存在！\n";
			}
			if(success && addList.size()>0){
				//批量新增标准工时/单价
				hrDao.addStandardTimeAndPrice(addList);
				result =  "导入成功！";
			}
			if(success && upDateList.size()>0){
				//批量修改标准工时/单价
				hrDao.updateStandardTimeAndPrice(upDateList);
				result =  "导入成功！";
			}
		} catch (Exception e) {
			success = false;
			result = "标准工时/单价上传出错："+e.getMessage();
			System.out.println("标准工时/单价上传出错："+e.getMessage());
		} finally{
			JSONObject json = Util.dataListToJson(success, result, null, null);
			out.print(json);
			out.flush();
			out.close();
		}
		return null;
	}
	
	/**
	 * 标准工时和单价查询首页
	 * @return
	 */
	public String queryIndex(){
		return "queryIndex";
	}
	
	/**
	 * 查询标准单价信息
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String queryStandardPrice() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("orgType", request.getParameter("orgType"));
		conditionMap.put("org_id", request.getParameter("org_id"));
		conditionMap.put("orgStr", request.getParameter("orgStr"));
		String bus_type = request.getParameter("bus_type");
		if(!"全部".equals(bus_type)){
			conditionMap.put("bus_type", bus_type);
		}
		conditionMap.put("month_s", request.getParameter("month_s"));
		String month_e = request.getParameter("month_e");
		if(null!=month_e&&month_e.trim().length()>0){
			conditionMap.put("month_e", month_e);
		}
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List list = hrDao.queryStandardPriceList(conditionMap);
		int totalCount=hrDao.queryStandardPriceTotalCount(conditionMap);
		for(int i=0;i<list.size();i++){
			/*
			 * 获取月份map
			 */
			Map<String,String> headMap = getMonth(request.getParameter("month_s"),month_e);
			Map<String,Object> map =(Map)list.get(i);
			String allPriceStr = map.get("priceStr").toString();
			if(null != allPriceStr &&"" != allPriceStr.trim()){
				String[] allPriceArr = allPriceStr.split(",");
				for(int x=0;x<allPriceArr.length;x++){
					String priceStr = allPriceArr[x];
					String[] preceArr = priceStr.split(":");
					String monthStr = preceArr[0];
					String price = "";
					if(preceArr.length>1){
						price = preceArr[1];
					}
					headMap.put(monthStr, price);
				}
			}
			for(String key:headMap.keySet()){
				map.put(key, headMap.get(key));
			}
		}
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);						
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		JSONObject json = Util.dataListToJson(true, "查询成功", list, page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	/**
	 * 确定月份范围
	 * @param month_s
	 * @param month_e
	 * @return
	 */
	private Map<String,String> getMonth(String month_s,String month_e){
		Map<String,String> rtn = new TreeMap<String,String>();
		String[] s_arr = month_s.split("-");
		String[] e_arr ;
		int startYear = Integer.parseInt(s_arr[0]);
		int startMonth = Integer.parseInt(s_arr[1]);
		int endYear = startYear;
		int endMonth = 12;
		if(null!=month_e&&month_e.trim().length()>0){
			e_arr = month_e.split("-");
			endYear = Integer.parseInt(e_arr[0]);
			endMonth = Integer.parseInt(e_arr[1]);
		}
		String str ="00";
		if(startYear == endYear){
			for(;startMonth<=endMonth;startMonth++){
				String s_startMonth = String.valueOf(startMonth);
				s_startMonth=startYear+"-"+str.substring(0, 2-s_startMonth.length())+s_startMonth;
				rtn.put(s_startMonth,"");
			}
		}else{
			for(;startMonth<=12;startMonth++){
				String s_startMonth = String.valueOf(startMonth);
				s_startMonth=startYear+"-"+str.substring(0, 2-s_startMonth.length())+s_startMonth;
				rtn.put(s_startMonth,"");
			}
			for(int i=1;i<=endMonth;i++){
				String s_startMonth = String.valueOf(i);
				s_startMonth=endYear+"-"+str.substring(0, 2-s_startMonth.length())+s_startMonth;
				rtn.put(s_startMonth,"");
			}
		}
		return rtn;
	}
	
	/**
	 * 导出标准价格信息
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String downloadStandardPrice() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
        //取得输出流
        OutputStream out = null;
		try {
			out = response.getOutputStream();
	        //清空输出流
	        response.reset();
	        /**
	         * 封装查询条件
	         */
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("orgType", request.getParameter("orgType"));
			conditionMap.put("org_id", request.getParameter("org_id"));
			conditionMap.put("orgStr", request.getParameter("orgStr"));
			
			String bus_type = request.getParameter("bus_type");
			if(!"全部".equals(bus_type)){
				conditionMap.put("bus_type", bus_type);
			}
			conditionMap.put("month_s", request.getParameter("month_s"));
			String month_e = request.getParameter("month_e");
			if(null!=month_e&&month_e.trim().length()>0){
				conditionMap.put("month_e", month_e);
			}
			/**
			 * 查询信息
			 */
			List<Map<String,Object>> list = hrDao.queryStandardPriceList(conditionMap);
			/**
			 * 封装EXCEL抬头
			 */
			List<String> header = new ArrayList<String>();
			header.add("工厂");
			header.add("车间");
			header.add("班组");
			header.add("小班组");
			header.add("车型");
			Map<String,String> headMap = getMonth(request.getParameter("month_s"),month_e);
			for(String key:headMap.keySet()){
				header.add(key);
			}
			
			/**
			 * 解析数据插入EXCEL
			 */
			List<Object[]> data = new ArrayList<Object[]>();
			System.out.println("---->list.size() = " + list.size());
			for(int s=0;s<list.size();s++){
				Map map = list.get(s);
				Map<String,String> myHeadMap = getMonth(request.getParameter("month_s"),month_e);
				String allPriceStr = map.get("priceStr").toString();
				if(null != allPriceStr &&"" != allPriceStr.trim()){
					String[] allPriceArr = allPriceStr.split(",");
					for(int x=0;x<allPriceArr.length;x++){
						String priceStr = allPriceArr[x];
						String[] preceArr = priceStr.split(":");
						String monthStr = preceArr[0];
						String price = "";
						if(preceArr.length>1){
							price = preceArr[1];
						}
						headMap.put(monthStr, price);
						//String price = preceArr[1];
						myHeadMap.put(monthStr, price);
					}
				}
				for(String key:myHeadMap.keySet()){
					map.put(key, myHeadMap.get(key));
				}
				int i=0;
				Object[] objArr = new Object[header.size()];
				objArr[i]= map.get("factory");
				objArr[++i]= map.get("workshop");
				objArr[++i]= map.get("workgroup");
				objArr[++i]= map.get("small_workgroup");
				objArr[++i]= map.get("bus_type");
				for(String key:myHeadMap.keySet()){
					objArr[++i]= map.get(key);
				}
				data.add(objArr);
			}
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String curTime = df.format(new Date());
			String fileName ="标准单价_"+curTime;
			fileName = fileName+".xlsx";
			ExcelModel excelModel = new ExcelModel();
			excelModel.setPath(fileName);
			excelModel.setSheetName("标准单价");
			//excelModel.setDocCaption("员工信息");
			excelModel.setHeader(header);
			excelModel.setData(data);
			/*
			 * 输出到前台
			 */
	        //设置响应头和下载保存的文件名
			response.setHeader("Content-Type","text/html; charset=UTF-8");
	        response.setHeader("content-disposition","attachment;filename="+new String(fileName.getBytes("gbk"), "iso8859-1"));
	        //定义输出类型
	        response.setContentType("APPLICATION/msexcel");  
			ExcelTool excelTool = new ExcelTool();
			excelTool.downLoad(excelModel, out);
		} catch (Exception e) {
			System.out.print("下载标准单价信息出错："+e.toString());
		}finally{
			try {
				out.flush();
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	
	public IHrDao getHrDao() {
		return hrDao;
	}
	public void setHrDao(IHrDao hrDao) {
		this.hrDao = hrDao;
	}
	
    public IOrgDao getOrgDao() {
		return orgDao;
	}

	public void setOrgDao(IOrgDao orgDao) {
		this.orgDao = orgDao;
	}
	
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	
	public File getFile() {
		return file;
	}
	public void setFile(File file) {
		this.file = file;
	}
	public String getFileFileName() {
		return fileFileName;
	}
	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
	public String getFileContentType() {
		return fileContentType;
	}
	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}
}
