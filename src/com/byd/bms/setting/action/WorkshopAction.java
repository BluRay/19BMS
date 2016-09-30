package com.byd.bms.setting.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.eclipse.jdt.internal.compiler.ast.ThisReference;

import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.entity.FactoryBean;
import com.byd.bms.setting.entity.WorkshopBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class WorkshopAction extends BaseAction<WorkshopBean>{

	private static final long serialVersionUID = -3775608541833320888L;
	private static Logger logger = Logger.getLogger("ScriptMaint");
	private Map<String,Object> workshopList;
	//private FactoryBean factory=new FactoryBean();
	private IBaseDataDao baseDataDao;
	private Pager pager;
	private String idlist;
	
	private String seach_factory;
	private String input_workshopName;
	private String input_deleteFlag;
	

	public String getSeach_factory() {
		return seach_factory;
	}

	public void setSeach_factory(String seach_factory) {
		this.seach_factory = seach_factory;
	}

	public String getInput_workshopName() {
		return input_workshopName;
	}

	public void setInput_workshopName(String input_workshopName) {
		this.input_workshopName = input_workshopName;
	}

	public String getInput_deleteFlag() {
		return input_deleteFlag;
	}

	public void setInput_deleteFlag(String input_deleteFlag) {
		this.input_deleteFlag = input_deleteFlag;
	}
	public Map<String, Object> getWorkshopList() {
		return workshopList;
	}

	public void setWorkshopList(Map<String, Object> workshopList) {
		this.workshopList = workshopList;
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
	 * 基础数据模块--车间维护首页
	 */
	public String workshop(){
		return "workshop";
	}
	
	public String showWorkshopList(){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factoryId", this.getSeach_factory());
		conditionMap.put("workshopName", this.getInput_workshopName());
		conditionMap.put("deleteFlag", this.getInput_deleteFlag());
		conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		List datalist=new ArrayList();
		datalist=baseDataDao.getWorkshopList(conditionMap);	
		int totalCount=baseDataDao.getWorkshopTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		workshopList=new HashMap<String,Object>();
		workshopList.put("workshopList", datalist);
		workshopList.put("pager", pager);
		
		return SUCCESS;
	}
	
	public String addWorkshop(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		WorkshopBean workshop=(WorkshopBean)model;
		baseDataDao.addWorkshop(workshop);
		return SUCCESS;
	}
	
	public String editWorkshop(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		WorkshopBean workshop=(WorkshopBean)model;
		baseDataDao.updateWorkshop(workshop);
		return SUCCESS;
	}
	
	public String deleteWorkshop(){
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		System.out.println("fdasfdsa"+idlist);
		baseDataDao.deleteWorkshop(ids);
		return SUCCESS;
	}
	
	public String checkDeleteWorkshop(){
		//工厂下包含未删除的线别信息时不能删除
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		int result = baseDataDao.checkDeleteWorkshop(ids);
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
