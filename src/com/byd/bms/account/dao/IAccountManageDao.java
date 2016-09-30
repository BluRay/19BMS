package com.byd.bms.account.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.util.entity.BmsBaseUser;

public interface IAccountManageDao {
	public int addAccount(BmsBaseUser user);
	public int addDefaultRole(Map<String,Object> conditionMap);
	public BmsBaseUser queryAccountById(int userId);
	public int updateAccount(BmsBaseUser user);
	public List<BmsBaseUser> queryAccountsList(Map<String,Object> conditionMap);
	public int queryAccountsCount(Map<String,Object> conditionMap);
	public List<Map<String,Object>> queryAuthList(int userId);
	public int deleteAuth(int userId);
	public int insertAuth(List<Map<String,Object>> authList);
	public int queryAuthAssign(int userId);
	public int queryAccountExist(Map<String, Object> conditionMap);
}
