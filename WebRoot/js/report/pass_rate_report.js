$(document).ready(function() {
	initPage();
	// 切换工厂获取车间
	$("#q_factory").change(function() {
		getWorkshopSelect("#q_workshop", "", $(this).val(), "noall")
	});
	// 查询
	$("#btnQuery").click(function() {
		ajaxQuery(1);
		
	});
})
function initPage() {
	pageSize=20;
	var factory_self = $("#factory_self").val();
	var department_self = $("#department_self").val()==""?"焊装":$("#department_self").val();
	var factory_id_self = $("#factory_id_self").val();
	getAuthorityFactorySelect("#q_factory", factory_self, "noall");
	getWorkshopSelect("#q_workshop", department_self, factory_id_self, "noall");
	var cdate=getCurDate();
	var cfirst_date=getFirstDayOfMonth(cdate);
	$("#q_date_start").val(cfirst_date);
	$("#q_date_end").val(cdate);
	ajaxQuery(1);
}
function ajaxQuery(targetPage) {
	var factory=$("#q_factory").val();
	var workshop=$("#q_workshop").val();
	var workshopName=$("#q_workshop :selected").text();
	var startDate=$("#q_date_start").val();
	var endDate=$("#q_date_end").val();
	var queryItem=$("#q_item").val();
	if(endDate.trim().length==0){
		endDate=getCurDate();
	}
	if(factory.trim().length==0){
		alert("请选择工厂！");
	}else if(workshop.trim().length==0){
		alert("请选择车间！");
	}else if(startDate.trim().length==0){
		alert("请输入开始日期！");
	}else{
	var conditions = "{factoryId:'" + factory + "',workshopId:'" + workshop+"',workshopName:'"+workshopName+
	"',queryItem:'"+ queryItem+ "',startDate:'" + startDate + "',endDate:'"+endDate+ "'}";
	$.ajax({
		url : "qualityReport!getPassRateReportData.action",
		type : "post",
		dataType : "json",
		data : {
			"conditions" : conditions,
			"pager.pageSize" : 20,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			if(response.chartList.length==0){
				alert("未查询到结果！");
			}else{
				generateChart(response.chartList,response.itemList,queryItem);
				generateTable(response.detailList,response.pager);
			}
		}/*,
		error : function(response) {
			alert("系统异常！");
		}*/
	});
	}
}
function generateChart(chartList,itemList,queryItem){
	var pass_rate = new Array();
	var categories=new Array();
	var targetVal=0;
	var maxVal=100;
	var linedata=new Array();
	if(itemList==undefined){
		itemList=new Array();
	}
	if(itemList.length>0){
		$.each(itemList,function(index,item){
			pass_rate[item]=null;
			if(queryItem=='week'){
				categories[index]="第"+item+"周";
			}
			if(queryItem=='month'){
				categories[index]=item+"月";
			}
			if(queryItem=='day'){
				categories[index]=item;
			}
		});
	}
	targetVal=chartList[0].target_val==undefined?'0':chartList[0].target_val;
	targetVal=Number(targetVal.replace("%",""));
	$.each(chartList,function(index,data){		
/*		itemList.push(data.c_order);*/
		var busTotal=isNaN(parseInt(data.bus_total))?0:parseInt(data.bus_total);
		var bugOkNum=isNaN(parseInt(data.bus_ok_num))?0:parseInt(data.bus_ok_num);		
		if(queryItem=='order'){
			categories[index]=data.item;
			pass_rate[data.item]=Number((bugOkNum/busTotal*100).toFixed(2));
		}/*else if(queryItem=='day'){
			pass_rate[data.item]=Number((bugOkNum/busTotal*100).toFixed(2));
		}*/else{
			pass_rate[data.item]=Number((bugOkNum/busTotal*100).toFixed(2));
		}

	});
	
	var title_line = "一次校检合格率趋势图";	
	var xAxis_line = {
			categories : categories,
			labels: {
                autoRotationLimit: 80
            }
		};
	var fn_formatter_line = function(obj) {
		var s = "";
		s = obj.x + ": " + obj.y +"%";
		return s;
	}
	var yAxis_line = {
			title : {
				text : ''
			},
			labels:{
				format: '{value} %'
			},
			max:maxVal,
			plotLines : [ { //一条延伸到整个绘图区的线，标志着轴中一个特定值。
				color : 'red',
				dashStyle : 'Dash', //Dash,Dot,Solid,默认Solid
				width : 1.5,
				value : targetVal, //y轴显示位置
				zIndex : 0,
				label : {
					text : '目标值：'+targetVal+"%", //标签的内容
					align : 'left', //标签的水平位置，水平居左,默认是水平居中center
					x : 10
				//标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
				}
			} ]
		};

	for (value in pass_rate)
	{
		linedata.push(pass_rate[value]);
	}
	var series_line = [];
	var l_obj = {
			type : 'line',
			name : '一次校检合格率',
			data : linedata,
			marker : {
				lineWidth : 2,
				lineColor : Highcharts.getOptions().colors[3],
				fillColor : 'white'
			},
			dataLabels : {
				enabled : true,
				formatter : function(obj) {
					return this.y +"%";
				},
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	series_line.push(l_obj);
	
	drowCharts("#chartsContainer", title_line, xAxis_line,
			fn_formatter_line, series_line, yAxis_line);
}
function generateTable(detailList,pager){
	$("#tableContainer").css("display", "none");
	$("#tableContainer tbody").html("");// 清空表格
	$("#pagination").hide();
	$.each(detailList,function(index,value){
		var busNumber=value.bus_number==undefined?"":value.bus_number;
		var tester=value.tester==undefined?"":value.tester;
		var qe=value.qe==undefined?"":value.qe;
		var factory=value.factory_name==undefined?"":value.factory_name;
		var workshop=value.workshop_name==undefined?"":value.workshop_name;
		var editdate=value.edit_date==undefined?"":value.edit_date;
		var tr=$("<tr />");
		$("<td />").html(busNumber).appendTo(tr);
		$("<td />").html(factory).appendTo(tr);
		$("<td />").html(workshop).appendTo(tr);
		$("<td />").html(tester).appendTo(tr);
		$("<td />").html(qe).appendTo(tr);
		$("<td />").html(editdate).appendTo(tr);
		$("#tableContainer tbody").append(tr);
		$("#tableContainer").css("display", "");
		$("#total").html(pager.totalCount);
		$("#total").attr("total", pager.totalCount);
		$("#cur").attr("page", pager.curPage);
		$("#cur").html(
				"<a href=\"#\">" + pager.curPage + "</a>");
		$("#pagination").show();
	});
}