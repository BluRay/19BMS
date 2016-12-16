<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>计件工时统计</title>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<link href="js/datatables/css/jquery.dataTables.min.css" rel="stylesheet">
<link rel="stylesheet" href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
<link href="js/primitives/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.10.2.custom.min.js"></script>
<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/velocity.min.js"></script>
<script type="text/javascript" src="js/velocity.ui.min.js"></script>
<script type="text/javascript" src="js/exportTable2Excel.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hr/pieceTimeReport.js"></script>
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
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;"><span id="staffListTitle" style="font-size: 17px; margin-left:-2px;">计件工时统计：第十九事业部</span></legend><br/>				
			<div style="margin-right: 5px;margin-top: -25px;"><br/>
				<!-- <form id="form" class="well form-search"> -->
				<div class="control-group">
					<table >
						<tr>
						<td width="60px" style="text-align:right">工厂：</td>
						<td width="140px">
							<select id="factory" class="input-medium">
							</select>
						</td>
						<td width="60px" style="text-align:right">车间：</td>
						<td width="140px">
							<select id="workshop" class="input-medium">
							</select>
						</td>
						<td width="80px" style="text-align:right">班组：</td>
						<td width="140px">
							<select id="group" class="input-medium">
							<!-- <option value=''>请选择</option> -->
							</select>
						</td>
						<td width="60px" style="text-align:right">小班组：</td>
						<td width="220px">
							<select id="subgroup" class="input-medium">
						<!-- 	<option value=''>请选择</option> -->
							</select>
						</td>
						<td></td>
						</tr>
						<tr>
						<td width="60px" style="text-align:right">车号：</td>
						<td width="140px">
							<input type="text" id="bus_number" class="input-medium" placeholder="车号"/>
						</td>
						<td width="60px" style="text-align:right">订单：</td>
						<td width="140px">
							<input type="text" id="order_number" class="input-medium" />
						</td>
						<td width="60px" style="text-align:right">姓名/工号：</td>
						<td width="140px">
							<input type="text" id="staff_number" class="input-medium" placeholder="姓名/工号"/>
						</td>
						<td width="80px" style="text-align:right">统计日期：</td>
						<td width="220px">
							<input type="text" id="date_start" style="width:100px" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',})"/> - 
							<input type="text" id="date_end" style="width:100px" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',})"/>
						</td>
						<td></td>
						<td></td>
						<td><input type="button" class="btn btn-success" id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
						</tr>
					</table>
				</div>
	       <!--     </form>  -->
			
	        <ul class="nav nav-tabs" id="new_tab" role="tablist" style="height: 38px;">
				<li id="li_busNumber" class="active"><a href="#li_busNumber" data-toggle="tab" style="font-size: 14px; color: #333">车辆维度</a></li>
				<li id="li_staffNumber"><a href="#li_staffNumber" data-toggle="tab" style="font-size: 14px; color: #333">人员维度</a></li>
				<div id="pagination" style="display:none; padding-top:-30px;padding-bottom:1px;" class="pagination pagination-small pagination-right">
					<ul>
						<li id="export"><a href="#">导出总共<span total="" id="total">0</span><span id="total_type">台车辆记录</span>
						</a></li>
					</ul>
					<ul>
						<li id="first"><a href="#">«</a></li>
						<li id="pre" class="prePage"><a href="#">&lt;</a></li>
						<li id="cur" class="active curPage" page=""><a href="#">-</a></li>
						<li id="next" class="nextPage"><a href="#">&gt;</a></li>
						<li id="last"><a href="#">»</a></li>
					</ul>
				</div>
			</ul>
          	
			    
          	
	            <div id="tableDiv">
					<div style="word-break:break-all;height: 370px;">
						<div style="display: none;position:fixed;z-index:999;margin-top:140px;margin-left:500px" class="divLoading" >
                          <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                    	</div>  
						<table id="attendanceTable" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
							<thead>
								<tr id="">
									<th style="text-align:center;width:140px;padding-left:0px;padding-right:0px">订单</th>
									<th style="text-align:center;width:120px;padding-left:0px;padding-right:0px">车号</th>
									<th style="text-align:center;width:60px;padding-left:0px;padding-right:0px">承包单价</th>
									<th style="text-align:center;width:60px;padding-left:0px;padding-right:0px">补贴车</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">工厂</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">车间</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">班组</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">小班组</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">操作日期</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">工号</th>
									<th style="text-align:center;width:60px;padding-left:0px;padding-right:0px">姓名</th>
									<th style="text-align:center;width:60px;padding-left:0px;padding-right:0px">岗位</th>
									<th style="text-align:center;width:40px;padding-left:0px;padding-right:0px">工时</th>
									<th style="text-align:center;width:50px;padding-left:0px;padding-right:0px">分配金额</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">计件工资</th>
									
								</tr>
							</thead>
							<tbody>	
							</tbody>
						</table>
						<br/>
					</div>
				</div>
	           <div style="display:none">
						<table id="attendanceTableAll" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
							<thead>
								<tr id="">
									<tr id="">
									<th style="text-align:center;padding-left:0px;padding-right:0px">订单</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">车号</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">承包单价</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">补贴车</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">工厂</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">车间</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">班组</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">小班组</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">操作日期</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">工号</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">姓名</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">岗位</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">工时</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">分配金额</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">计件工资</th>
									
								</tr>
								
							</thead>
							<tbody>	
							</tbody>
						</table>
				</div>
	           
	           <div id="tableDiv2">
					<div style="word-break:break-all;height: 370px;">
						<div style="display: none;position:fixed;z-index:999;margin-top:140px;margin-left:500px" class="divLoading" >
                          <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                    	</div>
						<table id="attendanceTable2" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
							<thead>
								<tr id="">
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">序号</th>
									<th style="text-align:center;width:30px;padding-left:0px;padding-right:0px">工号</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">姓名</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">工厂</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">车间</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">班组</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">小班组</th>
									<th style="text-align:center;width:30px;padding-left:0px;padding-right:0px">岗位</th>	
									<th style="text-align:center;width:40px;padding-left:0px;padding-right:0px">订单</th>								
									<th style="text-align:center;width:40px;padding-left:0px;padding-right:0px">车号</th>
									<th style="text-align:center;width:30px;padding-left:0px;padding-right:0px">操作日期</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">分配金额</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">工时</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">计件工资</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">承包单价</th>
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">补贴车</th>
								</tr>
							</thead>
							<tbody>	
							</tbody>
						</table>
						<br/>
					</div>
				</div>
				<div style="display:none">
						<table id="attendanceTable2All" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
							<thead>
								<tr id="">
									<th style="text-align:center;padding-left:0px;padding-right:0px">序号</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">工号</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">姓名</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">工厂</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">车间</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">班组</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">小班组</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">岗位</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">订单</th>									
									<th style="text-align:center;padding-left:0px;padding-right:0px">车号</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">操作日期</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">分配金额</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">工时</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">计件工资</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">承包单价</th>
									<th style="text-align:center;padding-left:0px;padding-right:0px">补贴车</th>
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