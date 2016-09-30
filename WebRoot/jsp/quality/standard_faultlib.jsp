<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>品质</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/std_faultlib.js"></script>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="/jsp/common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">标准故障库</legend>
			<div style=" margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>零部件名称</td>
							<td>缺陷类别</td>
							<td>质量缺陷</td>							
				<!--  		<td>车间</td>
							<td>班组</td> -->	
							<td>严重等级</td>
							<td>缺陷分类</td>
							<td></td>
						</tr>
						<tr>
							<td><input type="text" class="input-medium revise"
								id="input_parts" /></td>
							<td><input type="text" class="input-medium revise"
								id="input_bug_type" /></td>
							<td><input type="text" class="input-medium revise"
								id="input_bug" /></td>
						<!--	<td><select name="" id="input_workshop"
								class="input-medium carType">
							</select></td>
							<td><select name="" id="input_group"
								class="input-medium carType">
							</select></td> -->	
							<td>
								<label class="checkbox">
								<input type="checkbox" name="faultlevel" value="S" />S
								</label>
								<label class="checkbox">
								<input type="checkbox" name="faultlevel" value="A" />A
								</label>
								<label class="checkbox">
								<input type="checkbox" name="faultlevel" value="B" />B
								</label>
								<label class="checkbox">
								<input type="checkbox" name="faultlevel" value="C" />C								
								</label>
								<span>&nbsp;&nbsp;</span>
							</td>
							
							<td>
								<label class="checkbox">
								<input type="checkbox" name="faulttype" value="1"/>尺寸
								</label>
								<label class="checkbox">
								<input type="checkbox" name="faulttype" value="0" />非尺寸
								</label>
							</td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input>
								<input type="button" class="btn btn-success"
								id="btnAdd" value="新增" style="margin-left: 2px;"></input></td>							
						</tr>
					</table>
				</form>

				<table id="tableResult" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
							<th>零部件名称</th>
							<th>缺陷类别</th>
							<th>质量缺陷</th>
							<th>严重等级</th>
							<th>缺陷分类</th>
						<!-- 	<th>车间</th>
							<th>班组</th> -->
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
<!-- NEW MODAL -->
		<div class="modal fade" id="newModal" tabindex="-1" role="dialog" 
			aria-hidden="true" style="display: none;width:600px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>标准故障库新增</h3>
			</div>
			<div class="modal-body" >
				<form id="newRecordForm" class="form-horizontal" method="post" >
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;零部件名称</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_parts" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;缺陷类别</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_bug_type" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;质量缺陷</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_bug" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;严重等级</label>
						<div class="controls">
							<select class="input-medium" id="new_faultlevel" >
								<option value="S">S</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;缺陷分类</label>
						<div class="controls">
							<select class="input-medium" id="new_faulttype" >
								<option value="0">非尺寸</option>
								<option value="1">尺寸</option>
							</select>
						</div>
					</div>
					<%-- <div class="control-group">
						<label class="control-label" for="">*&nbsp;车间</label>
						<div class="controls">
							<select class="input-medium" id="new_workshop" ></select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;班组</label>
						<div class="controls">
							<select class="input-medium" id="new_workgroup" ></select>
						</div>
					</div> --%>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
				<button class="btn btn-primary" id="btnAddConfirm">保存</button>
			</div>
		</div>
		
		<!-- edit MODAL -->
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" 
			aria-hidden="true" style="display: none;width:600px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>标准故障库编辑</h3>
			</div>
			<div class="modal-body" >
				<form id="editRecordForm" class="form-horizontal" method="post" >
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;零部件名称</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_parts"  />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;缺陷类别</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_bug_type" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;质量缺陷</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_bug"  />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;严重等级</label>
						<div class="controls">
							<select class="input-medium" id="edit_faultlevel" >
								<option value="S">S</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;缺陷分类</label>
						<div class="controls">
							<select class="input-medium" id="edit_faulttype" >
								<option value="0">非尺寸</option>
								<option value="1">尺寸</option>								
							</select>
						</div>
					</div>
					<%-- <div class="control-group">
						<label class="control-label" for="">*&nbsp;车间</label>
						<div class="controls">
							<select class="input-medium" id="edit_workshop" ></select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;班组</label>
						<div class="controls">
							<select class="input-medium" id="edit_workgroup" ></select>
						</div>
					</div> --%>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
				<button class="btn btn-primary" id="btnEditConfirm">保存</button>
			</div>
		</div>
		</div>
	</div>
</div>
</body>
</html>