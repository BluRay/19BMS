<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 系统设置</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/setting/busType.js"></script>
</head>
<body style="overflow:hidden;">
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_setting_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper " >
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">车型</legend>
			<div style="margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>车辆类型</td>
							<td>车型编号</td>
							<!-- <td>工厂简称</td> -->
							<td>车型内部名称</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>	
								<select name="" id="seach_vehicle_type" class="input-medium carType">
									<option value="">全部</option>
								</select>&nbsp;</td>
							<td><input type="text" class="input-medium revise"
								id="seach_busTypeCode" />&nbsp;</td>
							<td><input type="text" onchange="return onlyNum(this);" class="input-medium revise" id="seach_internalName" ></td>
							<td>&nbsp;&nbsp;&nbsp;</td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
							<td><input type="button" class="btn btn-success" id="btnAdd"
								value="新增" style="margin-left: 2px;"></input></td>
						</tr>
					</table>
				</form>

				<table id="tableBusType" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
							<th>车型编号</th>
							<th>内部名称</th>
						<!-- <th>品牌</th>  -->
						<!--	<th>制造厂</th> -->
						<!--	<th>车辆类型</th>  -->
							<th>车辆型号</th>
							<th>底盘型号</th>
							<th>车辆长度</th>
							<th>轴距</th>
							<th >最大允许总质量</th>
						<!--	<th>额定载客人数</th> -->
						<!--	<th>燃料类型</th> -->
						<!--	<th>驱动电机类型</th> -->
							<th>电机型号</th>
						<!--	<th>电机最大功率</th> -->
							<th>电池型号</th>
						<!--	<th>电池容量</th> -->
						<!--	<th>额定电压</th> -->
							<th>VIN前八位</th>
							<th>维护人</th>
						<!--	<th>维护时间</th> -->
							<th></th>
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
		<!-- NEW MODAL -->
		<div class="modal" id="newModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;width: 880px;left: 40%;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>新增车型</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div style="float: left;width: 50%;">
						<div class="control-group">
							<label class="control-label" for="new_bus_type_code">*&nbsp;车型编号</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="new_bus_type_code" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_brand">*&nbsp;品牌</label>
							<div class="controls">
								<input type="text" value="比亚迪牌"  disabled="disabled" class="input-medium" id="new_brand" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_vehicle_type">*&nbsp;车辆类型</label>
							<div class="controls">
								<select name="" id="new_vehicle_type" class="input-medium carType">
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_body_type">*&nbsp;车身类型</label>
							<div class="controls">
								<select name="" id="new_body_type" class="input-medium carType">
									<option>请选择</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="new_vehicle_model">*&nbsp;车辆型号</label>
							<div class="controls">
								<input type="text" class="input-medium" id="new_vehicle_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_chassis_model">*&nbsp;底盘型号</label>
							<div class="controls">
								<input type="text" class="input-medium" id="new_chassis_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_vehicle_length">*&nbsp;车辆长度</label>
							<div class="controls">
								<input type="text"  onkeyup="return onlyNum(this);" class="input-medium" id="new_vehicle_length" />&nbsp;mm
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_wheelbase">*&nbsp;轴距</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="new_wheelbase" />&nbsp;mm
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_max_weight">*&nbsp;最大允许总质量</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="new_max_weight" />&nbsp;KG
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_passengers">*&nbsp;额定载客人数</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="new_passengers" />&nbsp;人
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_vin_prefix">*&nbsp;VIN前八位</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="new_vin_prefix" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_max_speed">*&nbsp;最高车速</label>
							<div class="controls">
								<input type="text"  onkeyup="return onlyNum(this);" class="input-medium" id="new_max_speed" />&nbsp;km/h
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_light_downdip">*&nbsp;灯光下倾值</label>
							<div class="controls">
								<input type="text" title='灯光下倾值' onkeyup="return onlyNum(this);" class="input-medium" id="new_light_downdip" />&nbsp;
							</div>
						</div>
					</div>
					<div style="float: right;width: 50%;">
						<div class="control-group">
							<label class="control-label" for="new_internal_name">*&nbsp;车型内部名称</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="new_internal_name" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_manufacturer">*&nbsp;制造厂</label>
							<div class="controls">
								<input type="text" style="width: 220px;" value="比亚迪汽车工业有限公司"  disabled="disabled" class="input-medium" id="new_manufacturer" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_fuel_type">*&nbsp;燃料类型</label>
							<div class="controls">
								<select name="" id="new_fuel_type" class="input-medium carType">
									<option value="0" selected="selected">电动</option>
									<option value="1">燃油</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="new_drive_motor_type">*&nbsp;驱动电机类型</label>
							<div class="controls">
								<select name="" style="width: 220px;" id="new_drive_motor_type" class="input-medium carType">
									<option>请选择</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="new_drive_motor">*&nbsp;驱动电机</label>
							<div class="controls">
								<input type="text" style="width: 220px;" class="input-medium" id="new_drive_motor" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_motor_model">*&nbsp;电机型号</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="new_motor_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="newPlanNode">*&nbsp;电机最大功率</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);"  class="input-medium" id="new_motor_power" />&nbsp;KW
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_battery_model">*&nbsp;电池型号</label>
							<div class="controls">
								<input type="text" class="input-medium" id="new_battery_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_battery_capacity">*&nbsp;电池容量</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="new_battery_capacity" />&nbsp;AH
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_rated_voltage">*&nbsp;额定电压</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="new_rated_voltage" />&nbsp;V
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_passanger_num">*&nbsp;乘员数</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="new_passanger_num" />&nbsp;人
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="new_spring_num">*&nbsp;弹簧片数</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="new_spring_num" />&nbsp;
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" id="btnClose" aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnAddConfirm">确认新增</button>
			</div>
		</div>
		<!-- EDIT MODAL -->
		<div class="modal" id="editModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;width: 880px;left: 40%;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>编辑车型</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div style="float: left;width: 50%;">
						<div class="control-group">
							<label class="control-label" for="edit_bus_type_code">*&nbsp;车型编号</label>
							<div class="controls">
								<input type="text" disabled="disabled"  class="input-medium" id="edit_bus_type_code" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_brand">*&nbsp;品牌</label>
							<div class="controls">
								<input type="text" value="比亚迪牌"  disabled="disabled" class="input-medium" id="edit_brand" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_vehicle_type">*&nbsp;车辆类型</label>
							<div class="controls">
								<select name="" id="edit_vehicle_type" class="input-medium carType">
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_body_type">*&nbsp;车身类型</label>
							<div class="controls">
								<select name="" id="edit_body_type" class="input-medium carType">
									<option>请选择</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="edit_vehicle_model">*&nbsp;车辆型号</label>
							<div class="controls">
								<input type="text" class="input-medium" id="edit_vehicle_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_chassis_model">*&nbsp;底盘型号</label>
							<div class="controls">
								<input type="text" class="input-medium" id="edit_chassis_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_vehicle_length">*&nbsp;车辆长度</label>
							<div class="controls">
								<input type="text"  onkeyup="return onlyNum(this);" class="input-medium" id="edit_vehicle_length" />&nbsp;mm
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_wheelbase">*&nbsp;轴距</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="edit_wheelbase" />&nbsp;mm
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_max_weight">*&nbsp;最大允许总质量</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="edit_max_weight" />&nbsp;KG
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_passengers">*&nbsp;额定载客人数</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="edit_passengers" />&nbsp;人
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_vin_prefix">*&nbsp;VIN前八位</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="edit_vin_prefix" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_max_speed">*&nbsp;最高车速</label>
							<div class="controls">
								<input type="text"  onkeyup="return onlyNum(this);" class="input-medium" id="edit_max_speed" />&nbsp;km/h
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_light_downdip">*&nbsp;灯光下倾值</label>
							<div class="controls">
								<input type="text" title='灯光下倾值' onkeyup="return onlyNum(this);" class="input-medium" id="edit_light_downdip" />&nbsp;
							</div>
						</div>
					</div>
					<div style="float: right;width: 50%;">
						<div class="control-group">
							<label class="control-label" for="edit_internal_name">*&nbsp;车型内部名称</label>
							<div class="controls">
								<input type="text" disabled="disabled"  class="input-medium" id="edit_internal_name" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_manufacturer">*&nbsp;制造厂</label>
							<div class="controls">
								<input type="text" style="width: 220px;" value="比亚迪汽车工业有限公司"  disabled="disabled" class="input-medium" id="edit_manufacturer" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_fuel_type">*&nbsp;燃料类型</label>
							<div class="controls">
								<select name="" id="edit_fuel_type" class="input-medium carType">
									<option value="0" selected="selected">电动</option>
									<option value="1">燃油</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="edit_drive_motor_type">*&nbsp;驱动电机类型</label>
							<div class="controls">
								<select name="" style="width: 220px;" id="edit_drive_motor_type" class="input-medium carType">
									<option>请选择</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="edit_drive_motor">*&nbsp;驱动电机</label>
							<div class="controls">
								<input type="text" style="width: 220px;" class="input-medium" id="edit_drive_motor" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_motor_model">*&nbsp;电机型号</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="edit_motor_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_motor_power">*&nbsp;电机最大功率</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);"  class="input-medium" id="edit_motor_power" />&nbsp;KW
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_battery_model">*&nbsp;电池型号</label>
							<div class="controls">
								<input type="text" class="input-medium" id="edit_battery_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_battery_capacity">*&nbsp;电池容量</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="edit_battery_capacity" />&nbsp;AH
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_rated_voltage">*&nbsp;额定电压</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="edit_rated_voltage" />&nbsp;V
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_passanger_num">*&nbsp;乘员数</label>
							<div class="controls">
								<input type="text" onkeyup="return onlyNum(this);" class="input-medium" id="edit_passanger_num" />&nbsp;人
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="edit_spring_num">*&nbsp;弹簧片数</label>
							<div class="controls">
								<input type="text"  class="input-medium" id="edit_spring_num" />&nbsp;
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" id="btnClose" aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnEditConfirm">确认编辑</button>
			</div>
		</div>
		
		<div class="modal" id="viewModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;width: 880px;left: 40%;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>车型信息预览</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div style="float: left;width: 50%;">
						<div class="control-group">
							<label class="control-label" for="view_bus_type_code">*&nbsp;车型编号</label>
							<div class="controls">
								<input type="text" disabled="disabled"  class="input-medium" id="view_bus_type_code" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_brand">*&nbsp;品牌</label>
							<div class="controls">
								<input type="text" value="比亚迪牌"  disabled="disabled" class="input-medium" id="view_brand" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_vehicle_type">*&nbsp;车辆类型</label>
							<div class="controls">
								<select name="" id="view_vehicle_type" disabled="disabled" class="input-medium carType">
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_body_type">*&nbsp;车身类型</label>
							<div class="controls">
								<select name="" id="view_body_type" disabled="disabled" class="input-medium carType">
									<option>请选择</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="view_vehicle_model">*&nbsp;车辆型号</label>
							<div class="controls">
								<input type="text" class="input-medium" disabled="disabled" id="view_vehicle_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_chassis_model">*&nbsp;底盘型号</label>
							<div class="controls">
								<input type="text" class="input-medium" disabled="disabled" id="view_chassis_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_vehicle_length">*&nbsp;车辆长度</label>
							<div class="controls">
								<input type="text"  disabled="disabled" onkeyup="return onlyNum(this);" class="input-medium" id="view_vehicle_length" />&nbsp;mm
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_wheelbase">*&nbsp;轴距</label>
							<div class="controls">
								<input type="text" disabled="disabled" onkeyup="return onlyNum(this);" class="input-medium" id="view_wheelbase" />&nbsp;mm
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_max_weight">*&nbsp;最大允许总质量</label>
							<div class="controls">
								<input type="text" disabled="disabled" onkeyup="return onlyNum(this);" class="input-medium" id="view_max_weight" />&nbsp;KG
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_passengers">*&nbsp;额定载客人数</label>
							<div class="controls">
								<input type="text" disabled="disabled" class="input-medium" id="view_passengers" />&nbsp;人
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_vin_prefix">*&nbsp;VIN前八位</label>
							<div class="controls">
								<input type="text" disabled="disabled" class="input-medium" id="view_vin_prefix" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_max_speed">*&nbsp;最高车速</label>
							<div class="controls">
								<input type="text"  disabled="disabled" onkeyup="return onlyNum(this);" class="input-medium" id="view_max_speed" />&nbsp;km/h
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_light_downdip">*&nbsp;灯光下倾值</label>
							<div class="controls">
								<input type="text" disabled="disabled" title='灯光下倾值' onkeyup="return onlyNum(this);" class="input-medium" id="view_light_downdip" />&nbsp;
							</div>
						</div>
					</div>
					<div style="float: right;width: 50%;">
						<div class="control-group">
							<label class="control-label" for="view_internal_name">*&nbsp;车型内部名称</label>
							<div class="controls">
								<input type="text" disabled="disabled"  class="input-medium" id="view_internal_name" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_manufacturer">*&nbsp;制造厂</label>
							<div class="controls">
								<input type="text" disabled="disabled" style="width: 220px;" value="比亚迪汽车工业有限公司"  disabled="disabled" class="input-medium" id="view_manufacturer" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_fuel_type">*&nbsp;燃料类型</label>
							<div class="controls">
								<select name="" disabled="disabled" id="view_fuel_type" class="input-medium carType">
									<option value="0" selected="selected">电动</option>
									<option value="1">燃油</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="view_drive_motor_type">*&nbsp;驱动电机类型</label>
							<div class="controls">
								<select name="" disabled="disabled" style="width: 220px;" id="view_drive_motor_type" class="input-medium carType">
									<option>请选择</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="view_drive_motor">*&nbsp;驱动电机</label>
							<div class="controls">
								<input type="text" disabled="disabled" style="width: 220px;" class="input-medium" id="view_drive_motor" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_motor_model">*&nbsp;电机型号</label>
							<div class="controls">
								<input type="text" disabled="disabled" class="input-medium" id="view_motor_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_motor_power">*&nbsp;电机最大功率</label>
							<div class="controls">
								<input type="text" disabled="disabled" onkeyup="return onlyNum(this);"  class="input-medium" id="view_motor_power" />&nbsp;KW
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_battery_model">*&nbsp;电池型号</label>
							<div class="controls">
								<input type="text" disabled="disabled" class="input-medium" id="view_battery_model" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_battery_capacity">*&nbsp;电池容量</label>
							<div class="controls">
								<input type="text" disabled="disabled" onkeyup="return onlyNum(this);" class="input-medium" id="view_battery_capacity" />&nbsp;AH
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_rated_voltage">*&nbsp;额定电压</label>
							<div class="controls">
								<input type="text" disabled="disabled" onkeyup="return onlyNum(this);" class="input-medium" id="view_rated_voltage" />&nbsp;V
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_passanger_num">*&nbsp;乘员数</label>
							<div class="controls">
								<input type="text" disabled="disabled" onkeyup="return onlyNum(this);" class="input-medium" id="view_passanger_num" />&nbsp;人
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="view_spring_num">*&nbsp;弹簧片数</label>
							<div class="controls">
								<input type="text" disabled="disabled" onkeyup="return onlyNum(this);" class="input-medium" id="view_spring_num" />&nbsp;
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			</div>
		</div>
		
	</div>
	</div>
</body>
</html>