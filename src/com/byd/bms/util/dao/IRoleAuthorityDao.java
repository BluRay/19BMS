package com.byd.bms.util.dao;

import java.util.List;

public interface IRoleAuthorityDao {
	@SuppressWarnings("rawtypes")
	public List getRoleAuthority(int userId);
}
