package com.byd.bms.setting.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.eclipse.jdt.internal.compiler.ast.ThisReference;

import com.byd.bms.plan.entity.PlanMasterPlan;
import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.entity.KeysBean;
import com.byd.bms.setting.entity.PartsBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class PartsAction extends BaseAction<PartsBean>{

	private static final long serialVersionUID = -3775608541833320888L;
	private static Logger logger = Logger.getLogger("ScriptMaint");
	private Map<String,Object> partsList;
	private IBaseDataDao baseDataDao;
	private Pager pager;
	private String idlist;
	private File file;					//获取上传文件
    private String fileFileName;		//获取上传文件名称
    private String fileContentType;		//获取上传文件类型    
	public File getFile() {
		return file;
	}
	public void setFile(File file) {
		this.file = file;
	}
	public String getFileFileName() {
		return fileFileName;
	}
	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
	public String getFileContentType() {
		return fileContentType;
	}
	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}
	
	public Map<String, Object> getPartsList() {
		return partsList;
	}

	public void setPartsList(Map<String, Object> partsList) {
		this.partsList = partsList;
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
	public String parts(){
		return "parts";
	}
	
	public String showPartsList(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if(request.getParameter("seach_parts_type_id")!=null && !request.getParameter("seach_parts_type_id").trim().equals("全部"))conditionMap.put("parts_type", request.getParameter("seach_parts_type_id"));
		conditionMap.put("workshop_id", request.getParameter("seach_workshop"));
		conditionMap.put("parts_name", request.getParameter("seach_parts_name"));
		conditionMap.put("quality_flag", request.getParameter("input_quality_flag"));
		conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		List datalist=new ArrayList();
		datalist=baseDataDao.getPartsList(conditionMap);	
		int totalCount=baseDataDao.getPartsTotalCount(conditionMap);
		pager.setTotalCount(totalCount);
		partsList=new HashMap<String,Object>();
		partsList.put("partsList", datalist);
		partsList.put("pager", pager);
		return SUCCESS;
	}
	
	public String addParts(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = null;
		
		Map<String,Object> queryParts = new HashMap<String, Object>();
		queryParts.put("parts_name", model.getParts_name().trim());
		List<PartsBean> partsList = baseDataDao.getParts(queryParts);
		if(partsList.size()>0){
			json = Util.dataListToJson(false,"新增失败,输入的零部件名称:"+model.getParts_name().trim()+" 在系统已存在，不能重复维护!",null);
		}else{
			PartsBean parts=(PartsBean)model;
			parts.setParts_name(parts.getParts_name().trim());
			int addResult =baseDataDao.addParts(parts);
			if(addResult >0){
				json = Util.dataListToJson(true,"新增成功",null);
			}else{
				json = Util.dataListToJson(false,"新增失败",null);
			}
		}
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	public String editParts(){
		String createTime=Util.getToday();
		int user_id=getUser().getId();
		model.setEditDate(createTime);
		model.setEditorId(user_id);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = null;
		List<PartsBean> partsList = null;
		if(!model.getStatus().equals("1")){
			Map<String,Object> queryParts = new HashMap<String, Object>();
			queryParts.put("parts_name", model.getParts_name().trim());
			partsList = baseDataDao.getParts(queryParts);
		}
		if(partsList.size()>=2||(partsList.size()==1 && model.getId()!=partsList.get(0).getId())){
			json = Util.dataListToJson(false,"操作失败,输入的零部件名称:"+model.getParts_name().trim()+" 在系统已存在，不能重复维护!",null);
		}else{
			PartsBean parts=(PartsBean)model;
			int i = baseDataDao.updateParts(parts);


			if(i >0){
				json = Util.dataListToJson(true,"操作成功",null);
			}else{
				json = Util.dataListToJson(false,"操作失败",null);
			}
		}
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	public String deleteProcess(){
		List ids=new ArrayList();
		ids=Arrays.asList(idlist.split(","));
		System.out.println("fdasfdsa"+idlist);
		baseDataDao.deleteProcess(ids);
		return SUCCESS;
	}
	
	public String upload(){
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		System.out.println("----> PlanAction::upload");
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
    	try {
    		InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "GBK");
    		BufferedReader br = new BufferedReader(isr);   
    		//BufferedReader br = new BufferedReader(new FileReader(file));
			// 读取直到最后一行
			String line = "";
			String parts_type = "";		//订单编号
			String parts_name = "";
			String  workshop_name= "";
			int lineCount = 0;
			String message="";
			while ((line = br.readLine()) != null) {
				if (lineCount > 0){
					line = line.replaceAll("\"", "");
					String[] planArray=line.split(",",-1);
					if(planArray.length!=5){
						message += "第"+(lineCount-1)+"行数据有误！<br>";
						break;
					}
					//验证数据
					parts_name = planArray[1].trim();
					Map<String,Object> queryParts = new HashMap<String, Object>();
					queryParts.put("parts_name", parts_name);
					List<PartsBean> partsList = baseDataDao.getParts(queryParts);
					if(partsList.size()>0){
						message += "第"+(lineCount-1)+"行输入的零部件名称:"+parts_name+"在系统已存在，不能重复维护，请删除后重新上传！<br>";
//						out.print("第"+(lineCount)+"行输入的零部件名称:"+parts_name+"在系统已存在，不能重复维护，请删除后重新上传！<a href=\"javascript:history.back();\">返回</a>");
//						return null;
					}
					parts_type = planArray[0];
					Map<String,Object> queryMap = new HashMap<String, Object>();
					queryMap.put("key_code", "PARTS_TYPE");
					queryMap.put("key_name", parts_type);
					List<KeysBean> list1 = baseDataDao.getKeysByKeyName(queryMap);
					if(list1.size()!=1){
						message += "第"+(lineCount-1)+"行输入的零部件类别:"+parts_type+"在系统不存在，请检察后重新上传！<br>";
//						out.print("第"+(lineCount)+"行输入的零部件类别:"+parts_type+"在系统不存在，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
//						return null;
					}
					
					workshop_name = planArray[3];
					Map<String,Object> queryMap2 = new HashMap<String, Object>();
					queryMap2.put("key_code", "WORKSHOP");
					queryMap2.put("key_name", workshop_name);
					List<KeysBean> list = baseDataDao.getKeysByKeyName(queryMap2);
					if(list.size()!=1){
						message += "第"+(lineCount-1)+"行输入的车间:"+workshop_name+"有误，请检察后重新上传！<br>";
						//out.print("第"+(lineCount)+"行输入的车间:"+workshop_name+"有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
					}
					
				}
				lineCount++;
			}
			if(!message.equals("")){
				message += "<a href=\"javascript:history.back();\">返回</a>";
				out.print(message);
				return null;
			}
			//验证通过保存上传文件并开始写入数据库
			SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String creatTime = df2.format(new Date());
			String userName=getUser().getDisplay_name();
			int userId=getUser().getId();
			System.out.println("---->验证通过开始写入数据库");
			lineCount = 0;
			InputStreamReader isr2 = new InputStreamReader(new FileInputStream(file), "GBK");
    		BufferedReader br2  = new BufferedReader(isr2);   
			while ((line = br2.readLine()) != null) {
				if (lineCount > 0){
					System.out.println("---->验证通过开始写入数据库" + lineCount);
					String[] planArray=line.split(",",-1);
					PartsBean parts = new PartsBean();
					parts.setEditorId(userId);
					parts.setEditDate(creatTime);
					parts.setParts_type(planArray[0]);
					parts.setParts_name(planArray[1].trim());
					workshop_name = planArray[3];
					Map<String,Object> queryMap2 = new HashMap<String, Object>();
					queryMap2.put("key_code", "WORKSHOP");
					queryMap2.put("key_name", workshop_name);
					List<KeysBean> list = baseDataDao.getKeysByKeyName(queryMap2);
					if (!planArray[2].equals("")) parts.setParts_code(planArray[2]);
					if (!planArray[3].equals("")) {
						parts.setWorkshop_id(list.get(0).getId());
						parts.setWorkshop_name(workshop_name);
					}
					if (!planArray[4].equals("")&&planArray[4].equals("Y")) parts.setQuality_flag("1");;
					int addResult =baseDataDao.addParts(parts);
				}
				lineCount++;
			}
			br.close();
			br2.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
    	return "parts";
	}
	
}
