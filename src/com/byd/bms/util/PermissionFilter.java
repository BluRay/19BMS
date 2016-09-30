package com.byd.bms.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.WebApplicationContext;

import com.byd.bms.util.dao.IRoleAuthorityDao;
import com.byd.bms.util.entity.BmsBaseUser;

/**
 * 配置filter过滤器，判断用户是否登陆，没有登陆跳转到index.jsp
 * 
 * @author YangKe 150604
 */
public class PermissionFilter implements Filter {
	private ServletContext servletContext;

	public void destroy() {
	}

	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) arg0;
		HttpSession session = request.getSession();
		HttpServletResponse response = (HttpServletResponse) arg1;
		WebApplicationContext context = (WebApplicationContext) servletContext
				.getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
		IRoleAuthorityDao roleAuthorityDao = (IRoleAuthorityDao) context
				.getBean("roleAuthorityDao");

		String currentURL = request.getRequestURI();// 取得根目录所对应的绝对路径:
		//String currentURL = request.getRequestURL().toString();// 取得根目录所对应的绝对路径:

		String targetURL = currentURL.substring(currentURL.indexOf("/", 1),
				currentURL.length()); // 截取到当前文件名用于比较
		//System.out.println(targetURL);
		if(targetURL.indexOf("?",1) > 0){
			targetURL = targetURL.substring(0,targetURL.indexOf("?", 1));
		}
		//System.out.println(targetURL);
		BmsBaseUser user=(BmsBaseUser) session.getAttribute("bmsuser");
		// TODO 判断后台是否登陆，如果没登陆跳转到login.jsp
		if (!"/login.jsp".equals(targetURL)
				&& !"/login.action".equals(targetURL)&&!targetURL.contains("/common")) {// 判断当前页是否是重定向以后的登录页面页面，如果是就不做session的判断，防止出现死循环
			if (session == null || user == null) {// *用户登录以后需手动添加session
				System.out.println("request.getContextPath()="
						+ request.getContextPath());
				response.sendRedirect(request.getContextPath() + "/login.jsp");// 如果session为空表示用户没有登录就重定向到login.jsp页面
				return;
			} else {
				if(currentURL.indexOf("account!")>0){
					chain.doFilter(arg0, arg1);
					return;
				}
				if (!"/".equals(targetURL)&&!"/jsp/index.jsp".equals(targetURL)&&!"/logout.action".equals(targetURL)) {
					int user_id = (int) session.getAttribute("user_id");
					//System.out.println(user_id);
					List<String> authlist = roleAuthorityDao
							.getRoleAuthority(user_id);
					if (authlist == null || authlist.size() == 0) {
						authlist = new ArrayList<String>();
					}
					// 判断user是否拥有该请求的访问权限,没有则跳到无权限的错误提示页面
					String actionName = "";
					/*if(targetURL.indexOf("!",1) > 0){
						actionName = targetURL.substring(0,targetURL.indexOf("!"));						
					}else{
						actionName = targetURL;
					}*/
					actionName = targetURL;
					if (!authlist.contains(actionName)) {
						System.out.println("用户没有权限，跳转到authError.jsp");
						response.sendRedirect(request.getContextPath()
								+ "/authError.jsp");
						return;
					}
					if(user.getPwd_modified()==null || "".equals(user.getPwd_modified())){
						System.out.println("请修改密码！");
						response.sendRedirect(request.getContextPath()
								+ "/account!accountCenter.action?changepwd=1");
						return;
					}
				}
				
				if("/".equals(targetURL)){
					request.getRequestDispatcher("/jsp/index.jsp").forward(arg0, arg1);
					//response.sendRedirect(request.getContextPath()+ "/jsp/index.jsp");// 如果session为空表示用户已登录就重定向到index.jsp页面
					return;
				}
				if("/jsp/index.jsp".equals(targetURL)){
					response.sendRedirect(request.getContextPath());
					return;
				}
				
			}
		} 

		// System.out.println("用户登陆");
		chain.doFilter(arg0, arg1); // 如果登陆直接向下执行
	}

	public void init(FilterConfig filterConfig) throws ServletException {
		servletContext = filterConfig.getServletContext();

	}
}
