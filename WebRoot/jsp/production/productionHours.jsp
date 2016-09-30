<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 人员工时</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<link href="css/pannel.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionHours.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript">
		$(function () {
	    	$('#tab01 a:first').tab('show');//初始化显示哪个tab
	  		//alert("sss");
	    	$('#tab01 a').click(function (e) {
	      	e.preventDefault();//阻止a链接的跳转行为
	      	$(this).tab('show');//显示当前选中的链接及关联的content
	    })
	  }) ;
	</script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">人员工时</legend>
			
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>生产车间</td>
						<td>生产日期</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td>
						<select name="" id="search_workshop" class="input-medium carType">						
						<option value="">全部</option>
						</select></td>
						<td><input class="input-small" placeholder="开始日期..." id="date_start" onclick="WdatePicker({el:'date_start',dateFmt:'yyyyMMdd'});" type="text">
						- <input class="input-small" placeholder="截止日期..." id="date_end" onclick="WdatePicker({el:'date_end',dateFmt:'yyyyMMdd'});" type="text">
						</td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="button" class="btn btn-info" id="btnAdd" value="新增" style="margin-left: 2px;"></input>
						<!-- <input type="button" class="btn btn-danger" id="btnDel" value="删除" style="margin-left: 2px;"></input> -->
						<input type="text" style="display:none;" class="input-small revise" id="configs"></input>
						<input type="text" style="display:none;width:350px" class="input-large revise" id="planDone_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
			<table id="tableWorkshopSupply" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<th style="text-align:center;width:60px">序号</th>
						<th style="text-align:center;">生产工厂</th>
						<th style="text-align:center;">生产车间</th>
						<th style="text-align:center;">生产订单</th>
						<th style="text-align:center;">生产日期</th>
						<th style="text-align:center;">现有员工</th>
						<th style="text-align:center;">实到人数</th>
						<th style="text-align:center;">有效工时</th>
						<th style="text-align:center;">等待工时</th>
						<th style="text-align:center;">停线工时</th>
						<th style="text-align:center;">操作</th>
					</tr>
				</thead>
				<tbody>	
				</tbody>
			</table>
			<div id="pagination"
					class="pagination pagination-small pagination-right"
					style="display: none">
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
			
<!-- new order start -->
<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:600px;display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>人员工时登记</h3>
    </div>
    <div class="modal-body">
    	<table>
			<tr>
				<td width="30px"></td>
				<td>生产工厂</td>
				<td>生产车间</td>
				<td>生产日期</td>
			</tr>
			<tr>
				<td></td>
				<td><select name="" id="new_factory" class="input-medium carType">
				</select></td>
				<td><select name="" id="new_workshop" class="input-medium carType">
				</select></td>
				<td><input class="input-medium" placeholder="日期..." id="new_date" onclick="WdatePicker({el:'new_date',dateFmt:'yyyyMMdd'});" type="text"></td>
			</tr>
		</table>
    </div>
    <div class="container">
    	<ul class="nav nav-tabs" id="tab01">
			<li class="active"><a href="#normal" style="font-size: 14px; color: #333">正常工时</a></li>
			<li><a href="#wait" onclick="getWaitOrder();" style="font-size: 14px; color: #333">等待工时</a></li>
			<li><a href="#pause" onclick="getPauseOrder();"  style="font-size: 14px; color: #333">停线工时</a></li>
		</ul>
		<div class="tab-content">
			<div class="tab-pane active" id="normal">
	            <div class="control-group">           
               		<table class="exp-table table">
			          <thead>
			            <tr>
			              <th ><button style="height:28px" class="btn btn-success btn-xs" id="btn_addProductionHours"><span class="glyphicon glyphicon-plus">+</span></button></th>
			              <th style="width:100px" class="col-sm-5">生产订单</th>
			              <th style="width:60px" class="col-sm-5">现有员工</th>
			              <th style="width:60px" class="col-sm-5">实到人数</th>
			              <th class="col-sm-7">有效工时</th>
			            </tr>
			          </thead>
			          <tbody id="productionHours_parameters" class="exp-table">
			          </tbody>
			        </table>  
	            </div>
			</div>
			<div class="tab-pane" id="wait">
				<div class="control-group">           
               		<table class="exp-table table">
			          <thead>
			            <tr>
			              <th ></th>
			              <th class="col-sm-5">生产订单</th>
			              <th class="col-sm-5">人数</th>
			              <th class="col-sm-5">等待工时</th>
			              <th class="col-sm-7">工序</th>
			              <th class="col-sm-7">原因</th>
			              <th class="col-sm-7">责任单位</th>
			              <th class="col-sm-7">责任人</th>
			            </tr>
			          </thead>
			          <tbody id="productionHours_parameters_wait" class="exp-table">
			          </tbody>
			        </table>  
	            </div>
			</div>
			<div class="tab-pane" id="pause">
				<div class="control-group">           
               		<table class="exp-table table">
			          <thead>
			            <tr>
			              <th ></th>
			              <th class="col-sm-5">生产订单</th>
			              <th class="col-sm-5">人数</th>
			              <th class="col-sm-5">停线工时</th>
			              <th class="col-sm-7">原因</th>
			              <th class="col-sm-7">责任单位</th>
			              <th class="col-sm-7">责任人</th>
			            </tr>
			          </thead>
			          <tbody id="productionHours_parameters_pause" class="exp-table">
			          </tbody>
			        </table>  
	            </div>
			</div>
		</div>
    </div> 
    
   <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
    <button class="btn btn-primary" id="btnAddNormalConfirm">确认</button>
   </div>  
    
</div>
<!-- new order End -->		

<!-- Edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:600px;display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>编辑人员工时</h3>
    </div>
    
    <div class="modal-body">
    	<table>
			<tr>
				<td width="30px"></td>
				<td>生产工厂</td>
				<td>生产车间</td>
				<td>生产日期</td>
			</tr>
			<tr>
				<td></td>
				<td><select name="" disabled="disabled" id="edit_factory" class="input-medium carType">
				</select></td>
				<td><select name="" disabled="disabled" id="edit_workshop" class="input-medium carType">
				</select></td>
				<td><input class="input-medium" disabled="disabled" placeholder="日期..." id="edit_date" onclick="WdatePicker({el:'edit_date',dateFmt:'yyyyMMdd'});" type="text">
				<input class="input-small" disabled="disabled" style="display:none;width:30px" id="edit_id" type="text"></td>
			</tr>
		</table>
    </div>
    <div class="container">
    	<ul class="nav nav-tabs" id="tab01">
			<li class="active"><a href="#edit_normal" style="font-size: 14px; color: #333">正常工时</a></li>
			<li><a href="#edit_wait" style="font-size: 14px; color: #333">等待工时</a></li>
			<li><a href="#edit_pause" style="font-size: 14px; color: #333">停线工时</a></li>
		</ul>
		<div class="tab-content">
			<div class="tab-pane active" id="edit_normal">
	            <div class="control-group">           
               		<table class="exp-table table">
			          <thead>
			            <tr>
			              <th style="width:80px" ></th>
			              <th style="width:100px" class="col-sm-5">生产订单</th>
			              <th style="width:60px" class="col-sm-5">现有员工</th>
			              <th style="width:60px" class="col-sm-5">实到人数</th>
			              <th class="col-sm-7">有效工时</th>
			            </tr>
			          </thead>
			          <tbody id="edit_productionHours_parameters" class="exp-table">
			          </tbody>
			        </table>  
	            </div>
			</div>
			<div class="tab-pane" id="edit_wait">
				<div class="control-group">           
               		<table class="exp-table table">
			          <thead>
			            <tr>
			              <th ></th>
			              <th class="col-sm-5">生产订单</th>
			              <th class="col-sm-5">人数</th>
			              <th class="col-sm-5">等待工时</th>
			              <th class="col-sm-7">工序</th>
			              <th class="col-sm-7">原因</th>
			              <th class="col-sm-7">责任单位</th>
			              <th class="col-sm-7">责任人</th>
			            </tr>
			          </thead>
			          <tbody id="edit_productionHours_parameters_wait" class="exp-table">
			          </tbody>
			        </table>  
	            </div>
			</div>
			<div class="tab-pane" id="edit_pause">
				<div class="control-group">           
               		<table class="exp-table table">
			          <thead>
			            <tr>
			              <th ></th>
			              <th class="col-sm-5">生产订单</th>
			              <th class="col-sm-5">人数</th>
			              <th class="col-sm-5">停线工时</th>
			              <th class="col-sm-7">原因</th>
			              <th class="col-sm-7">责任单位</th>
			              <th class="col-sm-7">责任人</th>
			            </tr>
			          </thead>
			          <tbody id="edit_productionHours_parameters_pause" class="exp-table">
			          </tbody>
			        </table>  
	            </div>
			</div>
		</div>
    </div> 
    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnEditConfirm">确认</button>
    </div>
</div>
<!-- Edit order End -->
	
		</div>
	</div>
</body>
</html>