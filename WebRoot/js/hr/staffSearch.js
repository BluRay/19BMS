$(document).ready(function(){
	initPage();
	function initPage(){

	}
	
	$("#btnQuery").click(function(){

		if($("#").val()==""){
			alert("");
			$("#").focus();
			return false;
		}
		
		ajaxQuery();
		return false;
	});
	
})


function ajaxQuery(targetPage){
	
}