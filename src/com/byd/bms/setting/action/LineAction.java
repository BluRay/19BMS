package com.byd.bms.setting.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.eclipse.jdt.internal.compiler.ast.ThisReference;

import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.entity.FactoryBean;
import com.byd.bms.setting.entity.LineBean;
import com.byd.bms.setting.entity.WorkshopBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class LineAction extends BaseAction<LineBean>{

	private static final long serialVersionUID = -3775608541833320888L;
	private static Logger logger = Logger.getLogger("ScriptMaint");
	private Map<String,Object> lineList;
	//private FactoryBean factory=new FactoryBean();
	private IBaseDataDao baseDataDao;
	private Pager pager;
	private String idlist;
	
	public Map<String, Object> getLineList() {
		return lineList;
	}

	public void setLineList(Map<String, Object> lineList) {
		this.lineList = lineList;
	}

	public IBaseDataDao getBaseDataDao() {
		return baseDataDao;
	}

	public void setBaseDataDao(IBaseDataDao baseDataDao) {
		this.baseDataDao = baseDataDao;
	}
	
	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}
	
	public String getIdlist() {
		return idlist;
	}

	public void setIdlist(String idlist) {
		this.idlist = idlist;
	}

	/**
	 * 基础数据模块--线别维护首页
	 */
	public String line(){
		return "line";
	}
	
	public String showLineList(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factoryId", request.getParameter("seach_factory"));
		conditionMap.put("workshopId", request.getParameter("seach_workshop"));
		conditionMap.put("lineName", request.getParameter("input_lineName"));
		conditionMap.put("deleteFlag", request.getParameter("input_deleteFlag"));
		conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		List datalist=new ArrayList();
		datalist=baseDataDao.getLineList(conditionMap);	
		int totalCount=baseDataDao.getLineTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		lineList=new HashMap<String,Object>();
		lineList.put("lineList", datalist);
		lineList.put("pager", pager);
		
		return SUCCESS;
	}
	
	public String addLine(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		LineBean line=(LineBean)model;
		baseDataDao.addLine(line);
		return SUCCESS;
	}
	
	public String editLine(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		LineBean line=(LineBean)model;
		baseDataDao.updateLine(line);
		return SUCCESS;
	}
	
	public String deleteLine(){
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		baseDataDao.deleteLine(ids);
		return SUCCESS;
	}
	
	public String checkDeleteLine(){
		//工厂下包含未删除的线别信息时不能删除
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		int result = baseDataDao.checkDeleteLine(ids);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(result);
		return null;
	}
	
}
