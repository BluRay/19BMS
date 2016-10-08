package com.byd.bms.hr.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import com.byd.bms.hr.dao.IHrDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;

public class StandardWorkGroupAction extends BaseAction<Object>{

	private static final long serialVersionUID = 1L;
	private IHrDao hrDao;
	private Pager pager;
	private TransactionTemplate transactionTemplate;
	
	public TransactionTemplate getTransactionTemplate() {
		return transactionTemplate;
	}

	public void setTransactionTemplate(TransactionTemplate transactionTemplate) {
		this.transactionTemplate = transactionTemplate;
	}

	/**
	 * 首页
	 * @return
	 */
	public String index(){
		return "index";
	}
	
	/**
	 * 获取标准班组树
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String getWorkGroupTree() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		System.out.println("返回数据");

		List list = hrDao.getStandardWorkGroupTree();
		//TreeNode t = recursiveTree("1",list);

		JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
		
		//JSONObject jn = JSONObject.fromObject(t);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 获取车间下标准班组清单或者标准班组下的标准小班组清单
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String getWorkGroupList() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("pId", request.getParameter("pId"));
		List list = hrDao.getStandardWorkGroupList(conditionMap);
		//TreeNode t = recursiveTree("1",list);

		JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
		
		//JSONObject jn = JSONObject.fromObject(t);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 删除已维护的标准班组
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String deleteWorkGroup() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("workgroupId", Integer.parseInt(request.getParameter("workgroupId").toLowerCase()));
		String str = "删除成功";
		boolean b = true;
		//判断此标准班组下是否有小班组以及此标准班组是否已使用
		List list = hrDao.checkStandardWorkGroupUsed(conditionMap);
		if(list.size()>0){
			b = false;
			str = "标准班组正在使用中，不能删除！";
		}else{
			int result = hrDao.deleteStandardWorkGroup(conditionMap);
			if(result<0){
				b = false;
				str = "标准班组删除异常，请联系系统管理员！";
			}
		}
		JSONObject json = Util.dataListToJson(b, str, null, null);
		
		//JSONObject jn = JSONObject.fromObject(t);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 新增或者修改标准班组
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String updateWorkGroup() throws UnsupportedEncodingException{
		transactionTemplate.setIsolationLevel(TransactionDefinition.ISOLATION_REPEATABLE_READ);
		transactionTemplate.execute(new TransactionCallbackWithoutResult(){

			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				try{	
					HttpServletRequest request = ServletActionContext.getRequest();
					request.setCharacterEncoding("UTF-8");
					HttpServletResponse response = ServletActionContext.getResponse();
					response.setContentType("text/html;charset=utf-8");
					PrintWriter out = null;
					boolean b = true;
					int user_id=getUser().getId();
					String addDataArr = request.getParameter("addDataArr");
					String updateDataArr = request.getParameter("updateDataArr");
					int r=1;
					String str = "";
					
					//新增标准班组
					if(addDataArr!=null&&addDataArr.trim().length()>0){
						List<Map<String, Object>> conditionList = new ArrayList();
						String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
						//新增的标准班组信息
						//[{'workshop_id':workshop_id,'parent_id':parent_id,'type':type,'workgroup_no':workgroupNo,'workgroup_name':workgroupName,'responsibility':responsibility,'memo':memo}]
						JSONArray jsonArray=JSONArray.fromObject(addDataArr);
						for(int i=0;i<jsonArray.size();i++){
							Map<String, Object> map= new HashMap<String, Object>();
							JSONObject object = (JSONObject)jsonArray.get(i);
							map.put("workshop_id", object.get("workshop_id"));
							map.put("parent_id", object.get("parent_id"));
							map.put("type", object.get("type"));
							map.put("workgroup_no", object.get("workgroup_no"));
							map.put("workgroup_name", object.get("workgroup_name"));
							if(null!=object.get("responsibility")&&object.get("responsibility").toString().trim().length()>0){
								map.put("responsibility", object.get("responsibility"));
							}
							if(null!=object.get("memo")&&object.get("memo").toString().trim().length()>0){
								map.put("memo", object.get("memo"));
							}
							map.put("editor_id", user_id);
							map.put("edit_date", createTime);
							conditionList.add(map);
						}
						
						//校验是否重复新增
						if(conditionList.size()>0){
							/**
							 * 根据条件查询所有已维护的标准班组和小班组
							 */
							List<Map<String,Object>> oldList = hrDao.queryStandardWorkGroupList(conditionList);
							//校验用户页面填写的和数据库里面已经存在的记录是否存在重复情况
							for(int i=0;i<jsonArray.size();i++){
								JSONObject object = (JSONObject)jsonArray.get(i);
								String workshop_id = object.get("workshop_id").toString();
								String parent_id = object.get("parent_id").toString();
								String type = object.get("type").toString();
								String workgroup_no = object.get("workgroup_no").toString();
								String workgroup_name = object.get("workgroup_name").toString();
								for(int x=0;x< oldList.size(); x++){
									Map oldMap = oldList.get(x);
									String workshop_id_o = oldMap.get("workshop_id").toString();
									String parent_id_o = oldMap.get("parent_id").toString();
									String type_o = oldMap.get("type").toString();
									String workgroup_no_o = oldMap.get("workgroup_no").toString();
									String workgroup_name_o = oldMap.get("workgroup_name").toString();
						
									if(workshop_id_o.equals(workshop_id) && parent_id_o.equals(parent_id) 
											&& type_o.equals(type) && workgroup_name_o.equals(workgroup_name)){
										b = false;
										str += "存在重复标准班组："+object.get("workgroup_name")+"，请确认原始数据是否正确！\n";
										break;
									}
										
								}
							}
						}
						//校验用户页面填写信息是否存在重复情况
						for(int i=0;i<jsonArray.size();i++){
							JSONObject object = (JSONObject)jsonArray.get(i);
							String workshop_id = object.get("workshop_id").toString();
							String parent_id = object.get("parent_id").toString();
							String type = object.get("type").toString();
							String workgroup_no = object.get("workgroup_no").toString();
							String workgroup_name = object.get("workgroup_name").toString();
							for(int x=0;x< jsonArray.size(); x++){
								if(x==i){
									break;
								}
								JSONObject oldObject = (JSONObject)jsonArray.get(x);
								String workshop_id_o = oldObject.get("workshop_id").toString();
								String parent_id_o = oldObject.get("parent_id").toString();
								String type_o = oldObject.get("type").toString();
								String workgroup_no_o = oldObject.get("workgroup_no").toString();
								String workgroup_name_o = oldObject.get("workgroup_name").toString();
					
								if(workshop_id_o.equals(workshop_id) && parent_id_o.equals(parent_id) 
										&& type_o.equals(type) && workgroup_name_o.equals(workgroup_name)){
									b = false;
									str += "存在重复标准班组："+object.get("workgroup_name")+"，请确认原始数据是否正确！\n";
									break;
								}
									
							}
						}
						
						if(b && conditionList.size()>0){
							r = hrDao.addStandardWorkGroup(conditionList);
							str = "保存成功";
						}
					}
					
					//修改标准班组
					if(updateDataArr!=null&&updateDataArr.trim().length()>0){
						List<Map<String, Object>> conditionList = new ArrayList();
						String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
						//修改的标准班组信息
						//{'id':workgroupId,'workgroup_no':workgroupNo,'workgroup_name':workgroupName,'responsibility':responsibility,'memo':memo}
						JSONArray jsonArray=JSONArray.fromObject(updateDataArr);
						for(int i=0;i<jsonArray.size();i++){
							Map<String, Object> map= new HashMap<String, Object>();
							JSONObject object = (JSONObject)jsonArray.get(i);
							map.put("id", object.get("id"));
							map.put("workshop_id", object.get("workshop_id"));
							map.put("parent_id", object.get("parent_id"));
							//查询需要更改的班组parentId
							String orgIds = hrDao.getOrgIdByOrgName(object.get("parent_name").toString());
							map.put("parent_name", orgIds);
							map.put("type", object.get("type"));
							map.put("workgroup_no", object.get("workgroup_no"));
							map.put("workgroup_name", object.get("workgroup_name"));
							map.put("responsibility", object.get("responsibility"));
							map.put("memo", object.get("memo"));
							map.put("editor_id", user_id);
							map.put("edit_date", createTime);
							conditionList.add(map);
						}
						//校验是否重复新增
						if(conditionList.size()>0){
							/**
							 * 根据条件查询所有已维护的标准班组和小班组
							 */
							List<Map<String,Object>> oldList = hrDao.queryStandardWorkGroupList(conditionList);
							//校验用户页面填写的和数据库里面已经存在的记录是否存在重复情况
							for(int i=0;i<jsonArray.size();i++){
								JSONObject object = (JSONObject)jsonArray.get(i);
								String id = object.get("id").toString();
								String workshop_id = object.get("workshop_id").toString();
								String parent_id = object.get("parent_id").toString();
								String type = object.get("type").toString();
								String workgroup_no = object.get("workgroup_no").toString();
								String workgroup_name = object.get("workgroup_name").toString();
								for(int x=0;x< oldList.size(); x++){
									Map oldMap = oldList.get(x);
									String workshop_id_o = oldMap.get("workshop_id").toString();
									String parent_id_o = oldMap.get("parent_id").toString();
									String type_o = oldMap.get("type").toString();
									String workgroup_no_o = oldMap.get("workgroup_no").toString();
									String workgroup_name_o = oldMap.get("workgroup_name").toString();
						
									if((!id.equals(oldMap.get("id").toString())) && workshop_id_o.equals(workshop_id) && parent_id_o.equals(parent_id) 
											&& type_o.equals(type) && workgroup_name_o.equals(workgroup_name)){
										b = false;
										str += "存在重复标准班组："+object.get("workgroup_name")+"，请确认原始数据是否正确！\n";
										break;
									}
										
								}
							}
						}
						//校验用户页面填写信息是否存在重复情况
						for(int i=0;i<jsonArray.size();i++){
							JSONObject object = (JSONObject)jsonArray.get(i);
							String workshop_id = object.get("workshop_id").toString();
							String parent_id = object.get("parent_id").toString();
							String type = object.get("type").toString();
							String workgroup_no = object.get("workgroup_no").toString();
							String workgroup_name = object.get("workgroup_name").toString();
							for(int x=0;x< jsonArray.size(); x++){
								if(x==i){
									break;
								}
								JSONObject oldObject = (JSONObject)jsonArray.get(x);
								String workshop_id_o = oldObject.get("workshop_id").toString();
								String parent_id_o = oldObject.get("parent_id").toString();
								String type_o = oldObject.get("type").toString();
								String workgroup_no_o = oldObject.get("workgroup_no").toString();
								String workgroup_name_o = oldObject.get("workgroup_name").toString();
					
								if(workshop_id_o.equals(workshop_id) && parent_id_o.equals(parent_id) 
										&& type_o.equals(type) && workgroup_name_o.equals(workgroup_name)){
									b = false;
									str += "存在重复标准班组："+object.get("workgroup_name")+"，请确认原始数据是否正确！\n";
									break;
								}
									
							}
						}
						
						if(b && conditionList.size()>0){
							//更新组织结构里相应标准班组名称
							int a = hrDao.updateWorkGroupOrgName(conditionList);
							r = hrDao.updateStandardWorkGroup(conditionList);
							str = "保存成功";
							
						}
					}
					if(r<0){
						b = false;
						str = "标准班组删除异常，请联系系统管理员！";
					}
					
					JSONObject json = Util.dataListToJson(b, str, null, null);
					
					//JSONObject jn = JSONObject.fromObject(t);
					try {
						out = response.getWriter();
					} catch (IOException e) {
						e.printStackTrace();
					}
					out.print(json);
				}catch(Exception e){
					//result.put("success", false);
					//result.put("message", "保存失败");
					e.printStackTrace(); 
					status.setRollbackOnly(); 	
				}
				
			}
		});
		return null;
	}
	
	
	public IHrDao getHrDao() {
		return hrDao;
	}
	public void setHrDao(IHrDao hrDao) {
		this.hrDao = hrDao;
	}
	
	public Pager getPager() {
		return pager;
	}
	public void setPager(Pager pager) {
		this.pager = pager;
	}
}
