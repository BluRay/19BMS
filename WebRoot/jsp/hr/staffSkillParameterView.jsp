<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>员工技能查询</title>
<!-- Le styles -->

<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
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
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hr/staffSkillParameterView.js"></script>
<script type="text/javascript" src="js/exportTable2Excel.js"></script>

</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
			<legend id="leg"><span id="workgroupTitle"  style="font-size: 17px;">员工技能系数查询</span></legend>	
			    <div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow: auto;">
					<ul id="workGroupTree" class="ztree"></ul>
				</div>
				<div style="margin-left:235px;padding:2px 1px 1px 5px;border:1px solid #ccebf8;background-color: #f1f6fb;">
					<table>
						<tr>
							<td align="left" valign="middle" style="width: 160px;" nowrap="nowrap" >工号/姓名：
								<textarea style="width: 300px;margin-bottom: 1px;" class="input-xlarge" onkeyup="this.value = this.value.slice(0, 1000)" id="staff_number" placeholder="可输入多个工号或姓名" rows="1.5"></textarea>
							</td>
							<td width="80%"  nowrap="nowrap">
								月份：<input type="text" name="month" id="month_s" class="Wdate" style="height:30px;background-color: white;width:100px" onclick="WdatePicker({el:'month_s',dateFmt:'yyyy-MM',maxDate:new Date(),onpicked:function(){changeMonth();}});">
								~ <input type="text" name="month" id="month_e" class="Wdate" style="height:30px;background-color: white;width:100px" onclick="WdatePicker({el:'month_e',dateFmt:'yyyy-MM',maxDate:new Date()});">
							</td>
							<td align="right"  nowrap="nowrap">
								<input style="margin-right: 20px;" class="btn btn-primary" id="btnQuery" type="button" value="查询">
							</td>
						</tr>
					</table>
				</div>
				<div id="pagination" style="padding-top: 6px;padding-bottom: 1px;" class="pagination pagination-small pagination-right">
						<ul>
							<li id="export"><a href="#">导出总共<span total="" id="total"></span>条记录
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
				<div id="tableDiv" style="margin-left:235px;overflow-x:auto;height: 400px;">
					<div style="display: none;position:fixed;z-index:999;margin-top:140px;margin-left:400px" class="divLoading" >
                          <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                    </div>  
					<table id="workgroupTable" class="table table-bordered" width="100%">
						<thead>

						</thead>
						<tbody class="exp-table">
						
						</tbody>
					</table>
			    </div>
			    <div style="margin-left:235px;overflow-x:auto;height: 400px;display: none;">
					<table id="workgroupTable-hidden" class="table table-bordered" width="100%">
						<thead>

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