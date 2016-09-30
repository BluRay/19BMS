$(document).ready(function () {	
	initPage();
	function initPage(){
		var title = "售后问题 | <a href='afterSale!queryAfterSaleProblems.action' target='_blank'>问题明细</a>";
		var subtitle = "各工厂问题总数";
		var categories = ['一月', '二月', '三月', '四月', '五月', '六月',  
		                  '七月', '八月', '九月', '十月', '十一月', '十二月'];
		var series = [{  
	        name: '长沙工厂',  
	        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]  
	    }, {  
	        name: '南京工厂',  
	        data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]  
	    }, {  
	        name: '杭州工厂',  
	        data: [0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]  
	    }, {  
	        name: '大连工厂',  
	        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]  
	    }];
		var yAxis={title:{
			text:'问题数'
		}};
		drawChart("#containerReport",'column',title,subtitle,null,categories,yAxis,series);
	}
});

