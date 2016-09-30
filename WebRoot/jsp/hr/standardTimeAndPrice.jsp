<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>标准工时/单价</title>
<!-- Le styles -->

<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">

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
	    padding-left: 10px;
	    margin-bottom: 20px;
	}
 </style>

<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<!--<script  type="text/javascript" src="js/primitives/primitives.min.js"></script>-->
<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hr/standardTimeAndPrice.js"></script>

</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
			<legend id="leg"><span id="workgroupTitle"  style="font-size: 17px;">标准工时/单价</span></legend>	
			    <div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow: auto;">
					<ul id="workGroupTree" class="ztree"></ul>
				</div>
				<input type="hidden" id="orgStr" />
				<div style="margin-left:235px;padding:2px 14px 1px 14px;border:1px solid #ccebf8;background-color: #f1f6fb;">
					<table>
						<tr>
							<td align="left" valign="middle" style="width: 160px;padding-top: 10px;" nowrap="nowrap" >车型：<select style="width:100px;" name="" id="bus_type_id" class="input-medium carType"></select></td>
							<td width="100%"  nowrap="nowrap">月份：<input type="text" name="month" id="month" class="Wdate" style="height:30px;background-color: white;width:100px" onclick="WdatePicker({el:'month',dateFmt:'yyyy-MM'});ajaxQuery();"></td>
							<td align="right" nowrap="nowrap">
								<input class="btn btn-primary" id="btnQuery" type="button" value="查询">
								<input id="btnSave" class="btn btn-success" type="button" value="保存">
								<input id="btnBulkAdd" class="btn btn-primary" type="button" style="margin-left:2px;" value="导入">
							</td>
						</tr>
					</table>
				</div>
				<div id="divBulkAdd" class="thumbnail" style="margin-left:235px;display:none;height: 95px;margin-top: 10px;">
					<h5 align="left">标准工时/单价导入</h5>
					<!-- <form action="PlanImport.action" enctype="multipart/form-data" method="post" class="form-horizontal"> -->
					<form id="uploadForm" enctype="multipart/form-data" method="post" class="form-horizontal">
						<input id="file" type="file" class="btn btn-info btn-small" name="file" accept="*.xlsx"/>
						<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
						<a href="download/standardTimeAndPrice_upload.xlsx">下载批导模板</a>
					</form>
	            </div>
	            <div id="loading" style="display:none;text-align: center;vertical-align: middle;margin-top: 150px;" >
		        </div>
				<div id="tableDiv" style="margin-left:235px;">
					<table id="workgroupTable" class="exp-table table" width="100%">
						<thead>
						<tr>
							<th>
								班组编号
							</th>
							<th>
								班组名称
							</th>
							<th >
								小班组编号
							</th>
							<th>
								小班组名称
							</th>
							<th width="100px">
								标准工时
							</th>
							<th width="100px">
								标准单价
							</th>
						</tr>
						
						</thead>
						<tbody class="exp-table">
						
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>