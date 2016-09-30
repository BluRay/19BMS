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
import com.byd.bms.setting.entity.WorkgroupBean;
import com.byd.bms.setting.entity.WorkshopBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class WorkgroupAction extends BaseAction<WorkgroupBean>{

	private static final long serialVersionUID = -3775608541833320888L;
	private static Logger logger = Logger.getLogger("ScriptMaint");
	private Map<String,Object> workgroupList;
	//private FactoryBean factory=new FactoryBean();
	private IBaseDataDao baseDataDao;
	private Pager pager;
	private String idlist;
	
	public Map<String, Object> getWorkgroupList() {
		return workgroupList;
	}

	public void setWorkgroupList(Map<String, Object> workgroupList) {
		this.workgroupList = workgroupList;
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
	public String workgroup(){
		return "workgroup";
	}
	
	public String showWorkgroupList(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factoryId", request.getParameter("seach_factory"));
		conditionMap.put("workshopId", request.getParameter("seach_workshop"));
		conditionMap.put("workgroupName", request.getParameter("input_workgroupName"));
		conditionMap.put("deleteFlag", request.getParameter("input_deleteFlag"));
		conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		List datalist=new ArrayList();
		datalist=baseDataDao.getWorkgroupList(conditionMap);	
		int totalCount=baseDataDao.getWorkgroupTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		workgroupList=new HashMap<String,Object>();
		workgroupList.put("workgroupList", datalist);
		workgroupList.put("pager", pager);
		
		return SUCCESS;
	}
	
	public String addWorkgroup(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		WorkgroupBean workgroup=(WorkgroupBean)model;
		baseDataDao.addWorkgroup(workgroup);
		return SUCCESS;
	}
	
	public String editWorkgroup(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		WorkgroupBean workgroup=(WorkgroupBean)model;
		baseDataDao.updateWorkgroup(workgroup);
		return SUCCESS;
	}
	
	public String deleteWorkgroup(){
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		baseDataDao.deleteWorkgroup(ids);
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
