package com.byd.bms.setting.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONObject;

import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.entity.HZBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class HZAction extends BaseAction<HZBean>{

	private static final long serialVersionUID = 4502048666430772299L;
	private static Logger logger = Logger.getLogger("ScriptMaint");
	private Map<String,Object> hzList;
	private IBaseDataDao baseDataDao;
	private String conditions;
	private Pager pager;
	
	public String getConditions() {
		return conditions;
	}
	public void setConditions(String conditions) {
		this.conditions = conditions;
	}
	public IBaseDataDao getBaseDataDao() {
		return baseDataDao;
	}
	public void setBaseDataDao(IBaseDataDao baseDataDao) {
		this.baseDataDao = baseDataDao;
	}
	public Map<String, Object> getHzList() {
		return hzList;
	}
	public void setHzList(Map<String, Object> hzList) {
		this.hzList = hzList;
	}
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
	
	/**
	 * 频率维护首页
	 */
	public String hz(){
		return "hz";
	}
	/**
	 * 
	 */
	public String getParamRecordList(){
		hzList=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=(Map<String, Object>) JSONObject.toBean(jo, Map.class);
		hzList.put("dataList", baseDataDao.getHZList(conditionMap));
		int totalCount = baseDataDao.getHZTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		hzList.put("pager", pager);
		return SUCCESS;
	}
	/**
	 * 新增记录
	 * @throws UnsupportedEncodingException 
	 */
	public String addHZ() throws UnsupportedEncodingException{
//		result=new HashMap<String,Object>();
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		model.setEditor_id(user_id);
		model.setEdit_date(createTime);
		if (request.getParameter("new_workshop_id") != null&& request.getParameter("new_workshop_id") !="") model.setWorkshop_id(Integer.parseInt(request.getParameter("new_workshop_id")));
		
		int i=baseDataDao.addHZ(model);
		JSONObject json =null;
		if(i>0){
			json = Util.dataListToJson(true,"新增成功",null);
		}else{
			json = Util.dataListToJson(true,"新增失败",null);
		}
		
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	/**
	 * 修改记录
	 * @throws UnsupportedEncodingException 
	 */
	public String updateHZ() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		hzList=new HashMap<String,Object>();
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		model.setEditor_id(user_id);
		model.setEdit_date(createTime);
		int i= baseDataDao.updateHZ(model);
		JSONObject json =null;
		if(i>0){
			json = Util.dataListToJson(true,"修改成功",null);
		}else{
			json = Util.dataListToJson(false,"修改失败",null);
		}
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
}
