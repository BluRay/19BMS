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

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.order.entity.BmsFactoryOrder;
import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.entity.FactoryBean;
import com.byd.bms.setting.entity.KeysBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class KeysAction extends BaseAction<KeysBean>{

	private static final long serialVersionUID = 4802063613636251215L;
	private static Logger logger = Logger.getLogger("ScriptMaint");
	private Map<String,Object> keysList;
	//private FactoryBean factory=new FactoryBean();
	private IBaseDataDao baseDataDao;
	private Pager pager;
	private String idlist;
	public IBaseDataDao getBaseDataDao() {
		return baseDataDao;
	}

	public void setBaseDataDao(IBaseDataDao baseDataDao) {
		this.baseDataDao = baseDataDao;
	}
	
	public Map<String, Object> getKeysList() {
		return keysList;
	}

	public void setKeysList(Map<String, Object> keysList) {
		this.keysList = keysList;
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
	 * 基础数据模块--工厂维护首页
	 */
	public String keys(){
		return "keys";
	}
	
	public String showKeysList(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("keyId", request.getParameter("keyId"));
		conditionMap.put("keyType", request.getParameter("input_keyType"));
		conditionMap.put("keyCode", request.getParameter("input_keyCode").toUpperCase());
		conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		List datalist=new ArrayList();
		datalist=baseDataDao.getKeysList(conditionMap);		
		int totalCount=baseDataDao.getKeysTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		keysList=new HashMap<String,Object>();
		keysList.put("keysList", datalist);
		keysList.put("pager", pager);
		
		return SUCCESS;
	}
	public String addKey(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		HttpServletRequest request = ServletActionContext.getRequest();
		model.setKeyType(request.getParameter("new_key_type"));
		model.setKeyCode(request.getParameter("new_key_code"));
		String keyNameValue = request.getParameter("keyNameValue");
		String[] strarray=keyNameValue.split(",");
		for(int i = 0; i < strarray.length; i++) {			
			String  keyName = strarray[i].substring(0, strarray[i].indexOf(":"));
			String keyValue = strarray[i].substring(strarray[i].indexOf(":") + 1, strarray[i].length());		
			model.setKeyName(keyName);
			model.setValue(keyValue);
			KeysBean key=(KeysBean)model;
			baseDataDao.addKey(key);
		}	
		return SUCCESS;
	}
	public String updateKey(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		HttpServletRequest request = ServletActionContext.getRequest();
		model.setKeyType(request.getParameter("edit_key_type"));
		model.setKeyCode(request.getParameter("edit_key_code"));
		String editkeys = request.getParameter("editkeys");
		String addKeys = request.getParameter("addKeys");
		String[] addarray = null;
		String[] editarray= null;
		if(addKeys.trim()!=""){
			addarray=addKeys.split(",");
		}
		if(editkeys.trim()!=""){
			 editarray=editkeys.split(",");
		}
		if(addarray!=null){
			for(int i = 0; i < addarray.length; i++) {			
				String  keyName = addarray[i].substring(0, addarray[i].indexOf(":"));
				String keyValue = addarray[i].substring(addarray[i].indexOf(":") + 1, addarray[i].length());		
				model.setKeyName(keyName);
				model.setValue(keyValue);
				KeysBean key=(KeysBean)model;
				baseDataDao.addKey(key);
			}
		}
		if(editarray!=null){
			for(int i = 0; i < editarray.length; i++) {			
				int  keyId =Integer.parseInt( editarray[i].substring(0, editarray[i].indexOf(":")));
				String deleteFlag = editarray[i].substring(editarray[i].indexOf(":") + 1, editarray[i].length());		
				model.setId(keyId);
				model.setDeleteFlag(deleteFlag);
				KeysBean key=(KeysBean)model;
				baseDataDao.updateKey(key);
			}
		}
		return SUCCESS;
	}
	public String getKey(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("keyCode", request.getParameter("keyCode").toUpperCase());
		List datalist=new ArrayList();
		datalist=baseDataDao.getKeysList(conditionMap);		
		keysList=new HashMap<String,Object>();
		keysList.put("keysList", datalist);
		return SUCCESS;
	}
	
}
