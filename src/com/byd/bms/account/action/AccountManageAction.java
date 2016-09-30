package com.byd.bms.account.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.byd.bms.account.dao.IAccountManageDao;
import com.byd.bms.util.MD5Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class AccountManageAction extends BaseAction<Object> {

	private static final long serialVersionUID = 1260394922136963215L;

	private IAccountManageDao accountDao;
	private Map<String, Object> result;
	private String conditions;
	private Pager pager;
	private BmsBaseUser account = new BmsBaseUser();
	private String authList;

	public IAccountManageDao getAccountDao() {
		return accountDao;
	}

	public void setAccountDao(IAccountManageDao accountDao) {
		this.accountDao = accountDao;
	}

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}

	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public BmsBaseUser getAccount() {
		return account;
	}

	public void setAccount(BmsBaseUser account) {
		this.account = account;
	}

	public String getAuthList() {
		return authList;
	}

	public void setAuthList(String authList) {
		this.authList = authList;
	}

	/**
	 * 账号管理页面
	 * 
	 * @return
	 */
	public String accountCenter() {
		return "accountCenter";
	}

	/**
	 * 查询用户列表
	 * 
	 * @return
	 */
	public String getAccountsList() {
		result = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		conditionMap.put("offset",
				(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", accountDao.queryAccountsList(conditionMap));
		int totalCount = accountDao.queryAccountsCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}

	/**
	 * 新增用户
	 * 
	 * @return
	 */
	public String addAccount() {
		result = new HashMap<String, Object>();
		String encryptedPwd;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("cardNumber", account.getCard_number());
		
		try {
			int count=accountDao.queryAccountExist(conditionMap);
			if(count>0){
				result.put("success", false);
				result.put("message", "该工号/账号已存在！");
			}else{
				account.setPassword(account.getCard_number());
				encryptedPwd = MD5Util.getEncryptedPwd(account.getPassword());
				account.setPassword(encryptedPwd);
				int i = accountDao.addAccount(account);
				if (i > 0) {
					int userId=account.getId();
					int roleId=34;//用户个人信息维护
					Map<String, Object> cmap = new HashMap<String, Object>();
					cmap.put("userId", userId);
					cmap.put("roleId", roleId);
					accountDao.addDefaultRole(cmap);
					result.put("success", true);
					result.put("message", "新增成功");
				} else {
					result.put("success", false);
					result.put("message", "新增失败");
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "新增失败");
		}
		account = new BmsBaseUser();
		return SUCCESS;
	}

	/**
	 * 更新用户信息
	 * 
	 * @return
	 */
	public String updateAccount() {
		result = new HashMap<String, Object>();

		int i = accountDao.updateAccount(account);
		if (i > 0) {
			result.put("success", true);
			result.put("message", "操作成功");
		} else {
			result.put("success", false);
			result.put("message", "操作失败");
		}
		account = new BmsBaseUser();
		return SUCCESS;

	}

	/**
	 * 个人信息修改
	 */
	public String updateSelfAccount() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		result = new HashMap<String, Object>();
		try {
			if (account.getPassword() != null) {
				account.setPassword(MD5Util.getEncryptedPwd(account
						.getPassword()));
				account.setPwd_modified(sdf.format(new Date()));
			}
			user.setEmail(account.getEmail());
			user.setCellphone(account.getCellphone());
			user.setTelephone(account.getTelephone());
			user.setPassword(account.getPassword());
			user.setPwd_modified(account.getPwd_modified());
			user.setFactory_id(account.getFactory_id());
			user.setDepartment_id(account.getDepartment_id());
			user.setId(account.getId());
			int i = accountDao.updateAccount(user);
			user = accountDao.queryAccountById(account.getId());
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			session.setAttribute("bmsuser", user);
			if (i > 0) {
				result.put("success", true);
				result.put("message", "操作成功");
			} else {
				result.put("success", false);
				result.put("message", "操作失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "操作失败");
		}

		account = new BmsBaseUser();
		return SUCCESS;
	}

	/**
	 * 初始化密码为工号
	 * 
	 * @return
	 */
	public String resetPassword() {
		result = new HashMap<String, Object>();
		String encryptedPwd;
		account = accountDao.queryAccountById(account.getId());
		try {
			encryptedPwd = MD5Util.getEncryptedPwd(account.getCard_number());// 初始化密码为工号
			account.setPassword(encryptedPwd);
			int i = accountDao.updateAccount(account);
			if (i > 0) {
				result.put("success", true);
				result.put("message", "初始化密码成功");
			} else {
				result.put("success", false);
				result.put("message", "初始化密码失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "初始化密码失败");
		}
		account = new BmsBaseUser();
		return SUCCESS;
	}
	
	public String getAuthListByUserId(){
		result = new HashMap<String, Object>();
		/*JSONObject jo = JSONObject.fromObject(conditions);
		int userId=jo.getInt("userId");*/
		result.put("dataList", accountDao.queryAuthList(account.getId()));
		return SUCCESS;
	}
	
	 @SuppressWarnings("unchecked")
	public String assignAuth(){
		result = new HashMap<String, Object>();
		int d=0;
		if(accountDao.queryAuthAssign(account.getId())>0){
			d=accountDao.deleteAuth(account.getId());
		}else{
			d=1;//未分配权限，不需要删除之前的权限数据
		}
		
		if(d>0){
			JSONArray jsonArray=JSONArray.fromObject(authList);
			List<Map<String,Object>> auth_list=new ArrayList<Map<String,Object>>();
			for(int i=0;i<jsonArray.size();i++){
				 JSONObject object = (JSONObject)jsonArray.get(i);
				
				Map<String, Object> map = (Map<String, Object>) object;
				 auth_list.add(map);
			}
			int i=accountDao.insertAuth(auth_list);
			if(i>0){
				result.put("success", true);
				result.put("message", "权限编辑成功");
			}else{
				result.put("success", false);
				result.put("message", "权限编辑失败");
			}
		}else{
			result.put("success", false);
			result.put("message", "权限编辑失败");
		}
		return SUCCESS;
	}
}
