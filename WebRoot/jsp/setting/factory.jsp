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
<script type="text/javascript" src="js/setting/factory.js"></script>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_setting_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">工厂</legend>
			<div style="margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>工厂</td>
							<!-- <td>工厂简称</td> -->
							<td>VIN装配厂代码</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<%-- <td><select name="" id="factory"
								class="input-medium carType">
							</select></td> --%>
							<td><input type="text" class="input-medium revise"
								id="input_factory" /></td>
							<td><input type="text" class="input-medium revise"
								id="input_assembcode" /></td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
							<td><input type="button" class="btn btn-success" id="btnAdd"
								value="新增" style="margin-left: 2px;"></input></td>
							<td><input id="btnDelete" type="button"
								class="btn btn-danger" value="刪除"></input></td>
						</tr>
					</table>
				</form>

				<table id="tableFactory" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
							<th><input type="checkbox" id="checkall"></th>
							<th>工厂简称</th>
							<th>工厂</th>
							<th>VIN装配厂代码</th>
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
				<h3>新增工厂</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="newFactoryCode">*&nbsp;工厂简称</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_factoryCode" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newFactory">*&nbsp;工厂</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_factory" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newAssembCode">*&nbsp;VIN装配厂代码</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_assembCode" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;地区</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_area" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;备注</label>
						<div class="controls">
							<textarea class="input-xlarge" id="new_memo" rows="2"></textarea>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnAddConfirm">确认新增</button>
			</div>
		</div>
		<!-- EDIT MODAL -->
		<div class="modal" id="editModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>编辑工厂</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;工厂简称</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_factoryCode" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;工厂</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_factory" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;VIN装配厂代码</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_assembCode" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;地区</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_area" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;备注</label>
						<div class="controls">
							<textarea class="input-xlarge" id="edit_memo" rows="2"></textarea>
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