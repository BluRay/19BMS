package com.byd.bms.util.action;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.util.MD5Util;
import com.byd.bms.util.dao.LoginDaoImpl;
import com.byd.bms.util.entity.BmsBaseUser;

public class LoginAction extends BaseAction<BmsBaseUser>{
	private static final long serialVersionUID = 1L;
	private LoginDaoImpl loginDao;
	@SuppressWarnings("unused")
	private static Logger logger = Logger.getLogger("ScriptMaint");
	//private BmsBaseUser user=new BmsBaseUser();	

	public String execute() {
		//System.out.println("userName:" + user.getUsername() + "\n"+ "password:" + user.getPassword());
		@SuppressWarnings("rawtypes")
		List list = loginDao.getUser(user.getUsername());
		String password=StringUtils.isEmpty(user.getPassword())?"":user.getPassword();
		//String encryptedPwd;
		try {
			//encryptedPwd = MD5Util.getEncryptedPwd(password);
			HttpServletRequest  request=ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();  
			String last_url=request.getParameter("last_url");
			HttpSession session= request.getSession();
			if (list.size() > 0) {
				user=(BmsBaseUser) list.get(0);
				if(MD5Util.validPassword(password, user.getPassword())){
					session.setAttribute("user_name", user.getUsername());
					session.setAttribute("display_name", user.getDisplay_name());
					session.setAttribute("user_id", user.getId());
					session.setAttribute("factory", user.getFactory());
					session.setAttribute("bmsuser", user);
					if(last_url!=""&&last_url!=null){
						response.sendRedirect(last_url);
						//request.getRequestDispatcher(last_url).forward(request,response);
						return null;
					}else
					return SUCCESS;
				}else{
					return ERROR;
				}
				
			} else {
				return ERROR;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ERROR;
		} 
		

	}

	public LoginDaoImpl getLoginDao() {
		return loginDao;
	}

	public void setLoginDao(LoginDaoImpl loginDao) {
		this.loginDao = loginDao;
	}

	@Override
	public BmsBaseUser getModel() {
		return user;
	}

}
