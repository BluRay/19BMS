<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 计件工时</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/production/pieceWorkTimeVerify.js"></script>
<style type="text/css">
.section-head {
    border-left: 7px solid #000;
    padding-left: 10px;
    margin-bottom: 20px;
}
.table td{
	padding:5px;
}

</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="font-size:17px">计件工时审核</legend>
				<div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow: auto;">
					<ul id="workGroupTree" class="ztree"></ul>
				</div>
			<br>
			<div style="margin-left: 235px;margin-right: -5px;margin-top: -20px;">			
			<form id="form" class="well form-search" style="margin: 0px;padding: 8px;">
							<table >
								<tr>								
								<td  style="text-align:right">车号：</td>
								<td >
									<input type="text" id="bus_number" class="input-medium" placeholder="请输入车号/自编号"/>
								</td>
								<td width="80px" style="text-align:right">操作日期：</td>
								<td colspan=2>					
									<input type="text" id="wdate_start" style="width:100px" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
									<span>-</span>
									<input type="text" id="wdate_end" style="width:100px" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
								</td>
								<td  style="text-align:right">状态：</td>
								<td >
									<select id="hour_status" class="input-medium" style='width:100px'>
										<option value='0'>已维护</option>
										<option value='1'>已审批</option>
										<option value='2'>已驳回</option>
									</select>
								</td>
								<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
									<input type="button" class="btn btn-success" id="btnVerify" value="批准" style="margin-left: 2px;"></input> 
									<input type="button" class="btn btn-danger" id="btnReject" value="驳回" style="margin-left: 2px;"></input>
								</td>
								</tr>
							</table>
						</form>
					<div id="pagination"
					class="pagination pagination-small pagination-right"
					style="display: none;">
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
						<input type="hidden" id="d_workshop" value="<s:property value='user.workshop_org' />">
						<input type="hidden" id="d_workgroup" value="<s:property value='user.workgroup_org' />">
						<input type="hidden" id="d_team" value="<s:property value='user.team_org' />">
					<%-- 	<div><div style="width: 200px; display: inline-table;"><h5 class="section-head">计件工时</h5></div><span style="float:right;margin: 10px 20px;color:green" class="read_hours"></span></div> --%>
					
						<div style="height:400px;overflow:auto">
							<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
                                <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                            </div>
							<table id="table_workhour" style="margin-left:0px;margin-top:0px;width:100%;text-align:left;" class="exp-table table">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
					 		<td ><input type="checkbox" id="checkall"></td> 
							<td >车号</td>
							<td>操作班组</td>														
							<td>操作日期</td>
							<td>补贴车</td>
							<td>工号</td>
							<td >姓名</td>
							<td >岗位</td>
							<td >参与度</td>
							<td >分配比例</td>
							<td >班组</td>
							<td >状态</td>
							<td >审核人</td>
							<td >审核时间</td>
							</tr>
							</thead>
							<tbody class="exp-table" id="tb_workhour">
							</tbody>
							</table>
						</div>
			
				</div>
			</div>
		</div>
	</div>
</body>				