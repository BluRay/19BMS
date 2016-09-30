<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 单车制造月费用</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/selfcost/selfcostSinglebusManufacturing.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_selfcost_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">单车制造月费用导入</legend>
			<div style="margin: 0 auto;"><br/>	
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>费用月份</td>
						<td></td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="费用月份..." id="search_cost_month" onclick="WdatePicker({el:'search_cost_month',dateFmt:'yyyyMM'});" /></td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
						<td><input id="btnBulkAdd" class="btn btn-info" value="批量导入" type="button"></td>
					</tr>
				</table>
			</form>
			<div id="divBulkAdd" class="thumbnail" style="display:none;height: 95px;">
				<h5 align="left">单车制造月费用批量导入</h5>
				<!-- <form action="PlanImport.action" enctype="multipart/form-data" method="post" class="form-horizontal"> -->
				<form action="selfcost!uploadsinglebus.action" enctype="multipart/form-data" method="post" class="form-horizontal">
					<input id="file" type="file" class="btn btn-info btn-small" name="file" accept="*.csv"/>
					<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:if($('#file').val()==''){alert('请选择文件！ ');return false;} this.disabled=true;return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
					<a href="download/singlebus.csv">下载批导模板</a>
				</form>
            </div>
			<table id="tableOrder" style="font-size:12px" class="table table-bordered table-striped">
				<thead>
	                <tr>
	                	<th>序号</th>
	                	<th>生产工厂</th>
	                    <th>车间科室</th>
	                    <th>生产年月</th>
	                    <th>生产下线数</th>
	                    <th>考核下线数</th>
	                    <th>机器费用</th>
	                    <th>模具费用</th>
	                    <th>其他材料费用</th>
	                    <th>其他费用</th>
	                    <th>燃烧动力</th>
	                    <th>人工费用</th>
	                    <th>总费用</th>
	                    <th>剔除异常总计</th>
	                </tr>
	            </thead>
	            <tbody>
	                
	            </tbody>
	        </table>
		    <div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
				<ul>
					<li id="export"><a href="">总共<span total="" id="total"></span>条记录
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
			
			</div>
			</div>
		</div>
	</div>
</body>
</html>