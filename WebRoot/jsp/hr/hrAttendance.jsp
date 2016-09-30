<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>考勤</title>
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
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hr/attendance.js"></script>
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
	<%
	String model = request.getParameter("model");
	if(model.equals("hr")){
	%>
		<%@ include file="../common/general_hr_left.jsp"%>
	<%	
	}else if(model.equals("production")){
	%>
		<%@ include file="../common/general_production_left.jsp"%>
	<%		
	}
	%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;"><span id="staffListTitle" style="font-size: 17px;">考勤：第十九事业部</span></legend><br/>	
			    <div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow: auto;">
					<ul id="staffTree" class="ztree"></ul>
				</div>
				
				<div style="margin-left: 235px;margin-top: -20px;"><br/>
					<form id="form" class="well form-search" style="margin: 0px;padding: 8px;">
						<table style="width: 100%;margin: 0px;">
							<tr>
								<td style="padding-top: 8px;width: 50px;">工号：</td>
								<td style="padding-top: 8px;width: 120px;"><input id="staff_number" placeholder="工号或姓名..." style="height: 30px;width: 120px;" type="text" class="input-small carSeries" /></td>
								<td style="padding-top: 8px;width: 50px;">月份：</td>
								<td style="padding-top: 8px;width: 120px;"><input id="staff_month" placeholder="月份..." 
									onclick="WdatePicker({el:'staff_month',dateFmt:'yyyy-MM'});" style="height: 30px;width: 100px;" type="text" class="input-small carSeries" /></td>
								<td style="padding-top: 8px;">
									<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
									<%
									if(model.equals("production")){
									%>
									<input type="button" class="btn btn-success" id="btnBulkAdd" value="导入" style="margin-left: 2px;"></input>
									<%
									}
									%>
									
								</td>
							</tr>
						</table>
					</form>
					<div id="divBulkAdd" class="thumbnail" style="display:none;height: 95px;margin-top: 10px;">
						<h5 align="left">考勤数据导入</h5>
						<form id="attendanceUploadForm" enctype="multipart/form-data" method="post" class="form-horizontal">
							<input id="file" type="file" class="btn btn-info btn-small" name="file" accept="*.xlsx"/>
							<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
							<a href="download/attendance_upload.xlsx">下载批导模板</a>
						</form>
		            </div>
		            
		            <div style="display:none;position:fixed;z-index:999;margin-top:10px;margin-left:350px" class="divLoading" >
                         <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                    </div>
		            
		            <div id="tableDiv">
					    <div id="pagination" style="padding-top: 6px;padding-bottom: 1px;" class="pagination pagination-small pagination-right">
							<ul>
								<li id="downloadStaffInfo"><a href="#">总共<span total="" id="total">0</span>条记录
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
						<div style="overflow-x:scroll;word-break:break-all;height: 390px;">
							<div style="display: none;position:fixed;z-index:999;margin-top:140px;margin-left:400px" class="divLoading_s" >
                          		<span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                    		</div>
							<table id="attendanceTable" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
								<thead>
									<tr id="">
										<th style="text-align:center;width:55px">工号</th>
										<th style="text-align:center;width:45px;padding-left:0px;padding-right:0px">姓名</th>
										<th style="align:center;width:45px;padding-left:0px;padding-right:0px">出勤天数</th>
										<th style="text-align:center;width:40px;padding-left:0px;padding-right:0px">总出勤</th>
										<th id="D1" style="align:center;width:18px;padding-left:0px;padding-right:0px">1</th>
										<th id="D2" style="align:center;width:18px;padding-left:0px;padding-right:0px">2</th>
										<th id="D3" style="align:center;width:18px;padding-left:0px;padding-right:0px">3</th>
										<th id="D4" style="align:center;width:18px;padding-left:0px;padding-right:0px">4</th>
										<th id="D5" style="align:center;width:18px;padding-left:0px;padding-right:0px">5</th>
										<th id="D6" style="align:center;width:18px;padding-left:0px;padding-right:0px">6</th>
										<th id="D7" style="align:center;width:18px;padding-left:0px;padding-right:0px">7</th>
										<th id="D8" style="align:center;width:18px;padding-left:0px;padding-right:0px">8</th>
										<th id="D9" style="align:center;width:18px;padding-left:0px;padding-right:0px">9</th>
										<th id="D10" style="align:center;width:18px;padding-left:0px;padding-right:0px">10</th>
										<th id="D11" style="align:center;width:18px;padding-left:0px;padding-right:0px">11</th>
										<th id="D12" style="align:center;width:18px;padding-left:0px;padding-right:0px">12</th>
										<th id="D13" style="align:center;width:18px;padding-left:0px;padding-right:0px">13</th>
										<th id="D14" style="align:center;width:18px;padding-left:0px;padding-right:0px">14</th>
										<th id="D15" style="align:center;width:18px;padding-left:0px;padding-right:0px">15</th>
										<th id="D16" style="align:center;width:18px;padding-left:0px;padding-right:0px">16</th>
										<th id="D17" style="align:center;width:18px;padding-left:0px;padding-right:0px">17</th>
										<th id="D18" style="align:center;width:18px;padding-left:0px;padding-right:0px">18</th>
										<th id="D19" style="align:center;width:18px;padding-left:0px;padding-right:0px">19</th>
										<th id="D20" style="align:center;width:18px;padding-left:0px;padding-right:0px">20</th>
										<th id="D21" style="align:center;width:18px;padding-left:0px;padding-right:0px">21</th>
										<th id="D22" style="align:center;width:18px;padding-left:0px;padding-right:0px">22</th>
										<th id="D23" style="align:center;width:18px;padding-left:0px;padding-right:0px">23</th>
										<th id="D24" style="align:center;width:18px;padding-left:0px;padding-right:0px">24</th>
										<th id="D25" style="align:center;width:18px;padding-left:0px;padding-right:0px">25</th>
										<th id="D26" style="align:center;width:18px;padding-left:0px;padding-right:0px">26</th>
										<th id="D27" style="align:center;width:18px;padding-left:0px;padding-right:0px">27</th>
										<th id="D28" style="align:center;width:18px;padding-left:0px;padding-right:0px">28</th>
										<th id="D29" style="align:center;width:18px;padding-left:0px;padding-right:0px">29</th>
										<th id="D30" style="align:center;width:18px;padding-left:0px;padding-right:0px">30</th>
										<th id="D31" style="align:center;width:18px;padding-left:0px;padding-right:0px">31</th>
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