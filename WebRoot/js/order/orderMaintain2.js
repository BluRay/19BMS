var select_str = "";
var select_str1 = "";
var select_str2 = "";
var cur_year="";
var original = "";
var reduce_series_list=new Array();
var max_num = 0;		var sum_num = 0;
var edit_max_num = 0;	var edit_sum_num = 0;
var del_order_list=new Array();
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		cur_year = new Date().getFullYear();
		$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		$("#productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		$("#edit_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		getOrderNoSelect("#search_order_no","#orderId");
		getFactorySelect();
		getBusType();
		//获取订单类型下拉列表
		getKeysSelect("ORDER_TYPE", "标准订单", "#orderType","noall","keyName");
		ajaxQuery();
		$("#btnAddConfirm").removeAttr("disabled");
		$("#btnEditConfirm").removeAttr("disabled");
		max_num = 0;sum_num = 0;
	};
	
	$("#btnAdd").click( function (argument) {
		$("#newModal").data("bus_num_start","");
		$("#factoryOrder_parameters").html("");
		$("#newModal").modal("show");
		//获取cur_year下的最新流水起始号（最大流水号+1）
		var bus_num_start=getLatestSeris(cur_year);
		$("#newModal").data("bus_num_start",bus_num_start);
		$("#newPlanAmount").focus();
	});
	
	$("#btnTest").click( function (argument) {
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			alert($(tds[2]).find("input").val());
		});
	});

	$("#editFactoryOrder").click( function (argument) {
		//alert("123");
		var paramHtml="<tr><td><button type=\"button\" class=\"close edit\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
		//"<td>" + select_str1 + "<option value='"+ value.factory_id + "'> "+ value.factory_name + "</option>" + select_str2 + "</td>" +
		"<td>" + select_str + "</td>" +
		"<td><input type='text' style='width:60px'  class='input-small orderNum edit' value='0' id='production_qty2'/></td>" +
		"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='0' id='busnum_start2'/></td>" +
		"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='0' id='busnum_end2'/></td>" +
		"<td><input type='text' style='width:60px;display:none' class='input-small' value='0' id='minbusnum'/></td>" +
		"<td><input type='text' style='width:60px;display:none' class='input-small' value='0' id='maxbusnum'/></td>" +
		"</tr>";
		$(paramHtml).appendTo("#edit_factoryOrder_parameters");
		
		return false;
	});
	
	$("#addFactoryOrder").click( function (argument) {
		var paramHtml="<tr><td><button type=\"button\" class=\"close add\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
		"<td>" + select_str + "</td>" +
		"<td><input type='text' style='width:60px' class='input-small orderNum add' value='0' id='production_qty1'/></td>" +
		"<td><input type='text' style='width:60px' class='input-small busNum' disabled='disabled' value='0' id='busnum_start1'/></td>" +
		"<td><input type='text' style='width:60px' class='input-small busNum' disabled='disabled' value='0' id='busnum_end1'/></td>" +
		"</tr>";
		$(paramHtml).appendTo("#factoryOrder_parameters");
		
		return false;
	});
	$(".close.add").live("click",function(e){
		$(e.target).closest("tr").remove();		
		//var latest_num_start=Number($("#newModal").data("bus_num_start"));
		//获取cur_year下的最新流水起始号（最大流水号+1）
		var order_type=$("#orderType").val();
		var latest_num_start=0;
		if(order_type=='标准订单'){
			latest_num_start=getLatestSeris(cur_year);
		}
		$("#newModal").data("bus_num_start",latest_num_start);
		//更新流水号
		var maxOrderNo = latest_num_start;	
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			$(tds[3]).find("input").val(maxOrderNo);
			$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
			maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
		});
	});
	
	$(".close.edit").live("click",function(e){
		var order_type=$("#editOrderType").val();
		var tr=$(e.target).closest("tr");
		if(order_type=='标准订单'){
			/**判断该工厂订单下是否已经产生了车号，是则不能删除
			 */
			if($(tr).data("min_busnum")!='0'&&$(tr).data("min_busnum")!=undefined){
				alert("该工厂订单下已生成了车号，不能删除！");
			}else /*if($(tr).data("production_qty")==undefined)*/{//新增的产地分配，删除后，合并剩余可用流水段列表;//已存在的产地分配，删除后，合并剩余可用流水段列表
				var series={};
				series.num_start=$(tr).find("td").eq(3).find("input").val();
				series.num_end=$(tr).find("td").eq(4).find("input").val();
				mergeReduceSeriesList(series);
				if($(tr).data("order_detail_id")!=undefined){
					var obj={};
					obj.factory_order_id=$(tr).data("factory_order_id");
					obj.order_detail_id=$(tr).data("order_detail_id");
					obj.production_qty=$(tr).data("production_qty");
					del_order_list.push(obj);
				}
				$(tr).remove();	
			}
		}else{
			if($(tr).data("order_detail_id")!=undefined){
				var obj={};
				obj.factory_order_id=$(tr).data("factory_order_id");
				obj.order_detail_id=$(tr).data("order_detail_id");
				obj.production_qty=$(tr).data("production_qty");
				del_order_list.push(obj);
			}
			$(tr).remove();	
			var maxOrderNo = 0;	
			var factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
			$.each(factoryOrder_parameters,function(index,param){
				var tds=$(param).children("td");
				$(tds[3]).find("input").val(maxOrderNo);
				$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
				maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
			});
		}
		
		
	});
	
	$(".busNum").live("keyup",function(e){
		//校验数据：总数及流水最大值需等于订单总数
		max_num = 0;		sum_num = 0;
		edit_max_num = 0;	edit_sum_num = 0;
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			$(tds[2]).find("input").val($(tds[4]).find("input").val() - $(tds[3]).find("input").val() + 1);
			if (parseInt($(tds[4]).find("input").val()) > parseInt(max_num)) max_num = $(tds[4]).find("input").val();
			sum_num += parseInt($(tds[2]).find("input").val());
		})
		var edit_factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
		$.each(edit_factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			$(tds[2]).find("input").val($(tds[4]).find("input").val() - $(tds[3]).find("input").val() + 1);
			if (parseInt($(tds[4]).find("input").val()) > parseInt(edit_max_num)) edit_max_num = $(tds[4]).find("input").val();
			edit_sum_num += parseInt($(tds[2]).find("input").val());
		})
		//$("#memo").val(sum_num);
	});
	
	$(".orderNum.add").live("keyup",function(e){
		//alert($(e.target).val());
		//获取cur_year下的最新流水起始号（最大流水号+1）
		var order_type=$("#orderType").val();
		var latest_num_start=0;
		if(order_type=='标准订单'){
			latest_num_start=getLatestSeris(cur_year);
		}		
		$("#newModal").data("bus_num_start",latest_num_start);
		//更新流水号
		var maxOrderNo = latest_num_start;	
		//alert(maxOrderNo);
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			//alert($(tds[2]).find("input").val());
			//maxOrderNo = $(tds[2]).find("input").val();
			$(tds[3]).find("input").val(maxOrderNo);
			$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
			maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
		});

	});
	
	$(".orderNum.edit").live("change",function(e){
		var order_type=$("#editOrderType").val();
		if(order_type=='标准订单'){
			var tr=$(e.target).closest("tr");
			var production_qty=parseInt($(e.target).attr("old_value"))||0;
			var cur_factory=$(tr).find("td").eq(1).find("select").val();
			var minbusnum=$(tr).data("min_busnum")||0;
			var maxbusnum=$(tr).data("max_busnum")||0;
			var tr_next=$(tr).next();
			var tr_busnum_start=parseInt($(tr).find("td").eq(3).find("input").val());
			var tr_busnum_end=parseInt($(tr).find("td").eq(4).find("input").val());
			var reduce_num=production_qty-parseInt($(e.target).val());
			var factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
			var totleNum = $("#edit_order_qty").val();
			var factoryNum = 0;			   
			$.each(factoryOrder_parameters,function(index,param){
				  var tds=$(param).children("td");
				  factoryNum += Number($(tds[2]).find("input").val());
			})
			var addflg=false;
			if(factoryNum<=totleNum){
				addflg=true;
			}
			if(!addflg){
				alert("产地分配数量之和不能超过订单总数量！");
				$(this).val(production_qty)
			}
			/**
			 * 产地分配数量不能改大，要增加数量只能新加一行相同产地的分配数据，如果reduce_series_list（剩余流水段）中
			 * 有流水可用，则从reduce_series_list中取，不够再提示不够，然后重新计算，计算后得到的流水起始号如果和
			 * 该工厂订单的流水号是接续的则在保存时合成一条工厂订单数据
			 */
			if(reduce_num<0&&addflg){
				//alert($(e.target).attr("old_value"))
			   var rise_num=0-reduce_num;
			   if($(e.target).attr("old_value")=='0'||$(e.target).attr("old_value")==undefined){//新增的产地分配，从reduce_series_list中取，没有可用流水则重新计算
				   if(reduce_series_list.length>0){//有空余流水可用使用
						//$.each(reduce_series_list,function(i,series){
							//var rise_num=parseInt($(e.target).val())-production_qty;
							var series=getMatchSeries(rise_num);
							if(series.message=="超出"){//数量不够，提示是否使用空余流水段，从reduce_series_list中删除该段流水
								if(confirm("目前有空余流水段："+series.num_start+"-"+series.num_end+"可用使用，是否使用？")){
									$(e.target).val(production_qty+series.num_end-series.num_start+1);
									$(tr).find("td").eq(3).find("input").val(series.num_start);
									$(tr).find("td").eq(4).find("input").val(series.num_end);
									reduce_series_list.splice(series.index,1);
								}else{
									$(e.target).val(production_qty);
								}
							}else if(series.message=="相等"){//数量相等，使用空余流水段，从reduce_series_list中删除该段流水
								$(e.target).val(production_qty+series.num_end-series.num_start+1);
								$(tr).find("td").eq(3).find("input").val(series.num_start);
								$(tr).find("td").eq(4).find("input").val(series.num_end);
								reduce_series_list.splice(series.index,1);
							}else{//数量小于空余流水，使用空余流水段，修改reduce_series_list中该段流水
								$(tr).find("td").eq(3).find("input").val(series.num_start);
								$(tr).find("td").eq(4).find("input").val(series.num_end);
								reduce_series_list[series.index].num_end=series.num_end-rise_num;
							}
						//})				
					}else{
						//获取cur_year下的最新流水起始号（最大流水号+1）
						var latest_num_start=getLatestSeris($("#edit_productive_year").val());
						$(tr).find("td").eq(3).find("input").val(latest_num_start);
						$(tr).find("td").eq(4).find("input").val(parseInt(latest_num_start)+parseInt($(e.target).val())-1);	
					}
			   }else{
				   if(addflg){
					   $(e.target).val(production_qty);
					   alert("请增加一行产地分配,或者删除该行重新分配！"); 
				   }			   
			   }
			   
			}
			/**
			 * 产地分配数量减少：
			 * （1）如果该工厂订单下未生成车号，可以直接改小，结束流水相应减小;
			 * （2）如果该工厂订单下已经生成了车号，且最大车号流水在需要减少的流水范围内，则可以减，否则不允许减少，且提示只能减少正确的数量
			 *	{如果后面一个工厂订单未生成车号，且流水起始号是和该工厂订单流水接续的，则后面这个工厂订单的流水相应的往前移	}
			 */
			else{
				if(minbusnum=='0'){//无车号产生时，直接减少流水，将减少的流水段添加到剩余流水段列表中
					$(tr).find("td").eq(4).find("input").val(tr_busnum_end-reduce_num);
					/**
					 * 分配数量减少后，把剩下的流水段记下，给本订单新增的产地分配使用，以免流水浪费
					 */
					var series_reduce={};
					series_reduce.num_start=(tr_busnum_end-reduce_num+1);
					series_reduce.num_end=tr_busnum_end;	
					mergeReduceSeriesList(series_reduce);//往剩余流水段列表中增加流水段
				}else{
					if(parseInt(maxbusnum)>=tr_busnum_end){
						alert("该段流水已全部生成车号，工厂分配数量不能减少！");
						$(e.target).val(production_qty);
						reduce_num=0;
						return false;
					}else{
						reduce_num=tr_busnum_end-parseInt(maxbusnum);
						if((production_qty-parseInt($(e.target).val()))<=reduce_num){
							reduce_num=production_qty-parseInt($(this).val());
							/**
							 * 分配数量减少后，把剩下的流水段记下，给本订单新增的产地分配使用，以免流水浪费
							 */
							var series_reduce={};
							series_reduce.num_start=(tr_busnum_end-reduce_num+1);
							series_reduce.num_end=tr_busnum_end;							
							mergeReduceSeriesList(series_reduce);//往剩余流水段列表中增加流水段					
							$(tr).find("td").eq(4).find("input").val(tr_busnum_end-reduce_num);
						}else{							
							if(confirm("该段流水已生成部分车号，工厂分配数量最多可以减少"+reduce_num+"。是否确认减少？")){
								//$(tr).find("td").eq(3).find("input").val(production_qty-parseInt($(this).val()));
								$(e.target).val(production_qty-reduce_num)
								$(tr).find("td").eq(4).find("input").val(tr_busnum_end-reduce_num);
								/**
								 * 分配数量减少后，把剩下的流水段记下，给本订单新增的产地分配使用，以免流水浪费
								 */
								var series_reduce={};
								series_reduce.num_start=(tr_busnum_end-reduce_num+1);
								series_reduce.num_end=tr_busnum_end;							
								mergeReduceSeriesList(series_reduce);//往剩余流水段列表中增加流水段	
							}else{
								reduce_num=0;
								$(e.target).val(production_qty);
								return false;
							}
						}					
					}
				}
			}
			
			$(e.target).attr("old_value",$(e.target).val())			
		}else{
			var maxOrderNo = 0;	
			var factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
			$.each(factoryOrder_parameters,function(index,param){
				var tds=$(param).children("td");
				$(tds[3]).find("input").val(maxOrderNo);
				$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
				maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
			});
		}
		
	});
	/**
	 * 使用剩余流水段时，判断剩余流水段，优先使用数量相等的流水段，其次使用数量有余的流水段，最后提示使用不足的流水段
	 */
	function getMatchSeries(riseNum){
		var series={};		
		$.each(reduce_series_list,function(i,s){//可用流水段等于增加数量	
			var seriesNum=(s.num_end-s.num_start+1);
			if(seriesNum==riseNum){
				series.index=i;
				series.num_start=s.num_start;
				series.num_end=s.num_end;
				series.message="相等";
				return false;
			}
		})
		if(series.index==undefined){
			$.each(reduce_series_list,function(i,s){//可用流水段超出增加数量
				var seriesNum=(s.num_end-s.num_start+1);
				if(seriesNum>riseNum){
					series.index=i;
					series.num_start=s.num_end-riseNum+1;
					series.num_end=s.num_end;
					series.message="未超出";
					return false;
				}
			})
		}
		if(series.index==undefined){
			$.each(reduce_series_list,function(i,s){//可用流水段小于增加数量
				var seriesNum=(s.num_end-s.num_start+1);
				if(seriesNum<riseNum){
					series.index=i;
					series.num_start=s.num_start;
					series.num_end=s.num_end;
					series.message="超出";
					return false;
				}
			})
		}
		//alert("匹配的流水段："+series.num_start+"-"+series.num_end);
		return series;
	}
	/**
	 * 往剩余流水段列表中增加流水段，判断是否有接续的流水，有的话合并，没有
	 */
	function mergeReduceSeriesList(series){
		var s_merge={};
		$.each(reduce_series_list,function(i,s){			
			if(series.num_end==parseInt(s.num_start)-1){
				s.num_start=series.num_start;
				s_merge.index=i;
				s_merge.num_start=s.num_start;
				s_merge.num_end=s.num_end;
				reduce_series_list[i].num_start=s_merge.num_start;
				reduce_series_list[i].num_end=s_merge.num_end;
				return false;
			}
			if(series.num_start==parseInt(s.num_end)+1){
				s.num_end=series.num_end;
				//alert(s.num_end);
				s_merge.index=i;
				s_merge.num_start=s.num_start;
				s_merge.num_end=s.num_end;
				reduce_series_list[i].num_start=s_merge.num_start;
				reduce_series_list[i].num_end=s_merge.num_end;
				//alert(reduce_series_list[i].num_start+"-"+reduce_series_list[i].num_end)
				return false;
			}
		});
		if(s_merge.index==undefined){
			reduce_series_list.push(series);
		}
	}
	
	/**
	 * 改变生产年份后重新获取起始流水号，重新分配
	 */
	$("#productive_year").change(function(){
		var latest_num_start=getLatestSeris($(this).val());
		$("#newModal").data("bus_num_start",latest_num_start);
		//更新流水号
		var maxOrderNo = latest_num_start;	
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			//alert($(tds[2]).find("input").val());
			//maxOrderNo = $(tds[2]).find("input").val();
			$(tds[3]).find("input").val(maxOrderNo);
			$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
			maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
		});
	});
	
	$("#btnAddConfirm").click (function () {
		ajaxAdd();
		return false;
	});
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnEditConfirm").click (function () {
		ajaxEditConfirm();
		return false;
	});
	
	function ajaxEditConfirm (argument){
		//alert(original);
		
		$("#btnEditConfirm").attr("disabled","disabled");
		//数据验证
		var factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
		var totleNum = $("#edit_order_qty").val();
		var factoryNum = 0;
		var factoryOrderDetail = [];
		var factoryOrderNum="";
		var arrStart = new Array();
		var arrEnd = new Array();
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			arrStart[index] = Number($(tds[3]).find("input").val());
			arrEnd[index]   = Number($(tds[4]).find("input").val());
			var fod={};
			fod.factory_id=$(tds[1]).find("select").val();
			//fod.order_id=$("#editModal").data("order_id");
			fod.factory_order_id=$(param).data("factory_order_id")||"0";
			fod.order_detail_id=$(param).data("order_detail_id")||"0";
			fod.production_qty=$(tds[2]).find("input").val()||0;
			fod.old_production_qty=$(param).data("production_qty")||"0";
			fod.busnum_start=$(tds[3]).find("input").val();
			fod.busnum_end=$(tds[4]).find("input").val();
			if(Number(fod.production_qty)>0){
				factoryOrderDetail.push(fod);
			}
		
			factoryOrderNum += $(tds[1]).find("select").val() + ":" + $(tds[2]).find("input").val() + "_" + $(tds[3]).find("input").val() + "|" + $(tds[4]).find("input").val() + "," ;
			factoryNum += Number($(tds[2]).find("input").val());
			
			//修改后的工厂生产数量不能大于 已生成车号数
			//--> 修改后的流水：起始值小于minbusnum，结束值大于maxbusnum
		/*	if(Number($(tds[5]).find("input").val()) >0){
				if((Number($(tds[3]).find("input").val())>Number($(tds[5]).find("input").val()$(param).data("minbusnum")))||(Number($(tds[4]).find("input").val())<Number($(tds[6]).find("input").val()$(param).data("maxbusnum")))){
					//alert("产地分配数量不能小于当前工厂已经生产数量！");
					alert("修改后的流水：起始值小于已上线的最小车号，结束值大于已上线的最大车号");
					$("#btnEditConfirm").removeAttr("disabled");
					return false;
				}
			}*/
			
		});
		if(original==factoryOrderNum){
			factoryOrderNum = "";
		}
		if (factoryNum != totleNum){
			alert("产地分配数量之和与订单总数量不相等！");
			$("#btnEditConfirm").removeAttr("disabled");
			return false;
		}
		//alert(factoryOrderNum);
		//校验：结束号（最大值除外）+1 必需存在于起始号 中
/*		for(var i=0,n=arrEnd.length;i<n;i++){
			if(arrEnd[i] < factoryNum){
				//alert("arrEnd[i] : " + $.inArray(arrEnd[i]+1, arrStart));
				if($.inArray(arrEnd[i]+1, arrStart) < 0){
					alert("工厂配置流水分配有误，请确保流水从1开始且连续！");
					$("#btnEditConfirm").removeAttr("disabled");
					return false;
				}
			}
			
		}	*/	
		//alert(factoryOrderNum);

		$.ajax({
			type: "get",
			dataType: "json",
			url: "order!editOrder2.action",
		    data: {
				"data_order_id":$("#editModal").data("order_id"),
				"color":$("#edit_color").val(),
				"seats":$("#edit_seats").val(),
				"delivery_date":$("#edit_delivery_date").val(),
				"memo":$("#edit_memo").val(),
				"factoryOrderDetail":JSON.stringify(factoryOrderDetail),
				"productive_year":$("#edit_productive_year").val(),
				"del_order_list":JSON.stringify(del_order_list)
			},
			async: false,
		    success:function (response) {
		    	$("#btnEditConfirm").removeAttr("disabled");
		    	if (response.success) {
		    		if(factoryOrderDetail==""){
		    			alert("订单数据编辑成功！");
		    		}else{
		    			alert("订单数据编辑成功，请重新发布该订单今天及以后的计划！");
		    		}
		    		$('#editModal').modal('hide');
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();$("#btnEditConfirm").removeAttr("disabled");}
		});
		
	}
	
	function ajaxAdd (argument) {
		//数据验证
		if(($("#order_name").val() == '')||($("#order_code").val() == '')||($("#order_qty").val() == '')||($("#delivery_date").val() == '')){
			alert('请输入完整订单数据！');
			$("#btnAddConfirm").removeAttr("disabled");
			return false;
		}else if(isNaN($("#order_qty").val())){
			alert('订单数量须为数字！');
			$("#btnAddConfirm").removeAttr("disabled");
			return false;
		}

		$("#btnAddConfirm").attr("disabled","disabled");
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		var totleNum = $("#order_qty").val();
		var factoryNum = 0;
		var factoryOrderNum = "";
		//校验：结束号（最大值除外）+1 必需存在于起始号 中
		var arrStart = new Array();
		var arrEnd = new Array();
		
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			arrStart[index] = Number($(tds[3]).find("input").val());
			arrEnd[index]   = Number($(tds[4]).find("input").val());
			
			factoryOrderNum += $(tds[1]).find("select").val() + ":" + $(tds[2]).find("input").val() + ",";
			factoryNum += Number($(tds[2]).find("input").val());
		});
		
		//校验：结束号（最大值除外）+1 必需存在于起始号 中
		//alert(arrStart);
/*		for(var i=0,n=arrEnd.length;i<n;i++){
			if(arrEnd[i] < factoryNum){
				//alert("arrEnd[i] : " + $.inArray(arrEnd[i]+1, arrStart));
				if($.inArray(arrEnd[i]+1, arrStart) < 0){
					alert("工厂配置流水分配有误，请确保流水从1开始且连续！");
					$("#btnAddConfirm").removeAttr("disabled");
					return false;
				}
			}
			
		}*/
		
		if (factoryNum != totleNum){
			alert("产地分配数量之和与订单总数量不相等！");
			$("#btnAddConfirm").removeAttr("disabled");
			return false;
		}
		/*if (max_num != totleNum){
			alert("订单流水分配有误，请确保流水从1开始且连续！");
			$("#btnAddConfirm").removeAttr("disabled");
			return false;
		}
		*/
		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "order!addOrder2.action",
		    data: {
				"data_order_name":$("#order_name").val(),
				"data_order_code":$("#order_code").val().toUpperCase(),
				"data_order_type":$("#orderType").val(),
				"data_bus_type_id":$("#busType").val(),
				"data_order_qty":$("#order_qty").val(),
				"data_productive_year":$("#productive_year").val(),
				"color":$("#color").val(),
				"seats":$("#seats").val(),
				"delivery_date":$("#delivery_date").val(),
				"status":"0",
				"memo":$("#memo").val(),
				"factoryOrderNum":factoryOrderNum,
			},
			async: false,
		    success:function (response) {
		    	$("#btnAddConfirm").removeAttr("disabled");
		    	if (response.success) {
		    		$('#newModal').modal('hide');
		    		$("#btnAddConfirm").removeAttr("disabled");
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
		
	}
	
	function getBusType(){
		$.ajax({
			url: "common!getBusType.action",
			dataType: "json",
			data: {},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				if(response.success){
					options = $.templates("#tmplBusTypeSelect").render(response.data);
					$(".busType").append(options);
					
				} else {
					alert(response.message);
				}
			}
		})
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
				getSelects(response, "", "#search_factory");
				getSelects_noall(response, "", "#factory_id1");
				
				select_str = "<select name='' id='factory_id1' class='input-small'>";
				select_str1 = "<select name='' id='factory_id2' class='input-small'>";
				$.each(response, function(index, value){
					select_str += "<option value=" + value.id + ">" + value.name + "</option>";
					select_str2 += "<option value=" + value.id + ">" + value.name + "</option>";
				});
				select_str += "</select>";
				select_str2 += "</select>";
				
				var paramHtml="<tr><td><button disabled=\"disabled\" type=\"button\" class=\"close add\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
				"<td>" + select_str + "</td>" +
				"<td><input type='text' style='width:60px' class='input-small orderNum add' value='0' id='production_qty1'/></td>" +
				"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='0' id='busnum_start1'/></td>" +
				"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='0' id='busnum_end1'/></td>" +
				"</tr>";
				$(paramHtml).appendTo("#factoryOrder_parameters");
			}
		});
	}
	
	//全选、反选
    $("#checkall").live("click",function(){
    	//alert($("#checkall").attr("checked"));
    	if($("#checkall").attr("checked")=="checked"){
    		check_All_unAll("#tableOrder",true);
    	}else{
    		check_All_unAll("#tableOrder",false);
    	}    	
    });
	
});

function ajaxQuery(targetPage){
	$.ajax({
	    url: "order!showOrderList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"search_order_no": $('#search_order_no').val(),
	    	"search_order_name": $('#search_order_name').val(),
	    	"search_productive_year": $('#search_productive_year').val(),
	    	"search_factory": $('#search_factory').val(),
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableOrder tbody").html("");
    		
    		var _columns = [
			{name:'order_no',idMerge:true},
			{name:'order_name_str',idMerge:true},
			//{name:'bus_type'},
			//{name:'production_qty'},
			{name:'productive_year'},
			{name:'delivery_date'},
			{name:'color'},
			{name:'seats'},
			{name:'area'},
			{name:'production_qty'},
			{name:'bus_number_start'},
			{name:'bus_number_end'},
			{name:'car_num'},
			{name:'memo'},
			{name:'user_name'},
			{name:'edit_date'}
			];
			var list = response.data;
			_table = document.getElementById("tableOrder");
			_table.border = "0px";
			
			var currMergeTds = [];
    		for(var i = 0; i < list.length; i++){
    			var row = document.createElement("tr");
    			for(var colIdx = 0; colIdx < _columns.length; colIdx++){
    				var col = _columns[colIdx];
    				if(col['hidGrid']){
    					continue;
    				}
    				if(col['idMerge']){
    					if(i > 0 && list[i][col['name']] === currMergeTds[colIdx]['value']){
    						currMergeTds[colIdx]['cell'].setAttribute('rowspan', ++currMergeTds[colIdx]['cell_count']);
    					}else{
    						var cell = document.createElement("TD");
    						cell.setAttribute('rowspan',1);
    						cell.innerHTML = list[i][col['name']];
    						//if(col['name'] == 'order_name') cell.innerHTML += list[i]["bus_type"] +" " + list[i]["order_qty"] + '台';
    						var mergeTd = {};
    						mergeTd['value'] = list[i][col['name']];
    						mergeTd['cell'] = cell;
    						mergeTd['cell_count'] = 1;
    						currMergeTds[colIdx] = mergeTd;
    						row.appendChild(cell);
    					}
    				}else{
    					var cell = document.createElement("TD");
    					cell.innerHTML = list[i][col['name']];
    					if(col['name'] == 'car_num') cell.innerHTML = "<button onclick = 'ajaxShowBusNumber(" + list[i]['id']+ ","+list[i]['factory_id']+");' class='btn-link'>车号详情</>";
    					row.appendChild(cell);
    				}
    			}
    			var cell = document.createElement("TD");
				cell.innerHTML = "<button onclick = 'ajaxEdit(" + list[i]['id'] + ',' + list[i]['issed_qty']+ ");' class='btn-link'>编辑</>";
				row.appendChild(cell);
    			$("#tableOrder tbody").append(row);
    		}
    		
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
	    	
	    }
	});
}

function ajaxShowBusNumber(order_id,factory_id){
	$.ajax({
		url: "order!showBusNumber.action",
		dataType: "json",
		data: {"order_id" : order_id,"factory_id":factory_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#tableBusNumber tbody").html("");
	    		$.each(response.data,function (index,value) {
	    			var tr = $("<tr />");
	    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
	    			$("#tableBusNumber tbody").append(tr);
	    			
	    		});
				$("#busNumberModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxEdit(order_id,issed_qty){
	original="";
	/**
	if(issed_qty >0){
		//alert("已发布的订单不能编辑");
		$('#btnEditConfirm').attr("disabled","disabled");
		$('#btnEditConfirm').attr("title","已发布的订单不能编辑");
	}else{

		$('#btnEditConfirm').attr("title","编辑");
		$('#btnEditConfirm').removeAttr("disabled");
	}
	**/
	reduce_series_list=new Array();//重置减少分配数量时剩余流水段
	//查询订单信息
	$.ajax({
		url: "order!showOrderDetailList.action",
		dataType: "json",
		data: {"order_id" : order_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#edit_factoryOrder_parameters").html("");
				$.each(response.data,function(index,value){
					if(index == 0){
						//填充订单基本信息
						$("#editOrderID").val(value.id);
						$("#editOrderNo").val(value.order_no);
						$("#editOrderName").val(value.order_name);
						$("#editOrderCode").val(value.order_code);
						$("#editOrderType").val(value.order_type);
						$("#editBusType").val(value.bus_type_id);
						$("#edit_order_qty").val(value.order_qty);
						$("#edit_order_descriptive").val(value.order_name + value.bus_type_code + " " + value.order_qty + "台");
						$("#edit_productive_year").val(value.productive_year);
						$("#edit_color").val(value.color);
						$("#edit_seats").val(value.seats);
						$("#edit_delivery_date").val(value.delivery_date);
						$("#edit_memo").val(value.memo);
						$("#editModal").data("bus_num_start",value.busnum_start);
					}
					if(index==response.data.length-1){
						$("#editModal").data("bus_num_end",value.busnum_end);
					}
					//填充生产工厂信息
					var close_btn = "";
					var factory_selectable=false;
					if(value.minbusnum == 0) {
						close_btn = "<button type=\"button\" class=\"close edit\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button>";
						factory_selectable=true;
					}
					
					var tr=$("<tr/>");
					var paramHtml="<td>"+close_btn+"</td>" +
					//"<td>" + select_str + "</td>" +
					"<td>" + select_str1 + "<option value='"+ value.factory_id + "'> "+ value.factory_name + "</option>" + select_str2 + "</td>" +
					"<td><input type='text' style='width:60px' class='input-small orderNum edit' value='"+value.production_qty+"' old_value="+value.production_qty+" id='production_qty2'/></td>" +
					"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='"+value.busnum_start+"' id='busnum_start2'/></td>" +
					"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='"+value.busnum_end+"' id='busnum_end2'/></td>" +
					/*"<td ><input type='text' style='width:0px;display:none' class='input-small' value='"+value.minbusnum+"' id='minbusnum'/></td>" +
					"<td ><input type='text' style='width:0px;display:none' class='input-small' value='"+value.maxbusnum+"' id='maxbusnum'/></td>" +*/
					"";
					$(tr).html(paramHtml).appendTo("#edit_factoryOrder_parameters");
					$(tr).data("min_busnum",value.minbusnum);
					$(tr).data("max_busnum",value.maxbusnum);
					$(tr).data("production_qty",value.production_qty);
					$(tr).data("factory_order_id",value.factory_order_id);
					$(tr).data("order_detail_id",value.id);
					$(tr).data("busnum_start",value.busnum_start);
					$(tr).data("busnum_end",value.busnum_end);
					
					if(!factory_selectable){
						$(tr).find("select").attr("disabled",true);
					}
	
					original += value.factory_id + ":" + value.production_qty + "_" + value.busnum_start + "|" + value.busnum_end + "," ;
					
				})
				$("#editModal").data("order_id",order_id);
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function getLatestSeris(cur_year){
	var bus_num=0;
	$.ajax({
		url: "order!getLatestBusSeries.action",
		dataType: "json",
		data: {"productive_year" : cur_year},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			bus_num= response.latest_num_start;
		}
	})
	return bus_num;	
}