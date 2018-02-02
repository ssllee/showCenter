
/**********************/

$(document).ready(function(){

	//初始化【五星评价】
	orderAssessObj.initServiceRaty();
	orderAssessObj.initConstructRaty();
	orderAssessObj.initFashionRaty();
	orderAssessObj.initaaabbbRaty();
	orderAssessObj.initcccdddRaty();
});

//获取路径中参数
var orderNum = getUrlParam("orderNum");

//本页面对象
var orderAssessObj = {
	//变量-访问路径
	//url: getOutUrl(getRootPath_web(),"/evaluation/submitEvaluation?flag=out&orderNum="+orderNum)
	url: getOutUrl(getRootPath_web(),"/js/data/order-search.json?flag=out&orderNum="+orderNum)
	//获取数据
	,assessSubmit: function() {
		
		var params = $("#submitForm").serialize();
		$.ajax({
		       type : 'POST',//测试  GET  生产POST
		       async : true,
		       url: orderAssessObj.url,
		       data: params,
		       dataType : 'json',
		       /*beforeSend: function () {         
					showLoader();
			   },
			   complete:function(){       
				    hideLoader();
			   },*/
		       success : function(resData) { 
		          if(resData == null) return;
		          if(resData.state == "1") {
		        	  layer.open({
		    			  content: '评价成功！'
		    			  ,style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
		    			  ,time: 3
		    			  ,end: function(e){
		    				  //成功后返回上一页
		    				  goBackUrl(getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-list.html"));
		    				 
		    			  }
    				  });
		          } else {
		        	  layer.open({
		    			  content: '评价失败！'
		    			  ,style: 'background-color:#f7f7f8; width:50%;color:#fc6104; border:none;' //自定风格
		    			  ,time: 3
    				  });
		          }
		       }     
	     });
	}	
	//校验数据
	,checkData: function() {
		var v1 = $('input[name="serviceLevel"]').val();
		var v2 = $('input[name="constructLevel"]').val();
		var v3 = $('input[name="fashionLevel"]').val();
		var v4 = $('input[name="aaabbbLevel"]').val();
		var v5 = $('input[name="cccdddLevel"]').val();
		var comment = $('#comment').val();
		
		if (v1 == "" || v2 == "" || v3 == "" || v4 == "" || v5 == "") {
			layer.open({
			  content: '请选择评价内容'
			  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
			  ,time: 3
			});
			return false;
		} else if (comment == "") {
			layer.open({
			  content: '请填写评价内容'
			  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
			  ,time: 3
			});
			return false;
		} else {
			return true;
		}
		
	}
	//五星评价 -服务态度
	,initServiceRaty: function() {
		$('#demo-service').raty({
			score: 5,//默认选中第5个
	        number: 5, //多少个星星设置
	        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	        path: getRootPath_web()+'/web-phone/images/order',//图片路径
	        hints: ['非常差','差', '一般', '好', '非常好'],
	        starOff: 'a-off.png',
	        starOn: 'a-on.png',
	        target: '#hint-service',//目标div
	        scoreName: "serviceLevel",// 提交表单name
	        cancel: false,
	        targetKeep: true,
	        targetText: '请评分',//无评价提示
	        click: function(score, evt) {
	        }
	    });
	}	
	//五星评价 -施工速度
	,initConstructRaty: function() {
		$('#demo-construct').raty({
			score: 5,//默认选中第5个
	        number: 5, //多少个星星设置
	        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	        path: getRootPath_web()+'/web-phone/images/order',//图片路径
	        hints: ['非常差','差', '一般', '好', '非常好'],
	        starOff: 'a-off.png',
	        starOn: 'a-on.png',
	        target: '#hint-construct',// 目标div
	        scoreName: "constructLevel",// 提交表单name
	        cancel: false,
	        targetKeep: true,
	        targetText: '请评分',//无评价提示
	        click: function(score, evt) {
	        }
	    });
	}
	//五星评价 -服装整齐
	,initFashionRaty: function() {
		$('#demo-fashion').raty({
			score: 5,//默认选中第5个
	        number: 5, //多少个星星设置
	        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	        path: getRootPath_web()+'/web-phone/images/order',//图片路径
	        hints: ['非常差','差', '一般', '好', '非常好'],
	        starOff: 'a-off.png',
	        starOn: 'a-on.png',
	        target: '#hint-fashion',// 目标div
	        scoreName: "fashionLevel",// 提交表单name
	        cancel: false,
	        targetKeep: true,
	        targetText: '请评分',//无评价提示
	        click: function(score, evt) {
	        }
	    });
	}
	//五星评价 - -aaabbb
	,initaaabbbRaty: function() {
		$('#demo-aaabbb').raty({
			score: 5,//默认选中第5个
	        number: 5, //多少个星星设置
	        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	        path: getRootPath_web()+'/web-phone/images/order',//图片路径
	        hints: ['非常差','差', '一般', '好', '非常好'],
	        starOff: 'a-off.png',
	        starOn: 'a-on.png',
	        target: '#hint-aaabbb',// 目标div
	        scoreName: "aaabbbLevel",// 提交表单name
	        cancel: false,
	        targetKeep: true,
	        targetText: '请评分',//无评价提示
	        click: function(score, evt) {
	        }
	    });
	}
	//五星评价 - -cccddd
	,initcccdddRaty: function() {
		$('#demo-cccddd').raty({
			score: 5,//默认选中第5个
	        number: 5, //多少个星星设置
	        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	        path: getRootPath_web()+'/web-phone/images/order',//图片路径
	        hints: ['非常差','差', '一般', '好', '非常好'],
	        starOff: 'a-off.png',
	        starOn: 'a-on.png',
	        target: '#hint-cccddd',// 目标div
	        scoreName: "cccdddLevel",// 提交表单name
	        cancel: false,
	        targetKeep: true,
	        targetText: '请评分',//无评价提示
	        click: function(score, evt) {
	        }
	    });
	}
}

//【发布】
$(".assessSubmit").click(function(){
	if (orderAssessObj.checkData()) {
		orderAssessObj.assessSubmit();
	}
});
