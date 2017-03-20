package com.byd.bms.util;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class TestUtil {

	public static void main(String[] args) {
		String JDriver="com.microsoft.sqlserver.jdbc.SQLServerDriver";//SQL数据库引擎
		String connectDB="jdbc:sqlserver://10.3.12.134;DatabaseName=HGZ_DATABASE";//数据源
		try
		{
		Class.forName(JDriver);//加载数据库引擎，返回给定字符串名的类
		}catch(ClassNotFoundException e)
		{
		//e.printStackTrace();
		System.out.println("加载数据库引擎失败");
		System.exit(0);
		}     
		System.out.println("数据库驱动成功");
		String user="TEST";
		String password="byd123456";
		try{
		Connection con=DriverManager.getConnection(connectDB,user,password);//连接数据库对象
		System.out.println("连接数据库成功");
		Statement stmt=con.createStatement();//创建SQL命令对象
		ResultSet rs=stmt.executeQuery("SELECT * FROM PRINT_TABLE WHERE VIN='LC06S24R4F1001363'");
		while(rs.next()){
			System.out.println(rs.getString("NOTE"));
		}
		
		}catch(SQLException e){
			e.printStackTrace();
			System.out.println("数据库连接错误");
		}	
	}

}
