package com.byd.bms.setting.action;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.xwork.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.eclipse.jdt.internal.compiler.ast.ThisReference;

import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.entity.FactoryBean;
import com.byd.bms.setting.entity.LineBean;
import com.byd.bms.setting.entity.ProcessBean;
import com.byd.bms.setting.entity.WorkshopBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class ProcessAction extends BaseAction<ProcessBean>{

	private static final long serialVersionUID = -3775608541833320888L;
	private static Logger logger = Logger.getLogger("ScriptMaint");
	private Map<String,Object> processList;
	private IBaseDataDao baseDataDao;
	private Pager pager;
	private String idlist;
	
	public Map<String, Object> getProcessList() {
		return processList;
	}

	public void setProcessList(Map<String, Object> processList) {
		this.processList = processList;
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
	 * 基础数据模块--工序维护首页
	 */
	public String process(){
		return "process";
	}
	
	public String showProcessList() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("utf-8");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factoryId", request.getParameter("seach_factory"));
		conditionMap.put("workshopId", request.getParameter("seach_workshop"));
		conditionMap.put("lineId", request.getParameter("seach_line"));
		conditionMap.put("processName", request.getParameter("input_processName"));
		conditionMap.put("monitoryPointFlag", request.getParameter("input_monitoryPointFlag"));
		conditionMap.put("keyProcessFlag", request.getParameter("input_keyProcessFlag"));
		conditionMap.put("onlineFlag", request.getParameter("input_onlineFlag"));
		conditionMap.put("offlineFlag", request.getParameter("input_offlineFlag"));
		conditionMap.put("deleteFlag", request.getParameter("input_deleteFlag"));
		conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		List datalist=new ArrayList();
		datalist=baseDataDao.getProcessList(conditionMap);	
		int totalCount=baseDataDao.getProcessTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		processList=new HashMap<String,Object>();
		processList.put("processList", datalist);
		processList.put("pager", pager);
		
		return SUCCESS;
	}
	
	public String addProcess(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		ProcessBean process=(ProcessBean)model;
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("line_id", process.getLineId());
		conditionMap.put("process_id", "");
		conditionMap.put("plan_node_id", process.getPlanNodeId());
		
		List datalist=new ArrayList();
		datalist = baseDataDao.getProcessExistPlanId(conditionMap);
		//System.out.println("---->datalist.size = " + datalist.size());
		if(datalist.size() >0){
			return ERROR;
		}else{
			int addResult =baseDataDao.addProcess(process);
			return SUCCESS;		
		}	
		
	}
	
	public String editProcess(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		ProcessBean process=(ProcessBean)model;
		
		//在维护工序的计划节点时校验，本工厂下是否已经存在维护了此计划节点的工序，
		//如有提示“系统已存在XXX工序维护了计划节点XXX，一个工厂下不能有超过一道工序关联相同的计划节点”
		//System.out.println("---->planNodeId = " + process.getPlanNodeId());
		//System.out.println("---->line_id = " + process.getLineId());
		//System.out.println("---->process_id = " + process.getId());
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("line_id", process.getLineId());
		conditionMap.put("process_id", process.getId());
		conditionMap.put("plan_node_id", process.getPlanNodeId());
		
		List datalist=new ArrayList();
		datalist = baseDataDao.getProcessExistPlanId(conditionMap);
		//System.out.println("---->datalist.size = " + datalist.size());
		
		if(!StringUtils.isEmpty(process.getPlanNodeId())&&datalist.size() >0){
			processList.put("success", false);
			processList.put("message", "一个工厂下不能有超过一道工序关联相同的计划节点!");
		}else{
			processList.put("success", true);
			baseDataDao.updateProcess(process);			
		}
		return SUCCESS;
	}
	
	public String deleteProcess(){
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		System.out.println("fdasfdsa"+idlist);
		baseDataDao.deleteProcess(ids);
		return SUCCESS;
	}
	
}
