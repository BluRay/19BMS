<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="expires" content="0" />
<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/ga.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/production/tmpOrderQuery.js"></script>
<link rel="stylesheet" href="css/bootstrap.3.2.css">
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/bootstrap-table.css">
<link rel="stylesheet" href="css/bootstrap-table-fixed-columns.css">
<link rel="stylesheet" href="css/bootstrap-editable.css">
<title>BMS - 临时派工单</title>
</head>
<body style="font-family: 'Microsoft YaHei';">
<%@ include file="../common/head.jsp"%>
<%@ include file="../common/general_production_left.jsp"%> 
<div class="content-wrapper container">
    <div id="bodyright" class="offset2" style="margin-left:10px">
    <legend style="margin: -5px auto;font-size:17px;line-height:2.3">临时派工单</legend>
		<div style="margin-top: -5px;margin-bottom:-15px">
			<div class="control-group" style="padding-top:10px;padding-bottom:2px">
				<table>
					<tr>
						<td width="110px" style="text-align: right">派工流水号：</td>
						<td width="150px"><input style="height: 30px;" type="text"class="input-medium revise" placeholder="派工单号" id="tmp_order_no" /></td>
						<td width="80px" style="text-align: right">申请日期：</td>
						<td width="250px"><input id="create_start" type="text" class="input-small" style="width: 98px" placeholder="开始日期..." onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /><span class="add-on" style="padding: 4px 0">至</span><input id="create_end" type="text" class="input-small" style="width: 98px" placeholder="结束日期..." onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /></td>
						<td width="70px" style="text-align: right">制作工厂：</td>
						<td width="120px"><select id="q_factory" class="input-small"></select></td>
						<td width="50px"></td>
						<td></td>
					</tr>
					<tr>
						<td width="110px" style="text-align: right">作业原因/内容：</td>
						<td width="150px"><input style="height: 30px;" type="text"class="input-medium revise" placeholder="作业原因/内容" id="tmp_reason_content" /></td>
						<td width="80px" style="text-align: right">状态：</td>
						<td width="250px"><select name="" id="status" class="input-small carType" style="width:100px">
							<option value='all'>全部</option><option value='0'>已创建</option><option value='2'>已分配</option>
							<option value='3'>已评估</option><option value='5'>已完成</option><option value='6'>已驳回</option></select>
						</td>
						<td width="60px" style="text-align: right">制作车间：</td>
						<td><select id="q_workshop" class="input-small"></select></td>
						<td>
						<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px; margin-top: -10px;"></input> 
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
            <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
        </div>
		<div class="container" style="height:200px;padding-left:0px;padding-right:0px;padding-top:0px">
		<div id="toolbar"></div>
		<table style="font-weight:normal" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
	           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
	           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
	           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
	           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
	    </table>
		</div>

		</div>
</div>
<script>
var $table = $('#table'),$remove = $('#remove'),selections = [];
</script>
</body>
</html>