<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>技改工时维护</title>
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
<script type="text/javascript" src="js/techtrans/techWorkTimeMaintain.js"></script>
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
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<!-- Tab panes -->
	<div class="content-wrapper " unselectable="on" onselectstart="return false;" >
	<div id="bodymain" class="offhead">
	<div id="bodyright" class="offset2">
	<legend >技改工时维护</legend>
	<div id="taskFollow">
				<form id="form" class="well form-search">
					<table>
						<thead>
								<tr>
									<td>技改任务</td>
									<td>技改单编号</td>
									<td>订单号</td>
									<td>工厂</td>
									<td>车间</td>
									<td>技改单日期</td>
									<td>状态</td>
								</tr>
								<tr>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改任务..."  id="task_content" ></td>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改单编号..."  id="tech_order_no" ></td>
									<td><input type="text" style="height: 30px;width:90px" class="input-medium revise" placeholder="请输入订单号..."  id="order_no" ></td>
									<td>
										<select name="" id="search_factory" style="width:100px" class="input-medium carType"></select>
									</td>
									<td>
										<select name="" id="search_workshop" style="width:100px" class="input-medium carType"></select>
									</td>
									<td><input name="startDate" id="startDate" class="Wdate" style="height: 30px; background-color: white; width: 120px" onfocus="javascript:WdatePicker()"  type="text"> 至 
										<input name="endDate" id="endDate" class="Wdate" onfocus="javascript:WdatePicker()" style="height: 30px; background-color: white; width: 120px"  type="text">										
									</td>
									<td>
										<select  class="input-medium carType" id="taskstatus" style="width:80px" >
											<option value="">全部</option>
											<option value="1">已完成</option>
											<option value="0">未完成</option>
										</select>
									    <input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
								</tr>
						</thead>
						<tbody>
						</tbody>
				 </table>
				  </form>
				 <table id="tableTaskFollow" class="table table-condensed" style="font-size: 12px;">
					 <thead>
						<thead>
							<tr>
								<th>技改任务</th>
								<th>变更类型</th>
								<th>技改单号</th>
								<th>技改单日期</th>
								<th>技改类型</th>
								<th>切换方式</th>
								<th>切换节点</th>
								<th>订单</th>							
								<th>技改工厂</th>
								<th>车间</th>
								<th>技改工时查看</th>
								<th>车间分配工时</th>
								<th>技改台数</th>
								<th>已完成</th>															
								<th>车号信息</th>	
								<th>录入总工时</th>								
								<th>技改状态</th>
								<th>工时维护</th>
								<th>工时修改</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
			 		<div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
						<ul>
							<li id="export">
								<a href="">总共<span total="" id="total"></span>条技改任务记录</a>
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
    	<input type="hidden" id="selectBusNumber_factoryId_view" /> 
    	<input type="hidden" id="selectBusNumber_workshop_view" />
    	<input type="hidden" id="selectBusNumber_taskId_view" />
    	<input type="hidden" id="selectBusNumber_orderId_view" />
    	<input type="hidden" id="selectBusNumber_switch_mode_view" />
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
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

<!-- pic query-->
<div class="modal" id="taskPicUpLoadQueryModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:700px;display:none;left: 42%;">
    <div class="modal-header">
   	 	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    	<h3>技改任务效果图展示</h3>		
    </div>
    <div class="modal-body">
	    	<table>
	    		<tr>
	    			 <td><h4>原效果图:</h4></td>
	       		</tr>
	    		<tr>
	      			 <td colspan="4"><img src="" id="img4" style="max-height: 500px; max-width: 500px;min-height: 200px;"></td>
	      		</tr>
	      		<tr>
	    			 <td><h4>整改后效果图:</h4></td>
	       		</tr>
	      		<tr>
	      			 <td colspan="4"><img src="" id="img5" style="max-height: 500px; max-width: 500px;min-height: 200px;"></td>
	      		</tr>
	       </table>
    </div>
    <div class="modal-footer">
       <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
 	</div>
</div>
<!-- pic query-->
			<div class="modal fade" id="mtaModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 800px;max-height:600px;left:40%">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>技改工时维护</h3>
					</div>
					<div class="modal-body">
						<div class="control-group" >
							<table style="line-height:30px">
								<tr>
								<td width="140px" style="text-align:right">技改单编号：</td>								
								<td id="orderNo"></td>
								</tr>
								<tr>
								<td width="140px" style="text-align:right">技改任务：</td>								
								<td id="task"></td>	
								</tr>
							</table>
						</div>
						
						<div class="control-group">
							<table >
								<tr>
								<td width="60px" style="text-align:right">工厂：</td>
								<td width="160px">
									<select id="factory" class="input-medium">
									</select>
								</td>
								<td width="80px" style="text-align:right">车间：</td>
								<td width="160px">
									<select id="workshop" class="input-medium">
									</select>
								</td>
								<td></td>
								<td></td>
								</tr>
								<tr>
								<td width="60px" style="text-align:right">班组：</td>
								<td width="160px">
									<select id="group" class="input-medium">
									<option value=''>请选择</option> 
									</select>
								</td>
								<td width="80px" style="text-align:right">小班组：</td>
								<td width="160px">
									<select id="subgroup" class="input-medium">
								 	<option value=''>请选择</option> 
									</select>
								</td>
								<td width="80px" style="text-align:right">操作日期：</td>
								<td>
									<input type="text" id="mta_wdate" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date()})"/>
								</td>
								</tr>
							</table>
						</div>
						<div><div style="width: 200px; display: inline-table;"><h5 class="section-head">技改工时</h5></div><span style="float:right;margin: 10px 20px;color:green" class="read_hours"></span></div>
						<div>
							<table id="table_workhour" style="margin-left:0px;margin-top:0px;width:100%;text-align:left;" class="exp-table table">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td style="width: 30px;"><i class="fa fa-plus addWorkhour" style="cursor: pointer;color: blue;"></i></td>
							<td >工号</td>
							<td >姓名</td>
							<td >岗位</td>
							<td >技改工时</td>
							<td >小班组</td>
							<td >班组</td>
							<td >车间</td>
							<td >工厂</td>
							</tr>
							</thead>
							<tbody class="exp-table" id="tb_workhour">
							</tbody>
							</table>
						</div>
						
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnMtaSave">保存</button>
					</div>
				</div>
				
				<div class="modal fade" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 800px;max-height:600px;left:40%">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>技改工时修改</h3>
					</div>
					<div class="modal-body">
						<div class="control-group" >
							<table style="line-height:30px" >
								<tr>
								<td width="140px" style="text-align:right">技改单编号：</td>								
								<td id="edit_orderNo"></td>
								</tr>
								<tr>
								<td width="140px" style="text-align:right">技改任务：</td>								
								<td id="edit_task"></td>	
								</tr>
							</table>
						</div>
						
						<div class="control-group">
							<table class="form-search">
								<tr>
								<td width="60px" style="text-align:right">工号：</td>
								<td width="160px">
									<input type="text" class="input-medium" id="edit_cardNumber"/>
								</td>
								<td width="80px" style="text-align:right">操作日期：</td>
								<td width="160px">
									<input type="text" class="input-medium" id="edit_workDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date()})"/>
								</td>
								<td><input type="button" class="btn btn-primary"
									id="btnSwhQuery" value="查询" style="margin-left: 2px;"></input></td>
								<td></td>
								</tr>								
							</table>
						</div>
						<div><div style="width: 200px; display: inline-table;"><h5 class="section-head">技改工时</h5></div><span style="float:right;margin: 10px 20px;color:green" class="read_hours"></span></div>
						<div>
							<table style="margin-left:0px;width: 100%;"class="exp-table table" id="workhour_tb">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td ><input type="checkbox" id="checkall"></td>
							<td >工号</td>
							<td >姓名</td>
							<td >岗位</td>
							<td >技改工时</td>
							<td >小班组</td>
							<td >班组</td>
							<td >车间</td>
							<td >工厂</td>
							<td>状态</td>
							<td >操作日期</td>
							</tr>
							</thead>
							<tbody class="exp-table" id="workhour_list">
							</tbody>
							</table>
						</div>
						
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-danger" id="btnSwhDelete">删除</button>
						<button class="btn btn-primary" id="btnEditSave">保存</button>
					</div>
				</div>
</body>
</html>