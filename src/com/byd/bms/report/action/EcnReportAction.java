package com.byd.bms.report.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONObject;

import com.byd.bms.plan.dao.IPlanDao;
import com.byd.bms.report.dao.IReportDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;

public class EcnReportAction extends BaseAction<Object> {

	private static final long serialVersionUID = -5678166042927677993L;
	private String conditions;
	private IReportDao reportDao;
	private Map<String,Object> result;
	private List list;
	
	public List getList() {
		return list;
	}
	public void setList(List list) {
		this.list = list;
	}
	public String getConditions() {
		return conditions;
	}
	public void setConditions(String conditions) {
		this.conditions = conditions;
	}
	public IReportDao getReportDao() {
		return reportDao;
	}
	public void setReportDao(IReportDao reportDao) {
		this.reportDao = reportDao;
	}
	public Map<String, Object> getResult() {
		return result;
	}
	public void setResult(Map<String, Object> result) {
		this.result = result;
	}
	
	/**
	 * 技改分析报表首页
	 */
	public String ecnIndex(){
		return "ecnIndex";
	}
	/**
	 * 月技改总工时
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String ecnTimeReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "ecnTimeReport";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			
			if(request.getParameter("start_date")!=null&&!request.getParameter("start_date").trim().equals("")){
				conditionMap.put("start_date", request.getParameter("start_date").concat(" 00:00:00"));
			}
			if(request.getParameter("end_date")!=null&&!request.getParameter("end_date").trim().equals("")){
				conditionMap.put("end_date", request.getParameter("end_date").concat(" 23:59:59"));
			}
			
			list = reportDao.getEcnTime(conditionMap);
			
			JSONObject json = Util.dataListToJson(true,"查询成功",list,null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 车型技改分析报表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String ecnBusTypeReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "ecnBusTypeReport";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			if(request.getParameter("bus_type_id")!=null&&!request.getParameter("bus_type_id").trim().equals("")){
				conditionMap.put("bus_type_id", Integer.parseInt(request.getParameter("bus_type_id").toString()));
			}
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			if(request.getParameter("start_date")!=null&&!request.getParameter("start_date").trim().equals("")){
				conditionMap.put("start_date", request.getParameter("start_date").concat("-01 00:00:00"));
			}
			if(request.getParameter("end_date")!=null&&!request.getParameter("end_date").trim().equals("")){
				conditionMap.put("end_date", request.getParameter("end_date").concat("-31 23:59:59"));
			}
			list = reportDao.getEcnBusTypeReport(conditionMap);
			
			JSONObject json = Util.dataListToJson(true,"查询成功",list,null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 订单技改进度报表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String ecnOrderScheduleReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "ecnOrderScheduleReport";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("order", request.getParameter("order"));
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			list = reportDao.getEcnOrderSchedule(conditionMap);
			
			JSONObject json = Util.dataListToJson(true,"查询成功",list,null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
}
