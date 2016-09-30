$(document).ready(function () {	
	initPage();
	function initPage(){
		//alert(GetQueryString("version"));
		$("#search_plan_version").val(GetQueryString("version"));
		getFactorySelect();
		ajaxQuery();
	};
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	function ajaxQuery(targetPage){
		$("#divBulkAdd").hide();
		$.ajax({
		    url: "plan!showPlanMasterList.action",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"version":$('#search_plan_version').val(),
		    	"factory_id": $('#search_factory').val(),
		    	"order_no": $('#search_order_no').val(),
		    	"pager.pageSize":10,
				"pager.curPage":targetPage || 1
		    },
		    success:function(response){		    		
	    		$("#MyTable tbody").html("");
	    		var day = new Array("日", "一", "二", "三", "四", "五", "六"); 
	    		var stock = new Array(0,0,0,0,0,0,0,0,0,0,0,0);		//库存
	    		$.each(response.data,function (index,value) {
	    			$("#th_order_no").html(value.order_no);
	    			if(index%12 == 0){
	    				//var firstDay = new Date(value.plan_month.substring(0,4) + "-" + value.plan_month.substring(4,6) + "-01");
	    				//var strTime="2011-04-16";    //字符串日期格式           
	    				var date= new Date(Date.parse((value.plan_month.substring(0,4) + "-" + value.plan_month.substring(4,6) + "-01").replace(/-/g,  "/")));      //转换成Data();
	    				//alert(day[date.getDay()]);
	    				$("#order_id").val(value.order_id);
	    				$("#factory_id").val(value.factory_id);
	    				var tr = $("<tr/>");
	    				var i = 0; var fday = date.getDay();
	    	    		$("<td style=\" line-height:12px;\" />").html("<b>&nbsp;&nbsp;&nbsp;&nbsp;节点</b>").appendTo(tr);
	    	    		$("<td style=\"line-height:12px;\" />").html("<b>&nbsp;&nbsp;月份</b>").appendTo(tr);
	    	    		$("<td style=\"width:20px;line-height:12px;\" />").html("<b>库存</b>").appendTo(tr);
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;

	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;

	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;

	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html("").appendTo(tr);
	    	    		$("<td style=\"line-height:12px;\" />").html("").appendTo(tr);
	    	    		$("#MyTable tbody").append(tr);
	    			}
	    			tr = $("<tr />");
	    			$("<td style=\"line-height:12px;padding-left:0px;\" />").html(value.plan_code_keyname).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html(value.plan_month).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html(stock[index%12]).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d1==0)?"":value.d1).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d2==0)?"":value.d2).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d3==0)?"":value.d3).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d4==0)?"":value.d4).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d5==0)?"":value.d5).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d6==0)?"":value.d6).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d7==0)?"":value.d7).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d8==0)?"":value.d8).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d9==0)?"":value.d9).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d10==0)?"":value.d10).appendTo(tr);
	    			
	    			$("<td style=\"line-height:12px;\" />").html((value.d11==0)?"":value.d11).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d12==0)?"":value.d12).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d13==0)?"":value.d13).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d14==0)?"":value.d14).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d15==0)?"":value.d15).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d16==0)?"":value.d16).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d17==0)?"":value.d17).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d18==0)?"":value.d18).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d19==0)?"":value.d19).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d20==0)?"":value.d20).appendTo(tr);

	    			$("<td style=\"line-height:12px;\" />").html((value.d21==0)?"":value.d21).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d22==0)?"":value.d22).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d23==0)?"":value.d23).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d24==0)?"":value.d24).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d25==0)?"":value.d25).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d26==0)?"":value.d26).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d27==0)?"":value.d27).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d28==0)?"":value.d28).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html((value.d29==0)?"":value.d29).appendTo(tr);$("<td style=\"line-height:12px;\" />").html((value.d30==0)?"":value.d30).appendTo(tr);

	    			$("<td style=\"line-height:12px;\" />").html((value.d31==0)?"":value.d31).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html(value.sumQty).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html(value.sumQty + stock[index%12]).appendTo(tr);
	    			stock[index]+=value.sumQty;
	    			$("#MyTable tbody").append(tr);
	    			
	    		});
	    		
	    		$("#total").html(response.pager.totalCount);
	    		$("#total").attr("total",response.pager.totalCount);
	    		$("#cur").attr("page",response.pager.curPage);
	    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
	    		$("#pagination").show();
		    	
		    }
		});
	}
	
	
})

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
		}
	});
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}