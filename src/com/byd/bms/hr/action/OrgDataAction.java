package com.byd.bms.hr.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.byd.bms.hr.dao.IOrgDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;
import com.byd.bms.util.poi.ExcelModel;
import com.byd.bms.util.poi.ExcelTool;

public class OrgDataAction extends BaseAction<Object> {

	private static final long serialVersionUID = 11223344;
	private IOrgDao orgDao;
	private Map<String, Object> result;
	private Pager pager;

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	private File file;
	
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public IOrgDao getOrgDao() {
		return orgDao;
	}

	public void setOrgDao(IOrgDao orgDao) {
		this.orgDao = orgDao;
	}

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}

	private static List orgList;
	
	public List getOrgList() {
		return orgList;
	}

	public void setOrgList(List orgList) {
		this.orgList = orgList;
	}

	/**
	 * 组织结构首页
	 */
	public String index() {
		return "index";
	}

	/**
	 * 岗位体系
	 */
	public String positionSystem() {
		return "positionSystem";
	}

	/**
	 * 部门标准岗位
	 */
	public String standardPosition() {
		return "standardPosition";
	}
	
	/**
	 * 岗位说明书
	 */
	public String positionDescription() {
		return "positionDescription";
	}
	
	/**
	 * 标准人力
	 */
	public String standardHuman() {
		return "standardHuman";
	}
	
	/**
	 * 人力配置
	 */
	public String humanConfiguration() {
		return "humanConfiguration";
	}
	
	/**
	 * 工厂产能
	 */
	public String factoryCapacity() {
		return "factoryCapacity";
	}
	
	/**
	 * 自编号维护
	 */
	public String isCustomer() {
		return "isCustomer";
	}
	
	/**
	 * 获得组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getOrgData() throws UnsupportedEncodingException {
		//int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("id", request.getParameter("id"));
			conditionMap.put("parent_id", request.getParameter("parent_id"));
			//System.out.println(request.getServletPath());
			//conditionMap.put("url", request.getServletPath());
			//conditionMap.put("user_id", userid);

			List list = orgDao.getOrgData(conditionMap);
			if(request.getParameter("id")==null){
				this.setOrgList(list);
			}

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
	}

	public class TreeNode implements Serializable {
		private String id;
		private String parent;
		private String name;
		private String display_name;
		private String short_name;
		private String level;
		private String sort_number;
		private String manager;
		private String org_type;
		private String org_kind;
		private String responsibilities;
		private String deleted;
		public String getDeleted() {
			return deleted;
		}
		public void setDeleted(String deleted) {
			this.deleted = deleted;
		}
		//子节点
		private List nodes = new ArrayList();
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getParent() {
			return parent;
		}
		public void setParent(String parent) {
			this.parent = parent;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getDisplay_name() {
			return display_name;
		}
		public void setDisplay_name(String display_name) {
			this.display_name = display_name;
		}
		public String getShort_name() {
			return short_name;
		}
		public void setShort_name(String short_name) {
			this.short_name = short_name;
		}
		public String getLevel() {
			return level;
		}
		public void setLevel(String level) {
			this.level = level;
		}
		public String getSort_number() {
			return sort_number;
		}
		public void setSort_number(String sort_number) {
			this.sort_number = sort_number;
		}
		public String getManager() {
			return manager;
		}
		public void setManager(String manager) {
			this.manager = manager;
		}
		public String getOrg_type() {
			return org_type;
		}
		public void setOrg_type(String org_type) {
			this.org_type = org_type;
		}
		public String getOrg_kind() {
			return org_kind;
		}
		public void setOrg_kind(String org_kind) {
			this.org_kind = org_kind;
		}
		public String getResponsibilities() {
			return responsibilities;
		}
		public void setResponsibilities(String responsibilities) {
			this.responsibilities = responsibilities;
		}
		public List getNodes() {
			return nodes;
		}
		public void setNodes(List nodes) {
			this.nodes = nodes;
		}
	}

	/**
	 * 递归算法解析成树形结构
	 *
	 * @param id
	 * @return
	 * @author wx
	 */
	public TreeNode recursiveTree(String id,List<HashMap<Object,Object>> s) {
		// 根据cid获取节点对象(SELECT * FROM tb_tree t WHERE t.cid=?)
		TreeNode node = getTreeNode(id,s);
		// 查询cid下的所有子节点(SELECT * FROM tb_tree t WHERE t.pid=?)
		List<TreeNode> childTreeNodes = queryTreeNode(id,s);
		// 遍历子节点
		for (TreeNode child : childTreeNodes) {
			TreeNode n = recursiveTree(child.getId(),s); // 递归
			node.getNodes().add(n);
		}

		return node;
	}

	private List<TreeNode> queryTreeNode(String id,List<HashMap<Object,Object>> s) {
		List list = new ArrayList();
		for(HashMap<Object,Object> h : s){
			if(h.get("parent")==null){
				//
			}else
			if(h.get("parent").toString().equals(id)){
				TreeNode tn = new TreeNode();
				tn.setId(h.get("id")==null?"":h.get("id").toString());
				if(h.get("parent")==null){
					tn.setParent("0");
				}else{
					tn.setParent(h.get("parent").toString());
				}
				tn.setName(h.get("name")==null?"":h.get("name").toString());
				tn.setDisplay_name(h.get("display_name")==null?"":h.get("display_name").toString());
				tn.setShort_name(h.get("short_name")==null?"":h.get("short_name").toString());
				tn.setLevel(h.get("level")==null?"":h.get("level").toString());
				tn.setSort_number(h.get("sort_number")==null?"0":h.get("sort_number").toString());
				tn.setManager(h.get("manager")==null?"":h.get("manager").toString());
				tn.setOrg_type(h.get("org_type")==null?"":h.get("org_type").toString());
				tn.setOrg_kind(h.get("org_kind")==null?"":h.get("org_kind").toString());
				tn.setResponsibilities(h.get("responsibilities")==null?"":h.get("responsibilities").toString());
				tn.setDeleted(h.get("deleted")==null?"":h.get("deleted").toString());
				list.add(tn);
			}
		}
		return list;
	}

	private TreeNode getTreeNode(String id,List<HashMap<Object,Object>> s) {
		TreeNode tn = new TreeNode();
		for(HashMap<Object,Object> h : s){
			if(h.get("id").toString().equals(id)){
				tn.setId(h.get("id")==null?"":h.get("id").toString());
				if(h.get("parent")==null){
					tn.setParent("0");
				}else{
					tn.setParent(h.get("parent").toString());
				}
				tn.setName(h.get("name")==null?"":h.get("name").toString());
				tn.setDisplay_name(h.get("display_name")==null?"":h.get("display_name").toString());
				tn.setShort_name(h.get("short_name")==null?"":h.get("short_name").toString());
				tn.setLevel(h.get("level")==null?"":h.get("level").toString());
				tn.setSort_number(h.get("sort_number")==null?"0":h.get("sort_number").toString());
				tn.setManager(h.get("manager")==null?"":h.get("manager").toString());
				tn.setOrg_type(h.get("org_type")==null?"":h.get("org_type").toString());
				tn.setOrg_kind(h.get("org_kind")==null?"":h.get("org_kind").toString());
				tn.setResponsibilities(h.get("responsibilities")==null?"":h.get("responsibilities").toString());
				tn.setDeleted(h.get("deleted")==null?"":h.get("deleted").toString());
			}
		}
		return tn;
	}
	
	public void traverseTreeDeleteOrg(TreeNode node){
		for(TreeNode n :(List<TreeNode>)node.getNodes()){
			//do something
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("id", n.getId());
			orgDao.deleteOrgData(conditionMap);
			traverseTreeDeleteOrg(n);
		}
	}
	
	public void traverseTreeCopyOrg(TreeNode node,String parent){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		
		for(TreeNode n :(List<TreeNode>)node.getNodes()){
			//do something
			
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("parent_id", parent);
			conditionMap.put("org_type", n.getOrg_type());
			conditionMap.put("org_kind", n.getOrg_kind());
			conditionMap.put("level", n.getLevel());
			conditionMap.put("name", n.getDisplay_name());
			conditionMap.put("name_en", n.getName());
			conditionMap.put("org_code", n.getShort_name());
			conditionMap
					.put("sort_number", n.getSort_number());
			conditionMap.put("manager", n.getManager());
			conditionMap.put("responsibilities",
					n.getResponsibilities());
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);
			
			conditionMap.put("id", "");
			
			//conditionMap.put("id", n.getId());
			orgDao.addOrgData(conditionMap);
			traverseTreeCopyOrg(n,conditionMap.get("id").toString());
		}
	}
	
	//根据名称获得节点id
	public String findTreeNodeByName(String name){
		if(getOrgList()==null){
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			List list = orgDao.getOrgData(conditionMap);
			setOrgList(list);
		}
		for(Map m : (List<Map<String,Object>>)getOrgList()){
			if(name.equals(m.get("display_name")!=null?m.get("display_name").toString():"")){
				return m.get("id").toString();
			}
		}
		return null;
	}
	
	//根据节点名和父节点id获得节点id
	public  String findChildNodeByName(String name,String parentid){
		/*if(getOrgList()==null){
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			List list = orgDao.getOrgData(conditionMap);
			setOrgList(list);
		}*/
		for(Map m : (List<Map<String,Object>>)getOrgList()){
			if(name.equals(m.get("display_name")!=null?m.get("display_name").toString():"") && parentid.equals(m.get("parent")!=null?m.get("parent").toString():"")){
				return m.get("id").toString();
			}
		}
		return null;
	}

	/**
	 * 添加组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String addOrgData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("parent_id", request.getParameter("parent_id"));
			conditionMap.put("org_type", request.getParameter("org_type"));
			conditionMap.put("org_kind", request.getParameter("org_kind"));
			conditionMap.put("level", request.getParameter("org_type"));
			conditionMap.put("name", request.getParameter("name"));
			conditionMap.put("name_en", request.getParameter("name_en"));
			conditionMap.put("org_code", request.getParameter("org_code"));
			conditionMap
					.put("sort_number", request.getParameter("sort_number"));
			conditionMap.put("manager", request.getParameter("manager"));
			conditionMap.put("responsibilities",
					request.getParameter("responsibilities"));
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);
			
			//数据插入成功后返回新插入数据的id
			conditionMap.put("id", "");
			
			int result = orgDao.addOrgData(conditionMap);
			
			//复制
			if(request.getParameter("id")!=null){
				//生成子tree
				TreeNode t = recursiveTree(request.getParameter("id"),this.getOrgList());
				//递归复制子tree的所有节点
				traverseTreeCopyOrg(t,conditionMap.get("id").toString());
			}

			JSONObject json = Util.dataListToJson(true, "添加成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}

	/**
	 * 修改组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String editOrgData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("parent_id", request.getParameter("parent_id"));
			conditionMap.put("org_type", request.getParameter("org_type"));
			conditionMap.put("org_kind", request.getParameter("org_kind"));
			conditionMap.put("level", request.getParameter("org_type"));
			conditionMap.put("name", request.getParameter("name"));
			conditionMap.put("name_en", request.getParameter("name_en"));
			conditionMap.put("org_code", request.getParameter("org_code"));
			/*conditionMap
					.put("sort_number", request.getParameter("sort_number"));*/
			conditionMap.put("manager", request.getParameter("manager"));
			conditionMap.put("responsibilities",
					request.getParameter("responsibilities"));
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);

			conditionMap.put("id", request.getParameter("id"));

			int result = orgDao.editOrgData(conditionMap);
			System.out.println(result);

			JSONObject json = Util.dataListToJson(true, "修改成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 子节点排序
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String sortOrgData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("sort_number", request.getParameter("sort_number"));
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);
			conditionMap.put("id", request.getParameter("id"));

			int result = orgDao.sortOrgData(conditionMap);
			System.out.println(result);

			JSONObject json = Util.dataListToJson(true, "修改成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}

	/**
	 * 删除组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String deleteOrgData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("id", request.getParameter("id"));

			//生成子tree
			TreeNode t = recursiveTree(request.getParameter("id"),this.getOrgList());
			//递归删除子tree的所有节点
			traverseTreeDeleteOrg(t);
			//删除当前节点
			int result = orgDao.deleteOrgData(conditionMap);

			JSONObject json = Util.dataListToJson(true, "删除成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}

	/**
	 * 获得组织结构下拉框
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getOrgDeptList() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("id", request.getParameter("id"));

			List list = orgDao.getOrgDeptList(conditionMap);

			JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 获得班组/小班组下拉框
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getWorkGroupList() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("type", request.getParameter("type"));
			if("1".equals(request.getParameter("type"))){
				conditionMap.put("workgroup_name", request.getParameter("parent"));
			}else if("0".equals(request.getParameter("type"))){
				conditionMap.put("workshop_name", request.getParameter("parent"));
			}

			List list = orgDao.getWorkGroupList(conditionMap);

			JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 添加岗位
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String addPositionData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("parent_job_id", request.getParameter("parent_job_id")==""?null:request.getParameter("parent_job_id"));
			conditionMap.put("job_no", request.getParameter("job_no"));
			conditionMap.put("job_name", request.getParameter("job_name"));
			conditionMap.put("job_level", request.getParameter("job_level"));
			conditionMap.put("job_grade_id", request.getParameter("job_grade_id"));
			conditionMap.put("age", request.getParameter("age"));
			conditionMap.put("level_limit_min", request.getParameter("level_limit_min"));
			conditionMap
					.put("level_limit_max", request.getParameter("level_limit_max"));
			conditionMap.put("sax", request.getParameter("sax"));
			conditionMap.put("minimum_education",
					request.getParameter("minimum_education"));
			
			conditionMap.put("specialty", request.getParameter("specialty"));
			conditionMap.put("foreign_language", request.getParameter("foreign_language"));
			conditionMap.put("work_experience", request.getParameter("work_experience"));
			conditionMap.put("basic_besponsibilit", request.getParameter("basic_besponsibilit"));
			conditionMap
					.put("requirements", request.getParameter("requirements"));
			conditionMap.put("skill_and_capability", request.getParameter("skill_and_capability"));
			conditionMap.put("required_train",
					request.getParameter("required_train"));
			
			conditionMap.put("other_requirements", request.getParameter("other_requirements"));
			
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);

			int result = orgDao.addPositionData(conditionMap);

			JSONObject json = Util.dataListToJson(true, "添加成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 获得岗位等级下拉框
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getPositionGradeList() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			//Map<String, Object> conditionMap = new HashMap<String, Object>();

			//conditionMap.put("id", request.getParameter("id"));

			List list = orgDao.getPositionGradeList();

			JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 获得父岗位下拉框
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getParentPositionList() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("id", request.getParameter("id"));
			conditionMap.put("gid", request.getParameter("gid"));

			List list = orgDao.getParentPositionList(conditionMap);

			JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 获得岗位
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getPositionData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("job_grade_id", request.getParameter("job_grade_id"));
			conditionMap.put("id", request.getParameter("id"));

			List list = orgDao.getPositionData(conditionMap);
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
	}
	
	/**
	 * 修改岗位
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String editPositionData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("parent_job_id", request.getParameter("parent_job_id"));
			conditionMap.put("job_no", request.getParameter("job_no"));
			conditionMap.put("job_name", request.getParameter("job_name"));
			conditionMap.put("job_level", request.getParameter("job_level"));
			conditionMap.put("job_grade_id", request.getParameter("job_grade_id"));
			conditionMap.put("age", request.getParameter("age"));
			conditionMap.put("level_limit_min", request.getParameter("level_limit_min"));
			conditionMap
					.put("level_limit_max", request.getParameter("level_limit_max"));
			conditionMap.put("sax", request.getParameter("sax"));
			conditionMap.put("minimum_education",
					request.getParameter("minimum_education"));
			
			conditionMap.put("specialty", request.getParameter("specialty"));
			conditionMap.put("foreign_language", request.getParameter("foreign_language"));
			conditionMap.put("work_experience", request.getParameter("work_experience"));
			conditionMap.put("basic_besponsibilit", request.getParameter("basic_besponsibilit"));
			conditionMap
					.put("requirements", request.getParameter("requirements"));
			conditionMap.put("skill_and_capability", request.getParameter("skill_and_capability"));
			conditionMap.put("required_train",
					request.getParameter("required_train"));
			
			conditionMap.put("other_requirements", request.getParameter("other_requirements"));
			
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);

			conditionMap.put("id", request.getParameter("id"));

			int result = orgDao.editPositionData(conditionMap);
			System.out.println(result);

			JSONObject json = Util.dataListToJson(true, "修改成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}

	/**
	 * 删除岗位
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String deletePositionData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("id", request.getParameter("id"));

			int result = orgDao.deletePositionData(conditionMap);

			JSONObject json = Util.dataListToJson(true, "删除成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 添加部门标准岗位
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String addStandardPositionData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("job_id", request.getParameter("job_id"));
			conditionMap.put("org_id", request.getParameter("org_id"));
			
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);
			
			int result = orgDao.addStandardPositionData(conditionMap);

			JSONObject json = Util.dataListToJson(true, "添加成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 获得部门标准岗位
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getStandardPositionData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("org_id", request.getParameter("org_id"));
			conditionMap.put("id", request.getParameter("id"));
			

			List list = orgDao.getStandardPositionData(conditionMap);
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
	}
	
	/**
	 * 获得工作关系图
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getWorkRelationshipChart() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("org_id", request.getParameter("org_id"));
			conditionMap.put("id", request.getParameter("id"));
			

			List list = orgDao.getWorkRelationshipChart(conditionMap);
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
	}
	
	/**
	 * 部门标准岗位编号模糊查询
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getStandardPositionFuzzySelect() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("job_no", request.getParameter("job_no"));

			List list = orgDao.getStandardPositionFuzzySelect(conditionMap);

			JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 删除部门标准岗位
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String deleteStandardPositionData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("id", request.getParameter("id"));
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);

			int result = orgDao.deleteStandardPositionData(conditionMap);

			JSONObject json = Util.dataListToJson(true, "删除成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 上传部门标准岗位csv文件
	 * @return
	 */
	@SuppressWarnings("resource")
	public String upload(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		//logger.info("---->ProductionAction::upload " + curTime + " " + userid);
		HttpServletResponse response = ServletActionContext.getResponse();
		HttpServletRequest request = ServletActionContext.getRequest();
		response.setContentType("text/html;charset=utf-8");
		
		//信息
		String message = "";
		
		PrintWriter out = null;
		try {
			out = response.getWriter();
			
			ExcelModel excelModel =new ExcelModel();
			excelModel.setReadSheets(1);
			excelModel.setStart(1);
			Map<String,Integer> dataType = new HashMap<String,Integer>();
			dataType.put("0", ExcelModel.CELL_TYPE_STRING);
			dataType.put("1", ExcelModel.CELL_TYPE_STRING);
			excelModel.setDataType(dataType);
			excelModel.setPath(request.getSession().getServletContext().getRealPath("/")+(new Date()).getTime()+".xlsx");
			
    		InputStream is = new FileInputStream(file);
    		
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			
			//结果集
			List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
			//标识
			boolean flg=true;
			
			//行号
			int line=1;
			//部门id
			String orgid=null;
			//岗位id
			String jobid=null;
			
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			List<Map<String, Object>> positionDataList = orgDao.getPositionData(conditionMap);
			
			//System.out.println("-------------"+excelModel.getData().size()+"-------------");
			for(Object[] data : excelModel.getData()){
				String orgpath = data[0].toString().trim();
				String positionname = data[1].toString().trim();
				if(orgpath=="" || positionname==""){
					flg=false;
					break;
				}
				//获得部门id
				String[] orgpatharray = orgpath.split("-");
				for(int i=0;i<orgpatharray.length;i++){
					if(i==0){
						orgid = this.findTreeNodeByName(orgpatharray[i]);
					}else{
						if(orgid!=null){
							orgid = this.findChildNodeByName(orgpatharray[i], orgid);
						}else{
							/*flg=false;*/
							break;
						}
					}
				}
				//获得岗位id
				for(Map<String,Object> m : positionDataList){
					if(positionname.equals(m.get("job_name").toString())){
						jobid = m.get("id").toString();
						break;
					}
				}
				//都成功
				if(orgid!=null&&jobid!=null){
					Map<String,Object> m  = new HashMap<String,Object>();
					m.put("org_id", orgid);
					m.put("job_id",jobid);
					
					m.put("deleted", "0");
					m.put("editor_id", userid);
					m.put("edit_date", curTime);
					
					resultList.add(m);
					
					line++;
					orgid=null;
					jobid=null;
				}else{
					//失败
					flg=false;
					break;
				}
			}
			
			if(flg){
				for(Map<String,Object> m : resultList){
					orgDao.addStandardPositionData(m);
				}
				message = "上传成功！";
			}else{
				message = "上传失败！第"+line+"行数据有误！";
				out.print(message+"<a href=\"javascript:history.back();\">返回</a>");
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		/*String path = ServletActionContext.getServletContext().getRealPath("/images/upload/productionImportCusNum/");  
    	// 写到指定的路径中  
    	File savefile = new File(path);
    	// 如果指定的路径没有就创建  
    	if (!savefile.exists()) {  
    		savefile.mkdirs();  
    	}*/
    	/*try {
			BufferedReader br = new BufferedReader(new FileReader(file));
			String line = "";
			int lineCount = 0;
			
			while ((line = br.readLine()) != null) {
				if (lineCount > 0){
					String[] spArray=line.split(",",-1);
					//验证数据
					if(spArray.length < 2){
						out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
					if(!isNumeric(spArray[0])){
						out.print("第"+(lineCount+1)+"行第1列数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
					if(!isNumeric(spArray[1])){
						out.print("第"+(lineCount+1)+"行第2列数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
				}
				lineCount ++;
			}
			
			//验证通过保存上传文件并开始写入数据库
			String userName=getUser().getDisplay_name();
			String fileFileName = userName + curTime + ".csv";
			//FileUtils.copyFile(file, new File(savefile, fileFileName));
			
			lineCount = 0;
			BufferedReader br2 = new BufferedReader(new FileReader(file));
			while ((line = br2.readLine()) != null) {
				//logger.info("---->验证通过开始更新数据库" + lineCount);
				if (lineCount > 0){
					String[] spArray=line.split(",",-1);
					Map<String,Object> queryMap=new HashMap<String,Object>();
					//queryMap.put("order_no", vinArray[0]);
					//this.order_no = vinArray[0];
					//queryMap.put("busNumber", vinArray[1]);
					//queryMap.put("customerNumber", vinArray[2]);
					queryMap.put("org_id", spArray[0]);
					queryMap.put("job_id", spArray[1]);
					
					queryMap.put("deleted", "0");
					queryMap.put("editor_id", userid);
					queryMap.put("edit_date", curTime);
					orgDao.addStandardPositionData(queryMap);
				}
				lineCount++;
			}			
			
    	}catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}*/				
		/*return "importStandardPositionSuccess";*/
		out.print("<script>alert('"+message+"');window.location.href='orgData!standardPosition.action';</script>");
		return null;
	}
	
	/**
	 * 上传标准人力
	 * @return
	 */
	@SuppressWarnings("resource")
	public String upload1(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		//logger.info("---->ProductionAction::upload " + curTime + " " + userid);
		HttpServletResponse response = ServletActionContext.getResponse();
		HttpServletRequest request = ServletActionContext.getRequest();
		response.setContentType("text/html;charset=utf-8");
		
		//信息
		String message = "";
		
		PrintWriter out = null;
		try {
			out = response.getWriter();
			
			ExcelModel excelModel =new ExcelModel();
			excelModel.setReadSheets(1);
			excelModel.setStart(1);
			Map<String,Integer> dataType = new HashMap<String,Integer>();
			dataType.put("0", ExcelModel.CELL_TYPE_STRING);
			dataType.put("1", ExcelModel.CELL_TYPE_STRING);
			dataType.put("2", ExcelModel.CELL_TYPE_NUMERIC);
			dataType.put("3", ExcelModel.CELL_TYPE_NUMERIC);
			dataType.put("4", ExcelModel.CELL_TYPE_STRING);
			dataType.put("5", ExcelModel.CELL_TYPE_STRING);
			excelModel.setDataType(dataType);
			excelModel.setPath(request.getSession().getServletContext().getRealPath("/")+(new Date()).getTime()+".xlsx");
			
    		InputStream is = new FileInputStream(file);
    		
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			
			//结果集
			List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
			//标识
			boolean flg=true;
			
			//行号
			int line=1;
			//部门id
			String orgid=null;
			//岗位id
			String jobid=null;
			//车型id
			String busTypeId=null;
			
			/*Map<String, Object> conditionMap = new HashMap<String, Object>();
			List<Map<String, Object>> positionDataList = orgDao.getPositionData(conditionMap);*/
			
			List<Map<String, Object>> busTypeDataList = orgDao.getBusTypeData();
			
			//System.out.println("-------------"+excelModel.getData().size()+"-------------");
			for(Object[] data : excelModel.getData()){
				String orgpath = data[0].toString().trim();
				String positionname = data[1].toString().trim();
				String capacity = data[2].toString().trim();
				String standardHuman = data[3].toString().trim();
				String type = data[4].toString().trim();
				String busType = data[5].toString().trim();
				if(orgpath=="" || positionname=="" || type==""){
					flg=false;
					break;
				}
				//校验产能和标准人力为数字
				if(!isNumeric(capacity)){
					flg=false;
					break;
				}
				if(!isNumeric(standardHuman)){
					flg=false;
					break;
				}
				//人力类别校验
				if(!("计件".equals(type)||"计时".equals(type))){
					flg=false;
					break;
				}
				//车型校验
				if("计件".equals(type)){
					if("".equals(busType)){
						flg=false;
						break;
					}
					//获得车型id
					for(Map<String,Object> bt : busTypeDataList){
						if(busType.equals(bt.get("internal_name").toString())){
							busTypeId = bt.get("id").toString();
							break;
						}
					}
				}/*else if("计时".equals(type)){
					if(!"".equals(busType)){
						flg=false;
						break;
					}
				}*/
				
				String[] orgpatharray = orgpath.split("-");
				//产能校验
				String factory = orgpatharray[0];
				Map<String, Object> fcMap = new HashMap<String, Object>();
				fcMap.put("factory", factory);
				List<Map<String, Object>> fclist = orgDao.getFactoryCapacityData(fcMap);
				boolean capacityValid = false;
				for(Map<String,Object> fc : fclist){
					if(capacity.equals(fc.get("capacity").toString())){
						capacityValid = true;
						break;
					}
				}
				//获得部门id
				for(int i=0;i<orgpatharray.length;i++){
					if(i==0){
						orgid = this.findTreeNodeByName(orgpatharray[i]);
					}else{
						if(orgid!=null){
							orgid = this.findChildNodeByName(orgpatharray[i], orgid);
						}else{
							/*flg=false;*/
							break;
						}
					}
				}
				//验证部门类型和人力类别
				if(orgid!=null){
					Map<String, Object> orgMap = new HashMap<String, Object>();
					orgMap.put("id", orgid);
					List<Map<String, Object>> orglist = orgDao.getOrgData(orgMap);
					if("0".equals(orglist.get(0).get("org_kind"))){
						if(!"计时".equals(type)){
							flg=false;
							break;
						}
					}
					if("1".equals(orglist.get(0).get("org_kind"))){
						if(!"计件".equals(type)){
							flg=false;
							break;
						}
					}
				}
				/*//获得岗位id
				for(Map<String,Object> m : positionDataList){
					if(positionname.equals(m.get("job_name").toString())){
						jobid = m.get("id").toString();
						break;
					}
				}*/
				//都成功
				if(orgid!=null/*&&jobid!=null*/&&capacityValid&&(("计件".equals(type)&&busTypeId!=null)||"计时".equals(type))){
					Map<String,Object> m  = new HashMap<String,Object>();
					m.put("org_id", orgid);
					
					if("计时".equals(type)){
						m.put("type", 0);
					}
					if("计件".equals(type)){
						m.put("type", 1);
					}
					m.put("bus_type_id", busTypeId);
					m.put("capacity", capacity);
					m.put("standard_humans", standardHuman);
					
					m.put("deleted", "0");
					m.put("editor_id", userid);
					m.put("edit_date", curTime);
					
					//验证岗位是否在标准岗位库中
					List<Map<String, Object>> shlist = orgDao.getStandardHumanData(m);
					for(Map<String,Object> sh : shlist){
						if(positionname.equals(sh.get("job_name"))){
							jobid=sh.get("job_id").toString();
							//判断是添加还是修改
							if(sh.get("standard_humans")!=null && !"".equals(sh.get("standard_humans").toString())){
								m.put("id",sh.get("id").toString());
							}
							break;
						}
					}
					if(jobid==null){
						flg=false;
						break;
					}else{
						m.put("job_id",jobid);
					}
					
					resultList.add(m);
					
					line++;
					orgid=null;
					jobid=null;
					busTypeId=null;
				}else{
					//失败
					flg=false;
					break;
				}
			}
			
			if(flg){
				for(Map<String,Object> m : resultList){
					if(m.get("id")!=null){
						orgDao.editStandardHumanData(m);
					}else{
						orgDao.addStandardHumanData(m);
					}
				}
				message = "上传成功！";
			}else{
				message = "上传失败！第"+line+"行数据有误！";
				out.print(message+"<a href=\"javascript:history.back();\">返回</a>");
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			message = e.getMessage();
		}
		/*String path = ServletActionContext.getServletContext().getRealPath("/images/upload/productionImportCusNum/");  
    	// 写到指定的路径中  
    	File savefile = new File(path);
    	// 如果指定的路径没有就创建  
    	if (!savefile.exists()) {  
    		savefile.mkdirs();  
    	}*/
    	/*try {
			BufferedReader br = new BufferedReader(new FileReader(file));
			String line = "";
			int lineCount = 0;
			
			while ((line = br.readLine()) != null) {
				if (lineCount > 0){
					String[] spArray=line.split(",",-1);
					//验证数据
					if(spArray.length < 2){
						out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
					if(!isNumeric(spArray[0])){
						out.print("第"+(lineCount+1)+"行第1列数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
					if(!isNumeric(spArray[1])){
						out.print("第"+(lineCount+1)+"行第2列数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}
				}
				lineCount ++;
			}
			
			//验证通过保存上传文件并开始写入数据库
			String userName=getUser().getDisplay_name();
			String fileFileName = userName + curTime + ".csv";
			//FileUtils.copyFile(file, new File(savefile, fileFileName));
			
			lineCount = 0;
			BufferedReader br2 = new BufferedReader(new FileReader(file));
			while ((line = br2.readLine()) != null) {
				//logger.info("---->验证通过开始更新数据库" + lineCount);
				if (lineCount > 0){
					String[] spArray=line.split(",",-1);
					Map<String,Object> queryMap=new HashMap<String,Object>();
					//queryMap.put("order_no", vinArray[0]);
					//this.order_no = vinArray[0];
					//queryMap.put("busNumber", vinArray[1]);
					//queryMap.put("customerNumber", vinArray[2]);
					queryMap.put("org_id", spArray[0]);
					queryMap.put("job_id", spArray[1]);
					
					queryMap.put("deleted", "0");
					queryMap.put("editor_id", userid);
					queryMap.put("edit_date", curTime);
					orgDao.addStandardPositionData(queryMap);
				}
				lineCount++;
			}			
			
    	}catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}*/				
		/*return "importStandardPositionSuccess";*/
		out.print("<script>alert('"+message+"');window.location.href='orgData!standardHuman.action';</script>");
		return null;
	}
	
	/**
	 * 判断是否数字
	 * @param str
	 * @return
	 */
	public boolean isNumeric(String str){
	   Pattern pattern = Pattern.compile("[0-9]*");
	   Matcher isNum = pattern.matcher(str);
	   if( !isNum.matches() ){
	       return false;
	   }
	   return true;
	}
	
	/**
	 * 导出部门标准岗位csv文件
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings("rawtypes")
	public String exportStandardPosition() throws UnsupportedEncodingException{
		/*SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();*/
		//logger.info("---->PlanAction::exportVin " + curTime + " " + userid);
		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("GBK");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		/*conditionMap.put("factory_id", request.getParameter("factory_id"));*/
		conditionMap.put("org_id", request.getParameter("org_id"));
		String orgpath = request.getParameter("orgpath").replaceAll("&gt;", "");
		List datalist=new ArrayList();
		datalist=orgDao.getStandardPositionData(conditionMap);
		//StringBuffer strBuffer = new StringBuffer();  
		
		List<String> header = new ArrayList<String>();
		header.add("部门");
		header.add("岗位名称");
		header.add("岗位编号");
		header.add("岗位级别");
		header.add("岗位职责");
		
		List<Object[]> data = new ArrayList<Object[]>();

		//strBuffer.append("oj.org_id,oj.job_id,j.job_no,j.job_name,g.job_grade_name,j.job_level,j.basic_besponsibilit,\n"); 
		for(int i=0;i<datalist.size();i++){
			Map<String,Object> valueMap=new HashMap<String,Object>();
			valueMap = (Map<String,Object>)datalist.get(i);
			Object[] objArr = new Object[header.size()];
			objArr[0] = orgpath;
			objArr[1] = valueMap.get("job_name").toString();
			objArr[2] = valueMap.get("job_no").toString();
			objArr[3] = valueMap.get("job_level").toString();
			objArr[4] = valueMap.get("basic_besponsibilit").toString();
			
			data.add(objArr);
			//strBuffer.append(org_id+","+job_id+","+job_no+","+job_name+","+job_grade_name+","+job_level+","+basic_besponsibilit+",\n"); 
		}     
        //HttpServletResponse response = ServletActionContext.getResponse();  
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String curTime = df.format(new Date());
		String fileName ="部门标准岗位-"+orgpath/*.replaceAll(">", "")*/+"-"+curTime;
		fileName = fileName+".xlsx";
		ExcelModel excelModel = new ExcelModel();
		excelModel.setPath(request.getSession().getServletContext().getRealPath("/")+fileName);
		excelModel.setSheetName("部门标准岗位");
		excelModel.setHeader(header);
		excelModel.setData(data);
		/*
		 * 输出到前台
		 */
        //设置响应头和下载保存的文件名
		response.setHeader("Content-Type","text/html; charset=UTF-8");
        response.setHeader("content-disposition","attachment;filename="+new String(fileName.getBytes("gbk"), "iso8859-1"));
        //定义输出类型
        response.setContentType("APPLICATION/msexcel");  
		ExcelTool excelTool = new ExcelTool();
		
        /*response.setHeader("Content-Disposition","attachment;filename=exportStandardPosition.csv");  
        response.setContentType("APPLICATION/OCTET-STREAM");  */
		//取得输出流
        OutputStream out = null;
        try {  
        	out = response.getOutputStream();
	        /*//清空输出流
	        response.reset();*/
        	excelTool.downLoad(excelModel, out);
            /*response.getWriter().print(strBuffer.toString());  
            response.getWriter().flush();  */
        } catch (Exception e) {
            e.printStackTrace();  
        }finally{  
            try {  
            	out.flush();
				out.close();
            } catch (IOException e) {
                e.printStackTrace();  
            }  
        }  
        return NONE;  
	}
	
	/**
	 * 获得标准人力
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getStandardHumanData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("org_id", request.getParameter("org_id"));
			conditionMap.put("isTab", request.getParameter("isTab"));
			//if(request.getParameter("capacity")!=""){
				conditionMap.put("capacity", request.getParameter("capacity"));
			//}
			//if(request.getParameter("bus_type_id")!=""){
				conditionMap.put("bus_type_id", request.getParameter("bus_type_id"));
			//}
			//if(request.getParameter("type")!=""){
				conditionMap.put("type", request.getParameter("type"));
			//}

			List list = orgDao.getStandardHumanData(conditionMap);
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
	}
	
	/**
	 * 获得车型tabs
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getBusTypeData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			/*Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("id", request.getParameter("id"));*/

			List list = orgDao.getBusTypeData();

			JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 添加标准人力
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String addStandardHumanData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("type", request.getParameter("type")==""?null:request.getParameter("type"));
			conditionMap.put("org_id", request.getParameter("org_id")==""?null:request.getParameter("org_id"));
			conditionMap.put("job_id", request.getParameter("job_id")==""?null:request.getParameter("job_id"));
			conditionMap.put("capacity", request.getParameter("capacity")==""?null:request.getParameter("capacity"));
			conditionMap.put("bus_type_id", request.getParameter("bus_type_id")==""?null:request.getParameter("bus_type_id"));
			conditionMap.put("standard_humans", request.getParameter("standard_humans")==""?null:request.getParameter("standard_humans"));
			
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);

			int result = orgDao.addStandardHumanData(conditionMap);

			JSONObject json = Util.dataListToJson(true, "添加成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 修改标准人力
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String editStandardHumanData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("standard_humans", request.getParameter("standard_humans"));
			conditionMap.put("id", request.getParameter("id"));

			int result = orgDao.editStandardHumanData(conditionMap);
			System.out.println(result);

			JSONObject json = Util.dataListToJson(true, "修改成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 获得人力配置
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getHumanConfigurationData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("org_id", request.getParameter("org_id"));
			conditionMap.put("isTab", request.getParameter("isTab"));
			//if(request.getParameter("capacity")!=""){
				conditionMap.put("capacity", request.getParameter("capacity"));
			//}
			//if(request.getParameter("bus_type_id")!=""){
				conditionMap.put("bus_type_id", request.getParameter("bus_type_id"));
			//}
			//if(request.getParameter("type")!=""){
				//conditionMap.put("type", request.getParameter("type"));
			//}

			List list = orgDao.getHumanConfigurationData(conditionMap);
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
	}
	
	/**
	 * 人力配置，获得车型tabs
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getBusTypeData1() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("capacity", request.getParameter("capacity"));
			conditionMap.put("org_id", request.getParameter("org_id"));

			List list = orgDao.getBusTypeData1(conditionMap);

			JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 获得现有人力
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getRealHumanData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("job", request.getParameter("job"));
			String[] allParents = request.getParameter("allParents").split("->");
			switch(allParents.length){
			case 5:
				conditionMap.put("team_org",allParents[4]);
				conditionMap.put("workgroup_org",allParents[3]);
				conditionMap.put("workshop_org",allParents[2]);
				conditionMap.put("dept_org",allParents[1]);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 4:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",allParents[3]);
				conditionMap.put("workshop_org",allParents[2]);
				conditionMap.put("dept_org",allParents[1]);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 3:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",null);
				conditionMap.put("workshop_org",allParents[2]);
				conditionMap.put("dept_org",allParents[1]);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 2:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",null);
				conditionMap.put("workshop_org",null);
				conditionMap.put("dept_org",allParents[1]);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 1:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",null);
				conditionMap.put("workshop_org",null);
				conditionMap.put("dept_org",null);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 0:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",null);
				conditionMap.put("workshop_org",null);
				conditionMap.put("dept_org",null);
				conditionMap.put("plant_org",null);
				break;
			}

			List list = orgDao.getRealHumanData(conditionMap);
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
	}
	
	/**
	 * 获得人员明细
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getHumanDetailData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("job", request.getParameter("job"));
			String[] allParents = request.getParameter("allParents").split("->");
			switch(allParents.length){
			case 5:
				conditionMap.put("team_org",allParents[4]);
				conditionMap.put("workgroup_org",allParents[3]);
				conditionMap.put("workshop_org",allParents[2]);
				conditionMap.put("dept_org",allParents[1]);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 4:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",allParents[3]);
				conditionMap.put("workshop_org",allParents[2]);
				conditionMap.put("dept_org",allParents[1]);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 3:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",null);
				conditionMap.put("workshop_org",allParents[2]);
				conditionMap.put("dept_org",allParents[1]);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 2:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",null);
				conditionMap.put("workshop_org",null);
				conditionMap.put("dept_org",allParents[1]);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 1:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",null);
				conditionMap.put("workshop_org",null);
				conditionMap.put("dept_org",null);
				conditionMap.put("plant_org",allParents[0]);
				break;
			case 0:
				conditionMap.put("team_org",null);
				conditionMap.put("workgroup_org",null);
				conditionMap.put("workshop_org",null);
				conditionMap.put("dept_org",null);
				conditionMap.put("plant_org",null);
				break;
			}

			List list = orgDao.getHumanDetailData(conditionMap);
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
	}
	
	/**
	 * 导出人力配置
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings("rawtypes")
	public String exportHumanConfiguration() throws UnsupportedEncodingException{
		/*SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();*/
		//logger.info("---->PlanAction::exportVin " + curTime + " " + userid);
		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("GBK");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		List datalist=new ArrayList();
		conditionMap.put("org_id", request.getParameter("org_id"));
		//conditionMap.put("isTab", request.getParameter("isTab"));
		conditionMap.put("capacity", request.getParameter("capacity"));
		if("1".equals(request.getParameter("org_kind"))){
			conditionMap.put("bus_type_id", request.getParameter("bus_type_id"));
		}
		//conditionMap.put("type", request.getParameter("type"));
		//conditionMap.put("job", request.getParameter("job"));
		String path = request.getParameter("allParents").substring(0, request.getParameter("allParents").length()-2).replaceAll(">", "");
		String[] allParents = request.getParameter("allParents").split("->");
		switch(allParents.length){
		case 5:
			conditionMap.put("team_org",allParents[4]);
			conditionMap.put("workgroup_org",allParents[3]);
			conditionMap.put("workshop_org",allParents[2]);
			conditionMap.put("dept_org",allParents[1]);
			conditionMap.put("plant_org",allParents[0]);
			break;
		case 4:
			conditionMap.put("team_org",null);
			conditionMap.put("workgroup_org",allParents[3]);
			conditionMap.put("workshop_org",allParents[2]);
			conditionMap.put("dept_org",allParents[1]);
			conditionMap.put("plant_org",allParents[0]);
			break;
		case 3:
			conditionMap.put("team_org",null);
			conditionMap.put("workgroup_org",null);
			conditionMap.put("workshop_org",allParents[2]);
			conditionMap.put("dept_org",allParents[1]);
			conditionMap.put("plant_org",allParents[0]);
			break;
		case 2:
			conditionMap.put("team_org",null);
			conditionMap.put("workgroup_org",null);
			conditionMap.put("workshop_org",null);
			conditionMap.put("dept_org",allParents[1]);
			conditionMap.put("plant_org",allParents[0]);
			break;
		case 1:
			conditionMap.put("team_org",null);
			conditionMap.put("workgroup_org",null);
			conditionMap.put("workshop_org",null);
			conditionMap.put("dept_org",null);
			conditionMap.put("plant_org",allParents[0]);
			break;
		case 0:
			conditionMap.put("team_org",null);
			conditionMap.put("workgroup_org",null);
			conditionMap.put("workshop_org",null);
			conditionMap.put("dept_org",null);
			conditionMap.put("plant_org",null);
			break;
		}

		datalist = orgDao.getHumanConfigurationData(conditionMap);
		//StringBuffer strBuffer = new StringBuffer();  
		
		List<String> header = new ArrayList<String>();
		
		header.add("部门");
		header.add("产能");
		header.add("车型");
		header.add("岗位名称");
		header.add("岗位编号");
		header.add("岗位级别");
		header.add("岗位类别");
		header.add("标准人力");
		header.add("现有人力");
		/*header.add("工号 ");
		header.add("姓名");
		header.add("技能系数 ");*/
		header.add("现有人员信息");
		
		List<Object[]> data = new ArrayList<Object[]>();

		//strBuffer.append("oj.org_id,oj.job_id,j.job_no,j.job_name,g.job_grade_name,j.job_level,j.basic_besponsibilit,\n"); 
		for(int i=0;i<datalist.size();i++){
			Map<String,Object> valueMap=new HashMap<String,Object>();
			valueMap = (Map<String,Object>)datalist.get(i);
			Object[] objArr = new Object[header.size()];
			objArr[0] = path;
			objArr[1] = request.getParameter("capacity");
			objArr[2] = "1".equals(request.getParameter("org_kind"))?request.getParameter("bus_type_name"):"";
			objArr[3] = valueMap.get("job_name")==null?"":valueMap.get("job_name").toString();
			objArr[4] = valueMap.get("job_no")==null?"":valueMap.get("job_no").toString();
			objArr[5] = valueMap.get("job_level")==null?"":valueMap.get("job_level").toString();
			objArr[6] = valueMap.get("job_grade_name")==null?"":valueMap.get("job_grade_name").toString();
			objArr[7] = valueMap.get("standard_humans")==null?"":valueMap.get("standard_humans").toString();
			conditionMap.remove("job");
			conditionMap.put("job", valueMap.get("job_name").toString());
			List realHumanList = orgDao.getRealHumanData(conditionMap);
			objArr[8] = ((Map<String,Object>)realHumanList.get(0)).get("realHuman");
			List humanDetailList = orgDao.getHumanDetailData(conditionMap);
			StringBuffer humanDetail = new StringBuffer();
			for(int j=0;j<humanDetailList.size();j++){
				Map<String,Object> humanDetailMap=new HashMap<String,Object>();
				humanDetailMap = (Map<String,Object>)humanDetailList.get(j);
				humanDetail.append(humanDetailMap.get("staff_number"));
				humanDetail.append("        ");	
				humanDetail.append(humanDetailMap.get("name"));
				humanDetail.append("        ");
				humanDetail.append(humanDetailMap.get("skill_parameter"));
				humanDetail.append("\r\n");
			}
			objArr[9] = humanDetail.toString();
			
			data.add(objArr);
			//strBuffer.append(org_id+","+job_id+","+job_no+","+job_name+","+job_grade_name+","+job_level+","+basic_besponsibilit+",\n"); 
		}     
        //HttpServletResponse response = ServletActionContext.getResponse();  
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String curTime = df.format(new Date());
		String fileName ="人力配置-"+path/*.replaceAll(">", "")*/+"-"+curTime;
		fileName = fileName+".xlsx";
		ExcelModel excelModel = new ExcelModel();
		excelModel.setPath(request.getSession().getServletContext().getRealPath("/")+fileName);
		excelModel.setSheetName("人力配置");
		excelModel.setHeader(header);
		excelModel.setData(data);
		/*
		 * 输出到前台
		 */
        //设置响应头和下载保存的文件名
		response.setHeader("Content-Type","text/html; charset=UTF-8");
        response.setHeader("content-disposition","attachment;filename="+new String(fileName.getBytes("gbk"), "iso8859-1"));
        //定义输出类型
        response.setContentType("APPLICATION/msexcel");  
		ExcelTool excelTool = new ExcelTool();
		
        /*response.setHeader("Content-Disposition","attachment;filename=exportStandardPosition.csv");  
        response.setContentType("APPLICATION/OCTET-STREAM");  */
		//取得输出流
        OutputStream out = null;
        try {  
        	out = response.getOutputStream();
	        /*//清空输出流
	        response.reset();*/
        	excelTool.downLoad(excelModel, out);
            /*response.getWriter().print(strBuffer.toString());  
            response.getWriter().flush();  */
        } catch (Exception e) {
            e.printStackTrace();  
        }finally{  
            try {  
            	out.flush();
				out.close();
            } catch (IOException e) {
                e.printStackTrace();  
            }  
        }  
        return NONE;  
	}
	
	/**
	 * 获得工厂产能
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getFactoryCapacityData() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("factory", request.getParameter("factory"));

			List list = orgDao.getFactoryCapacityData(conditionMap);

			JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 添加工厂产能
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String addFactoryCapacityData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("factory", request.getParameter("factory"));
			conditionMap.put("capacity", request.getParameter("capacity"));
			
			//conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);
			
			int result = orgDao.addFactoryCapacityData(conditionMap);

			JSONObject json = Util.dataListToJson(true, "添加成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
	
	/**
	 * 自编号维护查询
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String queryIsCustomer() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("orgType", request.getParameter("orgType"));
		conditionMap.put("org_id", request.getParameter("org_id"));
		conditionMap.put("orgStr", request.getParameter("orgStr"));
		conditionMap.put("is_customer",request.getParameter("is_customer"));
		
		if (pager != null){
			conditionMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		List list = orgDao.queryIsCustomerList(conditionMap);
		int totalCount=orgDao.queryIsCustomerCount(conditionMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);						
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		JSONObject json = Util.dataListToJson(true, "查询成功", list, page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	/**
	 * 自编号维护编辑
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String updateIsCustomer() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		System.out.println("标记值flag" + flag);
		if (flag != null && flag.equals("view")) {
			System.out.println("直接返回JSP");
			return "index";
		} else {
			System.out.println("返回数据");
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("org_id", request.getParameter("org_id"));
			conditionMap.put("is_customer", request.getParameter("is_customer"));
			
			//conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", userid);
			conditionMap.put("edit_date", curTime);
			
			int result = orgDao.updateIsCustomer(conditionMap);

			JSONObject json = Util.dataListToJson(true, "编辑成功", null);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(json);
			return null;
		}
	}
}
