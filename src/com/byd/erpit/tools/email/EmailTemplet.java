package com.byd.erpit.tools.email;

/**
 * Author:Qingqing.cao
 * Date: Jan 12, 2011 10:03:22 AM
 * Desc:主要用于定义EMAIL的格式,具体的样式请参照emailTemplet.html文件
 */
public class EmailTemplet {
	public static String mailHeader = "<HTML> "+
		    "<HEAD>  "+
		    "<meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\">   "+
		    "<style> "+
		    "    *{font: normal 12px/1.6em Verdana, Arial, Helvetica, sans-serif;} "+
		    "    table.dataTable{background-color:#C4BCC9;color:#666666;} "+
		    "    table.dataTable tr{height:22px;} "+
		    "    table{font-size:12px;} "+
		    "    .mailTitle{font-size:26px;font-family:楷体_GB2312;font-weight:bolder;} "+
		    "    .mailTitleInfo{font-size:26px;font-family:楷体_GB2312;font-weight:bolder;color:red;} "+
		    "    hr{margin:0 0 5 0;}         "+
		    "    td{text-align: center;}         "+
		    "    .mainDataTr{} "+
		    "    .mainDataTr th{background-color:white;text-align:right;font-weight:bolder;color:#696C6D;} "+
		    "    .mainDataTr .title{background-color:white;text-align:right;font-weight:bolder;color:#696C6D;} "+
		    "    .mainDataTr .val{background-color:white;text-align:left;} "+ 
		    "    .dataTable .titleTr{background-color:#C4D5DE;height:26px;} "+
		    "    .dataTable .titleTr th{font-size:13px;font-weight:bolder;} "+
		    "    .dataTable .darkTr{background-color:#F0FAFF;} "+
		    "    .dataTable .lightTr{background-color:white;} " +
		    "	 .msg{color:red;}"+
		    "</style> "+
		    "</HEAD> "+
		    "<center> "+
		    "<BODY>";
	public static String mailFooter = "</BODY> </center> </HTML>";
}
