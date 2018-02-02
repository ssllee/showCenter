
/*************对外 流程查询*********/

$(document).ready(function(){
	flowListObj.showNum();
	flowListObj.getDate();
});

//获取路径中参数
var orderNum = getUrlParam("orderNum");

//本页面对象
var flowListObj = {
	//变量-访问路径
	//url: getOutUrl(getRootPath_web(),"/process/queryProcess?flag=out&orderNum="+orderNum)
	url: getOutUrl(getRootPath_web(),"/js/data/flow.json?flag=out&orderNum="+orderNum)
	//获取数据
	,getDate: function() {
		$.ajax({
		       type : 'GET',//测试  GET  生产POST
		       async : true,
		       url: flowListObj.url,
		       dataType : 'json',
		       beforeSend: function () {         
					showLoader();
			   },
			   complete:function(){       
				    hideLoader();
			   },
		       success : function(resData) { 
		          if(resData == null) return;
		          flowListObj.makeFlowArea(resData);
		       }     
	     });
	}
	//展示数据
	,makeFlowArea: function(data) {
		var opt = {
			"jsonDate": data,//json数据
			"imgSrcStart": "../../../web-phone/images/order/f1.png",//最新流程节点图片（第一个节点）
			"imgSrcOther": "../../../web-phone/images/order/f2.png",//其它流程节点图片
			"imgClass": "firstImg" //图片宽高
		};
		
		$(".flowtest").flowplugin(opt);
	}
	//展示订单号
	,showNum: function() {
		var num = (orderNum == "" || orderNum == null) ? "" : orderNum;
		$(".showNumber").html(num);
	}
};



