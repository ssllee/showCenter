
/*********************对外-手机-订单列表*************************/
		

$(document).ready(function(){	
	loadListDate();
});

function loadListDate() {
	//var orderListUrl = getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out"+getOrderQueryStr());
	var orderListUrl = getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"+getOrderQueryStr());
	$.ajax({
	       type : 'GET',//测试  GET  生产POST
	       async : true,
	       url: orderListUrl,
	       dataType : 'json',
	       beforeSend: function () {         
				showLoader();
		   },
		   complete:function(){       
			    hideLoader();
		   },
	       success : function(resData) { 
	          if(resData == null) return;
	          var state = resData.state;//1:有流程    0：没有    -1：系统报错
	          if(state == 1) {
	        	  getListDate(resData.rows);
	          } else {
	        	  layer.open({
	    			  content: '没有查到数据！'
	    			  ,style: 'background-color:#f7f7f8; width:80%;color:#323232; border:none;' //自定风格
	    			  ,time: 3
				  });
	          }
	          
	       }     
  });
}

//下拉到底，加载数据
function getListDate(data) {
		  
		  $.each(data, function(index,item) {  
				  //订单状态statusFlag : N：未启动，R：运行中，F：撤单，S：成功
				  //评价状态commentSate：   1-已评价 0-未评价
			  
			      var orderNum = checkNullOrEmptyStr(item.orderNum) ? "" :  item.orderNum;
			      var statusFlag =  checkNullOrEmptyStr(item.statusFlag) ? "" :  item.statusFlag;
			      var commentState = checkNullOrEmptyStr(item.commentState) ? "" :  item.commentState;
			      var productName = checkNullOrEmptyStr(item.productName) ? "" :  item.productName;
			      var customerName = checkNullOrEmptyStr(item.customerName) ? "" :  item.customerName;
			      var addrName = checkNullOrEmptyStr(item.addrName) ? "" :  item.addrName;
			      var ocAcceptDate = checkNullOrEmptyStr(item.ocAcceptDate) ? "" :  item.ocAcceptDate;
			      var productId = checkNullOrEmptyStr(item.productId) ? "" :  item.productId;
			      
			      var href1=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/flow-list.html?orderNum="+orderNum);
			      var href2=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-assess.html?orderNum="+orderNum);
			      
			      var strHtml = '<ul>' +
			      				'<li class="hh1 line"><a href="'+href1+'">订单编号：'+orderNum+'</a></li>' +
			      				'<li class="hh2">产品名称：'+productName+'</li>' +
			      				'<li class="hh3 line">客户名称：'+customerName+'</li>';
			      				
			    	  
			      //根据订单状态 显示评价区域
			      if (statusFlag == "成功"){
			    	  var statusStr = '<li class="hh4"><div class="fl color-green">'+statusFlag+'</div>';
			    	  var strA = '<div class="fr rb"><a href="'+href2+'">立即评价</a></div>';
			    	  var strB = '<div class="fr ra">评价成功</div>';
			    	  strHtml += statusStr + (commentState == "1" ?  strB: strA) + "</li>";
			      }	else {
			    	  var statusStr = '<li class="hh4"><div class="fl color-orange">'+statusFlag+'</div>';
			    	  strHtml += statusStr + "</li>";
			      }
			      
			      strHtml += '<li class="hh5">装机地址：'+addrName+'</li>' +
		      				 '<li class="hh6"><div class="fr">'+ocAcceptDate+'</div></li>' +
		      				 '</ul>';
			      
			      $(".listArea").append(strHtml);
			      
		      	  
		 });
}     
