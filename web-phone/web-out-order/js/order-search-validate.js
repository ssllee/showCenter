
/*************  对外 手机 订单查询+获取验证码  ************/

/*
 * $(document).ready(function(){ ValidateObj.searchorderNum();
 * ValidateObj.sendMessage(); ValidateObj.checkMessage();
 * 
 * });
 */



/*// 【重置】
$("input[type=reset]").click(function(){
	$('#loginForm').resetForm();
});
// 【提交】验证
$("#loginForm").validate();*/


//var orderNum = document.getElementById('orderNum').value;

//【提交】 业务号码查询
$("#open_orderSearch").click(function(){
	 var serialNumber = $("#serialNumber").val();
	 var idNum = $("#idNum").val();
	 if(serialNumber == "") {
			layer.open({
				  content: '请输入您的业务号码！'
				  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
				  ,time: 3
			});
			return false;
	 }  
	 //传业务号码到订单列表页面：order-list	    		    
	 getOrderData(serialNumber);
}); 

//传业务号码到订单列表页面：order-list
function getOrderData(serialNumber){
	
	$.ajax({
	       type : 'GET',// 测试  GET , 生成 POST
	       async : true,
	       //url:getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out&serialNumber="+serialNumber),//这里将业务号码和对内外的标志作为参数传入Ajax中的url    
	       url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
	       dataType : 'json',	      
	       success : function(resData) {
	    	   if (resData.state==1){
	    	   //本地存储 赋值
	    	   setOrderList(resData.data);//orderListData=resData.data; 
	    	   //跳转到订单列表页面  order-list
	    	   window.location.href=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-list.html");
	    	   }
	    	   else{
	    		   layer.open({
					  content: '您输入的业务号码不存在'
					  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
					  ,time: 3
	    		   });
	    	   }
	       },
		   error: function (e) {
			   layer.open({
					  content: '系统错误，请重试'
					  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
					  ,time: 3
				});
			   
		   }
	 });
}


//【获取短信验证码】
$("#sendMessage").click(function(){ 
	
	if(form1.phoneNum.value==""&&form1.IDNum.value==""){
    	  layer.open({
			  content: '请输入您的查询信息'
			  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
			  ,time: 3
		  });
    }
	  if(form1.IDNum.value==""&&form1.phoneNum.value!=="") {
		  layer.open({
			  content: '请输入您的身份证号'
			  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
			  ,time: 3
		  });
	  } 
	  if(form1.phoneNum.value==""&&form1.IDNum.value!==""){
		  layer.open({
			  content: '请输入您的联系电话'
			  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
			  ,time: 3
		  });
	  }
	  if(form1.IDNum.value!==""&&form1.phoneNum.value!==""){
		  	var idNum = $("#IDNum").val();
		  	var phoneNum = $("#phoneNum").val();
			var boo1= !(/^1[34578]\d{9}$/.test(phoneNum));
			var boo2=!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idNum))
			if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idNum))){ 
				layer.open({
					  content: '您的身份证号有误，请重填'
					  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
					  ,time: 3
				});
			}else if(!(/^1[34578]\d{9}$/.test(phoneNum))){ 
		    	layer.open({
					  content: '您的联系电话有误，请重填'
					  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
					  ,time: 3
				});
			}else if((boo1=true)&&(boo2=true)){
				getMessData(idNum,phoneNum);	
			}
		    //如果以上条件都未执行，则调用这个getMessData请求
		    	    
	  }

	
});


//ajax调用发送验证码请求
function getMessData(idNum,phoneNum){
	
	  $.ajax({
		  type : 'GET',// 测试  GET , 生成 POST
          async: false,
          //url:getOutUrl(getRootPath_web(),"/trade/sendMessage?serialNumber="+phoneNum),
          url: getOutUrl(getRootPath_web(),"/js/data/order-search.json"),
          dataType: "json",
          success: function (resData) {
        	  if(resData.state==1){
	        	// 如已成功发送验证码，跳转到输入短信验证码页面
	      	  	  window.location.href =getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-search-inmess.html?serialNumber="+phoneNum+"&credentialCode="+idNum);
        	  }
        	  else{
        		  layer.open({
				  content: '短信验证码发送失败'
				  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
				  ,time: 3
        		  });
        	  }
          },	          
  		  error: function () {// 未成功发送，提醒发送不成功
  			  layer.open({
				  content: '系统原因'
				  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
				  ,time: 3
			  });
	     }
    
	 });
 
}

//切换div
function showDiv(objId) {
	var objDiv = document.getElementById(objId);
	var objDiv1 = document.getElementById("id1");
	var objDiv2 = document.getElementById("id2");

	objDiv1.style.display = "none";
	objDiv2.style.display = "none";

	objDiv.style.display = "";
}




