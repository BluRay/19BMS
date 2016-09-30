<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 车辆信息查询</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionSearchBusInfo.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">车辆信息查询</legend>
			
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>车号/VIN号</td><td></td>
					</tr>
					<tr>
						<td><input class="input-large" placeholder="车号/VIN号..." id="search_busnumber" type="text" onkeypress="if(event.keyCode==13||event.which==13){ajaxQuery(1);return false;}"></td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>						</td>						
					</tr>
				</table>
			</form>
			<ul id="tabUl" style="height:15px" class="nav nav-pills">
	          <li id="tab01" class="active"><a href="#tab01" data-toggle="tab">基本信息</a></li>
	          <!-- <li id="tab02"><a class="queryUse" href="#tab02" data-toggle="tab">基本配置</a></li> -->
	          <li id="tab03"><a class="queryUse" href="#tab03" data-toggle="tab">生产信息</a></li>
	          <li id="tab04"><a class="queryUse" href="#tab04" data-toggle="tab">检验流程卡</a></li>
	          <li id="tab05"><a class="queryUse" href="#tab05" data-toggle="tab">关键零部件</a></li>
	          <li id="tab06"><a class="queryUse" href="#tab06" data-toggle="tab">订单配置一致性</a></li>
	          <li id="tab07"><a class="queryUse" href="#tab07" data-toggle="tab">底盘铭牌</a></li>
	          <li id="tab11"><a class="queryUse" href="#tab11" data-toggle="tab">整车铭牌</a></li>
	          <li id="tab08"><a class="queryUse" href="#tab08" data-toggle="tab">合格证</a></li>
	          <li id="tab09"><a class="queryUse" href="#tab09" data-toggle="tab">异常信息</a></li>
	          <li id="tab10"><a class="queryUse" href="#tab10" data-toggle="tab">技改信息</a></li>
          	</ul>
          	
<div id="tab01div">
<table id="table01" style="text-align:center;table-layout:fixed;font-size:12px;width:850px" class="table table-bordered table-striped">
	<tr>
		<td width="105px">生产订单：</td><td id="tab01_order_no"></td><td width="105px">车号：</td><td id="tab01_bus_number"></td><td width="105px">VIN：</td><td id="tab01_vin"></td>
	</tr>
	<tr>
		<td>生产工厂：</td><td id="tab01_factory_name"></td><td>车辆配置：</td><td id="tab01_order_config_name"></td><td>客户名称：</td><td id="tab01_customer"></td>
	</tr>
	<tr>
		<td>生产日期：</td><td id="tab01_productive_date"></td><td>左电机号：</td><td id="tab01_left_motor_number"></td><td>右电机号：</td><td id="tab01_right_motor_number"></td>
	</tr>
	<tr>
		<td>车辆颜色：</td><td id="tab01_bus_color"></td><td>座位数量：</td><td id="tab01_bus_seats"></td><td>车辆状态：</td><td id="tab01_production_status"></td>
	</tr>
	<tr>
		<td>客户自编号：</td><td id="tab01_customer_number"></td><td>焊装上线日期：</td><td id="tab01_welding_online_date"></td><td>焊装下线日期：</td><td id="tab01_welding_offline_date"></td>
	</tr>
	<tr>
		<td>玻璃钢下线：</td><td id="tab01_fiberglass_offline_date"></td><td>涂装上线日期：</td><td id="tab01_painting_online_date"></td><td>涂装下线日期：</td><td id="tab01_painting_offline_date"></td>
	</tr>
	<tr>
		<td>底盘上线日期：</td><td id="tab01_chassis_online_date"></td><td>底盘下线日期：</td><td id="tab01_chassis_offline_date"></td><td>总装上线日期：</td><td id="tab01_assembly_online_date"></td>
	</tr>
	<tr>
		<td>总装下线日期：</td><td id="tab01_assembly_offline_date"></td><td>调试区上线：</td><td id="tab01_debugarea_online_date"></td><td>调试区下线：</td><td id="tab01_debugarea_offline_date"></td>
	</tr>
	<tr>
		<td>检测线上线：</td><td id="tab01_testline_online_date"></td><td>检测线下线：</td><td id="tab01_testline_offline_date"></td><td>入库日期：</td><td id="tab01_warehousing_date"></td>
	</tr>
	<tr>
		<td>出厂日期：</td><td id="tab01_dispatch_date"></td><td>配置附件：</td><td id="tab01_config_file"></td><td></td><td></td>
	</tr>

</table>
</div>

<!-- <div id="tab02div">
<p>tab02div</p>
</div> -->

<div id="tab03div">
<table id="table03" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
	<thead>
		<tr id="0">
			<th style="width:60px;text-align:center;">序号</th>
			<th style="text-align:center;">车辆车号</th>
			<th style="text-align:center;">生产工厂</th>
			<th style="text-align:center;">生产车间</th>
			<th style="text-align:center;">生产线别</th>
			<th style="text-align:center;">生产工序</th>
			<th style="text-align:center;">扫描时间</th>
			<th style="text-align:center;">车辆状态</th>
			<th style="text-align:center;">扫描人</th>
		</tr>
	</thead>
	<tbody>	
	</tbody>
</table>
</div>


					<div id="tab04div">
						<table id="table04" class="form-search" style="margin-left:10px;">
							<tr>
								<td width="50px"><strong>车间:</strong></td>
								<td>
								<select id="tb04_workshop" class="input-small">
								</select>&nbsp;&nbsp;</td>
								<td width="70px"><strong>检验结论:</strong></td>
								<td><span id="tb04_result"></span>&nbsp;&nbsp;</td>
								<td width="50px"><strong>检验员:</strong></td>
								<td><span id="tb04_tester"></span>&nbsp;&nbsp;</td>
								<td width="30px"><strong>QE:</strong></td>
								<td><span id="tb04_qe"></span>&nbsp;&nbsp;</td>
							</tr>
						</table>
						<br/>
						<table id="table04Result" class="table table-bordered"
						style="font-size: 12px;">
						<thead>
							<tr>
								<th>节点</th>
								<th>工序</th>
								<th>检测内容</th>
								<th>质控点</th>
								<th>技术要求</th>
								<th>检验频次</th>
								<th>检验工具</th>
								<th>检验结果</th>
								<th>结果判定</th>
								<th>返工/返修</th>
								<th>责任车间</th>
								<th>责任班组</th>
								<th>备注</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
					</div>

					<div id="tab05div">
						<table id="table05" class="form-search" style="margin-left:10px;">
							<tr>
								<td width="50px"><strong>车间:</strong></td>
								<td>
								<select id="tb05_workshop" class="input-small">
								</select>&nbsp;&nbsp;</td>
								<td width="50px"><strong>车型:</strong></td>
								<td><span id="tb05_bustype"></span>&nbsp;&nbsp;</td>
								<td width="50px"><strong>订单:</strong></td>
								<td><span id="tb05_order"></span>&nbsp;&nbsp;</td>
								<td width="50px"><strong>配置:</strong></td>
								<td><span id="tb05_config"></span>&nbsp;&nbsp;</td>
							</tr>
						</table>
						<br/>
						<table class="table table-bordered" id="table05Result">
								<thead>
									<tr>
										<th>序号</th>
										<th>工序编号</th>
										<th>工序名称</th>
										<th >零部件名称</th>
										<th>零部件编号</th>
										<th >批次</th>
										<th>记录人</th>
										<th >记录时间</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
					</div>

					<div id="tab06div">
						<table id="table06" class="form-search" style="margin-left:10px;">
							<tr>
								<td width="50px"><strong>车间:</strong></td>
								<td>
								<select id="tb06_workshop" class="input-small">
								</select>&nbsp;&nbsp;</td>
								<td width="50px"><strong>车型:</strong></td>
								<td><span id="tb06_bustype"></span>&nbsp;&nbsp;</td>
								<td width="50px"><strong>订单:</strong></td>
								<td><span id="tb06_order"></span>&nbsp;&nbsp;</td>
								<td width="50px"><strong>配置:</strong></td>
								<td><span id="tb06_config"></span>&nbsp;&nbsp;</td>
							</tr>
						</table>
						<br/>
						<table class="table table-bordered" id="table06Result">
								<thead>
									<tr>
										<th>序号</th>
										<th>零部件名称</th>
										<th>零部件编号</th>
										<th>供应商</th>
										<th>核对结果</th>
										<th>备注（变更信息）</th>
										<th>记录人</th>
										<th>记录时间</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
					</div>

<div id="tab07div">
<table id="table07" style="text-align:center;table-layout:fixed;font-size:12px;width:850px" class="table table-bordered table-striped">
	<tr>
		<td width="130px;" style="text-align: right;">车辆识别代号：</td><td id="tab07_VIN"></td><td width="130px" style="text-align: right;">生产序号：</td><td id="tab07_sequence"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">底盘型号：</td><td id="tab07_chassis_model"></td><td width="130px" style="text-align: right;">品牌：</td><td id="tab07_brand"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">电机型号：</td><td id="tab07_motor_model"></td><td width="130px" style="text-align: right;">电机最大功率：</td><td id="tab07_motor_power"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">乘员数：</td><td id="tab07_passenger"></td><td width="130px" style="text-align: right;">最大允许总质量：</td><td id="tab07_max_weight"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">电池型号：</td><td id="tab07_battery_model"></td><td width="130px" style="text-align: right;">电池容量：</td><td id="tab07_battery_capacity"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">最高车速：</td><td id="tab07_max_speed"></td><td width="130px" style="text-align: right;">灯光下倾值：</td><td id="tab07_light_downdip"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">额定电压：</td><td id="tab07_rated_voltage"></td><td width="130px" style="text-align: right;">生产日期：</td><td id="tab07_productive_date"></td>
	</tr>
</table>
</div> 
<div id="tab11div">
<table id="table11" style="text-align:center;table-layout:fixed;font-size:12px;width:850px" class="table table-bordered table-striped">
	<tr>
		<td width="130px;" style="text-align: right;">车辆识别代号：</td><td id="tab11_VIN"></td><td width="130px" style="text-align: right;">生产序号：</td><td id="tab11_sequence"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">车辆型号：</td><td id="tab11_vehicle_model"></td><td width="130px" style="text-align: right;">品牌：</td><td id="tab11_brand"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">电机型号：</td><td id="tab11_motor_model"></td><td width="130px" style="text-align: right;">电机最大功率：</td><td id="tab11_motor_power"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">乘员数：</td><td id="tab11_passenger"></td><td width="130px" style="text-align: right;">最大允许总质量：</td><td id="tab11_max_weight"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">电池型号：</td><td id="tab11_battery_model"></td><td width="130px" style="text-align: right;">电池容量：</td><td id="tab11_battery_capacity"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">最高车速：</td><td id="tab11_max_speed"></td><td width="130px" style="text-align: right;">灯光下倾值：</td><td id="tab11_light_downdip"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">额定电压：</td><td id="tab11_rated_voltage"></td><td width="130px" style="text-align: right;">生产日期：</td><td id="tab11_productive_date"></td>
	</tr>
</table>
</div> 

<div id="tab08div">
<table id="table08" style="text-align:center;table-layout:fixed;font-size:12px;width:850px" class="table table-bordered table-striped">
	<tr>
		<td width="130px" style="text-align: right;">车身号：</td><td id="tab08_bus_number"></td><td width="130px" style="text-align: right;">VIN码：</td><td id="tab08_vin"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">底盘型号：</td><td id="tab08_chassis_model"></td><td width="130px" style="text-align: right;">整车型号：</td><td id="tab08_vehicle_model"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">电机型号：</td><td id="tab08_motor_model"></td><td width="130px" style="text-align: right;">电机号：</td><td id="tab08_motor_number"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">颜色：</td><td id="tab08_bus_color"></td><td width="130px" style="text-align: right;">座位数：</td><td id="tab08_bus_seats"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">轮胎规格：</td><td id="tab08_tire_type"></td><td width="130px" style="text-align: right;">弹簧片数：</td><td id="tab08_plates"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">额定载客人数：</td><td id="tab08_passengers"></td><td width="130px" style="text-align: right;">CCC证书签发日期：</td><td id="tab08_ccc_date"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">底盘公告生效日期：</td><td id="tab08_chassis_notice_date"></td><td width="130px" style="text-align: right;">整车公告生效日期：</td><td id="tab08_production_notice_date"></td>
	</tr>
	<tr>
		<td width="130px" style="text-align: right;">底盘生产日期：</td><td id="tab08_chassis_date"></td><td width="130px" style="text-align: right;">整车生产日期：</td><td id="tab08_production_date"></td>
	</tr>
</table>
</div> 

<div id="tab09div">
<table id="table09" style="text-align:center;table-layout:fixed;font-size:12px;width:1150px" class="table table-bordered table-striped">
	<thead>
		<tr id="0">
			<th style="width:60px;text-align:center;">序号</th>
			<th style="width:130px;text-align:center;">车辆车号</th>
			<th style="text-align:center;">生产工厂</th>
			<th style="text-align:center;">生产车间</th>
			<th style="text-align:center;">生产线别</th>
			<th style="text-align:center;">生产工序</th>
			<th style="text-align:center;">严重等级</th>
			<th style="text-align:center;">处理措施</th>
			<th style="text-align:center;">异常记录点</th>
			<th style="text-align:center;">异常原因</th>
			<th style="text-align:center;">责任部门</th>
			<th style="text-align:center;">状态</th>
		</tr>
	</thead>
	<tbody>	
	</tbody>
</table>
</div> 

<div id="tab10div">
	<table id="table10" style="text-align:center;font-size:12px" class="table table-bordered table-striped">
		<thead>
				<tr>
					<th>序号</th>
					<th>技改任务</th>
					<th>技改单编号</th>
					<th>技改工厂</th>
<!-- 					<th>切换方式</th>
					<th>技改台数</th>
					<th>已完成</th>
					<th>未完成</th>
					<th>技改车辆信息</th> -->
					<th>效果图片</th>
					<th>技改状态</th>
					<th>确认人</th>
					<th>确认时间</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
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
</div> 
          	
			</div>
			</div>
			
<!-- new order start -->

<!-- new order End -->		
	
		</div>
	</div>
</body>
</html>