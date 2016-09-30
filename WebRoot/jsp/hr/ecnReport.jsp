<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>技改工时统计</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<link href="js/datatables/css/jquery.dataTables.min.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/exportTable2Excel.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/datatables/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/hr/ecnReport.js"></script>

<script type="text/javascript" src="js/jquery.page.js"></script>
<style type="text/css">
thead td {font-weight:bold;}
.dataTables_length {
    display:none;
}

.nav {
    margin-bottom: 7px;
}

#queryTable td {
	white-space: nowrap;
}
*{ margin:0; padding:0; list-style:none;}
a{ text-decoration:none;}
a:hover{ text-decoration:none;}
.tcdPageCode{padding-top: 6px;text-align: left;color: #ccc;float:right;font-size:12px;}
.tcdPageCode a{display: inline-block;color: #428bca;display: inline-block;height: 25px;	line-height: 25px;	padding: 0 10px;border: 1px solid #ddd;	margin: 0 2px;border-radius: 4px;vertical-align: middle;}
.tcdPageCode a:hover{text-decoration: none;border: 1px solid #428bca;}
.tcdPageCode span.current{display: inline-block;height: 25px;line-height: 25px;padding: 0 10px;margin: 0 2px;color: #fff;background-color: #428bca;	border: 1px solid #428bca;border-radius: 4px;vertical-align: middle;}
.tcdPageCode span.disabled{	display: inline-block;height: 25px;line-height: 25px;padding: 0 10px;margin: 0 2px;	color: #bfbfbf;background: #f2f2f2;border: 1px solid #bfbfbf;border-radius: 4px;vertical-align: middle;}

</style>
</head>
<body style="overflow-y:hidden">
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">技改工时统计</legend>
				<div style="margin-top: -5px;"><br/>
					<div class="well control-group">
						<table id="queryTable">
							<tr>
								<td width="60px" style="text-align: right">工厂：</td>
								<td width="160px"><select id="factory" class="input-medium">
								</select></td>
								<td width="80px" style="text-align: right">车间：</td>
								<td width="160px"><select id="workshop" class="input-medium">
								</select></td>
								<td width="80px" style="text-align: right">班组：</td>
								<td width="160px"><select id="group" class="input-medium">
										<!-- <option value=''>请选择</option> -->
								</select></td>
								<td width="60px" style="text-align: right">小班组：</td>
								<td width="160px"><select id="subgroup" class="input-medium">
										<!-- 	<option value=''>请选择</option> -->
								</select></td>
							</tr>
							<tr>
								<td width="80px" style="text-align: right">技改内容：</td>
								<td width="160px"><input type="text" id="task"
									class="input-medium" placeholder="" /></td>
								<td width="80px" style="text-align: right;white-space: nowrap;">技改单编号：</td>
								<td width="160px"><input type="text" id="ecn_document_number"
									class="input-medium" placeholder="" /></td>
								<td width="80px" style="text-align: right">工号/姓名：</td>
								<td width="160px"><input type="text" id="staff"
									class="input-medium sequence" placeholder="请输入工号/姓名" /></td>
								<td style="text-align: right">日期：</td>
								<td>
									<!-- <input type="text" id="mta_wdate" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/> -->
									<input style="width: 100px;" type="text" id="date_start"
									class="input-small"
									onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /> <span>-</span>
									<input style="width: 100px;" type="text" id="date_end"
									class="input-small"
									onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" />
									<input type="button"
									class="btn btn btn-primary" id="btnQuery" value="查询"
									style="margin-left: 2px; margin-top: -10px; margin-right: 5px;"></input>
								</td>
	
							</tr>
							<%-- <tr>
								<td style="text-align: right">日期：</td>
								<td colspan=2>
									<!-- <input type="text" id="mta_wdate" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/> -->
									<input style="width: 100px;" type="text" id="date_start"
									class="input-small"
									onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /> <span>-</span>
									<input style="width: 100px;" type="text" id="date_end"
									class="input-small"
									onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" />
								</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td style="text-align: right;"><input type="button"
									class="btn btn btn-primary" id="btnQuery" value="查询"
									style="margin-left: 2px; margin-top: -10px; margin-right: 5px;"></input>
									<!-- <input type="button" class="btn btn-success" id="btnSave" value="存档" style="margin-left: 2px;margin-top: -10px;"></input> -->
								</td>
							</tr> --%>
						</table>
					</div>
				</div>
				<div style="margin-top: -10px;">
						<ul class="nav nav-tabs" id="new_tab" role="tablist"
							style="height: 38px;">
							<li class="active"><a href="#new_task1" data-toggle="tab"
								style="font-size: 14px; color: #333">工单维度</a></li>
							<li><a href="#new_task1" data-toggle="tab"
								style="font-size: 14px; color: #333">人员维度</a></li>
								
							<div class="tcdPageCode">		
							</div>
							<div id="export" style="padding-top: 8px;text-align: left;color: #ccc;float:right;display: inline-block;font-size:14px;"><a href="#">导出总共<span total="" id="total"></span>条记录
								</a></div>
						</ul>
				</div>
				<%-- <div id="pagination"
					class="pagination pagination-small pagination-right"
					style="display: none">
					<ul>
						<li id="export"><a href="">导出总共<span total="" id="total"></span>条记录
						</a></li>
					</ul>
					<ul>
						<li id="first"><a href="#">«</a></li>
						<li id="pre" class="prePage"><a href="#">&lt;</a></li>
						<li id="cur" class="active curPage" page=""><a href="#"></a></li>
						<li id="next" class="nextPage"><a href="#">&gt;</a></li>
						<li id="last"><a href="#">»</a></li>
					</ul>
				</div> --%>
				
				<%-- <script>
    			$(".tcdPageCode").createPage({
        			pageCount:6,
        			current:1,
        			backFn:function(p){
            			console.log(p);
        			}
    			});
				</script> --%>
				<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
                    <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                </div>
				<div id="workDimensionDiv" style="overflow:auto;width: 100%;max-height:335px">
					<table id="workDimensionTable" 
						style="margin-left: 0px; margin-top: 0px; width: 100%; text-align: left;font-size:12px"
						class="exp-table table">
						<thead style="background-color: rgb(225, 234, 240)" class="table-bordered">
							<tr>
								<td nowrap="nowrap">技改单</td>
								<td nowrap="nowrap">技改任务</td>
								<td nowrap="nowrap">总工时</td>
								<td nowrap="nowrap">总费用</td>
								<td nowrap="nowrap">操作日期</td>
								<td nowrap="nowrap">工号</td>
								<td nowrap="nowrap">姓名</td>
								<td nowrap="nowrap">岗位</td>
								<td nowrap="nowrap">工厂</td>
								<td nowrap="nowrap">车间</td>
								<td nowrap="nowrap">班组</td>
								<td nowrap="nowrap">小班组</td>
								<td nowrap="nowrap">操作工时</td>
								<td nowrap="nowrap">有效工时</td>
								<td nowrap="nowrap">技改工资</td>
							</tr>
						</thead>
						<tbody class="exp-table table-bordered">
						</tbody>
					</table>
				</div>
				<div id="peopleDimensionDiv" style="display: none;overflow:auto;max-height:335px">
					<table id="peopleDimensionTable"
						style="margin-left: 0px; margin-top: 0px; width: 100%; text-align: left;font-size:12px"
						class="exp-table table">
						<thead style="background-color: rgb(225, 234, 240)" class="table-bordered">
							<tr>

								<td nowrap="nowrap">工号</td>
								<td nowrap="nowrap">姓名</td>
								<td nowrap="nowrap">岗位</td>
								<td nowrap="nowrap">小班组</td>
								<td nowrap="nowrap">班组</td>
								<td nowrap="nowrap">车间</td>
								<td nowrap="nowrap">工厂</td>
								<td nowrap="nowrap">技改单</td>
								<td nowrap="nowrap">技改任务</td>
								<td nowrap="nowrap">操作日期</td>
								<td nowrap="nowrap">操作工时</td>
								<td nowrap="nowrap">有效工时</td>
								<td nowrap="nowrap">技改工资</td>

							</tr>
						</thead>
						<tbody class="exp-table table-bordered">
						</tbody>
					</table>
				</div>

			</div>
		</div>
	</div>
</body>