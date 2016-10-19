var ScrollTime;
var boardInfo;
var timeInfo;
var exceptionInfo;
var factory_p;
$(document).ready(function() {
	factory_p=getQueryString("factory")||"";
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
	//alert(factory_p)
	$.ajax({
		url : "common!getIndexOrderInfo.action",
		type : "post",
		data : {'factory_id':factory_p},
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
				data : {'factory_id':factory_p},
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
					$("#dpu_painting").html(dpu_painting);
					$("#dpu_bottom").html(dpu_bottom);
					$("#dpu_assembly").html(dpu_assembly);

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
					$("#rate_painting").html(pass_rate_painting);
					$("#rate_bottom").html(pass_rate_bottom);
					$("#rate_assembly").html(pass_rate_assembly);

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
					$("#welding_left").html("(" + left_welding + ")");
					$("#painting_left").html("(" + left_painting + ")");
					$("#bottom_left").html("(" + left_bottom + ")");
					$("#assembly_left").html("(" + left_assembly + ")");
					$("#check_left").html("(" + left_check + ")");
					
					// 上线，下线数据
					var online_welding="0", online_painting="0", online_bottom="0", online_assembly="0",online_testline="0";
					var offline_welding="0", offline_painting="0", offline_bottom="0", offline_assembly="0",offline_testline="0";
					var plan_online_welding="0",plan_online_painting="0",plan_online_bottom="0",plan_online_assembly="0";
					var plan_offline_welding="0",plan_offline_painting="0",plan_offline_bottom="0",plan_offline_assembly="0";
					
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
					$.each(response.paintingList, function(index, data) {
						if (data.process_node == '涂装上线') {
							online_painting = data.done_num==undefined?"":data.done_num;
							plan_online_painting= data.plan_total==undefined?"":data.plan_total;;
						}
						if (data.process_node == '涂装下线') {
							offline_painting = data.done_num==undefined?"":data.done_num;
							plan_offline_painting= data.plan_total==undefined?"":data.plan_total;;
						}
					});
					$.each(response.bottomList, function(index, data) {
						if (data.process_node == '底盘上线') {
							online_bottom = data.done_num==undefined?"":data.done_num;
							plan_online_bottom=data.plan_total==undefined?"":data.plan_total;;
						}
						if (data.process_node == '底盘下线') {
							offline_bottom = data.done_num==undefined?"":data.done_num;
							plan_offline_bottom=data.plan_total==undefined?"":data.plan_total;;
						}
					});
					$.each(response.assemblyList, function(index, data) {
						if (data.process_node == '总装上线') {
							online_assembly = data.done_num==undefined?"":data.done_num;
							plan_online_assembly=data.plan_total==undefined?"":data.plan_total;;
						}
						if (data.process_node == '总装下线') {
							offline_assembly = data.done_num==undefined?"":data.done_num;
							plan_offline_assembly=data.plan_total==undefined?"":data.plan_total;
						}
					});
					$.each(response.testlineList, function(index, data) {
						if (data.process_node == '检测线上线') {
							online_testline = data.done_num==undefined?"":data.done_num;
						}
						if (data.process_node == '检测线下线') {
							offline_testline = data.done_num==undefined?"":data.done_num;
						}
					});
					var online_welding_html="<span style=\"color:green;font-size:55px\">"+online_welding+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_online_welding+"</span>";
					var offline_welding_html="<span style=\"color:green;font-size:55px\">"+offline_welding+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_offline_welding+"</span>";
					var online_painting_html="<span style=\"color:green;font-size:55px\">"+online_painting+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_online_painting+"</span>";
					var offline_painting_html="<span style=\"color:green;font-size:55px\">"+offline_painting+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_offline_painting+"</span>";
					var online_bottom_html="<span style=\"color:green;font-size:55px\">"+online_bottom+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_online_bottom+"</span>";
					var offline_bottom_html="<span style=\"color:green;font-size:55px\">"+offline_bottom+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_offline_bottom+"</span>";
					var online_assembly_html="<span style=\"color:green;font-size:55px\">"+online_assembly+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_online_assembly+"</span>";
					var offline_assembly_html="<span style=\"color:green;font-size:55px\">"+offline_assembly+"</span>/<span style=\"color:blue;font-size:55px\">"+plan_offline_assembly+"</span>";
					$("#online_welding").html(online_welding_html);
					$("#offline_welding").html(offline_welding_html);
					$("#online_painting").html(online_painting_html);
					$("#offline_painting").html(offline_painting_html);
					$("#online_bottom").html(online_bottom_html);
					$("#offline_bottom").html(offline_bottom_html);
					$("#online_assembly").html(online_assembly_html);
					$("#offline_assembly").html(offline_assembly_html);
					$("#online_testline").html(online_testline);
					$("#offline_testline").html(offline_testline);
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
			$("#board_title").html(response.factory+"欢迎您");
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
