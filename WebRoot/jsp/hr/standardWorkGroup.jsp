<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>标准班组</title>
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
	    padding-left: 10px;
	    margin-bottom: 20px;
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
<script type="text/javascript" src="js/hr/standardWorkGroup.js"></script>

</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
			<legend id="leg">标准班组</legend>	
			<div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow:auto;">
					<ul id="workGroupTree" class="ztree"></ul>
				</div>
				<div style="margin-left:235px;padding:14px;border:1px solid #ccebf8;background-color: #f1f6fb;">
					<table>
						<tr>
							<td align="left" nowrap="nowrap">
								<span id="workgroupTitle" class="section-head" style="font-size: 18px; margin-left:-8px;">标准班组->自制件</span>
							</td>
							<td width="100%" nowrap="nowrap"></td>
							<td align="right" nowrap="nowrap">
								<input id="btnSave" class="btn btn-success" type="button" value="保存">
							</td>
						</tr>
					</table>
				</div>
				<div style="margin-left:235px;">
					<table id="workgroupTable" class="exp-table table" width="100%">
						<thead>
						<tr>
							<th style="text-align: left;" width="30px">
								<i id="addWorkgroup" class="fa fa-plus addWorkhour" style="cursor: pointer;color: blue;margin-left: 2px;"></i>
							</th>
							<th style="text-align: left;" width="100px">
								班组编号
							</th>
							<th style="text-align: left;">
								班组名称
							</th>
							<th style="text-align: left;" >
								工作内容
							</th>
							<th style="text-align: left;width: 100px;">
								备注
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