package com.byd.bms.util.dao;

import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.byd.bms.util.entity.BmsBaseUser;

public class LoginDaoImpl implements ILoginDao {
	private static SqlSessionFactory sqlSessionFactory;

	public SqlSessionFactory getSqlSessionFactory() {
		return sqlSessionFactory;
	}

	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		this.sqlSessionFactory = sqlSessionFactory;
	}

	@Override
	public List getUser(String userName) {		
		SqlSession session = sqlSessionFactory.openSession();
		ILoginDao loginDao=session.getMapper(ILoginDao.class);
		List list=loginDao.getUser(userName);
		if(list==null){
			list=new ArrayList<BmsBaseUser>();
		}
		session.close();
		return list;
	}

}
