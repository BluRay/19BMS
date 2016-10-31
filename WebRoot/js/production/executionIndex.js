var line_process = [];
var workshop_p;
$(document).ready(
			function() {				
				var rect_list=new Array();
				var canvas = document.getElementById('first_canvas');
				var canvas_w = canvas.width;
				var canvas_h = canvas.height;
				var bw = 20;
				var bh = 30;
				var bgX = 50;//起始X坐标
				var bgY = 40;//起始Y坐标
				var recw = 150;//矩形的宽
				var rech = 70;//矩形高
				var c = document.getElementById("first_canvas");
				var ctx = c.getContext("2d");
							
				initPage();
				
				canvas.onmouseover=function(e){
					this.style.cursor = 'pointer';
				}
				
				canvas.onclick=function(e){
					var p=getEventPosition(e);
					//alert(p.x+"/"+p.y);
					var x=p.x;
					var y=p.y;
					
					var rect=getRect(x,y);
					//alert(rect.x+"/"+rect.y);
					if(rect.code&&rect.monitorFlag=='1'){
						//alert(rect.name);
						window.location.href="production!execution.action?factory_id="+rect.factoryId+
						"&workshop_id="+rect.workshopId+"&line_id="+rect.lineId+"&process_id="+rect.processId
					}else{
						alert("该节点未配置为扫描节点！");
					}
					
				}
				
				$("#search_factory").change(function(){
					getWorkshopSelect_Auth2("#search_workshop", "", $("#search_factory :selected").text(), "noall","");
					rect_list=[];
					line_process=ajaxGetLineProcess();
					bgX = 50;//起始X坐标 重置
					bgY = 40;//起始Y坐标 重置
					$(canvas).attr("height",80) //画布高度重置
					drawCanvas(line_process);
				});
				
				$("#search_workshop").change(function(){
					//ctx.clearRect(0,0,$(canvas).attr("width"),$(canvas).attr("height")+100);
					rect_list=[];
					line_process=ajaxGetLineProcess();
					bgX = 50;//起始X坐标 重置
					bgY = 40;//起始Y坐标 重置
					$(canvas).attr("height",80) //画布高度重置
					drawCanvas(line_process);
				});
				
				function initPage(){
					workshop_p=getQueryString("workshop")||"";
					//alert(workshop_p);
					getAuthorityFactorySelect("#search_factory", "", "noall");
					getWorkshopSelect_Auth2("#search_workshop", workshop_p, $("#search_factory :selected").text(), "noall","");
					line_process=ajaxGetLineProcess();
					drawCanvas(line_process);
				}				
				
				function ajaxGetLineProcess(){
					var _line_process=[];
					var conditions="{'factory':'"+$("#search_factory :selected").text()+"','workshop':'"+$("#search_workshop :selected").text()+"'}";
					$.ajax({
						url:"production!getLineProcessList.action",
						type:"post",
						async:false,
						dataType:"json",
						data:{
							"conditions":conditions				
						},
						success:function(response){
							//alert(response.configDoneQty);
							_line_process=response.dataList
						}
					})
					/*var obj={};
					obj.line_id='1';
					obj.line_name='A线';
					obj.factory_id='16';
					obj.workshop_id='20';
					obj.process_list='[{"id":"300","code":"HA0","name":"车架密封"},{"id":"301","code":"HA1","name":"顶蒙皮低位安装"}]';
					_line_process.push(obj);*/
					return _line_process;
					
				}

				function drawCanvas(line_process){
					
					//$(canvas).attr("height", 220*line_process.length);
					var cvs_height=parseFloat($(canvas).attr("height"));
					var line_height=0;
					var lineList=[];
					$.each(line_process,function(index,value){
						var lineId=value.line_id;
						var lineName=value.line_name;
						var factoryId=value.factory_id;
						var workshopId=value.workshop_id;					
						var processlist=JSON.parse(value.process_list);						
						$.each(processlist,function(index,process){
							//var obj=process;
							process.lineId=lineId;
							process.lineName=lineName;
							process.factoryId=factoryId;
							process.workshopId=workshopId;
							line_height+=(rech+bh);
						});
						//alert(line_height);						
						//alert($(canvas).attr("height"));
						var line={};
						line.name=lineName;
						line.processlist=processlist;
						lineList.push(line);
						
					})
					//alert(Math.ceil(line_height/6));
					$(canvas).attr("height",cvs_height+Math.ceil(line_height/6)+bgY);
					$.each(lineList,function(index,line){
						drawLineProcess(line.name, line.processlist);
					})
					
				}
				
				function drawLineProcess(line_name, processlist) {
					//alert(bgY+(rech/2))
					ctx.font = "18px Arial";
					ctx.fillText(line_name, 0, bgY+(rech/2)+10);
					var xi = 1;
					var yi = 1;
					for (var i = 0; i < processlist.length; i++) {
						var process = processlist[i];
						var code = process.code;
						var text = process.name;
						var color = "rgb(150, 200, 150)";
						var arrow_color = "green";
						var canvas_height = $(canvas).attr("height");

						if (bgX + (recw + bw) * (xi) <= canvas_w) {

							drawProcess(xi, yi, process, color);
							if (i < processlist.length - 1) {
								drowArrow(xi, yi,arrow_color)
							}else{
								bgY=bgY+(rech+bh)*yi
							}
							xi++;
						} else {
							xi = 1;
							yi++;
							drawProcess(xi, yi, process, color);
							if (i < processlist.length - 1) {
								drowArrow(xi, yi,arrow_color)
							}else{
								bgY=bgY+(rech+bh)*yi
							}
							xi++;
							
						}
					}
				}

				function drawProcess(xi, yi, process, color) {
					var x_s = bgX + (recw + bw) * (xi - 1);
					var y_s = bgY + (rech + bh) * (yi - 1);
					//alert(x_s+"/"+y_s)
					
					ctx.beginPath();
					ctx.fillStyle =process.monitor_flag=='1'?'#8FC7F6':color;
					ctx.fillRect(x_s, y_s, recw, rech);
					ctx.stroke();
					var rect={};
					rect.code=process.code;
					rect.x=x_s;
					rect.y=y_s;
					rect.name=process.name;
					rect.processId=process.id;
					rect.workshopId=process.workshopId;
					rect.lineId=process.lineId;
					rect.factoryId=process.factoryId;
					rect.monitorFlag=process.monitor_flag;
					rect_list.push(rect);
					ctx.closePath();

					ctx.beginPath();
					ctx.fillStyle = "black";
					ctx.font = "12px Arial";
					ctx.fillText(rect.code,
							((recw - (6 * rect.code.length)) / 2  + x_s),
							35 + y_s);
					ctx.closePath();
					
					ctx.beginPath();
					ctx.fillStyle = "black";
					ctx.font = "12px Arial";
					ctx.fillText(rect.name, ((recw - (12 * rect.name.length)) / 2+3 + x_s),
							50 + y_s);
					
					ctx.closePath();

				}

				function drowArrow(xi, yi,arrow_color) {
					var x_s = bgX + (recw + bw) * (xi - 1);
					var y_s = bgY + (rech + bh) * (yi - 1);
					ctx.beginPath();
					ctx.moveTo(x_s + recw, y_s + rech / 2 - 2.5);
					ctx.lineTo(x_s + recw + bw - 10, y_s + rech / 2 - 2.5);
					ctx.lineTo(x_s + recw + bw - 10, y_s + rech / 2 - 8);
					ctx.lineTo(x_s + recw + bw, y_s + rech / 2);
					ctx.lineTo(x_s + recw + bw - 10, y_s + rech / 2 + 8);
					ctx.lineTo(x_s + recw + bw - 10, y_s + rech / 2 + 2.5);
					ctx.lineTo(x_s + recw, y_s + rech / 2 + 2.5);
					ctx.lineTo(x_s + recw, y_s + rech / 2 - 2.5);
					ctx.strokeStyle = arrow_color;
					ctx.stroke();
					ctx.closePath();
				}
				//得到点击的坐标  
				function getEventPosition(event){  
				    var x, y;  
				   /* if (ev.layerX || ev.layerX == 0) {  
				        x = ev.layerX;  
				        y = ev.layerY;  
				    }else if (ev.offsetX || ev.offsetX == 0) { // Opera  
				        x = ev.offsetX;  
				        y = ev.offsetY;  
				    }  */
				    var e = event || window.event;
		            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		            var x = e.pageX || e.clientX + scrollX;
		            var y = e.pageY || e.clientY + scrollY;
			
				    return {x: x, y: y};  
				}  
				
				//判断在哪个矩形中
				function getRect(x,y){
					var sidebar=$(".left-sidebar")[0];
					var cvs_left=$(sidebar).width();
					mTop = $(canvas).offset().top;
				    sTop = $(window).scrollTop();
				    var cvs_top = mTop - sTop;
				   // alert("cvs_left:"+cvs_left+"/mTop:"+mTop+"/sTop:"+sTop);

				    var r={};
					$.each(rect_list,function(i,rect){
						//alert(x+"/"+((rect.x+cvs_left+30)));
						if(x>=(rect.x+cvs_left+30)&&x<=(rect.x+cvs_left+30)+recw&&y>=(rect.y+cvs_top+sTop)&&y<=(rect.y+cvs_top+sTop)+rech){
							 r=rect;
							 return;
						}
					});
					return r;
				}

			}); 