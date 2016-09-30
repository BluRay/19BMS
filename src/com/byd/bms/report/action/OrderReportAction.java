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

public class OrderReportAction extends BaseAction<Object> {

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
	 * 
	 */
	public String orderIndex(){
		return "orderIndex";
	}
	/**
	 * 在制订单进度
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String orderInProcessReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "orderInProcessReport";	
		}else{
			System.out.println("返回数据");
			list = reportDao.getOrderSchedule();
			
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
	 * 工厂订单进度报表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String factoryOrderProcessReport() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag"+flag);
		if(flag!=null &&flag.equals("view")){
			System.out.println("直接返回JSP");
			return "factoryOrderProcessReport";	
		}else{
			System.out.println("返回数据");
			int factory_id = Integer.parseInt(request.getParameter("factory_id"));
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("factory_id", factory_id);
			
			list = reportDao.getFactoryOrderSchedule(map);
			
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
