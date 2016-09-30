<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 客户自编号</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionCustomerNumber.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">客户自编号</legend>
			<div style="margin: 0 auto;"><br/>
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<!-- <td>生产车间</td> -->
						<td>订单编号</td>
						<td>车号</td>
						<td>客户自编号</td>
						<td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<%-- <td><select name="" id="search_workshop" class="input-medium carType">	
						<option value="">全部</option>					
						</select></td> --%>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="车号..." id="search_bus_number" /></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="客户自编号..." id="search_customer_number" /></td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="button" class="btn btn-info" id="btnAdd" value="新增" style="margin-left: 2px;"></input>
						<input id="btnBulkAdd" class="btn btn-success" value="批量导入" type="button">
						</td>
						
					</tr>
				</table>
			</form>
			<div id="divBulkAdd" class="thumbnail" style="display:none;height: 95px;">
				<h5 align="left">客户自编号导入</h5>
				<!-- <form action="PlanImport.action" enctype="multipart/form-data" method="post" class="form-horizontal"> -->
				<form action="production!upload.action" enctype="multipart/form-data" method="post" class="form-horizontal">
					<input id="file" type="file" class="btn btn-info btn-small" name="file" accept="*.csv"/>
					<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
					<a href="download/customerNumber.csv">下载批导模板</a>
				</form>
            </div>
			<table id="tableCustomerNumber" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<th style="text-align:center;width:60px">序号</th>
						<th style="text-align:center;">订单编号</th>
						<th style="text-align:center;">车号</th>
						<th style="text-align:center;">客户自编号</th>
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
<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>新增客户自编号</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;订单编号</label>
                <div class="controls">
                    <input type="text" id="new_order_no" placeholder="订单编号..." class="input-medium" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;车号</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="车号..." id="new_BusNumber" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;客户自编号</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="客户自编号..." id="new_CustomerNumber" />
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnAddConfirm">确认新增</button>
        <button class="btn btn-success" id="btnAddContinue">继续新增</button>
    </div>
</div>
<!-- new order End -->				
<!-- edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>编辑客户自编号</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;订单编号</label>
                <div class="controls">
                    <input type="text" id="edit_order_no" placeholder="订单编号..." class="input-medium" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;车号</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="车号..." id="edit_BusNumber" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;客户自编号</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="客户自编号..." id="edit_CustomerNumber" />
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
<!-- edit order End -->					
		</div>
	</div>
</body>
</html>