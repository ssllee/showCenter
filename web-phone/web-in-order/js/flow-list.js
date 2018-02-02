
/**********************/
/*******手机端订单流转轨迹***********/

$(document).ready(function(){
	$("#sysCode").val('');
	$("#jobName").val('');
	//alert(1);
});
//本页面对象
var testTbObj = {
	// 变量
	urlSearch: getRootPath_web()+"/js/data/inflow-table.json"
	//urlSearch: getRootPath_web()+"/test2/list"
	// 初始数据
	,initTable: function(){
		//var orderNum = $("#orderNum").val();
		var sysCode = $("#sysCode").val();
		var jobName = $("#jobName").val();
		//var createDate = $("#createDate").val();
		//流程展示内容
		//订单流程名称
		
		$.ajax({
		       type : 'GET',
		       async : true,
		       //url: getRootPath_web()+"/test2/list_two?page="+page+"&rows="+limit+"&order=asc&sort=menuid",
		       url: testTbObj.urlSearch,
		       dataType : 'json',
		       //显示加载图标
		       beforeSend: function () {         
					showLoader();
			   },
		      success:function(data){
		    	    $("#loader").remove();
	    			var showContent;
	    	 //遍历循环json数组
	                $.each(data.rows,function(index, content){
	    	//动态添加展示结果
	                	showContent = "<ul class=\"content\">"
	                		 +"<li><div class=\"div1\">派单时间：</div><div class=\"div2\">"+content.CREATEDATE+"</div></li>"
	                	     +"<li><div class=\"div1\">归属系统：</div><div class=\"div2\">"+content.SYSCODE+"</div></li>"
	                	     +"<li><div class=\"div1\">环节名称：</div><div class=\"div2\">"+content.JOBNAME +"</div></li>"
	                	     +"<li><div class=\"div1\">处理人：</div><div class=\"div2\">"+content.STAFFNAME+"</div></li>"
	                	     +"<li><div class=\"div1\">处理人电话：</div><div class=\"div2\">"+content.STAFFTEL+"</div></li>"
	                	     +"<li><div class=\"div1\">处理时间：</div><div class=\"div2\">"+content.ENDDATE+"</div></li>"
	                	     +"<li><div class=\"div1\">环节状态：</div><div class=\"div2\">"+content.JOBSTATE+"</div></li>"
	                	     +"<li><div class=\"div1\">退单原因：</div><div class=\"div2\">"+content.FAILRESULT+"</div></li></ul>";
	    	        $("#show").append(showContent);
	         });
	         // alert(data);
		   }
		});
	 }
};


//【查询】按钮
$(".submitBtn").click(function(){
	//查询前先清空之前的查询结果
	$("#show").empty();
	testTbObj.initTable();
});
//【重置】按钮
$(".resetBtn").click(function(){
	$("#sysCode").val('');
	$("#jobName").val('');
	$("#show").empty();
});

