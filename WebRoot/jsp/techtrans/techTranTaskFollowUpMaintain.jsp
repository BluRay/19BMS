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
<script type="text/javascript" src="js/techtrans/techTranTaskFollowUpMaintain.js"></script>
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
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
	<div id="bodyright" class="offset2">
	<legend >技改单跟进</legend>
	<div role="tabpanel" class="tab-pane active" id="welding">
			<ul class="nav nav-pills" role="tablist" style="height: 30px">
					<li role="presentation" class="active" >
							<a id="taskFollowing"  aria-controls="#taskFollowing" role="tab" data-toggle="tab">单任务跟进</a>
							
					</li>
					<li role="presentation" >
							<a id="carFollowing"  aria-controls="#carFollowing" role="tab" data-toggle="tab">单车跟进</a></li>
			</ul>
	</div>
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
									<td>状态</td>
								</tr>
								<tr>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改任务..."  id="task_content" ></td>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改单编号..."  id="ecnnumber" ></td>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入订单号..."  id="order_no" ></td>
									<td>
										<select name="" id="search_factory" class="input-medium carType"></select>
									</td>
									<td>
										<select name="" id="search_workshop" class="input-medium carType"></select>
									</td>
									<td>
										<select  class="input-medium carType" id="taskstatus">
											<option ></option>
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
								<th>技改单编号</th>
								<th>技改单日期</th>
								<th>技改任务号</th>
								<th>技改任务</th>
								<th>订单</th>
								<th>切换方式</th>
								<th>技改工厂</th>
								<th>车间</th>
								<th>技改台数</th>
								<!-- <th>已分配台数</th> -->
								<th>已完成</th>
								<th>未完成</th>
								<th>技改跟进</th>
								<th>已确认清单</th>
								<th>效果图片</th>
							</tr>
						</thead>
						<tbody>
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
		 
		 <div id="carFollow" style="display:none">
				<form id="carFollowForm" class="well form-search" action="ecnDocumentTask!singleCarFollowSubmit">
					<table>
						<thead>
								<tr>
									<td>车号</td>
								</tr>
								<tr>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="完整车号信息..."  id="busno" ></td>
									<td>
										<input type="button" class="btn btn-primary" id="btnQuerySingleTask" value="查询" style="margin-left: 2px;"></input>
										<input id="btnAddSingleTask" type="button" class="btn btn-success" value="保存"></input>
									</td>								
								</tr>
						</thead>
						<input type="text" style="display:none;" id="configStr1" name="configStr1"></input>
				 </table>
				</form>
				 <table id="singledphFollow" class="table table-condensed" style="font-size: 12px;">
					 <thead>
						<thead>
							<tr>
								<th><input type="checkbox" id="checkallsinglecar"></th>
								<th>技改状态</th>
								<th>技改任务</th>
								<th>技改单编号</th>
								<th>技改工厂</th>
								<th>技改车间</th>
								<th>切换方式</th>
								<th>技改台数</th>
			<!-- 					<th>已完成</th>
								<th>未完成</th> -->
								<th>已确认清单</th>
								<th>效果图片</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
		  </div>	  
</div>
</div>
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
    	<input type="hidden" id="selectBusNumber_factoryId_view" /> 
    	<input type="hidden" id="selectBusNumber_workshop_view" /> 
    	<input type="hidden" id="selectBusNumber_taskId_view" />
    	<input type="hidden" id="selectBusNumber_ecnNumber_view" />
    	<input type="hidden" id="selectBusNumber_orderId_view" />
    	<input type="hidden" id="selectBusNumber_switch_mode_view" />
    	<input type="hidden" id="selectBusNumber_status_view" />
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
                	<th style="width: 50px;text-align: center;"><input type="checkbox" id="selectBusNumber_checkall"></th>
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
    	<input type="hidden" id="selectBusNumber_factoryId" /> 
    	<input type="hidden" id="selectBusNumber_workshop" /> 
    	<input type="hidden" id="selectBusNumber_taskId" />
    	<input type="hidden" id="selectBusNumber_ecnNumber" />
    	<input type="hidden" id="selectBusNumber_orderId" />
    	<input type="hidden" id="selectBusNumber_switch_mode" />
    	<input type="hidden" id="selectBusNumber_status" />
    	<input type="hidden" id="selectBusNumber_ecn_id" />
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btn_selectBusNumberModal">确认</button>
    </div>
</div>
<!-- selectBusNumberModal end -->

<!-- pic upload-->
<div class="modal" id="taskPicUpLoadModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:700px;display:none;left: 42%;">
    <div class="modal-header">
    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>技改任务图片上传</h3>		
    </div>
    <div class="modal-body">
    	<form action="ecnDocumentTask!imgload" enctype="multipart/form-data" method="post" class="form-horizontal" id="picuploadform">
	    	<table>
	    		<tr>
	    			 <td ><h4>原效果图:</h4> <input type="text" style="display:none;" id="pictaskid" name="pictaskid"></input></td>
	    			 <td colspan="2"><input type="file" name="file0" id="file0" multiple="multiple" class="btn btn-info btn-small"/></td>
	       		</tr>
	    		<tr>
	      			 <td colspan="3"><img src="" id="img0" style="max-height: 500px; max-width: 500px;min-height: 100px;"></td>
	      		</tr>
	      		<tr>
	    			 <td><h4>整改后效果图:</h4></td>
	     			 <td colspan="2"><input type="file" name="file1" id="file1" multiple="multiple" class="btn btn-info btn-small"/></td>      			 
	       		</tr>
	      		<tr>
	      			 <td colspan="3"><img src="" id="img1" style="max-height: 500px; max-width: 500px;min-height: 100px;"></td>
	      		</tr>
	       </table>
       </form>
    </div>
    <div class="modal-footer">
       <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
       <button class="btn btn-primary" id="taskPicbtnAddConfirm">确认</button>
 	</div>
</div>
<!-- pic upload-->


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
</body>
</html>