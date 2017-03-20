package com.byd.bms.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import net.sf.json.JSONObject;

public final class Util {
	private static String defaultDatePattern = "yyyy-MM-dd ";  
    /** 
     * 获得默认的 date pattern 
     */  
    public static String getDatePattern()  
    {  
        return defaultDatePattern;  
    }  
  
    /** 
     * 返回预设Format的当前日期字符串 
     */  
    public static String getToday()  
    {  
        Date today = new Date();  
        return format(today);  
    }  
  
    /** 
     * 使用预设Format格式化Date成字符串 
     */  
    public static String format(Date date)  
    {  
        return date == null ? " " : format(date, getDatePattern());  
    }  
    
    /** 
     * 使用参数Format格式化Date成字符串 
     */  
    public static String format(Date date, String pattern)  
    {  
        return date == null ? " " : new SimpleDateFormat(pattern).format(date);  
    }  
  
    /** 
     * 使用预设格式将字符串转为Date 
     */  
    public static Date parse(String strDate) throws ParseException  
    {  
        return StringUtils.isBlank(strDate) ? null : parse(strDate,  
                getDatePattern());  
    }  
  
    /** 
     * 使用参数Format将字符串转为Date 
     */  
    public static Date parse(String strDate, String pattern)  
            throws ParseException  
    {  
        return StringUtils.isBlank(strDate) ? null : new SimpleDateFormat(  
                pattern).parse(strDate);  
    }  
  
    /** 
     * 在日期上增加数个整月 
     */  
    public static Date addMonth(Date date, int n)  
    {  
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        cal.add(Calendar.MONTH, n);  
        return cal.getTime();  
    }  
  
    public static String getLastDayOfMonth(String year, String month)  
    {  
        Calendar cal = Calendar.getInstance();  
        // 年  
        cal.set(Calendar.YEAR, Integer.parseInt(year));  
        // 月，因为Calendar里的月是从0开始，所以要-1  
        // cal.set(Calendar.MONTH, Integer.parseInt(month) - 1);  
        // 日，设为一号  
        cal.set(Calendar.DATE, 1);  
        // 月份加一，得到下个月的一号  
        cal.add(Calendar.MONTH, 1);  
        // 下一个月减一为本月最后一天  
        cal.add(Calendar.DATE, -1);  
        return String.valueOf(cal.get(Calendar.DAY_OF_MONTH));// 获得月末是几号  
    }  
  
    public static Date getDate(String year, String month, String day)  
            throws ParseException  
    {  
        String result = year + "- "  
                + (month.length() == 1 ? ("0 " + month) : month) + "- "  
                + (day.length() == 1 ? ("0 " + day) : day);  
        return parse(result);  
    }  
	
	/**
	 * 通用方法：将list数据生成返回Json格式数据
	 * @param result		成功标示
	 * @param message		提示信息
	 * @param data_list		数据
	 * @return JSONObject
	 */
	public static JSONObject dataListToJson(Boolean result , String message , List<Map<String, String>> data_list){
		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "success", result);  
        map.put( "message", message); 
        map.put( "data",data_list);
        JSONObject jsonObject = JSONObject.fromObject(map);
        return jsonObject;
	}
	
	public static JSONObject dataListToJson1(Boolean result , String message , List<Map<String, String>> data_list, List<Map<String, String>> data_list1){
		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "success", result);  
        map.put( "message", message); 
        map.put( "data",data_list);
        map.put( "data1",data_list1);
        JSONObject jsonObject = JSONObject.fromObject(map);
        return jsonObject;
	}

	/**
	 * 通用方法：将list数据生成返回Json格式数据
	 * @param result		成功标示
	 * @param message		提示信息
	 * @param data_list		数据
	 * @param page_map		分页数据
	 * @return JSONObject
	 */
	public static JSONObject dataListToJson(Boolean result , String message , List<Map<String, String>> data_list,Map<String, String> page_map){
		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "success", result);  
        map.put( "message", message); 
        map.put( "data",data_list);
        map.put( "pager",page_map);
        JSONObject jsonObject = JSONObject.fromObject(map);
        return jsonObject;
	}
	
	public static void main(String[] args){
		System.out.println("---->" + 13%12);
		
		/**
		Map<String, String> data_map1 = new HashMap<String, String>();  
		data_map1.put("BUS_TYPE", "K8");
		data_map1.put("BUS_NAME", "CS");
		Map<String, String> data_map2 = new HashMap<String, String>();  
		data_map2.put("BUS_TYPE", "K8");
		data_map2.put("BUS_NAME", "CS");
		
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		list.add(data_map1);
		list.add(data_map2);
		
		Util util = new Util();
		JSONObject json = util.dataListToJson(true,"成功！",list);
		System.out.println( json );
		**/
		//Map转换成json， 是用jsonObject
		/*Map<String, String> data_map = new HashMap<String, String>();  
		data_map.put("BUS_TYPE", "K8");
		data_map.put("BUS_NAME", "CS");
		
        Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "success", true);  
        map.put( "message", "查询成功" ); 
        map.put( "data",data_map);
          
        JSONObject jsonObject = JSONObject.fromObject(map);  
        System.out.println( jsonObject );*/
		
		//Collection对象转换成JSON
		/*List<String> list = new ArrayList<String>(); 
        list.add( "first" );  
        list.add( "second" );  
        List<Object> list2 = new ArrayList<Object>();
        list2.add(list);
        
        JSONArray jsonArray = JSONArray.fromObject( list2 );  
        System.out.println( jsonArray ); */ 
	}

	public static String post(String strURL, String params) {
        try {
            URL url = new URL(strURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setUseCaches(false);
            connection.setInstanceFollowRedirects(true);
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(3000);
            connection.setRequestMethod("POST"); // 设置请求方式
            connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式
            connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式
            connection.connect();
            OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream(), "UTF-8");
            out.append(params);
            out.flush();
            out.close();
            // 读取响应
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String lines;
            StringBuffer sb = new StringBuffer("");
            while ((lines = reader.readLine()) != null) {
               lines = new String(lines.getBytes(), "utf-8");
               sb.append(lines);
            }
            reader.close();
            connection.disconnect();
            return sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "error";
     }
}
