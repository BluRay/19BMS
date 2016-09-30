var ScrollTime;
var boardInfo;
var timeInfo;
var exceptionInfo;
$(document).ready(function() {
	ajaxQueryBoardInfo();
	showClock();
	ajaxQueryExceptionInfo();
	intervalTimeInfo();
	interValBoardInfo();
	intervalExceptionInfo();
});

function interValBoardInfo() {
	// clearInterval(boardInfo);
	boardInfo = setInterval("ajaxQueryBoardInfo()", 1000 * 60);

}
function intervalTimeInfo() {
	// clearInterval(timeInfo);
	timeInfo = setInterval("showClock($(\"#board_time\"))", 1000);
}

function intervalExceptionInfo() {
	exceptionInfo = setInterval("ajaxQueryExceptionInfo()", 1000 * 60 * 5);
}

function ajaxQueryExceptionInfo() {
	$.ajax({
		url : "common!getIndexOrderInfo.action",
		type : "post",
		data : {workshop:"焊装",factoryId:""},
		async : false,
		dataType : "json",
		success : function(response) {
			// 异常模块显示信息
			var exception_info = "";
			$.each(response.exceptionList, function(index, exception) {
				var tmp = exception.bus_number + " " + exception.process + " "
						+ exception.reason + ";";
				exception_info += tmp;
			});
			var info = exception_info;
			if(info.trim().length==0){
				info="暂无异常信息";
			}
			ScrollText($('#board_exception'), 70, 1348, info, 'left', 1, 20);
		}
	})
}

function ajaxQueryBoardInfo() {
	// alert("boardinfo");
	$
			.ajax({
				url : "common!getIndexOrderInfo.action",
				type : "post",
				data : {workshop:"焊装",factoryId:""},
				async : false,
				dataType : "json",
				success : function(response) {
					value = response;
					// dpu
					var dpu_welding, dpu_painting, dpu_bottom, dpu_assembly;
					$.each(response.dupList, function(index, value) {
						if (value.workshop_name == '焊装') {
							dpu_welding = value.dup;
						}
						if (value.workshop_name == '涂装') {
							dpu_painting = value.dup;
						}
						if (value.workshop_name == '底盘') {
							dpu_bottom = value.dup;
						}
						if (value.workshop_name == '总装') {
							dpu_assembly = value.dup;
						}
					});
					$("#dpu_welding").html(dpu_welding);

					// 停线生产信息
					var production_info = "正常生产中";
					$("#production_info").css("color","rgb(58, 158, 33)");
					if (value.pauseList.length > 0) {
						production_info = value.pauseList[0].workshop_name
								+ value.pauseList[0].line + "停线 "
								+ value.pauseList[0].reason;
						$("#production_info").css("color","red");
					}					
					$("#production_info").html(production_info);

					// 一次校检合格率
					var pass_rate_welding, pass_rate_painting, pass_rate_bottom, pass_rate_assembly;
					$.each(response.passRateList, function(index, value) {
						if (value.workshop_name == '焊装') {
							pass_rate_welding = value.pass_rate + "%";
						}
						if (value.workshop_name == '涂装') {
							pass_rate_painting = value.pass_rate + "%";
						}
						if (value.workshop_name == '底盘') {
							pass_rate_bottom = value.pass_rate + "%";
						}
						if (value.workshop_name == '总装') {
							pass_rate_assembly = value.pass_rate + "%";
						}
					});
					$("#rate_welding").html(pass_rate_welding);

					//部件车间结存
					var parts_balance=0;
					if(value.partsBalance.length>0){
						parts_balance=value.partsBalance[0].balance;
					}
					$("#parts_balance").html("(" + parts_balance + ")");
					
					// 生产结存
					var left_welding, left_painting, left_bottom, left_assembly;
					if (value.productionInfo.length > 0) {
						left_welding = value.productionInfo[0].welding_count;
						left_painting = value.productionInfo[0].painting_count;
						left_bottom = value.productionInfo[0].chassis_count;
						left_assembly = value.productionInfo[0].assembly_count;
						left_check= value.productionInfo[0].testline_count;
					}
					$("#welding_left").html(left_welding );
/*					$("#painting_left").html("(" + left_painting + ")");
					$("#bottom_left").html("(" + left_bottom + ")");
					$("#assembly_left").html("(" + left_assembly + ")");
					$("#check_left").html("(" + left_check + ")");*/
					
					// 上线，下线数据
					var online_welding="0";
					var offline_welding="0", offline_fiberglass="0";
					var plan_online_welding="0";
					var plan_offline_welding="0",plan_offline_fiberglass="0";
					
					$.each(response.weldingList, function(index, data) {
						if (data.process_node == '焊装上线') {
							online_welding = data.done_num==undefined?"":data.done_num;
							plan_online_welding= data.plan_total==undefined?"":data.plan_total;;
						}
						if (data.process_node == '焊装下线') {
							offline_welding = data.done_num==undefined?"":data.done_num;
							plan_offline_welding= data.plan_total==undefined?"":data.plan_total;;
						}
					});
					$.each(response.fiberglassList, function(index, data) {
	
						if (data.process_node == '玻璃钢下线') {
							offline_fiberglass = data.done_num==undefined?"":data.done_num;
							plan_offline_fiberglass= data.plan_total==undefined?"":data.plan_total;;
						}
					});
					
					var online_welding_html="<span style=\"color:green;font-size:55px\">"+online_welding+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_online_welding+"</span>";
					var offline_welding_html="<span style=\"color:green;font-size:55px\">"+offline_welding+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_offline_welding+"</span>";								
					var offline_fiberglass_html="<span style=\"color:green;font-size:55px\">"+offline_fiberglass+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_offline_fiberglass+"</span>";
					$("#online_welding").html(online_welding_html);
					$("#offline_welding").html(offline_welding_html);					
					$("#offline_glass").html(offline_fiberglass_html);
				}
				
			});

}

function showClock(clock_div) {
	$
	.ajax({
		url : "common!getWorkshopBoardHeadInfo.action",
		type : "post",
		data : {},
		dataType : "json",
		success : function(response) {
			
			time = response.curTime.replace(new RegExp('-','gm'),'.');
			$(clock_div).html(time);
			$("#board_title").html("焊装车间欢迎您");
		}
	})
	
	//
}
function ScrollAutoPlay(contID, scrolldir, showwidth, textwidth, steper) {
	var PosInit, currPos;
	with ($('#' + contID)) {
		currPos = parseInt(css('margin-left'));
		if (scrolldir == 'left') {
			if (currPos < 0 && Math.abs(currPos) > textwidth) {
				css('margin-left', showwidth);
			} else {
				css('margin-left', currPos - steper);
			}
		} else {
			if (currPos > showwidth) {
				css('margin-left', (0 - textwidth));
			} else {
				css('margin-left', currPos - steper);
			}
		}
	}
}

function ScrollText(AppendToObj, ShowHeight, ShowWidth, ShowText,
		ScrollDirection, Steper, Interval) {
	clearInterval(ScrollTime);
	// alert(ShowText);
	var TextWidth, PosInit, PosSteper;
	with (AppendToObj) {
		html('');
		css('overflow', 'hidden');
		css('height', ShowHeight + 'px');
		css('line-height', ShowHeight + 'px');
		css('width', ShowWidth);
	}
	if (ScrollDirection == 'left') {
		PosInit = ShowWidth;
		PosSteper = Steper;
	} else {
		PosSteper = 0 - Steper;
	}
	if (Steper < 1 || Steper > ShowWidth) {
		Steper = 1
	}// 每次移动间距超出限制(单位:px)
	if (Interval < 1) {
		Interval = 10
	}// 每次移动的时间间隔(单位：毫秒)
	var Container = $('<div></div>');
	var ContainerID = 'ContainerTemp';
	var i = 0;
	while ($('#' + ContainerID).length > 0) {
		ContainerID = ContainerID + '_' + i;
		i++;
	}
	with (Container) {
		attr('id', ContainerID);
		css('float', 'left');
		css('cursor', 'default');
		appendTo(AppendToObj);
		html(ShowText);
		TextWidth = width();
		if (isNaN(PosInit)) {
			PosInit = 0 - TextWidth;
		}
		css('margin-left', PosInit);
		mouseover(function() {
			clearInterval(ScrollTime);
		});
		mouseout(function() {
			ScrollTime = setInterval("ScrollAutoPlay('" + ContainerID + "','"
					+ ScrollDirection + "'," + ShowWidth + ',' + TextWidth
					+ "," + PosSteper + ")", Interval);
		});
	}
	ScrollTime = setInterval("ScrollAutoPlay('" + ContainerID + "','"
			+ ScrollDirection + "'," + ShowWidth + ',' + TextWidth + ","
			+ PosSteper + ")", Interval);
}
