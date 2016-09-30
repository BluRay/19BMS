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
<script type="text/javascript" src="js/setting/parts.js"></script>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_setting_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">零部件</legend>
			<div style="margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>零部件类别</td>
							<td>使用车间</td>
							<!-- <td>工厂简称</td> -->
							<td>零部件名称</td>
							<td></td>
						</tr>
						<tr>
							<td><select name="" style="width:120px;" id="seach_parts_type_id" class="input-medium carType">
								</select></td>
							<td>
								<select name="" id="seach_workshop" style="width:80px;" class="input-medium carType">
									<option value="">全部</option>
								</select></td>
							<td><input type="text" class="input-medium carType"
								id="seach_parts_name" /></td>
							<td>品质件</td>
							<td><input type="checkbox" id="input_quality_flag" ></td>
							<td>&nbsp;&nbsp;&nbsp;</td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
							<td><input type="button" class="btn btn-success" id="btnAdd"
								value="新增" style="margin-left: 2px;"></input></td>
							<td><input type="button"  class="btn btn-danger" id="btnImport" value="导入" style="margin-left: 2px;"></input></td>
						</tr>
					</table>
				</form>
				<div id="divBulkAdd" class="thumbnail" style="display:none;height: 90px;">
					<h5 align="left">零部件导入</h5>
					<!-- <form action="PlanImport.action" enctype="multipart/form-data" method="post" class="form-horizontal"> -->
					<form action="parts!upload.action" enctype="multipart/form-data" method="post" class="form-horizontal">
						<input id="file" type="file" class="btn btn-info btn-small" name="file" accept="*.csv"/>
						<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
						<a href="download/parts.csv">下载批导模板</a>
					</form>
	            </div>
	            <div id="maindiv" height:auto;overflow:auto; border:0px solid #000000;"><!-- 主体 --> 
				<table id="tableProcess" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
							<th>序号</th>
							<th>零部件类别</th>
							<th>零部件名称</th>
							<th>使用车间</th>
							<th>品质件</th>
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

		</div>
		<!-- NEW MODAL -->
		<div class="modal" id="newModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>新增零部件</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="newFactory">*&nbsp;零部件类别</label>
						<div class="controls">
							<select name="" id="new_parts_type_id" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newProcessName">*&nbsp;零部件名称</label>
						<div class="controls">
							<input type="text" style="width: 220px;" class="input-medium" id="new_parts_name" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newProcessName">&nbsp;零部件编码</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_parts_code" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newWorkshop">&nbsp;使用车间</label>
						<div class="controls">
							<select name="" id="new_workshop" class="input-medium carType">
								<option>请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="new_quality_flag">品质件</label>
						<div class="controls">
							<input type="checkbox" class="checkbox" id="new_quality_flag" />
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
				<h3>编辑零部件</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;零部件类别</label>
						<div class="controls">
							<select name="" id="edit_parts_type_id"  class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"  for="editProcessCode">*&nbsp;零部件名称</label>
						<div class="controls">
							<input type="text" style="width: 220px;" class="input-medium" id="edit_parts_name" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="editProcessName">&nbsp;零部件编码</label>
						<div class="controls">
							<input type="text" style="width: 220px;" class="input-medium" id="edit_parts_code" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">&nbsp;使用车间</label>
						<div class="controls">
							<select name="" id="edit_workshop" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="edit_quality_flag">品质件</label>
						<div class="controls">
							<input type="checkbox" class="input-medium" id="edit_quality_flag" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="editKeyProcessFlag">删除</label>
						<div class="controls">
							<input type="checkbox" class="input-medium" id="edit_delete_flag" />
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