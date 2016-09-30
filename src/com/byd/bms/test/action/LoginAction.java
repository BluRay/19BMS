package com.byd.bms.test.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.byd.bms.test.dao.ILoginDao;
import com.byd.bms.test.entity.UserInfo;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

/**
 * 测试开发框架
 * @author YangKe 
 * @date 150601
 */
public class LoginAction extends ActionSupport implements ModelDriven<UserInfo> {

	private static final long serialVersionUID = 1L;
	private ILoginDao loginDao;
	private static Logger logger = Logger.getLogger("ScriptMaint");

	private UserInfo user = new UserInfo();

	public ILoginDao getLoginDao() {
		return loginDao;
	}

	public void setLoginDao(ILoginDao loginDao) {
		this.loginDao = loginDao;
	}

	public String execute() {
		System.out.println("userName:" + user.getUsername() + "\n"
				+ "password:" + user.getPassword());
		logger.error("LoginAction：：测试错误日志");
		@SuppressWarnings("rawtypes")
		List list = loginDao.getUser(user.getUsername());
		if (list.size() > 0) {
			return "success";
		} else {
			return "error";
		}

	}

	@Override
	public UserInfo getModel() {
		return user;
	}
	
	public static void main(String[] args) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		System.out.println("---->" + curTime.substring(0, 10).replaceAll("-", ""));
		
		Map map = new HashMap();
	    map.put(1, "aaaa");
	    map.put(1, "bbbb");
	    
	    System.out.println(map.get(1));
	}

}
