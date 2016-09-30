<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>部门标准岗位</title>
<!-- Le styles -->


<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">

<link href="js/datatables/css/jquery.dataTables.min.css" rel="stylesheet">

<link href="css/orgStructure.css" rel="stylesheet">

<link rel="stylesheet" href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
<link href="js/primitives/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />

 <link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
 <style type="text/css">
.bp-title {
    padding: 2px 0px 0px 5px;
}
.btn {
    padding: 1px 12px 3px 11px;
}
input[type="text"] {
    margin-bottom: 0px;
}
.well {
    margin-bottom: 10px;
}
.section-head {
    border-left: 7px solid #000;
    margin-bottom: 20px;
    padding-left: 10px;
}
#standardPositionTable .close {
	float: none;
}
 </style>

<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.10.2.custom.min.js"></script>
 
<!--<script  type="text/javascript" src="js/primitives/primitives.min.js"></script>-->

<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>

<!--<script type="text/javascript" src="js/datatables/jquery.dataTables.min.js"></script>-->

<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/velocity.min.js"></script>
<script type="text/javascript" src="js/velocity.ui.min.js"></script>

<!-- add by wuxiao -->
<script type="text/javascript" src="js/hr/standardPosition.js"></script>

</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
			<legend id="leg">部门标准岗位</legend>	
			    <div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8; overflow:auto; ">
					<ul id="treeDemo" class="ztree"></ul>
				</div>
				<div style="margin-left: 235px;margin-top: -20px;margin-bottom: 10px"><br/>
					<form id="form" class="well form-search" style="margin: 0px;padding: 8px;">
						<table>
							<tr>
								<td nowrap="nowrap">
									<div><span class="section-head" id="allParents" style="font-size:18px;"></span></div>
								</td>
								<td width="100%" nowrap="nowrap"></td>
								<td align="right" nowrap="nowrap">
									<input id="btnImport" class="btn btn-primary" type="button" style="margin-left:2px;" value="导入">
									<input id="btnExport" class="btn btn-success" type="button" value="导出">
									<!-- <a href="./download/standardPosition.xlsx">导入模板下载</a> -->
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div id="divImportFromFile" class="thumbnail" style="display:none;margin-left:235px;margin-bottom:10px;height:95px;">
					<h5 align="left">标准岗位导入</h5>
					<!-- <form action="PlanImport.action" enctype="multipart/form-data" method="post" class="form-horizontal"> -->
					<form action="orgData!upload.action" enctype="multipart/form-data" method="post" class="form-horizontal">
						<input id="file" type="file" class="btn btn-info btn-small" name="file" accept=".xlsx"/>
						<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
						<a href="./download/standardPosition.xlsx">下载批导模板</a>
					</form>
            	</div>
            	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input style="height: 30px;width:100px;" type="text" class="revise carType sequence" id="job_no" placeholder="岗位编号..."/>
				<div id="tablediv" style="margin-left:235px;max-height: 410px;overflow:auto;margin-bottom:5px">
					<table id="standardPositionTable" class="exp-table table" style="margin-bottom: 5px;table-layout: fixed;font-size: 12px;">
						<thead>
						<tr>
							<th width="50px">
								<button id="addParm" class="btn btn-success btn-xs">
									<span>+</span>
								</button>
							</th>
							<th>
								岗位编号
							</th>
							<th>
								岗位名称
							</th>
							<th>
								岗位类别
							</th>
							<th>
								岗位级别
							</th>
							<th width="200px">
								岗位职责
							</th>
							<th>
								岗位说明书
							</th>
						</tr>
						
						</thead>
						<tbody class="exp-table">
						
						</tbody>
					</table>
					<!-- &nbsp;<input id="btnAdd" class="btn btn-success" type="button" value="添加"> -->
				</div>
				
			</div>
		</div>
	</div>

	<!-- 权限编辑modal -->
	<div class="modal" id="positionModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;width:260px;margin-left:-150px">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3>岗位选择</h3>
		</div>
		<div class="modal-body">
		<!-- <form action="account!assignAuth.action" method="post" id="assignForm"> -->
			<div class="accordion">
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_1_table"
						href="#grade_1">总经理
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_1">全选</label>	
					</div>				
				</div>
				<div id="grade_1" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_1_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_2_table"
						href="#grade_2">经理
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_2">全选</label>	
					</div>				
				</div>
				<div id="grade_2" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_2_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_3_table"
						href="#grade_3">厂长
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_3">全选</label>	
					</div>				
				</div>
				<div id="grade_3" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_3_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_4_table"
						href="#grade_4">科长
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_4">全选</label>	
					</div>				
				</div>
				<div id="grade_4" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_4_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_5_table"
						href="#grade_5">车间主任
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_5">全选</label>	
					</div>				
				</div>
				<div id="grade_5" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_5_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_6_table"
						href="#grade_6">主任科员
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_6">全选</label>	
					</div>				
				</div>
				<div id="grade_6" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_6_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_7_table"
						href="#grade_7">高级工程师
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_7">全选</label>	
					</div>				
				</div>
				<div id="grade_7" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_7_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_8_table"
						href="#grade_8">科员
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_8">全选</label>	
					</div>				
				</div>
				<div id="grade_8" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_8_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_9_table"
						href="#grade_9">工程师
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_9">全选</label>	
					</div>				
				</div>
				<div id="grade_9" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_9_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_10_table"
						href="#grade_10">管理员
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_10">全选</label>	
					</div>				
				</div>
				<div id="grade_10" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_10_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_11_table"
						href="#grade_11">助理工程师
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_11">全选</label>	
					</div>				
				</div>
				<div id="grade_11" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_11_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_12_table"
						href="#grade_12">技工
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_12">全选</label>	
					</div>				
				</div>
				<div id="grade_12" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_12_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_13_table"
						href="#grade_13">辅助工
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_13">全选</label>	
					</div>				
				</div>
				<div id="grade_13" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_13_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#grade_14_table"
						href="#grade_14">车间辅助工
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_grade_14">全选</label>	
					</div>				
				</div>
				<div id="grade_14" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="grade_14_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
			</div>
		<!-- </form> -->
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			<button class="btn btn-primary" id="btnStandardPositionSave">确认</button>
		</div>
	</div>
</body>
</html>