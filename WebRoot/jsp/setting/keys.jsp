<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 系统设置</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/setting/keys.js"></script>
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
	<%@ include file="../common/general_setting_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">弹性键</legend>
			<div style="margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>弹性键类型</td>
							<!-- <td>工厂简称</td> -->
							<td>弹性键代码</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<%-- <td><select name="" id="factory"
								class="input-medium carType">
							</select></td> --%>
							<td><input type="text" class="input-medium revise"
								id="input_keyType" /></td>
							<td><input type="text" class="input-medium revise"
								id="input_keyCode" /></td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
							<td><input type="button" class="btn btn-success" id="btnAdd"
								value="新增" style="margin-left: 2px;"></input></td>
						<!--  	<td><input id="btnDelete" type="button"
								class="btn btn-danger" value="刪除"></input></td> -->
						</tr>
					</table>
				</form>

				<table id="tableKeys" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
						<!--  	<th><input type="checkbox" id="checkall"></th> -->
							<th>弹性键类型</th>
							<th>弹性键代码</th>
							<th>名称</th>
							<th>值</th>
							<th>状态</th>
							<th>维护人</th>
							<th>维护时间</th>
							<th></th>
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
		<!-- NEW MODAL -->
		<div class="modal" id="newModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>新增弹性键</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="new_key_type">*&nbsp;弹性键类型</label>
						<div class="controls">
							<input type="text" style="width: 200px;" class="input-medium" id="new_key_type" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newFactory">*&nbsp;弹性键代码</label>
						<div class="controls">
							<input type="text" style="width: 200px;" class="input-medium" id="new_key_code" />
						</div>
					</div>
			        <div class="control-group">
		                <label class="control-label" for="">弹性键</label>
		                <div class="controls">
		                <!-- <input type="text" class="input-medium" placeholder="选择订单交期..." id="bmsFactoryOrder" /> -->
		                    <table style="margin-left:-25px" class="exp-table table">
					          <thead>
					            <tr>
					              <th ><button class="btn btn-success btn-xs" id="addKeyName"><span class="glyphicon glyphicon-plus"></span></button></th>
					              <th class="col-sm-5">名称</th>
					              <th class="col-sm-7">值</th>
					              <th ></th>
					              <th ></th>
					            </tr>
					          </thead>
					          <tbody id="keyName_parameters" class="exp-table">
					          </tbody>
					        </table>
		                </div>
		            </div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" id="btnClose" aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnAddConfirm">确认新增</button>
			</div>
		</div>
		<!-- EDIT MODAL -->
		<div class="modal" id="editModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;width: 750px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>编辑弹性键</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="edit_key_type">*&nbsp;弹性键类型</label>
						<div class="controls">
							<input type="text" disabled='disabled' style="width: 200px;" class="input-medium" id="edit_key_type" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newFactory">*&nbsp;弹性键代码</label>
						<div class="controls">
							<input type="text" disabled='disabled' style="width: 200px;" class="input-medium" id="edit_key_code" />
						</div>
					</div>
					<div class="control-group">
		                <label class="control-label" for="">弹性键</label>
		                <div class="controls">
		                <!-- <input type="text" class="input-medium" placeholder="选择订单交期..." id="bmsFactoryOrder" /> -->
		                    <table style="margin-left:-25px" class="exp-table table">
					          <thead>
					            <tr>
					              <th ><button class="btn btn-success btn-xs" id="editKeyName"><span class="glyphicon glyphicon-plus"></span></button></th>
					              <th class="col-sm-5">名称</th>
					              <th class="col-sm-7">值</th>
					              <th class="col-sm-7">状态</th>
					            </tr>
					          </thead>
					          <tbody id="editKeyName_parameters" class="exp-table">
					          </tbody>
					        </table>
		                </div>
		            </div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnEditConfirm">确认编辑</button>
			</div>
		</div>
	</div>
	</div>
</body>
</html>