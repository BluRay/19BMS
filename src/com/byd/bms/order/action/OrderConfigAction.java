package com.byd.bms.order.action;

import java.io.File;  
import java.io.IOException;  
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;  
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;  
import org.apache.struts2.ServletActionContext;  

import com.byd.bms.order.dao.IOrderDao;
import com.byd.bms.order.entity.BmsOrderConfig;
import com.byd.bms.util.Util;
import com.byd.bms.util.action.BaseAction;

public class OrderConfigAction extends BaseAction<Object>{
	private static final long serialVersionUID = 1L;  
	private IOrderDao orderDao;	
    private String configStr;  
    private String ConfigOrderNo;
  
    // 上传多个文件的集合文本    
    private List<File> upload;  
    // /多个上传文件的类型集合  
    private List<String> uploadContentType;  
    // 多个上传文件的文件名集合  
    private List<String> uploadFileName;  
  
    public IOrderDao getOrderDao() {
		return orderDao;
	}
	public void setOrderDao(IOrderDao orderDao) {
		this.orderDao = orderDao;
	}
	public String getConfigStr() {
		return configStr;
	}
	public void setConfigStr(String configStr) {
		this.configStr = configStr;
	}
	public List<File> getUpload() {    
       return upload;  
    }  
    public void setUpload(List<File> upload) {   
       this.upload = upload;  
    }  
    public List<String> getUploadContentType() {  
       return uploadContentType;  
    }  
    public void setUploadContentType(List<String> uploadContentType) {   
       this.uploadContentType = uploadContentType;  
    }  
    public List<String> getUploadFileName() {  
       return uploadFileName;  
    }  
    public void setUploadFileName(List<String> uploadFileName) {  
       this.uploadFileName = uploadFileName;  
    }        
    public String getConfigOrderNo() {
		return ConfigOrderNo;
	}
	public void setConfigOrderNo(String configOrderNo) {
		ConfigOrderNo = configOrderNo;
	}
	
	public String execute() {  
    	System.out.println("---->OrderConfigAction configStr = " + configStr);
    	System.out.println("---->OrderConfigAction ConfigOrderNo = " + ConfigOrderNo);
    	HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userId=getUser().getId();
    	String[] configStrArray=configStr.split(";");
    	
    	//150825 修改为： 订单配置维护 判断原配置是否存在，存在则修改，不存在则添加
    	/**
    	//删除原配置信息
    	orderDao.deleteOrderConfig(ConfigOrderNo);
    	//删除原配置分配信息
    	orderDao.deleteOrderConfigAllotByOrder(ConfigOrderNo);
    	**/
    	for(int i = 0; i < configStrArray.length; i++) {
    		String[] configArray = configStrArray[i].split(",");
    		Map<String,Object> conditionMap=new HashMap<String,Object>();
			conditionMap.put("order_no",ConfigOrderNo);
			conditionMap.put("order_cofig_id", Integer.parseInt(configArray[0]));
			int busNumberCount = orderDao.getAllOrderBusNumberCount(conditionMap);
			System.out.println("order_cofig_id :" + configArray[0] + " 已发布车号数 = " + busNumberCount);
			System.out.println("order_cofig_id :" + configArray[0] + " 修改配置数量 = " + configArray[2]);
			if(Integer.parseInt(configArray[2]) < busNumberCount){
				//System.out.println("---->err");
				PrintWriter out = null;
				JSONObject json = Util.dataListToJson(false,"配置编号："+configArray[0] + "的分配数量："+configArray[2]+"不能小于该配置已生成车号数：" + busNumberCount,null);
				try {
					out = response.getWriter();
				} catch (IOException e) {
					e.printStackTrace();
				}
				out.print(json);
				return null;
			}
    		
    	}
    	
    	int fileCount = 0;
    	
    	for(int i = 0; i < configStrArray.length; i++) {
    		//System.out.println("---->OrderConfigAction configStrArray["+i+"] = " + configStrArray[i]);
    		String[] configArray = configStrArray[i].split(",");
    		//开始增加BMS_ORDER_CONFIG
    		//id,松芝空调,20,A公交公司;id,十五部空调,50,B公交公司;
    		//115,松芝空调,350,长沙20,0;116,十五部空调,400,长沙2,1;
			BmsOrderConfig newOrderConfig = new BmsOrderConfig();
			newOrderConfig.setOrder_no(ConfigOrderNo);
			newOrderConfig.setId(Integer.valueOf(configArray[0]));
			newOrderConfig.setOrder_config_name(configArray[1]);
			newOrderConfig.setCustomer(configArray[3]);
			newOrderConfig.setConfig_qty(Integer.parseInt(configArray[2]));
		
			String fileType = "";
			//System.out.println("---->uploadFileName.size() = " + uploadFileName.size());
			
			if(configArray[4].equals("1")){		//有上传文件
				fileType = uploadFileName.get(fileCount);
				newOrderConfig.setConfig_file(ConfigOrderNo + "_" + i + fileType.substring(fileType.indexOf("."), fileType.length()));

				uploadFileName.set(fileCount, ConfigOrderNo + "_" + i + fileType.substring(fileType.indexOf("."), fileType.length()));
				fileCount++;
			}else{
				newOrderConfig.setConfig_file("");
			}
			newOrderConfig.setTire_type(configArray[5]);
			// added by xjw on 160506 车辆型号赋值
			newOrderConfig.setBus_vehicle_type(configArray[6].equals("未指定")?"":configArray[6]);
			
			/*if(uploadFileName.get(i) == null){
				
				// newOrderConfig.setConfig_file("");
			}else{
				fileType = uploadFileName.get(i);
				newOrderConfig.setConfig_file(ConfigOrderNo + "_" + i + fileType.substring(fileType.indexOf("."), fileType.length()));
			}*/
			//String fileType = uploadFileName.get(i);
			//newOrderConfig.setConfig_file(ConfigOrderNo + "_" + i + fileType.substring(fileType.indexOf("."), fileType.length()));
			
			newOrderConfig.setEditor_id(userId);
			newOrderConfig.setEdit_date(curTime);
			
			//判断配置是否存在
			/**
			List datalist=new ArrayList();
			datalist=orderDao.getOrderConfigInfo(Integer.valueOf(configArray[0]));
			System.out.println("---->getOrderConfigInfo num = " + datalist.size());
			if(datalist.size() > 0 ){
				System.out.println("-->更新OrderConfig");
			}else{
				System.out.println("-->新增OrderConfig");
			}
			**/
			if (configArray[0].equals("0")){
				//新增
				orderDao.insertOrderConfig(newOrderConfig);
			}else{
				//编辑
				orderDao.updateOrderConfigInfo(newOrderConfig);
			}
    	}
    	
    	// 把上传的文件放到指定的路径下  
    	String path = ServletActionContext.getServletContext().getRealPath("/images/upload/orderConfig/");  
    	// 写到指定的路径中  
    	File file = new File(path);  
    	// 如果指定的路径没有就创建  
    	if (!file.exists()) {  
    		file.mkdirs();  
    	}  
		// 把得到的文件的集合通过循环的方式读取并放在指定的路径下
    	//System.out.println("---->uploadFileName.size() = " + uploadFileName.size());
    	if (uploadFileName != null){
    		
    		for (int i = 0; i < uploadFileName.size(); i++) {
				try {
					// list集合通过get(i)的方式来获取索引
					FileUtils.copyFile(upload.get(i), new File(file, uploadFileName.get(i)));
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
    	}
    	
    	PrintWriter out = null;
		JSONObject json = Util.dataListToJson(true,"修改成功",null);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.print(json);
		return null;
	}
}
