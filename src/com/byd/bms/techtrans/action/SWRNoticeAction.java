package com.byd.bms.techtrans.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.byd.bms.techtrans.dao.ISwrDocumentDao;
import com.byd.bms.techtrans.entity.BmsEcnTackTemp;
import com.byd.bms.techtrans.entity.BmsSwrDocument;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class SWRNoticeAction extends BaseAction<BmsSwrDocument>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8350052072195738615L;

	private Pager pager;
	public ISwrDocumentDao swrDocumentDao;
	//删除时的id集合
	private String idlist;
	private String conditions;
	
	public String getConditions() {
		return conditions;
	}
	public void setConditions(String conditions) {
		this.conditions = conditions;
	}
	public ISwrDocumentDao getSwrDocumentDao() {
		return swrDocumentDao;
	}
	public void setSwrDocumentDao(ISwrDocumentDao swrDocumentDao) {
		this.swrDocumentDao = swrDocumentDao;
	}
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	
	
	public String maintain(){
		return "maintain";
	}
	public String deleteSWRNotice() throws UnsupportedEncodingException{
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		swrDocumentDao.deleteSWRNotice(ids);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"删除成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
		
		
	}
	/**
	 * SWR通知单的查询
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showSWRNoticeList() throws UnsupportedEncodingException
	{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		
		if (request.getParameter("swr_number") != null && !request.getParameter("swr_number").trim().equals("")) conditionMap.put("swr_number", new String(request.getParameter("swr_number").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("subject") != null && !request.getParameter("subject").trim().equals("")) conditionMap.put("subject", new String(request.getParameter("subject").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("startDate") != null && !request.getParameter("startDate").equals("")) conditionMap.put("startDate", new String(request.getParameter("startDate")));
		if (request.getParameter("endDate") != null && !request.getParameter("endDate").equals("")) conditionMap.put("endDate", new String(request.getParameter("endDate")));
		if (request.getParameter("swr_id") != null) conditionMap.put("swr_id", request.getParameter("swr_id"));
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List datalist=new ArrayList();
		datalist=swrDocumentDao.getBmsSwrDocumentList(conditionMap);
		
		int totalCount=swrDocumentDao.getSWRNoticeTotalCount(conditionMap);
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	/**
	 * SWR通知单的新增保存
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String addSWRNotice() throws UnsupportedEncodingException
	{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		int userid=getUser().getId();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		PrintWriter out = null;
		
		BmsSwrDocument bmsSwrDocument=new BmsSwrDocument();
		bmsSwrDocument.setSwr_number(new String(request.getParameter("data_swr_number").getBytes("UTF-8"),"UTF-8"));
		bmsSwrDocument.setSubject(new String(request.getParameter("data_subject").getBytes("UTF-8"),"UTF-8"));
		bmsSwrDocument.setInitiator(new String(request.getParameter("data_initiator").getBytes("UTF-8"),"UTF-8"));
		bmsSwrDocument.setMemo(new String(request.getParameter("data_memo").getBytes("UTF-8"),"UTF-8"));
		bmsSwrDocument.setDate(new String(request.getParameter("data_date")));
		bmsSwrDocument.setEditor_id((new Integer(userid).toString()));
		bmsSwrDocument.setEdit_date(curTime);
		
		if(request.getParameter("swr_id")!=null&&!request.getParameter("swr_id").trim().equals("")){
			bmsSwrDocument.setId(Integer.parseInt(request.getParameter("swr_id")));
			swrDocumentDao.updateSWRNotice(bmsSwrDocument);
		}else{
			swrDocumentDao.insertSWRNotice(bmsSwrDocument);
		}
		
		JSONObject json = Util.dataListToJson(true,"保存成功！",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	public String getIdlist() {
		return idlist;
	}
	public void setIdlist(String idlist) {
		this.idlist = idlist;
	}
	
	public String showTechTransList()
	{
		return "showTechTransList";
	}
	
	//以下技改单的查询，以后转移到技改Action中
	//进入技改单查询页面
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getTechTransList() throws UnsupportedEncodingException
	{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		
		if (request.getParameter("status") != null&&!request.getParameter("status").trim().equals("")) conditionMap.put("status", new String(request.getParameter("status").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("search_task_content") != null&&!request.getParameter("search_task_content").trim().equals("")) conditionMap.put("task_content", new String(request.getParameter("search_task_content").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("selectFactory") != null&&!request.getParameter("selectFactory").trim().equals("")) conditionMap.put("selectFactory", new String(request.getParameter("selectFactory").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("selectWorkShop") != null&&!request.getParameter("selectWorkShop").trim().equals("")) conditionMap.put("selectWorkShop", new String(request.getParameter("selectWorkShop").getBytes("UTF-8"),"UTF-8"));
		if (request.getParameter("startDate") != null&&!request.getParameter("startDate").trim().equals("")) conditionMap.put("startDate", new String(request.getParameter("startDate")));
		if (request.getParameter("endDate") != null&&!request.getParameter("endDate").trim().equals("")) conditionMap.put("endDate", new String(request.getParameter("endDate")));
		if (request.getParameter("search_order_name") != null&&!request.getParameter("search_order_name").trim().equals("")) conditionMap.put("order_name", new String(request.getParameter("search_order_name").getBytes("UTF-8"),"UTF-8"));
		
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List datalist=new ArrayList();
		datalist=swrDocumentDao.getTechTransList(conditionMap);
		
		int totalCount=swrDocumentDao.getTechTransTotalCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	/**
	 * 获得点击车号时页面的显示数据集合
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getTechItemList() throws UnsupportedEncodingException
	{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("id") != null) conditionMap.put("id", new String(request.getParameter("id")));
		//先获得涉及的技改订单信息
		List datalist=new ArrayList();
		datalist=swrDocumentDao.getTechOrderItemList(conditionMap);
		
		List datalist1=new ArrayList();
		datalist1=swrDocumentDao.getTechBusNumItemList(conditionMap);
		
		
		List lists=new ArrayList();
		lists.add(datalist);
		lists.add(datalist1);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson1(true,"查询成功",datalist,datalist1);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
}
