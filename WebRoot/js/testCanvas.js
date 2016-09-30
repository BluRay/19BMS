var radius=5
var margin_left=250
var margin_top=20
var digits=[
            [
             [0,0,1,1,1,0,0],
             [0,1,1,0,1,1,0],
             [0,1,1,0,1,1,0],
             [0,1,1,0,1,1,0],
             [0,1,1,0,1,1,0],
             [0,1,1,0,1,1,0],
             [0,0,1,1,1,0,0]
            ],
            [
        	 [0,0,0,1,1,0,0],
             [0,0,1,1,1,0,0],
             [0,1,1,1,1,0,0],
             [0,0,0,1,1,0,0],
             [0,0,0,1,1,0,0],
             [0,0,0,1,1,0,0],
             [0,1,1,1,1,1,0]
        	 ],
        	[
        	 [0,0,1,1,1,0,0],
             [0,1,1,0,1,1,0],
             [0,0,0,0,1,1,0],
             [0,0,0,1,1,0,0],
             [0,0,1,1,0,0,0],
             [0,0,1,1,0,0,0],
             [0,1,1,1,1,1,0]		            	 
        	],        	
        	[
        	 [0,0,1,1,1,0,0],
             [0,1,1,0,1,1,0],
             [0,0,0,0,1,1,0],
             [0,0,0,1,1,0,0],
             [0,0,0,0,1,1,0],
             [0,1,1,0,1,1,0],
             [0,0,1,1,1,0,0]
        	],
        	[
        	 [0,0,0,0,1,0,0],
        	 [0,0,0,1,1,0,0],
        	 [0,0,1,1,1,0,0],
        	 [0,1,0,1,1,0,0],
        	 [0,1,1,1,1,1,0],
        	 [0,0,0,1,1,0,0],
        	 [0,1,1,1,1,1,0]
        	]
        
        ]

function drawClock(){
	var canvas=document.getElementById("first_canvas");
	var context=canvas.getContext("2d");

	drawDigit(2,0,context,'red');
	drawDigit(1,1,context,'blue');
	drawDigit(0,2,context,'yellow');
	drawDigit(4,3,context,'green');
	
	context.beginPath();
	context.moveTo(50,300);
	context.lineTo(500,300);
	context.stroke();
	context.closePath();
}	

function drawDigit(num,pos,context,color){
	context.fillStyle=color;
	var digit_num=digits[num];
	for(var i=0;i<digit_num.length;i++){
		var dlist=digit_num[i];
		//alert(i);
		for(var j=0;j<dlist.length;j++){
			if(dlist[j]==1){
				context.beginPath();
				var x_pos=2*(radius+1)*j+margin_left+(pos*7)*2*(radius+1)+(radius+1);
				var y_pos=2*(radius+1)*i+(radius+1)+margin_top;
				//alert(x_pos+"|"+y_pos);
				context.arc(x_pos,y_pos,radius,0,2*Math.PI);
				context.closePath();
				context.fill();
			}		
		}		
	}
}
