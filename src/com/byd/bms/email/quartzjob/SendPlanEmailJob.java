package com.byd.bms.email.quartzjob;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.byd.bms.email.dao.IEmailDao;
import com.byd.bms.plan.dao.IPlanDao;
import com.byd.bms.util.dao.ICommDao;
import com.byd.erpit.tools.email.EmailSender;
import com.byd.erpit.tools.email.EmailSender.TableTable;
import com.byd.erpit.tools.email.EmailSender.TableTable.TdTd;
import com.byd.erpit.tools.email.MailSenderServiceImp1;

public class SendPlanEmailJob  implements Job {
	
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		
	}

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	
	private IPlanDao planDao;

	public IPlanDao getPlanDao() {
		return planDao;
	}

	public void setPlanDao(IPlanDao planDao) {
		this.planDao = planDao;
	}
	
	private ICommDao commDao;

	public ICommDao getCommDao() {
		return commDao;
	}

	public void setCommDao(ICommDao commDao) {
		this.commDao = commDao;
	}
	
	private IEmailDao emailDao;
	public IEmailDao getEmailDao() {
		return emailDao;
	}

	public void setEmailDao(IEmailDao emailDao) {
		this.emailDao = emailDao;
	}

	/**
	 * 计划生产日报表
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void work() throws IllegalAccessException{
		Map emailConditionMap = new HashMap<String,Object>();
		emailConditionMap.put("email_type", "生产日报表");
		List<Map<String,Object>> emaildatalist=new ArrayList();
		emaildatalist = emailDao.getEmailTemplet(emailConditionMap);
		for(Map<String,Object> map : emaildatalist){
			sendPlanDayEmail(map);
		}
	}
	
	public void sendPlanDayEmail(Map<String,Object> m){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("factory_id", String.valueOf(m.get("factory_id")));
		conditionMap.put("order_no", "");
		String workshop = "";
		/*if (!request.getParameter("workshop").equals("全部")) workshop = request.getParameter("workshop");*/
		conditionMap.put("workshop", workshop);
		conditionMap.put("start_date", sdf.format(new Date()).replaceAll("-", ""));
		conditionMap.put("end_date", sdf.format(new Date()).replaceAll("-", ""));
		List<Map<String,String>> datalist=new ArrayList();
		datalist = planDao.getPlanSerach(conditionMap);
		
		List plan_code=new ArrayList();
		if (datalist.size() == 0){
			//无数据，不发邮件
			System.out.println(String.valueOf(m.get("factory_name"))+"无数据!");
			return;
		}
	// 计算计划实际完成数 达成率等数据
/*			for (int i = 0; i < datalist.size(); i++) {			
	        Map<String,String> resultMap=new HashMap<String,String>();
			resultMap = (Map<String, String>) datalist.get(i);
			logger.info("---->" + i + " = " + resultMap.get("key_name") + "|order_no = " + request.getParameter("order_no"));
			
			Map<String,Object> conditionMap2=new HashMap<String,Object>();
			conditionMap2.put("factory_id", String.valueOf(m.get("factory_id")));
			conditionMap2.put("order_no", resultMap.get("order_no"));
			conditionMap2.put("start_date", sdf.format(new Date()));
			conditionMap2.put("end_date", sdf.format(new Date()));
			conditionMap2.put("workshop", "id");
			if (resultMap.get("key_name").equals("焊装上线"))conditionMap2.put("workshop", "welding_online_date");
			if (resultMap.get("key_name").equals("焊装下线"))conditionMap2.put("workshop", "welding_offline_date");
			//if (resultMap.get("key_name").equals("玻璃钢下线"))conditionMap2.put("workshop", "fiberglass_offline_date");
			if (resultMap.get("key_name").equals("涂装上线"))conditionMap2.put("workshop", "painting_online_date");
			if (resultMap.get("key_name").equals("涂装下线"))conditionMap2.put("workshop", "painting_offline_date");
			if (resultMap.get("key_name").equals("底盘上线"))conditionMap2.put("workshop", "chassis_online_date");
			if (resultMap.get("key_name").equals("底盘下线"))conditionMap2.put("workshop", "chassis_offline_date");
			if (resultMap.get("key_name").equals("总装上线"))conditionMap2.put("workshop", "assembly_online_date");
			if (resultMap.get("key_name").equals("总装下线"))conditionMap2.put("workshop", "assembly_offline_date");
			if (resultMap.get("key_name").equals("入库"))conditionMap2.put("workshop", "warehousing_date");
			
			logger.info("---->workshop = " + conditionMap2.get("workshop"));
			
			if (resultMap.get("key_name").equals("部件上线")){
				conditionMap2.put("workshop", "online_real_qty");
				conditionMap2.put("start_date", sdf.format(new Date()).replaceAll("-", ""));
				conditionMap2.put("end_date", sdf.format(new Date()).replaceAll("-", ""));
				int realNum = planDao.getPlanPartsRealCount(conditionMap2);
				resultMap.put("real_qty", String.valueOf(realNum));
				int allrealNum = planDao.getPlanPartsAllRealCount(conditionMap2);
				resultMap.put("allrealNum", String.valueOf(allrealNum));
			}else if (resultMap.get("key_name").equals("部件下线")){
				conditionMap2.put("workshop", "offline_real_qty");
				conditionMap2.put("start_date", sdf.format(new Date()).replaceAll("-", ""));
				conditionMap2.put("end_date", sdf.format(new Date()).replaceAll("-", ""));
				int realNum = planDao.getPlanPartsRealCount(conditionMap2);
				resultMap.put("real_qty", String.valueOf(realNum));
				int allrealNum = planDao.getPlanPartsAllRealCount(conditionMap2);
				resultMap.put("allrealNum", String.valueOf(allrealNum));
			}else if (resultMap.get("key_name").equals("自制件下线")){
				conditionMap2.put("workshop", "offline_real_qty");
				conditionMap2.put("start_date", sdf.format(new Date()).replaceAll("-", ""));
				conditionMap2.put("end_date", sdf.format(new Date()).replaceAll("-", ""));
				
				Map<String,Object> conditionMap3=new HashMap<String,Object>();
				conditionMap3 = conditionMap2;
				conditionMap2.put("start_date", sdf.format(new Date()));
				conditionMap2.put("end_date", sdf.format(new Date()));
				
				//logger.info("---->自制件下线 = " + conditionMap3.get("order_no"));
				int realNum = planDao.getPlanZzjRealCount(conditionMap3);
				int allrealNum = planDao.getPlanZzjAllRealCount(conditionMap3);
				resultMap.put("real_qty", String.valueOf(realNum));
				resultMap.put("allrealNum", String.valueOf(allrealNum));
			}else{
				plan_code.add(conditionMap2);
//				int realNum = planDao.getPlanSearchRealCount(conditionMap2);
//				resultMap.put("real_qty", String.valueOf(realNum));
//				int allrealNum = planDao.getPlanSearchAllRealCount(conditionMap2);
//				resultMap.put("allrealNum", String.valueOf(allrealNum));
			}	
		}
		
		
		List result=new ArrayList();
		if(plan_code.size()>0){result = planDao.getPlanSearchRealCount(plan_code);}
		List allrealNumresult=new ArrayList();
		if(plan_code.size()>0){allrealNumresult = planDao.getPlanSearchAllRealCount(plan_code);}
		
		int x =0;
		for (int i = 0; i < datalist.size(); i++) {

			Map<String,String> resultMap=new HashMap<String,String>();
			resultMap = (Map<String, String>) datalist.get(i);
			if (!resultMap.get("key_name").equals("部件上线")&&!resultMap.get("key_name").equals("部件下线")&&!resultMap.get("key_name").equals("自制件下线")){
				Map<String,Long> resultMap2=new HashMap<String,Long>();
				resultMap2 = (Map<String, Long>) result.get(x);	
				
				Map<String,Long > allrealresultMap2=new HashMap<String,Long >();
				allrealresultMap2 = (Map<String, Long >) allrealNumresult.get(x);	
				
				resultMap.put("real_qty", String.valueOf(resultMap2.get("count")));
				resultMap.put("allrealNum", String.valueOf(allrealresultMap2.get("count")));
				x++;
			}
			
		}
*/
		
		//邮件模块
		MailSenderServiceImp1 mss = new MailSenderServiceImp1();
		
		JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();
        // 设定 Mail Server
        senderImpl.setHost("smtp.byd.com");
        
        //SMTP验证时，需要用户名和密码
        senderImpl.setUsername("div19BMS@byd.com");
        senderImpl.setPassword("rhc3@kxrz");
        senderImpl.setPort(25);
        mss.setMailSender(senderImpl);
        mss.setDefaultFrom("div19BMS@byd.com");
        //mss.send("duan.qiling@byd.com", "测试", "54321");
		
		mss.setTemplet("classpath:com/byd/erpit/tools/email/emailTemplet.html");
		mss.setEncode("utf-8");
		
		EmailSender emailSender = new EmailSender();
		emailSender.setTo(String.valueOf(m.get("inbox"))/*"wang.bo44@byd.com;liu.rui3@byd.com;wang.haitao4@byd.com;jiang.xiayun@byd.com;tan.haiwen@byd.com;wu.xiao1@byd.com;duan.qiling@byd.com;zeng.ni@byd.com;jiang.pei1@byd.com;liu.hongpu@byd.com;dong.ping@byd.com;huang.hua6@byd.com;zhu.yunfeng@byd.com"*/);
		emailSender.setCc(String.valueOf(m.get("cc")));
		emailSender.setFrom("div19BMS@byd.com");
		//emailSender.setContent("http://10.23.1.61:8080/19bms/login.jsp");
		emailSender.getParam().put("content", String.valueOf(m.get("content")));
		emailSender.getParam().put("factory", String.valueOf(m.get("factory_name")));
		emailSender.getParam().put("maintitle", "生产日报");
		//Date d=new Date();
		//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		emailSender.getParam().put("subtitle", sdf.format(new Date()));
		emailSender.setSubject(String.valueOf(m.get("subject")).replaceAll("XX年XX月XX日", sdf.format(new Date())));
		
		emailSender.setMerge(true);
		
		List<TableTable> tables = new ArrayList<TableTable>();
		
		TableTable tableX = emailSender.new TableTable();
		List<TdTd> theadX = new ArrayList<TdTd>();
		
		theadX.add(tableX.new TdTd("订单"));
		theadX.add(tableX.new TdTd("车间"));
		theadX.add(tableX.new TdTd("今日计划"));
		theadX.add(tableX.new TdTd("实际完成"));
		theadX.add(tableX.new TdTd("累计完成"));
		theadX.add(tableX.new TdTd("备注"));
		
		tableX.setThead(theadX);
		
		List<List<TdTd>> tbodyX = new ArrayList<List<TdTd>>();
		for(Map<String,String> m1 : datalist){
			List<TdTd> tr = new ArrayList<TdTd>();
			tr.add(tableX.new TdTd(String.valueOf(m1.get("order_desc"))));
			tr.add(tableX.new TdTd(String.valueOf(m1.get("key_name"))));
			tr.add(tableX.new TdTd(String.valueOf(m1.get("total_plan_qty"))));
			tr.add(tableX.new TdTd(String.valueOf(m1.get("real_qty"))));
			tr.add(tableX.new TdTd(String.valueOf(m1.get("total_qty"))));
			
			if(m1.get("key_name").endsWith("下线")){
				Map<String,Object> conditionMap1 = new HashMap<String,Object>();
				conditionMap1.put("date_start", sdf.format(new Date()));
				conditionMap1.put("date_end", sdf.format(new Date()));
				conditionMap1.put("factory_id", String.valueOf(m.get("factory_id")));
				conditionMap1.put("order_no", m1.get("order_no"));
				conditionMap1.put("workshop_name", m1.get("key_name").replaceAll("下线", ""));
				List<Map<String,String>> datalist1=new ArrayList();
				datalist1=planDao.getExceptionList(conditionMap1);
				if(datalist1.size()>0){
					String remark = datalist1.get(0).get("detailed_reasons");
					if(datalist1.size()>1){
						remark += "<br>"+datalist1.get(1).get("detailed_reasons");
					}
					tr.add(tableX.new TdTd(remark));
				}else{
					tr.add(tableX.new TdTd(" "));
				}
			}else{
				tr.add(tableX.new TdTd(" "));
			}
			tbodyX.add(tr);
		}
		tableX.setTbody(tbodyX);
		
		tableX.setTbody(tbodyX);
		tables.add(tableX);
		
		emailSender.setTables(tables);
		
		mss.send(emailSender);
	}
	
}
