<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 计划查询</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/plan/planSearch.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
	
	<style type="text/css">
		#tablePlanDetail tbody{
			display:block;
			overflow-y:scroll;
			height:350px;
		}
		#tablePlanDetail thead{
			table-layout:fixed;
			display:table;
			width: calc( 100% - 1.5em )
		}
	</style>
	
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">计划达成情况</legend>
<div style="margin: 0 auto;">			
	<form id="form" class="well form-search">
		<table>
			<tr>
				<td>生产工厂</td>
				<td>生产车间</td>
				<td>订单编号</td>
				<td>生产日期</td>
				<td></td><td></td>
			</tr>
			<tr>
				<td><select name="" id="search_factory" class="input-medium carType">
				</select></td>
				<td><select name="" id="search_workshop" class="input-medium carType">						
				</select></td>
				<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
				<td><input class="input-medium" placeholder="开始日期..." id="start_date" onclick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});" type="text">
				</td>
				<td> - <input class="input-medium" placeholder="结束日期..." id="end_date" onclick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});" type="text">
				</td>
				<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
				</td>
				
			</tr>
		</table>
	</form>
<ul id="tabUl" style="height:15px" class="nav nav-pills">
    <li id="planSearchResult" class="active"><a href="#planSearchResult" data-toggle="tab">计划达成数据</a></li>
    <li id="planSearchDetail"><a class="queryUse" href="#planSearchDetail" data-toggle="tab">计划达成明细</a></li>
</ul>
<div id="planSearchResultdiv">
<p  style="padding-top:20px;font-weight:bold">车间计划达成：</p>
<table id="tablePlan_total" style="table-layout:fixed;font-size:12px;text-align:center" class="table table-bordered table-striped">
	<thead>
         <tr id='0'>
        	<th style="text-align:center;">生产车间</th>
            <th style="text-align:center;">自制件下线</th>
            <th style="text-align:center;">部件下线</th>
            <th style="text-align:center;">焊装上线</th>
            <th style="text-align:center;">涂装上线</th>
            <th style="text-align:center;">底盘上线</th>
            <th style="text-align:center;">总装下线</th>
            <th style="text-align:center;">入库</th>
        </tr>
    </thead>
	<tbody>
		<tr id="tr_plan">
			<td>计划数量</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	<!-- 	<tr id="tr_bjon">
			<td>部件上线</td>
			<td></td>
			<td></td>
			<td></td>
		</tr> -->
		<tr id="tr_realDone">
			<td>实际完成量</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr id="tr_doneRate">
			<td>实际达成率</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
<!-- 		<tr id="tr_hzoff">
			<td>焊装下线</td>
			<td></td>
			<td></td>
			<td></td>
		</tr> -->
		<!-- <tr id="tr_tzon">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr id="tr_tzoff">
			<td>涂装下线</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
 		<tr id="tr_dpon">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr> 
		<tr id="tr_dpoff">
			<td>底盘下线</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr id="tr_zzon">
			<td>总装上线</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr id="tr_zzoff">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr id="tr_rk">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr> -->
	</tbody>
</table>

<p  style="padding-top:20px;font-weight:bold">订单计划达成：</p>
<table id="tablePlan" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
	<thead>
         <tr id='0'>
         	<th style="text-align:center;width:250px">生产订单</th>
        	<th style="text-align:center;">生产车间</th>
            <th style="text-align:center;">计划数量</th>
            <th style="text-align:center;">实际完成量</th>
<!--             <th style="text-align:center;">修正完成量</th> -->
            <th style="text-align:center;">实际达成率</th>
<!--             <th style="text-align:center;">修正达成率</th> -->
            <th style="text-align:center;">累计完成量</th>
        </tr>
    </thead>
<tbody>
</tbody>
</table>			
</div>
<div id="planSearchDetaildiv" style="overflow-x:scroll;">
   <div style="display:none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
        <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
   </div> 
<table id="tablePlanDetail" style="font-size:12px;"  class="table table-bordered table-striped">
	<thead>
         <tr id='0'>
         	<th style="width:70px;text-align:center;">生产订单</th>
        	<th style="width:105px;text-align:center;">生产车间</th>
            <th id="D1" style="text-align:center; width:55px;"> </th>
            <th id="D2" style="text-align:center; width:55px;"> </th>
            <th id="D3" style="text-align:center; width:55px;"> </th>
            <th id="D4" style="text-align:center; width:55px;"> </th>
            <th id="D5" style="text-align:center; width:55px;"> </th>
            <th id="D6" style="text-align:center; width:55px;"> </th>
            <th id="D7" style="text-align:center; width:55px;"> </th>
            <th id="D8" style="text-align:center; width:55px;"> </th>
            <th id="D9" style="text-align:center; width:55px;"> </th>
            <th id="D10" style="text-align:center; width:55px;"> </th>          
            <th id="D11" style="text-align:center; width:55px;"> </th>
            <th id="D12" style="text-align:center; width:55px;"> </th>
            <th id="D13" style="text-align:center; width:55px;"> </th>
            <th id="D14" style="text-align:center; width:55px;"> </th>
            <th id="D15" style="text-align:center; width:55px;"> </th>
            <th id="D16" style="text-align:center; width:55px;"> </th>
            <th id="D17" style="text-align:center; width:55px;"> </th>
            <th id="D18" style="text-align:center; width:55px;"> </th>
            <th id="D19" style="text-align:center; width:55px;"> </th>
            <th id="D20" style="text-align:center; width:55px;"> </th>
            <th id="D21" style="text-align:center; width:55px;"> </th>
            <th id="D22" style="text-align:center; width:55px;"> </th>
            <th id="D23" style="text-align:center; width:55px;"> </th>
            <th id="D24" style="text-align:center; width:55px;"> </th>
            <th id="D25" style="text-align:center; width:55px;"> </th>
            <th id="D26" style="text-align:center; width:55px;"> </th>
            <th id="D27" style="text-align:center; width:55px;"> </th>
            <th id="D28" style="text-align:center; width:55px;"> </th>
            <th id="D29" style="text-align:center; width:55px;"> </th>
            <th id="D30" style="text-align:center; width:55px;"> </th>
            <th id="D31" style="text-align:center; width:55px;"> </th>
            <th id="Total" style="width:65px;text-align:center;">合计</th>
            <th id="TotalMonth" style="width:70px;text-align:center;">本月合计</th>
            <th id="TotalOrder" style="width:70px;text-align:center;">订单合计</th>
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
</body>
</html>