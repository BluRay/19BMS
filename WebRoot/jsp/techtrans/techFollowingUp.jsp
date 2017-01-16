<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>技改跟进</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<link type="text/css" rel="stylesheet" href="js/datePicker/skin/WdatePicker.css">
<script type="text/javascript" src="js/techtrans/techFollowingUp.js"></script>
<style type="text/css">
.section-head {
	border-left: 7px solid #000;
	padding-left: 10px;
	margin-top: 25px;
	margin-bottom: 20px;
}

.glyphicon {
	position: relative;
	top: 1px;
	display: inline-block;
	font-family: 'Glyphicons Halflings';
	font-style: normal;
	font-weight: 400;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale
}

.glyphicon-plus:before {
	content: "\2b"
}

*::before, *::after {
	box-sizing: border-box;
}

.btn-xs, .btn-group-xs>.btn {
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

.offlineFont {
	color: red
}

.input[type="text"] {
	height: 30px;
}

.newTable td {
	height: 40px;
}
.editTable td {
	height: 40px;
}
</style>
</head>
<body>
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<!-- Tab panes -->
	<div class="content-wrapper " unselectable="on" onselectstart="return false;" style="-moz-user-select: -moz-none;">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<legend>技改跟进</legend>
				<div id="taskFollow">
					<form id="form" class="well form-search">
						<table>
							<thead>
								<tr>
									<td>任务内容</td>
									<td>技改单编号</td>
									<td>订单</td>
									<td>工厂</td>
									<td>车间</td>
									<td>技改单日期</td>
									<td>状态</td>
								</tr>
								<tr>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入任务内容..." id="task_content"></td>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改单编号..." id="tech_order_no"></td>
									<td><input type="text" style="height: 30px;width:90px" class="input-medium revise" placeholder="请输入订单..." id="order_no" /></td>
									<td>
									<select name="" id="factory" style="width:100px" class="input-medium carType"></select>
									</td>
									<td>
									<select name="" id="workshop" style="width:100px" class="input-medium carType"></select>
									</td>
									<td><input name="tech_date_start" id="tech_date_start" class="Wdate" style="height: 30px; background-color: white; width: 120px" onfocus="javascript:WdatePicker()" type="text"> 至 <input name="tech_date_end" id="tech_date_end" class="Wdate" onfocus="javascript:WdatePicker()" style="height: 30px; background-color: white; width: 120px" type="text"></td>
									<td><select class="input-medium carType" id="status" style="width: 80px">
											<option value="">全部</option>
											<option value="已创建">已创建</option>
											<option value="已分配">已分配</option>
											<option value="已评估">已评估</option>
											<option value="已完成">已完成</option>
									</select> <input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input> 
									</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</form>
					<table id="tableTaskFollow" class="table table-bordered table-striped" style="font-size: 12px;">
						
						<thead>
							<tr>
								<th>技改任务</th>
								<th>变更单类型</th>
								<th>技改单号</th>
								<th>技改单日期</th>
								<th>切换方式</th>
								<th>切换节点</th>
								<th>订单</th>
								<th>工厂</th>
								<th>车间</th>
								<th>技改台数</th>
								<th>已完成</th>
<!-- 								<th>未完成</th> -->
								<th>技改跟进</th>
								<th>已跟进清单</th>
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
	<div style="display: none; position: fixed; z-index: 999; margin-top: 150px; margin-left: 500px" class="divLoading">
		<span><i class="fa fa-spinner fa-spin fa-4x" style="height: 1em;"></i></span>
	</div>

<!-- selectBusNumberModal 单任务，技改查询页面-->
<div class="modal" id="selectBusNumberModal_view" tabindex="-1" role="dialog" aria-hidden="true" style="width:900px;display:none;left: 38%;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>技改查询</h3>
       	<h5 style="margin-bottom: -10px;"> 车号：<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号流水..."  id="bus_num_start_view" >
       	~<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号流水..."  id="bus_num_end_view" >
       	<input type="button" class="btn btn-primary" id="btn_single_bus_num_query_view" value="查询" style="margin-left: 2px;margin-bottom: 10px;"></input>
       	</h5>
    </div>
    <div class="modal-body">
    	<table id="selectBusNumber_table_view" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
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
    	<input type="hidden" id="select_tech_task_id_view" /> 
    	<input type="hidden" id="select_factory_view" /> 
    	<input type="hidden" id="select_workshop_view" />
    	<input type="hidden" id="select_order_no_view" />
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
    </div>
</div>
<!-- selectBusNumberModal end -->

<!-- selectBusNumberModal start 单任务，技改确认-->
<div class="modal" id="selectBusNumberModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:900px;display:none;left: 38%;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>技改确认</h3>
       	<h5 style="margin-bottom: -10px;"> 车号：<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号流水..."  id="bus_num_start" >
       	~<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号流水..."  id="bus_num_end" >
       	<input type="button" class="btn btn-primary" id="btn_single_bus_num_query" value="查询" style="margin-left: 2px;margin-bottom: 10px;"></input>
       	</h5>
    </div>
    <div class="modal-body">
    	<table id="selectBusNumber_table" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
			<thead>
                <tr>
                	<th style="width: 50px;text-align: center;"><input type="checkbox" id="selectBusNumber_checkall" class="checkall"></th>
                	<th style="text-align:center;" width="60px">序号</th>
                	<th style="text-align:center;">车号</th>
                    <th style="text-align:center;">生产工厂</th>
                    <th style="text-align:center;">当前工序</th>
                    <th style="text-align:center;">确认人</th>
                    <th style="text-align:center;">确认时间</th>
                </tr>
            </thead>
            <tbody id="selectBusNumber_table_tbody">
                
            </tbody>
        </table>
    	<input type="hidden" id="select_tech_task_id" /> 
    	<input type="hidden" id="select_factory" /> 
    	<input type="hidden" id="select_workshop" />
    	<input type="hidden" id="select_order_no" />
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btn_selectBusNumberModal">确认</button>
    </div>
</div>
<!-- selectBusNumberModal end -->

<!-- selectBusNumberModal1 单任务，技改查询页面-->
<div class="modal" id="selectBusNumberModal_view1" tabindex="-1" role="dialog" aria-hidden="true" style="width:900px;display:none;left: 38%;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>技改查询</h3>
    </div>
    <div class="modal-body">
    	<table id="selectBusNumber_table_view1" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
			<thead>
                <tr>
                    <th style="text-align:center;">产量</th>
                    <th style="text-align:center;">维护人</th>
                    <th style="text-align:center;">维护时间</th>
                </tr>
            </thead>
            <tbody id="selectBusNumber_table_tbody_view1">
                
            </tbody>
        </table>
    	<input type="hidden" id="select_tech_task_id_view1" /> 
    	<input type="hidden" id="select_factory_view1" /> 
    	<input type="hidden" id="select_workshop_view1" />
    	<input type="hidden" id="select_order_no_view1" />
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
    </div>
</div>
<!-- selectBusNumberModal end -->

<!-- selectBusNumberModal start 单任务，技改确认-->
<div class="modal" id="selectBusNumberModal1" tabindex="-1" role="dialog" aria-hidden="true" style="width:900px;display:none;left: 38%;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>技改确认</h3>
       	<h5 style="margin-bottom: -10px;"> 产量：<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="" id="follow_num" onkeyup="value=value.replace(/[^\d]/g,'')" onpaste="return false;"></input>
       	<input type="button" class="btn btn-primary" id="btn_follow_num_confirm" value="保存" style="margin-left: 2px;margin-bottom: 10px;"></input>
       	</h5>
    </div>
    <div class="modal-body">
    	<table id="selectBusNumber_table1" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
			<thead>
                <tr>
                	<th style="text-align:center;">产量</th>
                    <th style="text-align:center;">维护人</th>
                    <th style="text-align:center;">维护时间</th>
                </tr>
            </thead>
            <tbody id="selectBusNumber_table_tbody1">
                
            </tbody>
        </table>
    	<input type="hidden" id="select_tech_task_id1" /> 
    	<input type="hidden" id="select_factory1" /> 
    	<input type="hidden" id="select_workshop1" />
    	<input type="hidden" id="select_order_no1" />
    	<input type="hidden" id="total_num1" />
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <!-- <button class="btn btn-primary" id="btn_selectBusNumberModal1">确认</button> -->
    </div>
</div>
<!-- selectBusNumberModal end -->
</body>
</html>