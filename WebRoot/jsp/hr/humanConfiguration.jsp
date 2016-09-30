<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>人力配置</title>
<!-- Le styles -->


<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">

<link href="js/datatables/css/jquery.dataTables.min.css" rel="stylesheet">

<link href="css/orgStructure.css" rel="stylesheet">

<link rel="stylesheet" href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
<link href="js/primitives/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />

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
    margin-bottom: 20px;
    padding-left: 10px;
}
.panel-default {
	border:1px solid #ddd;
}
.panel {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
}
.panel-heading {
    background-color: #f5f5f5;
    border-color: #ddd;
    color: #333;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 10px 15px;
}
.panel-body {
    padding: 15px;
    border-top:1px solid #ddd;
}
#standardHumanTable tbody tr { cursor: pointer; }
#standardHumanTable td { white-space: nowrap; }
 </style>

<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.10.2.custom.min.js"></script>
 
<!--<script  type="text/javascript" src="js/primitives/primitives.min.js"></script>-->

<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>

<!--<script type="text/javascript" src="js/datatables/jquery.dataTables.min.js"></script>-->

<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/velocity.min.js"></script>
<script type="text/javascript" src="js/velocity.ui.min.js"></script>

<!-- add by wuxiao -->
<script type="text/javascript" src="js/hr/humanConfiguration.js"></script>

</head>
<body style="overflow-y:hidden">
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
			<legend id="leg">人力配置</legend>	
			    <div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow:auto;">
					<ul id="treeDemo" class="ztree"></ul>
				</div>
				<div style="margin-left: 235px;margin-top: -20px;"><br/>
					<form id="form" class="well form-search" style="margin: 0px;padding: 8px;">
						<table>
							<tr>
								<td nowrap="nowrap">
									<div><span class="section-head" id="allParents" style="font-size:18px;"></span></div>
								</td>
								<td width="100%" nowrap="nowrap"></td>
								<td align="right" nowrap="nowrap">
									
									<input id="btnExport" class="btn btn-primary" type="button" style="margin-left:2px;" value="导出">
									
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div id="divImportFromFile" class="thumbnail" style="display:none;margin-left:235px;margin-bottom:10px;height:95px;">
					<h5 align="left">标准人力导入</h5>
					<!-- <form action="PlanImport.action" enctype="multipart/form-data" method="post" class="form-horizontal"> -->
					<form action="orgData!upload.action" enctype="multipart/form-data" method="post" class="form-horizontal">
						<input id="file" type="file" class="btn btn-info btn-small" name="file" accept="*.csv"/>
						<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
						<a href="#">下载批导模板</a>
					</form>
            	</div>
            	<%-- <div style="margin-left:255px;margin-right:5px;"><span id="allParents" style="font-size:18px;"></span></div> --%>
            	<div style="margin-left:235px;margin-top: 10px">
						<ul class="nav nav-tabs" id="new_tab" role="tablist"
							style="height: 38px;">
							<!-- <li class="active"><a href="#new_task1" data-toggle="tab"
								style="font-size: 14px; color: #333">1台/天</a></li>
							<li><i id="new_addCapacity" class="fa fa-plus"
								style="cursor: pointer; padding-top: 12px; color: blue;"></i></li> -->
						</ul>
				</div>
				<div id="contents" style="margin-left:235px;">
				<div style="margin-left:5px;float:left;width:55px;">
					<ul style="height: auto" class="nav nav-pills" id="busTypeTab">
						<!-- <li id="welding_li" style="float: none;"><a href="#">发车计划</a></li>
						<li id="painting_li" style="float: none;"><a href="#">发车交接</a></li>
						<li id="bottom_li" style="float: none;"><a href="#">随车附件</a></li>
						<li class="active" id="assembly_li" style="float: none;"><a href="#">发车查询</a></li> -->
					</ul>
				</div>
				<div id="humanConfigurationDiv" style="margin-left:5px;width:450px;float:left;max-height: 386px;overflow:auto;">
					<table id="standardHumanTable" class="table table-condensed table-bordered" style="font-size:12px;">
						<thead>
						<%-- <tr>
							<th width="50px">
								<button id="addParm" class="btn btn-success btn-xs">
									<span>+</span>
								</button>
							</th>
							<th>
								岗位编号
							</th>
							<th>
								岗位名称
							</th>
							<th>
								岗位类别
							</th>
							<th>
								岗位级别
							</th>
							<th>
								标准人力
							</th>
							<!-- <th>
								岗位职责
							</th>
							<th>
								岗位说明书
							</th> -->
						</tr> --%>
						
						</thead>
						<tbody class="exp-table">
						
						</tbody>
					</table>
					<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input style="height: 30px;width:100px;" type="text" class="revise carType sequence" id="job_no" />&nbsp;<input id="btnAdd" class="btn btn-success" type="button" value="添加"> -->
				</div>
				<div class="panel panel-default" style="margin-left:520px;margin-right:5px;max-height: 386px;overflow:auto;">
					<div class="panel-heading"><span class="current-position-name">现有人员信息</span></div>
					<div class="panel-body">
					    <table id="countTable" class="table table-condensed table-bordered" style="font-size:12px;">
						<thead>
						<tr>
							<th>
								总数
							</th>
							<th>
								高级（1.5-1.4）
							</th>
							<th>
								中级（1.3-1.2）
							</th>
							<th>
								初级（1.1-1.0）
							</th>
							<th>
								学徒工
							</th>
						</tr>
						</thead>
						<tbody class="exp-table">
						
						</tbody>
						</table>
						<table id="humanDetailTable" class="table table-condensed table-bordered" style="font-size:12px;">
						<thead>
						<tr>
							<th>
								工号
							</th>
							<th>
								姓名
							</th>
							<th>
								技能系数
							</th>
						</tr>
						</thead>
						<tbody class="exp-table">
						
						</tbody>
						</table>
					</div>
					<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input style="height: 30px;width:100px;" type="text" class="revise carType sequence" id="job_no" />&nbsp;<input id="btnAdd" class="btn btn-success" type="button" value="添加"> -->
				</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>