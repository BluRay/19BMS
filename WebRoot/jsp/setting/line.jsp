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
<script type="text/javascript" src="js/setting/line.js"></script>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_setting_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">车间线别</legend>
			<div style="margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>工厂</td>
							<!-- <td>工厂简称</td> -->
							<td>车间</td>
							<td>线别</td>
							<td>状态</td>
							<td></td>
						</tr>
						<tr>
							<%-- <td><select name="" id="factory"
								class="input-medium carType">
							</select></td> --%>
							<td><select name="" id="seach_factory" class="input-medium carType">
								</select></td>
							<td>
								<select name="" id="seach_workshop" style="width:80px;" class="input-medium carType">
									<option value="">全部</option>
								</select></td>
							<td><input type="text" style="width:80px;" class="input-medium revise"
								id="input_lineName" /></td>
							<td>							<select name="" id="input_deleteFlag" class="input-medium carType">
								<option value="-1">全部</option>
								<option selected="selected" value="0">使用</option>
								<option value="1">删除</option>
							</select></td>
							<td>&nbsp;&nbsp;&nbsp;</td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
							<td><input type="button" class="btn btn-success" id="btnAdd"
								value="新增" style="margin-left: 2px;"></input></td>
							<td><input id="btnDelete" type="button"
								class="btn btn-danger" value="刪除"></input></td>
						</tr>
					</table>
				</form>

				<table id="tableLine" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
							<th><input type="checkbox" id="checkall"></th>
							<th>工厂</th>
							<th>车间</th>
							<th>线别</th>
							<th>备注</th>
							<th>删除</th>
							<th>维护人</th>
							<th>维护时间</th>
							<th></th>
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
				<h3>新增线别</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="newFactory">*&nbsp;工厂</label>
						<div class="controls">
							<select name="" id="new_factory" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newWorkshop">*&nbsp;车间</label>
						<div class="controls">
							<select name="" id="new_workshop" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newAssembCode">*&nbsp;线别</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_lineName" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">&nbsp;备注</label>
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
				<h3>编辑线别</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;工厂</label>
						<div class="controls">
							<select name="" id="edit_factory" disabled="disabled" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;车间</label>
						<div class="controls">
							<select name="" id="edit_workshop" disabled="disabled" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;线别</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_lineName" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">&nbsp;备注</label>
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