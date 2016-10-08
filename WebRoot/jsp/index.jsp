<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ include file="common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8;width=device-width, initial-scale=1.0" />
<title>BMS</title>
<link href="<%=basePath%>/css/bootstrap-ie6.css" rel="stylesheet">
<link href="<%=basePath%>/css/bootstrap.css" rel="stylesheet">
<link href="<%=basePath%>/css/bootstrap-responsive.css" rel="stylesheet">
<link href="<%=basePath%>/css/ie.css" rel="stylesheet">
<link rel="stylesheet" href="<%=basePath%>/css/font-awesome.min.css">
<link href="<%=basePath%>/css/home.css" rel="stylesheet">
<script type="text/javascript" src="<%=basePath%>/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/bootstrap.min.js"></script>
<script type="text/javascript">
	
	$(document).ready(function() {
		if(window.location.href.indexOf("bms.byd.com.cn")>=0){
			//alert("域名访问");
			$("#a_logout").attr("href","http://websso.byd.com.cn/oam/server/logout?end_url=http://bms.byd.com.cn ");
		}else{
			$("#a_logout").attr("href","logout.action");
		}
		
		$(".overlink").hover(function() {
			$(this).css("font-size", "23pt");
			$(".overlink").css("width", "80px");
			$(".overlink").css("height", "50px");
		}, function() {
			//alert("aa");
			$(this).css("font-size", "22px");
		});
		getAuthorityFactorySelect("#factorySelect", "", "noall");

		ajaxQueryOrder();
		$("#factorySelect").live("change",function(){
			ajaxQueryOrder();
		});
		setInterval(function () {
			ajaxQueryOrder();
		},1000*60*5);
		
		function ajaxQueryOrder(){
			var factoryId=$("#factorySelect").val();
			$.ajax({
				url:"common!getIndexOrderInfo.action",
				type:"post",
				data:{
					factoryId:factoryId
				},
				dataType:"json",
				success:function(response){
					//dpu 
					var productionInfo=(response.productionInfo)[0];
					var dpu_welding,dpu_painting,dpu_bottom,dpu_assembly;
					$.each(response.dupList,function(index,value){
						if(value.workshop_name=='焊装'){
							dpu_welding=value.dup;
						}
						if(value.workshop_name=='涂装'){
							dpu_painting=value.dup;
						}
						if(value.workshop_name=='底盘'){
							dpu_bottom=value.dup;
						}
						if(value.workshop_name=='总装'){
							dpu_assembly=value.dup;
						}
					});
					
					//一次校检合格率
					var pass_rate_welding,pass_rate_painting,pass_rate_bottom,pass_rate_assembly;
					$.each(response.passRateList,function(index,value){
						if(value.workshop_name=='焊装'){
							pass_rate_welding=value.pass_rate+"%";
						}
						if(value.workshop_name=='涂装'){
							pass_rate_painting=value.pass_rate+"%";
						}
						if(value.workshop_name=='底盘'){
							pass_rate_bottom=value.pass_rate+"%";
						}
						if(value.workshop_name=='总装'){
							pass_rate_assembly=value.pass_rate+"%";
						}
					});
					//计划模块显示信息
					$("#planOrderTable tbody").html("");
					$.each(response.orderList,function(index,order){
						var tr=$("<tr />");
						var orderNo=order.order_no==undefined?"":order.order_no;
						var orderName=order.order_name==undefined?"":order.order_name;
						var busType=order.bus_type_code==undefined?"":order.bus_type_code;
						var orderQty=order.order_qty==undefined?"":order.order_qty;
						var productionQty=order.production_qty==undefined?"":order.production_qty;
						var alreadyNum=order.alreadyNum==undefined?"":order.alreadyNum;
						$("<td style=\"text-align:right\" onclick=\"window.open('order!ordersearch.action?order_no="+order.order_no+"','_self')\" />").html(orderNo+" "+orderName+" "+busType+" "+orderQty).appendTo(tr);
						$("<td />").html(productionQty).appendTo(tr);
						$("<td />").html(alreadyNum).appendTo(tr);
						var status=parseInt(order.production_qty)==parseInt(order.alreadyNum)?"已完成":"生产中";
						$("<td />").html(status).appendTo(tr);
						$("#planOrderTable tbody").append(tr);
					});
					//异常模块显示信息
					$("#exceptionTable tbody").html("");
					$.each(response.pauseList,function(index,pause){
						var tr=$("<tr />");
						$("<td width='50%' style='color:red'/>").html(pause.workshop_name+pause.line).appendTo(tr);
						$("<td width='50%' style='color:red'/>").html(pause.reason).appendTo(tr);
						$("#exceptionTable tbody").append(tr);
					});
					$.each(response.exceptionList,function(index,exception){
						var tr=$("<tr />");
						$("<td />").html(exception.bus_number).appendTo(tr);
						$("<td />").html(exception.reason).appendTo(tr);
						$("#exceptionTable tbody").append(tr);
					});
					
					//焊装
					$("#weldingTable tbody").html("");
					$.each(response.weldingList,function(index,data){
						var onoff=data.process_node=="焊装上线"?"上线":"下线";
						var tr=$("<tr />");
						$("<td style='width:55%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=焊装&onoff="+onoff+"','_self')\" />").html(data.process_node).appendTo(tr);
						$("<td style='width:45%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=焊装&onoff="+onoff+"','_self')\" />").html(data.done_num+"/"+data.plan_total).appendTo(tr);
						$("#weldingTable tbody").append(tr);
					});
					var tr_w_dpu=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('qualityReport!dpuReport.action?department=焊装','_self')\" />").html("DPU").appendTo(tr_w_dpu);
					$("<td style='width:45%' onclick=\"window.open('qualityReport!dpuReport.action?department=焊装','_self')\" />").html(dpu_welding).appendTo(tr_w_dpu);
					var tr_w_pass_rate=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('qualityReport!passRateReport.action?department=焊装','_self')\" />").html("一次交检合格率").appendTo(tr_w_pass_rate);
					$("<td style='width:45%' onclick=\"window.open('qualityReport!passRateReport.action?department=焊装','_self')\" />").html(pass_rate_welding).appendTo(tr_w_pass_rate);
					if(dpu_welding!=null) $("#weldingTable tbody").append(tr_w_dpu);
					if(pass_rate_welding!=null) $("#weldingTable tbody").append(tr_w_pass_rate);
					
					/*
					焊装在制库存
					*/
					var tr_w_prod=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=焊装','_self')\" />").html("在制库存").appendTo(tr_w_prod);
					$("<td style='width:45%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=焊装','_self')\" />").html(productionInfo.welding_count).appendTo(tr_w_prod);
					$("#weldingTable tbody").append(tr_w_prod);
					
					//涂装
					$("#paintingTable tbody").html("");
					$.each(response.paintingList,function(index,data){
						var onoff=data.process_node=="涂装上线"?"上线":"下线";
						var tr=$("<tr />");
						$("<td style='width:55%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=涂装&onoff="+onoff+"','_self')\" />").html(data.process_node).appendTo(tr);
						$("<td style='width:45%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=涂装&onoff="+onoff+"','_self')\" />").html(data.done_num+"/"+data.plan_total).appendTo(tr);
						$("#paintingTable tbody").append(tr);
					});
					var tr_p_dpu=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('qualityReport!dpuReport.action?department=涂装','_self')\" />").html("DPU").appendTo(tr_p_dpu);
					$("<td style='width:45%' onclick=\"window.open('qualityReport!dpuReport.action?department=涂装','_self')\" />").html(dpu_painting).appendTo(tr_p_dpu);
					var tr_p_pass_rate=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('qualityReport!passRateReport.action?department=涂装','_self')\" />").html("一次交检合格率").appendTo(tr_p_pass_rate);
					$("<td style='width:45%' onclick=\"window.open('qualityReport!passRateReport.action?department=涂装','_self')\" />").html(pass_rate_painting).appendTo(tr_p_pass_rate);
					if(dpu_painting!=null) $("#paintingTable tbody").append(tr_p_dpu);
					if(pass_rate_painting!=null) $("#paintingTable tbody").append(tr_p_pass_rate);
					/*
					 涂装在制库存
					*/
					var tr_p_prod=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=涂装','_self')\" />").html("在制库存").appendTo(tr_p_prod);
					$("<td style='width:45%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=涂装','_self')\" />").html(productionInfo.painting_count).appendTo(tr_p_prod);
					$("#paintingTable tbody").append(tr_p_prod);
					
					//底盘
					$("#bottomTable tbody").html("");
					$.each(response.bottomList,function(index,data){
						var onoff=data.process_node=="底盘上线"?"上线":"下线";
						var tr=$("<tr />");
						$("<td style='width:55%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=底盘&onoff="+onoff+"','_self')\" />").html(data.process_node).appendTo(tr);
						$("<td style='width:45%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=底盘&onoff="+onoff+"','_self')\" />").html(data.done_num+"/"+data.plan_total).appendTo(tr);
						$("#bottomTable tbody").append(tr);
					});
					var tr_b_dpu=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('qualityReport!dpuReport.action?department=底盘','_self')\" />").html("DPU").appendTo(tr_b_dpu);
					$("<td style='width:45%' onclick=\"window.open('qualityReport!dpuReport.action?department=底盘','_self')\" />").html(dpu_bottom).appendTo(tr_b_dpu);
					var tr_b_pass_rate=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('qualityReport!passRateReport.action?department=底盘','_self')\" />").html("一次交检合格率").appendTo(tr_b_pass_rate);
					$("<td style='width:45%' onclick=\"window.open('qualityReport!passRateReport.action?department=底盘','_self')\" />").html(pass_rate_bottom).appendTo(tr_b_pass_rate);
					if(dpu_bottom!=null) $("#bottomTable tbody").append(tr_b_dpu);
					if(pass_rate_bottom!=null) $("#bottomTable tbody").append(tr_b_pass_rate);
					/*
					 底盘在制库存
					*/
					var tr_b_prod=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=底盘','_self')\" />").html("在制库存").appendTo(tr_b_prod);
					$("<td style='width:45%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=底盘','_self')\" />").html(productionInfo.chassis_count).appendTo(tr_b_prod);
					$("#bottomTable tbody").append(tr_b_prod);
					
					//总装
					$("#assemblyTable tbody").html("");
					$.each(response.assemblyList,function(index,data){
						var onoff=data.process_node=="总装上线"?"上线":"下线";
						var tr=$("<tr />");
						$("<td style='width:55%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=总装&onoff="+onoff+"','_self')\" />").html(data.process_node).appendTo(tr);
						$("<td style='width:45%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=总装&onoff="+onoff+"','_self')\" />").html(data.done_num+"/"+data.plan_total).appendTo(tr);
						$("#assemblyTable tbody").append(tr);
					});
					var tr_a_dpu=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('qualityReport!dpuReport.action?department=总装','_self')\" />").html("DPU").appendTo(tr_a_dpu);
					$("<td style='width:45%' onclick=\"window.open('qualityReport!dpuReport.action?department=总装','_self')\" />").html(dpu_assembly).appendTo(tr_a_dpu);
					var tr_a_pass_rate=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('qualityReport!passRateReport.action?department=总装','_self')\" />").html("一次交检合格率").appendTo(tr_a_pass_rate);
					$("<td style='width:45%' onclick=\"window.open('qualityReport!passRateReport.action?department=总装','_self')\" />").html(pass_rate_assembly).appendTo(tr_a_pass_rate);
					if(dpu_assembly!=null) $("#assemblyTable tbody").append(tr_a_dpu);
					if(pass_rate_assembly!=null) $("#assemblyTable tbody").append(tr_a_pass_rate);
					/*
					总装在制库存
					*/
					var tr_a_prod=$("<tr />");
					$("<td style='width:55%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=总装','_self')\" />").html("在制库存").appendTo(tr_a_prod);
					$("<td style='width:45%' onclick=\"window.open('production!productionsearch.action?factory="+factoryId+"&workshop=总装','_self')\" />").html(productionInfo.assembly_count).appendTo(tr_a_prod);
					$("#assemblyTable tbody").append(tr_a_prod);
					
				}
				
			});
		}
		setInterval('autoScroll("#exceptionTable", "tbody")',5000); 
	});
</script>
<style type="text/css">
a:hover {
	color: black;
	text-decoration: none
}

.overlink {
	color: black
}
.thumbnail {
    display: block;
    padding: 4px;
    line-height: 20px;
    border: 1px solid #DDD;
    border-radius: 4px;
  /*   box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.055); */
    transition: all 0.2s ease-in-out 0s;
}
</style>
</head>
<body
	style="background:url(<%=basePath%>/images/home-background.png) No-Repeat; Background-Size: 100% Auto;">
	<div id="maintContainer" class="container">
		<div class="row-fluid" style="width:100%;height:10%;">
			<div style="width: 10%; display: inline; margin-top: 15px;">
				<img src="<%=basePath%>/images/byd_logo.png"
					style="width: 7%; height: auto">
			</div>
			<div
				style="width: 20%; display: inline; margin-left: 10px; text-align: center">
				<img src="<%=basePath%>/images/welcomeBMS.png" style="width: 18%;">
				<%-- <span style="font-size:120%;margin-left:10px;vertical-align:middle;color:blue;cursor:pointer"><b>
				<%=session.getAttribute("factory")%></b></span> --%>
			</div>
			<div style="display:inline;margin-top: 15px;">
				<select style="-moz-appearance:none;-webkit-appearance:none;font-size:140%;vertical-align:middle;background-color: transparent;font-weight:bold;color:blue;border: 0px none;height: 45px;
				padding-top: 13px;width:95px" id="factorySelect" class="input-small carType">				
				</select>
				<%-- <span class="fa fa-angle-down fa-lg " style="vertical-align:middle;color:blue;margin-left:-3px;"></span> --%>
			</div>
			<div class="pull-right"
				style="width: 45%; margin-top: 5px; margin-align: right; display: inline; text-align: right;">
				<div
					style="width: 10%; font-size: 140%; display: inline; margin-left: 60%; margin-top: 30px;">
					<%-- <s:property value="username"></s:property> --%>
					<a href="account!accountCenter.action" style="color:black;vertical-align: middle;" rel="tooltip" title="账户管理"><%=session.getAttribute("user_name")%></a>
				</div>
				<div style="display: inline;">
					
					<a id='a_logout' href="logout.action"><img src="<%=basePath%>/images/power.png" style="width: 6%;" ></a>
				</div>
			</div>
		</div>
		<div style="width:100%;height:70%;margin-top:20px">
		<div class="row-fluid" >
			<div class="span12">
				<ul class="thumbnails" style="line-heigth:20px">
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; Background: Url('<%=basePath%>/images/home-1.png') No-Repeat; Background-Size: 100% Auto;Filter:Alpha(Opacity=10)">
							<div>
								<h4 align="left" style="color: white">我的任务</h4>
							</div>
							<div style="height: 20px"></div>
						</div>
					</li>
					<li class="span6">
						<div id="planMaintain" class="thumbnail" 
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-3.png') no-repeat ; background-size: 100% auto;filter:alpha(opacity=10)">
								<div class="span2">
									<h4 align="left" style="color: white">计划</h4>
								</div>
								<div class="span10">
									<table id="planOrderTable"
										style="text-align: center; color: white; font-size: 100%;margin-top:10px; border: 0;">
										<thead>
										<tr>
											<td width="40%">订单</td>
											<td width="15%">计划产量</td>
											<td width="15%">完成产量</td>
											<td width="15%">状况</td>
										</tr>
										</thead>
										<tbody >
										<!-- <tr>
											<td >K9A-DL-2015001</td>
											<td >100</td>
											<td >80</td>
											<td >正常</td>
										</tr>
										<tr>
											<td >K9B-HZ-2015001</td>
											<td >80</td>
											<td >50</td>
											<td >正常</td>
										</tr>
										<tr >
											<td >K9B-HZ-2015011</td>
											<td >80</td>
											<td >50</td>
											<td >异常</td>
										</tr> -->
										</tbody>
										
									</table>
								</div>
						</div>
					</li>
					<li class="span3">
						<div id="exceptionMaintain" class="thumbnail" onclick="window.open('productionReport!exceptionReport.action')"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-2.png') no-repeat; background-size: 100% auto;filter:alpha(opacity=10)">
							<div>
								<h4 align="left" style="color: white">异常</h4>
							</div>
							<div style="height:102px;overflow-y:hidden;margin-top:10px; ">
								<table id="exceptionTable"
										style="text-align: center; color: white; font-size: 100%;border: 0;">
										<!-- <thead>
										<tr>
											<td width="45%">车号</td>
											<td width="45%">异常原因</td>
										</tr>
										</thead> -->
										<tbody >
										</tbody>
								</table>		
							</div>
						</div>
					</li>
				</ul>
			</div>
			</div>
		<div class="row-fluid" >
			<div class="span12">
				<ul class="thumbnails">
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-4.png') no-repeat; background-size: 100% auto;filter:alpha(opacity=10)">
							<div class="span3">
								<h4 align="left" style="color: white">焊装</h4>
							</div>
							<div class="span9">
								<table id="weldingTable"
										style="text-align: center; color: white; font-size: 100%;margin-top:20%;border: 0;">
										<tbody >
										</tbody>
								</table>	
							</div>
						</div>
					</li>
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-5.png') no-repeat ; background-size: 100% auto;filter:alpha(opacity=10)">
							<div class="span3">
								<h4 align="left" style="color: white">涂装</h4>
							</div>
							<div class="span9">
									<table id="paintingTable"
										style="text-align: center; color: white; font-size: 100%;margin-top:20%;border: 0;">
										<tbody >
										</tbody>
								</table>
							</div>
						</div>
					</li>
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-6.png') no-repeat ; background-size: 100% auto;filter:alpha(opacity=10)">
							<div class="span3">
								<h4 align="left" style="color: white">底盘</h4>
							</div>
							<div class="span9">
									<table id="bottomTable"
										style="text-align: center; color: white; font-size: 100%;margin-top:20%;border: 0;">
										<tbody >
										</tbody>
								</table>
							</div>
						</div>
					</li>
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-7.png') no-repeat; background-size: 100% auto;filter:alpha(opacity=10)">
							<div class="span3">
								<h4 align="left" style="color: white">总装</h4>
							</div>
							<div class="span9">
								<table id="assemblyTable"
										style="text-align: center; color: white; font-size: 100%;margin-top:20%;border: 0;">
										<tbody >
										</tbody>
								</table>
							</div>
						</div>
					</li>
				</ul>
			</div>
			</div>
		</div>
		<div style="width:100%;height:10%;">

			<div
				style="height:80px;background: url('<%=basePath%>/images/home-8.png') no-repeat ; background-size: 100% auto;vertical-align:middle">
				
				<div style="display: inline-block; width: 100%;">

					<div style="width: 80%; display: inline; margin-left: 30px;">
						<table
							style="margin: 0px auto; width: 78%; text-align: center; font-size: 22px;">
							<tr>
								<td style="width: 9%; height: 50px"><a
									href="order!ordersearch.action" class="overlink">订单</a></td>
								<td style="width: 9%; height: 50px"><a
									href="plan!index.action" class="overlink">计划</a></td>
								<td style="width: 9%; height: 50px"><a
									href="production!index.action" class="overlink">生产</a></td>
								<td style="width: 9%; height: 50px"><a
									href="ecnDocumentTask!showEcnInformationList.action" class="overlink">技改</a></td>
								<td style="width: 9%; height: 50px"><a
									href="testRecordIn!qualityIndex.action" class="overlink">品质</a></td>
								<td style="width: 9%; height: 50px"><a href="afterSale!queryAfterSaleProblems.action"
									class="overlink">售后</a></td>
								<td style="width: 9%; height: 50px"><a href="#"
									class="overlink">仓储</a></td>
								<td style="width: 9%; height: 50px"><a href="selfcost!index.action"
									class="overlink">成本</a></td>
								<td style="width: 9%; height: 50px"><a href="hr!index.action"
									class="overlink">人事</a></td>
								<td style="width: 9%; height: 50px"><a href="orderReport!orderIndex.action"
									class="overlink">报表</a></td>
								<td style="width: 9%; height: 50px"><a
									href="baseData!settingIndex.action" class="overlink">设置</a></td>
							</tr>
						</table>
					</div>

				</div>
			</div>
		</div>
	</div>
</body>
</html>
