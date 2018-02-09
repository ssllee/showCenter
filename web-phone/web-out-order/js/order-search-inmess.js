
/*************对外 手机 验证码*********/
//在一加载完此页时，就执行显示手机号和倒计时
$(document).ready(function(){
	var obj = $("#btn");
	settime(obj);
	flowList.showNum();
	//flowListObj.settime();
	
});

//获取路径中参数
var phoneNum = getUrlParam("serialNumber");
var idNum = getUrlParam("credentialCode");
//本页面对象:
var flowList = {	
		//取出url中的参数手机号显示在页面上
		showNum: function() {
			var num = (phoneNum == "" || phoneNum == null) ? "" : phoneNum;
			// 对num做下处理   186****0023
			$(".showserialNum").html("已发送验证码至  +86 "+num);
		}						
};
  	

 
//【重新获取验证码】
function sendemail(){
    var obj = $("#btn");
    getMessData();
    settime(obj);    
}

 
//重新获取验证码
function getMessData(){
	  
	  cleanData();
	
	  $.ajax({
          type:  'GET',//测试  GET  生产POST
          async: false,
          //url:getOutUrl(getRootPath_web(),"/trade/sendMessage?serialNumber="+phoneNum),
          url:getOutUrl(getRootPath_web(),"/js/data/order-search.json?serialNumber="+phoneNum),
          dataType: "json",
          success: function (resData) {
        	 if(resData.state==1){
        		 return;
        	 }else{
        		 layer.open({
	  				  content: '验证码发送失败'
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

//【倒计时】
function settime(obj) { //发送验证码倒计时
  	    if (messageCodeMinute == 0) { 
  	        obj.attr('disabled',false); 
  	        //obj.removeattr("disabled"); 
  	        obj.val("免费获取验证码");
  	        
  	      messageCodeMinute = 60; 
  	        return;
  	    } else { 
  	        obj.attr('disabled',true);
  	        obj.val("发送验证码还需要" + messageCodeMinute + "秒");
  	      messageCodeMinute--; 
  	    } 
  		setTimeout(function() { 
  	    	settime(obj) 
  		},1000)
}


  
 
//获取输入验证码code，并和传入的手机号、身份证号一同访问url，判断验证码正确性，当正确（返回为1）跳转订单页
function checkData(pwd){
//  	var codeTmp=document.getElementById('pwd-input').value;
//  	code+=codeTmp;
  	
  	$.ajax({
  		   type : 'GET',// 测试  GET , 生成 POST
	       async : true,
	       //url:getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out&serialNumber="+phoneNum+"&code="+pwd+"&credentialCode="+idNum),      
  	       url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
	       dataType : 'json',	
	       beforeSend: function () {         
				showLoader();
		   },
		   complete:function(){       
			    hideLoader();
		   },
  	       success : function(resData) {
  	    	   //debugger;
  	    	   if(resData.state==1){
  		    	   //本地存储 赋值
  		    	   //setOrderList(resData.rows);//orderListData=resData.data;
  		    	   setOrderQueryStr("&serialNumber="+phoneNum+"&credentialCode="+idNum); 
  		    	   //跳转到订单列表页面  order-list
  		    	   window.location.href=getOutUrl(getRootPath_web(),"/web-phone/web-out-order/page/order-list.html");
  	    	  } else {
	  	    	   layer.open({
	  				  content: '验证码错误'
	  				  ,style: 'background-color:#f7f7f8; width:70%;color:#323232; border:none;' //自定风格
	  				  ,time: 3
	  			   });
  	    	  }
  	    	  
  	       },
  		   error: function () {
  			   layer.open({
 				  content: '系统原因'
 				  ,style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
 				  ,time: 3
 			   });
  		   }
  	       
  	});
}
 
