<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>技改任务维护</title>
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
<script type="text/javascript" src="js/techtrans/techTaskMaintain.js"></script>
<style type="text/css">
.section-head {
	border-left: 7px solid #000;
	padding-left: 10px;
	margin-top: 25px;
	margin-bottom: 20px;
}

.glyphicon {
	position: relative;
	top: 1px;
	display: inline-block;
	font-family: 'Glyphicons Halflings';
	font-style: normal;
	font-weight: 400;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale
}

.glyphicon-plus:before {
	content: "\2b"
}

*::before, *::after {
	box-sizing: border-box;
}

.btn-xs, .btn-group-xs>.btn {
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

.offlineFont {
	color: red
}

.input[type="text"] {
	height: 30px;
}

.newTable td {
	height: 40px;
}
.editTable td {
	height: 40px;
}
</style>
</head>
<body>
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<!-- Tab panes -->
	<div class="content-wrapper " unselectable="on" onselectstart="return false;" style="-moz-user-select: -moz-none;">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<legend>技改任务维护</legend>
				<div id="taskFollow">
					<form id="form" class="well form-search">
						<table>
							<thead>
								<tr>
									<td>技改单编号</td>
									<td>任务内容</td>
									<td>技改单日期</td>
									<td>状态</td>
								</tr>
								<tr>

									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改单编号..." id="tech_order_no"></td>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入任务内容..." id="task_content"></td>

									<td><input name="tech_date_start" id="tech_date_start" class="Wdate" style="height: 30px; background-color: white; width: 120px" onfocus="javascript:WdatePicker()" type="text"> 至 <input name="tech_date_end" id="tech_date_end" class="Wdate" onfocus="javascript:WdatePicker()" style="height: 30px; background-color: white; width: 120px" type="text"></td>
									<td><select class="input-medium carType" id="status" style="width: 80px">
											<option value="">全部</option>
											<option value="已创建">已创建</option>
											<option value="已分配">已分配</option>
											<option value="已评估">已评估</option>
											<option value="已完成">已完成</option>
									</select> <input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input> <input type="button" class="btn btn-success" id="btnAdd" value="新增" style="margin-left: 2px;"></input></td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</form>
					<table id="tableTaskFollow" class="table table-bordered table-striped" style="font-size: 12px;">
						
						<thead>
							<tr>

								<th>技改任务</th>
								<th>变更单类型</th>
								<th>技改单号</th>
								<th>变更单附件</th>
								<th>技改单日期</th>
								<th>责任单位</th>
								<th>重大变更</th>
								<th>顾客变更</th>
								<th>顾客变更单附件</th>
								<th>重复变更</th>
								<th>技改类型</th>

								<th>操作</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					<div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
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
	</div>
	<div style="display: none; position: fixed; z-index: 999; margin-top: 150px; margin-left: 500px" class="divLoading">
		<span><i class="fa fa-spinner fa-spin fa-4x" style="height: 1em;"></i></span>
	</div>

	<div class="modal" id="newModal" tabindex="-1" role="dialog" style="display: none; width: 920px; left: 38%; top: 20px">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="newModal_title">技改任务维护-新增</h3>
		</div>
		<div class="modal-body" style="min-height:500px;">
			<form id="addForm" enctype="multipart/form-data" method="post" action="techTask!addTechTaskMaintain.action" class="form-horizontal">
				<div style="">
					
					<div style="">
						<table width="100%" class="newTable">
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改任务：</td>
								<td colspan="3"><textarea name="new_task_content" style="width: 100%;" class="input-small" placeholder="" id="new_task_content" rows=1></textarea></td>
							</tr>
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改单号：</td>
								<td colspan="1"><input type="text" name="new_tech_order_no" style="width: 220px;" class="input-medium" id="new_tech_order_no" /></td>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改点数：</td>
								<td colspan="1"><input type="text" name="new_tech_point_num" style="width: 220px;" class="input-medium" id="new_tech_point_num" onkeyup="value=value.replace(/[^\d]/g,'')" onpaste="return false;" /></td>
							</tr>
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;变更单类型：</td>
								<td colspan="1"><select name="new_tech_order_type" id="new_tech_order_type" class="input-medium carType">
										<option>请选择</option>
								</select></td>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改类型：</td>
								<td colspan="1"><select name="new_tech_type" id="new_tech_type" class="input-medium carType">
										<option>请选择</option>
								</select></td>
							</tr>
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改单日期：</td>
								<td colspan="1"><input type="text" name="new_tech_date" id="new_tech_date" class="Wdate" style="height: 30px; background-color: white; width: 150px" onClick="WdatePicker({el:'new_tech_date',dateFmt:'yyyy-MM-dd'});" /></td>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;责任单位：</td>
								<td colspan="1"><select name="new_duty_unit" id="new_duty_unit" class="input-medium carType">
										<option>请选择</option>
								</select></td>
							</tr>
							<tr>
								<td width="100px;">重大变更：</td>
								<td colspan="1"><input value='重大变更' type="checkbox" name="new_major_change" title="" id="new_major_change"/>&nbsp;是</td>
								<td width="100px;">重复变更：</td>
								<td colspan="1"><input value='重复变更' type="checkbox" name="new_repeat_change" title="" id="new_repeat_change"/>&nbsp;是</td>
							</tr>
							<tr>
								<td width="100px;">顾客变更：</td>
								<td colspan="1"><input value='顾客变更' type="checkbox" name="new_custom_change" title="" id="new_custom_change"/>&nbsp;是</td>
								<td width="100px;">顾客变更单号：</td>
								<td colspan="1"><input type="text" name="new_custom_change_no" style="width: 220px;" class="input-medium" id="new_custom_change_no" /></td>
							</tr>
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改单附件：</td>
								<td colspan="1"><input type="file" accept="application/pdf" name="new_tech_order_file" id="new_tech_order_file" style="height: 30px; width: 180px"></td>
								<td width="100px;">顾客变更单附件：</td>
								<td colspan="1"><input type="file" accept="application/pdf" name="new_custom_change_file" id="new_custom_change_file" style="height: 30px; width: 180px"></td>
							</tr>

						</table>
					</div>
				</div>
			</form>
			<div style="margin-top: 10px;">
				<table>
					<tr>
						<td width="100px;">变更物料清单：</td>
						<td colspan="1">

							<form id="uploadForm" action="techTask!uploadChangedMaterialList.action" enctype="multipart/form-data" method="post" class="form-horizontal">
								<input id="file" class="btn btn-info btn-small" name="file" accept=".xlsx" type="file"> <input id="btn_upload" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)" type="button"> &nbsp;&nbsp;&nbsp;&nbsp; <a href="./download/ChangedMaterialList.xlsx">下载批导模板</a>
							</form>

						</td>

					</tr>
				</table>
			</div>

			<div class="container" style="margin-top: 10px;">
				<div style="width: 100%">
					<table id="table1" class="table table-bordered table-striped" style="font-size: 12px;">
						<thead>
							<tr>
								<th> </th>
								<th>SAP料号</th>
								<th>物料描述</th>
								<th>物料类型</th>
								<th>材料/规格</th>
								<th>单位</th>
								<th>供应商代码</th>
								<th>单车损耗%</th>
								<th>层级用量</th>
								<th>单重</th>
								<th>单车用量含损耗</th>
								<th>使用车间</th>

								<th>工序</th>
								<th>装配位置</th>
								<th>备注</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" id="btnClose" aria-hidden="true">关闭</button>
			<button class="btn btn-primary" id="btnAddConfirm">确认新增</button>
		</div>
	</div>
	
	<div class="modal" id="editModal" tabindex="-1" role="dialog" style="display: none; width: 920px; left: 38%; top: 20px">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="editModal_title">技改任务维护-修改</h3>
		</div>
		<div class="modal-body" style="min-height:500px;">
			<form id="editForm" enctype="multipart/form-data" method="post" action="techTask!editTechTaskMaintain.action" class="form-horizontal">
				<div style="">
					<input type="hidden" name="tech_task_id" id="tech_task_id" value="" />
					<div style="">
						<table width="100%" class="editTable">
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改任务：</td>
								<td colspan="3"><textarea name="edit_task_content" style="width: 100%;" class="input-small" placeholder="" id="edit_task_content" rows=1></textarea></td>
							</tr>
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改单号：</td>
								<td colspan="1"><input type="text" name="edit_tech_order_no" style="width: 220px;" class="input-medium" id="edit_tech_order_no" /></td>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改点数：</td>
								<td colspan="1"><input type="text" name="edit_tech_point_num" style="width: 220px;" class="input-medium" id="edit_tech_point_num" onkeyup="value=value.replace(/[^\d]/g,'')" onpaste="return false;" /></td>
							</tr>
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;变更单类型：</td>
								<td colspan="1"><select name="edit_tech_order_type" id="edit_tech_order_type" class="input-medium carType">
										<option>请选择</option>
								</select></td>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改类型：</td>
								<td colspan="1"><select name="edit_tech_type" id="edit_tech_type" class="input-medium carType">
										<option>请选择</option>
								</select></td>
							</tr>
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改单日期：</td>
								<td colspan="1"><input type="text" name="edit_tech_date" id="edit_tech_date" class="Wdate" style="height: 30px; background-color: white; width: 150px" onClick="WdatePicker({el:'edit_tech_date',dateFmt:'yyyy-MM-dd'});" /></td>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;责任单位：</td>
								<td colspan="1"><select name="edit_duty_unit" id="edit_duty_unit" class="input-medium carType">
										<option>请选择</option>
								</select></td>
							</tr>
							<tr>
								<td width="100px;">重大变更：</td>
								<td colspan="1"><input value='重大变更' type="checkbox" name="edit_major_change" title="" id="edit_major_change"/>&nbsp;是</td>
								<td width="100px;">重复变更：</td>
								<td colspan="1"><input value='重复变更' type="checkbox" name="edit_repeat_change" title="" id="edit_repeat_change"/>&nbsp;是</td>
							</tr>
							<tr>
								<td width="100px;">顾客变更：</td>
								<td colspan="1"><input value='顾客变更' type="checkbox" name="edit_custom_change" title="" id="edit_custom_change"/>&nbsp;是</td>
								<td width="100px;">顾客变更单号：</td>
								<td colspan="1"><input type="text" name="edit_custom_change_no" style="width: 220px;" class="input-medium" id="edit_custom_change_no" /></td>
							</tr>
							<tr>
								<td width="100px;"><span style="color: red;">*</span>&nbsp;技改单附件：</td>
								<td colspan="1"><input type="file" accept="application/pdf" name="edit_tech_order_file" id="edit_tech_order_file" style="height: 30px; width: 180px"></td>
								<td width="100px;">顾客变更单附件：</td>
								<td colspan="1"><input type="file" accept="application/pdf" name="edit_custom_change_file" id="edit_custom_change_file" style="height: 30px; width: 180px"></td>
							</tr>

						</table>
					</div>
				</div>
			</form>
			<div style="margin-top: 10px;">
				<table>
					<tr>
						<td width="100px;">变更物料清单：</td>
						<td colspan="1">

							<form id="uploadForm2" action="techTask!uploadChangedMaterialList.action" enctype="multipart/form-data" method="post" class="form-horizontal">
								<input id="file" class="btn btn-info btn-small" name="file" accept=".xlsx" type="file"> <input id="btn_upload" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach2(this.form, this.form.file.value)" type="button"> &nbsp;&nbsp;&nbsp;&nbsp; <a href="./download/ChangedMaterialList.xlsx">下载批导模板</a>
							</form>

						</td>

					</tr>
				</table>
			</div>

			<div class="container" style="margin-top: 10px;">
				<div style="width: 100%">
					<table id="table2" class="table table-bordered table-striped" style="font-size: 12px;">
						<thead>
							<tr>
								<th> </th>
								<th>SAP料号</th>
								<th>物料描述</th>
								<th>物料类型</th>
								<th>材料/规格</th>
								<th>单位</th>
								<th>供应商代码</th>
								<th>单车损耗%</th>
								<th>层级用量</th>
								<th>单重</th>
								<th>单车用量含损耗</th>
								<th>使用车间</th>

								<th>工序</th>
								<th>装配位置</th>
								<th>备注</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" id="btnClose" aria-hidden="true">关闭</button>
			<button class="btn btn-primary" id="btnEditConfirm">确认修改</button>
		</div>
	</div>
</body>
</html>