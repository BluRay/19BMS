
$(document).ready(function() {
	initPage();
	
	if(getQueryString("changepwd")=="1"){
		$("#passwordModal").modal("show");
	}
	
	//切换工厂获取部门列表
	$("#newFactory").change(function(){
		getDepartSelect("#newDepart","",$(this).val(),"empty");
	});
	$("#editFactory").change(function(){
		getDepartSelect("#editDepart","",$(this).val(),"empty");
	});
	$("#queryFactory").change(function(){
		getDepartSelect("#queryDepart","",$(this).val(),"empty");
	});
	$("#reviseFactory").change(function(){
		getDepartSelect("#reviseDepart","",$(this).val(),"empty");
	});
	//个人信息修改
	$("#btnSelfModify").click(function(){
		$("#selfModifyForm").ajaxSubmit({
			url:"account!updateSelfAccount.action",
			type: "post",
			dataType:"json",
			data:{},
			success:function(response){
				alert(response.message);
				if(response.success){
					$("#emailModal").modal("hide");
					location.reload();
				}						
			}			
		});
	});
	//修改密码 
	$("#btnPasswordChange").click(function(){
		var flag=true;
		var new_pwd=$("#inputPasswordNew").val();
		var confirm_pwd=$("#inputPasswordConfirm").val();
		if(new_pwd!=confirm_pwd){
			alert("密码输入不一致!");
			flag=false;
			return false;
		}
		if(new_pwd.trim().length==0){
			alert("请输入密码！");
			flag=false;
			return false;
		}
		if(checkPass(confirm_pwd)<2){
	        alert("密码复杂度不够，请重新设置！\n1、密码至少6位\n2、密码必须是字母大写，字母小写，数字，特殊字符中任意两个组合。");
	        flag=false;
	        return false;
		}
		if(flag){
			$("#passwordForm").ajaxSubmit({
				url:"account!updateSelfAccount.action",
				type: "post",
				dataType:"json",
				data:{},
				success:function(response){
					alert(response.message);
					if(response.success){
						$("#passwordModal").modal("hide");
						//location.reload();
						location.replace("/19bms/account!accountCenter.action");
					}						
				}			
			});
		}
		
	});
	//新增用户
	$("#btnAdd").click(function() {
		if($("#newCardNumber").val().trim().length==0){
			alert("请输入工号！");
		}else if($("#newDisplayName").val().trim().length==0){
			alert("请输入用户名！");
		}/*else if($("#newFactory").val().trim().length==0){
			alert("请选择工厂！");
		}else if($("#newDepart").val().trim().length==0){
			alert("请选择部门！");
		}*/else{
			$("#newAccountForm").ajaxSubmit({
				url:"account!addAccount.action",
				type: "post",
				dataType:"json",
				data:{},
				success:function(response){
					alert(response.message);
					if(response.success){
						$("#newModal").modal("hide");
						emptyNewModal();
						ajaxQuery($("#cur").attr("page"));
					}						
				}			
			});
		}
		
	});
	//初始化密码
	$(".optReset").live("click",function(){
		if(confirm("是否初始化账号“" + $(this).closest("tr").data("cardNumber") +"”密码为工号？")){
			resetPwd($(this).closest("tr").data("userId"));
		}
	});
	//点击查询，查询用户
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	//编辑用户信息
	$(".optModify").live("click",function(){
		var tr=$(this).closest("tr");
		var tds=$(tr).children("td");
		$("#editCardNumber").val($(tds[0]).html());
		$("#editDisplayName").val($(tr).data("userName"));
		$("#editCard8H10D").val($(tr).data("card_8H10D"));
		$("#editEmail").val($(tds[2]).html());
		$("#editCellPhone").val($(tds[3]).html());
		$("#editTelephone").val($(tds[4]).html());
		//$("#editFactory").val($(tr).data("facotryId"));
		getFactorySelect("#editFactory",$(tr).data("facotryId"),"empty","0");
		//$("#editDepart").val($(tr).data("departmentId"));
		getDepartSelect("#editDepart",$(tr).data("departmentId"),$(tr).data("facotryId"),"empty");
		if($(tr).data("admin")=='0'){
			$("#editModal input[name='account.admin']").eq(1).attr("checked",'checked'); 
		}
		if($(tr).data("admin")=='1'){
			/*var radios=$("#editModal input[name='account.admin']");*/
			$("#editModal input[name='account.admin']").eq(0).attr("checked",'checked'); 
		}
		$("#editUserId").val($(tr).data("userId"));
		
		$("#editModal").modal("show");
	});
	//确认编辑用户信息
	$("#btnEdit").click(function(){
		if($("#editCardNumber").val().trim().length==0){
			alert("请输入工号！");
		}else if($("#editDisplayName").val().trim().length==0){
			alert("请输入用户名！");
		}/*else if($("#editFactory").val().trim().length==0){
			alert("请选择工厂！");
		}else if($("#editDepart").val().trim().length==0){
			alert("请选择部门！");
		}*/else{			
			$("#editAccountForm").ajaxSubmit({
				url:"account!updateAccount.action",
				type: "post",
				dataType:"json",
				data:{},
				success:function(response){
					alert(response.message);
					if(response.success){
						$("#editModal").modal("hide");
						ajaxQuery($("#cur").attr("page"));
					}						
				}			
			});
		}
	});
	// 全选、反选
	$(".checkall").live("click", function() {
		// alert($("#checkall").attr("checked"));
		var modal=($(this).attr("id").split("_"))[1];
		//alert(modal);
		if ($(this).attr("checked") == "checked") {
			check_All_unAll("#auth_"+modal+"_table", true);
		} else {
			check_All_unAll("#auth_"+modal+"_table", false);
		}

	});
	//编辑用户权限
	$(".optRight").live("click",function(){
		var tr=$(this).closest("tr");
		var tds=$(tr).children("td");
		var userName=$(tds[1]).html();
		$("#auth_user").html("权限编辑-"+userName);
		ajaxQueryAuth($(tr).data("userId"));
		
/*		$("select").multiselect({     
		    noneSelectedText: "==请选择==",  
		    checkAllText: "全选",  
		    uncheckAllText: '全不选',  
		    selectedList:10  
		    });*/
		
		
	});
	
	//权限保存
	$("#btnAuthSave").click(function(){
		var chcklist=$("#assignForm :checked");
		var authlist=[];
		$.each(chcklist,function(index,cbox){
			if($(cbox).attr("class")!="checkall"){
				var auth={};
				auth.user_id=$("#authModal").data("userId");
				auth.role_id=$(cbox).val();
				var tds=$(cbox).closest("tr").children("td");
				var factory=$(tds[1]).find("input").val();
				var workshop=$(tds[2]).find("input").val();
				auth.factory=factory.replace(new RegExp('，', 'g'), ',');
				auth.workshop=workshop.replace(new RegExp('，', 'g'), ',');
				authlist.push(auth);	
			}
					
		});
		//alert(JSON.stringify(authlist));
		$.ajax({
			url:"account!assignAuth.action",
			type:"post",
			dataType:"json",
			data:{
				"authList":JSON.stringify(authlist),
				"account.id":$("#authModal").data("userId")
			},
			success:function(response){
				alert(response.message);
				$("#authModal").modal("hide");
				ajaxQuery($("#cur").attr("page"));
			}
		
		});
		
	});
	//删除用户
	$(".optDelete").live("click",function(){
		if(confirm("是否删除账号“" + $(this).closest("tr").data("cardNumber") +"”?")){
			ajaxDelete($(this).closest("tr").data("userId"));
		}
	});
});
function initPage() {
	/* $('.multiselect').multiselect({numberDisplayed: 5});*/ //下拉列表多选组件初始化
	getFactorySelect("#newFactory","","empty","0");
	getFactorySelect("#queryFactory","","empty","");
	getFactorySelect("#reviseFactory",$("#userFactory").html(),"empty","");

	pageSize = 10;// 设置每一页显示行数
	var adminThing_html = $("#adminThing").html();
	if (adminThing_html != undefined || adminThing_html != "") {
		ajaxQuery(1);
	}
}



//ajax 查询用户列表
function ajaxQuery(targetPage) {
	var q_cardNumber = $("#queryCardNumber").val();
	var q_username = $("#queryUsername").val();
	var q_email = $("#queryEmail").val();
	var q_factoryId = $("#queryFactory").val();
	var q_departmentId = $("#queryDepart").val();
	var conditions = "{";
	conditions += "'cardNumber':'" + q_cardNumber + 
	              "','userName':'"+ q_username + 
	              "','email':'" + q_email +
	              "','factory_id':'" + q_factoryId +
	              "','department_id':'" + q_departmentId +"'}";
	$
			.ajax({
				url : "account!getAccountsList.action",
				type : "post",
				dataType : "json",
				data : {
					"conditions" : conditions,
					"pager.pageSize" : 10,
					"pager.curPage" : targetPage || 1
				},
				success : function(response) {
					$("#resultTable tbody").html("");
					$
							.each(
									response.dataList,
									function(index, value) {
										var tr = $("<tr />");
										$("<td />").html(value.card_number)
												.appendTo(tr);
										$("<td />").html(value.username)
												.appendTo(tr);
										$("<td />").html(value.email)
												.appendTo(tr);
										$("<td />").html(value.cellphone)
												.appendTo(tr);
										$("<td />").html(value.telephone)
												.appendTo(tr);
										$("<td />").html(value.factory_name)
												.appendTo(tr);
										$("<td />").html(value.department)
												.appendTo(tr);
										var optionTd = $("<td />");
						    			var groupDiv = $("<div />", {
						    				'class' : 'btn-group'
						    			})
						    			$("<input />", {
						    				'type' : 'button',
						    				"class" : "btn btn-primary btn-small optReset",
						    				'value' : "初始化密码"
						    			}).appendTo(groupDiv);
						    			$("<input />", {
						    				'type' : 'button',
						    				"class" : "btn btn-small optModify",
						    				'value' : "用户信息"
						    			}).appendTo(groupDiv);
						    			$("<input />", {
						    				'type' : 'button',
						    				"class" : "btn btn-warning btn-small optRight",
						    				'value' : "权限编辑"
						    			}).appendTo(groupDiv);
						    			$("<input />", {
						    				'type' : 'button',
						    				"class" : "btn btn-danger btn-small optDelete",
						    				'value' : "账号删除"
						    			}).appendTo(groupDiv);

						    			groupDiv.appendTo(optionTd);
						    			optionTd.appendTo(tr);
										$(tr).data("userId", value.id);
										$(tr).data("cardNumber", value.card_number);
										$(tr).data("userName", value.username);
										$(tr).data("admin",value.admin);
										$(tr).data("card_8H10D", value.card_8H10D);
										$(tr).data("facotryId", value.factory_id);
										$(tr).data("departmentId", value.department_id);
										$("#resultTable tbody").append(tr);
									});
					$("#tableResult").show();
					$("#total").html(response.pager.totalCount);
					$("#total").attr("total", response.pager.totalCount);
					$("#cur").attr("page", response.pager.curPage);
					$("#cur").html(
							"<a href=\"#\">" + response.pager.curPage + "</a>");
					$("#pagination").show();
				}
			})
}

//初始化密码
function resetPwd(userId){
	$.ajax({
		url : "account!resetPassword.action",
		type : "post",
		dataType : "json",
		data : {
			"account.id":userId
		},
		success : function(response) {
			alert(response.message);
		}
	})
}
//删除用户
function ajaxDelete(userId){
	$.ajax({
		url : "account!updateAccount.action",
		type : "post",
		dataType : "json",
		data : {
			"account.id":userId,
			"account.isdelete":"1"
		},
		success : function(response) {
			alert(response.message);
			if(response.success){
				ajaxQuery($("#cur").attr("page"));
			}
			
		}
	})
}
//查询角色列表
function ajaxQueryAuth(userId){
	$.ajax({
		url : "account!getAuthListByUserId.action",
		type : "post",
		dataType : "json",
		data : {
			"account.id":userId
		},
		success : function(response) {
			var authList= response.dataList;
			$("#auth_account_table").html("");
			$("#auth_order_table").html("");
			$("#auth_plan_table").html("");
			$("#auth_execution_table").html("");
			$("#auth_ecn_table").html("");
			$("#auth_quality_table").html("");
			$("#auth_aftersale_table").html("");
			$("#auth_cost_table").html("");
			$("#auth_setting_table").html("");
			$("#auth_report_table").html("");
			$("#auth_hr_table").html("");
			var checkarr={"account":0,"order":0,"plan":0,"execution":0,"ecn":0,"quality":0,"aftersale":0,"cost":0,"setting":0,"hr":0};
			var checkedarr={"account":0,"order":0,"plan":0,"execution":0,"ecn":0,"quality":0,"aftersale":0,"cost":0,"setting":0,"hr":0};
			var factoryOptions=$("#newFactory").html();
			//alert(factoryOptions);
			
			$.each(authList,function(index,value){
				//alert(value.role_name);
				
				var tr=$("<tr />");
				var checkInput="";
				var factory=value.factory==undefined?"":value.factory;
				var workshop=value.workshop==undefined?"":value.workshop;
				if(value.auth_flag=="authed"){
					checkedarr[value.model_flag]+=1;
					checkarr[value.model_flag]+=1;
					//alert(checkedarr[value.model_flag]);
					checkInput="<label class=\"checkbox\"><input checked=\"checked\" value=\""+
					value.id+"\" type=\"checkbox\">"+value.role_name+"</label>";
				}else{
					checkarr[value.model_flag]+=1;
					checkInput="<label class=\"checkbox\"><input  value=\""+
					value.id+"\" type=\"checkbox\">"+value.role_name+"</label>";
				}
				$("<td width=20%/>").html(checkInput).appendTo(tr);
			/*	placeholder='输入工厂,多个工厂以逗号隔开,例如：长沙工厂';
				 placeholder='输入车间,多个车间以逗号隔开,例如：焊装,涂装'*/
				$("<td width=40%/>").html("工厂：<input type='text'  class='input-large' style='width:85%' value='"
						+factory+"'>").appendTo(tr);
				$("<td width=40%/>").html("车间：<input type='text'  class='input-large' style='width:85%' value='"
						+workshop+"'>").appendTo(tr);
				/*$("<td />").html("<select id='auth_factory_"+index+"' class='input-large' multiple=\"multiple\">"+factoryOptions+"</select>").appendTo(tr);*/
				$("#auth_"+value.model_flag+"_table").append(tr);
				
			/*	$('#auth_factory_'+index).multiselect({
			         buttonWidth: '150px',
			         buttonContainer: '<div class="btn-group input-medium btn-select " />',
			         dropUp: true
			     });*/
				if(checkedarr[value.model_flag]==checkarr[value.model_flag]){
					/*alert(checkedarr[value.model_flag]+"/"+checkarr[value.model_flag]);*/
					$("#cbox_"+value.model_flag).attr("checked",true);
				}else{
					$("#cbox_"+value.model_flag).attr("checked",false);
				}
				//getFactorySelect("#multiselect_"+index,"","noall"); 
			});
			$("#authModal").data("userId",userId);
			$("#authModal").modal("show");
			
		}
	});
}
//清空新增用户modal
function emptyNewModal(){
	$("#newCardNumber").val("");
	$("#newDisplayName").val("");
	$("#newCard8H10D").val("");
	$("#newEmail").val("");
	$("#newCellPhone").val("");
	$("#newTelephone").val("");
	$("#newFactory").val("");
	$("#newDepart").val("");
}

function checkPass(s){
	 
	  if(s.length < 6){
	            return 0;
	  }
	 var ls = 0;
	 if(s.match(/([a-z])+/)){
	 
	     ls++;
	 
	  }
	 if(s.match(/([0-9])+/)){
	       ls++; 
	 }
	 if(s.match(/([A-Z])+/)){
	      
	        ls++;
	 
	  }
	  if(s.match(/[^a-zA-Z0-9]+/)){
	        ls++;
	   
	    }
	        return ls
	 
	 }

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	} 


	 