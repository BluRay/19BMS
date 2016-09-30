package com.byd.bms.production.action;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.xwork.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.util.ArrayUtil;
import org.apache.struts2.ServletActionContext;

import com.byd.bms.production.dao.IProductionDao;
import com.byd.bms.production.entity.BmsBus;
import com.byd.bms.production.entity.BmsProductionException;
import com.byd.bms.production.entity.BmsProductionHours;
import com.byd.bms.production.entity.BmsProductionPartsFinish;
import com.byd.bms.production.entity.BmsProductionWorkshopSupply;
import com.byd.bms.production.entity.BmsScan;
import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;
import com.byd.bms.util.entity.Pager;
import com.opensymphony.xwork2.util.ArrayUtils;

public class ProductionAction extends BaseAction<Object>{
	
	private static final long serialVersionUID = 1L;
	static Logger logger = Logger.getLogger(ProductionAction.class.getName());
	private IProductionDao productionDao;
	private Pager pager;
	private File file;					//获取上传文件
    private String fileFileName;		//获取上传文件名称
    private String fileContentType;		//获取上传文件类型
    private String order_no;
	private String conditions;// 页面传输参数
	private String workshop;
	private Map<String, Object> result;// struts2 json 返回
	/*private List<BmsBus> buslist;*/

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public String getOrder_no() {
		return order_no;
	}

	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public IProductionDao getProductionDao() {
		return productionDao;
	}

	public void setProductionDao(IProductionDao productionDao) {
		this.productionDao = productionDao;
	}
	
	public String getWorkshop() {
		return workshop;
	}

	public void setWorkshop(String workshop) {
		this.workshop = workshop;
	}

	public String index(){
		return "index";
	}
	
	public String exceptionindex(){
		return "exceptionindex";
	}
	
	public String execution(){
		//TODO 判断用户是否具有相应工厂和车间的权限
		return "execution";
	}
	
	public String exception(){
		return "exception";
	}
	
	public String workshopsupply(){
		return "workshopsupply";
	}
	
	public String partsfinish(){
		return "partsfinish";
	}
	
	public String customernumber(){
		return "customernumber";
	}
	
	public String productionhours(){
		return "productionhours";
	}
	
	public String bodycolor(){
		return "bodycolor";
	}
	
	//add by wuxiao 2016/4/25
	public String productionCCC(){
		return "productionCCC";
	}
	public String productionDate(){
		return "productionDate";
	}
	//add by wuxiao end
	
	public String busseats(){
		return "busseats";
	}
	
	public String monitorindex(){
		return "monitorindex";
	}
	
	public String monitorworkshop(){
		String page="";
		if("welding".equals(this.workshop)){
			page= "monitorworkshop_welding";
		}
		if("assembly".equals(this.workshop)){
			page= "monitorworkshop_assembly";
		}
		return page;
	}
	
	public String productionsearch(){
		return "productionsearch";
	}
	
	public String productionsearchbusinfo(){
		return "productionsearchbusinfo";
	}
	
	public String certification(){
		return "certification";
	}
	
	public Pager getPager() {
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}
	
	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public Map<String, Object> getResult() {
		return result;
	}

	public void setResult(Map<String, Object> result) {
		this.result = result;
	}

/*	public List<BmsBus> getBuslist() {
		return buslist;
	}

	public void setBuslist(List<BmsBus> buslist) {
		this.buslist = buslist;
	}*/
	

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String exportCertification() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::exportCertification " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		//HttpServletResponse response = ServletActionContext.getResponse();
		//PrintWriter out = null;
		
		String factory_id = request.getParameter("factory_id");
		String order_no = request.getParameter("order_no");
		String bus_number = request.getParameter("bus_number");
		String cer_chassis_date = request.getParameter("cer_chassis_date");
		Map<String,Object> queryMap=new HashMap<String,Object>();
		String[] busNumberList = bus_number.split(",");
		int bus_number_size = 1;
		if (bus_number.equals(""))bus_number_size=0;
		queryMap.put("factory_id", factory_id);
		queryMap.put("order_no", order_no);
		queryMap.put("bus_number", busNumberList);
		queryMap.put("bus_number_size", bus_number_size);
		
		List datalist=new ArrayList();
		datalist = productionDao.getCertificationList(queryMap);
		
		StringBuffer strBuffer = new StringBuffer();  
		strBuffer.append("序列,底盘型号,整车型号,电机型号,VIN,底盘生产日期,整车生产日期,电机号(左),电机号(右),颜色,座位数,合格证编号,生产基地\n");
		
		for(int i=0;i<datalist.size();i++){
			Map<String,String> cerMap = (Map<String, String>) datalist.get(i);
			if (cerMap.get("productive_date")!= null){
				strBuffer.append((i+1)+","+cerMap.get("chassis_model")+","+cerMap.get("vehicle_model") 
						+ "," + cerMap.get("motor_model")+","+cerMap.get("vin")+","+cer_chassis_date 
						+","+cerMap.get("productive_date")+","+cerMap.get("left_motor_number")+","+cerMap.get("right_motor_number")
						+","+cerMap.get("bus_color")+","+cerMap.get("bus_seats")+","+cerMap.get("left_motor_number")+"/"+cerMap.get("right_motor_number")
						+","+cerMap.get("factory_name") + "\n");
			}
//			PlanVIN vin = (PlanVIN)datalist.get(i);
//			String left_motor_number = (vin.getLeft_motor_number() == null)?"":vin.getLeft_motor_number();
//			String right_motor_number = (vin.getRight_motor_number() == null)?"":vin.getRight_motor_number();
//			String bus_number = (vin.getBus_number() == null)?"":vin.getBus_number();
//			strBuffer.append((i+1)+","+vin.getVin()+","+ left_motor_number +","+ right_motor_number + "," + bus_number +",,\n"); 
		
		}
		HttpServletResponse response = ServletActionContext.getResponse();  
        response.setHeader("Content-Disposition","attachment;filename=exportCertification.csv");  
        response.setContentType("APPLICATION/OCTET-STREAM;charset=GBK");  
        try {  
        	response.setCharacterEncoding("GBK");
            response.getWriter().print(strBuffer.toString());  
            response.getWriter().flush();  
        } catch (IOException e) {
            e.printStackTrace();  
        }finally{  
            try {  
                response.getWriter().close();  
            } catch (IOException e) {
                e.printStackTrace();  
            }  
        }  
        return NONE;   		
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getCertificationList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getCertificationList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		String factory_id = request.getParameter("factory_id");
		String order_no = request.getParameter("order_no");
		String bus_number = request.getParameter("bus_number");
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		String[] busNumberList = bus_number.split("\n");
		int bus_number_size = 1;
		if (bus_number.equals(""))bus_number_size=0;
		logger.info("-->bus_number = " + bus_number);
		logger.info("-->bus_number_size = " + bus_number_size);
		queryMap.put("factory_id", factory_id);
		queryMap.put("order_no", order_no);
		queryMap.put("bus_number", busNumberList);
		queryMap.put("bus_number_size", bus_number_size);		
		if (pager != null){
			queryMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			queryMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = productionDao.getCertificationList(queryMap);
		int totalCount = 0;//productionDao.getCertificationCount(queryMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		out = response.getWriter();
		out.print(json);
		return null;
	}

	public String addBusSeats() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::addBusSeats " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		String factory_id = request.getParameter("factory_id");
		String order_no = request.getParameter("order_no");
		String new_all_bus = request.getParameter("new_all_bus");
		String new_bus_number = request.getParameter("new_bus_number");
		String new_bus_seats = request.getParameter("new_bus_seats");
		logger.info("---->new_bus_number = " + new_bus_number);
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (new_all_bus.equals("1")){
			//修改全部车号
			queryMap.put("factory_id", factory_id);
			queryMap.put("order_no", order_no);
			queryMap.put("bus_seats", new_bus_seats);
			productionDao.updateBusSeatsByOrder(queryMap);
		}else{
			String[] busNumberList = new_bus_number.split("\n");
			queryMap.put("factory_id", factory_id);
			queryMap.put("bus_number", busNumberList);
			queryMap.put("order_no", order_no);
			queryMap.put("bus_seats", new_bus_seats);
			productionDao.updateBusSeatsByBusNumber(queryMap);
		}
		
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getBusSeatsList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getBusColorList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id")!= null) queryMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no")!= null) queryMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("bus_type_id")!= null) queryMap.put("bus_type_id", request.getParameter("bus_type_id"));
		if (request.getParameter("bus_number")!= null) queryMap.put("bus_number", request.getParameter("bus_number"));
		if (pager != null){
			queryMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			queryMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = productionDao.getBusSeatsList(queryMap);
		int totalCount = productionDao.getBusSeatsListCount(queryMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String addBuscolor() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::addBuscolor " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		String factory_id = request.getParameter("factory_id");
		String order_no = request.getParameter("order_no");
		String new_all_bus = request.getParameter("new_all_bus");
		String new_bus_number = request.getParameter("new_bus_number");
		String new_bus_color = request.getParameter("new_bus_color");
		logger.info("---->new_bus_number = " + new_bus_number);
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (new_all_bus.equals("1")){
			//修改全部车号
			queryMap.put("factory_id", factory_id);
			queryMap.put("order_no", order_no);
			queryMap.put("bus_color", new_bus_color);
			productionDao.updateBusColorByOrder(queryMap);
		}else{
			String[] busNumberList = new_bus_number.split("\n");
			queryMap.put("factory_id", factory_id);
			queryMap.put("bus_number", busNumberList);
			queryMap.put("order_no", order_no);
			queryMap.put("bus_color", new_bus_color);
			productionDao.updateBusColorByBusNumber(queryMap);
		}
		
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getBusColorList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getBusColorList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id")!= null) queryMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no")!= null) queryMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("bus_type_id")!= null) queryMap.put("bus_type_id", request.getParameter("bus_type_id"));
		if (request.getParameter("bus_number")!= null) queryMap.put("bus_number", request.getParameter("bus_number"));
		if (pager != null){
			queryMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			queryMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = productionDao.getBusColorList(queryMap);
		int totalCount = productionDao.getBusColorListCount(queryMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	//add by wuxiao 2016/4/25
	public String addBusCCC() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::addBusCCC " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		String factory_id = request.getParameter("factory_id");
		String order_no = request.getParameter("order_no");
		String new_all_bus = request.getParameter("new_all_bus");
		String new_bus_number = request.getParameter("new_bus_number");
		String new_bus_ccczs_date = request.getParameter("new_bus_ccczs_date");
		String new_bus_dpgg_date = request.getParameter("new_bus_dpgg_date");
		String new_bus_zcgg_date = request.getParameter("new_bus_zcgg_date");
		logger.info("---->new_bus_number = " + new_bus_number);
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (new_all_bus.equals("1")){
			//修改全部车号
			queryMap.put("factory_id", factory_id);
			queryMap.put("order_no", order_no);
			queryMap.put("ccczs_date", new_bus_ccczs_date);
			queryMap.put("dpgg_date", new_bus_dpgg_date);
			queryMap.put("zcgg_date", new_bus_zcgg_date);
			productionDao.updateBusCCCByOrder(queryMap);
		}else{
			String[] busNumberList = new_bus_number.split("\n");
			queryMap.put("factory_id", factory_id);
			queryMap.put("bus_number", busNumberList);
			queryMap.put("order_no", order_no);
			queryMap.put("ccczs_date", new_bus_ccczs_date);
			queryMap.put("dpgg_date", new_bus_dpgg_date);
			queryMap.put("zcgg_date", new_bus_zcgg_date);
			productionDao.updateBusCCCByBusNumber(queryMap);
		}
		
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getBusCCCList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getBusCCCList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id")!= null) queryMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no")!= null) queryMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("bus_type_id")!= null) queryMap.put("bus_type_id", request.getParameter("bus_type_id"));
		if (request.getParameter("bus_number")!= null) queryMap.put("bus_number", request.getParameter("bus_number"));
		if (pager != null){
			queryMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			queryMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = productionDao.getBusCCCList(queryMap);
		int totalCount = productionDao.getBusCCCListCount(queryMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String addProductionDate() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::addBusCCC " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		String factory_id = request.getParameter("factory_id");
		String order_no = request.getParameter("order_no");
		String new_all_bus = request.getParameter("new_all_bus");
		String new_bus_number = request.getParameter("new_bus_number");
		String new_dp_production_date = request.getParameter("new_dp_production_date");
		String new_zc_production_date = request.getParameter("new_zc_production_date");
		
		logger.info("---->new_bus_number = " + new_bus_number);
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (new_all_bus.equals("1")){
			//修改全部车号
			queryMap.put("factory_id", factory_id);
			queryMap.put("order_no", order_no);
			queryMap.put("dp_production_date", new_dp_production_date);
			queryMap.put("zc_production_date", new_zc_production_date);
			productionDao.updateProductionDateByOrder(queryMap);
		}else{
			String[] busNumberList = new_bus_number.split("\n");
			queryMap.put("factory_id", factory_id);
			queryMap.put("bus_number", busNumberList);
			queryMap.put("order_no", order_no);
			queryMap.put("dp_production_date", new_dp_production_date);
			queryMap.put("zc_production_date", new_zc_production_date);
			productionDao.updateProductionDateByBusNumber(queryMap);
		}
		
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getProductionDateList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getProductionDateList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id")!= null) queryMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no")!= null) queryMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("bus_type_id")!= null) queryMap.put("bus_type_id", request.getParameter("bus_type_id"));
		if (request.getParameter("bus_number")!= null) queryMap.put("bus_number", request.getParameter("bus_number"));
		if (pager != null){
			queryMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			queryMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = productionDao.getProductionDateList(queryMap);
		int totalCount = productionDao.getProductionDateListCount(queryMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		out = response.getWriter();
		out.print(json);
		return null;
	}//add by wuxiao end
	
	public String editProductionHours() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::editProductionHours " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		String order_hours = request.getParameter("order_hours");
		//162020150731|35,1,2,3,4,5,30,6,7,8,9,10,11,12,13;
		String[] configStrArray=order_hours.split(";");
		for(int i = 0; i < configStrArray.length; i++) {
			String[] configArray = configStrArray[i].split(",");
			logger.info("---->" + configArray[0]);
			BmsProductionHours hours = new BmsProductionHours();
			//hours.setFactory_id(factory_id);
			//hours.setWorkshop_id(workshop_id);
			//hours.setDate(date);
			//hours.setOrder_id(Integer.valueOf(configArray[0]));
			hours.setOrder_no(configArray[0]);
			hours.setEmployees(Integer.valueOf(configArray[1]));
			hours.setArrivals_qty(Integer.valueOf(configArray[2]));
			hours.setWorking_hours(Integer.valueOf(configArray[3]));
			hours.setWait_employees(Integer.valueOf(configArray[4]));
			hours.setWait_hours(Integer.valueOf(configArray[5]));
			hours.setWait_process_id(Integer.valueOf(configArray[6]));
			hours.setWait_reason(configArray[7]);
			hours.setWait_department(configArray[8]);
			hours.setWait_user(configArray[9]);
			hours.setPause_employees(Integer.valueOf(configArray[10]));
			hours.setPause_hours(Integer.valueOf(configArray[11]));
			hours.setPause_reason(configArray[12]);
			hours.setPause_department(configArray[13]);
			hours.setPause_user(configArray[14]);
			hours.setEdit_date(curTime);
			hours.setEditor_id(userid);
			hours.setId(Integer.valueOf(configArray[15]));
			//productionDao.insertProductionHours(hours);
			productionDao.editProductionHours(hours);			
		}
				
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getProductionHoursInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getProductionHoursInfo " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;		
		
		List datalist=new ArrayList();
		datalist = productionDao.getProductionHoursInfo(Integer.parseInt(request.getParameter("hours_id")));
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getProductionHoursList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getProductionHoursList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;		
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id")!= null) queryMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("workshop_id") != null) queryMap.put("workshop_id", request.getParameter("workshop_id"));
		if (request.getParameter("date_start") != null) queryMap.put("date_start", request.getParameter("date_start"));
		if (request.getParameter("date_end") != null) queryMap.put("date_end", request.getParameter("date_end"));
		if (pager != null){
			queryMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			queryMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = productionDao.getProductionHoursList(queryMap);
		int totalCount = productionDao.getProductionHoursListCount(queryMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		out = response.getWriter();
		out.print(json);
		return null;		
	}
	
	public String addProductionHours() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::addProductionHours " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;	
		
		int factory_id = Integer.valueOf(request.getParameter("factory_id"));
		int workshop_id = Integer.valueOf(request.getParameter("workshop_id"));
		String date = request.getParameter("date");
		String order_hours = request.getParameter("order_hours");
		logger.info("---->factory_id = " + factory_id + workshop_id + date + "|" + order_hours);
		//162020150731|35,1,2,3,4,5,30,6,7,8,9,10,11,12,13;
		String[] configStrArray=order_hours.split(";");
		for(int i = 0; i < configStrArray.length; i++) {
			String[] configArray = configStrArray[i].split(",");
			logger.info("---->" + configArray[0]);
			BmsProductionHours hours = new BmsProductionHours();
			hours.setFactory_id(factory_id);
			hours.setWorkshop_id(workshop_id);
			hours.setDate(date);
			//hours.setOrder_id(Integer.valueOf(configArray[0]));
			hours.setOrder_no(configArray[0]);
			hours.setEmployees(Integer.valueOf(configArray[1]));
			hours.setArrivals_qty(Integer.valueOf(configArray[2]));
			hours.setWorking_hours(Integer.valueOf(configArray[3]));
			hours.setWait_employees(Integer.valueOf(configArray[4]));
			hours.setWait_hours(Integer.valueOf(configArray[5]));
			hours.setWait_process_id(Integer.valueOf(configArray[6]));
			hours.setWait_reason(configArray[7]);
			hours.setWait_department(configArray[8]);
			hours.setWait_user(configArray[9]);
			hours.setPause_employees(Integer.valueOf(configArray[10]));
			hours.setPause_hours(Integer.valueOf(configArray[11]));
			hours.setPause_reason(configArray[12]);
			hours.setPause_department(configArray[13]);
			hours.setPause_user(configArray[14]);
			hours.setEdit_date(curTime);
			hours.setEditor_id(userid);
			//productionDao.insertProductionHours(hours);
			int result = productionDao.updateProductionHours(hours);
			logger.info("---->result = " + result);
			if(result == 0){
				productionDao.insertProductionHours(hours);
			}
		}
		
		//List datalist=new ArrayList();
		//datalist = productionDao.getBusCustomerNumberInfo(Integer.parseInt(request.getParameter("bus_id")));
		
		JSONObject json = Util.dataListToJson(true,"操作成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings("resource")
	public String upload(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::upload " + curTime + " " + userid);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String path = ServletActionContext.getServletContext().getRealPath("/images/upload/productionImportCusNum/");  
    	// 写到指定的路径中  
    	File savefile = new File(path);
    	// 如果指定的路径没有就创建  
    	if (!savefile.exists()) {  
    		savefile.mkdirs();  
    	}
    	try {
			BufferedReader br = new BufferedReader(new FileReader(file));
			String line = "";
			int lineCount = 0;
			
			while ((line = br.readLine()) != null) {
				if (lineCount > 0){
					String[] vinArray=line.split(",",-1);
					//验证数据
					if(vinArray.length != 3){
						out.print("第"+(lineCount+1)+"行数据有误，请检察后重新上传！<a href=\"javascript:history.back();\">返回</a>");
						return null;
					}					
				}
				lineCount ++;
			}
			
			//验证通过保存上传文件并开始写入数据库
			String userName=getUser().getDisplay_name();
			String fileFileName = userName + curTime + ".csv";
			FileUtils.copyFile(file, new File(savefile, fileFileName));
			
			lineCount = 0;
			BufferedReader br2 = new BufferedReader(new FileReader(file));
			while ((line = br2.readLine()) != null) {
				logger.info("---->验证通过开始更新数据库" + lineCount);
				if (lineCount > 0){
					String[] vinArray=line.split(",",-1);
					Map<String,Object> queryMap=new HashMap<String,Object>();
					queryMap.put("order_no", vinArray[0]);
					this.order_no = vinArray[0];
					queryMap.put("busNumber", vinArray[1]);
					queryMap.put("customerNumber", vinArray[2]);
					productionDao.updateBusCustomerNumber(queryMap);
				}
				lineCount++;
			}			
			
    	}catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}				
		return "importcustomernumberSuccess";
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getBusCustomerNumberInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getBusCustomerNumberInfo " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;		
		
		List datalist=new ArrayList();
		datalist = productionDao.getBusCustomerNumberInfo(Integer.parseInt(request.getParameter("bus_id")));
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getBusCustomNumberList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getBusCustomNumberList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id")!= null) queryMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != null) queryMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("bus_number") != null) queryMap.put("bus_number", request.getParameter("bus_number"));
		if (request.getParameter("customer_number") != null) queryMap.put("customer_number", request.getParameter("customer_number"));
		if (pager != null){
			queryMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			queryMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = productionDao.getBusCustomerNumberList(queryMap);
		int totalCount = productionDao.getBusCustomerNumberListCount(queryMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		out = response.getWriter();
		out.print(json);
		return null;
		
	}
	
	public String editBusCustomerNumber() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::editBusCustomerNumber " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (request.getParameter("order_no")!= null) queryMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("busNumber")!= null) queryMap.put("busNumber", request.getParameter("busNumber"));
		if (request.getParameter("customerNumber")!= null) queryMap.put("customerNumber", request.getParameter("customerNumber"));
		
		int result = productionDao.updateBusCustomerNumber(queryMap);
		logger.info("---->updateBusCustomerNumber result = " + result );
		JSONObject json = null;
		if (result == 1){
			json = Util.dataListToJson(true,"新增自编号成功",null,null);
		}else{
			json = Util.dataListToJson(false,"操作失败，请检查数据",null,null);
		}		
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String editPartsFinishInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::editPartsFinishInfo " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		BmsProductionPartsFinish partsFinish = new BmsProductionPartsFinish();
		partsFinish.setId(Integer.parseInt(request.getParameter("id")));
		partsFinish.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
		partsFinish.setOrder_no(request.getParameter("order_no"));
		partsFinish.setParts_name(request.getParameter("parts_name"));
		partsFinish.setDate(request.getParameter("date"));
		partsFinish.setOnline_real_qty(Integer.parseInt(request.getParameter("online_real_qty")));
		partsFinish.setOffline_real_qty(Integer.parseInt(request.getParameter("offline_real_qty")));
		partsFinish.setEditor_id(userid);
		partsFinish.setEdit_date(curTime);
		
		productionDao.editPartsfinishInfo(partsFinish);
		
		JSONObject json = Util.dataListToJson(true,"编辑成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;	
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getPartsFinishInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getPartsFinishInfo " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		List datalist=new ArrayList();
		datalist = productionDao.getPartsfinishInfo(Integer.parseInt(request.getParameter("partsFinish_id")));
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getPartsFinishList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getPartsFinishList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id")!= null) queryMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != null) queryMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("parts_name") != null) queryMap.put("parts_name", request.getParameter("parts_name"));
		if (request.getParameter("date_start") != null) queryMap.put("date_start", request.getParameter("date_start"));
		if (request.getParameter("date_end") != null) queryMap.put("date_end", request.getParameter("date_end"));
		if (pager != null){
			queryMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			queryMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = productionDao.getPartsfinishList(queryMap);
		int totalCount = productionDao.getPartsfinishListCount(queryMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String addPartsFinish() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::addPartsFinish " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		BmsProductionPartsFinish partsFinish = new BmsProductionPartsFinish();
		partsFinish.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
		partsFinish.setOrder_no(request.getParameter("order_no"));
		partsFinish.setParts_name(request.getParameter("parts_name"));
		partsFinish.setDate(request.getParameter("date"));
		partsFinish.setOnline_real_qty(Integer.parseInt(request.getParameter("online_real_qty")));
		partsFinish.setOffline_real_qty(Integer.parseInt(request.getParameter("offline_real_qty")));
		partsFinish.setEditor_id(userid);
		partsFinish.setEdit_date(curTime);
		productionDao.insertPartsfinish(partsFinish);
		
		JSONObject json = Util.dataListToJson(true,"新增成功",null,null);		
		out = response.getWriter();
		out.print(json);
		return null;
	}
	/**
	 * 根据订单编号、工厂、零部件id查询该零部件上下线累计数量以及工厂订单生产数量
	 * @author xjw
	 * @return
	 * @throws IOException
	 */
	public String getPartsFinishCount() throws IOException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String, Object> queryMap=new HashMap<String,Object>();
		queryMap.put("factory_id", request.getParameter("factory_id"));
		queryMap.put("order_no", request.getParameter("order_no"));
		queryMap.put("parts_id", request.getParameter("parts_id"));
		List<Map<String,String>> totalcount=productionDao.selectPartsFinishTotal(queryMap);
		JSONObject json = null;
		json = Util.dataListToJson(true,"查询成功",totalcount,null);
		
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String editWorkShopSupplyInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::editWorkShopSupplyInfo " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		BmsProductionWorkshopSupply workshopSupply = new BmsProductionWorkshopSupply();
		workshopSupply.setId(Integer.parseInt(request.getParameter("id")));
		workshopSupply.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
		workshopSupply.setOrder_no(request.getParameter("order_no"));
		workshopSupply.setWorkshop_name(request.getParameter("supply_workshop"));
		workshopSupply.setReceive_workshop(request.getParameter("receive_workshop"));
		workshopSupply.setQuantity(Integer.parseInt(request.getParameter("quantity")));
		workshopSupply.setSupply_date(request.getParameter("supply_date"));
		workshopSupply.setEditor_id(userid);
		workshopSupply.setEdit_date(curTime);
		productionDao.editWorkshopSupplyInfo(workshopSupply);
		
		JSONObject json = Util.dataListToJson(true,"编辑成功",null,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getWorkShopSupplyInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getWorkShopSupplyInfo " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		List datalist=new ArrayList();
		datalist = productionDao.getWorkshopSupplyInfo(Integer.parseInt(request.getParameter("workshopSupply_id")));
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		out = response.getWriter();
		out.print(json);
		return null;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getWorkShopSupplyList() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getWorkShopSupplyList " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String,Object> queryMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id") != null) queryMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != null) queryMap.put("order_no", request.getParameter("order_no"));
		if (request.getParameter("workshop") != null) queryMap.put("workshop", request.getParameter("workshop"));
		if (request.getParameter("acptworkshop") != null) queryMap.put("acptworkshop", request.getParameter("acptworkshop"));
		if (request.getParameter("date_start") != null) queryMap.put("date_start", request.getParameter("date_start"));
		if (request.getParameter("date_end") != null) queryMap.put("date_end", request.getParameter("date_end"));
		
		if (pager != null){
			queryMap.put("offset", (pager.getCurPage()-1)*pager.getPageSize());
			queryMap.put("pageSize", pager.getPageSize());
		}
		
		List datalist=new ArrayList();
		datalist = productionDao.getWorkshopSupplyList(queryMap);
		int totalCount = productionDao.getWorkshopSupplyListCount(queryMap);
		
		Map<String, String> page_map = new HashMap<String, String>();  
		if (pager != null){
			pager.setTotalCount(totalCount);			
			page_map.put("totalCount", String.valueOf(pager.getTotalCount()));
			page_map.put("curPage", String.valueOf(pager.getCurPage()));
			page_map.put("pageSize", String.valueOf(pager.getPageSize()));
		}
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,page_map);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String addWorkshopSupply() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::addWorkshopSupply " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		
		PrintWriter out = null;
		BmsProductionWorkshopSupply workshopSupply = new BmsProductionWorkshopSupply();
		workshopSupply.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
		workshopSupply.setOrder_no(request.getParameter("order_no"));
		workshopSupply.setWorkshop_name(request.getParameter("workshop"));
		workshopSupply.setReceive_workshop(request.getParameter("receiveworkshop"));
		workshopSupply.setQuantity(Integer.parseInt(request.getParameter("quantity")));
		workshopSupply.setSupply_date(request.getParameter("supply_date"));
		workshopSupply.setEditor_id(userid);
		workshopSupply.setEdit_date(curTime);
		int result = productionDao.insertWorkshopSupply(workshopSupply);
		logger.info("---->result = " + result);
		JSONObject json = null;
		if(result >0){
			json = Util.dataListToJson(true,"新增成功",null,null);
		}else{
			json = Util.dataListToJson(false,"新增失败",null,null);
		}
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String getSupplyTotalCount() throws IOException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		Map<String, Object> queryMap=new HashMap<String,Object>();
		queryMap.put("factory_id", request.getParameter("factory_id"));
		queryMap.put("order_no", request.getParameter("order_no"));
		queryMap.put("workshop", request.getParameter("workshop"));
		queryMap.put("acptworkshop", request.getParameter("acptworkshop"));
		List<Map<String,String>> totalcount=productionDao.getSupplyTotalCount(queryMap);
		JSONObject json = null;
		json = Util.dataListToJson(true,"查询成功",totalcount,null);
		
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	public String enterException() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::enterException " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		
		String bus_number = request.getParameter("bus_number");
		//logger.info("---->bus_number = " + bus_number);
		//String[] bus_numberArray=bus_number.split("\\|");
		JSONArray busarr=JSONArray.fromObject(request.getParameter("bus_list"));

		for(Iterator it=busarr.iterator();it.hasNext();){
			//logger.info("---->bus_numberArray = " + bus_numberArray[i] + " ");
			JSONObject bus=(JSONObject) it.next();
			String cur_bus_number = bus.getString("bus_number");
			BmsProductionException exception = new BmsProductionException();
			exception.setFactory_id(Integer.parseInt(request.getParameter("factory_id")));
			exception.setWorkshop_id(Integer.parseInt(request.getParameter("workshop_id")));
			exception.setLine_id(Integer.parseInt(request.getParameter("line_id")));
			exception.setProcess_id(Integer.parseInt(request.getParameter("process_id")));
			exception.setBus_number(cur_bus_number);
			exception.setReason_type_id(Integer.parseInt(request.getParameter("reason_type_id")));
			if(request.getParameter("lack_reason_id") != "") exception.setLack_reason_id(Integer.parseInt(request.getParameter("lack_reason_id")));
			exception.setStart_time(request.getParameter("start_time"));
			exception.setSeverity_level(Integer.parseInt(request.getParameter("severity_level")));
			exception.setDetailed_reasons(request.getParameter("detailed_reasons"));
			exception.setEditor_id(Integer.parseInt(request.getParameter("editor_id")));
			exception.setException_type("0");
			exception.setOrder_list(bus.getString("order_no"));
			exception.setOrder_desc(bus.getString("order_desc"));
			productionDao.insertProductionException(exception);
		}	
		
		JSONObject json = Util.dataListToJson(true,"故障录入成功",null);
		out = response.getWriter();
		out.print(json);
		return null;
	}
	
	/*@SuppressWarnings({ "rawtypes", "unchecked" })
	public String enterExecution() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::enterExecution " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		BmsScan scan = new BmsScan();
		scan.setBus_number(request.getParameter("bus_number"));
		scan.setProcess_id(Integer.parseInt(request.getParameter("process_id")));
		scan.setFactory_name(request.getParameter("factory_name"));
		scan.setWorkshop_name(request.getParameter("workshop_name"));
		scan.setLine_name(request.getParameter("line_name"));
		scan.setProcess_name(request.getParameter("process_name"));
		scan.setScanner_id(Integer.parseInt(request.getParameter("scanner_id")));
		scan.setScan_time(curTime);
		scan.setRepair(request.getParameter("repair"));
		scan.setEcn(request.getParameter("ecn"));
		scan.setOnlineflag(request.getParameter("onlineflag"));
		scan.setOfflineflag(request.getParameter("offlineflag"));
		int factory_id = Integer.parseInt(request.getParameter("factory_id"));
		String cur_key_name = "";
		//获取当前车号当前所处工序及状态 latest_process_id
		//车间扫描顺序：焊装-玻璃钢-涂装-底盘-总装-检测线（调试区的上下线工序属于检测线的内部工序，
		//系统设置-工序 调试区上下线工序不标识计划节点（上，下线））-成品库
		
		//01 当前工序是否为上线 如果为车间上线节点，刚判断车间次序
		int curProcessId = Integer.parseInt(request.getParameter("process_id"));
		String bus_number = request.getParameter("bus_number");
		String workshop_name = request.getParameter("workshop_name");
		List datalist=new ArrayList();
		
		Map<String,Object> qMap=new HashMap<String,Object>();
		qMap.put("factory_id", factory_id);
		qMap.put("processId", curProcessId);
		datalist = productionDao.getScanProcessInfo(qMap);
		//logger.info(datalist.size());
		
		Map<String,String> ProcessInfoMap = (Map<String, String>) datalist.get(0);
		logger.info("-->process_name = " + ProcessInfoMap.get("process_name") 
				+ "-->key_name = " + ProcessInfoMap.get("key_name") 
				+ "-->preposing_workshop_name = " + ProcessInfoMap.get("preposing_workshop_name"));
		
		if(ProcessInfoMap.get("key_name") != null)cur_key_name = ProcessInfoMap.get("key_name");
		
		if(cur_key_name.equals("底盘下线")){
			//底盘下线前需验证是否绑定VIN号
			String vin = productionDao.getVinByBusNumber(bus_number);
			if ((vin == null)||(vin.equals(""))){
				JSONObject json = Util.dataListToJson(false,bus_number+"还没有绑定VIN号！不能下底盘线",null);
				out = response.getWriter();
				out.print(json);
				return null;
			}
			String left_moto = productionDao.getLeftMotoByBusNumber(bus_number);
			if ((left_moto == null)||(left_moto.equals(""))){
				JSONObject json = Util.dataListToJson(false,bus_number+"还没有绑定左电机号！不能下底盘线",null);
				out = response.getWriter();
				out.print(json);
				return null;
			}
			String right_moto = productionDao.getRightMotoByBusNumber(bus_number);
			if ((right_moto == null)||(left_moto.equals(""))){
				JSONObject json = Util.dataListToJson(false,bus_number+"还没有绑定右电机号！不能下底盘线",null);
				out = response.getWriter();
				out.print(json);
				return null;
			}
		}
		
		if (ProcessInfoMap.get("preposing_workshop_name") !=null){
			//上一扫描节点必需为 【preposing_workshop_name + 下线】
			//查询【此车号】最后一条扫描记录
			List datalist2=new ArrayList();
			datalist2 = productionDao.getLastScanInfo(bus_number);
			logger.info("----datalist2.size() = " + datalist2.size());
			if (datalist2.size()>0){
				if((scan.getRepair().equals("1"))||(scan.getEcn().equals("1"))){
				}else{
					
					Map<String,String> LastScanInfoMap = (Map<String, String>) datalist2.get(0);
					logger.info("-->key_name = " + LastScanInfoMap.get("key_name"));
					if(LastScanInfoMap.get("key_name") == null){
						
						//add by wuxiao 2015/9/22 start
						List dl=new ArrayList();
						Map<String,Object> queryMap=new HashMap<String,Object>();
						queryMap.put("bus_number", bus_number);
						queryMap.put("workshop_name", workshop_name);
						dl = productionDao.getOfflineScanInfo(queryMap);
						if(dl.size()>0){
							Map<String,Object> offline = new HashMap<String,Object>();
							offline = (Map<String, Object>)dl.get(0);
							if(offline.get("key_name").equals(ProcessInfoMap.get("preposing_workshop_name") + "下线")){
								logger.info("-->通过");
							}else{
								logger.info("-->不通过");
								JSONObject json = Util.dataListToJson(false,"当前上线节点的上一工序应为" + ProcessInfoMap.get("preposing_workshop_name") + "下线",null);
								out = response.getWriter();
								out.print(json);
								return null;
							}
						}else{
						//add by wuxiao 2015/9/22 end
						
						logger.info("-->不通过");
						JSONObject json = Util.dataListToJson(false,"当前上线节点的上一工序应为" + ProcessInfoMap.get("preposing_workshop_name") + "下线",null);
						out = response.getWriter();
						out.print(json);
						return null;
						}
					}
					else if (LastScanInfoMap.get("key_name").equals(ProcessInfoMap.get("preposing_workshop_name") + "下线")){
						logger.info("-->通过");
					}else{
						logger.info("-->不通过");
						JSONObject json = Util.dataListToJson(false,"当前上线节点的上一工序应为" + ProcessInfoMap.get("preposing_workshop_name") + "下线",null);
						out = response.getWriter();
						out.print(json);
						return null;
					}
				}
			}else{
				if (!request.getParameter("workshop_name").equals("焊装")){
					JSONObject json = Util.dataListToJson(false,"车辆应先进入焊装工序",null);
					out = response.getWriter();
					out.print(json);
					return null;
				}else if((scan.getRepair().equals("1"))||(scan.getEcn().equals("1"))){
					JSONObject json = Util.dataListToJson(false,"车辆应先进入正常工序",null);
					out = response.getWriter();
					out.print(json);
					return null;
				}
			}
		}else{
			//02当前工序不是上线，判断【最后一个上线节点】是否为当前车间的上线节点
			String key_name = request.getParameter("workshop_name") + "上线";
			logger.info("-->key_name = " + key_name);
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("bus_number", bus_number);
			conditionMap.put("key_name", key_name);
			conditionMap.put("line_id", request.getParameter("line_id"));
			List datalist2=new ArrayList();
			datalist2 = productionDao.getScanOnline(conditionMap);
			if (datalist2.size() <= 0){
				if (key_name.equals("玻璃钢上线")){
					//玻璃钢车间无上线--160316 增加校验必需先通过“焊装下线”
					String key_name2 = "焊装下线";
					Map<String,Object> conditionMap2=new HashMap<String,Object>();
					conditionMap2.put("bus_number", bus_number);
					conditionMap2.put("key_name", key_name2);
					//conditionMap2.put("line_id", request.getParameter("line_id"));
					List datalist3=new ArrayList();
					datalist3 = productionDao.getScanOnlineFiberglass(conditionMap2);
					if (datalist3.size() <= 0){
						JSONObject json = Util.dataListToJson(false,"当前节点扫描前应先通过当前线别的" + key_name2,null);
						out = response.getWriter();
						out.print(json);
						return null;
					}
					
				}else{
					JSONObject json = Util.dataListToJson(false,"当前节点扫描前应先通过当前线别的" + key_name,null);
					out = response.getWriter();
					out.print(json);
					return null;
				}
					
			}
			//
			List datalist3=new ArrayList();
			datalist3 = productionDao.getLastScanInfo(bus_number);
			Map<String,String> LastScanInfoMap = (Map<String, String>) datalist3.get(0);
			if ((scan.getRepair().equals("0")) && (scan.getEcn().equals("0"))){
				//正常扫描
				if (key_name.equals("玻璃钢上线")){
					//玻璃钢车间无上线
				}else{
					if(!workshop_name.equals(LastScanInfoMap.get("workshop_name"))){
						JSONObject json = Util.dataListToJson(false,"当前车辆已进入" + LastScanInfoMap.get("workshop_name"),null);
						out = response.getWriter();
						out.print(json);
						return null;
					}
				}
			}
		} 		
		
		//验证是否可以扫描：如果为正常，则不能重复，如果为返修或技改，则必须先上线才能下线
		//查询【此车号】【此节点】最后一条扫描记录
		BmsScan last_scan = new BmsScan();
		//logger.info(request.getParameter("bus_number") + "----" + request.getParameter("process_id"));
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("bus_number", request.getParameter("bus_number"));
		conditionMap.put("process_id", request.getParameter("process_id"));
		last_scan = productionDao.getBmsLastScanInfo(conditionMap);

		Map<String,Object> busStatusMap=new HashMap<String,Object>();
		busStatusMap.put("bus_number", request.getParameter("bus_number"));
		busStatusMap.put("latest_process_id", request.getParameter("process_id"));
		busStatusMap.put("production_status", "0");
		if ((scan.getRepair().equals("0")) && (scan.getEcn().equals("0"))){
			//正常扫描
			if (last_scan != null){
				if (last_scan.getRepair().equals("0") && last_scan.getEcn().equals("0")){
					JSONObject json = Util.dataListToJson(false,"正常生产模式不能重复扫描",null);
					out = response.getWriter();
					out.print(json);
					return null;
				}else if (last_scan.getRepair().equals("1") && last_scan.getOfflineflag().equals("0")){
					JSONObject json = Util.dataListToJson(false,"返修模式离线前不能重复扫描",null);
					out = response.getWriter();
					out.print(json);
					return null;
				}else if (last_scan.getEcn().equals("1") && last_scan.getOfflineflag().equals("0")){
					JSONObject json = Util.dataListToJson(false,"技改模式离线前不能重复扫描",null);
					out = response.getWriter();
					out.print(json);
					return null;
				}else{
					productionDao.insertBmsScan(scan);
				}
				
			}else{
				productionDao.insertBmsScan(scan);
			}
		}else{
			if (scan.getRepair().equals("1")){
				//返修 先上线才能下线
				if(last_scan == null){
					if(scan.getOfflineflag().equals("1")){
						List datalist3=new ArrayList();
						datalist3 = productionDao.getAllLastScanInfo(bus_number);
						Map<String,String> LastScanInfoMap = (Map<String, String>) datalist3.get(0);
						if(String.valueOf(LastScanInfoMap.get("process_id")).equals(curProcessId)){
							if(!((LastScanInfoMap.get("repair").equals("1"))&&(LastScanInfoMap.get("onlineflag").equals("0")))){
								JSONObject json = Util.dataListToJson(false,"返修下线前需先上线",null);
								out = response.getWriter();
								out.print(json);
								return null;
							}
						}else{
							JSONObject json = Util.dataListToJson(false,"车辆不处于当前节点",null);
							out = response.getWriter();
							out.print(json);
							return null;
						}
					}
					productionDao.insertBmsScan(scan);
				}else{
					if (last_scan.getRepair().equals("1") && last_scan.getOfflineflag().equals("1") && scan.getOfflineflag().equals("1")){
						
						JSONObject json = Util.dataListToJson(false,"返修模式不能重复下线",null);
						out = response.getWriter();
						out.print(json);
						return null;
					}else if (last_scan.getRepair().equals("1") && last_scan.getOnlineflag().equals("1") && scan.getOnlineflag().equals("1")){
						JSONObject json = Util.dataListToJson(false,"返修模式不能重复上线",null);
						out = response.getWriter();
						out.print(json);
						return null;
					}else if (last_scan.getEcn().equals("1") && last_scan.getOnlineflag().equals("1")){
						JSONObject json = Util.dataListToJson(false,"技改模式不能进行返修",null);
						out = response.getWriter();
						out.print(json);
						return null;
					}else{
						productionDao.insertBmsScan(scan);
					}
				}					
				busStatusMap.put("production_status", "1");
			}else if (scan.getEcn().equals("1")){
				//技改
				if(last_scan == null){
					if(scan.getOfflineflag().equals("1")){
						List datalist3=new ArrayList();
						datalist3 = productionDao.getAllLastScanInfo(bus_number);
						Map<String,String> LastScanInfoMap = (Map<String, String>) datalist3.get(0);
						if(String.valueOf(LastScanInfoMap.get("process_id")).equals(curProcessId)){
							if(!((LastScanInfoMap.get("ecn").equals("1"))&&(LastScanInfoMap.get("onlineflag").equals("0")))){
								JSONObject json = Util.dataListToJson(false,"技改下线前需先上线",null);
								out = response.getWriter();
								out.print(json);
								return null;
							}
						}else{
							JSONObject json = Util.dataListToJson(false,"车辆不处于当前节点",null);
							out = response.getWriter();
							out.print(json);
							return null;
						}
					}
					productionDao.insertBmsScan(scan);
				}else{
					if (last_scan.getEcn().equals("1") && last_scan.getOfflineflag().equals("1") && scan.getOfflineflag().equals("1")){
						JSONObject json = Util.dataListToJson(false,"技改模式不能重复下线",null);
						out = response.getWriter();
						out.print(json);
						return null;
					}else if (last_scan.getEcn().equals("1") && last_scan.getOnlineflag().equals("1") && scan.getOnlineflag().equals("1")){
						JSONObject json = Util.dataListToJson(false,"技改模式不能重复上线",null);
						out = response.getWriter();
						out.print(json);
						return null;
					}else if (last_scan.getRepair().equals("1") && last_scan.getOnlineflag().equals("1")){
						JSONObject json = Util.dataListToJson(false,"返修模式不能进行技改",null);
						out = response.getWriter();
						out.print(json);
						return null;
					}else{
						productionDao.insertBmsScan(scan);
					}
				}
				busStatusMap.put("production_status", "2");
			}
		}
		
		logger.info("---->" + scan.getBus_number());
		productionDao.updateBusScanStatus(busStatusMap);	//更新车辆状态
		
 
		if(cur_key_name.equals("焊装上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "welding_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("焊装下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "welding_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("玻璃钢下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "fiberglass_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("涂装上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "painting_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("涂装下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "painting_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("底盘上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "chassis_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("底盘下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "chassis_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("总装上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "assembly_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("总装下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "assembly_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("调试区上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "debugarea_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("调试区下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "debugarea_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("检测线上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "testline_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("检测线下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "testline_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("成品库上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "warehousing_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", bus_number);
			productionDao.updateBusProcessDate(updateMap);
		}
		
		JSONObject json = Util.dataListToJson(true,"扫描成功",null);
		out = response.getWriter();
		out.print(json);	
		return null;
	}*/
	
	/**
	 * @author xjw 
	 * @throws IOException 
	 * @since 160512
	 * @logic 扫描控制:
		1.底盘下线需要判断是否绑定了VIN，左右电机号
		2.除返修、技改外正常扫描不能重复扫
		3.返修下线、技改下线 必须先返修上线、技改上线
		4.返修不能重复扫描返修下线、返修上线
		5.技改不能重复扫描技改上线、技改下线
		6.返修模式不能扫技改、技改模式不能扫返修
		7.正常扫描安照扫描逻辑，判断前一个节点是否已经扫描；不能跨线扫描
		8.插入扫描记录
		9.更新bus表production status ：0正常生产、1返修、2技改
		10.更新bus表计划节点的上下线时间
		11.扫描必须先经过正常扫描才能技改和返修
		12.增加关键零部件扫描
	 **/
	public String enterExecution() throws IOException{		
		// 获取当前节点信息，车辆信息
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::enterExecution " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		BmsScan scan = new BmsScan();
		scan.setBus_number(request.getParameter("bus_number"));
		scan.setProcess_id(Integer.parseInt(request.getParameter("process_id")));
		scan.setFactory_name(request.getParameter("factory_name"));
		scan.setWorkshop_name(request.getParameter("workshop_name"));
		scan.setLine_name(request.getParameter("line_name"));
		scan.setProcess_name(request.getParameter("process_name"));
		scan.setScanner_id(Integer.parseInt(request.getParameter("scanner_id")));
		scan.setScan_time(curTime);
		scan.setRepair(request.getParameter("repair"));
		scan.setEcn(request.getParameter("ecn"));
		scan.setOnlineflag(request.getParameter("onlineflag"));
		scan.setOfflineflag(request.getParameter("offlineflag"));
		int factory_id = Integer.parseInt(request.getParameter("factory_id"));
		int workshop_id= Integer.parseInt(request.getParameter("workshop_id"));
		int line_id=Integer.parseInt(request.getParameter("line_id"));
		String orderType=request.getParameter("orderType");
		String cur_key_name = request.getParameter("cur_key_name");
		String exec_process_name=request.getParameter("exec_process_name");
		//车辆目前状态：0 标示正常 1 返修 2 技改
		String bus_production_status=request.getParameter("bus_production_status");
		String return_msg="";
		
		//车辆信息map 用来扫描后更新bus表对应字段信息
		Map<String,Object> busStatusMap=new HashMap<String,Object>();
		busStatusMap.put("bus_number", request.getParameter("bus_number"));
		busStatusMap.put("latest_process_id", request.getParameter("process_id"));
		
		//判断是否正常扫描
		if("0".equals(scan.getRepair())&&"0".equals(scan.getEcn())){//正常扫描
			//根据订单类型、工厂获取扫描逻辑配置
			String scanConfig=productionDao.queryScanConfig(scan.getFactory_name(),orderType);
			if(scanConfig==null||scanConfig.isEmpty()){
				return_msg="还没有配置扫描逻辑，无法扫描！";
				JSONObject json = Util.dataListToJson(false,return_msg,null);
				out.print(json);
				out.flush();
				return null;
			}
				List<String> scanConfigList=Arrays.asList(scanConfig.split(","));			
			
			int index=scanConfigList.indexOf(cur_key_name);//index=-1 标示该节点为非计划节点;
			Map<String,Object> queryMap=new HashMap<String,Object>();
			queryMap.put("bus_number", scan.getBus_number());
			queryMap.put("process_id", scan.getProcess_id());
			queryMap.put("repair", "0");
			queryMap.put("ecn", "0");
			//查询该车辆在该节点最后一次正常扫描信息，存在扫描信息表示已扫描
			BmsScan lastScanInfo=productionDao.getBmsLastScanInfo_F(queryMap);
			Map<String,Object> q_onlineMap=null; //节点上线扫描查询条件
			//正常生产模式下不允许重复扫描
			if(lastScanInfo!=null){
				return_msg="该车辆已扫描过该节点,请不要重复扫描！";
				JSONObject json = Util.dataListToJson(false,return_msg,null);
				out.print(json);
				out.flush();
				return null;
			}
			
			if(cur_key_name.equals("底盘下线")){
				//底盘下线前需验证是否绑定VIN号
				String vin = productionDao.getVinByBusNumber(scan.getBus_number());
				if ((vin == null)||(vin.equals(""))){
					JSONObject json = Util.dataListToJson(false,scan.getBus_number()+"还没有绑定VIN号！不能下底盘线",null);
					out = response.getWriter();
					out.print(json);
					return null;
				}
				String left_moto = productionDao.getLeftMotoByBusNumber(scan.getBus_number());
				if ((left_moto == null)||(left_moto.equals(""))){
					JSONObject json = Util.dataListToJson(false,scan.getBus_number()+"还没有绑定左电机号！不能下底盘线",null);
					out = response.getWriter();
					out.print(json);
					return null;
				}
				String right_moto = productionDao.getRightMotoByBusNumber(scan.getBus_number());
				if ((right_moto == null)||(left_moto.equals(""))){
					JSONObject json = Util.dataListToJson(false,scan.getBus_number()+"还没有绑定右电机号！不能下底盘线",null);
					out = response.getWriter();
					out.print(json);
					return null;
				}
			}
	
			//非计划节点，只需要判断该车间是否已上线;计划节点不在配置列表中不允许扫描
			if(index==-1){	
				if(productionDao.queryPlanNodeByProcess(scan.getProcess_id()).size()==0){//非计划节点
					q_onlineMap=new HashMap<String,Object>();
					q_onlineMap.put("bus_number", scan.getBus_number());
					//q_onlineMap.put("line_id", line_id);
					q_onlineMap.put("key_name", scan.getWorkshop_name()+"上线");
					List<Map<String, String>> scaninfolist=productionDao.getScanOnline(q_onlineMap);
					if(scaninfolist.size()==0){
						return_msg="该车辆未在"+scan.getWorkshop_name()+"上线，请先在"+scan.getWorkshop_name()+"上线！";
						JSONObject json = Util.dataListToJson(false,return_msg,null);
						out.print(json);
						out.flush();
						return null;
					}
				}else{//计划节点
					return_msg="该车辆不允许扫描"+cur_key_name+"("+scan.getProcess_name()+")";
					JSONObject json = Util.dataListToJson(false,return_msg,null);
					out.print(json);
					out.flush();
					return null;
				}
				
			}
			
			//计划节点不是在扫描逻辑配置的第一个节点，判断扫描逻辑配置中的前一节点是否上线;计划节点不能重复扫描
			if(index>=0){
				q_onlineMap=new HashMap<String,Object>();
				if(index>0){//不是扫描逻辑配置的第一个节点
					String pre_key_name=scanConfigList.get(index-1);//获取扫描配置中该节点的前一个节点
					q_onlineMap.put("bus_number", scan.getBus_number());
					//q_onlineMap.put("line_id", line_id);
					q_onlineMap.put("key_name", pre_key_name);
					List<Map<String, String>> scaninfolist=productionDao.getScanOnline(q_onlineMap);
					if(scaninfolist.size()==0){
						return_msg="该车辆未扫描"+pre_key_name+"，请先扫描"+pre_key_name+"！";
						JSONObject json = Util.dataListToJson(false,return_msg,null);
						out.print(json);
						out.flush();
						return null;
					}
				}			
				
				Map<String,Object> plan_nodeMap=new HashMap<String,Object>();
				plan_nodeMap.put("bus_number", scan.getBus_number());
				plan_nodeMap.put("key_name", cur_key_name);
				
				List<Map<String, String>> scaninfolist_plannode=productionDao.getScanOnline(plan_nodeMap);
				
				if(scaninfolist_plannode.size()>0){
					return_msg="该车辆已经在"+scan.getWorkshop_name()+"上线,请不要重复扫描！";
					JSONObject json = Util.dataListToJson(false,return_msg,null);
					out.print(json);
					out.flush();
					return null;
				}				
			}
	
			busStatusMap.put("production_status", "0");//车辆状态：正常扫描			
			
		}else {//技改和返修扫描;
			Map<String,Object> queryMap=null;
			List<Map<String, String>> scaninfolist=null;
			
			if("1".equals(bus_production_status)){//车辆目前处于返修状态
				
				BmsScan lastScanInfo=null;
				//返修模式不能扫技改
				if("1".equals(scan.getEcn())){
					return_msg="该车辆返修未下线，请先扫描返修下线！";
					JSONObject json = Util.dataListToJson(false,return_msg,null);
					out.print(json);
					out.flush();
					return null;
				}
				//返修上线：判断是否重复扫描
				if("1".equals(scan.getOnlineflag())){	
					queryMap=new HashMap<String,Object>();
					queryMap.put("bus_number", scan.getBus_number());
					queryMap.put("repair", "1");
					queryMap.put("onlineflag", "1");
					//查询该车辆最后一次返修上线扫描信息，存在扫描信息表示已扫描
					lastScanInfo=productionDao.getBmsLastScanInfo_F(queryMap);
					if(lastScanInfo!=null){
						return_msg="该车辆已返修上线，不能重复扫描！";
						JSONObject json = Util.dataListToJson(false,return_msg,null);
						out.print(json);
						out.flush();
						return null;
					}		
				}
				//返修下线:判断是否重复扫描；必须先返修上线
				if("1".equals(scan.getOfflineflag())){
					queryMap=new HashMap<String,Object>();
					queryMap.put("bus_number", scan.getBus_number());
					queryMap.put("repair", "1");
					queryMap.put("offlineflag", "1");
					//查询该车辆最后一次返修下线扫描信息，存在扫描信息表示已扫描
					lastScanInfo=productionDao.getBmsLastScanInfo_F(queryMap);

					if(lastScanInfo!=null){
						return_msg="该车辆已返修下线，不能重复扫描！";
						JSONObject json = Util.dataListToJson(false,return_msg,null);
						out.print(json);
						out.flush();
						return null;
					}
					Map<String,Object> online_qMap=new HashMap<String,Object>();
					online_qMap=new HashMap<String,Object>();
					online_qMap.put("bus_number", scan.getBus_number());
					online_qMap.put("repair", "1");
					online_qMap.put("onlineflag", "1");
					//查询该车辆最后一次返修上线扫描信息，存在扫描信息表示已扫描
					BmsScan onlineScanInfo=productionDao.getBmsLastScanInfo_F(online_qMap);
					if(onlineScanInfo ==null){
						return_msg="该车辆未返修上线,请先扫描返修上线！";
						JSONObject json = Util.dataListToJson(false,return_msg,null);
						out.print(json);
						out.flush();
						return null;
					}	
				}
				busStatusMap.put("production_status", "1");//车辆状态：返修
			}
			
			if("2".equals(bus_production_status)){//车辆目前处于技改状态
				BmsScan lastScanInfo=null;
				//技改模式不能扫返修
				if("1".equals(scan.getRepair())){
					return_msg="该车辆技改未下线，请先扫描技改下线！";
					JSONObject json = Util.dataListToJson(false,return_msg,null);
					out.print(json);
					out.flush();
					return null;
				}
				//技改上线：判断是否重复扫描
				if("1".equals(scan.getOnlineflag())){			
					queryMap.put("bus_number", scan.getBus_number());
					queryMap.put("ecn", "1");
					queryMap.put("onlineflag", "1");
					//查询该车辆最后一次技改上线扫描信息，存在扫描信息表示已扫描
					lastScanInfo=productionDao.getBmsLastScanInfo_F(queryMap);
					if(lastScanInfo!=null){
						return_msg="该车辆已技改上线，不能重复扫描！";
						JSONObject json = Util.dataListToJson(false,return_msg,null);
						out.print(json);
						out.flush();
						return null;
					}		
				}
				//技改下线:判断是否重复扫描；必须先技改上线
				if("1".equals(scan.getOfflineflag())){
					queryMap=new HashMap<String,Object>();
					queryMap.put("bus_number", scan.getBus_number());
					queryMap.put("ecn", "1");
					queryMap.put("offlineflag", "1");
					//查询该车辆最后一次技改下线扫描信息，存在扫描信息表示已扫描
					lastScanInfo=productionDao.getBmsLastScanInfo_F(queryMap);

					if(lastScanInfo!=null){
						return_msg="该车辆已技改下线，不能重复扫描！";
						JSONObject json = Util.dataListToJson(false,return_msg,null);
						out.print(json);
						out.flush();
						return null;
					}
					Map<String,Object> online_qMap=new HashMap<String,Object>();
					online_qMap=new HashMap<String,Object>();
					online_qMap.put("bus_number", scan.getBus_number());
					online_qMap.put("ecn", "1");
					online_qMap.put("onlineflag", "1");
					//查询该车辆最后一次返修技改扫描信息，存在扫描信息表示已扫描
					BmsScan onlineScanInfo=productionDao.getBmsLastScanInfo_F(online_qMap);
					if(onlineScanInfo ==null){
						return_msg="该车辆未技改上线,请先扫描技改上线！";
						JSONObject json = Util.dataListToJson(false,return_msg,null);
						out.print(json);
						out.flush();
						return null;
					}
				}
				busStatusMap.put("production_status", "2");//车辆状态：返修
			}	
		}
		productionDao.insertBmsScan(scan);//插入扫描信息
		productionDao.updateBusScanStatus(busStatusMap);	//更新车辆状态
		if(cur_key_name.equals("焊装上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "welding_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("焊装下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "welding_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("玻璃钢下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "fiberglass_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("涂装上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "painting_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("涂装下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "painting_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("底盘上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "chassis_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("底盘下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "chassis_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("总装上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "assembly_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("总装下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "assembly_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("调试区上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "debugarea_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("调试区下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "debugarea_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("检测线上线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "testline_online_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("检测线下线")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "testline_offline_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}else if(cur_key_name.equals("入库")){
			Map<String,Object> updateMap=new HashMap<String,Object>();
			updateMap.put("scan_process", "warehousing_date");
			updateMap.put("scan_time", curTime);
			updateMap.put("bus_number", scan.getBus_number());
			productionDao.updateBusProcessDate(updateMap);
		}
		
		//关键零部件扫描录入
		JSONArray jsa=JSONArray.fromObject(request.getParameter("parts_list"));
		List<Map<String,Object>> partsList=JSONArray.toList(jsa, Map.class);
		for(Map<String, Object> m:partsList){
			m.put("factory_id", factory_id);
			m.put("workshop_id", workshop_id);
			m.put("editor_id", userid);
			m.put("edit_date", curTime);
			m.put("bus_number", scan.getBus_number());
		}
		//存储关键零部件扫描信息
		if(partsList.size()>0){
			productionDao.savePartsInfo(partsList);
		}
		
		JSONObject json = Util.dataListToJson(true,"扫描成功",null);
		out.print(json);	
		out.flush();
		return null;
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String validateBusInfo() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::validateBusInfo " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		BmsBus bus = new BmsBus();
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();		
		conditionMap.put("bus_number", request.getParameter("bus_number"));
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		bus = productionDao.getBmsBusInfo(conditionMap);
		List datalist=new ArrayList();		
		datalist.add(0, bus);
		
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	/**
	 * @author xjw
	 * 根据bus_number、process_name查询关键零部件列表
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String getPartsList() throws UnsupportedEncodingException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		BmsBus bus = new BmsBus();
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();		
		//根据车号查询产品追踪卡模板id
		Integer tmpid=productionDao.getTrackTplHeaderIdByBusNo(request.getParameter("bus_number"));
		int tplid=(null==tmpid)?0:tmpid;
		conditionMap.put("bus_number", request.getParameter("bus_number"));
		conditionMap.put("tpl_id", tplid);
		//conditionMap.put("process_name", request.getParameter("exec_process_name"));
		conditionMap.put("workshop_name", request.getParameter("workshop_name"));
		
		List datalist=new ArrayList();	
		//查询关键零部件列表
		datalist=productionDao.queryPartsList(conditionMap);		
		
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getKeyProcess() throws UnsupportedEncodingException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getWeldingProcess " + curTime + " " + userid);
		
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		//conditionMap.put("workshop_name", "焊装");
		List processInfo=new ArrayList();
		processInfo = productionDao.getKeyProcessInfo(conditionMap);
		
		JSONObject json = Util.dataListToJson(true,"查询成功",processInfo,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);	
		return null;
	}
	/**
	 * 车身号打印 added by xjw on 2015-08-03
	 */
	public String showBusNoPrint() {
		return "showPrintPage";
	}
	/**
	 * 
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public String getOrderConfigDoneQty(){
		result=new HashMap<String,Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			logger.info(key);
			conditionMap.put(key, jo.get(key));
		}
		
		int qty=productionDao.getOrderConfigDoneQty(conditionMap);
		result.put("configDoneQty", qty);
		return SUCCESS;
	}

	@SuppressWarnings("rawtypes")
	public String busNoPrint() {
		result = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			logger.info(key);
			conditionMap.put(key, jo.get(key));
		}
		int factoryId=getUser().getFactory_id();
		conditionMap.put("factoryId", factoryId);
		conditionMap.put("offset",
				(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", productionDao.getBusNoPrintList(conditionMap));
		int totalCount = productionDao.getBusNoPrintCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	public String afterBusNoPrint(){
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		result = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		String bus_no_list=jo.getString("busNoList");
		String changed_config_id=jo.getString("changedConfigId");
		List<String> busNoList= new ArrayList<String>();
		busNoList=Arrays.asList(bus_no_list.split(","));
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("busNoList", busNoList);
		conditionMap.put("changedConfigId",changed_config_id);
		conditionMap.put("printer", user_id);
		conditionMap.put("printDate", createTime);
		int i=productionDao.updateBusPrint(conditionMap);
		i=productionDao.updateBusConfig(conditionMap);
		if(i>0){
			result.put("success", true);
			result.put("message", "打印成功");
		}else{
			result.put("success", false);
			result.put("message", "打印失败");
		}
		return SUCCESS;
	}
	/**
	 * VIN码打印 added by xjw on 2015-08-05
	 */
	public String showVinPrint(){
		return "showVinPrint";
	}
	@SuppressWarnings("rawtypes")
	public String getVinPrintList(){
		result = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();	
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			logger.info(key);
			conditionMap.put(key, jo.get(key));
		}
		int factoryId=getUser().getFactory_id();
		conditionMap.put("factoryId", factoryId);
		conditionMap.put("offset",
				(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", productionDao.getVinPrintList(conditionMap));
		int totalCount = productionDao.getVinPrintCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	public String saveMotorNumber(){
		result = new HashMap<String, Object>();
		JSONArray jsonArray=JSONArray.fromObject(conditions);
		List<Map<String,Object>> buslist=new ArrayList<Map<String,Object>>();
		for(int i=0;i<jsonArray.size();i++){
			 JSONObject object = (JSONObject)jsonArray.get(i);		
			 Map<String, Object> map = (Map<String, Object>) object;
			 buslist.add(map);
		}
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("buslist", buslist);
		int a=productionDao.updateBusMotorNumber(condMap);
		int b=productionDao.updateVinMotorNumber(condMap);
		if(a>0&&b>0){
			result.put("success", true);
			result.put("message", "保存成功");
		}else{
			result.put("success", false);
			result.put("message", "打印失败");
		}
		//buslist=new HashMap<String,Object>();
		return SUCCESS;
	}
	public String afterVinPrint(){
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		result = new HashMap<String, Object>();
		List<String> vinList= new ArrayList<String>();
		vinList=Arrays.asList(conditions.split(","));
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("vinList", vinList);
		conditionMap.put("printer", user_id);
		conditionMap.put("printDate", createTime);
		int i=productionDao.updateVinPrint(conditionMap);
		if(i>0){
			result.put("success", true);
			result.put("message", "打印成功");
		}else{
			result.put("success", false);
			result.put("message", "打印失败");
		}
		return SUCCESS;
	}
	/**
	 * 铭牌打印 added by xjw on 2015-8-6
	 */
	public String showNameplatePrint(){
		return "showNameplatePrint";
	}
	@SuppressWarnings("rawtypes")
	public String getNameplatePrintList(){
		result = new HashMap<String, Object>();
		JSONObject jo = JSONObject.fromObject(conditions);
		Map<String, Object> conditionMap = new HashMap<String, Object>();	
		for (Iterator it = jo.keys(); it.hasNext();) {
			String key = (String) it.next();
			logger.info(key);
			conditionMap.put(key, jo.get(key));
		}
		int factoryId=getUser().getFactory_id();
		conditionMap.put("factoryId", factoryId);
		conditionMap.put("offset",
				(pager.getCurPage() - 1) * pager.getPageSize());
		conditionMap.put("pageSize", pager.getPageSize());
		result.put("dataList", productionDao.getNameplatePrintList(conditionMap));
		int totalCount = productionDao.getNameplatePrintCount(conditionMap);
		pager.setTotalCount(totalCount);
		result.put("pager", pager);
		return SUCCESS;
	}
	public String afterNameplatePrint(){
		String createTime=Util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		int user_id=getUser().getId();
		result = new HashMap<String, Object>();
		
		JSONObject jo = JSONObject.fromObject(conditions);
		String busNOListString=jo.getString("busNoList");
		/*String productDate=jo.getString("productDate");*/
		List<String> busNoList= new ArrayList<String>();
		busNoList=Arrays.asList(busNOListString.split(","));
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("busNoList", busNoList);
		conditionMap.put("printer", user_id);
		conditionMap.put("printDate", createTime);
		/*conditionMap.put("productDate", productDate);*/
		
		int i=productionDao.updateNameplatePrint(conditionMap);
		if(i>0){
			result.put("success", true);
			result.put("message", "打印成功");
		}else{
			result.put("success", false);
			result.put("message", "打印失败");
		}
		return SUCCESS;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getProductionSearch() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getProductionSearch " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		conditionMap.put("workshop_id", request.getParameter("workshop_id"));
		conditionMap.put("line_id", request.getParameter("line_id"));
		conditionMap.put("exception_type", request.getParameter("exception_type"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("cur_date", curTime.substring(0, 10));
		conditionMap.put("onoff", request.getParameter("onoff"));
		conditionMap.put("start_date", request.getParameter("start_date"));
		conditionMap.put("end_date", request.getParameter("end_date"));
		//conditionMap.put("cur_date", "2015-09-04");
		
		List datalist=new ArrayList();
		datalist = productionDao.getProductionSearch(conditionMap);
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getProductionSearchCarinfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getProductionSearchCarinfo " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		String wipFlg=request.getParameter("wip_flg");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		conditionMap.put("onoff", request.getParameter("onoff"));
		conditionMap.put("start_date", request.getParameter("start_date"));
		conditionMap.put("end_date", request.getParameter("end_date"));
		conditionMap.put("wip_flg", wipFlg);
		//conditionMap.put("workshop_id", request.getParameter("workshop_id"));
		if(request.getParameter("workshop").equals("全部")){
			conditionMap.put("workshop","");
		}else if(request.getParameter("workshop").equals("焊装")){
			conditionMap.put("workshop","welding");
		}else if(request.getParameter("workshop").equals("玻璃钢")){
			conditionMap.put("workshop","fiberglass");
		}else if(request.getParameter("workshop").equals("涂装")){
			conditionMap.put("workshop","painting");
		}else if(request.getParameter("workshop").equals("底盘")){
			conditionMap.put("workshop","chassis");
		}else if(request.getParameter("workshop").equals("总装")){
			conditionMap.put("workshop","assembly");
		}else if(request.getParameter("workshop").equals("调试区")){
			conditionMap.put("workshop","debugarea");
		}else if(request.getParameter("workshop").equals("检测线")){
			conditionMap.put("workshop","testline");
		}else if(request.getParameter("workshop").equals("成品库")){
			conditionMap.put("workshop","warehousing");
		}
		
		if(request.getParameter("line").equals("全部")){
			conditionMap.put("line","");
		}else{
			conditionMap.put("line",request.getParameter("line"));
		}		
		conditionMap.put("exception_type", request.getParameter("exception_type"));
		conditionMap.put("order_no", request.getParameter("order_no"));
		conditionMap.put("bus_number", request.getParameter("bus_number"));
		conditionMap.put("cur_date", curTime.substring(0, 10));
		//conditionMap.put("cur_date", "2015-09-04");
		
		List datalist=new ArrayList();
		if(StringUtils.isNotEmpty(wipFlg)){
			datalist=productionDao.getProductionWIPBusInfo(conditionMap);
		}else
		datalist = productionDao.getProductionSearchCarinfo(conditionMap);
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getProductionSearchBusInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getProductionSearchBusInfo " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		List datalist=new ArrayList();
		datalist = productionDao.getProductionSearchBusinfo(request.getParameter("bus_number"));
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getProductionSearchScan() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getProductionSearchScan " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		List datalist=new ArrayList();
		datalist = productionDao.getProductionSearchScan(request.getParameter("bus_number"));
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	//add by wuxiao 2015/9/30
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getNamePlateInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getNamePlateInfo " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		List datalist=new ArrayList();
		datalist = productionDao.getNamePlateInfo(request.getParameter("bus_number"));
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	/**
	 * 获取合格证信息
	 * @return
	 * @throws IOException
	 */
	public String getCertificationInfo() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getNamePlateInfo " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		List datalist=new ArrayList();
		datalist = productionDao.getCertificationInfo(request.getParameter("bus_number"));
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getProductionSearchException() throws IOException{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=getUser().getId();
		logger.info("---->ProductionAction::getProductionSearchException " + curTime + " " + userid);
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");		
		PrintWriter out = null;
		
		List datalist=new ArrayList();
		datalist = productionDao.getProductionSearchException(request.getParameter("bus_number"));
		
		JSONObject json = Util.dataListToJson(true,"查询成功",datalist,null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
	
}
