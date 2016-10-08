<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 人事</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/testCanvas.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript">
	$(document).ready(
			function() {
				//drawClock();
				var rect_list=new Array();
				 var canvas = document.getElementById('first_canvas');
				var canvas_w = canvas.width;
				var canvas_h = canvas.height;
				//alert(canvas_w);
				$(canvas).attr("height", 250*2);
				var bw = 20;
				var bh = 30;
				var bgX = 50;//起始X坐标
				var bgY = 50;//起始Y坐标
				var recw = 150;//矩形的宽
				var rech = 70;//矩形高
				var c = document.getElementById("first_canvas");
				var ctx = c.getContext("2d");

				var processlist = [];
				var c1 = {
					'code' : 'HA0',
					'name' : '车架密封'
				}, c2 = {
					'code' : 'HA1',
					'name' : '顶蒙皮低位安装'
				}, c3 = {
					'code' : 'HA2',
					'name' : '骨架合装'
				}, c4 = {
					'code' : 'HA3',
					'name' : '车内骨架安装'
				}, c5 = {
					'code' : 'HA4',
					'name' : '整形'
				}, c6 = {
					'code' : 'HA5',
					'name' : '外蒙皮安装'
				}, c7 = {
					'code' : 'HA6',
					'name' : '内蒙皮粘接'
				}, c8 = {
					'code' : 'HA7',
					'name' : '前围蒙皮安装'
				}, c9 = {
					'code' : 'HA8',
					'name' : '后围蒙皮安装'
				}, c10 = {
					'code' : 'HA9',
					'name' : '侧舱门安装'
				}, c11 = {
					'code' : 'HA10',
					'name' : '收尾、交检'
				};
				processlist.push(c1);
				processlist.push(c2);
				processlist.push(c3);
				processlist.push(c4);
				processlist.push(c5);
				processlist.push(c6);
				processlist.push(c7);
				processlist.push(c8);
				processlist.push(c9);
				processlist.push(c10);
				processlist.push(c11);

				var processlist1 = [];
				var c1 = {
					'code' : 'HB0',
					'name' : '车架密封'
				}, c2 = {
					'code' : 'HB1',
					'name' : '顶蒙皮低位安装'
				}, c3 = {
					'code' : 'HB2',
					'name' : '骨架合装'
				}, c4 = {
					'code' : 'HB3',
					'name' : '车内骨架安装'
				}, c5 = {
					'code' : 'HB4',
					'name' : '整形'
				}, c6 = {
					'code' : 'HB5',
					'name' : '外蒙皮安装'
				}, c7 = {
					'code' : 'HB6',
					'name' : '内蒙皮粘接'
				}, c8 = {
					'code' : 'HB7',
					'name' : '前围蒙皮安装'
				}, c9 = {
					'code' : 'HB8',
					'name' : '后围蒙皮安装'
				}, c10 = {
					'code' : 'HB9',
					'name' : '侧舱门安装'
				}, c11 = {
					'code' : 'HB10',
					'name' : '收尾、交检'
				};
				processlist1.push(c1);
				processlist1.push(c2);
				processlist1.push(c3);
				processlist1.push(c4);
				processlist1.push(c5);
				processlist1.push(c6);
				processlist1.push(c7);
				processlist1.push(c8);
				processlist1.push(c9);
				processlist1.push(c10);
				processlist1.push(c11);
				
				//drawLineProcess("A", processlist);
				//drawLineProcess("B", processlist1);
				
				canvas.onmouseover=function(e){
					this.style.cursor = 'pointer';
				}
				
				canvas.onclick=function(e){
					var p=getEventPosition(e);
					//alert(p.y);
					var x=p.x;
					var y=p.y;
					
					var rect=getRect(x,y);
					if(rect.code){
						//alert(rect.name);
						window.location.href="production!execution.action?factory_id=16&workshop_id=20&line_id=27&process_id=302"
					}
					
				}

				function drawLineProcess(line_name, processlist) {
					//alert(bgY+(rech/2))
					ctx.font = "24px Arial";
					ctx.fillText(line_name, 10, bgY+(rech/2)+12);
					var xi = 1;
					var yi = 1;
					for (var i = 0; i < processlist.length; i++) {
						var obj = processlist[i];
						var code = obj.code;
						var text = obj.name;
						var color = "#A2CFB7";
						var arrow_color = "green";
						var canvas_height = $(canvas).attr("height");

						if (bgX + (recw + bw) * (xi) <= canvas_w) {

							drawProcess(xi, yi, code, text, color);
							if (i < processlist.length - 1) {
								drowArrow(xi, yi, code, text, arrow_color)
							}else{
								bgY=bgY+(rech+bh)*yi
							}
							xi++;
						} else {
							xi = 1;
							yi++;
							drawProcess(xi, yi, code, text, color);
							if (i < processlist.length - 1) {
								drowArrow(xi, yi, code, text, arrow_color)
							}else{
								bgY=bgY+(rech+bh)*yi
							}
							xi++;
							
						}
					}
				}

				function drawProcess(xi, yi, code, text, color) {
					var x_s = bgX + (recw + bw) * (xi - 1);
					var y_s = bgY + (rech + bh) * (yi - 1);
					//alert(x_s+"/"+y_s)
					
					ctx.beginPath();
					ctx.fillStyle = color;
					ctx.fillRect(x_s, y_s, recw, rech);
					ctx.stroke();
					var rect={};
					rect.code=code;
					rect.x=x_s;
					rect.y=y_s;
					rect.name=text;
					rect_list.push(rect);
					ctx.closePath();

					ctx.beginPath();
					ctx.fillStyle = "black";
					ctx.font = "14px Arial";
					ctx.fillText(code,
							((recw - (14 * code.length)) / 2 + 5 + x_s),
							35 + y_s);
					ctx.closePath();
					
					ctx.beginPath();
					ctx.fillStyle = "black";
					ctx.font = "14px Arial";
					ctx.fillText(text, ((recw - (14 * text.length)) / 2 + x_s),
							50 + y_s);
					
					ctx.closePath();

				}

				function drowArrow(xi, yi, code, text, arrow_color) {
					var x_s = bgX + (recw + bw) * (xi - 1);
					var y_s = bgY + (rech + bh) * (yi - 1);
					ctx.beginPath();
					ctx.moveTo(x_s + recw, y_s + rech / 2 - 2.5);
					ctx.lineTo(x_s + recw + bw - 10, y_s + rech / 2 - 2.5);
					ctx.lineTo(x_s + recw + bw - 10, y_s + rech / 2 - 10);
					ctx.lineTo(x_s + recw + bw, y_s + rech / 2 - 1.25);
					ctx.lineTo(x_s + recw + bw - 10, y_s + rech / 2 + 10);
					ctx.lineTo(x_s + recw + bw - 10, y_s + rech / 2 + 2.5);
					ctx.lineTo(x_s + recw, y_s + rech / 2 + 2.5);
					ctx.lineTo(x_s + recw, y_s + rech / 2 - 2.5);
					ctx.strokeStyle = arrow_color;
					ctx.stroke();
					ctx.closePath();
				}
				//得到点击的坐标  
				function getEventPosition(ev){  
				    var x, y;  
				    if (ev.layerX || ev.layerX == 0) {  
				        x = ev.layerX;  
				        y = ev.layerY;  
				    }else if (ev.offsetX || ev.offsetX == 0) { // Opera  
				        x = ev.offsetX;  
				        y = ev.offsetY;  
				    }  
				    return {x: x, y: y};  
				}  
				
				//判断在哪个矩形中
				function getRect(x,y){
					var sidebar=$(".left-sidebar")[0];
					var cvs_left=$(sidebar).width();
					mTop = $(canvas).offset().top;
				    sTop = $(window).scrollTop();
				    var cvs_top = mTop - sTop;
				    //alert(mTop);
				    var r={};
					$.each(rect_list,function(i,rect){
						if(x>=(rect.x+cvs_left+30)&&x<=(rect.x+cvs_left+30)+recw&&y>=(rect.y+cvs_top)&&y<=(rect.y+cvs_top)+rech){
							 r=rect;
							 return;
						}
					});
					return r;
				}

			}); 
</script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">人事</legend>
				<div id="text_test"></div>
			</div>
			<div style="margin-left: 30px;">
			<!-- 	<br /> <img alt="报表示例" src=""> -->
				 <canvas id="first_canvas" width=1100 height=300
					style="border: solid 0px;"> 
					
				</canvas> 
			</div>

		</div>
	</div>
</body>
</html>