<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 车间供货</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionWorkshopSupply.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">车间供货</legend>
			
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>供货车间</td>
						<td>接收车间</td>
						<td>订单编号</td>
						<td>生产日期</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" style="width:100px" class="input-medium carType">
						</select></td>
						<td><select name="" id="search_workshop" style="width:100px" class="input-medium carType">						
						</select></td>
						<td><select name="" id="search_receiveworkshop" style="width:100px" class="input-medium carType">						
						</select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td><input class="input-small" placeholder="开始日期..." id="date_start" onclick="WdatePicker({el:'date_start',dateFmt:'yyyy-MM-dd'});" type="text">
						- <input class="input-small" placeholder="截止日期..." id="date_end" onclick="WdatePicker({el:'date_end',dateFmt:'yyyy-MM-dd'});" type="text">
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
						<!-- <th style="text-align:center;" width="35px"><input type="checkbox" id="checkall"></th> -->			
						<th style="text-align:center;width:60px">序号</th>
						<th style="text-align:center;">工厂</th>
						<th style="text-align:center;">供货车间</th>
						<th style="text-align:center;">接收车间</th>
						<th style="text-align:center;">生产订单</th>
						<th style="text-align:center;">数量</th>
						<th style="text-align:center;">累计供应数</th>
						<th style="text-align:center;">日期</th>
						<th style="text-align:center;">维护人</th>
						<th style="text-align:center;">维护时间</th>
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
<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;min-width:600px">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>车间供货登记</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="newFactory">*&nbsp;生产工厂</label>
                <div class="controls">
                    <select name="" id="new_factory" class="input-medium carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;订单编号</label>
                <div class="controls">
                    <input type="text" id="new_order_no" placeholder="订单编号..." class="input-medium" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;供货车间</label>
                <div class="controls">
					<select name="" id="new_workshop" class="input-medium carType">						
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;接收车间</label>
                <div class="controls">
					<select name="" id="new_receiveworkshop" class="input-medium carType">						
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="new_quantity">*&nbsp;供应车付</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="数量..." id="new_quantity"/> 辆
                    <span class="prodinfo" style="text-color:green;display:none"></span>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;交付日期</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="选择订单交期..." id="new_supply_date" onClick="WdatePicker({el:'new_supply_date',dateFmt:'yyyy-MM-dd',maxDate:cDate});"/>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnAddConfirm">确认</button>
    </div>
</div>
<!-- new order End -->		

<!-- Edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;min-width:600px">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>编辑车间供货</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="newFactory">*&nbsp;生产工厂</label>
                <div class="controls">
                    <select name="" id="edit_factory" class="input-medium carType">
					</select>
					<input type="text" style="display:none" id="edit_id" placeholder="" class="input-medium" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;订单编号</label>
                <div class="controls">
                    <input type="text" id="edit_order_no" placeholder="订单编号..." class="input-medium" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;供货车间</label>
                <div class="controls">
					<select name="" id="edit_workshop" class="input-medium carType">						
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;接收车间</label>
                <div class="controls">
					<select name="" id="edit_receiveworkshop" class="input-medium carType">						
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="new_quantity">*&nbsp;供焊装车付</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="数量..." id="edit_quantity"/> 辆
               		<span class="prodinfo" style="text-color:green;display:none"></span>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;交付日期</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="选择订单交期..." id="edit_supply_date" onClick="WdatePicker({el:'edit_supply_date',dateFmt:'yyyy-MM-dd',maxDate:cDate});"/>
                </div>
            </div>
        </form>
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