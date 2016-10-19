<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>技改查询</title>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/techtrans/techTransList.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<style type="text/css">
.section-head {
  border-left: 7px solid #000;
  padding-left: 10px;
  margin-top: 25px;
  margin-bottom: 20px;
}
.glyphicon{
	position:relative;
	top:1px;
	display:inline-block;
	font-family:'Glyphicons Halflings';
	font-style:normal;
	font-weight:400;
	line-height:1;
	-webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale
}
.glyphicon-plus:before{
	content:"\2b"
}
*::before, *::after {
    box-sizing: border-box;
}
.btn-xs, .btn-group-xs > .btn {
    padding: 1px 5px;
    font-size: 14px;
    line-height: 2.5;
    border-radius: 3px;
}
.btn-success {
    color: #FFF;
    background-color: #5CB85C;
    border-color: #4CAE4C;
}
.offlineFont{
	color:red
}
.input[type="text"]{
	height: 30px;
}
</style>
</head>
<body >
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
			<div>
				<legend style="margin: 0 auto;">技改工时查询
								<span class="pull-right">
					<a class="notPrintable" href="ecnDocumentTask!showEcnInformationList.action">
						<i class="fa fa-link"></i>
						&nbsp;技改查询
					</a>
				</span>
				</legend>
				<div style=" margin: 0 auto;">
					<br/><form id="form" class="well form-search">
						<table>
							<tr>
								<td>生产工厂</td>
								<td>技改任务</td>
								<td>订单</td>
								<td>车间</td>
								<td>下单日期</td>
								<td>技改状态</td>
							</tr>
							<tr>
								<td><select name="" id="selectFactory" style="width:90px;" class="input-medium carType"></select></td>
								<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入任务内容..." id="search_task_content" /></td>
								<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入订单..." id="search_order_name" /></td>
								<td><select name="" id="selectWorkShop" style="width:90px;" class="input-medium carType">
								    <option value="">全部</option></select>
								</td>
								 <td><input type="text" class="Wdate" style="height:30px;background-color: white;width:120px" name="startDate" placeholder="开始日期..."  onClick="WdatePicker({el:'startDate',dateFmt:'yyyy-MM-dd'});" id="startDate" />
										至
									 <input type="text" class="Wdate" style="height:30px;background-color: white;width:120px" name="endDate" placeholder="结束日期..." id="endDate" onClick="WdatePicker({el:'endDate',dateFmt:'yyyy-MM-dd'});"/></td>
								<td>
										<select style="width:100px;" class="input-medium carType" id="taskstatus">
											<option value="">全部</option>
											<option value="1">已完成</option>
											<option value="0">未完成</option>
										</select>
								</td>
								<td></td>
								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input> </td>
							</tr>
						</table>
					</form>
<%-- 					<div style="margin-top: -10px;padding-bottom: 5px;">
						<table class="table table-condensed" width=”100%”>
							<tr>
								<td><font><strong>显示列:&nbsp;&nbsp;</strong></font></td>
								<td nowrap="nowrap">
								<input type="checkbox" checked="checked" class="checkbox 1" name="isChecks" value="3" onclick="getCheckValue(this)" >技改单号&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 1" name="isChecks" value="3" onclick="getCheckValue(this)" >下单日期&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 1" name="isChecks" value="3" onclick="getCheckValue(this)" >任务号&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 1" name="isChecks" value="3" onclick="getCheckValue(this)" >技改内容&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 4" name="isChecks" value="4" onclick="getCheckValue(this)" >订单&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 5" name="isChecks"  value="5" onclick="getCheckValue(this)">切换方式&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 6" name="isChecks" value="6" onclick="getCheckValue(this)">总技改台数&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 7" name="isChecks" value="7" onclick="getCheckValue(this)">已技改台数&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 8" name="isChecks" value="8" onclick="getCheckValue(this)">单车总工时&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 9" name="isChecks" value="9" onclick="getCheckValue(this)">任务已投入总工时&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 10" name="isChecks" value="10" onclick="getCheckValue(this)">车间&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 11" name="isChecks" value="11" onclick="getCheckValue(this)">车间单车工时&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 12" name="isChecks" value="12" onclick="getCheckValue(this)">投入总工时&nbsp;&nbsp;
								<input type="checkbox"  checked="checked" class="checkbox 13" name="isChecks" value="13" onclick="getCheckValue(this)">状态&nbsp;&nbsp;
								<input type="checkbox"  checked="checked" class="checkbox 14" name="isChecks" value="14" onclick="getCheckValue(this)">效果图片&nbsp;&nbsp;
								<input type="checkbox" checked="checked" class="checkbox 15" name="isChecks" value="15" onclick="getCheckValue(this)">车号
								</td>
							</tr>
						</table>
					</div> --%>
					<table id="tableTechTransList" class="table table-condensed" style="font-size:12px;">
					
                    <thead>
                        <tr>
                        	<th>技改单号</th>
                        	<th>下单日期</th>
                        	<th>任务号</th>
                            <th>技改内容</th>
                            <th>订单</th>
                            <th>切换方式</th>
                            <th>总技改台数</th>
                            <th>已技改台数</th>
                            <th>单车总工时</th>
                            <th>任务已投<br>入总工时</th>
                            <th>车间</th>
                            <th>车间单<br>车工时</th>
                            <th>车间投入<br>总工时</th>
                            <th>状态</th>
                            <th>图片</th>
                            <th>车号</th>
                        </tr>
                       
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
                  <div id="pagination"
					class="pagination pagination-small pagination-right"
					style="display: none">
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
				</div>
			</div>
			</div>

<!-- selectBusNumberModal 单任务，技改查询页面-->
<div class="modal" id="selectBusNumberModal_view" tabindex="-1" role="dialog" aria-hidden="true" style="width:900px;display:none;left: 38%;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>技改车辆信息</h3>
       	<h5 style="margin-bottom: -10px;"> 车号：<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号流水..."  id="bus_num_start_view" >
       	~<input type="text" style="height: 30px;padding-top: 10px;" class="input-medium revise" placeholder="车号流水..."  id="bus_num_end_view" >
       	<input type="button" class="btn btn-primary" id="btn_single_bus_num_query_view" value="查询" style="margin-left: 2px;margin-bottom: 10px;"></input>
       	</h5>
    </div>
    <div class="modal-body">
    	<table id="selectBusNumber_table_view" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
			<thead>
                <tr>
                	<th style="text-align:center;" width="60px">序号</th>
                	<th style="text-align:center;">车号</th>
                    <th style="text-align:center;">生产工厂</th>
                    <th style="text-align:center;">当前工序</th>
                    <th style="text-align:center;">确认人</th>
                    <th style="text-align:center;">确认时间</th>
                </tr>
            </thead>
            <tbody id="selectBusNumber_table_tbody_view">
                
            </tbody>
        </table>
    	<input type="hidden" id="selectBusNumber_factoryId_view" /> 
    	<input type="hidden" id="selectBusNumber_taskId_view" />
    	<input type="hidden" id="selectBusNumber_orderId_view" />
    	<input type="hidden" id="selectBusNumber_switch_mode_view" />
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
    </div>
</div>
<!-- selectBusNumberModal end -->
			
		<!-- pic query-->
		<div class="modal" id="taskPicUpLoadQueryModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:700px;display:none;left: 42%;">
		    <div class="modal-header">
		   	 	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		    	<h3>技改任务效果图展示</h3>		
		    </div>
		    <div class="modal-body">
			    	<table>
			    		<tr>
			    			 <td><h4>原效果图:</h4></td>
			       		</tr>
			    		<tr>
			      			 <td colspan="4"><img src="" id="img4" style="max-height: 500px; max-width: 500px;min-height: 200px;"></td>
			      		</tr>
			      		<tr>
			    			 <td><h4>整改后效果图:</h4></td>
			       		</tr>
			      		<tr>
			      			 <td colspan="4"><img src="" id="img5" style="max-height: 500px; max-width: 500px;min-height: 200px;"></td>
			      		</tr>
			       </table>
		    </div>
		    <div class="modal-footer">
		       <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
		 	</div>
		</div>
		<!-- pic query-->
			
		</div>
	</div>

</body>
</html>