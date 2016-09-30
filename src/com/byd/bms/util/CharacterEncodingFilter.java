package com.byd.bms.util;

import java.io.IOException;    
import javax.servlet.Filter;    
import javax.servlet.FilterChain;    
import javax.servlet.FilterConfig;    
import javax.servlet.ServletException;    
import javax.servlet.ServletRequest;    
import javax.servlet.ServletResponse;    
    
public class CharacterEncodingFilter implements Filter {    
    
    protected FilterConfig filterConfig = null;         
    protected String encoding = "";    
    
    public void destroy() {    
        filterConfig = null;    
        encoding = null;    
    }    
    
    public void doFilter(ServletRequest request, ServletResponse response,    
            FilterChain filterChain) throws IOException, ServletException {    
        if (encoding != null) {   
            //设置request和response的编程格式，注意两个都要设，若没设response的  
            //charset，则在输出页面会显示乱码。  
            request.setCharacterEncoding(this.encoding);   
            response.setContentType("text/html;charset=utf-8");  
        }    
        //继续执行下一个过滤器  
        filterChain.doFilter(request, response);    
    }    
    
    public void init(FilterConfig filterConfig) throws ServletException {    
        this.filterConfig = filterConfig;    
       this.encoding = filterConfig.getInitParameter("encoding");    
         
    }    
}   
