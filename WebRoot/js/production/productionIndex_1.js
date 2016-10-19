var user_staff=null;//add by wuxiao 当前用户员工信息 2016/4/22
$(document).ready(function () {
	initPage();
	setInterval(function () {
		ajaxQuery();
	},1000*60*5);
	
	function initPage(){
		getAuthorityFactorySelect("#search_factory", "", "noall");
		user_staff = getStaffInfo1();		//add by wuxiao 获取当前用户员工信息 2016/4/22
		ajaxQuery();
	}
	
})
	function ajaxQuery(){
		var factoryId=$("#search_factory").val();
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			url : "common!getProductionIndexData.action",
			async :false,
			data : {
				"factoryId" : factoryId,
			},
			success : function(response) {
				if(response.dataList){
					$.each(response.dataList,function(i,data){
						if(data.process_node=='焊装上线'){
							if(data.line.indexOf('A')>0){
								$("#node-online-w-a").html(data.process_num);
							}
							if(data.line.indexOf('B')>0){
								$("#node-online-w-b").html(data.process_num);
							}
						}
						if(data.process_node=='焊装下线'){
							if(data.line.indexOf('A')>0){
								$("#node-offline-w-a").html(data.process_num);
							}
							if(data.line.indexOf('B')>0){
								$("#node-offline-w-b").html(data.process_num);
							}
						}
						
						if(data.process_node=='涂装上线'){
							if(data.line.indexOf('A')>0){
								$("#node-online-p-a").html(data.process_num);
							}
							if(data.line.indexOf('B')>0){
								$("#node-offline-p-b").html(data.process_num);
							}
						}
						if(data.process_node=='涂装下线'){
							if(data.line.indexOf('A')>0){
								$("#node-offline-p-a").html(data.process_num);
							}
							if(data.line.indexOf('B')>0){
								$("#node-offline-p-b").html(data.process_num);
							}
						}
						
						if(data.process_node=='底盘上线'){
							if(data.line.indexOf('A')>0){
								$("#node-online-p-a").html(data.process_num);
							}
							if(data.line.indexOf('B')>0){
								$("#node-offline-p-b").html(data.process_num);
							}
						}
						if(data.process_node=='底盘下线'){
							if(data.line.indexOf('A')>0){
								$("#node-offline-p-a").html(data.process_num);
							}
							if(data.line.indexOf('B')>0){
								$("#node-offline-p-b").html(data.process_num);
							}
						}
						
						if(data.process_node=='总装上线'){
							if(data.line.indexOf('A')>0){
								$("#node-online-a-a").html(data.process_num);
							}
							if(data.line.indexOf('B')>0){
								$("#node-offline-a-b").html(data.process_num);
							}
						}
						if(data.process_node=='总装下线'){
							if(data.line.indexOf('A')>0){
								$("#node-offline-a-a").html(data.process_num);
							}
							if(data.line.indexOf('B')>0){
								$("#node-offline-a-b").html(data.process_num);
							}
						}
						
						if(data.process_node=='入库'){
							$("#node-warehouse").html(data.process_num);
						}
						
						if(data.process_node=='焊装在制'){
							$("#node-prod-w").html(data.process_num);
						}
						
						if(data.process_node=='涂装在制'){
							$("#node-prod-p").html(data.process_num);
						}
						
						if(data.process_node=='底盘在制'){
							$("#node-prod-b").html(data.process_num);
						}
						
						if(data.process_node=='总装在制'){
							$("#node-prod-a").html(data.process_num);
						}
						
						if(data.process_node=='WIP_WP'){
							$("#node-wip-1").html(data.process_num);
						}
						
						if(data.process_node=='WIP_PC'){
							$("#node-wip-2").html(data.process_num);
						}
						
						if(data.process_node=='WIP_CA'){
							$("#node-wip-3").html(data.process_num);
						}
					})
				}
			}
		});
	}

/**
	 * 点击车间判断是否有该车间的扫描权限，有就跳转到对应车间生产执行页面
	 */
	function executionFoward(workshop){
		if(user_staff.workshops!=null && user_staff.workshops.indexOf(workshop)>=0){
			window.location.href='production!executionindex.action?workshop='+workshop;
		}else{
			alert("对不起，您没有该车间扫描权限！");
		}
	}

/**
 *	监控图页面跳转
 */
function monitorFoward(workshop){
	window.location.href='production!monitorworkshop.action?workshop='+workshop+'&factory='+$("#search_factory").val();
}

function imgFoward(name){
	if(name=='铭牌'){
		window.location.href='production!showNameplatePrint.action';
	}
	if(name=='合格证'){
		window.location.href='production!certification.action';
	}
	if(name=='发车'){
		window.location.href='busDispatch!planListPage.action';
	}
	if(name=='车身号'){
		window.location.href='production!showBusNoPrint.action';
	}
	if(name=='车身颜色'){
		window.location.href='production!bodycolor.action';
	}
	if(name=='VIN'){
		window.location.href='production!showVinPrint.action';
	}
	if(name=='座位数'){
		window.location.href='production!busseats.action';
	}
}