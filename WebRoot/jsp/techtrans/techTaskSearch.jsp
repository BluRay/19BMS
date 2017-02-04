<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%long _systime= new java.util.Date().getTime();%>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>技改查询</title>
<!-- Le styles -->
<!-- <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">	 -->
<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap-table.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/ga.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<link type="text/css" rel="stylesheet" href="js/datePicker/skin/WdatePicker.css">
<script type="text/javascript" src="js/techtrans/techTaskSearch.js?timestamp=<%=_systime%>"></script>
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/bootstrap.3.2.css">
<link rel="stylesheet" href="css/bootstrap-table.css">
<link rel="stylesheet" href="css/bootstrap-table-fixed-columns.css">
<link rel="stylesheet" href="css/bootstrap-editable.css">
<style type="text/css">
.fixed-table-toolbar .bs-bars, .fixed-table-toolbar .search, .fixed-table-toolbar .columns {
    position: absolute;
	margin-top: -10px;
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
</style>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_techtask_left.jsp"%>
	<!-- Tab panes -->
	<div class="content-wrapper " >
	<div id="bodymain" class="offhead">
	<div id="bodyright" class="offset2" style="margin-left:20px">
	<legend style="margin: -5px auto;font-size:17px;line-height:2.3">技改查询</legend>
	<div id="taskFollow" style="margin-top: -5px;margin-bottom:-15px">
		<div class="control-group" style="padding-top:10px;padding-bottom:2px">
				<table style="font-size: 13px;">
					<tr>
						<td width="80px" style="text-align: right">技改任务：</td>
						<td width="140px"><input type="text" class="input-medium" placeholder="请输入技改任务..."  id="task_content" ></td>
						<td width="60px" style="text-align: right">工厂：</td>
						<td width="140px"><select name="" id="search_factory"class="input-medium carType"></select></td>
						<td width="60px" style="text-align: right">车间：</td>
						<td width="100px"><select name="" id="search_workshop" style="width:80px" class="input-medium carType"></select></td>
						<td width="80px" style="text-align: right">技改单日期：</td>
						<td colspan=2>
							<input name="startDate" id="startDate" class="Wdate" style="height: 30px; background-color: white; width: 120px" onfocus="javascript:WdatePicker()"  type="text"> 至 
							<input name="endDate" id="endDate" class="Wdate" onfocus="javascript:WdatePicker()" style="height: 30px; background-color: white; width: 120px"  type="text">
						</td>
						
						<td></td>
					</tr>
					<tr>
						<td width="80px" style="text-align: right">技改单编号：</td>
						<td width="140px">
							<input type="text" class="input-medium" placeholder="请输入技改单编号..."  id="tech_order_no" >
						</td>
						<td width="60px" style="text-align: right">订单号：</td>
						<td width="140px">
							<input type="text" class="input-medium" placeholder="请输入订单号..."  id="order_no" >
						</td>
						<td style="text-align: right" width="60px">状态：</td>
						<td width="100px">
						<select  class="input-medium carType" id="taskstatus" style="width:80px;height: 30px;margin-bottom: 10px;" >
							<option value="">全部</option>
							<option value="未完成">未完成</option>
							<option value="已完成">已完成</option>
						</select>
						</td>
						<td>
						<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;margin-top: -10px;height: 30px;"></input>
						</td>
					</tr>
				</table>
			</div>
			
		<div class="container" style="height:200px;padding-left:0px;padding-right:0px;padding-top:-20px">
		<div id="toolbar"></div>
		<table style="font-weight:normal;font-size:12px;table-layout:fixed" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
	           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
	           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
	           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
	           data-show-footer="false" data-side-pagination="client" data-response-handler="responseHandler">
	    </table>
		</div>	
		 </div>  
</div>
</div>
</div>
<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
        <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
</div> 
<!-- selectBusNumberModal 单任务，技改查询页面-->
<div class="modal" id="selectBusNumberModal_view" tabindex="-1" role="dialog" aria-hidden="true" style="width:900px;display:none;left: 38%;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>技改车辆信息</h3>
       	<h5 style="margin-bottom: -10px;"> 车号：<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号流水..."  id="bus_num_start_view" >
       	~<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号流水..."  id="bus_num_end_view" >
       	<input type="button" class="btn btn-primary" id="btn_single_bus_num_query_view" value="查询" style="margin-left: 2px;margin-bottom: 10px;"></input>
       	</h5>
    </div>
    <div class="modal-body">
    	<table id="selectBusNumber_table_view" style="table-layout:fixed;font-size:12px;border-collapse: collapse;" class="table table-bordered table-striped">
			<thead>
                <tr>
                	<th style="text-align:center;" width="60px">序号</th>
                	<th style="text-align:center;">车号</th>
                    <th style="text-align:center;">生产工厂</th>
                    <th style="text-align:center;">当前工序</th>
                    <th style="text-align:center;">确认人</th>
                    <th style="text-align:center;">确认时间</th>
                </tr>
            </thead>
            <tbody id="selectBusNumber_table_tbody_view">
                
            </tbody>
        </table>
    	<input type="hidden" id="selectBusNumber_factoryId_view" /> 
    	<input type="hidden" id="selectBusNumber_workshop_view" />
    	<input type="hidden" id="selectBusNumber_taskId_view" />
    	<input type="hidden" id="selectBusNumber_orderId_view" />
    	<input type="hidden" id="selectBusNumber_switch_mode_view" />
    </div>    
    <div class="modal-footer">
        <button class="btn" style="border: 1px solid #cccccc;" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
    </div>
</div>
<!-- selectBusNumberModal end -->
<div class="modal" id="timeQueryModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:600px;display:none;">
    	<div class="modal-header">
       		 <h3 id="editModal_title">技改任务工时查看</h3>
        </div>
        <div class="modal-body">
        <table id="tableDepartmentquery" class="table table-condensed" style="font-size:12px;">
            <thead>
                <tr>
                	<!-- <th>技改工厂</th> -->
                    <th>车间</th>
                    <th>单车工时</th>
                    <th>单位</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
    </div>
</div>
<script>
var $table = $('#table'),$remove = $('#remove'),selections = [];
</script>		
</body>
</html>