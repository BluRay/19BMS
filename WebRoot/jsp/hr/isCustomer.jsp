<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>自编号维护</title>
<!-- Le styles -->

<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/bootstrap-switch.min.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">

 <link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
 <style type="text/css">
	.bp-title {
	    padding: 2px 0px 0px 5px;
	}
	.btn {
	    padding: 1px 12px 3px 11px;
	}
	input[type="text"] {
	    margin-bottom: 0px;
	}
	.well {
	    margin-bottom: 10px;
	}
	.section-head {
	    border-left: 7px solid #000;
	    padding-left: 10px;
	    margin-bottom: 20px;
	}
	.table th, .table td {
		padding: 7px;
	}
 </style>

<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<!--<script  type="text/javascript" src="js/primitives/primitives.min.js"></script>-->
<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hr/isCustomer.js"></script>

</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
			<legend id="leg"><span id="workgroupTitle"  style="font-size: 17px;">自编号维护</span></legend>	
			    <div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow: auto;">
					<ul id="workGroupTree" class="ztree"></ul>
				</div>
				<div style="margin-left:235px;padding:2px 14px 1px 14px;border:1px solid #ccebf8;background-color: #f1f6fb;">
					<table>
						<tr>
							<td align="left" valign="middle" style="width: 160px;padding-top: 10px;" nowrap="nowrap" >自编：<select style="width:100px;" name="" id="is_Customer" class="input-medium carType">
							<option value="">全部</option>
							<option value="1">是</option>
							<option value="0">否</option>
							</select></td>
							<td width="100%"  nowrap="nowrap">
								<!-- 月份：<input type="text" name="month" id="month_s" class="Wdate" style="height:30px;background-color: white;width:100px" onclick="WdatePicker({el:'month_s',dateFmt:'yyyy-MM'});">
								~ <input type="text" name="month" id="month_e" class="Wdate" style="height:30px;background-color: white;width:100px" onclick="WdatePicker({el:'month_e',dateFmt:'yyyy-MM'});"> -->
							</td>
							<td align="right" nowrap="nowrap">
								<input class="btn btn-primary" id="btnQuery" type="button" value="查询">
							</td>
							<td align="right" nowrap="nowrap">
								<input class="btn btn-success" id="btnSubmit" type="button" value="自编">
							</td>
						</tr>
					</table>
				</div>
				<div id="pagination" style="padding-top: 6px;padding-bottom: 1px;" class="pagination pagination-small pagination-right">
						<ul>
							<li id="downloadStandardPrice"><a href="#">总共<span total="" id="total"></span>条记录
							</a></li>
						</ul>
						<ul>
							<li id="first"><a href="#">«</a></li>
							<li id="pre" class="prePage"><a href="#">&lt;</a></li>
							<li id="cur" class="active curPage" page=""><a href="#"></a></li>
							<li id="next" class="nextPage"><a href="#">&gt;</a></li>
							<li id="last"><a href="#">»</a></li>
						</ul>
				</div>
				<div id="tableDiv" style="margin-left:255px;overflow-x:auto;height: 400px;">
					<table id="workgroupTable" class="table table-bordered" width="100%">
						<thead>
						<tr>
<!-- 							<th style="min-width: 80px;">
								工厂
							</th> -->
							<th style="min-width: 70px;">
								车间
							</th>
							<th style="min-width: 130px;">
								班组
							</th>
							<th style="min-width: 150px;">
								小班组
							</th>
							<th style="min-width: 70px;">自编</th>
						</tr>
						</thead>
						<tbody class="exp-table">
						
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>