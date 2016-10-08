package com.byd.bms.util.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.xwork.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.entity.PartsBean;
import com.byd.bms.util.Util;
import com.byd.bms.util.dao.ICommDao;
import com.byd.bms.util.entity.BmsBaseProcess;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.erpit.tools.email.EmailSender;
import com.byd.erpit.tools.email.MailSenderServiceImp1;
import com.byd.erpit.tools.email.EmailSender.TableTable;
import com.byd.erpit.tools.email.EmailSender.TableTable.TdTd;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class CommonAction extends BaseAction<Object> {

	private static final long serialVersionUID = 1L;
	private ICommDao commDao;
	private IBaseDataDao baseDataDao;
	@SuppressWarnings("rawtypes")
	private List selectList;
	private Map<String, Object> conditionMap;
	private String factoryId;

	public IBaseDataDao getBaseDataDao() {
		return baseDataDao;
	}

	public void setBaseDataDao(IBaseDataDao baseDataDao) {
		this.baseDataDao = baseDataDao;
	}

	public ICommDao getCommDao() {
		return commDao;
	}

	public void setCommDao(ICommDao commDao) {
		this.commDao = commDao;
	}

	public String getFactoryId() {
		return factoryId;
	}

	public void setFactoryId(String factoryId) {
		this.factoryId = factoryId;
	}

	@SuppressWarnings("rawtypes")
	public List getSelectList() {
		return selectList;
	}

	@SuppressWarnings("rawtypes")
	public void setSelectList(List selectList) {
		this.selectList = selectList;
	}

	public Map<String, Object> getConditionMap() {
		return conditionMap;
	}

	public void setConditionMap(Map<String, Object> conditionMap) {
		this.conditionMap = conditionMap;
	}

	public String getExceptionDepartmentSelect() {
		// HttpServletRequest request = ServletActionContext.getRequest();
		// int
		// factoryId=StringUtils.isEmpty(request.getParameter("factoryId"))?0:Integer.parseInt(request.getParameter("factoryId"));

		HttpServletResponse response = ServletActionContext.getResponse();
		PrintWriter out = null;
		List<Map<String, String>> list = commDao.getExceptionDepartmentSelect();
		JSONObject json = Util.dataListToJson(true, "查询成功", list);
		response.setCharacterEncoding("UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	public String getDepartmentSelect() {
		HttpServletRequest request = ServletActionContext.getRequest();
		int factoryId = StringUtils.isEmpty(request.getParameter("factoryId")) ? 0
				: Integer.parseInt(request.getParameter("factoryId"));

		HttpServletResponse response = ServletActionContext.getResponse();
		PrintWriter out = null;
		List<Map<String, String>> list = commDao.getDepartment(factoryId);
		JSONObject json = Util.dataListToJson(true, "查询成功", list);
		response.setCharacterEncoding("UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	public String getReasonTypeSelect() {
		HttpServletResponse response = ServletActionContext.getResponse();
		PrintWriter out = null;
		List<Map<String, String>> list = commDao.getAllReasonType();
		JSONObject json = Util.dataListToJson(true, "查询成功", list);
		response.setCharacterEncoding("UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * AddBy:YangKe 150609 获取车型列表
	 */
	public String getBusType() {
		// System.out.println("---->getBusType");
		HttpServletResponse response = ServletActionContext.getResponse();
		PrintWriter out = null;
		List<Map<String, String>> list = commDao.getBusType();

		/*
		 * //TODO 测试数据 Map<String, String> data_map1 = new HashMap<String,
		 * String>(); data_map1.put("TYPE_ID", "1"); data_map1.put("TYPE_NAME",
		 * "K8"); Map<String, String> data_map2 = new HashMap<String, String>();
		 * data_map2.put("TYPE_ID", "2"); data_map2.put("TYPE_NAME", "K9");
		 * 
		 * List<Map<String, String>> list = new ArrayList<Map<String,
		 * String>>(); list.add(data_map1); list.add(data_map2);
		 */

		JSONObject json = Util.dataListToJson(true, "查询成功", list);
		response.setCharacterEncoding("UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * added by xjw for 工厂下拉列表
	 * 
	 * @return
	 */
	public String getFactorySelect() {
		selectList = commDao.getFactorySelect();
		return SUCCESS;
	}

	public String getAuthorityFactorySelect() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String url = request.getParameter("url");
		int user_id = getUser().getId();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user_id", user_id);
		map.put("url", url);
		selectList = commDao.getAuthorityFactorySelect(map);
		return SUCCESS;
	}

	/**
	 * for 订单生产工厂下拉列表
	 * 
	 * @return
	 */
	public String getOrderFactorySelect() {
		HttpServletRequest request = ServletActionContext.getRequest();
		int orderId = Integer.parseInt(request.getParameter("orderId"));
		selectList = commDao.getOrderFactorySelect(orderId);
		return SUCCESS;
	}

	/**
	 * added by xjw for 车型下拉列表
	 * 
	 * @return
	 */
	public String getBusTypeSelect() {
		selectList = commDao.getBusTypeSelect();

		return SUCCESS;
	}

	/**
	 * added by xjw for 订单配置下拉列表
	 * 
	 * @return
	 */
	public String getOrderConfigSelect() {
		String[] orderNoList = (String[]) conditionMap.get("orderNo");
		String orderNo = orderNoList != null ? orderNoList[0] : "";
		conditionMap.put("orderNo", orderNo);
		selectList = commDao.getOrderConfigSelect(conditionMap);

		return SUCCESS;
	}

	/**
	 * added by xjw for 订单下拉列表
	 * 
	 * @return
	 */
	public String getOrderSelect() {
		String[] busTypeIds = (String[]) conditionMap.get("busTypeId");
		selectList = commDao.getOrderSelect(Integer.parseInt(busTypeIds[0]));

		return SUCCESS;
	}

	/**
	 * added by xjw for 根据订单编号输入值模糊查询订单下拉列表
	 * 
	 * @return
	 */
	public String getOrderFuzzySelect() {
		String[] orderNoList = (String[]) conditionMap.get("orderNo");
		String[] busTypeList = (String[]) conditionMap.get("busType");
		String[] factoryList=(String[]) conditionMap.get("factory");
		String orderNo = orderNoList == null ? "" : orderNoList[0];
		String busType = busTypeList == null ? "" : busTypeList[0];
		String factory=factoryList==null?"":factoryList[0];
		conditionMap.put("orderNo", orderNo);
		conditionMap.put("busType", busType);
		conditionMap.put("factory",factory);
		selectList = commDao.getOrderFuzzySelect(conditionMap);

		return SUCCESS;
	}

	/**
	 * added by xjw for 零部件下拉列表
	 * 
	 * @return
	 */
	public String getPartsSelect() {
		String[] partslist = (String[]) conditionMap.get("parts");
		selectList = commDao.getPartsSelect(partslist[0]);

		return SUCCESS;
	}

	/**
	 * added by xjw for 获取零部件下拉列表by零部件输入值
	 * 
	 * @return
	 */
	public String getPartsSelectByParts() {
		String[] partslist = (String[]) conditionMap.get("parts");
		selectList = commDao.getPartsSelectByParts(partslist[0]);

		return SUCCESS;
	}

	/**
	 * added by xjw for 检测频率
	 */
	public String getFrequencySelect() {
		selectList = commDao.getFrequencySelect();

		return SUCCESS;
	}

	/**
	 * 
	 */
	public String getTestToolsSelect() {
		selectList = commDao.getTestToolsSelect();

		return SUCCESS;
	}

	/**
	 * added by thw for 车间下拉列表
	 * 
	 * @return
	 */
	public String getWorkshopSelect() {
		HttpServletRequest request = ServletActionContext.getRequest();
		/*int factoryId = StringUtils.isEmpty(request.getParameter("factoryId")) ? 0
				: Integer.parseInt(request.getParameter("factoryId"));*/
		String factoryId=StringUtils.isEmpty(request.getParameter("factoryId"))?"":request.getParameter("factoryId");
		selectList = commDao.getWorkshopSelect(factoryId);

		return SUCCESS;
	}

	/**
	 * added by thw for 车间下拉列表
	 * 
	 * @return
	 */
	public String getLineSelect() {
		HttpServletRequest request = ServletActionContext.getRequest();
		selectList = commDao.getLineSelect(Integer.parseInt(request
				.getParameter("workshopId")));

		return SUCCESS;
	}

	/**
	 * added by Yangke for 监控点下拉列表
	 * 
	 * @return
	 */
	public String getProcessMonitorSelect() {
		HttpServletRequest request = ServletActionContext.getRequest();
		selectList = commDao.getProcessMonitorSelect(Integer.parseInt(request
				.getParameter("lineId")));

		return SUCCESS;
	}

	public String getProcessExceptMonitorSelect() {
		HttpServletRequest request = ServletActionContext.getRequest();
		selectList = commDao.getProcessExceptMonitorSelect(Integer
				.parseInt(request.getParameter("lineId")));

		return SUCCESS;
	}

	public String getProcessSelectByWorkshopId() {
		HttpServletRequest request = ServletActionContext.getRequest();
		selectList = commDao.getProcessSelectByWorkshopId(Integer
				.parseInt(request.getParameter("workshopId")));
		return SUCCESS;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getFactoryInfoByUserId() {
		int userId = getUser().getId();
		List factoryInfo = new ArrayList();
		factoryInfo = commDao.getUserFactory(userId);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", factoryInfo, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * added by Yangke for 监控点下拉列表
	 * 
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getProcessInfo() {
		HttpServletRequest request = ServletActionContext.getRequest();
		BmsBaseProcess basProcess = new BmsBaseProcess();
		basProcess = commDao.getProcessInfo(Integer.parseInt(request
				.getParameter("processID")));
		List datalist = new ArrayList();
		datalist.add(0, basProcess);

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * added by xjw for 车间下拉列表 弹性键表中查询
	 * 
	 * @return
	 */
	public String getWorkshopSelect_Key() {
		selectList = commDao.getWorkshopSelect_Key();
		return SUCCESS;
	}

	/**
	 * added by thw for 根据弹性键代码获取弹性键列表
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String getKeysSelect() {
		HttpServletRequest request = ServletActionContext.getRequest();
		selectList = commDao.getKeysSelect(request.getParameter("keyCode")
				.toString());
		HttpServletResponse response = ServletActionContext.getResponse();
		PrintWriter out = null;

		JSONObject json = Util.dataListToJson(true, "查询成功", selectList);
		System.out.println("弹性键：" + json);
		response.setCharacterEncoding("UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);

		return null;
	}

	/**
	 * added by dll for 技改类型
	 */
	public String getEcnTypeSelect_Key() {
		selectList = commDao.getEcnTypeSelect_Key();
		return SUCCESS;
	}

	/**
	 * added by xjw for 根据车间查询责任班组列表
	 */
	public String getWorkgroupSelect() {
		String[] workshopList = (String[]) conditionMap.get("workshop");
		selectList = commDao.getWorkgroupSelect(workshopList[0]);

		return SUCCESS;
	}

	/**
	 * added by xjw for 根据工厂查询ORG表车间列表
	 */
	public String getWorkshopSelectOrg() {
		String[] factoryList = (String[]) conditionMap.get("factory");
		selectList = commDao.getWorkshopSelectOrg(factoryList[0]);

		return SUCCESS;
	}

	/**
	 * added by xjw for 根据工厂和权限查询ORG表车间列表
	 */
	public String getWorkshopSelectOrgAuth() {
		int userid = getUser().getId();

		HttpServletRequest request = ServletActionContext.getRequest();
		String factory = request.getParameter("factory");
		String url = request.getParameter("url");
		Map<String, Object> map1 = new HashMap<String, Object>();
		map1.put("userId", userid);
		map1.put("url", url);
		String workshopLimit = commDao.getWorkshopAuth(map1);
		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("factory", factory);
		map2.put("workshopLimit", workshopLimit);
		selectList = commDao.getWorkshopSelectOrgAuth(map2);

		return SUCCESS;
	}

	public String getTempoBydate() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		String tempo_date = request.getParameter("tempo_date");
		String tempo;
		tempo = commDao.getTempoBydate(tempo_date);
		if (tempo == null) {
			tempo = "1";
		}
		JSONObject json = Util.dataListToJson(true, tempo, null, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	public String getStaffNameByNumber() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;

		String staff_number = request.getParameter("staff_number");
		String staff_name = "";
		staff_name = commDao.getStaffNameByNumber(staff_number);

		JSONObject json = Util.dataListToJson(true, staff_name, null, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * added by xjw for 根据厂牌id查询用户信息
	 */
	public String getUserInfoByCard() {
		String[] workshopList = (String[]) conditionMap.get("cardId");
		selectList = commDao.getUserInfoByCard(workshopList[0]);

		return SUCCESS;
	}

	/**
	 * added by xjw for 根据工号查询用户信息
	 */
	public String getUserInfoByCardNumber() {
		String[] workshopList = (String[]) conditionMap.get("cardNumber");
		selectList = commDao.getUserInfoByCardNumber(workshopList[0]);

		return SUCCESS;
	}

	/**
	 * added by xjw for 根据车间模糊查询工序列表
	 */
	public String getProcessSelect() {
		String[] workshop = (String[]) conditionMap.get("workshop");
		String[] processName = (String[]) conditionMap.get("processName");
		conditionMap.put("workshop", workshop[0]);
		conditionMap.put("processName", processName[0]);
		selectList = commDao.getProcessSelect(conditionMap);

		return SUCCESS;
	}

	/*
	 * 根据订单获取车号信息
	 */
	public String getOrderBusNumber() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> map = new HashMap<String, Object>();

		// 获取参数
		int order_id = Integer.parseInt(request.getParameter("order_id"));
		map.put("order_id", order_id);
		String bus_num_start = request.getParameter("bus_num_start");
		if (bus_num_start != null && bus_num_start.trim() != "") {
			bus_num_start = StringUtils.leftPad(bus_num_start, 4, "0");
			map.put("bus_num_start", bus_num_start);
		}
		String bus_num_end = request.getParameter("bus_num_end");
		if (bus_num_end != null && bus_num_end.trim() != "") {
			bus_num_end = StringUtils.leftPad(bus_num_end, 4, "0");
			map.put("bus_num_end", bus_num_end);
		}
		List datalist = new ArrayList();
		datalist = commDao.getBusNumberByOrder(map);

		JSONObject json = Util.dataListToJson(true, "查询成功", datalist, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 查询首页显示信息
	 * 
	 * @return
	 */
	public String getIndexOrderInfo() {
		HttpServletRequest request = ServletActionContext.getRequest();
		PrintWriter out = null;
		JSONObject resultJson = null;
		try {
			request.setCharacterEncoding("UTF-8");
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			BmsBaseUser user = getUser();
			String factoryId = "";
			// factoryId=this.factoryId.equals("")?String.valueOf(user.getFactory_id()):this.factoryId;
			if (this.factoryId == null || this.factoryId.equals("")) {
				factoryId = String.valueOf(user.getFactory_id());
			} else {
				factoryId = this.factoryId;
			}
			String workshop = request.getParameter("workshop");
			Map<String, Object> resultMap = new HashMap<String, Object>();
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			Map<String, Object> conditionMap1 = new HashMap<String, Object>();
			Map<String, Object> conditionMap2 = new HashMap<String, Object>();
			Map<String, Object> conditionMap3 = new HashMap<String, Object>();
			Map<String, Object> conditionMap4 = new HashMap<String, Object>();
			Map<String, Object> conditionMap5 = new HashMap<String, Object>();
			Map<String, Object> conditionMap6 = new HashMap<String, Object>();
			String curdate = Util.format(new Date(), "yyyy-MM-dd");
			conditionMap.put("factoryId", factoryId);
			if (!StringUtils.isEmpty(workshop)) {
				conditionMap.put("workshop", workshop);
			}
			conditionMap1.put("factoryId", factoryId);
			conditionMap2.put("factoryId", factoryId);
			conditionMap3.put("factoryId", factoryId);
			conditionMap4.put("factoryId", factoryId);
			conditionMap5.put("factoryId", factoryId);
			conditionMap6.put("factoryId", factoryId);
			conditionMap1.put("workshop", "焊装");
			conditionMap2.put("workshop", "涂装");
			conditionMap3.put("workshop", "底盘");
			conditionMap4.put("workshop", "总装");
			conditionMap5.put("workshop", "检测线");
			conditionMap6.put("workshop", "玻璃钢");
			conditionMap1.put("curDate", curdate);
			conditionMap2.put("curDate", curdate);
			conditionMap3.put("curDate", curdate);
			conditionMap4.put("curDate", curdate);
			conditionMap5.put("curDate", curdate);
			conditionMap6.put("curDate", curdate);
			resultMap.put("orderList", commDao.getIndexOrderList(conditionMap));
			// selectList=commDao.getIndexOrderList(factoryId);
			resultMap.put("exceptionList",
					commDao.getIndexExceptionList(conditionMap));
			resultMap.put("weldingList",
					commDao.getIndexWorkshopProduction(conditionMap1));
			resultMap.put("paintingList",
					commDao.getIndexWorkshopProduction(conditionMap2));
			resultMap.put("bottomList",
					commDao.getIndexWorkshopProduction(conditionMap3));
			resultMap.put("assemblyList",
					commDao.getIndexWorkshopProduction(conditionMap4));
			resultMap.put("testlineList",
					commDao.getIndexWorkshopProduction(conditionMap5));
			resultMap.put("fiberglassList",
					commDao.getIndexWorkshopProduction(conditionMap5));
			resultMap.put("dupList", commDao.queryIndexDpuData(conditionMap1));
			resultMap.put("passRateList",
					commDao.queryIndexPassRateData(conditionMap1));
			resultMap.put("productionInfo",
					commDao.getProductionSearch(conditionMap));
			resultMap
					.put("partsBalance", commDao.getPartsBalance(conditionMap));
			resultMap.put("pauseList", commDao.getPauseList(conditionMap));
			resultMap.put("factoryId", factoryId);
			resultJson = JSONObject.fromObject(resultMap);
			out = response.getWriter();
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(resultJson);
		return null;
	}

	/**
	 * 动态获取车间监控面板工厂和时间
	 * 
	 * @return
	 */
	public String getWorkshopBoardHeadInfo() {
		BmsBaseUser user = getUser();
		String factory = user.getFactory();
		HttpServletRequest request = ServletActionContext.getRequest();
		PrintWriter out = null;
		JSONObject resultJson = null;
		try {
			request.setCharacterEncoding("UTF-8");
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("curTime",
					Util.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
			resultMap.put("factory", factory);
			resultJson = JSONObject.fromObject(resultMap);
			out = response.getWriter();
		} catch (Exception e) {
			e.printStackTrace();
		}
		out.print(resultJson);
		return null;

	}

	/**
	 * @return 查询订单配置信息列表
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String showOrderConfigList() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");

		Map<String, Object> conditionMap = new HashMap<String, Object>();
		if (request.getParameter("search_order_no") != null)
			conditionMap.put("search_order_no",
					request.getParameter("search_order_no"));
		if (request.getParameter("search_order_name") != null)
			conditionMap.put("search_order_name",
					request.getParameter("search_order_name"));
		if (request.getParameter("search_productive_year") != null)
			conditionMap.put("search_productive_year",
					request.getParameter("search_productive_year"));
		if (request.getParameter("order_id") != null)
			conditionMap.put("order_id", request.getParameter("order_id"));
		if (request.getParameter("factory_id") != null)
			conditionMap.put("factory_id", request.getParameter("factory_id"));

		List datalist = new ArrayList();
		datalist = commDao.getOrderConfigList(conditionMap);
		// int totalCount=orderDao.getOrderConfigTotalCount(conditionMap);

		/*
		 * Map<String, String> page_map = new HashMap<String, String>(); if
		 * (pager != null){ pager.setTotalCount(totalCount);
		 * page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
		 * page_map.put("curPage", String.valueOf(pager.getCurPage()));
		 * page_map.put("pageSize", String.valueOf(pager.getPageSize())); }
		 */

		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	public String checkParts() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");

		Map<String, Object> queryParts = new HashMap<String, Object>();
		queryParts.put("parts_name", request.getParameter("parts_name").trim());
		List<Map> partsList = commDao.getParts(queryParts);
		boolean b = false;
		if (partsList.size() == 1
				&& partsList.get(0).get("parts_name")
						.equals(request.getParameter("parts_name").trim())) {
			b = true;
		}
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", null);
		if (!b) {
			json = Util.dataListToJson(false, "输入的零部件：("
					+ request.getParameter("parts_name").trim() + ")在系统不存在!",
					null);
		}
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 根据输入条件查询员工信息列表 added by xjw 20151224
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getStaffInfo() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		conditionMap = new HashMap<String, Object>();
		/*
		 * //modify by wuxiao 2016/4/22
		 * if("".equals(request.getParameter("staffNum"
		 * ))||request.getParameter("staffNum")==null){
		 * conditionMap.put("staffNum", getUser().getCard_number()); }else{
		 * conditionMap.put("staffNum", request.getParameter("staffNum")); }
		 * //modify by wuxiao end
		 */
		conditionMap.put("staffNum", request.getParameter("staffNum"));
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("dept", request.getParameter("dept"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		conditionMap.put("workgroup", request.getParameter("workgroup"));
		conditionMap.put("subgroup", request.getParameter("subgroup"));
		conditionMap.put("workDate", request.getParameter("workDate"));
		conditionMap.put("order_id", request.getParameter("order_id"));
		conditionMap.put("hourType", request.getParameter("hourType"));
		selectList = commDao.queryStaffInfo(conditionMap);
		return SUCCESS;
	}

	/**
	 * 根据用户信息查询员工信息列表 added by wuxiao 2016/4/22
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getStaffInfo1() throws UnsupportedEncodingException {
		int userid = getUser().getId();

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		// String factory=request.getParameter("factory");
		String url = request.getParameter("url");
		Map<String, Object> map1 = new HashMap<String, Object>();
		map1.put("userId", userid);
		map1.put("url", url);
		String workshopLimit = commDao.getWorkshopAuth(map1);
		Map<String, Object> ws = new HashMap<String, Object>();
		ws.put("workshops", workshopLimit);
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		resultList.add(ws);

		/*
		 * conditionMap=new HashMap<String,Object>(); //modify by wuxiao
		 * 2016/4/22
		 * if("".equals(request.getParameter("staffNum"))||request.getParameter
		 * ("staffNum")==null){ conditionMap.put("staffNum",
		 * getUser().getCard_number()); }else{ conditionMap.put("staffNum",
		 * request.getParameter("staffNum")); } //modify by wuxiao end
		 * conditionMap.put("factory", request.getParameter("factory"));
		 * conditionMap.put("dept", request.getParameter("dept"));
		 * conditionMap.put("workshop", request.getParameter("workshop"));
		 * conditionMap.put("workgroup", request.getParameter("workgroup"));
		 * conditionMap.put("subgroup", request.getParameter("subgroup"));
		 * selectList=commDao.queryStaffInfo(conditionMap);
		 */
		selectList = resultList;
		return SUCCESS;
	}

	/**
	 * 根据父节点名称查找下一级组织列表 added by xjw 20151224
	 * 
	 * @return
	 */
	public String getChildOrgList() throws UnsupportedEncodingException {
		String[] orgIdlist = (String[]) conditionMap.get("orgId");
		selectList = commDao.queryChildOrgList(orgIdlist[0]);
		return SUCCESS;
	}

	/**
	 * 从计件工时表中查找历史班组/小班组 added by wx 20160415
	 * 
	 * @return
	 */
	public String getChildGroupList() throws UnsupportedEncodingException {
		/*
		 * String[] orgIdlist=(String[]) conditionMap.get("orgId");
		 * 
		 * selectList=commDao.queryChildOrgList(orgIdlist[0]);
		 */
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		conditionMap = new HashMap<String, Object>();
		conditionMap.put("start_date", request.getParameter("start_date"));
		conditionMap.put("end_date", request.getParameter("end_date"));
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		if (!"".equals(request.getParameter("workgroup"))) {
			conditionMap.put("workgroup", request.getParameter("workgroup"));
			selectList = commDao.queryChildTeamList(conditionMap);
		} else {
			selectList = commDao.queryChildWorkGroupList(conditionMap);
		}
		/* conditionMap.put("subgroup", request.getParameter("subgroup")); */
		/* selectList=commDao.queryStaffInfo(conditionMap); */
		return SUCCESS;
	}

	/**
	 * 根据岗位分类获取岗位类别列表 added by thw 20160113
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getJobGradeList() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		String orglist = request.getParameter("jobType").toString();
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("jobType", orglist);
		selectList = commDao.getJobGradeList(conditionMap);
		return SUCCESS;
	}

	/**
	 * 获取组织结构权限树
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getOrgAuthTree() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		System.out.println("返回数据");
		int user_id = getUser().getId();
		String uri = request.getRequestURI();
		String acPath = uri.replaceFirst(request.getContextPath(), "");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("userId", user_id);
		conditionMap.put("url", "/" + request.getParameter("url"));
		conditionMap.put("orgType", request.getParameter("orgType")); // 部门类别
																		// (0事业部-1部门-2工厂-3科室-4车间-5班组-6小班组)
		conditionMap.put("orgKind", request.getParameter("orgKind"));// 部门类别
																		// (0管理型-1生产型)
		System.out.println("---->userId:" + user_id);
		System.out.println("url:" + request.getParameter("url"));
		System.out.println("orgType:" + request.getParameter("orgType"));
		System.out.println("orgKind:" + request.getParameter("orgKind"));
		List<Map<String, String>> list = commDao.getOrgAuthTree(conditionMap);
		JSONObject json = Util.dataListToJson(true, "查询成功", list, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * added by xjw for 根据订单编号输入值模糊查询订单下拉列表
	 * 
	 * @return
	 */
	public String getBusNumberFuzzySelect() {
		String[] yearList = (String[]) conditionMap.get("bus_input");
		String bus_input = yearList == null ? "" : yearList[0];
		conditionMap.put("bus_input", bus_input);
		selectList = commDao.getBusNumberFuzzySelect(conditionMap);

		return SUCCESS;
	}

	/**
	 * added by xjw for 根据vin码查询车号
	 * 
	 * @return
	 */
	public String getBusNumberByVin() {
		String[] vinList = (String[]) conditionMap.get("vin");
		String vin = vinList == null ? "" : vinList[0];
		conditionMap.put("vin", vin);
		selectList = commDao.getBusNumberByVin(conditionMap);

		return SUCCESS;
	}

	/**
	 * 检查vin码是否在PD_VIN表中存在，存在为有效，否则无效
	 * 
	 * @return
	 */
	public String validateVin() {
		String[] vinList = (String[]) conditionMap.get("vin");
		String vin = vinList == null ? "" : vinList[0];
		conditionMap.put("vin", vin);
		selectList = commDao.getVinList(conditionMap);

		return SUCCESS;
	}

	public String test() {

		List<Map<String, String>> list = commDao.getUserFactory(3);
		System.out.println("---->list.size = " + list.size());

		return "test";
	}

	/**
	 * 检查user是否有访问权限
	 */
	public String validateUrlAuth() {
		int userId = getUser().getId();
		String[] urlList = (String[]) conditionMap.get("url");
		String url = urlList == null ? "" : urlList[0];
		Map<String, Object> cmap = new HashMap<String, Object>();
		cmap.put("userId", userId);
		cmap.put("url", url);
		selectList = commDao.getRoleAuthorityList(cmap);
		return SUCCESS;
	}

	/**
	 * 根据车型获取车身型号列表
	 * 
	 * @return
	 */
	public String getBusVehicleTypeSelect() {
		String[] busTypeList = (String[]) conditionMap.get("busType");
		String busType = busTypeList == null ? "" : busTypeList[0];
		selectList = commDao.getBusVehicleType(busType);
		return SUCCESS;
	}
	/**
	 * 使用公用邮箱发送邮件
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String sendEmail() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String thead=request.getParameter("thead");
		String[] theadarr=thead.split(",");
		String tbdatalist=request.getParameter("tbdatalist");
		JSONArray jsa=JSONArray.fromObject(tbdatalist);
		String mailTo= request.getParameter("mailTo");
		String cc=request.getParameter("cc");
		String mainTitle=request.getParameter("title");		
		String content=request.getParameter("content");
		
		request.setCharacterEncoding("UTF-8");
		// 邮件模块
		MailSenderServiceImp1 mss = new MailSenderServiceImp1();

		JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();
		// 设定 Mail Server
		senderImpl.setHost("smtp.byd.com");

		// SMTP验证时，需要用户名和密码
		senderImpl.setUsername("div19BMS@byd.com");
		senderImpl.setPassword("rhc3@kxrz");
		senderImpl.setPort(25);
		mss.setMailSender(senderImpl);
		mss.setDefaultFrom("div19BMS@byd.com");
		// mss.send("duan.qiling@byd.com", "测试", "54321");

		mss.setTemplet("classpath:com/byd/erpit/tools/email/emailTemplet.html");
		mss.setEncode("utf-8");
		
		EmailSender emailSender = new EmailSender();
		emailSender.setTo(mailTo);
		emailSender.setCc(cc);
		emailSender.getParam().put("content", content);
		emailSender.getParam().put("subtitle", "");
		emailSender.getParam().put("factory", "");
		emailSender.getParam().put("maintitle", mainTitle);
		emailSender.setSubject(mainTitle);
		emailSender.setContent(content);
		
		emailSender.setMerge(true);
		
		//封装邮件内容表格
		List<TableTable> tables = new ArrayList<TableTable>();
		
		TableTable tableX = emailSender.new TableTable();
		List<TdTd> theadX = new ArrayList<TdTd>();
		List<List<TdTd>> tbodyX = new ArrayList<List<TdTd>>();
		for (int i=0;i<theadarr.length;i++) { //遍历keys封装thead
	        String key = theadarr[i];
	        theadX.add(tableX.new TdTd(key));
		}
		
		for(ListIterator lit=jsa.listIterator();lit.hasNext();){
			JSONObject jso=(JSONObject) lit.next();
			  List<TdTd> tr = new ArrayList<TdTd>();
			  /*for (Iterator iter = jso.keys(); iter.hasNext();) {//封装tbody 
			        String key = (String)iter.next();			        
					tr.add(tableX.new TdTd(jso.getString(key)));
			  } */
			  for (int i=0;i<theadarr.length;i++) { //遍历keys封装thead
			        String key = theadarr[i];
			        tr.add(tableX.new TdTd(jso.getString(key)));
				}
			  tbodyX.add(tr);
			  
		}
		tableX.setThead(theadX);
		tableX.setTbody(tbodyX);
		tables.add(tableX);
		
		emailSender.setTables(tables);
		
		mss.send(emailSender);
		
		return SUCCESS;
	}
	
	
	public String getWorkgroupPrice() throws UnsupportedEncodingException{
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		conditionMap = new HashMap<String, Object>();
		conditionMap.put("workDate", request.getParameter("workDate"));
		conditionMap.put("order_id", request.getParameter("order_id"));
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		conditionMap.put("workgroup", request.getParameter("workgroup"));
		conditionMap.put("team", request.getParameter("team"));
		
		selectList=commDao.getWorkgroupPrice(conditionMap);
		return SUCCESS;
	}
	
	public String getBasePrice() throws UnsupportedEncodingException{	
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		conditionMap = new HashMap<String, Object>();
		conditionMap.put("workDate", request.getParameter("workDate"));
		conditionMap.put("factory", request.getParameter("factory"));	
		conditionMap.put("type", request.getParameter("type"));
		selectList=commDao.getBasePrice(conditionMap);
		return SUCCESS;
	}
}
