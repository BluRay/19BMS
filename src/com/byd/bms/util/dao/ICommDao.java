package com.byd.bms.util.dao;

import java.util.List;
import java.util.Map;

import com.byd.bms.order.entity.BmsOrderConfig;
import com.byd.bms.setting.entity.PartsBean;
import com.byd.bms.util.entity.BmsBaseProcess;
import com.byd.bms.util.entity.BmsKeys;

public interface ICommDao {
	public List<Map<String, String>> getBusType();
	public List<Map<String,String>> getFactorySelect();
	public List<Map<String,String>> getAuthorityFactorySelect(Map<String,Object> map);
	public List<Map<String,String>> getOrderFactorySelect(int orderId);
	public List<Map<String,String>> getBusTypeSelect();
	public List<Map<String,String>> getOrderConfigSelect(Map<String, Object> conditionMap);
	public List<Map<String,String>> getOrderSelect(int busTypeId);
	public List<Map<String,String>> getPartsSelect(String parts);
	public List<Map<String,String>> getWorkshopSelect(String factoryId);
	public List<Map<String,String>> getLineSelect(int workshopId);
	public List<Map<String,String>> getFrequencySelect();
	public List<Map<String,String>> getTestToolsSelect();
	public List<Map<String,String>> getWorkshopSelect_Key();
	public List<BmsKeys> getKeysSelect(String keyCode);
	public List<Map<String,String>> getEcnTypeSelect_Key();
	public List<Map<String,String>> getProcessMonitorSelect(int lineId);
	public List<Map<String,String>> getProcessExceptMonitorSelect(int lineId);
	public List<Map<String,String>> getProcessSelectByWorkshopId(int factoryId);
	public BmsBaseProcess getProcessInfo(int processID);
	public List<Map<String,String>> getPartsSelectByParts(String parts);
	public List<Map<String,String>> getOrderFuzzySelect(Map<String, Object> conditionMap);
	public List<Map<String,String>> getBusNumberFuzzySelect(Map<String, Object> conditionMap);
	public List<Map<String,String>> getWorkgroupSelect(String workshop);
	/*public List<Map<String,String>> getFaultLibSelect(Map<String, Object> conditionMap);*/
	public List<Map<String,String>> getAllReasonType();
	public List<Map<String,String>> getDepartment(int factoryId);
	public List<Map<String,String>> getExceptionDepartmentSelect();

	public List<BmsOrderConfig> getOrderConfigList(Map<String,Object> queryMap);
	
	public List<Map<String,String>> getUserFactory(int userId);//获取用户的所属工厂
	public List<Map<String,String>> getUserInfoByCard(String string);//刷厂牌获取用户信息
	public List<Map<String,String>> getUserInfoByCardNumber(String string);//根据工号获取用户信息
	public List<Map<String,String>> getProcessSelect(Map<String, Object> conditionMap);
	public List<Map<String,String>> getBusNumberByOrder(Map<String, Object> conditionMap);
	public List<Map<String,String>> getIndexOrderList(Map<String, Object> conditionMap);
	public List<Map<String,String>> getIndexExceptionList(Map<String, Object> conditionMap);
	public List<Map<String,String>> getPauseList(Map<String, Object> conditionMap);
	public List<Map<String,String>> getIndexWorkshopProduction(Map<String, Object> conditionMap);
	public List<Map<String,String>> queryIndexDpuData(Map<String, Object> conditionMap);//首页DPU数据查询
	public List<Map<String,String>> queryIndexPassRateData(Map<String, Object> conditionMap);//首页一次校检合格率数据查询
	
	public List<Map> getParts(Map<String,Object> queryMap);
	public List getProductionSearch(Map<String, Object> conditionMap);
	public List getPartsBalance(Map<String, Object> conditionMap);
	public List<Map<String,String>> queryStaffInfo(Map<String, Object> conditionMap);//查询员工信息
	public List<Map<String,String>> queryChildOrgList(String parentOrgId);//根据父节点名称查找下一级组织列表
	
	//add by wuxiao 2016/4/15
	public List<Map<String,String>> queryChildWorkGroupList(Map<String, Object> conditionMap);
	public List<Map<String,String>> queryChildTeamList(Map<String, Object> conditionMap);
	
	public List<Map<String,String>> getJobGradeList(Map<String, Object> conditionMap);//根据岗位分类获取岗位类别列表
	public List<Map<String,String>> getOrgAuthTree(Map<String, Object> conditionMap);//获取权限树
	public List<Map<String,String>> getWorkshopSelectOrg(String factory);//从ORG表获取车间下拉列表
	
	public String getStaffNameByNumber(String staff_number);
	public String getTempoBydate(String date);
	public String getWorkshopAuth(Map<String, Object> conditionMap);
	public List<Map<String,String>> getWorkshopSelectOrgAuth(Map<String, Object> conditionMap);//根据权限从ORG表获取车间下拉列表
	public List<Map<String,String>> getWorkshopSelectAuth(Map<String, Object> conditionMap);//根据权限从workshop表获取车间下拉列表
  	
	public List<Map<String,Object>> queryStaffHoursUnloading(String work_date); 	//查询上上月工时数据进行转存
	public int delStaffHoursUnloading(String work_date);	//转存为excel后删除上上月工时数据
	public List<Map<String,String>> getBusNumberByVin(Map<String, Object> conditionMap);//根据vin码查询BusNumber
	public List<Map<String,String>> getVinList(Map<String, Object> conditionMap);
	public List getRoleAuthorityList(Map<String,Object> cmap);
	public List getBusVehicleType(String busType); //根据车型查询车身型号列表
	/**
	 * added by xjw 16/08/29 获取班组承包单价
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,String>> getWorkgroupPrice(Map<String, Object> conditionMap);
	/**
	 * added by xjw 16/09/07 获取标准工时单价
	 * @param conditionMap
	 * @return
	 */
	public List<Map<String,String>> getBasePrice(Map<String, Object> conditionMap);
	/**
	 * added by xjw 16/10/14
	 * 查询生产首页数据
	 * @param conditionMap
	 * @return
	 */
	public List queryProductionIndexData(Map<String, Object> conditionMap);
	/**
	 * 查询user的权限车间（BMS_BASE_KEY表）
	 * @param map1
	 * @return
	 */
	public List getWorkshopSelectAuth_Key(Map<String, Object> map1);
	/**
	 *	added by xjw 161207
	 *	根据factory,workshop,month查询已经提交或者结算的工资明细
	 * @param conditionMap
	 * @return
	 */
	public List querySubmitSalary(Map<String, Object> conditionMap);
	
}
