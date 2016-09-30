var ScrollTime;
var cur_workshop = ""
var welding_info = "";
var painting_info = "";
var chassis_info = "";
var assembly_info = "";
$(document).ready(function () {
	initPage();
	function initPage(){
		getFactorySelect();
		getUserFactory();		//获取当前用户所属工厂
		$("#search_factory").attr("disabled","disabled");
		//ScrollText($('#table_welding_info'),23,500,'正常生产中···','left',1,20);//滚动字幕
		$('#execution_welding').hide();
		$('#table_welding').hide();
		
		$('#execution_painting').hide();
		$('#table_painting').hide();
		
		$('#execution_chassis').hide();
		$('#table_chassis').hide();
		
		$('#execution_assembly').hide();
		$('#table_assembly').hide();
		
		ajaxQueryOrder();
		setInterval(function () {
			ajaxQueryOrder();
		},1000*60);
		
		if(Request("workshop")=="welding"){
			cur_workshop ="welding";
			$('#execution_welding').show();
			$('#table_welding').show();
			ScrollText($('#table_welding_info'),23,500,"正常生产中",'left',1,20);
		}else if(Request("workshop")=="painting"){
			cur_workshop ="painting";
			$('#execution_painting').show();
			$('#table_painting').show();
			ScrollText($('#table_painting_info'),23,500,"正常生产中",'left',1,20);
		}else if(Request("workshop")=="chassis"){
			cur_workshop ="chassis";
			$('#execution_chassis').show();
			$('#table_chassis').show();
			ScrollText($('#table_chassis_info'),23,500,"正常生产中",'left',1,20);
		}else if(Request("workshop")=="assembly"){
			cur_workshop ="assembly";
			$('#execution_assembly').show();
			$('#table_assembly').show();
			ScrollText($('#table_assembly_info'),23,500,"正常生产中",'left',1,20);
		}
	}
	
});

function ajaxQueryOrder(){
	welding_info = "";
	painting_info = "";
	chassis_info = "";
	assembly_info = "";
	$.ajax({
		url:"common!getIndexOrderInfo.action",
		type:"post",
		data:{},
		dataType:"json",
		success:function(response){
			$.each(response.weldingList,function(index,data){
				if(data.process_node =="焊装上线"){
					$("#table_welding_online").html(data.done_num+"/"+data.plan_total);
				}else if (data.process_node =="焊装下线"){
					$("#table_welding_offline").html(data.done_num+"/"+data.plan_total);
				}
			});
			
			$.each(response.paintingList,function(index,data){
				if(data.process_node =="涂装上线"){
					$("#table_painting_online").html(data.done_num+"/"+data.plan_total);
				}else if (data.process_node =="涂装下线"){
					$("#table_painting_offline").html(data.done_num+"/"+data.plan_total);
				}
			});
			
			$.each(response.bottomList,function(index,data){
				if(data.process_node =="底盘上线"){
					$("#table_chassis_online").html(data.done_num+"/"+data.plan_total);
				}else if (data.process_node =="底盘下线"){
					$("#table_chassis_offline").html(data.done_num+"/"+data.plan_total);
				}
			});
			
			$.each(response.assemblyList,function(index,data){
				if(data.process_node =="总装上线"){
					$("#table_assembly_online").html(data.done_num+"/"+data.plan_total);
				}else if (data.process_node =="总装下线"){
					$("#table_assembly_offline").html(data.done_num+"/"+data.plan_total);
				}
			});
			
			$.each(response.exceptionList,function(index,exception){
				if(exception.workshop_name == "焊装"){
					welding_info += exception.bus_number + " " + exception.reason + ";";
				}else if(exception.workshop_name == "涂装"){
					painting_info += exception.bus_number + " " + exception.reason + ";";
				}else if(exception.workshop_name == "底盘"){
					chassis_info += exception.bus_number + " " + exception.reason + ";";
				}else if(exception.workshop_name == "总装"){
					assembly_info += exception.bus_number + " " + exception.reason + ";";
				}
			});
			if(cur_workshop == "welding"){
				(welding_info == "")?ScrollText($('#table_welding_info'),23,500,"正常生产中",'left',1,20):ScrollText($('#table_welding_info'),23,500,welding_info,'left',1,20);
			}else if(cur_workshop == "painting"){
				(painting_info == "")?ScrollText($('#table_painting_info'),23,500,"正常生产中",'left',1,20):ScrollText($('#table_painting_info'),23,500,painting_info,'left',1,20);
			}else if(cur_workshop == "chassis"){
				(chassis_info == "")?ScrollText($('#table_chassis_info'),23,500,"正常生产中",'left',1,20):ScrollText($('#table_chassis_info'),23,500,chassis_info,'left',1,20);
			}else if(cur_workshop == "assembly"){
				(assembly_info == "")?ScrollText($('#table_assembly_info'),23,500,"正常生产中",'left',1,20):ScrollText($('#table_assembly_info'),23,500,assembly_info,'left',1,20);
			}
			
		}
	});
	
	
	$.ajax({
	    url: "production!getProductionSearch.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"workshop_id": "",
	    	"line_id": "",
	    	"exception_type": "",
	    	"order_no": "",
	    },
	    success:function(response){
	    	$.each(response.data,function (index,value) {
	    		$("#table_welding_count").html(value.welding_count + "辆");
	    		$("#table_painting_count").html(value.painting_count + "辆");
	    		$("#table_chassis_count").html(value.chassis_count + "辆");
	    		$("#table_assembly_count").html(value.assembly_count + "辆");
	    	})
	    }
	});
	
};

function ScrollAutoPlay(contID,scrolldir,showwidth,textwidth,steper){
    var PosInit,currPos;
    with($('#'+contID)){
        currPos = parseInt(css('margin-left'));
        if(scrolldir=='left'){
            if(currPos<0 && Math.abs(currPos)>textwidth){
                css('margin-left',showwidth);
            }
            else{
                css('margin-left',currPos-steper);
            }
        }
        else{
            if(currPos>showwidth){
                css('margin-left',(0-textwidth));
            }
            else{
                css('margin-left',currPos-steper);
            }
        }
    }
}
//--------------------------------------------左右滚动效果----------------------------------------------
/*
AppendToObj：        显示位置（目标对象）
ShowHeight：        显示高度
ShowWidth：        显示宽度
ShowText：        显示信息
ScrollDirection：    滚动方向（值：left、right）
Steper：        每次移动的间距（单位：px；数值越小，滚动越流畅，建议设置为1px）
Interval:        每次执行运动的时间间隔（单位：毫秒；数值越小，运动越快）
*/
function ScrollText(AppendToObj,ShowHeight,ShowWidth,ShowText,ScrollDirection,Steper,Interval){
	clearInterval(ScrollTime);
    var TextWidth,PosInit,PosSteper;
    with(AppendToObj){
        html('');
        css('overflow','hidden');
        css('height',ShowHeight+'px');
        css('line-height',ShowHeight+'px');
        css('width',ShowWidth);
    }
    if (ScrollDirection=='left'){
        PosInit = ShowWidth;
        PosSteper = Steper;
    }
    else{
        PosSteper = 0 - Steper;
    }
    if(Steper<1 || Steper>ShowWidth){Steper = 1}//每次移动间距超出限制(单位:px)
    if(Interval<1){Interval = 10}//每次移动的时间间隔（单位：毫秒）
    var Container = $('<div></div>');
    var ContainerID = 'ContainerTemp';
    var i = 0;
    while($('#'+ContainerID).length>0){
        ContainerID = ContainerID + '_' + i;
        i++;
    }
    with(Container){
      attr('id',ContainerID);
      css('float','left');
      css('cursor','default');
      appendTo(AppendToObj);
      html(ShowText);
      TextWidth = width();
      if(isNaN(PosInit)){PosInit = 0 - TextWidth;}
      css('margin-left',PosInit);
      mouseover(function(){
          clearInterval(ScrollTime);
      });
      mouseout(function(){
          ScrollTime = setInterval("ScrollAutoPlay('"+ContainerID+"','"+ScrollDirection+"',"+ShowWidth+','+TextWidth+","+PosSteper+")",Interval);
      });
    }
    ScrollTime = setInterval("ScrollAutoPlay('"+ContainerID+"','"+ScrollDirection+"',"+ShowWidth+','+TextWidth+","+PosSteper+")",Interval);
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

function Request(strName){  
	var strHref = location.href; 
	var intPos = strHref.indexOf("?");  
	var strRight = strHref.substr(intPos + 1);  
	var arrTmp = strRight.split("&");  
	for(var i = 0; i < arrTmp.length; i++) {  
		var arrTemp = arrTmp[i].split("=");  
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];  
	}  
	return "";  
} 
