package com.byd.bms.report.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import net.sf.json.JSONObject;

import com.byd.bms.plan.dao.IPlanDao;
import com.byd.bms.report.dao.IReportDao;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;

public class PlanReportAction extends BaseAction<Object> {

	private static final long serialVersionUID = -5678166042927677993L;
	private String conditions;
	private IReportDao reportDao;
	private Map<String,Object> result;
	
	public String getConditions() {
		return conditions;
	}
	public void setConditions(String conditions) {
		this.conditions = conditions;
	}
	public IReportDao getReportDao() {
		return reportDao;
	}
	public void setReportDao(IReportDao reportDao) {
		this.reportDao = reportDao;
	}
	public Map<String, Object> getResult() {
		return result;
	}
	public void setResult(Map<String, Object> result) {
		this.result = result;
	}
	
	
	/**
	 * 工厂计划达成率
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws ParseException 
	 */
	public String factoryRateReport() throws UnsupportedEncodingException, ParseException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		
		if(flag!=null &&flag.equals("view")){
			return "factoryRateReport";	
		}else{
			String start_date = request.getParameter("start_date");
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date startDate = sdf.parse(start_date);
			Calendar calendar = Calendar.getInstance(); //得到日历
			calendar.setTime(startDate);//把当前时间赋给日历
			calendar.add(Calendar.DAY_OF_MONTH, -1);  //设置为前一天
			startDate = calendar.getTime();   //得到前一天的时间
			String b_start_date = sdf.format(startDate)+" 17:10:00";    //格式化前一天
			
			String end_date = request.getParameter("end_date");
			String b_end_date =end_date + " 17:10:00";  
			
			Map<String,Object> queryMap = new HashMap<String, Object>();
			queryMap.put("start_date", start_date);
			queryMap.put("end_date", end_date);
			queryMap.put("b_start_date", b_start_date);
			queryMap.put("b_end_date", b_end_date);
			List<Map<String,String>> list =  reportDao.getPlanRate(queryMap);
			
			List<Map> result = new ArrayList<Map>();
			String last_factory_name = "";
			List alist = new ArrayList();
			java.text.DecimalFormat   df = new   java.text.DecimalFormat("##.##"); 
			for(int i = 0;i<list.size();i++){
				Map map = list.get(i);
				if(last_factory_name.equals(map.get("factory_name"))){
					Map dataMap = new HashMap();
					//System.out.println("---->" + map.get("key_name").toString() + " -- " + map.get("key_name").toString().indexOf("下线"));
					if(map.get("key_name").toString().equals("入库")){
						dataMap.put("workshop", map.get("key_name").toString());
					}else{
						dataMap.put("workshop", map.get("key_name").toString().substring(0, map.get("key_name").toString().indexOf("下线")));
					}
					
					
					if(map.get("sum_plan_qty").equals("0")&&map.get("real_qty").equals("0")){
						//System.out.println(Double.parseDouble(map.get("real_qty").toString())/Integer.parseInt(map.get("sum_plan_qty").toString()));
						dataMap.put("plan_rate", null);
						//alist.add(Double.parseDouble(df.format(Double.parseDouble(map.get("real_qty").toString())/Integer.parseInt(map.get("sum_plan_qty").toString())*100)));
						
					}else if(map.get("sum_plan_qty").equals("0")&& !map.get("real_qty").equals("0")){
						//alist.add(0);
						dataMap.put("plan_rate", 100);
					}else{
						dataMap.put("plan_rate", Double.parseDouble(df.format(Double.parseDouble(map.get("real_qty").toString())/Integer.parseInt(map.get("sum_plan_qty").toString())*100)));
					}
					alist.add(dataMap);
				}else{
					alist = new ArrayList();
					Map dataMap = new HashMap();
					if(map.get("key_name").toString().equals("入库")){
						dataMap.put("workshop", map.get("key_name").toString());
					}else{
						dataMap.put("workshop", map.get("key_name").toString().substring(0, map.get("key_name").toString().indexOf("下线")));
					}
					//dataMap.put("workshop", map.get("key_name").toString().substring(0, map.get("key_name").toString().indexOf("下线")));
					if(map.get("sum_plan_qty").equals("0")&&map.get("real_qty").equals("0")){
						//System.out.println(Double.parseDouble(map.get("real_qty").toString())/Integer.parseInt(map.get("sum_plan_qty").toString()));
						dataMap.put("plan_rate", null);
						//alist.add(Double.parseDouble(df.format(Double.parseDouble(map.get("real_qty").toString())/Integer.parseInt(map.get("sum_plan_qty").toString())*100)));
						
					}else if(map.get("sum_plan_qty").equals("0")&& !map.get("real_qty").equals("0")){
						//alist.add(0);
						dataMap.put("plan_rate", 100);
					}else{
						//System.out.println("---->" + map.get("key_name").toString() + "|" + map.get("real_qty")+ "|" + map.get("sum_plan_qty").toString());
						dataMap.put("plan_rate", Double.parseDouble(df.format(Double.parseDouble(map.get("real_qty").toString())/Integer.parseInt(map.get("sum_plan_qty").toString())*100)));
					}
					alist.add(dataMap);
					
					Map result_map = new HashMap();
					last_factory_name = String.valueOf(map.get("factory_name"));
					result_map.put("factory_name", last_factory_name);
					result_map.put("data", alist);
					result.add(result_map);
				}
				
			}
			for(int i = 0;i<result.size();i++){
				List myList = (List) result.get(i).get("data");
				int iflag = 0;
				for(int j = 0;j<myList.size();j++){
					if(myList.get(j).toString().equals("0") || myList.get(j).toString().equals("0.0")){
						iflag++;
					}
				}
				if(iflag == myList.size()){
					result.remove(i);
				}
			}
			
			
			Map<String, Object> last_map = new HashMap<String, Object>();  
			last_map.put( "success", true);  
			last_map.put( "message", "查询成功"); 
			last_map.put( "data",result);
	        JSONObject jsonObject = JSONObject.fromObject(last_map);
			try {
				out = response.getWriter();
			} catch (IOException e) {
				e.printStackTrace();
			}
			out.print(jsonObject);
			
			return null;
		}
	}
	
	/**
	 * 车间计划达成率
	 * @return
	 * @throws UnsupportedEncodingException 
	 * @throws ParseException 
	 */
	public String workshopRateReport() throws UnsupportedEncodingException, ParseException{
		HttpServletRequest request= ServletActionContext.getRequest();
		request.setCharacterEncoding("UTF-8");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = null;
		String flag = request.getParameter("flag");
		
		if(flag!=null &&flag.equals("view")){
			return "workshopRateReport";	
		}else{
			Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("factory_id", request.getParameter("factory_id"));
			conditionMap.put("start_date", request.getParameter("start_date"));
			conditionMap.put("end_date", request.getParameter("end_date"));
			//计划数量
			List datalist=new ArrayList();
			datalist = reportDao.queryPlanQty(conditionMap);
			
			List plan_code=new ArrayList();
			java.text.DecimalFormat   df = new   java.text.DecimalFormat("##.##"); 
			for (int i = 0; i < datalist.size(); i++) {			
		        Map<String,Object> resultMap=new HashMap<String,Object>();
				resultMap = (Map<String, Object>) datalist.get(i);
				
				Map<String,Object> conditionMap2=new HashMap<String,Object>();
				conditionMap2.put("factory_id", request.getParameter("factory_id"));
				
				String start_date = request.getParameter("start_date");
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date startDate = sdf.parse(start_date);
				Calendar calendar = Calendar.getInstance(); //得到日历
				calendar.setTime(startDate);//把当前时间赋给日历
				calendar.add(Calendar.DAY_OF_MONTH, -1);  //设置为前一天
				startDate = calendar.getTime();   //得到前一天的时间
				start_date = sdf.format(startDate)+" 17:10:00";    //格式化前一天
 
				conditionMap2.put("start_date", start_date);
				conditionMap2.put("end_date", request.getParameter("end_date").concat(" 17:10:00"));
				
				Map<String,Object> conditionMap3=new HashMap<String,Object>();
				Map<String,Object> conditionMap4=new HashMap<String,Object>();
				
				if (resultMap.get("key_name").equals("焊装下线"))conditionMap2.put("workshop", "welding_offline_date");
				if (resultMap.get("key_name").equals("涂装下线"))conditionMap2.put("workshop", "painting_offline_date");
				if (resultMap.get("key_name").equals("底盘下线"))conditionMap2.put("workshop", "chassis_offline_date");
				if (resultMap.get("key_name").equals("总装下线"))conditionMap2.put("workshop", "assembly_offline_date");
				if (resultMap.get("key_name").equals("入库"))conditionMap2.put("workshop", "warehousing_date");
				
				if (resultMap.get("key_name").equals("部件下线")){
					conditionMap3.put("factory_id", request.getParameter("factory_id"));
					conditionMap3.put("start_date", request.getParameter("start_date").replaceAll("-", ""));
					conditionMap3.put("end_date", request.getParameter("end_date").replaceAll("-", ""));
					conditionMap3.put("workshop", "offline_real_qty");
			
					int realNum = reportDao.getPlanPartsRealCount(conditionMap3);
					resultMap.put("real_qty", realNum);
					double count = Double.parseDouble(realNum+"");
					int plan_qty = Integer.parseInt(resultMap.get("plan_qty").toString());
					double rate = Double.parseDouble(df.format(count/plan_qty*100));
					resultMap.put("rate", rate);
					
				}else if (resultMap.get("key_name").equals("自制件下线")){
					conditionMap4.put("factory_id", request.getParameter("factory_id"));
					conditionMap4.put("start_date", request.getParameter("start_date"));
					conditionMap4.put("end_date", request.getParameter("end_date"));
					int realNum = reportDao.getPlanZzjRealCount(conditionMap4);
					resultMap.put("real_qty", realNum);
					double count = Double.parseDouble(realNum+"");
					int plan_qty = Integer.parseInt(resultMap.get("plan_qty").toString());
					double rate = Double.parseDouble(df.format(count/plan_qty*100));
					resultMap.put("rate", rate);
					
				}else{
					plan_code.add(conditionMap2);
				}	
			}
			//完成数量
			List result=new ArrayList();
			if(plan_code.size()>0){
				result = reportDao.getPlanSearchRealCount(plan_code);
			}
			
			int x =0;
			for (int i = 0; i < datalist.size(); i++) {
				
				Map<String,Object> resultMap=new HashMap<String,Object>();
				resultMap = (Map<String, Object>) datalist.get(i);
				if (!resultMap.get("key_name").equals("部件下线")&&!resultMap.get("key_name").equals("自制件下线")){
					Map<String,Long> resultMap2=new HashMap<String,Long>();
					resultMap2 = (Map<String, Long>) result.get(x);	
					
					resultMap.put("real_qty", resultMap2.get("count"));
					double count = Double.parseDouble(resultMap2.get("count").toString());
					int plan_qty = Integer.parseInt(resultMap.get("plan_qty").toString());
					double rate = (plan_qty==0&&count>0.0)?100:((plan_qty==0&&count==0.0)?null:Double.parseDouble(df.format(count/plan_qty*100)));
					resultMap.put("rate", rate);
					System.out.println(resultMap.get("key_name")+" 达成率："+rate);
					x++;
				}
				
			}
			
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

}
