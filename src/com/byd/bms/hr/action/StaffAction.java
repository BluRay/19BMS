package com.byd.bms.hr.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.hr.dao.IHrDao;
import com.byd.bms.hr.dao.IOrgDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;
import com.byd.bms.util.poi.ExcelModel;
import com.byd.bms.util.poi.ExcelTool;

public class StaffAction extends BaseAction<Object>{

	private static final long serialVersionUID = 1L;
	private IHrDao hrDao;
	private IOrgDao orgDao;
	private Pager pager;
	
    /*文件上传组件*/
	private File file;					//获取上传文件
    private String fileFileName;		//获取上传文件名称
    private String fileContentType;		//获取上传文件类型    

    private String conditions;		
    
	/**
	 * 员工信息维护
	 * @return
	 */
	public String staffManager(){
		return "staffManager";
	}
	
	/**
	 * 员工库查询页面
	 * @return
	 */
	public String staffSearch(){
		return "staffSearch";
	}
	
	/**
	 * 查询员工信息
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String getStaffList() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();
    	String staff_number = request.getParameter("staff_number");
    	String staff_level = request.getParameter("staff_level");
    	String salary_type = request.getParameter("salary_type");
    	String job_type = request.getParameter("job_type");
    	String job_grade = request.getParameter("job_grade");
    	String job = request.getParameter("job");
    	String status = request.getParameter("status");
    	String workplace = request.getParameter("workplace");
		conditionMap.put("org_id", request.getParameter("org_id"));
		conditionMap.put("orgType", request.getParameter("orgType"));
		conditionMap.put("orgStr", request.getParameter("orgStr"));
		if(staff_number!=null&&staff_number.trim().length()>0){
			conditionMap.put("staff_number", request.getParameter("staff_number"));
		}
		if(staff_level!=null&&staff_level.trim().length()>0){
			conditionMap.put("staff_level", request.getParameter("staff_level"));
		}
		if(salary_type!=null&&salary_type.trim().length()>0){
			conditionMap.put("salary_type", request.getParameter("salary_type"));
		}
		if(job_type!=null&&job_type.trim().length()>0){
			conditionMap.put("job_type", request.getParameter("job_type"));
		}
		if(job_grade!=null&&job_grade.trim().length()>0){
			conditionMap.put("job_grade", request.getParameter("job_grade"));
		}
		if(job!=null&&job.trim().length()>0){
			conditionMap.put("job", request.getParameter("job"));
		}
		if(workplace!=null&&workplace.trim().length()>0){
			conditionMap.put("workplace", request.getParameter("workplace"));
		}
		if(status!=null&&status.trim().length()>0){
			conditionMap.put("status", request.getParameter("status"));
		}

		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		
		List list = hrDao.getStaffList(conditionMap);
		int totalCount=hrDao.getStaffTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);						
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		//TreeNode t = recursiveTree("1",list);

		JSONObject json = Util.dataListToJson(true, "查询成功", list, page_map);
		
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
	 * 导出员工信息
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String downloadStaffInfo() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
        //取得输出流
        OutputStream out = null;
		try {
			out = response.getOutputStream();
	        //清空输出流
	        response.reset();
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			
			String staff_number = request.getParameter("staff_number");
	    	String staff_level = request.getParameter("staff_level");
	    	String salary_type = request.getParameter("salary_type");
	    	String job_type = request.getParameter("job_type");
	    	String job_grade = request.getParameter("job_grade");
	    	String job = request.getParameter("job");
	    	String status = request.getParameter("status");
	    	String workplace = request.getParameter("workplace");
			conditionMap.put("org_id", request.getParameter("org_id"));
			conditionMap.put("orgType", request.getParameter("orgType"));
			conditionMap.put("orgStr", request.getParameter("orgStr"));
			if(staff_number!=null&&staff_number.trim().length()>0){
				conditionMap.put("staff_number", request.getParameter("staff_number"));
			}
			if(staff_level!=null&&staff_level.trim().length()>0){
				conditionMap.put("staff_level", request.getParameter("staff_level"));
			}
			if(salary_type!=null&&salary_type.trim().length()>0){
				conditionMap.put("salary_type", request.getParameter("salary_type"));
			}
			if(job_type!=null&&job_type.trim().length()>0){
				conditionMap.put("job_type", request.getParameter("job_type"));
			}
			if(job_grade!=null&&job_grade.trim().length()>0){
				conditionMap.put("job_grade", request.getParameter("job_grade"));
			}
			if(job!=null&&job.trim().length()>0){
				conditionMap.put("job", request.getParameter("job"));
			}
			if(workplace!=null&&workplace.trim().length()>0){
				conditionMap.put("workplace", request.getParameter("workplace"));
			}
			if(status!=null&&status.trim().length()>0){
				conditionMap.put("status", request.getParameter("status"));
			}
			
			List<Map<String,Object>> list = hrDao.getStaffList(conditionMap);
			/**
			 * 解析数据封装到 excelModel
			 */
			List<String> header = new ArrayList<String>();
			header.add("工号");
			header.add("姓名");
			header.add("性别");
			header.add("出生日期");
			header.add("年龄");
			header.add("最高学历");
			header.add("应届生届别");
			header.add("政治面貌");
			header.add("身份证");
			header.add("入厂时间");
			header.add("级别");
			header.add("技能系数");
			header.add("计资方式");
			header.add("工厂/职能部门");
			header.add("科室");
			header.add("车间");
			header.add("班组");
			header.add("小班组");
			header.add("岗位名称");
			header.add("在离职状态");
			header.add("入职渠道");
			header.add("离职方式");
			header.add("离职日期");
			header.add("离职原因");
			header.add("原公司");
			header.add("原公司离职原因");
			header.add("联系方式");
			header.add("家庭住址");
			header.add("民族");
			header.add("法人");
			header.add("工作地点");
			header.add("维护人");
			header.add("维护时间");
			
			List<Object[]> data = new ArrayList<Object[]>();
			for(int s=0;s<list.size();s++){
				Map map = list.get(s);
				int i=0;
				Object[] objArr = new Object[header.size()];
				objArr[i]= map.get("staff_number");
				objArr[i+1]= map.get("name");
				objArr[i+2]= map.get("sex");
				objArr[i+3]= map.get("birthday");
				objArr[i+4]= map.get("age");
				objArr[i+5]= map.get("highest_education");
				objArr[i+6]= map.get("fresh_student");
				objArr[i+7]= map.get("political_status");
				objArr[i+8]= map.get("identity_card");
				objArr[i+9]= map.get("factory_incoming_date");
				objArr[i+10]= map.get("staff_level");
				objArr[i+11]= map.get("skill_parameter");
				objArr[i+12]= map.get("salary_type");
				objArr[i+13]= map.get("plant_org");
				objArr[i+14]= map.get("dept_org");
				objArr[i+15]= map.get("workshop_org");
				objArr[i+16]= map.get("workgroup_org");
				objArr[i+17]= map.get("team_org");
				objArr[i+18]= map.get("job");
				objArr[i+19]= map.get("status");
				objArr[i+20]= map.get("join_channel");
				objArr[i+21]= map.get("leave_way");
				objArr[i+22]= map.get("leave_date");
				objArr[i+23]= map.get("leave_reason");
				objArr[i+24]= map.get("last_company");
				objArr[i+25] = map.get("last_leave_reason");
				objArr[i+26]= map.get("phone");
				objArr[i+27]= map.get("family_address");
				objArr[i+28]= map.get("nation");
				objArr[i+29]= map.get("corporation");
				objArr[i+30]= map.get("workplace");
				objArr[i+31]= map.get("edit_name");
				objArr[i+32]= map.get("edit_date");
				
				data.add(objArr);
			}
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String curTime = df.format(new Date());
			String fileName ="员工信息_"+curTime;
			fileName = fileName+".xlsx";
			ExcelModel excelModel = new ExcelModel();
			excelModel.setPath(fileName);
			excelModel.setSheetName("员工信息");
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
			System.out.print("下载员工信息出错："+e.getMessage());
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
	
	/**
	 * 导入员工信息
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String uploadStaff() throws UnsupportedEncodingException{
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
			dataType.put("2", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("3", ExcelModel.CELL_TYPE_DATE);
			dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("8", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("9", ExcelModel.CELL_TYPE_DATE);
			dataType.put("10", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("11", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("12", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("13", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("14", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("15", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("16", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("17", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("18", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("19", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("20", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("21", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("22", ExcelModel.CELL_TYPE_DATE);
			dataType.put("23", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("24", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("25", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("26", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("27", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("28", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("29", ExcelModel.CELL_TYPE_CANNULL);
			dataType.put("30", ExcelModel.CELL_TYPE_CANNULL);
			excelModel.setDataType(dataType);
	/*		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String curTime = df.format(new Date());
			String fileName ="员工信息批导入_"+curTime;*/
			excelModel.setPath(fileFileName);
			/**
			 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
			 */
    		InputStream is = new FileInputStream(file);
    		
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			
			if(excelModel.getData().size()>500){
				success = false;
				result = result+"不能同时导入500条以上数据！\n";
			}else{
				
				/**
				 * 解析excelModel中的data 数据校验
				 */
				StringBuffer staff_numbers = new StringBuffer();
				int i = 1;
				List<Map<String, Object>> queryOrgList = new ArrayList<Map<String,Object>>();
				List staffNumberList = new ArrayList();
				for(Object[] data : excelModel.getData()){
					++i;
					if(null != data[0] && StringUtils.isNotBlank(data[0].toString().trim())){
						String staff_number = data[0].toString().trim(); //物料描述
						if(!staffNumberList.contains(staff_number)){
							staff_numbers.append(staff_number);
							staff_numbers.append(",");
							staffNumberList.add(staff_number);
						}else{
							result = result+"第"+i+"行工号信息！\n";
						}
					}else{
						//用户填写的工厂、车间、班组、小班组信息有误
						success = false;
						result = result+"第"+i+"行工号信息为必填项！\n";
					}
					//工厂/部	科室	车间	班组	小班组
					if(null == data[13] || StringUtils.isBlank(data[13].toString().trim())){
						//工厂/部为必填值
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					//组织结构信息校验
					Map queryOrgMap = new HashMap<String, Object>();
					queryOrgMap.put("plant_org", data[13].toString());
					
					if(StringUtils.isEmpty(data[14].toString().trim())&&"计件".equals(data[12].toString().trim())){
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					if(StringUtils.isEmpty(data[15].toString().trim())&&"计件".equals(data[12].toString().trim())){
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					if(StringUtils.isEmpty(data[16].toString().trim())&&"计件".equals(data[12].toString().trim())){
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					if(StringUtils.isEmpty(data[17].toString().trim())&&"计件".equals(data[12].toString().trim())){
						success = false;
						result = result+"第"+i+"行工厂/部门、科室、车间、班组、小班组信息为必填项！\n";
					}
					
					if(null!=data[14] && !"".equals(data[14].toString().trim())){
						queryOrgMap.put("dept_org", data[14]==null?null:data[14].toString());
					}
					if(null!=data[15] && !"".equals(data[15].toString().trim())){
						queryOrgMap.put("workshop_org", data[15]==null?null:data[15].toString());
					}
					if(null!=data[16] && !"".equals(data[16].toString().trim())){
						queryOrgMap.put("workgroup_org", data[16]==null?null:data[16].toString());
					}
					if(null!=data[17] && !"".equals(data[17].toString().trim())){
						queryOrgMap.put("team_org", data[17]==null?null:data[17].toString());
					}
					
					queryOrgList.add(queryOrgMap);
				}
				//根据用户填写的组织结构信息查询bms_base_org表
				List<Map<String, Object>> orgResultList = orgDao.getOrg(queryOrgList);
				
				//导入信息准备
				Map<String, Object> conditionMap = new HashMap<String, Object>();
				conditionMap.put("staff_numbers", staff_numbers.toString().trim());
				List<String> list = hrDao.getStaffListByStaffNumbers(conditionMap);
				
				List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
				List<Map<String, Object>> upDateList = new ArrayList<Map<String,Object>>();
				//List<Map<String, Object>> skillParameterList = new ArrayList<Map<String,Object>>();
				int user_id=getUser().getId();
				String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
				int index = 1;
				for(Object[] data : excelModel.getData()){
					++index;
					//数据校验
					boolean test = true;
					for(int x=0;x< orgResultList.size(); x++){
						Map map = orgResultList.get(x);
						String plant_org = map.get("plant_org")==null?"":map.get("plant_org").toString();
						String dept_org = map.get("dept_org")==null?"":map.get("dept_org").toString();
						String workshop_org = map.get("workshop_org")==null?"":map.get("workshop_org").toString();
						String workgroup_org = map.get("workgroup_org")==null?"":map.get("workgroup_org").toString();
						String team_org = map.get("team_org")==null?"":map.get("team_org").toString();
						
						if(data[13] != null && !"".equals(data[13].toString()) && !data[13].equals(plant_org)){
							test = false;
						}
						if(data[14] != null && !"".equals(data[14].toString()) && !data[14].equals(dept_org)){
							test = false;
						}
						if(data[15] != null && !"".equals(data[15].toString()) && !data[15].equals(workshop_org)){
							test = false;
						}
						if(data[16] != null && !"".equals(data[16].toString()) && !data[16].equals(workgroup_org)){
							test = false;
						}
						if(data[17] != null && !"".equals(data[17].toString()) && !data[17].equals(team_org)){
							test = false;
						}
						if(test){
							break;
						}
						if(x != orgResultList.size()-1){
							test = true;
						}
	/*					if(data[13] != null && !"".equals(data[13].toString()) && data[14] != null && !"".equals(data[14].toString()) 
							&& data[15] != null && !"".equals(data[15].toString()) && data[16] != null && !"".equals(data[16].toString()) 
							&& data[17] != null && !"".equals(data[17].toString())){
							if(data[13].equals(plant_org) && data[14].equals(dept_org) && data[15].equals(workshop_org) && data[16].equals(workgroup_org) && data[17].equals(team_org)){
								test = true;
								break;
							}
						}
						if(data[13] != null && !"".equals(data[13].toString()) && data[14] != null && !"".equals(data[14].toString()) 
								&& data[15] != null && !"".equals(data[15].toString()) && data[16] != null && !"".equals(data[16].toString()) 
								&& ( data[17] == null || "".equals(data[17].toString()))){
							if(data[13].equals(plant_org) && data[14].equals(dept_org) && data[15].equals(workshop_org) && data[16].equals(workgroup_org)){
								test = true;
								break;
							}
						}
						if(data[13] != null && !"".equals(data[13].toString()) && data[14] != null && !"".equals(data[14].toString()) 
								&& data[15] != null && !"".equals(data[15].toString()) && (data[16] == null || "".equals(data[16].toString()) ) && ( data[17] == null || "".equals(data[17].toString())) ){
							if(data[13].equals(plant_org) && data[14].equals(dept_org) && data[15].equals(workshop_org)){
								test = true;
								break;
							}
						}
						if(data[13] != null && !"".equals(data[13].toString()) && data[14] != null && !"".equals(data[14].toString()) 
								&& (data[15] == null || "".equals(data[15].toString()) ) && (data[16] == null || "".equals(data[16].toString()) ) && ( data[17] == null || "".equals(data[17].toString())) ){
							if(data[13].equals(plant_org) && data[14].equals(dept_org)){
								test = true;
								break;
							}
						}
						if(data[13] != null && !"".equals(data[13].toString()) && (data[14] == null || "".equals(data[14].toString()) ) && (data[15] == null || "".equals(data[15].toString()) ) && (data[16] == null || "".equals(data[16].toString()) ) && ( data[17] == null || "".equals(data[17].toString()))){
							if(data[13].equals(plant_org) ){
								test = true;
								break;
							}
						}*/
						
					}
					
					if(!test){
						success = false;
						result = result+"第"+index+"行工厂/职能部门、科室、车间、班组或者小班组信息填写有误，请确认组织结构是否存在！\n";
					}
					if(success){
						//封装数据
						Map<String, Object> staffInfo = new HashMap<String, Object>();
						String staff_number = data[0].toString().trim(); 
						staffInfo.put("staff_number", staff_number);
						staffInfo.put("name", data[1] == null?null:data[1].toString().trim());
						staffInfo.put("sex", data[2] == null?null:data[2].toString().trim());
						staffInfo.put("birthday", data[3] == null?null:data[3].toString().trim());
						staffInfo.put("age", data[4] == null?null:data[4].toString().trim());
						staffInfo.put("highest_education", data[5] == null?null:data[5].toString().trim());
						staffInfo.put("fresh_student", data[6] == null?null:data[6].toString().trim());
						staffInfo.put("political_status", data[7] == null?null:data[7].toString().trim());
						staffInfo.put("identity_card", data[8] == null?null:data[8].toString().trim());
						staffInfo.put("factory_incoming_date", data[9] == null?null:data[9].toString().trim());
						staffInfo.put("staff_level", data[10] == null?null:data[10].toString().trim());
						staffInfo.put("skill_parameter", data[11] == null?null:data[11].toString().trim());
						staffInfo.put("salary_type", data[12] == null?null:data[12].toString().trim());
						staffInfo.put("plant_org", data[13] == null?null:data[13].toString().trim());
						staffInfo.put("dept_org", data[14] == null?null:data[14].toString().trim());
						staffInfo.put("workshop_org", data[15] == null?null:data[15].toString().trim());
						staffInfo.put("workgroup_org", data[16] == null?null:data[16].toString().trim());
						staffInfo.put("team_org", data[17] == null?null:data[17].toString().trim());
						staffInfo.put("job", data[18] == null?null:data[18].toString().trim());
						staffInfo.put("status", data[19] == null?null:data[19].toString().trim());
						staffInfo.put("join_channel", data[20] == null?null:data[20].toString().trim());
						staffInfo.put("leave_way", data[21] == null?null:data[21].toString().trim());
						staffInfo.put("leave_date", data[22] == null?null:data[22].toString().trim());
						staffInfo.put("leave_reason", data[23] == null?null:data[23].toString().trim());
						staffInfo.put("last_company", data[24] == null?null:data[24].toString().trim());
						staffInfo.put("last_leave_reason", data[25] == null?null:data[25].toString().trim());
						staffInfo.put("phone", data[26] == null?null:data[26].toString().trim());
						staffInfo.put("family_address", data[27] == null?null:data[27].toString().trim());
						staffInfo.put("nation", data[28] == null?null:data[28].toString().trim());
						staffInfo.put("corporation", data[29] == null?null:data[29].toString().trim());
						staffInfo.put("workplace", data[30] == null?null:data[30].toString().trim());
						staffInfo.put("editor", user_id);
						staffInfo.put("edit_date", createTime);
						
						//AddBy:Yangke 160307 新增维护员工技能系数程序 导入员工库时同时更新表【BMS_HR_SKILLPARAMETER】
						/*Map<String, Object> skill_parameter_Info = new HashMap<String, Object>();
						if(data[11] != null){
							skill_parameter_Info.put("staff_number", staff_number);
							skill_parameter_Info.put("skill_parameter", data[11].toString().trim());
							skill_parameter_Info.put("editor", user_id);
							skill_parameter_Info.put("edit_date", createTime);
						}
						skillParameterList.add(skill_parameter_Info);*/
						
						if(list.contains(staff_number)){
							upDateList.add(staffInfo);
						}else{
							addList.add(staffInfo);
						}
					}
				}
				
				if(success && addList.size()>0){
					//批量新增用户信息
					result = "导入成功！";
					int r = hrDao.insertStaffs(addList);
				}
				if(success && upDateList.size()>0){
					//批量修改用户信息
					result = "导入成功！";
					int r = hrDao.updateStaffs(upDateList);
				}
				/*if(success && skillParameterList.size()>0){
					hrDao.insertSkillParameter(skillParameterList);
				}*/
			}
			
		} catch (Exception e) {
			success = false;
			result += "用户信息上传出错："+e.getMessage();
			System.out.println("用户信息上传出错："+e.getMessage());
		} finally{
			JSONObject json = Util.dataListToJson(success, result, null, null);
			out.print(json);
			out.flush();
			out.close();
		}
		return null;
	}
	
	
	/**
	 * 查询员工技能系数清单
	 * @return
	 */
	public String queryStaffSkillParameterIndex(){
		return "queryStaffSkillParameterIndex";
	}
	
	/**
	 * 查询标准单价信息
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String queryStaffSkillParameter() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json=new JSONObject();
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("orgType", request.getParameter("orgType"));
		conditionMap.put("org_id", request.getParameter("org_id"));
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("dept", request.getParameter("dept"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		conditionMap.put("workgroup", request.getParameter("workgroup"));
		conditionMap.put("team", request.getParameter("team"));
		String staff = request.getParameter("staff");
		if(null!=staff&&!"".equals(staff.trim())){
			conditionMap.put("staff_number", staff.trim());
		}
		String month_s=request.getParameter("month_s");
		String month_e = request.getParameter("month_e");
		if(null==month_e||month_e.trim().length()==0){
			month_e=month_s;
		}	
		List<String> month_list=new ArrayList<String>();
		try {
			month_list=this.getMonthList(month_s,month_e);
		} catch (ParseException e1) {
			e1.printStackTrace();
			json = Util.dataListToJson(false, "查询失败",null);
			
		}
		conditionMap.put("monthList", month_list);
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List list = hrDao.queryStaffSkillParameterList(conditionMap);
		int totalCount=hrDao.queryStaffSkillParameterTotalCount(conditionMap);
		for(int i=0;i<list.size();i++){
			Map<String,Object> map =(Map)list.get(i);
			/*
			 * 获取月份map
			 */
			Map<String,String> headMap = getMonth(request.getParameter("month_s"),month_e);
			String allPriceStr = map.get("priceStr")==null?null:map.get("priceStr").toString();
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
		
		try {
			out = response.getWriter();
			json = Util.dataListToJson(true, "查询成功", list, page_map);
		} catch (IOException e) {
			e.printStackTrace();
			json = Util.dataListToJson(false, "查询失败",null);
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
	
	private List<String> getMonthList(String monthStart,String monthEnd) throws ParseException{
		List<String> monthList=new ArrayList<String>();
		DateFormat df= new SimpleDateFormat("yyyy-MM");
		Date startDate=df.parse(monthStart);
		Date endDate=df.parse(monthEnd);
		Date cmpDate=startDate;
		Calendar calendar = Calendar.getInstance();
		while(cmpDate.getTime()<=endDate.getTime()){					
			monthList.add(df.format(cmpDate));
			
			calendar.setTime(cmpDate);
			calendar.add(Calendar.MONTH, 1);
			cmpDate=calendar.getTime();
		}
		return monthList;
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
	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	/**
	 * added by xjw on 20160623 员工计件分配比例页面
	 * @return
	 */
	public String staffDistribution(){
		return "staffDistribution";
	}
	/**
	 * added by xjw on 20160623 导入员工计件分配比例数据
	 * 判断一个小班组下所有人员分配比例之和是否<=1，不满足则报错
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String uploadDistribution() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String message = "";
		boolean success = true;
		
		JSONObject jo=JSONObject.fromObject(conditions);
		String orderId=jo.getString("orderId");
		String effectiveDate=jo.getString("effectiveDate");
		//datalist:保存数据封装
		List<Map<String,Object>> datalist=new ArrayList<Map<String,Object>>();
		//staff number 列表
		List<String> stafflist=new ArrayList<String>();		
		
		//disMap： 保存小班组维度员工的分配比例汇总数据，用以判断一个小班组下所有人员分配比例之和是否等于1
		Map<String,Object> disMap=new HashMap<String,Object>();
		try {
			out = response.getWriter();
			/**
			 * 创建excel对象类
			 */
			ExcelModel excelModel =new ExcelModel();
			excelModel.setReadSheets(1);
			excelModel.setStart(1);
			
			Map<String,Integer> dataType = new HashMap<String,Integer>();
			dataType.put("0", excelModel.CELL_TYPE_STRING);
			dataType.put("1", excelModel.CELL_TYPE_STRING);
			dataType.put("2", excelModel.CELL_TYPE_STRING);
			dataType.put("3", excelModel.CELL_TYPE_STRING);
			dataType.put("4", excelModel.CELL_TYPE_NUMERIC);
			dataType.put("5", excelModel.CELL_TYPE_STRING);
			dataType.put("6", excelModel.CELL_TYPE_NUMERIC);
			excelModel.setDataType(dataType);
			excelModel.setPath(fileFileName);
			/**
			 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
			 */
    		InputStream is = new FileInputStream(file);
    		
    		ExcelTool extl=new ExcelTool();
    		extl.readExcel(is, excelModel);//将文件数据读取到excelModel中
    		List<String> headers=excelModel.getHeader();
			if(!headers.get(0).equals("工厂")||!headers.get(1).equals("车间")||
					!headers.get(2).equals("班组")||!headers.get(3).equals("小班组")||
					!headers.get(4).equals("工号")||!headers.get(5).equals("姓名")||
					!headers.get(6).equals("分配金额")){
				Exception e=new Exception("请使用下载的模板导入！");
				throw e;			
			}
    		//遍历excel数据，将分配比例按小班组汇总保存到disMap中
    		String last_factory="";
    		String last_workshop="";
    		String last_workgroup="";
    		String last_team="";
    		
    		int rowcount=2;
    		for(Object[] data:excelModel.getData()){
    			String factory=data[0].toString();
    			String workshop=data[1].toString();
    			String workgroup=data[2].toString();
    			String team=data[3].toString();
    			String staffNumber=data[4].toString();
    			String staffName=data[5].toString();
    			BigDecimal dist_val=new BigDecimal(data[6].toString());
    			
    			//double dist_val=Double.parseDouble(data[6].toString());
    			String mapKey=factory+"-"+workshop+"-"+workgroup+"-"+team;
    			
    			Map<String,Object> dmap=new HashMap<String,Object>();
    			dmap.put("factory", factory);
    			dmap.put("workshop", workshop);
    			dmap.put("workgroup", workgroup);
    			dmap.put("team", team);
    			dmap.put("staff_number", staffNumber);
    			dmap.put("staff_name", staffName);
    			dmap.put("order_id", orderId);
    			dmap.put("distribution", dist_val.toString());
    			dmap.put("editor", getUser().getDisplay_name());
    			dmap.put("edit_date", Util.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
    			dmap.put("effective_date", effectiveDate);
    			
    			Map<String,Object> info=new HashMap<String,Object>();
    			info.put("factory", factory);
    			info.put("workshop", workshop);
    			info.put("workgroup", workgroup);
    			info.put("small_workgroup", team);
    			//校验用户填写的工厂、车间、班组、小班组、车型 信息是否正确
				Map orgMap =  orgDao.getOrgInfo(info);
				if(null == orgMap){
					//用户填写的工厂、车间、班组、小班组信息有误
					success = false;
					throw new Exception("第"+rowcount+"行信息有误，请核实组织结构信息是否正确后重新导入！");
				}
    			//校验工号姓名是否匹配
    			if(hrDao.checkIsValidStaff(dmap)==0){
    				success=false;
    				message="工号“"+staffNumber+"”和姓名“"+staffName+"”不匹配！";
    				throw new Exception(message);
    				//break;
    			}else{
    				if(disMap.get(mapKey)!=null){
        				BigDecimal map_val=new BigDecimal((String)disMap.get(mapKey));
        				disMap.put(mapKey, (dist_val.add(map_val)).toString());
        			}else{
        				disMap.put(mapKey, dist_val.toString());
        			}
    			}
    			datalist.add(dmap);
    			stafflist.add(staffNumber);
    			rowcount++;
    		}
    		
    		//封装cdmap用以删除对应生效日期内的需要导入员工的分配信息
    		Map<String,Object> cdmap=new HashMap<String,Object>();
    		cdmap.put("order_id", orderId);
    		cdmap.put("stafflist", stafflist);
    		cdmap.put("effective_date", effectiveDate);
    		
    		for(String m_key:disMap.keySet()){
    	  		//查询班组承包单价，校验导入的班组成员单价之和是否等于班组承包单价
    			Map<String,Object> pmap=new HashMap<String,Object>();
    			pmap.put("order_id", orderId);
    			pmap.put("workgroup", m_key);
    			pmap.put("effective_date", effectiveDate);
    			
    			Double total_price=hrDao.getWorkgroupPrice(pmap);
    			total_price=total_price==null?0:total_price;
    			if(total_price==0){
    				success=false;
    				message=m_key+"未维护班组承包单价,请维护后重新导入！";
    				throw new Exception(message);
    			}
    			if(Double.parseDouble((String)disMap.get(m_key))!=total_price){
    				success=false;
    				message=m_key+"分配金额和值不等于该班组承包单价"+total_price+",请修改后重新导入！";
    				throw new Exception(message);
    			}
    		}
			
    		if(success){   			
    			//先删除对应生效日期内的需要导入员工的分配信息，再导入新的数据
    			hrDao.deleteStaffDistribution(cdmap);
    			int i=hrDao.saveStaffDistribution(datalist);
    			if(i>0){
    				success=true;
    				message="导入成功！";
    			}
    		}    		
			
		}catch (Exception e) {
			success = false;
			message = "用户信息上传出错："+e.getMessage();
			System.out.println("用户信息上传出错："+e.getMessage());
		} finally{
			JSONObject json = Util.dataListToJson(success, message, null, null);
			out.print(json);
			out.flush();
			out.close();
		}
		return null;
		
	}
	/**
	 * added by xjw on 20160623 查询员工分配比例清单
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String getStaffDistribution() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		boolean success=true;
		String message="";
		List list=null;
		Map<String, String> page_map=new HashMap<String,String>();
		Map<String,Object> cMap=new HashMap<String,Object>();
		Map<String,Object> cMap1=new HashMap<String,Object>();
		
		JSONObject jo=JSONObject.fromObject(conditions);
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			cMap.put(key,jo.get(key));
			cMap1.put(key,jo.get(key));
		}
		if (pager != null){
			cMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			cMap.put("pageSize", pager.getPageSize());
		}
		
		int totalCount=0;
		try{
			out=response.getWriter();
			list=hrDao.getStaffDistribution(cMap);
			totalCount=hrDao.getStaffDistributionCount(cMap1);
			if (pager != null){
				pager.setTotalCount(totalCount);						
				page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
				page_map.put("curPage", String.valueOf(pager.getCurPage()));
				page_map.put("pageSize", String.valueOf(pager.getPageSize()));
			}
			
		}catch(Exception e){
			success = false;
			message += "系统异常："+e.getMessage();
		}finally{
			JSONObject json = Util.dataListToJson(success, message, list, page_map);
			out.print(json);
			out.flush();
			out.close();
		}
		
		return null;
	}
	
}
