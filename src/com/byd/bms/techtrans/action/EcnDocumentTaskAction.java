package com.byd.bms.techtrans.action;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.xwork.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import com.byd.bms.quality.entity.MaterialAbnormalBean;
import com.byd.bms.quality.entity.TestFlowTplDetailBean;
import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.techtrans.dao.IEcnTaskDao;
import com.byd.bms.techtrans.entity.BmsEcnTaskDetail;
import com.byd.bms.techtrans.entity.BmsEcnTime;
import com.byd.bms.techtrans.entity.BmsTaskDetailConfig;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.BmsBaseUser;
import com.byd.bms.util.entity.Pager;

public class EcnDocumentTaskAction extends BaseAction<Object> {
	private static final long serialVersionUID = 1L;
	private IEcnTaskDao ecnDocumentTaskDao;
	private String configStr;
	private String configStr1;
	private String factoryid;
	private String taskid;
	private String pictaskid;
	private List<BmsEcnTime> newbmsecntimelist = new ArrayList();
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	private Pager pager;
	private int totalDepartment = 0;
	private File file0;
	private String file0FileName;
	private String file0ContentType;
	private File file1;
	private String file1FileName;
	private String file1ContentType;
	private String busno = "";
	private TransactionTemplate transactionTemplate;
	private String conditions;
	private String whflag;

	/**
	 * 显示技改分配页面
	 * 
	 * @return
	 */
	public String maintain() {
		return "maintain";
	}

	/**
	 * 技改任务分配首页，查询技改任务列表
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings("rawtypes")
	public String showEchTaskList() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		if (request.getParameter("ecn_document_number") != null)
			conditionMap.put("ecn_document_number", new String(request
					.getParameter("ecn_document_number").getBytes("UTF-8"),
					"UTF-8"));
		if (request.getParameter("order_no") != null)
			conditionMap.put(
					"order_no",
					new String(request.getParameter("order_no").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("search_factory") != null)
			conditionMap.put(
					"search_factory",
					new String(request.getParameter("search_factory").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("search_workshop") != null)
			conditionMap.put(
					"search_workshop",
					new String(request.getParameter("search_workshop").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("status") != null)
			conditionMap.put("status", new String(request
					.getParameter("status").getBytes("UTF-8"), "UTF-8"));
		if (request.getParameter("ecn_type") != null)
			conditionMap.put("ecn_type", new String(request
					.getParameter("ecn_type").getBytes("UTF-8"), "UTF-8"));
		if(request.getParameter("start_date")!=null)
			conditionMap.put("start_date", request.getParameter("start_date"));
		if(request.getParameter("end_date")!=null)
			conditionMap.put("end_date", request.getParameter("end_date"));
		if (pager != null) {
			conditionMap.put("offset",
					(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}

		List datalist = new ArrayList();
		datalist = ecnDocumentTaskDao.getEcnTaskList(conditionMap);
		int totalCount = ecnDocumentTaskDao.getEcnTaskListCount(conditionMap);
		Map<String, String> page_map = new HashMap<String, String>();
		if (pager != null) {
			pager.setTotalCount(totalCount);
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist, page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * thw 技改任务切换方式为立即切换时，保存技改任务车号分配信息
	 */
	public String taskAllotBusNumberSave() throws UnsupportedEncodingException {

		transactionTemplate.execute(new TransactionCallbackWithoutResult() {

			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				HttpServletRequest request = ServletActionContext.getRequest();
				try {
					request.setCharacterEncoding("UTF-8");
				} catch (UnsupportedEncodingException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				}
				HttpServletResponse response = ServletActionContext
						.getResponse();
				response.setContentType("text/html;charset=utf-8");
				String task_id = request.getParameter("task_id");
				String factory_id = request.getParameter("factory_id");
				String order_id = request.getParameter("order_id");
				String bus_number_list = request
						.getParameter("bus_number_list");
				System.out.println("新增的车号字符串：" + bus_number_list);
				String delete_bus_number_list = request
						.getParameter("delete_bus_number_list");
				System.out.println("删除的车号字符串：" + delete_bus_number_list);
				JSONArray bus_number_listJSONArray = JSONArray
						.fromObject(bus_number_list);
				JSONArray delete_bus_number_listJSONArray = JSONArray
						.fromObject(delete_bus_number_list);
				PrintWriter out = null;
				try {
					List<BmsEcnTaskDetail> addList = new ArrayList<BmsEcnTaskDetail>();
					for (int i = 0; i < bus_number_listJSONArray.size(); i++) {
						String bus_number = bus_number_listJSONArray.get(i)
								.toString();
						BmsEcnTaskDetail ecnTaskDetail = new BmsEcnTaskDetail();
						ecnTaskDetail.setEcn_task_id(task_id);
						ecnTaskDetail.setFactoryID(factory_id);
						ecnTaskDetail.setOrder_id(order_id);
						ecnTaskDetail.setBus_number(bus_number);
						addList.add(ecnTaskDetail);
					}
					if (addList.size() > 0) {
						ecnDocumentTaskDao.addEcnTaskDetail(addList);
					}
					List list = new ArrayList();
					for (int i = 0; i < delete_bus_number_listJSONArray.size(); i++) {
						list.add(delete_bus_number_listJSONArray.get(i));
					}
					if (list.size() > 0) {
						ecnDocumentTaskDao.deleteEcnTaskDetail(list);
					}
					JSONObject json = Util.dataListToJson(true, "分配成功", null);
					try {
						out = response.getWriter();
					} catch (IOException e) {
						e.printStackTrace();
					}
					out.print(json);
				} catch (Exception e) {
					JSONObject json = Util.dataListToJson(false, "分配失败", null);
					try {
						out = response.getWriter();
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					e.printStackTrace();
					status.setRollbackOnly();
				}

			}

		});
		return null;
	}

	/**
	 * 根据工厂id,任务id 查询车间的工时配置信息
	 */
	@SuppressWarnings("rawtypes")
	public String workshoptimeinfo() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		if (request.getParameter("factoryId") != null)
			conditionMap.put(
					"factoryId",
					new String(request.getParameter("factoryId").getBytes(
							"ISO8859-1"), "UTF-8"));
		if (request.getParameter("taskid") != null)
			conditionMap.put("taskid", new String(request
					.getParameter("taskid").getBytes("ISO8859-1"), "UTF-8"));

		List datalist = new ArrayList();
		datalist = ecnDocumentTaskDao.workshoptimeinfo(conditionMap);
		Map<String, String> page_map = new HashMap<String, String>();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist, page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * thw 保存工时配置信息
	 * 
	 * @throws UnsupportedEncodingException
	 */
	public String taskTimeSave() throws UnsupportedEncodingException {
		transactionTemplate.execute(new TransactionCallbackWithoutResult() {
			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				HttpServletRequest request = ServletActionContext.getRequest();
				try {
					request.setCharacterEncoding("UTF-8");
				} catch (UnsupportedEncodingException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				}
				Map<String, String> page_map = new HashMap<String, String>();
				HttpServletResponse response = ServletActionContext
						.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter out = null;
				try {
					String addList = request.getParameter("addList");
					String deleteList = request.getParameter("deleteList");
					
					/** start 
					 * added by xjw 160921
					 * 更新技改任务表（BMS_ECN_TASK）中对应任务的总工时
					 * **/
					String unit_time_total=request.getParameter("unit_time_total");
					String ecn_task_id=request.getParameter("ecn_task_id");
					Map<String, Object> conditionMap=new HashMap<String,Object>();
					conditionMap.put("total_hours", unit_time_total);
					conditionMap.put("ecn_task_id", ecn_task_id);
					conditionMap.put("status","3");
					if(!StringUtils.isEmpty(ecn_task_id)){
						ecnDocumentTaskDao.updateEcnTask(conditionMap);
					}
					/** end **/
					
					// 删除的
					List ecn_time_id_list = new ArrayList();
					JSONArray deleteListJSONArray = JSONArray
							.fromObject(deleteList);
					for (int i = 0; i < deleteListJSONArray.size(); i++) {
						if (deleteListJSONArray.get(i) != ""
								&& Integer.parseInt(deleteListJSONArray.get(i)
										.toString()) != 0) {
							ecn_time_id_list.add(Integer
									.parseInt(deleteListJSONArray.get(i)
											.toString()));
						}
					}
					if (ecn_time_id_list.size() > 0) {
						ecnDocumentTaskDao.deleteEcnTaskTime(ecn_time_id_list);
					}
					// 新增和修改的
					JSONArray addListJSONArray = JSONArray.fromObject(addList);
					for (int i = 0; i < addListJSONArray.size(); i++) {
						JSONObject taskJSON = addListJSONArray.getJSONObject(i);
						int ecn_time_id = Integer.parseInt(taskJSON
								.getString("ecn_time_id"));
						String time_taskid = taskJSON.getString("time_taskid");
						String workshopid = taskJSON.getString("workshopid");
						String unit = taskJSON.getString("unit");
						String unit_time = taskJSON.getString("unit_time");						

						BmsEcnTime ecnTime = new BmsEcnTime();
						ecnTime.setEcn_task_id(time_taskid);
						ecnTime.setWorkshopid(workshopid);
						ecnTime.setUnit_time(unit_time);
						ecnTime.setUnit(unit);
						if (ecn_time_id != 0) {
							ecnTime.setId(ecn_time_id);
							ecnDocumentTaskDao.editEcnTaskTime(ecnTime);
						} else {
							ecnDocumentTaskDao.insertEcnTaskTime(ecnTime);
						}

					}
					JSONObject json = Util.dataListToJson(true, "工时分配成功", null,
							page_map);
					try {
						out = response.getWriter();
					} catch (IOException e) {
						e.printStackTrace();
					}
					out.print(json);
				} catch (Exception e) {
					JSONObject json = Util.dataListToJson(false, "工时分配失败",
							null, page_map);
					try {
						out = response.getWriter();
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					e.printStackTrace();
					status.setRollbackOnly();
				}

			}

		});

		return null;
	}

	/**
	 * 单任务跟进时，技改任务切换方式为全部切换时，根据订单ID查询此任务下还有那些车号尚未技改
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getEcnTaskBusNumber() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> map = new HashMap<String, Object>();

		// 获取参数
		int order_id = Integer.parseInt(request.getParameter("order_id"));
		map.put("order_id", order_id);
		int ecn_task_id = Integer.parseInt(request.getParameter("ecn_task_id"));
		map.put("ecn_task_id", ecn_task_id);
		int factory_id=Integer.parseInt(request.getParameter("factory_id"));
		map.put("factory_id", factory_id);
		String workshop=request.getParameter("workshop");
		map.put("workshop", workshop);
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
		if (request.getParameter("task_detail_status") != null
				&& request.getParameter("task_detail_status").trim() != "") {
			map.put("task_detail_status",
					request.getParameter("task_detail_status"));
		}

		List datalist = new ArrayList();
		datalist = ecnDocumentTaskDao.getBusNumberByOrder(map);

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
	 * thw 查询BMS_ECN_TASK_DETAIL表中车号的信息
	 */
	public String querydphlist() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		if (request.getParameter("factory_id") != null)
			conditionMap.put(
					"factory_id",
					new String(request.getParameter("factory_id").getBytes(
							"ISO8859-1"), "UTF-8"));
		if (request.getParameter("workshop") != null)
			conditionMap.put(
					"workshop",
					new String(request.getParameter("workshop").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("ecn_task_id") != null)
			conditionMap.put(
					"ecn_task_id",
					new String(request.getParameter("ecn_task_id").getBytes(
							"ISO8859-1"), "UTF-8"));
		if (request.getParameter("order_id") != null)
			conditionMap.put(
					"order_id",
					new String(request.getParameter("order_id").getBytes(
							"ISO8859-1"), "UTF-8"));
		if (request.getParameter("ecn_switch_mode") != null)
			conditionMap.put("switch_mode",
					new String(request.getParameter("ecn_switch_mode")
							.getBytes("ISO8859-1"), "UTF-8"));
		if (request.getParameter("status") != null)
			conditionMap.put("status", new String(request
					.getParameter("status").getBytes("ISO8859-1"), "UTF-8"));
		// 车号条件
		String bus_num_start = request.getParameter("bus_num_start");
		if (bus_num_start != null && bus_num_start.trim() != "") {
			bus_num_start = StringUtils.leftPad(bus_num_start, 4, "0");
			conditionMap.put("bus_num_start", bus_num_start);
		}
		String bus_num_end = request.getParameter("bus_num_end");
		if (bus_num_end != null && bus_num_end.trim() != "") {
			bus_num_end = StringUtils.leftPad(bus_num_end, 4, "0");
			conditionMap.put("bus_num_end", bus_num_end);
		}
		List datalist = new ArrayList();
		datalist = ecnDocumentTaskDao.queryEcnTaskDetailList(conditionMap);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 显示技改跟进主页面
	 */
	public String taskFollowUpMaintain() {
		return "taskfollowupmaintain";
	}

	/**
	 * 单任务跟进查询 thw
	 * 
	 * @throws UnsupportedEncodingException
	 */
	public String querySingleTasklist() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		if (request.getParameter("task_content") != null)
			conditionMap.put(
					"task_content",
					new String(request.getParameter("task_content").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("ecnnumber") != null)
			conditionMap.put(
					"ecnnumber",
					new String(request.getParameter("ecnnumber").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("order_no") != null)
			conditionMap.put(
					"order_no",
					new String(request.getParameter("order_no").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("taskstatus") != null)
			conditionMap.put(
					"taskstatus",
					new String(request.getParameter("taskstatus").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("hourstatus") != null)
			conditionMap.put(
					"hourstatus",
					new String(request.getParameter("hourstatus").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("search_factory") != null)
			conditionMap.put(
					"search_factory",
					new String(request.getParameter("search_factory").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("search_workshop") != null)
			conditionMap.put(
					"search_workshop",
					new String(request.getParameter("search_workshop").getBytes(
							"UTF-8"), "UTF-8"));
		if (request.getParameter("actionType") != null)
			conditionMap.put(
					"actionType",
					new String(request.getParameter("actionType").getBytes(
							"UTF-8"), "UTF-8"));
		if(request.getParameter("start_date")!=null)
			conditionMap.put("start_date", request.getParameter("start_date"));
		if(request.getParameter("end_date")!=null)
			conditionMap.put("end_date", request.getParameter("end_date"));
		List datalist = new ArrayList();
		if (pager != null) {
			conditionMap.put("offset",
					(pager.getCurPage() - 1) * pager.getPageSize());
			conditionMap.put("pageSize", pager.getPageSize());
		}
		datalist = ecnDocumentTaskDao.getSingleTaskList(conditionMap);
		int totalCount = ecnDocumentTaskDao
				.getSingleTaskListCount(conditionMap);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		Map<String, String> page_map = new HashMap<String, String>();
		if (pager != null) {
			pager.setTotalCount(totalCount);
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist, page_map);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	// 单任务跟进-订单信息查询
	public String singleTaskOrderlist() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		// if (request.getParameter("ecn_task_id") != null)
		// conditionMap.put("ecn_task_id", new
		// String(request.getParameter("ecn_task_id").getBytes("ISO8859-1"),"UTF-8"));

		List datalist = new ArrayList();
		datalist = ecnDocumentTaskDao.getSingleTaskOrderList(request
				.getParameter("ecn_task_id"));
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	// 单任务跟进，通过订单号查询车号详情
	public String queryBusNumberList() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		if (request.getParameter("ecn_task_id") != null)
			conditionMap.put(
					"ecn_task_id",
					new String(request.getParameter("ecn_task_id").getBytes(
							"ISO8859-1"), "UTF-8"));
		if (request.getParameter("order_no") != null)
			conditionMap.put(
					"order_no",
					new String(request.getParameter("order_no").getBytes(
							"ISO8859-1"), "UTF-8"));
		if (request.getParameter("factory_id") != null)
			conditionMap.put(
					"factory_id",
					new String(request.getParameter("factory_id").getBytes(
							"ISO8859-1"), "UTF-8"));
		if (request.getParameter("taskstate") != null)
			conditionMap.put(
					"taskstate",
					new String(request.getParameter("taskstate").getBytes(
							"ISO8859-1"), "UTF-8"));
		List datalist = new ArrayList();
		if (request.getParameter("taskstate").equals("0")) {
			datalist = ecnDocumentTaskDao.getBusDetaillist(
					request.getParameter("ecn_task_id"),
					request.getParameter("order_no"),
					request.getParameter("factory_id"));
		} else if (request.getParameter("taskstate").equals("1")) {
			datalist = ecnDocumentTaskDao.queryBusDetaillist(
					request.getParameter("ecn_task_id"),
					request.getParameter("order_no"),
					request.getParameter("factory_id"));
		}
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * thw 单任务跟进，更新技改明细车辆完成状态
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String updatetaskdetailstate() throws UnsupportedEncodingException {
		transactionTemplate.execute(new TransactionCallbackWithoutResult() {

			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				SimpleDateFormat df = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				String curTime = df.format(new Date());
				int userid = getUser().getId();

				HttpServletRequest request = ServletActionContext.getRequest();
				try {
					request.setCharacterEncoding("UTF-8");
				} catch (UnsupportedEncodingException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				}
				HttpServletResponse response = ServletActionContext
						.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter out = null;
				try {
					String ecn_id = request.getParameter("ecn_id");
					String task_id = request.getParameter("task_id");
					String factory_id = request.getParameter("factory_id");
					String order_id = request.getParameter("order_id");
					String workshop=request.getParameter("workshop");
					
					Map<String,Object> tskmap=new HashMap<String,Object>();
					tskmap.put("taskid", task_id);
					tskmap.put("workshop", workshop);
					
					int ecn_number = Integer.parseInt(request
							.getParameter("ecn_number"));
					String bus_number_list = request
							.getParameter("bus_number_list");
					System.out.println("新增的车号字符串：" + bus_number_list);
					String delete_bus_number_list = request
							.getParameter("delete_bus_number_list");
					System.out.println("删除的车号字符串：" + delete_bus_number_list);
					JSONArray bus_number_listJSONArray = JSONArray
							.fromObject(bus_number_list);
					JSONArray delete_bus_number_listJSONArray = JSONArray
							.fromObject(delete_bus_number_list);

					List<BmsEcnTaskDetail> addList = new ArrayList<BmsEcnTaskDetail>();
					List<BmsEcnTaskDetail> modifyList = new ArrayList<BmsEcnTaskDetail>();

					for (int i = 0; i < bus_number_listJSONArray.size(); i++) {
						JSONObject object = bus_number_listJSONArray
								.getJSONObject(i);
						int task_detail_id = Integer.parseInt(object
								.getString("task_detail_id"));
						String bus_number = object.getString("bus_number");

						BmsEcnTaskDetail ecnTaskDetail = new BmsEcnTaskDetail();
						ecnTaskDetail.setEcn_task_id(task_id);
						ecnTaskDetail.setFactoryID(factory_id);
						ecnTaskDetail.setOrder_id(order_id);
						ecnTaskDetail.setBus_number(bus_number);
						ecnTaskDetail.setWorkshop(workshop);
						ecnTaskDetail.setStatus("1");
						ecnTaskDetail.setConfirmor_id(String.valueOf(userid));
						ecnTaskDetail.setConfirmor_date(curTime);
						if (task_detail_id == 0) {
							// 新增
							addList.add(ecnTaskDetail);
						} else {
							ecnTaskDetail.setId(task_detail_id);
							modifyList.add(ecnTaskDetail);
						}
					}
					if (modifyList.size() > 0) {
						ecnDocumentTaskDao.updateEcnTaskDetail(modifyList);
					}
					if (addList.size() > 0) {
						ecnDocumentTaskDao.addEcnTaskDetail(addList);
					}
					List list = new ArrayList();
					for (int i = 0; i < delete_bus_number_listJSONArray.size(); i++) {
						list.add(delete_bus_number_listJSONArray.get(i));
					}
					if (list.size() > 0) {
						ecnDocumentTaskDao.deleteEcnTaskDetail(list);
					}
					String resultMessage = "";
					// 判断taskid下所有的车辆明细是否已经完成
					List datalist = new ArrayList();
					datalist = ecnDocumentTaskDao
							.queryTaskCompleteIsOK(tskmap);
					if (datalist.size() == ecn_number) {
						ecnDocumentTaskDao.updateWorkshopTaskState(tskmap);
						resultMessage = "此技改任务下所有车辆均已跟进完成，技改任务关闭！";						
						ecnDocumentTaskDao.updateTaskState(tskmap);
						// 更新技改单状态
						ecnDocumentTaskDao.updateEcnDocument(ecn_id);
					} else {
						resultMessage = "更新成功！";
					}
					JSONObject json = Util.dataListToJson(true, resultMessage,
							null);
					try {
						out = response.getWriter();
					} catch (IOException e) {
						e.printStackTrace();
					}
					out.print(json);
				} catch (Exception e) {
					JSONObject json = Util.dataListToJson(false, "操作失败！", null);
					try {
						out = response.getWriter();
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					out.print(json);
					e.printStackTrace();
					status.setRollbackOnly();
				}

			}

		});

		return null;

	}

	// 单任务跟进，原效果图与整改后的效果图上传方法
	public String imgload() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String createTime = Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		String oldpath = "";
		String newpath = "";
		int result = -2;
		int user_id = getUser().getId();
		String bpath = "images/upload/techtrans/";
		// 把上传的文件放到指定的路径下
		String path = ServletActionContext.getServletContext().getRealPath(
				bpath);
		// 写到指定的路径中
		File file = new File(path);
		// 如果指定的路径没有就创建
		if (!file.exists()) {
			file.mkdirs();
		}
		if (file0 != null) {
			String savename = generateFileName(getFile0FileName());
			try {
				FileUtils.copyFile(file0, new File(file, savename));
				oldpath = bpath + savename;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (file1 != null) {
			String savename = generateFileName(getFile1FileName());
			try {
				FileUtils.copyFile(file1, new File(file, savename));
				newpath = bpath + savename;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		result = ecnDocumentTaskDao.updateEcnTaskPicSrc(pictaskid, oldpath,
				newpath);
		String message = "";
		if (result > 0) {
			message = "图片上传成功";
		} else {
			message = "更新失败,请与管理员联系";
		}
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, message, null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	// 单任务跟进，原效果图与整改后的效果图显示
	public String queryTaskPicView() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		List datalist = new ArrayList();
		datalist = ecnDocumentTaskDao.getTaskDetail(request
				.getParameter("taskid"));
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 为上传文件自动分配文件名称，避免重复
	 * 
	 * @param fileName
	 * @return
	 */
	public String generateFileName(String fileName) {

		// 获得当前时间

		DateFormat format = new SimpleDateFormat("yyMMddHHmmss");

		// 转换为字符串

		String formatDate = format.format(new Date());

		// 随机生成文件编号

		int random = new Random().nextInt(10000);

		// 获得文件后缀名称

		int position = fileName.lastIndexOf(".");

		String extension = fileName.substring(position);

		// 组成一个新的文件名称

		return formatDate + random + extension;

	}

	/**
	 * thw 单车跟进，根据车号查询此车号下所有技改任务信息
	 * 
	 */
	public String querySingleCarNolist() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("bus_number", request.getParameter("busno"));
		conditionMap.put("flag", request.getParameter("flag"));
		List datalist = new ArrayList();
		datalist = ecnDocumentTaskDao.getEcnTasksByBusNumber(conditionMap);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true, "查询成功", datalist);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * thw 单车跟进页面，技改确认提交
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String singleCarFollowSubmit() throws UnsupportedEncodingException {
		transactionTemplate.execute(new TransactionCallbackWithoutResult() {

			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				SimpleDateFormat df = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				String curTime = df.format(new Date());
				int userid = getUser().getId();

				HttpServletRequest request = ServletActionContext.getRequest();
				try {
					request.setCharacterEncoding("UTF-8");
				} catch (UnsupportedEncodingException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				}
				HttpServletResponse response = ServletActionContext
						.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter out = null;
				try {
					String bus_number = request.getParameter("bus_number");
					String bus_number_list = request
							.getParameter("bus_number_list");
					System.out.println("新增的车号字符串：" + bus_number_list);
					JSONArray bus_number_listJSONArray = JSONArray
							.fromObject(bus_number_list);

					List<BmsEcnTaskDetail> addList = new ArrayList<BmsEcnTaskDetail>();
					List<BmsEcnTaskDetail> modifyList = new ArrayList<BmsEcnTaskDetail>();
					List<BmsEcnTaskDetail> allList = new ArrayList<BmsEcnTaskDetail>();

					for (int i = 0; i < bus_number_listJSONArray.size(); i++) {
						JSONObject object = bus_number_listJSONArray
								.getJSONObject(i);
						int task_detail_id = Integer.parseInt(object
								.getString("task_detail_id"));
						String task_id = object.getString("task_id");
						String factory_id = object.getString("factory_id");
						String workshop=object.getString("workshop");
						String order_id = object.getString("order_id");
						int ecn_number = Integer.parseInt(object
								.getString("ecn_number"));

						BmsEcnTaskDetail ecnTaskDetail = new BmsEcnTaskDetail();
						ecnTaskDetail.setEcn_task_id(task_id);
						ecnTaskDetail.setFactoryID(factory_id);
						ecnTaskDetail.setOrder_id(order_id);
						ecnTaskDetail.setBus_number(bus_number);
						ecnTaskDetail.setStatus("1");
						ecnTaskDetail.setConfirmor_id(String.valueOf(userid));
						ecnTaskDetail.setConfirmor_date(curTime);
						ecnTaskDetail.setEcn_number(ecn_number);
						if (task_detail_id == 0) {
							addList.add(ecnTaskDetail);
							// ecnDocumentTaskDao.addEcnTaskDetail(ecnTaskDetail);
						} else {
							ecnTaskDetail.setId(task_detail_id);
							modifyList.add(ecnTaskDetail);
							// ecnDocumentTaskDao.updateEcnTaskDetail(ecnTaskDetail);
						}
						allList.add(ecnTaskDetail);
					}
					if (modifyList.size() > 0) {
						ecnDocumentTaskDao.updateEcnTaskDetail(modifyList);
					}
					if (addList.size() > 0) {
						ecnDocumentTaskDao.addEcnTaskDetail(addList);
					}
					// 判断是否所有技改任务已技改完成
					if (allList.size() > 0) {
						for (int i = 0; i < allList.size(); i++) {
							// 判断taskid下所有的车辆明细是否已经完成
							List datalist = new ArrayList();
							Map<String,Object> m=new HashMap<String,Object>();
							m.put("taskid", allList.get(i).getEcn_task_id());
							m.put("workshop", allList.get(i).getWorkshop());
							datalist = ecnDocumentTaskDao
									.queryTaskCompleteIsOK(m);
							if (datalist.size() == allList.get(i)
									.getEcn_number()) {
								
								ecnDocumentTaskDao.updateTaskState(m);
							}
						}
					}

					String resultMessage = "更新成功！";
					JSONObject json = Util.dataListToJson(true, resultMessage,
							null);
					try {
						out = response.getWriter();
					} catch (IOException e) {
						e.printStackTrace();
					}
					out.print(json);

				} catch (Exception e) {
					JSONObject json = Util.dataListToJson(false, "更新失败！", null);
					try {
						out = response.getWriter();
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					out.print(json);
					e.printStackTrace();
					status.setRollbackOnly();
				}

			}

		});
		return null;

	}

	/**
	 * 技改信息查询
	 * 
	 * @return
	 */
	public String showEcnInformationList() throws UnsupportedEncodingException {

		return "ecnSearch";
	}

	public String changeEcnNumber() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		String taskId = request.getParameter("taskid");
		String ecnNumber = request.getParameter("ecnNumber");
		String retrunMessage = "";
		int i = 0;
		JSONObject json = null;
		if (taskId == null || taskId == "") {
			retrunMessage = "更新失败，未找到该技改任务！";
			json = Util.dataListToJson(false, retrunMessage, null);
		} else
			i = ecnDocumentTaskDao.updateEcnNumber(taskId, ecnNumber);

		if (i == 0) {
			retrunMessage = "更新失败！";
			json = Util.dataListToJson(false, retrunMessage, null);
		} else {
			retrunMessage = "更新成功！";
			json = Util.dataListToJson(true, retrunMessage, null);
		}
		PrintWriter out = null;

		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 技改工时维护界面
	 * 
	 * @return
	 */
	public String worktimeMaintain() {
		return "worktimeMaintain";
	}

	/**
	 * 技改工时审核界面
	 * 
	 * @return
	 */
	public String worktimeVerify() {
		return "worktimeVerify";
	}

	/**
	 * 员工工时查询
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String getStaffWorkHours() throws UnsupportedEncodingException {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		/*
		 * Map<String,Object> map = new HashMap<String,Object>();
		 * map.put("ecnTaskId", request.getParameter("ecnTaskId"));
		 * map.put("staffNum", request.getParameter("staffNum"));
		 * map.put("workDate", request.getParameter("workDate"));
		 */

		JSONObject json = Util.dataListToJson(true, "查询成功",
				ecnDocumentTaskDao.queryStaffWorkHours(conditionMap));
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}

	/**
	 * 工时维护--保存工时信息
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String saveWorkHourInfo() throws UnsupportedEncodingException {
		BmsBaseUser user = getUser();
		String createTime = Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONArray jsonArray = JSONArray.fromObject(conditions);
		List<Map<String, Object>> swh_list = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject object = (JSONObject) jsonArray.get(i);
			object.put("editorId", user.getId());
			object.put("editDate", createTime);
			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
		}
		int i = ecnDocumentTaskDao.saveWorkHourInfo(swh_list);
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = null;
		if (i > 0) {
			json = Util.dataListToJson(true, "保存成功", null);
		} else {
			json = Util.dataListToJson(false, "保存失败", null);
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
	 * 工时修改
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String updateWorkHourInfo() throws UnsupportedEncodingException {
		BmsBaseUser user = getUser();
		String createTime = Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		JSONArray jsonArray = JSONArray.fromObject(conditions);
		List<Map<String, Object>> swh_list = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject object = (JSONObject) jsonArray.get(i);
			if ("verify".equals(whflag)) {
				object.put("approverId", user.getId());
				object.put("approveDate", createTime);
				object.put("status", "1");
				object.put("actionType", "verify");
			} else if ("reject".equals(whflag)) {
				object.put("approverId", user.getId());
				object.put("approveDate", createTime);
				object.put("status", "2");
				object.put("actionType", "reject");
			} else {
				object.put("editorId", user.getId());
				object.put("editDate", createTime);
			}

			Map<String, Object> map = (Map<String, Object>) object;
			swh_list.add(map);
		}

		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = null;
		try{
			int i = ecnDocumentTaskDao.batchUpdateWorkHour(swh_list);
			json = Util.dataListToJson(true, "保存成功", null);
		}catch(Exception e){
			json = Util.dataListToJson(false, "保存失败", null);
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
	 * 计算技改工资
	 * @return
	 */
	public String caculateSalary(){
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		ecnDocumentTaskDao.caculateEcnSalary(conditionMap);
		return null;
	}
	/**
	 * 删除工时信息
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String deleteWorkHourInfo() throws UnsupportedEncodingException{
		JSONArray jsonArray=JSONArray.fromObject(conditions);
		List<String> idlist=new ArrayList<String>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);
			 idlist.add(object.getString("id"));
		}	
		String ids=StringUtils.join(idlist, ",");
		System.out.println(ids);
		Map<String, String> conditionMap=new HashMap<String,String>();
		conditionMap.put("ids", ids);
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		JSONObject json = null;
		try{
			int i = ecnDocumentTaskDao.deleteWorkHourInfo(conditionMap);
			json = Util.dataListToJson(true, "删除成功", null);
		}catch(Exception e){
			json = Util.dataListToJson(false, "删除失败", null);
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
	 * 技改工时查看页面
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String ecnWorkTimeInfoPage() throws UnsupportedEncodingException{
		
		return "ecnWorkTimeInfoPage";
	}
	/**
	 * 获取技改单工时分配信息
	 * 
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String getEcnWorkTimeInfo() throws UnsupportedEncodingException {		
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("ecnTaskId", this.taskid);
		Map<String,Object> baseInfo=new HashMap<String,Object>();
		baseInfo.put("single_hour", this.configStr);
		baseInfo.put("ecn_number", this.configStr1);
		Map<String,Object> resultMap = new HashMap<String, Object>();
		resultMap.put("baseInfo", baseInfo);
		resultMap.put("whList", ecnDocumentTaskDao.queryStaffWorkHours(m));
		resultMap.put("assignList", ecnDocumentTaskDao.queryAssignList(this.taskid));
		JSONObject json=JSONObject.fromObject(resultMap);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	/**
	 * 技改车间工时分配页面
	 * @return
	 */
	public String taskTimeMaintain(){
		
		return "taskTimeMaintain";
	}
	
	public String getConfigStr1() {
		return configStr1;
	}

	public void setConfigStr1(String configStr1) {
		this.configStr1 = configStr1;
	}

	public String getBusno() {
		return busno;
	}

	public void setBusno(String busno) {
		this.busno = busno;
	}

	public File getFile0() {
		return file0;
	}

	public void setFile0(File file0) {
		this.file0 = file0;
	}

	public File getFile1() {
		return file1;
	}

	public void setFile1(File file1) {
		this.file1 = file1;
	}

	public String getFile0FileName() {
		return file0FileName;
	}

	public void setFile0FileName(String file0FileName) {
		this.file0FileName = file0FileName;
	}

	public String getFile0ContentType() {
		return file0ContentType;
	}

	public void setFile0ContentType(String file0ContentType) {
		this.file0ContentType = file0ContentType;
	}

	public String getFile1FileName() {
		return file1FileName;
	}

	public void setFile1FileName(String file1FileName) {
		this.file1FileName = file1FileName;
	}

	public String getFile1ContentType() {
		return file1ContentType;
	}

	public void setFile1ContentType(String file1ContentType) {
		this.file1ContentType = file1ContentType;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getPictaskid() {
		return pictaskid;
	}

	public void setPictaskid(String pictaskid) {
		this.pictaskid = pictaskid;
	}

	public List<BmsEcnTime> getNewbmsecntimelist() {
		return newbmsecntimelist;
	}

	public void setNewbmsecntimelist(List<BmsEcnTime> newbmsecntimelist) {
		this.newbmsecntimelist = newbmsecntimelist;
	}

	public String getConfigStr() {
		return configStr;
	}

	public void setConfigStr(String configStr) {
		this.configStr = configStr;
	}

	public String getFactoryid() {
		return factoryid;
	}

	public void setFactoryid(String factoryid) {
		this.factoryid = factoryid;
	}

	public String getTaskid() {
		return taskid;
	}

	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}

	public int getTotalDepartment() {
		return totalDepartment;
	}

	public void setTotalDepartment(int totalDepartment) {
		this.totalDepartment = totalDepartment;
	}

	public IEcnTaskDao getEcnDocumentTaskDao() {
		return ecnDocumentTaskDao;
	}

	public void setEcnDocumentTaskDao(IEcnTaskDao ecnDocumentTaskDao) {
		this.ecnDocumentTaskDao = ecnDocumentTaskDao;
	}

	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public TransactionTemplate getTransactionTemplate() {
		return transactionTemplate;
	}

	public void setTransactionTemplate(TransactionTemplate transactionTemplate) {
		transactionTemplate.setIsolationLevel(TransactionDefinition.ISOLATION_REPEATABLE_READ);
		this.transactionTemplate = transactionTemplate;
	}

	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public String getWhflag() {
		return whflag;
	}

	public void setWhflag(String whflag) {
		this.whflag = whflag;
	}
}
