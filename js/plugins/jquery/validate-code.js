
/******************6位验证码输入js区域******************/
//显示div->隐藏div获取焦点
$("#dv").click(function(){
 	$("#pwd-input").focus();
 	
});
//隐藏div添加键盘事件
$("#pwd-input").keydown(function(event){ 
	noNumbers(event);
});
 	

var myNum = 0;//记录实际输入个数
var myLen = 6;//目标输入个数

//数字输入
function noNumbers(e){
    var keynum;//键盘值（数字48到57）
    var keychar="";//键盘值对应的字符（数字0到9）
    var ev = e || window.event;  
  
    keynum = window.event ? ev.keyCode : ev.which;
    keychar = String.fromCharCode(keynum);
    
    //键盘值BackSpace
    if(keynum == 8){
    	//window.history.forward(1);//屏蔽浏览器自带的后退键  
        /*if(window.event.srcElement.tagName.toUpperCase()!="INPUT" && window.event.srcElement.tagName.toUpperCase()!="TEXTAREA" && window.event.srcElement.tagName.toUpperCase()!="TEXT"){    
		    stopDefault(ev);
	    } */
	   
	    //阻止默认行为
	    stopDefault(ev);
	    
	    $(".pwd-input").html("");
	    //重新定义该键的作用
	    if(myNum > myLen) {myNum = myLen;}
        $(".dvp"+myNum).html("");
        if(myNum > 0){
        	myNum--;
        }
        
    	return;
    	 
    }
    //console.log(keynum+':'+keychar);
    
    //只存数字
    if(keynum<47 || keynum>58){
    	return;
    }else{
    	if(myNum > myLen) return;
    	
    	myNum++;
      	if(myNum <= myLen){
      		//console.log("当前输入：" + keychar);
	   	    $(".dvp"+myNum).html(keychar);
	   	    if (myNum == myLen) {
	   	     	var str = getInputStr();
	   	     	console.log("6位数字："+str);
	   	     	checkData(str);// 调用业务方法
	   	    }
    	} 
    
    }
        
}

//获取输入的内容
function getInputStr() {
	var $input = $("#dv p");
	var pwd = "";
	$input.each(function(index,item) {  
        var value = item.innerText;
        pwd += value;
    });  
    return pwd;
}

//获取输入的内容
function cleanData() {
	var $input = $("#dv p");
	$input.each(function(index,item) {  
        item.innerText = "";
    });  
    myNum = 0;
    $("#pwd-input").html('');
}

//阻止元素发生默认的行为
function stopDefault(ev) { 
	ev.keyCode=0;//取消等于keyCode值的键的作用
	
    if (ev.preventDefault) {  
        //preventDefault()方法阻止元素发生默认的行为  
        ev.preventDefault();  
    }  
    if (ev.returnValue) {  
        //IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为  
        ev.returnValue = false;  
    }  
    return false;  
} 


/***
 * 6位验证码输入html区域
 * <div id="pwd-input" class="pwd-input" tabindex="0" contenteditable="true"></div>
	<div class="pwd-box">
		<div id="dv" class="fake-box">
			<p class="dvp1"></p>
			<p class="dvp2"></p>
			<p class="dvp3"></p>
			<p class="dvp4"></p>
			<p class="dvp5"></p>
			<p class="dvp6"></p>
		</div>
	</div>
 * 
 */
		 	