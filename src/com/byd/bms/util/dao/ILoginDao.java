package com.byd.bms.util.dao;

import java.util.List;

public interface ILoginDao {
	@SuppressWarnings("rawtypes")
	public List getUser(String userName);
}
