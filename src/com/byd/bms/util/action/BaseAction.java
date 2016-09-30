package com.byd.bms.util.action;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.byd.bms.util.dao.ILoginDao;
import com.byd.bms.util.dao.LoginDaoImpl;
import com.byd.bms.util.entity.BmsBaseUser;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

public abstract class BaseAction<T> extends ActionSupport implements ModelDriven<T>{
	protected T model;
	protected  BmsBaseUser user=new BmsBaseUser();
	private LoginDaoImpl loginDao;
	public static final String DEFAULT_ENCODE = "utf-8";

	public BaseAction() {  
        try {  
            // 得到model的类型信息  
            ParameterizedType pt = (ParameterizedType) this.getClass().getGenericSuperclass();  
            Class clazz = (Class) pt.getActualTypeArguments()[0];  
  
            // 通过反射生成model的实例  
            model = (T) clazz.newInstance();  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  
    }  
	
    public LoginDaoImpl getLoginDao() {
		return loginDao;
	}

	public void setLoginDao(LoginDaoImpl loginDao) {
		this.loginDao = loginDao;
	}

	public T getModel() {  
        return model;  
    }

	public BmsBaseUser getUser() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session= request.getSession();
		user=(BmsBaseUser) session.getAttribute("bmsuser");
		if(user==null){
			user=new BmsBaseUser();
		}
		if(loginDao==null){
			loginDao=new LoginDaoImpl();
		}
		List list= loginDao.getUser(user.getCard_number());
		if(list.size()>0){
			user=(BmsBaseUser) list.get(0);//实时从数据库获取user信息
		}
		
		return user;
	}

	public void setUser(BmsBaseUser user) {
		
		this.user = user;
	}  
   
}
