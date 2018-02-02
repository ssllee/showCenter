	
/************************对外-PC-订单查询***************************/

//页面加载成功后 初始化事件
$(function(){
	//设置面板高度
	//setScreenHeight(".panelA");
	
	
});

/******************************本页面对象*******************************/

//本页面对象
var orderListObj = {
	//变量
	urlSearch: getRootPath_web()+"/test2/list" //  "/js/data/table.json"
	//初始化table数据
	,initTable: function(){
		
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	    	url: orderListObj.urlSearch
	    });
	}
	//表格超链接  订单状态
	,actionFormatter: function(value, row, index) {
		 //var str1 = '<p class="a-p">进行中</p>';
		 return '<p class="a-p finish">已完成</p><a class="showAssess">订单评价</a>';
	}
	//表格超链接 跳转流程查询
	,hrefFormatter: function(value, row, index) {
		return '<a class="showFlow">'+value+'</a>';
	}
	//表格区域  空与非空 切换   flag  1：查询到数据   0：数据为空
	,changeDiv: function(flag) {
		if (flag) {
			$(".a-tableDivEmpty").hide();
			$(".a-tableDiv").show();
		} else {
			$(".a-tableDivEmpty").show();
			$(".a-tableDiv").hide();
		}
		
	}
	//这里可以继续定义function
	
}

/******************************按钮等事件*******************************/

//表格  - 操作 - 事件
window.actionEvents = {
	 //展示流程
	'click .showFlow': function(e, value, row, index) {      
	      var orderNum = row.MENUID;
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/flow-list.html?orderNum="+orderNum);
	      showRightLayer("flow"+orderNum,"流转轨迹",htmlUrl);
    },
    //展示评价
	'click .showAssess' : function(e, value, row, index) {
	      var orderNum = row.MENUID;
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess.html?orderNum="+orderNum);
	      showRightLayer("assess"+orderNum,"订单评价",htmlUrl);
   }
}

// 按手机号和身份证查询
$(".searchPhoneBtn").click(function(){
	orderListObj.changeDiv(1);
	orderListObj.initTable();
});

//按业务号码查询
$(".searchSerialNumberBtn").click(function(){
	orderListObj.changeDiv(0);
});

