package com.byd.bms.setting.action;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.dao.DuplicateKeyException;

import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.entity.BusTypeBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class BusTypeAction extends BaseAction<BusTypeBean>{

	private static final long serialVersionUID = -3775608541833320888L;
	private static Logger logger = Logger.getLogger("ScriptMaint");
	private Map<String,Object> busTypeList;
	private IBaseDataDao baseDataDao;
	private Pager pager;
	private String idlist;
	
	public Map<String, Object> getBusTypeList() {
		return busTypeList;
	}

	public void setBusTypeList(Map<String, Object> busTypeList) {
		this.busTypeList = busTypeList;
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
	 * 基础数据模块--车型维护首页
	 */
	public String busType(){
		return "busType";
	}
	
	public String showBusTypeList(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("vehicleType", request.getParameter("seach_vehicle_type"));
		conditionMap.put("busTypeCode", request.getParameter("seach_busTypeCode"));
		conditionMap.put("internalName", request.getParameter("seach_internalName"));

		conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		List datalist=new ArrayList();
		datalist=baseDataDao.getBusTypeList(conditionMap);	
		int totalCount=baseDataDao.getBusTypeTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		busTypeList=new HashMap<String,Object>();
		busTypeList.put("busTypeList", datalist);
		busTypeList.put("pager", pager);
		
		return SUCCESS;
	}
	
	public String addBusType(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		model.setWmi("LC0"); //设置比亚迪的世界制造厂识别代号（WMI）
		
		BusTypeBean busType=(BusTypeBean)model;
		try{
			int addResult =baseDataDao.addBusType(busType);
			busTypeList.put("success", true);
			busTypeList.put("message", "新增成功");
		}catch(DuplicateKeyException e){
			busTypeList.put("success", false);
			busTypeList.put("message", "同一车型编号只能对应一个车辆型号！");
			//e.printStackTrace();
			
		}
		
		return SUCCESS;
	}
	
	public String editBusType(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		BusTypeBean busType=(BusTypeBean)model;
		System.out.println("fdsa"+busType.getBatteryCapacity());
		baseDataDao.updateBusType(busType);
		return SUCCESS;
	}
	
	
}
