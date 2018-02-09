	
/*************对外-PC-订单评价*********/

$(document).ready(function(){

	//初始化【五星评价】
	orderAssessObj.initServiceRaty();
	orderAssessObj.initConstructRaty();
	orderAssessObj.initFashionRaty();
	orderAssessObj.initaaabbbRaty();
	orderAssessObj.initcccdddRaty();
	//兼容ie
	placeholder("#comment");
});

//获取路径中参数
var orderNum = getUrlParam("orderNum");

//本页面对象
var orderAssessObj = {
	//变量-访问路径
	url: getOutUrl(getRootPath_web(),"/evaluation/submitEvaluation?flag=out&orderNum="+orderNum)
	//获取数据
	,assessSubmit: function() {
		
		var params = $("#submitForm").serialize();
		$.ajax({
		       type : 'POST',//测试  GET  生产POST
		       async : true,
		       url: orderAssessObj.url,
		       data: params,
		       dataType : 'json',
		       success : function(resData) { 
		          if(resData == null) return;
		          if(resData.state == "1") {
		        	    layer.msg('评价成功！', {
		        		  time: 2000 //2s后自动关闭
		        		  ,shadeClose: false
		        		  ,shade:0.8
		        		  ,end: function(e){
		        			  //当你在iframe页面关闭自身时
		        			  var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		        			  parent.layer.close(index); //再执行关闭 
		    			  }
		        		});
		        	  
		          } else {
		        	  layer.msg('评价失败！', {
		        			time: 2000 //2s后自动关闭
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
		var v4 = $('input[name="extLevel1"]').val();
		var v5 = $('input[name="extLevel2"]').val();
		var comment = $('#comment').val();
		
		if (v1 == "" || v2 == "" || v3 == "" || v4 == "" || v5 == "") {
			layer.msg('请选择评价内容', {
		        time: 2000 //2s后自动关闭
		    });
			return false;
		} else if (comment == "") {
			layer.msg('请填写评价内容', {
		        time: 2000 //2s后自动关闭
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
	        path: getRootPath_web()+'/images/order',//图片路径
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
	        path: getRootPath_web()+'/images/order',//图片路径
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
	        path: getRootPath_web()+'/images/order',//图片路径
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
	//五星评价 - -extLevel1
	,initaaabbbRaty: function() {
		$('#demo-extLevel1').raty({
			score: 5,//默认选中第5个
	        number: 5, //多少个星星设置
	        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	        path: getRootPath_web()+'/images/order',//图片路径
	        hints: ['非常差','差', '一般', '好', '非常好'],
	        starOff: 'a-off.png',
	        starOn: 'a-on.png',
	        target: '#hint-extLevel1',// 目标div
	        scoreName: "extLevel1",// 提交表单name
	        cancel: false,
	        targetKeep: true,
	        targetText: '请评分',//无评价提示
	        click: function(score, evt) {
	        }
	    });
	}
	//五星评价 - -extLevel2
	,initcccdddRaty: function() {
		$('#demo-extLevel2').raty({
			score: 5,//默认选中第5个
	        number: 5, //多少个星星设置
	        targetType: 'hint', //类型选择，number是数字值，hint，是设置的数组值
	        path: getRootPath_web()+'/images/order',//图片路径
	        hints: ['非常差','差', '一般', '好', '非常好'],
	        starOff: 'a-off.png',
	        starOn: 'a-on.png',
	        target: '#hint-extLevel2',// 目标div
	        scoreName: "extLevel2",// 提交表单name
	        cancel: false,
	        targetKeep: true,
	        targetText: '请评分',//无评价提示
	        click: function(score, evt) {
	        }
	    });
	}
}

//【提交】
$(".assessSubmit").click(function(){
	if (orderAssessObj.checkData()) {
		orderAssessObj.assessSubmit();
	}
});

//【取消】
$(".assessReset").click(function(){
	//$("#submitForm").resetForm();
	reloadPage();
});
