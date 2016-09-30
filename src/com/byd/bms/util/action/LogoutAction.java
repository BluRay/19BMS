package com.byd.bms.util.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.byd.bms.util.entity.BmsBaseUser;

public class LogoutAction extends BaseAction<BmsBaseUser> {

	private static final long serialVersionUID = 6666311284647069806L;

	public String execute() {
		// System.out.println("userName:" + user.getUsername() + "\n"+
		// "password:" + user.getPassword());
		@SuppressWarnings("rawtypes")
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		user=null;
		session.setAttribute("user_name", null);
		session.setAttribute("display_name", null);
		session.setAttribute("user_id", null);
		session.setAttribute("bmsuser", null);
		return SUCCESS;

	}
}
