<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>分类型变更汇总</title>
<!-- Le styles -->
<!-- <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet"> -->
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap-table.js"></script>
<script type="text/javascript" src="js/tableExport.js"></script>
<script type="text/javascript" src="js/bootstrap-table-fixed-columns.js"></script>
<script type="text/javascript" src="js/bootstrap-table-export.js"></script>
<script type="text/javascript" src="js/bootstrap-table-editable.js"></script>
<script type="text/javascript" src="js/bootstrap-editable.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/techtrans/techChangeType.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<link type="text/css" rel="stylesheet" href="js/datePicker/skin/WdatePicker.css">
<link rel="stylesheet" href="css/bootstrap.3.2.css">
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/bootstrap-table.css">
<link rel="stylesheet" href="css/bootstrap-table-fixed-columns.css">
<link rel="stylesheet" href="css/bootstrap-editable.css">
<style type="text/css">
.fixed-table-toolbar .bs-bars, .fixed-table-toolbar .search, .fixed-table-toolbar .columns {
    position: absolute;
	margin-top: 15px;
	right: 16px;
	top: 145px;
}
.btn-default {
	height:30px;
}

.table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 1px solid #ddd;
}
a {
    cursor: pointer;
}
</style>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_techtask_left.jsp"%>
	<!-- Tab panes -->
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
	<div id="bodyright" class="offset2" style="margin-left:20px">
		<legend >分类型变更汇总</legend>
		<div class="control-group">
					<table >
						<tr>
						<td width="80px" style="text-align:right">变更类别：</td>
						<td width="80px">
							<select id="change_type" class="input-medium" style="width:90px">
								<option value="重大变更">重大变更</option>
								<option value="顾客变更">顾客变更</option>
								<option value="重复变更">重复变更</option>
							</select>
						</td>
						<td width="60px" style="text-align:right">订单：</td>
						<td width="100px">
							<input type="text" id="order_number" class="input-medium" style="width:100px"/>
						</td>
						<td width="60px" style="text-align:right">工厂：</td>
						<td width="80px">
							<select id="factory" class="input-medium" style="width:90px">
							</select>
						</td>
						<td width="90px" style="text-align:right">技改单日期：</td>
						<td width="220px">
							<input type="text" id="date_start" style="width:100px" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',})"/> - 
							<input type="text" id="date_end" style="width:100px" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',})"/>
						</td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;margin-top: -10px;"></input></td>
						</tr>
					</table>
				</div>
		<div role="tabpanel" class="tab-pane active" id="tabpanel">
			<ul class="nav nav-pills" role="tablist" style="height: 30px">
				<li id="factory_tab" role="presentation" class="active" >
					<a  aria-controls="#factory_tab" role="tab" data-toggle="tab">工厂维度</a>							
				</li>
				<li id="order_tab"  role="presentation" >
					<a aria-controls="#order_tab" role="tab" data-toggle="tab">订单维度</a>
				</li>
			</ul>
		</div>
		<div class="container" style="padding-left:0px;padding-right:0px;margin-top: -10px;">
		<div id="toolbar"></div>
		<table style="font-weight:normal;font-size:12px;table-layout:fixed" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
	           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
	           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
	           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
	           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
	    </table>
		</div>  
	</div>
	</div>
	</div>
<script>
var $table = $('#table'),$remove = $('#remove'),selections = [];
</script>
</body>
</html>