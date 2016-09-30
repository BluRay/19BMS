$(document).ready(function(){
	initPage();
	// 查询
	$("#btnQuery").click(function() {
		 ajaxQuery(1);
	});
})
//初始化页面
function initPage(){
	pageSize=20;
	var factory_self = $("#factory_self").val();
	var department_self = $("#department_self").val()==""?"焊装":$("#department_self").val();
	var factory_id_self = $("#factory_id_self").val();
	//获取用户权限工厂下拉列表
	getAuthorityFactorySelect("#q_factory", factory_self, "noall");
	//获取用户权限车间下拉列表
	getWorkshopSelect("#q_workshop", department_self, factory_id_self, "noall");
	//初始化起始日期，默认本月1号到当天
	var cdate=getCurDate();
	var cfirst_date=getFirstDayOfMonth(cdate);
	$("#q_date_start").val(cfirst_date);
	$("#q_date_end").val(cdate);
	ajaxQuery(1);
}
//报表数据查询
function ajaxQuery(targetPage){
	var factory=$("#q_factory").val();
	var workshop=$("#q_workshop").val();
	var workshopName=$("#q_workshop").find("option:selected").text();
	var startDate=$("#q_date_start").val();
	var endDate=$("#q_date_end").val();
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
	var conditions = "{factoryId:'" + factory + "',workshopId:'" + workshop+"',workshopName:'"+
		workshopName+"',startDate:'" + startDate + "',endDate:'"+endDate+ "'}";
	$.ajax({
		url : "qualityReport!getWProcessProblemData	.action",
		type : "post",
		dataType : "json",
		data : {
			"conditions" : conditions,
			"pager.pageSize" : 20,
			"pager.curPage" : targetPage || 1

		},
		success : function(response) {
			generateChart(response.chartList);
			generateTabel(response.detailList,response.pager);
		}
	});
	}
}
//生成图型报表
function generateChart(chartList){
	var title  = "车间制程问题柏拉图";	
	var categories=new Array();
	var series = new Array();
	var data_column=new Array();//柱状图数据
	var data_line=new Array();//线涂数据
	var total_last=0;//累加前面的值
	//获取categories、柱状图数据、初始化线状涂数据
	$.each(chartList,function(index,value){
		categories.push(value.bug_type);
		data_column.push(Number(value.bug_count));
		total_last+=Number(value.bug_count);
		data_line.push(total_last);
	});
	//计算线状涂百分比
	$.each(data_line,function(index,value){
		data_line[index]=Number((data_line[index]/total_last*100).toFixed(2));
	});
	var series_column={
			type : 'column',
			name : '频次',
			data : data_column,
			yAxis: 0,
			zIndex:2,
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
	};
	var series_line={
			type : 'line',
			name : '累计百分比',
			data : data_line,
			yAxis: 1,
			marker : {
				lineWidth : 2,
				lineColor : Highcharts.getOptions().colors[3],
				fillColor : 'white'
			},
			zIndex:2,
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
	series.push(series_column);
	series.push(series_line);
	
	var tooltip = {formatter :function() {
		var s = "";
		if(this.series.type=='column'){
			s =  this.x + ": " + this.y+"次";
		}else{
			s = this.y + "%";
		}	
		return s;
	}
	};

	var xAxis= {
			categories : categories,
			labels: {
                autoRotationLimit: 80
            }
		};

	var yAxis = [{
		title : {
			text : ''
		},
		labels:{
			format: '{value} '
		},
		min:0,
	},
	{
		title : {
			text : ''
		},
		labels:{
			format: '{value} %'
		},
		min:0,
		opposite: true
	}];
	var  plotOptions = {
        	column: {
                pointPadding: 0.2,
                borderWidth: 0,
                pointWidth:20
        }
    };
	if (chartList == null || chartList.length == 0) {
		$("#chartsContainer").css("display", "none");
	} else {
		drowCharts("#chartsContainer", title, xAxis,
				null, series, yAxis,tooltip,plotOptions);
		/*drawChart("#chartsContainer", "", title, "", tooltip, categories,
				yAxis, series, plotOptions)*/ 
		$("#chartsContainer").css("display", "");
	}
}
//生成表格
function generateTabel(detailList,pager){
	$("#tableContainer thead").html("");
	$("#tableContainer tbody").html("");
	var tb_head="";
	if($("#q_workshop").find("option:selected").text()=="部件"){
		tb_head=$("<tr><th>缺陷类别</th><th>零部件名称</th><th>主要问题</th><th>责任班组</th></tr>");
	}else{
		tb_head=$("<tr><th>缺陷类别</th><th>车号</th><th>主要问题</th><th>责任班组</th></tr>");
	}
	$("#tableContainer thead").append(tb_head);
	$.each(detailList,function(index,value){
		var tr=$("<tr />");
		$("<td />").html(value.bug_type).appendTo(tr);
		$("<td />").html(value.item).appendTo(tr);
		$("<td />").html(value.bug).appendTo(tr);
		$("<td />").html(value.workgroup).appendTo(tr);
		$("#tableContainer tbody").append(tr);
	});
	$("#tableContainer").css("display","");
	$("#total").html(pager.totalCount);
	$("#total").attr("total", pager.totalCount);
	$("#cur").attr("page", pager.curPage);
	$("#cur").html(
			"<a href=\"#\">" + pager.curPage + "</a>");
	$("#pagination").show();
}