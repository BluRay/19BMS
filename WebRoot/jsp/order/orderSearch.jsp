<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 订单查询</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/order/orderSearch.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_order_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">订单查询</legend>
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>订单编号</td>
						<td>订单名称</td>
						<td>生产年份</td>
						<td>生产工厂</td>
						<td></td>
					</tr>
					<tr>
						<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入订单编号..." value="<s:property value="#request.test"/>" id="search_order_no" /></td>
						<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入订单名称..." id="search_order_name" /></td>
						<td><select name="" id="search_productive_year" class="input-small carSeries">
						</select></td>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td><input type="button" class="btn btn-primary"
							id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						</td>
					</tr>
				</table>
			</form>	
			<ul id="tabUl" style="height:15px;margin-top:-20px" class="nav nav-pills">
				<li id="order_progress" class="active"><a class="queryUse" href="#order_progress" data-toggle="tab">生产进度</a></li>
	            <li id="order_info" ><a class="queryUse" href="#order_info" data-toggle="tab">订单详情</a></li>	          
          	</ul>
          	<div id="order_info_div" style="display:none">
			<table id="tableOrder" class="table table-condensed" style="font-size:12px;">
                    <thead>
                        <tr>
                        	<th style="text-align:center;">订单编号</th>
                            <th style="text-align:center;">订单描述</th>
                            <!-- <th style="text-align:center;">车型</th>
                            <th style="text-align:center;">订单数量</th> -->
                            <th style="text-align:center;">订单交期</th>
                            <th style="text-align:center;">生产工厂</th>
                            <th style="text-align:center;">生产数量</th>
                            <th style="text-align:center;">配置</th>
                            <th style="text-align:center;">配置数量</th>
                            <th style="text-align:center;">座位数</th>                           
                            <th style="text-align:center;">颜色</th>
                            <th style="text-align:center;">客户</th>
                            <th style="text-align:center;">生产顺序</th>
                            <th style="text-align:center;">车号/VIN</th>
                            <th style="text-align:center;">随车附件</th>
                            <th style="text-align:center;">评审结果</th>
                            <th style="text-align:center;">配置附件</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
                <%-- <div id="pagination"
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
				</div> --%>
				</div>
				
				<div id="order_progress_div" >
				<table id="tableProgress" class="table table-condensed" style="font-size:12px;">
                    <thead>
                        <tr>
                        	<th style="text-align:center;">订单编号</th>
                            <th style="text-align:center;">订单描述</th>
                            <th style="text-align:center;">产地</th>                         
                            <th style="text-align:center;">生产数量</th>
                            <th style="text-align:center;">自制件下线</th>
                            <th style="text-align:center;">部件上线</th>
                            <th style="text-align:center;">部件下线</th>
                            <th style="text-align:center;">焊装上线</th>
                            <th style="text-align:center;">焊装下线</th>
                            <th style="text-align:center;">涂装上线</th>
                            <th style="text-align:center;">涂装下线</th>
                            <th style="text-align:center;">底盘上线</th>
                            <th style="text-align:center;">底盘下线</th>
                            <th style="text-align:center;">总装上线</th>
                            <th style="text-align:center;">总装下线</th>
                            <th style="text-align:center;">入库</th>
                            <th style="text-align:center;">发车</th>
                            <th style="text-align:center;">详情</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
				</div>
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
			
<!-- busNumber start -->
<div class="modal" id="busNumberModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;width:666px">
    <div class="modal-header" style="padding:16px;height:130px">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>订单车号</h3>
        <h5 style="margin-bottom: -20px;"> 车号：<input style="height: 30px;padding-top: 10px;" class="input-medium revise" " id="bus_num_modal" type="text">
       	<input class="btn btn-primary" id="btn_bus_num_query" value="查询" style="margin-left: 2px;margin-bottom: 10px;" type="button">
       	</h5>
     	<br/>
        <table id="tablehead"style="table-layout:fixed;font-size:12px;margin-top:1px;margin-left:-0.5px;width: 620px;" class="table table-bordered table-striped">
        <thead>
                <tr>
                	<th style="text-align:center;width:50px" >序号</th>
                	<th style="text-align:center;width:150px">车号</th>
                	<th style="text-align:center;width:150px">VIN</th>
                    <th style="text-align:center;width:70px" >生产工厂</th>
                    <th style="text-align:center;width:200px">当前工序</th>
                </tr>
            </thead>
        </table>
    </div>
    <div class="modal-body">
    	<table id="tableBusNumber" style="table-layout:fixed;font-size:12px;margin-top:-16px;width:620px" class="table table-bordered table-striped">			
            <tbody>
                
            </tbody>
        </table>
    
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <!-- <button class="btn btn-primary" id="btnEditConfirm">确认</button> -->
    </div>
</div>
<!-- busNumber end -->

<!-- busdetailModal start -->
<div class="modal" id="busdetailModal" tabindex="-1" role="dialog" aria-hidden="true" style="margin-left:-600px;width:1200px;display:none;">
    <div class="modal-header" style="padding:16px;height:130px">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>车辆进度详情</h3>
      <h5 style="margin-bottom: -20px;"> 车号：<input style="height: 30px;padding-top: 10px;" class="input-medium revise" " id="bus_num" type="text">
       	<input class="btn btn-primary" id="btn_single_bus_num_query" value="查询" style="margin-left: 2px;margin-bottom: 10px;" type="button">
       	</h5>
     <br/>
     <table id="tablebusdetailtitle" style="table-layout:fixed;font-size:12px;margin-top:1px;margin-left:-1px;width: 1164px;" class="table table-bordered table-striped">
			<thead>
                <tr>
                	<th style="text-align:center;" width="51px">序号</th>
                	<th style="text-align:center;" width="92px">车号</th>
                	<th style="text-align:center;" width="93px">焊装上线</th>
                    <th style="text-align:center;" width="93px">焊装下线</th>
                    <th style="text-align:center;" width="93px">玻璃钢下线</th>
                	<th style="text-align:center;" width="93px">涂装上线</th>
                    <th style="text-align:center;" width="93px">涂装下线</th>
                	<th style="text-align:center;" width="93px">底盘上线</th>
                    <th style="text-align:center;" width="93px">底盘下线</th>
                	<th style="text-align:center;" width="93px">总装上线</th>
                    <th style="text-align:center;" width="93px">总装下线</th>
                	<th style="text-align:center;" width="93px">入库</th>
                    <th style="text-align:center;" width="90px">发车</th>
                </tr>
            </thead>
        </table>   
        
    </div>
    <div class="modal-body">
    	<table id="tablebusdetail" style="table-layout:fixed;font-size:12px;margin-top:-16px;width: 1164px;" class="table table-bordered table-striped">
            <tbody>
                
            </tbody>
        </table>
    
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <!-- <button class="btn btn-primary" id="btnEditConfirm">确认</button> -->
    </div>
</div>
<!-- busdetailModal end -->		
<!-- edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:600px;display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="editModal_title">订单评审</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
        <input type="text" style="display:none;" class="input-small revise" id="Review_factory_order_id" />
        <input type="text" style="display:none;" class="input-small revise" id="Review_id" />
        
        <div style="width: 500px; margin: 0 auto;" class="well">
        <table style="margin-top:-10px;margin-bottom:-10px">
			<tr height="40px">
				<td width="10px"></td>
				<td>订单编号:&nbsp;&nbsp;<input style="height: 30px;" type="text" disabled="disabled" class="input-medium revise" placeholder="订单编号..." id="ReviewOrderNo"/></td>
				<td width="10px"></td>
				<td>订单描述:&nbsp;&nbsp;<input style="height: 30px;" type="text" disabled="disabled" class="input-medium revise" placeholder="订单描述..." id="ReviewOrderDescriptive" /></td>
			</tr>
			<tr height="40px">
				<td width="10px"></td>
				<td>生产工厂:&nbsp;&nbsp;<input style="height: 30px;" type="text" disabled="disabled" class="input-medium revise" placeholder="生产工厂..." id="ReviewOrderFactory"/></td>
				<td width="10px"></td>
				<td>生产数量:&nbsp;&nbsp;<input style="height: 30px;" type="text" disabled="disabled" class="input-medium revise" placeholder="生产数量..." id="ReviewOrderQty" /></td>
			</tr>
			<tr height="40px">
				<td width="10px"></td>
				<td>订单交期:&nbsp;&nbsp;<input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单交期..." id="Review_deliery_date" onClick="WdatePicker({el:'Review_deliery_date',dateFmt:'yyyy-MM-dd'});"/></td>
				<td width="10px"></td>
				<td>部件上线:&nbsp;&nbsp;<input style="height: 30px;" type="text" class="input-medium revise" placeholder="部件上线..." id="Review_assembly_online_date" onClick="WdatePicker({el:'Review_assembly_online_date',dateFmt:'yyyy-MM-dd'});"/></td>
			</tr>
		</table>
		
        </div>
        <legend style="width:550px;margin:0 auto;">&nbsp;&nbsp;评审结果</legend>
        <br/>
        <div style="width: 500px; margin: 0 auto;" class="well">
        <table style="margin-top:-10px;margin-bottom:-10px">
			<tr height="40px">
				<td width="50px"><b>工艺：</b></td>
				<td width="120px" align="right">评估风险点:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="risk_point_technics" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">对策:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="solutions_technics" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">是否满足订单需求:</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;<input name="meet_requirements_flag_technics" id="meet_requirements_flag_technics" type="radio" value="1" checked="checked"/>&nbsp;&nbsp;是 <input name="meet_requirements_flag_technics" id="meet_requirements_flag_technics" type="radio" value="0" />&nbsp;&nbsp;否</td>
			</tr>
		</table>
        </div>
        
        <br/>
        <div style="width: 500px; margin: 0 auto;" class="well">
        <table style="margin-top:-10px;margin-bottom:-10px">
			<tr height="40px">
				<td width="50px"><b>生产：</b></td>
				<td width="120px" align="right">评估风险点:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="risk_point_production" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">对策:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="solutions_production" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">是否满足订单需求:</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;<input name="meet_requirements_flag_production" id="meet_requirements_flag_production" type="radio" value="1" checked="checked"/>&nbsp;&nbsp;是 <input name="meet_requirements_flag_production" id="meet_requirements_flag_production" type="radio" value="0" />&nbsp;&nbsp;否</td>
			</tr>
		</table>
        </div>
        
        <br/>
        <div style="width: 500px; margin: 0 auto;" class="well">
        <table style="margin-top:-10px;margin-bottom:-10px">
			<tr height="40px">
				<td width="50px"><b>物控：</b></td>
				<td width="120px" align="right">评估风险点:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="risk_point_materiel" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">对策:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="solutions_materiel" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">是否满足订单需求:</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;<input name="meet_requirements_flag_materiel" id="meet_requirements_flag_materiel" type="radio" value="1" checked="checked"/>&nbsp;&nbsp;是 <input name="meet_requirements_flag_materiel" id="meet_requirements_flag_materiel" type="radio" value="0" />&nbsp;&nbsp;否</td>
			</tr>
		</table>
        </div>
        
        <br/>
        <div style="width: 500px; margin: 0 auto;" class="well">
        <table style="margin-top:-10px;margin-bottom:-10px">
			<tr height="40px">
				<td width="50px"><b>设备：</b></td>
				<td width="120px" align="right">评估风险点:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="risk_point_device" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">对策:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="solutions_device" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">是否满足订单需求:</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;<input name="meet_requirements_flag_device" id="meet_requirements_flag_device" type="radio" value="1" checked="checked"/>&nbsp;&nbsp;是 <input name="meet_requirements_flag_device" id="meet_requirements_flag_device" type="radio" value="0" />&nbsp;&nbsp;否</td>
			</tr>
		</table>
        </div>
        
        <br/>
        <div style="width: 500px; margin: 0 auto;" class="well">
        <table style="margin-top:-10px;margin-bottom:-10px">
			<tr height="40px">
				<td width="50px"><b>计划：</b></td>
				<td width="120px" align="right">评估风险点:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="risk_point_plan" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">对策:&nbsp;&nbsp;</td>
				<td><textarea class="input-xlarge" onkeyup="this.value = this.value.slice(0, 80)" id="solutions_plan" rows="1"></textarea></td>
			</tr>
			<tr height="40px">
				<td width="50px">&nbsp;&nbsp;</td>
				<td width="120px" align="right">是否满足订单需求:</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;<input name="meet_requirements_flag_plan" id="meet_requirements_flag_plan" type="radio" value="1" checked="checked"/>&nbsp;&nbsp;是 <input name="meet_requirements_flag_plan" id="meet_requirements_flag_plan" type="radio" value="0" />&nbsp;&nbsp;否</td>
			</tr>
		</table>
        </div>
				  
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <!-- <button class="btn btn-primary" id="btnReviewConfirm">确认</button> -->
    </div>
</div>
<!-- edit order end -->
				
		</div>
	</div>
</body>
</html>