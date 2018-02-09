	
/************************对外-PC-订单查询***************************/

//页面加载成功后 初始化事件
$(function(){
	//设置面板高度
	//setScreenHeight(".panelA");
	
	//input 提示语 placeholder ie兼容初始化
	placeholder("#phoneNumber");//手机号
	placeholder("#credentialCode");//身份证号
	placeholder("#serialNumber");//业务号码
});

/******************************本页面对象*******************************/

//本页面对象
var orderListObj = {
	messageCodeMinute: 0 // 记录倒计时
	,orderUrlSearch: getOutUrl(getRootPath_web(),"/trade/queryOrder?flag=out") //  "/js/data/table.json"
	,sendMessageUrl: getOutUrl(getRootPath_web(),"/trade/sendMessage?")
	,phoneInitTable: function(){	//初始化table数据：手机+验证码查询
		var phoneNumber=$("#phoneNumber").val();
		var credentialCode=$("#credentialCode").val();
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	    	url: orderListObj.orderUrlSearch+"&serialNumber="+phoneNumber+"&credentialCode="+credentialCode
	    });
	}
	
	,serilInitTable: function(){	//初始化table数据：业务号码查询
		var serialNumber = $("#serialNumber").val();
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	    	url: orderListObj.orderUrlSearch+="&serialNumber="+serialNumber  
	    });
	}	
	,phoneSearch:function(){ //手机号码和身份证号输入校验
		var phoneNumber=$("#phoneNumber").val();
		var credentialCode=$("#credentialCode").val();
		if(phoneNumber==""&&credentialCode==""){
			layer.msg('请输入您的查询信息', {
				time: 2000 //2s后自动关闭
			});
		}
		if(credentialCode==""&&phoneNumber!=="") {
			layer.msg('请输入您的身份证号', {
				time: 2000 //2s后自动关闭
			});
		} 
		if(phoneNumber==""&&credentialCode!==""){
			layer.msg('请输入您的联系电话', {
				time: 2000 //2s后自动关闭
			});
		}
		if(credentialCode!==""&&phoneNumber!==""){
			
			var boo1=(/^1[34578]\d{9}$/.test(phoneNumber));
			var boo2=(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(credentialCode))
			
			if(!(/^1[34578]\d{9}$/.test(phoneNumber))){ 
				layer.msg('您的联系电话有误，请重填', {
					time: 2000 //2s后自动关闭
				});
			}else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(credentialCode))){ 
				layer.msg('您的身份证号有误，请重填', {
					time: 2000 //2s后自动关闭
				});
			}else if((boo1=true)&&(boo2=true)){				
				//如果手机号和身份证号不为空且校验通过，发送短信验证码，进行短信校验
				//debugger;
				orderListObj.getMessData(phoneNumber);//获取验证码				
			}		   		    	    
		  }
	}
	,getMessData:function(phoneNumber){ //第一次发送短信验证码
		$.ajax({
			type : 'POST',// 测试  GET , 生成 POST
			async: false,
			url:orderListObj.sendMessageUrl+"&serialNumber="+phoneNumber,//发送验证码请求
			dataType: "json",
			success: function (resData) {        	  
				if(resData.state==1){ // 如已成功发送验证码，跳转到输入短信验证码页面     		  	        		  
					orderListObj.message();	//短信验证码框弹出		
				}else{
					layer.msg('短信验证码发送失败', {
						time: 2000 //2s后自动关闭
	  				});
				}
			},	          
			error: function () {	// 未成功发送，提醒发送不成功
				layer.msg('系统原因', {
					time: 2000 //2s后自动关闭
				});
			}	    
		}); 
	}
	,message:function(){ //短信验证码框弹出
		//清空表格
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable();
	    
		$(".bg-model-wrap").show();//短信层弹出
		$("body").css({ "overflow": "hidden" });//隐藏窗体的滚动条
		var obj = $("#btn");
		orderListObj.messageCodeMinute = 60;
		orderListObj.setTime(obj);//验证码倒计时
	}
	,getMessage:function(phoneNumber){ //重新获取验证码
		
		//orderListObj.cleanData();	//清除短信验证码
		cleanData();	//清除短信验证码 
		
		$.ajax({
			type:  'POST',
			async: false,
			url:getOutUrl(getRootPath_web(),"/trade/sendMessage?serialNumber="+phoneNumber),
			//url:getRootPath_web()+"/js/data/order-list.json",
			dataType: "json",
			success: function (resData) {
				if(resData.state==1){
					return;
				}else{
					layer.msg('短信验证码发送失败', {
						time: 2000 //2s后自动关闭
					});
				}
		        	  
			},	          
			error: function () {// 未成功发送，提醒发送不成功
				layer.msg('系统原因', {
					time: 2000 //2s后自动关闭
				});
			}
		      			   
		});
	}
	,serialNumSearch:function(){ //业务号码校验：不能为空
		
		var serialNumber = $("#serialNumber").val();
		if(serialNumber == "") {
			 layer.msg('请输入您的业务号码', {
					time: 2000 //2s后自动关闭
				});
			return false;
		 } 		
		orderListObj.changeDiv(1); //如果校验成功则查询
		orderListObj.getOrderData(serialNumber);
	}
	,getOrderData:function(serialNumber){		//业务编号查询
		
		$.ajax({
			type : 'POST',// 测试  GET , 生成 POST
		    async : true,
		    url:orderListObj.orderUrlSearch+"&serialNumber="+serialNumber,  
		    dataType : 'json',	      
		    success : function(resData) {
		    	if (resData.state==1){
		    		//if(true){
		    		orderListObj.serilInitTable();
		    	}
		    	else{
		    		layer.msg('此业务号码无订单数据', {
		    			time: 2000 //2s后自动关闭
		    		});
		    	}
		    },
		    error: function (e) {
		    	layer.msg('系统原因', {
		    		time: 2000 //2s后自动关闭		    
		    	});
		    }		    
		});
		
	}	
	,setTime:function(obj){	//【倒计时】	
		
		if ((orderListObj.messageCodeMinute == 0)||(orderListObj.messageCodeMinute == 61)) { 
			obj.attr('disabled',false); 
			//obj.removeattr("disabled"); 
			obj.val("免费获取验证码");		  	        
			orderListObj.messageCodeMinute = 60; 
			return;
		} else { 
			obj.attr('disabled',true);
			obj.val("发送验证码还需要" + orderListObj.messageCodeMinute + "秒");
			orderListObj.messageCodeMinute--;
		} 
		setTimeout(function() { 
			orderListObj.setTime(obj) 
		},1000)
	}
	
	,actionFormatter: function(value, row, index) { //表格超链接  订单状态
		if(row.statusFlag=="成功"){                   
			if(row.commentState==1){
				return '<p class="a-p finish">已完成</p><p class="a-p finish">已评价</p>';     //订单已完成已评价
			}else{
				return '<p class="a-p finish">已完成</p><a class="showAssess">立即评价</a>'; //订单已完成未评价
			}
		}
		return '<p class="a-p">'+row.statusFlag;
	}
	
	//表格超链接 跳转流程查询
	,hrefFormatter: function(value, row, index) {
		return '<a class="showFlow">'+value+'</a>';
	}
	
	//表格区域  空与非空 切换   flag  1：查询到数据   0：数据为空    模拟输入验证码先隐藏
	,changeDiv: function(flag) {
		if (flag==1) {
			$(".a-tableDivEmpty").hide();
			$(".a-tableDiv").show();
		}else{
			$(".a-tableDivEmpty").show();
			$(".a-tableDiv").hide();
		}		
	}
	//关闭窗口
	,closeModel: function() {
		$(".bg-model-wrap").hide();//短信输入框隐藏
	    $("body").css({ "overflow": "visible" });//显示窗体的滚动条
	    cleanData();	//清除短信验证码
	    orderListObj.messageCodeMinute = 0;//倒计时停止
	}
	//弹出评价框 关闭有事件
	,showRightLayer_assess: function(layerId,layerTitle,layerUrl) {
		layer.open({
			  type: 2,
			  id: layerId, //设定一个id，防止重复弹出
			  title: layerTitle,//title: false, //不显示标题栏 
			  shadeClose: true,
			  shade: 0,//背景  shade: 0.8
			  area: ['490px', '98%'],
			  offset: 'r',
			  skin: 'a-layer', //
			  content: layerUrl //iframe的url
			  ,end: function () {
				  $('#table').bootstrapTable("destroy");
			      $('#table').bootstrapTable({
			    	  url: orderListObj.orderUrlSearch  
			      });
	          }
	    });
	    
	}
	//这里可以继续定义function	
}

/******************************按钮等事件*******************************/

//表格  - 操作 - 事件
window.actionEvents = {
	 //展示流程
	'click .showFlow': function(e, value, row, index) {      
	      var orderNum = row.orderNum;
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/flow-list.html?orderNum="+orderNum);
	      showRightLayer("flow"+orderNum,"流转轨迹",htmlUrl);
    },
    //展示评价
	'click .showAssess' : function(e, value, row, index) {
	      var orderNum = row.orderNum;
	      var htmlUrl = getOutUrl(getRootPath_web(),"/web-pc/out-order/page/order-assess.html?orderNum="+orderNum);
	      //showRightLayer("assess"+orderNum,"订单评价",htmlUrl);
	      orderListObj.showRightLayer_assess("assess"+orderNum,"订单评价",htmlUrl);//关闭弹出框后需要执行刷新表格事件，所以不能用公共方法
   }
}

// 按手机号和身份证查询
$(".searchPhoneBtn").click(function(){
	//orderListObj.changeDiv(1);
	orderListObj.phoneSearch();
	
});

//按业务号码查询
$(".searchSerialNumberBtn").click(function(){
	//orderListObj.changeDiv(1);
	orderListObj.serialNumSearch();
});

//【短信验证码框】-【关闭】按钮
$(".bg-model-close").click(function(){
	orderListObj.closeModel();
});

//重新发送验证码
function sendemail(){	
	var obj = $("#btn");
	var phoneNumber=$("#phoneNumber").val(); 
	var credentialCode=$("#credentialCode").val();
    orderListObj.getMessData(phoneNumber,credentialCode);//重新获取
    orderListObj.messageCodeMinute = 61; 
    orderListObj.setTime(obj); //开始倒计时
    
    
};


/************************查询tab*************************/

function searchMethod(value) {//切换查询方式
	// 清空表单
	$('#searchForm').resetForm();
	
	//处理tab
	if (value == 1) {
		$(".nav-tabs>li:eq(0)").addClass("active");
		$(".nav-tabs>li:eq(1)").removeClass("active");
		
		$(".row1").show();
		$(".row2").hide();
	} else if (value == 2){
		$(".nav-tabs>li:eq(0)").removeClass("active");
		$(".nav-tabs>li:eq(1)").addClass("active");
		
		$(".row1").hide();
		$(".row2").show();
	}
}
 

/********************************6位验证码输入后调用 单独写checkData(pwd)方法**************************/
function checkData(pwd){ //短信验证码正确性验证
    
	var phoneNumber=$("#phoneNumber").val();
	var credentialCode=$("#credentialCode").val();
	
	$.ajax({
		   type : 'POST',// 测试  GET , 生成 POST
		   async : true,
	       url:orderListObj.orderUrlSearch+"&serialNumber="+phoneNumber+"&code="+pwd+"&credentialCode="+credentialCode,     
	       dataType : 'json',
	       beforeSend: function () {         
	    	   layer.load(2);
		   },
		   complete:function(){       
			   layer.closeAll('loading');
		   },
	       success : function(resData) {
	    	   if(resData.state==1){ //如果验证成功，则进行查询并显示订单列表
	    		   orderListObj.changeDiv(1);//显示列表页面
	    		   orderListObj.phoneInitTable();//查询数据显示在列表中
	    		   orderListObj.messageCodeMinute=0;
	    		  
	    		   orderListObj.closeModel();
	    	   }
	    	   if(resData.state==2){
	    		   layer.msg('验证失败', {
	    			   time: 2000 //2s后自动关闭
  			   });
	    		  
	    	   }
	    	   if(resData.state==0){
	    		   layer.msg('此手机号/身份证号未办理业务', {
	    			   time: 2000 //2s后自动关闭
	    		   });
	    		 
	    	   }else{
	    	   }	    	  
	       },
		   error: function () {
			   layer.msg('系统原因', {
				   time: 2000 //2s后自动关闭
			   });
		   }
	       
	});
}

