<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 技改任务分配</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.zh-CN.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/techtrans/techtransTaskMaintain.js"></script>
<script type="text/javascript" src="js/jsrender.min.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<style type="text/css">
.section-head {
  border-left: 7px solid #000;
  padding-left: 10px;
  margin-top: 25px;
  margin-bottom: 20px;
}
.glyphicon{
	position:relative;
	top:1px;
	display:inline-block;
	font-family:'Glyphicons Halflings';
	font-style:normal;
	font-weight:400;
	line-height:1;
	-webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale
}
.glyphicon-plus:before{
	content:"\2b"
}
*::before, *::after {
    box-sizing: border-box;
}
.btn-xs, .btn-group-xs > .btn {
    padding: 1px 5px;
    font-size: 14px;
    line-height: 2.5;
    border-radius: 3px;
}
.btn-success {
    color: #FFF;
    background-color: #5CB85C;
    border-color: #4CAE4C;
}
.offlineFont{
	color:red
}
.input[type="text"]{
	height: 30px;
}
</style>
</head>
<body  >
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead"><!-- Main -->
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<div>
				<legend >技改任务分配</legend>
				<div >
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>技改单编号</td>
								<td>订单</td>
								<td>工厂</td>
							<!-- 	<td>车间</td> -->
								<td>状态</td>
							</tr>
							<tr>
								<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改单编号..."  id="ecn_document_number" /></td>
								<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入订单..." id="order_no" /></td>
								<td>
									<select name="" id="search_factory" class="input-medium carType"></select>
								</td>
								<%-- <td>
									<select name="" id="search_workshop" class="input-medium carType">						
									</select>
								</td> --%>
								<td>
									<select  class="input-medium carType" id="status">
										<option value="">全部</option>
										<option value="1">已完成</option>
										<option value="0">未完成</option>
									</select>
									&nbsp;&nbsp;
									<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
								</td>
							</tr>
						</table>
					</form>
					<table id="tableEcnDocument" class="table table-condensed" style="font-size: 12px;">
					 <thead>
						<thead>
							<tr>
								<th>技改单编号</th>
								<th>下单日期</th>
								<th>技改任务号</th>
								<th width=400px;>技改任务</th>
								<th>订单号</th>
								<th>切换方式</th>
								<th>技改工厂</th>
								<!-- <th>车间</th> -->
								<th>工厂订单数</th>
								<th>总技改台数</th>
								<!-- <th>已分配<br>车辆总数</th>
								<th>车号分配</th>
								<th>已分配<br>车号查询</th> -->
								<th>单车总工时</th>
								<th>工时分配</th>
							<!--  	<th>车间单车<br>工时查看</th> -->
								<th>状态</th>
							</tr>
						</thead>
						<tbody >
						</tbody>
					</table>
					<div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
						<ul>
							<li id="export">
								<a href="">总共<span total="" id="total"></span>条记录</a>
							</li>
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
	

<!--task config  start -->
<div class="modal" id="configModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:600px;display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="editModal_title">技改任务工时分配</h3>
    </div>
    <div class="modal-body">
    <form id="configForm"  method="post" class="form-horizontal" action="ecnDocumentTask!taskTimeSave">
    	<table id="tableDepartment" class="table table-condensed" >
            <thead>
                <tr>
                	<!-- <th>技改工厂</th> -->
                    <th>车间</th>
                    <th align="center">单车工时</th>
                    <th>单位</th>
                </tr>
            </thead>
            <tbody id="techTimeConfig_parameters">
            </tbody>
        </table>
        <br/>
        <input type="text" style="display:none;" id="configStr" name="configStr"></input>
        <input type="text" style="display:none;" id="time_factoryid" name="time_factoryid"></input>
        <input type="text" style="display:none;" id="time_taskid" name="time_taskid"></input>
        <input type="text" style="display:none;" id="time_total_time" name="time_total_time"></input>
    </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <!-- <button class="btn btn-primary" id="btnConfigConfirm" >保存</button> -->
    </div>
</div>
<!--task config order end -->

<!--task query  start -->
<div class="modal" id="queryModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:600px;display:none;">
    	<div class="modal-header">
       		 <h3 id="editModal_title">技改任务工时查看</h3>
        </div>
        <div class="modal-body">
        <table id="tableDepartmentquery" class="table table-condensed" style="font-size:12px;">
            <thead>
                <tr>
                	<th>技改工厂</th>
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
<!--task query order end -->

<!--dph query  start -->
<div class="modal" id="dphModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:700px;display:none;" >
   		<div class="modal-header">
   		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        	<h3 id="editModal_title">技改任务已分配车辆明细</h3>
	       	<h5 style="margin-bottom: -10px;"> 车号：<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号后四位流水..."  id="dph_bus_num_start" >
	       	~<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号后四位流水..."  id="dph_bus_num_end" >
	       	<input type="button" class="btn btn-primary" id="btn_dph_bus_num_query" value="查询" style="margin-left: 2px;margin-bottom: 10px;"></input>
	       	</h5>
        </div>
        <div class="modal-body">
        <table id="dphquery" class="table table-bordered table-striped" style="table-layout:fixed;font-size:12px;">
            <thead>
                <tr>
                	<th style="text-align:center;width: 50px;">序号</th>
                	<th style="text-align:center;">车号</th>
                    <th style="text-align:center;">生产工厂</th>
                    <th style="text-align:center;">当前工序</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
      	<input type="hidden" id="selectBusNumber_factoryId" /> 
    	<input type="hidden" id="selectBusNumber_taskId" />
    	<input type="hidden" id="selectBusNumber_ecnNumber" />
    	<input type="hidden" id="selectBusNumber_orderId" />
    	<input type="hidden" id="selectBusNumber_switch_mode" />
    	<input type="hidden" id="selectBusNumber_status" />
        </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
    </div>
</div>
<!--dph query  end -->
<!-- busNumber start -->
<div class="modal" id="busNumberModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>订单车号</h3>
        <h5 style="margin-bottom: -10px;"> 车号：<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号后四位流水..."  id="order_bus_num_start" >
       	~<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号后四位流水..."  id="order_bus_num_end" >
       	<input type="button" class="btn btn-primary" id="btn_order_bus_num_query" value="查询" style="margin-left: 2px;margin-bottom: 10px;"></input>
       	</h5>
    </div>
    <div class="modal-body">
    	<table id="tableBusNumber" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
			<thead>
                <tr>
                	<th style="text-align:center;" width="60px">序号</th>
                	<th style="text-align:center;">车号</th>
                    <th style="text-align:center;">生产工厂</th>
                    <th style="text-align:center;">当前工序</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    <input type="hidden" id="orderBusNumber_order_id" />
    <input type="hidden" id="orderBusNumber_task_id" />
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" >确认</button>
    </div>
</div>
<!-- busNumber end -->

<!-- selectBusNumberModal start -->
<div class="modal" id="selectBusNumberModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;width: 650px;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>车号选择</h3>
        <h5 style="margin-bottom: -10px;"> 车号：<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号后四位流水..."  id="bus_num_start" >
       	~<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号后四位流水..."  id="bus_num_end" >
       	<input type="button" class="btn btn-primary" id="btn_select_bus_num_query" value="查询" style="margin-left: 2px;margin-bottom: 10px;"></input>
       	</h5>
    </div>
    <div class="modal-body">
    	<table id="selectBusNumber_table" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
			<thead>
                <tr>
                	<th style="width: 60px;"><input  type="checkbox" id="selectBusNumber_checkall"></th>
                	<th style="text-align:center;" width="60px">序号</th>
                	<th style="text-align:center;">车号</th>
                    <th style="text-align:center;">生产工厂</th>
                    <th style="text-align:center;">当前工序</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    	<input type="hidden" id="selectBusNumber_factoryId" /> 
    	<input type="hidden" id="selectBusNumber_taskId" />
    	<input type="hidden" id="selectBusNumber_ecnNumber" />
    	<input type="hidden" id="selectBusNumber_orderId" />
    	<input type="hidden" id="selectBusNumber_selected_number" />
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btn_selectBusNumberModal">确认</button>
    </div>
</div>
<!-- selectBusNumberModal end -->

</div>
</body>
</html>