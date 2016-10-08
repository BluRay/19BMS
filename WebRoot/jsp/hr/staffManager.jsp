<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<title>员工库</title>
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/bootstrap-responsive.css" rel="stylesheet">
	<link href="css/common.css" rel="stylesheet">
	<link rel="stylesheet" href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
	<link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
	<link rel="stylesheet" href="js/datatables/css/jquery.dataTables.min.css" type="text/css">
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
	<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/datatables/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="js/hr/staffManager.js"></script>

	
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<legend id="leg"><span id="staffListTitle"  style="font-size: 17px; margin-left:-2px;">员工库</span>
				<span class="pull-right"><a class="" href=""><i class="fa fa-link"></i>&nbsp;员工库查询</a>&nbsp;&nbsp;</span>
				</legend>	
			    <div id="zztree" style="position:relative;left:0; float:left; width:230px; height:510px;border:1px solid #ccebf8;overflow:auto;margin-top: -10px;">
					<ul id="staffTree" class="ztree"></ul>
				</div>
				<div style="margin-left: 235px;margin-top: -30px;"><br/>
					<form id="form" class="well form-search" style="margin: 0px;padding-left: 8px;padding-right: 8px;padding-top: 6px;height: 85px;">
						<table style="width: 100%;margin: 0px;">
							<tr>
								<td style="width:45px;vertical-align: bottom;padding-bottom: 5px;" rowspan="2">工号：</td>
								<td style="width: 140px;vertical-align: bottom;padding-bottom: 5px;" rowspan="2"><textarea style="width: 140px;margin-bottom: 0px;" class="input-xlarge" onkeyup="this.value = this.value.slice(0, 1000)" id="staff_number" placeholder="可输入多个工号或姓名" rows="2.5"></textarea>
								</td>
								<td style="width:45px;">
								级别：</td>
								<td style="width:80px;"><input id="staff_level" style="height: 30px; width:80px;" type="text" class="input-medium revise" placeholder="如F3" /></td>
								<td style="width:80px;">计资方式：</td>
								<td style="width:70px;">
									<select style="width:68px;" name="salary_type" id="salary_type" class="input-small carSeries">
									<option value="">全部</option><option value="计时">计时</option><option value="计件" >计件</option>
									</select>
								</td>
								<td style="width:80px;">
								工作地点：</td>
								<td style="">
								<input id="workplace" placeholder="工作地点" style="height: 30px;width: 80px;" type="text" class="input-small carSeries" />
								</td>
							</tr> 
							<tr >
								<td style="width:45px;" >
									岗位：</td>
								<td style="width:80px;">
									<select id="job_type" style='width:80px;' class="input-small carSeries">
										<option value="">全部</option><option value="0">管理类</option><option value="1">技术专家</option><option value="2">技能型</option><option value="3">操作型</option>
									</select></td>
								<td style="width:150px;" colspan="2" >
									<select id="job_grade" style="width:150px;" class="input-small carSeries">
										<option value="">全部</option>
									</select></td>
								<td style="" colspan="2">
									<input id="job"  style="height: 30px; width:160px;" type="text" class="input-medium revise" placeholder="岗位名称" />
								</td>
								<td style="">	
									<input class='radio' checked="checked" type="radio" name="status" value="在职" />在职<input class='radio' type="radio" name="status" value="离职" />离职</td>
								<td style="">
									<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
									<input type="button" class="btn btn-success" id="btnBulkAdd" value="导入" style="margin-left: 2px;"></input>
								</td>
							</tr>
						</table>
					</form>
					<div id="divBulkAdd" class="thumbnail" style="display:none;height: 95px;margin-top: 10px;">
						<h5 align="left">员工库导入</h5>
						<!-- <form action="PlanImport.action" enctype="multipart/form-data" method="post" class="form-horizontal"> -->
						<form id="staffUploadForm" enctype="multipart/form-data" method="post" class="form-horizontal">
							<input id="file" type="file" class="btn btn-info btn-small" name="file" accept="*.xlsx"/>
							<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
							<a href="download/staff_upload.xlsx">下载批导模板</a>
						</form>
		            </div>
		            <div id="loading" style="display:none;text-align: center;vertical-align: middle;margin-top: 150px;" >
		            </div>
					<div id="tableDiv">
					    <div id="pagination" style="padding-top: 1px;padding-bottom: 1px;" class="pagination pagination-small pagination-right">
						<!-- 	<ul><li>*单击工号编辑员工信息</li></ul> -->
							<ul>
								<li id="downloadStaffInfo"><a href="">导出总共<span total="" id="total"></span>条记录
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
						<div style="overflow-x:scroll;word-break:break-all;height: 390px;">
							<table id="staffTable" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
								<thead>
									<tr id="">
										<th style="text-align:center;width:70px" >工号</th>
										<th style="text-align:center;width:70px">姓名</th>
										<th style="text-align:center;width:35px;padding-left:0px;padding-right:0px">性别</th>
										<th style="text-align:center;width:90px">出生日期</th>
										<th style="text-align:center;width:35px;padding-left:0px;padding-right:0px">年龄</th>
										<th style="text-align:center;width:65px">最高学历</th>
										<th style="text-align:center;width:78px">应届生届别</th>
										<th style="text-align:center;width:65px">政治面貌</th>
										<th style="text-align:center;width:150px">身份证</th>
										<th style="text-align:center;width:90px">入厂时间</th>
										<th style="text-align:center;width:45px">级别</th>
										<!-- <th style="text-align:center;width:65px">技能系数</th> -->
										<th style="text-align:center;width:65px">计资方式</th>
										<th style="text-align:center;width:90px">工厂/部门</th>
										<th style="text-align:center;width:80px">科室</th>
										<th style="text-align:center;width:80px">车间</th>
										<th style="text-align:center;width:80px">班组</th>
										<th style="text-align:center;width:120px">小班组</th>
										<th style="text-align:center;width:100px">岗位名称</th>
										<th style="text-align:center;width:50px">在职</th>
										<th style="text-align:center;width:140px">入职渠道</th>
										<th style="text-align:center;width:100px">离职方式</th>
										<th style="text-align:center;width:90px">离职日期</th>
										<th style="text-align:center;width:140px">离职原因</th>
										<th style="text-align:center;width:140px">原公司</th>
										<th style="text-align:center;width:140px">原公司离职原因</th>
										<th style="text-align:center;width:100px">联系方式</th>
										<th style="text-align:center;width:180px">家庭住址</th>
										<th style="text-align:center;width:50px">民族</th>
										<th style="text-align:center;width:180px">法人</th>
										<th style="text-align:center;width:100px">工作地点</th>
									</tr>
								</thead>
								<tbody>	
								</tbody>
							</table>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
	
	
	
</body>
</html>