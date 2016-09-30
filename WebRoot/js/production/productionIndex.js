var user_staff=null;//add by wuxiao 当前用户员工信息 2016/4/22
$(document).ready(function () {
	initPage();
	
	function initPage(){
		getFactorySelect();
		getUserFactory();		//获取当前用户所属工厂
		user_staff = getStaffInfo1();		//add by wuxiao 获取当前用户员工信息 2016/4/22
		$("#search_factory").attr("disabled","disabled");
		getKeyProcess();	//获取焊装生产节点
	}
	
})

function getKeyProcess(){
	$.ajax({
		url : "production!getKeyProcess.action",
		dataType : "json",
		data : {
			"factory_id":$("#search_factory").val(),
			
		},
		/*async : false,*/
		error : function(response) {
			/*alert(response.message)*/
		},
		success : function(response) {
			var WeldingCountA = 0;var WeldingCountB = 0;
			var FiberglassCountA = 0;
			var PaintingCountA = 0;
			var ChassisCountA = 0;var ChassisCountB = 0;
			var AssemblyCountA = 0;var AssemblyCountB = 0;
			var ShakedowntestCountA = 0;
			var TestlineCountA = 0;
			var WarehouseCountA = 0;
			$.each(response.data, function(index, value) {
				//alert(value.workshop_name);
				if((value.workshop_name == "焊装")&&(value.line == "A线")){
					//node-welding-HA0
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-welding-HA"+WeldingCountA).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('焊装')>=0){
					$("#node-welding-HA"+WeldingCountA).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-welding-HA"+WeldingCountA).attr('title',value.process_name);
					WeldingCountA++;
				}
				if((value.workshop_name == "焊装")&&(value.line == "B线")){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-welding-HB"+WeldingCountB).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('焊装')>=0){
					$("#node-welding-HB"+WeldingCountB).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-welding-HB"+WeldingCountB).attr('title',value.process_name);
					WeldingCountB++;
				}
				if(value.workshop_name == "玻璃钢"){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-fiberglass-HA"+FiberglassCountA).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('玻璃钢')>=0){
					$("#node-fiberglass-HA"+FiberglassCountA).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-fiberglass-HA"+FiberglassCountA).attr('title',value.process_name);
					FiberglassCountA++;
				}
				if((value.workshop_name == "涂装")&&(value.line == "A线")){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-painting-HA"+PaintingCountA).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('涂装')>=0){
					$("#node-painting-HA"+PaintingCountA).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-painting-HA"+PaintingCountA).attr('title',value.process_name);
					PaintingCountA++;
				}
				if((value.workshop_name == "底盘")&&(value.line == "A线")){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-chassis-HA"+ChassisCountA).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('底盘')>=0){
					$("#node-chassis-HA"+ChassisCountA).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-chassis-HA"+ChassisCountA).attr('title',value.process_name);
					ChassisCountA++;
				}
				if((value.workshop_name == "底盘")&&(value.line == "B线")){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-chassis-HB"+ChassisCountB).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('底盘')>=0){
					$("#node-chassis-HB"+ChassisCountB).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-chassis-HB"+ChassisCountB).attr('title',value.process_name);
					ChassisCountB++;
				}
				if((value.workshop_name == "总装")&&(value.line == "A线")){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-assembly-HA"+AssemblyCountA).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('总装')>=0){
					$("#node-assembly-HA"+AssemblyCountA).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-assembly-HA"+AssemblyCountA).attr('title',value.process_name);
					AssemblyCountA++;
				}
				if((value.workshop_name == "总装")&&(value.line == "B线")){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-assembly-HB"+AssemblyCountB).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('总装')>=0){
					$("#node-assembly-HB"+AssemblyCountB).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-assembly-HB"+AssemblyCountB).attr('title',value.process_name);
					AssemblyCountB++;
				}
				if((value.workshop_name == "调试区")&&(value.line == "A线")){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-shakedowntest-HA"+ShakedowntestCountA).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('调试区')>=0){
					$("#node-shakedowntest-HA"+ShakedowntestCountA).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-shakedowntest-HA"+ShakedowntestCountA).attr('title',value.process_name);
					ShakedowntestCountA++;
				}
				if((value.workshop_name == "检测线")&&(value.line == "A线")){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-testline-HA"+TestlineCountA).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('检测线')>=0){
					$("#node-testline-HA"+TestlineCountA).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-testline-HA"+TestlineCountA).attr('title',value.process_name);
					TestlineCountA++;
				}
				if((value.workshop_name == "成品库")&&(value.line == "A线")){
					var key_process_flag = "";
					if(value.key_process_flag=='1')key_process_flag="★";
					$("#node-warehouse-HA"+WarehouseCountA).html('<br/>'+value.process_code+'<span id="star_hb0" style="color:red"><br/><br/>'+ key_process_flag+ '</span>');
					if(user_staff.workshops!=null && user_staff.workshops.indexOf('成品库')>=0){
					$("#node-warehouse-HA"+WarehouseCountA).attr('onclick','').click(eval(function(){window.location.href='production!execution.action?factory_id='+$("#search_factory").val()+'&workshop_id='+value.workshop_id+'&line_id='+value.line_id+'&process_id='+value.id}));
					}
					$("#node-warehouse-HA"+WarehouseCountA).attr('title',value.process_name);
					WarehouseCountA++;
				}
			})
			
		}
	});
}

function getFactorySelect() {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response, "", "#search_factory");
			getWorkshopSelect();
		}
	});
}

function getUserFactory(){
	$.ajax({
		url : "common!getFactoryInfoByUserId.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.data,function (index,value) {
				$("#search_factory").val(value.FACTORY_ID)
			})
			
		}
	});
	
}


