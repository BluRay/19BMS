package com.byd.bms.email.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.aftersale.entity.AfterSalesProblems;
import com.byd.bms.aftersale.entity.ImproveSalesProblems;

/**
 * 邮件数据访问接口
 */
public interface IEmailDao {
	public List<Map<String,Object>> getEmailTemplet(Map<String,Object> conditionMap);
}
