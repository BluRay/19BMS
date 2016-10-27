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
<script type="text/javascript" src="js/tableHtmlPaste.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/production/pieceWorkTimeMta.js"></script>
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
	<div class="content-wrapper " >
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="font-size:17px">计件工时维护</legend>
			<div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow: auto;">
					<ul id="workGroupTree" class="ztree"></ul>
				</div>
				<br>	
			<div style="margin-left: 235px;margin-right: -5px;margin-top: -20px;">
			<form id="form" class="well form-search form-inline" style="margin: 0px;padding: 8px;">
							<table >
								<tr>
								<td width="60px" style="text-align:right;display:none" id="order_label">订单：</td>
								<td width="130px" id="order_input" style="display:none">
									<input type="text" style="width:130px" id="order_number" class="input-medium"/>
								</td>
								<td width="60px" style="text-align:right" id="bus_label">车号：</td>
								<td width="160px" id="bus_input">
									<input type="text" id="bus_number" class="input-medium"/>
								</td>
								<td width="60px" style="text-align:right;display:none" id="c_bus_label" >自编号：</td>
								<td width="160px" id="c_bus_input" style="display:none">
									<input type="text" id="c_bus_number" class="input-medium" placeholder="如：K7-CS_0001-0010"/>
								</td>									
								<td width="80px" style="text-align:right">操作日期：</td>
								<td>
									<input type="text" id="mta_wdate" style="background-color:#ffffff;cursor:initial;width:100px" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date(),onpicked:function(){ajaxGetDist()}})" readonly/>
								</td>
								<td width="80px" style="text-align:right" id="bus_label">补贴车：</td>	
								<td width="50px" id="bus_input">
								    <input type="text" class="form-control" id="bonus_num" style="width:50px;text-align:center">
								</td>
								<td>台</td>
								
								<td><input type="button" class="btn btn-success" id="btnSave" value="保存" style="margin-left: 10px;"></input></td>
								<!-- <td><label class="checkbox" style="margin-left: 20px;"> <input name="is_custom" id="is_custom" value="1" type="checkbox">自定义车号
								</label></td> -->
								</tr>
							</table>
						</form>
						<input type="hidden" id="d_workshop" value="<s:property value='user.workshop_org' />">
						<input type="hidden" id="d_workgroup" value="<s:property value='user.workgroup_org' />">
						<input type="hidden" id="d_team" value="<s:property value='user.team_org' />">
					<%-- 	<div><div style="width: 200px; display: inline-table;"><h5 class="section-head">计件工时</h5></div><span style="float:right;margin: 10px 20px;color:green" class="read_hours"></span></div> --%>
						<br>
						<div style="height:415px;overflow:auto">
							<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
                                <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                            </div>  
							<table id="table_workhour" style="margin-left:0px;margin-top:0px;width:100%;text-align:left;" class="exp-table table">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td style="width: 30px;"><i class="fa fa-plus addWorkhour" style="cursor: pointer;color: blue;margin-left:5px"></i></td>
							<td >工号</td>
							<td >姓名</td>
							<td >岗位</td>
							 <td id="td_part" style="display:none">工时</td> 
							<td >分配金额
								<i id="dstcopy" data-original-title="粘贴整列" name="edit" rel="tooltip" title="" class="fa fa-files-o" style="cursor: pointer;color:blue"></i>
							</td>
							<td >承包单价</td>
							<td >小班组</td>
							<td >班组</td>
							<td >车间</td>
							<td >工厂</td>
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