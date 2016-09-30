package com.byd.bms.report.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.byd.bms.report.dao.IReportDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;

public class AfterSaleReportAction extends BaseAction<Object> {

	private static final long serialVersionUID = 849521147058446058L;
	private IReportDao reportDao;
	private Map<String,Object> result;
	
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
	 * 售后分析报表首页
	 */
	public String afterSaleIndex(){
		return "afterSaleIndex";
	}
	
	/**
	 * 订单售后问题报表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String orderAfterSaleProblemsReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "orderAfterSaleProblemsReport";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			if(request.getParameter("start_date")!=null&&!request.getParameter("start_date").trim().equals("")){
				conditionMap.put("start_date", request.getParameter("start_date"));
			}
			if(request.getParameter("end_date")!=null&&!request.getParameter("end_date").trim().equals("")){
				conditionMap.put("end_date", request.getParameter("end_date"));
			}
			if(request.getParameter("bus_type")!=null&&!request.getParameter("bus_type").trim().equals("全部")){
				conditionMap.put("bus_type", request.getParameter("bus_type"));
			}
			if(request.getParameter("customer_name")!=null&&!request.getParameter("customer_name").trim().equals("")){
				conditionMap.put("customer_name", request.getParameter("customer_name"));
			}
			if(request.getParameter("order")!=null&&!request.getParameter("order").trim().equals("")){
				conditionMap.put("order", request.getParameter("order"));
			}
			
			List list = reportDao.getOrderAfterSaleProblems(conditionMap);
			
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
	 * 车型售后问题报表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String busTypeAfterSaleProblemsReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "busTypeAfterSaleProblemsReport";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			if(request.getParameter("start_date")!=null&&!request.getParameter("start_date").trim().equals("")){
				conditionMap.put("start_date", request.getParameter("start_date"));
			}
			if(request.getParameter("end_date")!=null&&!request.getParameter("end_date").trim().equals("")){
				conditionMap.put("end_date", request.getParameter("end_date"));
			}
			if(request.getParameter("bus_type")!=null&&!request.getParameter("bus_type").trim().equals("全部")){
				conditionMap.put("bus_type", request.getParameter("bus_type"));
			}
			if(request.getParameter("customer_name")!=null&&!request.getParameter("customer_name").trim().equals("")){
				conditionMap.put("customer_name", request.getParameter("customer_name"));
			}
			if(request.getParameter("order")!=null&&!request.getParameter("order").trim().equals("")){
				conditionMap.put("order", request.getParameter("order"));
			}
			
			List list = reportDao.getBusTypeAfterSaleProblems(conditionMap);
			
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
	 * 工厂售后问题报表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String factoryAfterSaleProblemsReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "factoryAfterSaleProblemsReport";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			if(request.getParameter("start_date")!=null&&!request.getParameter("start_date").trim().equals("")){
				conditionMap.put("start_date", request.getParameter("start_date"));
			}
			if(request.getParameter("end_date")!=null&&!request.getParameter("end_date").trim().equals("")){
				conditionMap.put("end_date", request.getParameter("end_date"));
			}
			if(request.getParameter("bus_type")!=null&&!request.getParameter("bus_type").trim().equals("全部")){
				conditionMap.put("bus_type", request.getParameter("bus_type"));
			}
			if(request.getParameter("customer_name")!=null&&!request.getParameter("customer_name").trim().equals("")){
				conditionMap.put("customer_name", request.getParameter("customer_name"));
			}
			if(request.getParameter("order")!=null&&!request.getParameter("order").trim().equals("")){
				conditionMap.put("order", request.getParameter("order"));
			}
			
			List list = reportDao.getFactoryAfterSaleProblems(conditionMap);
			
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
	 * 售后问题分类统计报表（二维表格）
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String allAfterSaleProblemsReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "allAfterSaleProblemsReport";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			if(request.getParameter("start_date")!=null&&!request.getParameter("start_date").trim().equals("")){
				conditionMap.put("start_date", request.getParameter("start_date"));
			}
			if(request.getParameter("end_date")!=null&&!request.getParameter("end_date").trim().equals("")){
				conditionMap.put("end_date", request.getParameter("end_date"));
			}
			if(request.getParameter("bus_type")!=null&&!request.getParameter("bus_type").trim().equals("全部")){
				conditionMap.put("bus_type", request.getParameter("bus_type"));
			}
			if(request.getParameter("customer_name")!=null&&!request.getParameter("customer_name").trim().equals("")){
				conditionMap.put("customer_name", request.getParameter("customer_name"));
			}
			if(request.getParameter("order")!=null&&!request.getParameter("order").trim().equals("")){
				conditionMap.put("order", request.getParameter("order"));
			}
			
			List list = reportDao.getAllAfterSaleProblems(conditionMap);
			
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
