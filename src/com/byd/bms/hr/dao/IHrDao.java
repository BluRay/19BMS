package com.byd.bms.hr.dao;

import java.util.List;
import java.util.Map;

public interface IHrDao {
	
	/**
	 * 获取标准班组树
	 * @return
	 */
	public List<Map<String,Object>> getStandardWorkGroupTree(); 
	
	/**
	 * 根据ID获取所有标准班组或标准小班组清单
	 * @return
	 */
	public List<Map<String,Object>> getStandardWorkGroupList(Map<String, Object> map); 
	
	/**
	 * 根据条件集合获取所有标准班组或标准小班组清单
	 * @return
	 */
	public List<Map<String,Object>> queryStandardWorkGroupList(List<Map<String, Object>> list); 
	
	/**
	 * 根据ID获取所有标准班组或标准小班组清单
	 * @return
	 */
	public List<Map<String,Object>> checkStandardWorkGroupUsed(Map<String, Object> map); 
	
	/**
	 * 根据ID获取所有标准班组或标准小班组清单
	 * @return
	 */
	public int deleteStandardWorkGroup(Map<String, Object> map); 
	
	/**
	 * 新增标准班组
	 * @return
	 */
	public int addStandardWorkGroup(List<Map<String, Object>> list); 
	
	
	/**
	 * 更新组织结构标准班组名称
	 * @param conditionMap
	 * @return
	 */
	public int updateWorkGroupOrgName(List<Map<String, Object>> list);
	
	public String getOrgIdByOrgName(String orgName);
	
	/**
	 * 修改标准班组
	 * @return
	 */
	public int updateStandardWorkGroup(List<Map<String, Object>> list);
	
	/**
	 * <!-- 根据车型、月份、班组org_id查询标准工时和单价 -->
	 * @return
	 */
	public List<Map<String,Object>> getStandardTimeAndPriceList(Map<String, Object> map); 
	/**
	 * <!-- 根据车型、月份、班组org_id查询单价 -->
	 * @return
	 */
	public List<Map<String,Object>> queryStandardPriceList(Map<String, Object> map); 
	public int queryStandardPriceTotalCount(Map<String, Object> map);
	/**
	 * 新增标准工时/单价
	 * @return
	 */
	public int addStandardTimeAndPrice(List<Map<String, Object>> list); 
	
	/**
	 * 修改标准工时/单价
	 * @return
	 */
	public int updateStandardTimeAndPrice(List<Map<String, Object>> list);
	
	/**
	 * 根据工厂、车间、班组、小班组、车型、月份查询标准工时和单价
	 * @param map
	 * @return
	 */
	public Map<String,Object> getStandardTimeAndPrice(Map<String, Object> map);
	
	/**
	 * 查询员工信息
	 * @return
	 */
	public List<Map<String,Object>> getStaffList(Map<String, Object> conditionMap);
	
	public int getStaffTotalCount(Map<String, Object> conditionMap);
	
	public List<Map<String,Object>> queryStaffSkillParameterList(Map<String, Object> conditionMap);
	public int queryStaffSkillParameterTotalCount(Map<String, Object> conditionMap);
	
	public List<String> getStaffListByStaffNumbers(Map<String, Object> conditionMap);
	
	public int insertStaffs(List<Map<String, Object>> conditionMap);
	public int updateStaffs(List<Map<String, Object>> conditionMap);
	public int insertSkillParameter(List<Map<String, Object>> conditionMap);
	public int delAttendance(Map<String,Object> conditionMap);				//删除考勤数据
	public int insertAttendance(List<Map<String, Object>> conditionMap);	//增加考勤数据
	public List<Map<String,String>> getAttendanceInfo(Map<String, Object> conditionMap);	//查询考勤数据
	
	public List<Map<String,Object>> getAttendanceList(Map<String, Object> conditionMap);	//查询考勤数据
	public int getAttendanceTotalCount(Map<String, Object> conditionMap);					//查询考勤数据数量
	public List<Map<String,Object>> checkStaff(Map<String, Object> conditionMap);  //校验考勤员工信息
	
	public int delRewards(Map<String,Object> conditionMap);					//删除奖惩数据
	public int delRewardsByID(Map<String,Object> conditionMap);
	public int insertRewards(List<Map<String, Object>> conditionMap);		//增加奖惩数据
	public List<Map<String,Object>> getRewardsList(Map<String, Object> conditionMap);	//查询奖惩数据
	public int getRewardsTotalCount(Map<String, Object> conditionMap);					//查询奖惩数据数量
	public List<Map<String,Object>> getRewardsCollectList(Map<String, Object> conditionMap);	//查询奖惩汇总数据
	public int getRewardsCollectTotalCount(Map<String, Object> conditionMap);					//查询奖惩汇总数据数量
	
	public List<Map<String,Object>> getWorkTimePriceList(Map<String, Object> conditionMap);
	public int getWorkTimePriceListTotalCount(Map<String, Object> conditionMap);
	public int addWorkTimePrice(Map<String, Object> conditionMap);
	public int editWorkTimePrice(Map<String, Object> conditionMap);
	public int delWorkTimePrice(String price_id);
	
	public List<Map<String,String>> getWorkHourReportList(Map<String, Object> conditionMap);
	public int getWorkHourReportListCount(Map<String, Object> conditionMap);
	
	public List<Map<String,String>> getPieceTimeReportList(Map<String, Object> conditionMap);
	public List<String> getPieceTimeReportBusList(Map<String, Object> conditionMap);
	public int getPieceTimeReportListCount(Map<String, Object> conditionMap);
	public int getPieceTimeReportBusListCount(Map<String, Object> conditionMap);
	public List<Map<String,String>> getPieceTimeReportList2(Map<String, Object> conditionMap);
	public List<String> getPieceTimeReportStaffList(Map<String, Object> conditionMap);
	public int getPieceTimeReportListCount2(Map<String, Object> conditionMap);
	public int getPieceTimeReportStaffListCount(Map<String, Object> conditionMap);
	
	public List<Map<String,String>> getWaitManHourList(Map<String, Object> conditionMap);
	/**
	 * 查询计件工资列表
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,Object>> queryPieceSalary(Map<String, Object> conditionMap);
	/**
	 * 查询计件工资列表记录数
	 * @param conditionMap
	 * @return
	 */
	public int queryPieceSalaryCount(Map<String, Object> conditionMap);
	/**
	 * 查询计件历史工资列表
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,Object>> queryPieceSalaryHistory(Map<String, Object> conditionMap);
	/**
	 * 查询计件历史工资列表记录数
	 * @param conditionMap
	 * @return
	 */
	public int queryPieceSalaryHistoryCount(Map<String, Object> conditionMap);
	/**
	 * 查询某工厂某车间某月是否已结算工资，已结算不能再提交
	 * @param conditionMap
	 * @return
	 */
	public int queryBalanceSalaryCount(Map<String, Object> conditionMap);
	/**
	 * 删除计件历史工资
	 * @param conditionMap
	 * @return
	 */
	public int deletePieceSalaryHistory(Map<String, Object> conditionMap);
	/**
	 * 保存计件历史工资
	 * @param list
	 * @return
	 */
	public int savePieceSalaryHistory(List<Map<String,Object>> list);
	/**
	 * 更新计件历史工资表
	 * @param conditionMap
	 * @return
	 */
	public int updatePieceSalaryHistory(Map<String,Object> conditionMap);
	/**
	 * 根据查询条件查询出符合条件的员工的staff number 列表
	 * @param conditionMap
	 * @return
	 */
	public List<String> querySalaryStaffList(Map<String,Object> conditionMap);
	/**
	 * 技改工时统计数据工单维度
	 * @return
	 */
	public List<Map<String,Object>> getEcnReportData(Map<String, Object> conditionMap);
	
	/**
	 * 技改工时统计数据人员维度
	 * @return
	 */
	public List<Map<String,Object>> getEcnReportData1(Map<String, Object> conditionMap);
	
	/**
	 * 员工姓名、工号模糊查询、弹出下拉列表
	 * @return
	 */
	public List<Map<String,Object>> getStaffInfoFuzzySelect(Map<String, Object> conditionMap);

	/**
	 * 额外工时统计数据工单维度
	 * @return
	 */
	public List<Map<String,Object>> getTmpReportData(Map<String, Object> conditionMap);
	
	/**
	 * 额外工时统计数据人员维度
	 * @return
	 */
	public List<Map<String,Object>> getTmpReportData1(Map<String, Object> conditionMap);
	
	/**
	 * 工时状态更改
	 * @param conditionMap
	 * @return
	 */
	public int updateWorkHourStatus(Map<String, Object> conditionMap);
	/**
	 * 奖惩表状态更改
	 * @param conditionMap
	 * @return
	 */
	public int updateRewordsStatus(Map<String, Object> conditionMap);
	/**
	 * 考勤表状态更改
	 * @param conditionMap
	 * @return
	 */
	public int updateAttendanceStatus(Map<String, Object> conditionMap);
	/**
	 * 删除员工分配比例数据
	 * @param conditionMap
	 * @return
	 */
	public int deleteStaffDistribution(Map<String,Object> conditionMap);
	/**
	 * 员工分配比例保存
	 * @param datalist
	 * @return
	 */	
	public int saveStaffDistribution(List<Map<String, Object>> datalist);
	/**
	 * 查询员工分配比例列表
	 * @param cMap
	 * @return
	 */
	public List getStaffDistribution(Map<String, Object> cMap);
	/**
	 * 查询员工分配比例记录数
	 * @param conditionMap
	 * @return
	 */
	public int getStaffDistributionCount(Map<String, Object> conditionMap);
	
	/**
	 * added by xjw 16/08/24
	 * 根据工厂、车间、班组、小班组、订单 查询 班组承包单价信息
	 * @param map
	 * @return
	 */
	public Map<String,Object> queryWorkgroupPrice(Map<String, Object> map);
	/**
	 * added by xjw 16/08/24
	 * 批量插入班组承包单价信息
	 * @param addList
	 * @return
	 */
	public int addWorkgroupPrice(List<Map<String, Object>> addList);
	/**
	 * added by xjw 16/08/24	
	 * 批量更新班组承包单价信息
	 * @param upDateList
	 * @return
	 */
	public int updateWorkgroupPrice(List<Map<String, Object>> upDateList);
	/**
	 * added by xjw 16/08/24	
	 * 根据条件查询班组承包单价信息列表
	 * @param cMap
	 * @return
	 */
	public List getWorkgroupPriceList(Map<String, Object> cMap);
	/**
	 * added by xjw 16/08/24	
	 * 根据条件查询班组承包单价信息数
	 * @param cMap
	 * @return
	 */
	public int getWorkgroupPriceCount(Map<String, Object> cMap1);  
	
	/**
	 * 校验工号、姓名是否匹配
	 * @param cMap
	 * @return
	 */
	public int checkIsValidStaff(Map<String, Object> cMap);
	
	/**
	 * 根据工厂、车间、班组、小班组、订单查询班组承包单价
	 * @param pmap
	 * @return
	 */
	public Double getWorkgroupPrice(Map<String, Object> pmap);
	
}
