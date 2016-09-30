var pageSize = 10;
$(document).ready(
		function() {
			initPage();
			$("#btnQuery").live("click", function() {
				ajaxQuery(1);
			});
			// 点击新增
			$("#btnAdd").click(function(argument) {
				$("#newModal").modal("show");
				getNewVehicleTypeSelect();
				getNewBodyTypeSelect();
				getNewDriveMotorTypeSelect();
				$("#new_bus_type_code").focus();
			});
			// 确定新增
			$("#btnAddConfirm").click(function() {
				if ($("#new_bus_type_code").val() == '') {
					alert('车型编号不能为空');
					return false;
				}
				if ($("#new_brand").val() == '') {
					alert('品牌不能为空');
					return false;
				}
				if ($("#new_vehicle_type").val() == '') {
					alert('车辆类型不能为空');
					return false;
				}
				if ($("#new_body_type").val() == '') {
					alert('车身类型不能为空');
					return false;
				}
				if ($("#new_vehicle_model").val() == '') {
					alert('车辆型号不能为空');
					return false;
				}
				if ($("#new_chassis_model").val() == '') {
					alert('底盘型号不能为空');
					return false;
				}
				if ($("#new_vehicle_length").val() == '') {
					alert('车辆长度不能为空');
					return false;
				}				
				if ($("#new_wheelbase").val() == '') {
					alert('轴距不能为空');
					return false;
				}
				if ($("#new_max_weight").val() == '') {
					alert('最大允许质量不能为空');
					return false;
				}
				if ($("#new_passengers").val() == '') {
					alert('额定载客人数不能为空');
					return false;
				}		
				if ($("#new_internal_name").val() == '') {
					alert('车型内部名称不能为空');
					return false;
				}
				if ($("#new_drive_motor_type").val() == '') {
					alert('驱动电机类型不能为空');
					return false;
				}
				if ($("#new_drive_motor").val() == '') {
					alert('驱动电机不能为空');
					return false;
				}
				if ($("#new_motor_model").val() == '') {
					alert('电机型号不能为空');
					return false;
				}
				if ($("#new_motor_power").val() == '') {
					alert('电机最大功率不能为空');
					return false;
				}
				if ($("#new_battery_model").val() == '') {
					alert('电池型号不能为空');
					return false;
				}
				if ($("#new_battery_capacity").val() == '') {
					alert('电池容量不能为空');
					return false;
				}				
				if ($("#new_rated_voltage").val() == '') {
					alert('额定电压不能为空');
					return false;
				}
				
				ajaxAdd();				
				return false;
			});
			// 删除
			$("#btnDelete").live("click", function() {
				if (confirm("是否确定删除！")) {
					ajaxDelete();
				}
			});
			$("#tableBusType").live(
					"click",
					function(e) {
						//alert($(e.target).html());
						if ($(e.target).attr("name") === "view") {
							var tr = $(e.target).closest("tr");
							$("#view_bus_type_code").val(tr.data("busTypeCode"));
							$("#view_internal_name").val(tr.data("internalName"));
							$("#view_brand").val(tr.data("brand"));
							$("#view_manufacturer").val(tr.data("manufacturer"));
							getViewVehicleTypeSelect();
							$("#view_vehicle_type").val(tr.data("busVehicleTypeId"));
							//$("#view_factory").val(tr.data("busVehicleTypeName"));
							getViewBodyTypeSelect();
							$("#view_body_type").val(tr.data("busBodyTypeId"));
							//$("#view_factory").val(tr.data("busBodyTypeName"));
							$("#view_vehicle_model").val(tr.data("vehicleModel"));
							$("#view_chassis_model").val(tr.data("chassisModel"));
							$("#view_vehicle_length").val(tr.data("vehicleLength"));
							$("#view_wheelbase").val(tr.data("wheelbase"));
							$("#view_max_weight").val(tr.data("maxWeight"));
							$("#view_passengers").val(tr.data("passengers"));
							$("#view_fuel_type").val(tr.data("fuelType"));
							getViewDriveMotorTypeSelect();
							$("#view_drive_motor_type").val(tr.data("driveMotorTypeId"));
						//	$("#view_factory").val(tr.data("driveMotorTypeName"));
							$("#view_drive_motor").val(tr.data("driveMotor"));
							$("#view_motor_model").val(tr.data("motorModel"));
							$("#view_motor_power").val(tr.data("motorPower"));
							$("#view_battery_model").val(tr.data("batteryModel"));
							$("#view_battery_capacity").val(tr.data("batteryCapacity"));
							$("#view_rated_voltage").val(tr.data("ratedVoltage"));
							$("#view_vin_prefix").val(tr.data("vinPrefix"));
							$("#view_passanger_num").val(tr.data("passengerNum")),
							$("#view_spring_num").val(tr.data("springNum")),
							$("#view_light_downdip").val(tr.data("lightDowndip")),
							$("#view_max_speed").val(tr.data("maxSpeed"));
							$("#viewModal").data("id",
									$(e.target).closest("tr").data("id"));
							if ($("#viewModal").data(
									"using"
											+ $(e.target).closest("tr").data(
													"id")) == 1) {
								$('#checkboxviewStartUsing').attr("checked",
										"checked");
								// console.log($("#viewModal").data("using"+$(e.target).closest("tr").data("id")));
							} else {
								$('#checkboxviewStartUsing').attr("checked",
										false);
							}

							$("#viewModal").modal("show");
						}
			});
			// 弹出编辑框
			$("#tableBusType").live(
					"click",
					function(e) {
						//alert($(e.target).html());
						if ($(e.target).attr("name") === "edit") {
							//alert("编辑");
							var siblings = $(e.target).parent("td").siblings();
							var tr = $(e.target).closest("tr");
							
							$("#edit_bus_type_code").val(tr.data("busTypeCode"));
							$("#edit_internal_name").val(tr.data("internalName"));
							$("#edit_brand").val(tr.data("brand"));
							$("#edit_manufacturer").val(tr.data("manufacturer"));
							getEditVehicleTypeSelect();
							$("#edit_vehicle_type").val(tr.data("busVehicleTypeId"));
							//$("#edit_factory").val(tr.data("busVehicleTypeName"));
							getEditBodyTypeSelect();
							$("#edit_body_type").val(tr.data("busBodyTypeId"));
							//$("#edit_factory").val(tr.data("busBodyTypeName"));
							$("#edit_vehicle_model").val(tr.data("vehicleModel"));
							$("#edit_chassis_model").val(tr.data("chassisModel"));
							$("#edit_vehicle_length").val(tr.data("vehicleLength"));
							$("#edit_wheelbase").val(tr.data("wheelbase"));
							$("#edit_max_weight").val(tr.data("maxWeight"));
							$("#edit_passengers").val(tr.data("passengers"));
							$("#edit_fuel_type").val(tr.data("fuelType"));
							getEditDriveMotorTypeSelect();
							$("#edit_drive_motor_type").val(tr.data("driveMotorTypeId"));
						//	$("#edit_factory").val(tr.data("driveMotorTypeName"));
							$("#edit_drive_motor").val(tr.data("driveMotor"));
							$("#edit_motor_model").val(tr.data("motorModel"));
							$("#edit_motor_power").val(tr.data("motorPower"));
							$("#edit_battery_model").val(tr.data("batteryModel"));
							$("#edit_battery_capacity").val(tr.data("batteryCapacity"));
							$("#edit_rated_voltage").val(tr.data("ratedVoltage"));
							$("#edit_vin_prefix").val(tr.data("vinPrefix"));
							$("#edit_passanger_num").val(tr.data("passengerNum")),
							$("#edit_spring_num").val(tr.data("springNum")),
							$("#edit_light_downdip").val(tr.data("lightDowndip")),
							$("#edit_max_speed").val(tr.data("maxSpeed"));
							
							$("#editModal").data("id",
									$(e.target).closest("tr").data("id"));
							if ($("#editModal").data(
									"using"
											+ $(e.target).closest("tr").data(
													"id")) == 1) {
								$('#checkboxEditStartUsing').attr("checked",
										"checked");
								// console.log($("#editModal").data("using"+$(e.target).closest("tr").data("id")));
							} else {
								$('#checkboxEditStartUsing').attr("checked",
										false);
							}
							$("#editModal").modal("show");
						}
					}
				);
			// 编辑
			$("#btnEditConfirm").live("click", function() {
				if ($("#edit_bus_type_code").val() == '') {
					alert('车型编号不能为空');
					return false;
				}
				if ($("#edit_brand").val() == '') {
					alert('品牌不能为空');
					return false;
				}
				if ($("#edit_vehicle_type").val() == '') {
					alert('车辆类型不能为空');
					return false;
				}
				if ($("#edit_body_type").val() == '') {
					alert('车身类型不能为空');
					return false;
				}
				if ($("#edit_vehicle_model").val() == '') {
					alert('车辆型号不能为空');
					return false;
				}
				if ($("#edit_chassis_model").val() == '') {
					alert('底盘型号不能为空');
					return false;
				}
				if ($("#edit_vehicle_length").val() == '') {
					alert('车辆长度不能为空');
					return false;
				}				
				if ($("#edit_wheelbase").val() == '') {
					alert('轴距不能为空');
					return false;
				}
				if ($("#edit_max_weight").val() == '') {
					alert('最大允许质量不能为空');
					return false;
				}
				if ($("#edit_passengers").val() == '') {
					alert('额定载客人数不能为空');
					return false;
				}
				
				
				if ($("#edit_internal_name").val() == '') {
					alert('车型内部名称不能为空');
					return false;
				}
				if ($("#edit_drive_motor_type").val() == '') {
					alert('驱动电机类型不能为空');
					return false;
				}
				if ($("#edit_drive_motor").val() == '') {
					alert('驱动电机不能为空');
					return false;
				}
				if ($("#edit_motor_model").val() == '') {
					alert('电机型号不能为空');
					return false;
				}
				if ($("#edit_motor_power").val() == '') {
					alert('电机最大功率不能为空');
					return false;
				}
				if ($("#edit_battery_model").val() == '') {
					alert('电池型号不能为空');
					return false;
				}
				if ($("#edit_battery_capacity").val() == '') {
					alert('电池容量不能为空');
					return false;
				}				
				if ($("#edit_rated_voltage").val() == '') {
					alert('额定电压不能为空');
					return false;
				}
				ajaxEdit($("#editModal").data("id"));
			});
			$("#btnClose").live("click", function() {
				emptyNewModal();
			});
			// 全选、反选
			$("#checkall").live("click", function() {
				// alert($("#checkall").attr("checked"));
				if ($("#checkall").attr("checked") == "checked") {
					check_All_unAll("#tableBusType", true);
				} else {
					check_All_unAll("#tableBusType", false);
				}

			});
			$("#seach_factory").change(function(){
				$("#seach_workshop").empty();
				$("#seach_line").empty();
				if($("#seach_factory").val()!=''){
					getAllWorkshopSelect();
					$("#seach_line").append("<option value=''>全部</option>");
				}else{
					$("#seach_workshop").append("<option value=''>全部</option>");
					$("#seach_line").append("<option value=''>全部</option>");
				}
			});
			$("#seach_workshop").change(function(){
				$("#seach_line").empty();
				if($("#seach_workshop").val()!=''){
					getAllLineSelect();
				}else{
					$("#seach_line").append("<option value=''>全部</option>");
				}
			});			
			$("#new_factory").change(function(){ 
				$("#new_workshop").empty();
				$("#new_line").empty();
				if($("#new_factory").val()!=''){
					getNewWorkshopSelect();
				}
			});
			$("#new_workshop").change(function(){ 
				$("#new_line").empty();
				if($("#new_workshop").val()!=''){
					getNewLineSelect();
				}
			});

		})
// 查询车间列表
function ajaxQuery(targetPage) {
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "busType!showBusTypeList.action",
		data : {
			"seach_vehicle_type" : $('#seach_vehicle_type').val(),
			"seach_busTypeCode" : $('#seach_busTypeCode').val(),
			"seach_internalName" : $('#seach_internalName').val(),
			"pager.pageSize" : pageSize,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableBusType tbody").html("");
			$.each(response.busTypeList, function(busType, value) {
				var tr = $("<tr />");
				$("<td />").html(value.busTypeCode).appendTo(tr);
				$("<td />").html(value.internalName).appendTo(tr);
				//$("<td />").html(value.brand).appendTo(tr);
				//$("<td />").html(value.wmi).appendTo(tr);
				//$("<td />").html(value.manufacturer).appendTo(tr);
				//$("<td />").html(value.vehicleType).appendTo(tr);
				$("<td />").html(value.vehicleModel).appendTo(tr);
				$("<td />").html(value.chassisModel).appendTo(tr);
				$("<td />").html(value.vehicleLength).appendTo(tr);
				$("<td />").html(value.wheelbase).appendTo(tr);
				$("<td />").html(value.maxWeight).appendTo(tr);
				//$("<td />").html(value.passengers).appendTo(tr);
				//$("<td />").html(value.fuelType).appendTo(tr);
				//$("<td />").html(value.driveMotorType).appendTo(tr);
				$("<td />").html(value.motorModel).appendTo(tr);
				//$("<td />").html(value.motorPower).appendTo(tr);
				$("<td />").html(value.batteryModel).appendTo(tr);
			//	$("<td />").html(value.batteryCapacity).appendTo(tr);
				//$("<td />").html(value.ratedVoltage).appendTo(tr);
				$("<td />").html(value.vinPrefix).appendTo(tr);
				$("<td />").html(value.editor).appendTo(tr);
				//$("<td />").html(value.editDate).appendTo(tr);
				/*var editTd = $("<td />").html("");
				$("<button />").addClass("btn-link").html("编辑").prependTo(
						editTd);*/
				var viewTd = $("<td />").html("<i name='view' class=\"fa fa-search\" style=\"cursor: pointer\"></i>");
				viewTd.appendTo(tr);
				var editTd = $("<td />").html("<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>");
				// $("<button
				// />").addClass("btn-link").html("删除").appendTo(editTd);
				editTd.appendTo(tr);
				tr.data("id", value.id);
				tr.data("busTypeCode", value.busTypeCode);
				tr.data("internalName", value.internalName);
				tr.data("brand", value.brand);
				tr.data("wmi", value.wmi);
				tr.data("manufacturer", value.manufacturer);
				tr.data("busVehicleTypeId", value.busVehicleTypeId);
				tr.data("busVehicleTypeName", value.busVehicleTypeName);
				tr.data("busBodyTypeId", value.busBodyTypeId);
				tr.data("busBodyTypeName", value.busBodyTypeName);
				tr.data("vehicleModel", value.vehicleModel);
				tr.data("chassisModel", value.chassisModel);
				tr.data("vehicleLength", value.vehicleLength);
				tr.data("wheelbase", value.wheelbase);
				tr.data("maxWeight", value.maxWeight);
				tr.data("passengers", value.passengers);
				tr.data("fuelType", value.fuelType);
				tr.data("driveMotorTypeId", value.driveMotorTypeId);
				tr.data("driveMotorTypeName", value.driveMotorTypeName);
				tr.data("driveMotor", value.driveMotor);
				tr.data("motorModel", value.motorModel);
				tr.data("motorPower", value.motorPower);
				tr.data("batteryModel", value.batteryModel);
				tr.data("batteryCapacity", value.batteryCapacity);
				tr.data("ratedVoltage", value.ratedVoltage);
				tr.data("vinPrefix", value.vinPrefix);
				tr.data("editor", value.editor);
				tr.data("editDate", value.editDate);
				tr.data("passengerNum",value.passengerNum);
				tr.data("lightDowndip",value.lightDowndip);
				tr.data("maxSpeed",value.maxSpeed);
				tr.data("springNum",value.springNum);
				$("#tableBusType tbody").append(tr);
			});
			$("#tableBusType").show();
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html("<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
			$("#checkall").attr("checked",false);
		}
	});
}
function initPage() {
	$("#input_busTypeCode").addClass("active");
	getSeachVehicleTypeSelect();
}

// 新增工序 ajax方法
function ajaxAdd() {
	$.ajax({
		type : "get",
		dataType : "json",
		url : "busType!addBusType.action",
		data : {
			"busTypeCode" : $("#new_bus_type_code").val(),
			"internalName" : $("#new_internal_name").val(),
			"brand" : $("#new_brand").val(),
			"manufacturer" : $("#new_manufacturer").val(),
			"busVehicleTypeId" : $("#new_vehicle_type").val(),
			"busBodyTypeId" : $("#new_body_type").val(),
			"vehicleModel" : $("#new_vehicle_model").val(),
			"chassisModel" : $("#new_chassis_model").val(),
			"vehicleLength" : $("#new_vehicle_length").val(),
			"wheelbase" : $("#new_wheelbase").val(),
			"maxWeight" : $("#new_max_weight").val(),
			"passengers" : $("#new_passengers").val(),
			"fuelType" : $("#new_fuel_type").val(),
			"driveMotorTypeId" : $("#new_drive_motor_type").val(),
			"driveMotor" : $("#new_drive_motor").val(),
			"motorModel" : $("#new_motor_model").val(),
			"motorPower" : $("#new_motor_power").val(),
			"batteryModel" : $("#new_battery_model").val(),
			"batteryCapacity" : $("#new_battery_capacity").val(),
			"ratedVoltage" : $("#new_rated_voltage").val(),
			"vinPrefix" : $("#new_vin_prefix").val(),
			"passengerNum":$("#new_passanger_num").val(),
			"springNum":$("#new_spring_num").val(),
			"lightDowndip":$("#new_light_downdip").val(),
			"maxSpeed":$("#new_max_speed").val()
		},
		success : function(response) {
				if(!response.success){
					alert(response.message)
				}else{
					alert("新增成功！");
					ajaxQuery(1);
					emptyNewModal();
				}	
		},
		error : function(response) {
			alert(response.message)
		}
	})
}
// 函数：编辑操作

function ajaxEdit(id) {
	$.ajax({
		type : "get",
		dataType : "json",
		url : "busType!editBusType.action",
		data : {
			"id":id,
			"busTypeCode" : $("#edit_bus_type_code").val(),
			"internalName" : $("#edit_internal_name").val(),
			"brand" : $("#edit_brand").val(),
			"manufacturer" : $("#edit_manufacturer").val(),
			"busVehicleTypeId" : $("#edit_vehicle_type").val(),
			"busBodyTypeId" : $("#edit_body_type").val(),
			"vehicleModel" : $("#edit_vehicle_model").val(),
			"chassisModel" : $("#edit_chassis_model").val(),
			"vehicleLength" : $("#edit_vehicle_length").val(),
			"wheelbase" : $("#edit_wheelbase").val(),
			"maxWeight" : $("#edit_max_weight").val(),
			"passengers" : $("#edit_passengers").val(),
			"fuelType" : $("#edit_fuel_type").val(),
			"driveMotorTypeId" : $("#edit_drive_motor_type").val(),
			"driveMotor" : $("#edit_drive_motor").val(),
			"motorModel" : $("#edit_motor_model").val(),
			"motorPower" : $("#edit_motor_power").val(),
			"batteryModel" : $("#edit_battery_model").val(),
			"batteryCapacity" : $("#edit_battery_capacity").val(),
			"ratedVoltage" : $("#edit_rated_voltage").val(),
			"vinPrefix" : $("#edit_vin_prefix").val(),
			"passengerNum":$("#edit_passanger_num").val(),
			"springNum":$("#edit_spring_num").val(),
			"lightDowndip":$("#edit_light_downdip").val(),
			"maxSpeed":$("#edit_max_speed").val()
		},
		success : function(response) {
			alert("修改成功！");
			ajaxQuery($(".curPage").attr("page"));
			emptyEditModel();
		},
		error : function() {
			alertError();
		}
	})
}
// 函数：删除操作
function ajaxDelete() {
	var idlist="";
	var cboxlist=$("#tableProcess tbody :checked");
	//alert(cboxlist.length);
	$.each(cboxlist,function(index,cbox){
		idlist+=$(cbox).closest("tr").data("id")+",";		
	});
	idlist=idlist.substring(0,idlist.length-1);
	//alert(idlist);
	$.ajax({
		type : "get",
		dataType : "json",
		url : "process!deleteProcess.action",
		data : {
			"idlist" : idlist
		},
		success : function(response) {
			alert("删除成功！");
			ajaxQuery($(".curPage").attr("page"));
		},
		error : function() {
			alertError();
		}

	});
}

function emptyNewModal() {
	$("#new_bus_type_code").val("");
	$("#new_vehicle_type").val("");
	$("#new_body_type").val("") ;
	$("#new_vehicle_model").val("") ;

	$("#new_chassis_model").val("");
	$("#new_vehicle_length").val("");			
	$("#new_wheelbase").val("") ;
	$("#new_max_weight").val("") ;
	$("#new_passengers").val("") ;
	$("#new_internal_name").val("") ;
	$("#new_drive_motor_type").val("") ;
	$("#new_drive_motor").val("") ;
	$("#new_motor_model").val("");
	$("#new_motor_power").val("");
	$("#new_battery_model").val("");
	$("#new_fuel_type").val(0);
	$("#new_battery_capacity").val("");
	$("#new_rated_voltage").val("");
	$("#new_passanger_num").val(""),
	$("#new_spring_num").val(""),
	$("#new_light_downdip").val(""),
	$("#new_max_speed").val("")
	$("#newModal").modal("hide");
}
function emptyEditModel(){
	$("#edit_factory").val("");
	$("#edit_workshop").val("");
	$("#edit_line").val("");
	$("#edit_process_code").val("");
	$("#edit_process_name").val("");
	$("#edit_plan_node").val("");
	$("#edit_monitory_point_flag").val("");
	$("#edit_key_process_flag").val("");
	$("#edit_memo").val("");
	$("#editModal").modal("hide");
}
function getSeachVehicleTypeSelect(){
	getKeysSelect("BUS_VEHICLE_TYPE", "", "#seach_vehicle_type"); 
}

function getNewVehicleTypeSelect(){
	getKeysSelect("BUS_VEHICLE_TYPE", "", "#new_vehicle_type"); 
}
function getNewBodyTypeSelect(){
	getKeysSelect("BUS_BODY_TYPE", "", "#new_body_type"); 
}
function getNewDriveMotorTypeSelect(){
	getKeysSelect("DRIVE_MOTOR_TYPE", "", "#new_drive_motor_type"); 
}

function getEditVehicleTypeSelect(){
	getKeysSelect("BUS_VEHICLE_TYPE", "", "#edit_vehicle_type"); 
}
function getEditBodyTypeSelect(){
	getKeysSelect("BUS_BODY_TYPE", "", "#edit_body_type"); 
}
function getEditDriveMotorTypeSelect(){
	getKeysSelect("DRIVE_MOTOR_TYPE", "", "#edit_drive_motor_type"); 
}

function getViewVehicleTypeSelect(){
	getKeysSelect("BUS_VEHICLE_TYPE", "", "#view_vehicle_type"); 
}
function getViewBodyTypeSelect(){
	getKeysSelect("BUS_BODY_TYPE", "", "#view_body_type"); 
}
function getViewDriveMotorTypeSelect(){
	getKeysSelect("DRIVE_MOTOR_TYPE", "", "#view_drive_motor_type"); 
}

function getEditPlanCodeSelect(){
	$("#edit_plan_node").empty();
	getKeysSelect("PLAN_CODE", "", "#edit_plan_node");
}

function onlyNum(e){
	if(isNaN($(e).val())){
		alert('只能输入数字');
		$(e).val("");	
		$(e).focus();	
	}
	return;
}
