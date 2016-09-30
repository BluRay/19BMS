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

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.entity.FactoryBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class BaseDataAction extends BaseAction<FactoryBean>{

	private static final long serialVersionUID = 4802063613636251215L;
	private static Logger logger = Logger.getLogger("ScriptMaint");
	private Map<String,Object> factoryList;
	//private FactoryBean factory=new FactoryBean();
	private IBaseDataDao baseDataDao;
	private Pager pager;
	private String input_factory;
	private String input_assembcode;
	private String idlist;
	public IBaseDataDao getBaseDataDao() {
		return baseDataDao;
	}

	public void setBaseDataDao(IBaseDataDao baseDataDao) {
		this.baseDataDao = baseDataDao;
	}
	
	public Map<String, Object> getFactoryList() {
		return factoryList;
	}

	public void setFactoryList(Map<String, Object> factoryList) {
		this.factoryList = factoryList;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}
	
	public String getInput_factory() {
		return input_factory;
	}

	public void setInput_factory(String input_factory) {
		this.input_factory = input_factory;
	}

	public String getInput_assembcode() {
		return input_assembcode;
	}

	public void setInput_assembcode(String input_assembcode) {
		this.input_assembcode = input_assembcode;
	}
	
	public String getIdlist() {
		return idlist;
	}

	public void setIdlist(String idlist) {
		this.idlist = idlist;
	}
	
	public String settingIndex(){
		return "settingIndex";
	}
	/**
	 * 基础数据模块--工厂维护首页
	 */
	public String index(){
		return "index";
	}
	
	public String showFactoryList(){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory", this.getInput_factory());
		conditionMap.put("assembcode", this.getInput_assembcode());
		conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		List datalist=new ArrayList();
		datalist=baseDataDao.getFactoryList(conditionMap);		
		int totalCount=baseDataDao.getFactoryTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		factoryList=new HashMap<String,Object>();
		factoryList.put("factoryList", datalist);
		factoryList.put("pager", pager);
		
		return SUCCESS;
	}
	public String addFactory(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		System.out.println(model.getArea());
		FactoryBean factory=(FactoryBean)model;
		baseDataDao.addFactory(factory);
		return SUCCESS;
	}
	public String updateFactory(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		System.out.println(model.getArea());
		FactoryBean factory=(FactoryBean)model;
		baseDataDao.updateFactory(factory);
		return SUCCESS;
	}
	public String deleteFactory(){
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		System.out.println(idlist);
		baseDataDao.deleteFactory(ids);
		return SUCCESS;
	}
	public String checkDeleteFactory(){
		//工厂下包含未删除的车间信息时不能删除
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		int result = baseDataDao.checkDeleteFactory(ids);
		System.out.println(idlist+"需要删除的工厂"+result);
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
