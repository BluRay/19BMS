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

public class CostReportAction extends BaseAction<Object> {

	private static final long serialVersionUID = 2577979467761817463L;
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
	 * 成本分析报表首页
	 */
	public String costIndex(){
		return "costIndex";
	}
	
	/**
	 * 月技改总工时
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String ecnCostReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "ecnCostReport";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			conditionMap.put("start_date", request.getParameter("start_date").concat("-00 00:00:00"));
			conditionMap.put("end_date", request.getParameter("start_date").concat("-31 23:59:59"));
			List list = reportDao.getEcnCost(conditionMap);
			
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
	 * 各车间单车制造费用
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String singleBusManufacturingCost() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "singleBusManufacturingCost";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			conditionMap.put("cost_month", request.getParameter("cost_month").replaceAll("-", ""));
			//conditionMap.put("end_date", request.getParameter("start_date").concat("-31 23:59:59"));
			List list = reportDao.getSingleBusManufacturingCost(conditionMap);
			
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
	 * 各车间月制造费用比例图
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String classificationCost() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "classificationCost";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			conditionMap.put("cost_month", request.getParameter("cost_month").replaceAll("-", ""));
			conditionMap.put("cost_department_id", request.getParameter("cost_department_id"));
			List list = reportDao.getClassificationCost(conditionMap);
			
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
	 * 各工厂总共制造费用
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String totalCost() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "totalCost";	
		}else{
			System.out.println("返回数据");
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			//conditionMap.put("factory_id", request.getParameter("factory_id"));
			conditionMap.put("cost_month", request.getParameter("cost_month").replaceAll("-", ""));
			//conditionMap.put("end_date", request.getParameter("start_date").concat("-31 23:59:59"));
			List list = reportDao.getTotalCost(conditionMap);
			
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
