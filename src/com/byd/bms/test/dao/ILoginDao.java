package com.byd.bms.test.dao;

import java.util.List;

public interface ILoginDao {
	@SuppressWarnings("rawtypes")
	public List getUser(String userName);
}
