$(document).ready(function () {	
	initPage();
	function initPage(){
		getAuthorityFactorySelect("#factory_id");
		//$("#factory_id option[index='0']").remove();  //删除Select中Text='4'的Option
		$("#factory_id option").each(function(){
			if($(this).text() == '全部'){
				$(this).remove();
			}
		});
		ajaxQuery();
	}
	$("#factory_id").change(function(){
		ajaxQuery();
	});
});
function ajaxQuery(){
	$.ajax({
	    url: "orderReport!factoryOrderProcessReport.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'factory_id':$("#factory_id").val()
	    },
	    success:function(response){	
			var title = "工厂订单进度 | <a href='order!ordersearch.action' target='_blank'>订单查询</a>";
			var subtitle = $("#factory_id").find("option:selected").text();
	        var yAxis = {
	        		min: 0,
	        		minRange:10,
	                title: {
	                    text: '台数'
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }],
	                labels: {
	                    formatter: function () {
	                        return this.value + '台';
	                    }
	                }
	        };
	        var tooltip = {
	                headerFormat: '<span style="font-size:12px;padding-bottom: 10px;">{point.key}</span><table>',
	                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: &nbsp;&nbsp;</td>' +
	                    '<td style="padding:0"><b>{point.y} 台</b></td></tr>',
	                footerFormat: '</table>',
	                shared: true,
	                useHTML: true
	            };
	        var plotOptions = {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        };
	        
			if(response.data.length<=0){
				alert('没有查询到数据！');
				return;
			}
			var categories = [];
			var series = [];
			
			var order_num = [];
			var production_num=[];
			var welding_onlineNum = [];
			var chassis_onlineNum = [];
			var assembly_offlineNum = [];
			var warehousingNum = [];
			
			$.each(response.data,function(index, value) {
				categories.push(value.order_desc);
				
				order_num.push(value.order_qty);
				production_num.push(value.production_qty);
				welding_onlineNum.push(value.welding_onlineNum);
				chassis_onlineNum.push(value.chassis_onlineNum);
				assembly_offlineNum.push(value.assembly_offlineNum);
				warehousingNum.push(value.warehousingNum);
			});
			var dataLabels = {
                enabled: true,
                rotation: 0,
                color: '#black',
                align: 'center',
                x: 0,
                y: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, Microsoft YaHei'
                    //textShadow: '0 0 3px black'
                }
            };
			var sData={};
			sData.name = '工厂生产数量';
			sData.data = production_num;
			sData.dataLabels = dataLabels;
			series.push(sData);
			var sData1={};
			sData1.name = '焊装上线';
			sData1.data = welding_onlineNum;
			sData1.dataLabels = dataLabels;
			series.push(sData1);
			var sData2={};
			sData2.name = '底盘上线';
			sData2.data = chassis_onlineNum;
			sData2.dataLabels = dataLabels;
			series.push(sData2);
			var sData3={};
			sData3.name = '总装下线';
			sData3.data = assembly_offlineNum;
			sData3.dataLabels = dataLabels;
			series.push(sData3);
			var sData4={};
			sData4.name = '入库';
			sData4.data = warehousingNum;
			sData4.dataLabels = dataLabels;
			series.push(sData4);
			
			drawChart("#containerReport",'column',title,subtitle,tooltip,categories,yAxis,series,plotOptions);
	    }
	});
	
}


