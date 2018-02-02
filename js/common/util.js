
/***************************日期处理********************/
/**
 * 获取当前日期
 * 
 * str:需要什么样的格式 如：yyyy-mm-dd
 * 返回格式：2015-01-10
 */
function getCurrentDate(str) {
	var clock = getTime("",0);
   	clock = changeDateFomate(clock,str);
    return(clock);
} 

/**
 * 获取时间间隔
 * @param mNum 当前分钟数加几分钟
 * 返回格式：2015-03-30 01:00~01:05
 */
function getTimeInterval(clock1,clock2) {
	var clock = changeDateFomate(clock1,"yyyy-mm-dd hh:mm") + "-" + changeDateFomate(clock2,"hh:mm");
	//console.log(clock);
	return(clock);
}

/**
 * 获取日期(如果time不为空，则获取该时间的5分钟后的时间)
 * 
 * @param time:'20150330010001000'
 * @param mNum:当前分钟数加几分钟 如：5：加5分钟   -5：减5分钟
 * 返回格式：20150330010501000
 */
function getTime(time,mNum) {
	
	var now = null;
	
	if (time != "" && time != null && time.length == 17) {
		// 手机浏览器不支持parse()方法
		now = new Date(time.substring(0, 4),time.substring(4, 6) - 1,time.substring(6, 8),time.substring(8, 10),time.substring(10, 12),time.substring(12, 14)); 
	} else {
		now = new Date(); 
	}
	
    now.setMinutes(now.getMinutes() + mNum);
    
    var year = now.getFullYear();       //年   
    var month = now.getMonth() + 1;     //月    0~11 
    var day = now.getDate();            //日
    var hour = now.getHours();
    var minute = now.getMinutes() ;
    
    var seconds = now.getSeconds()
    
    month = month < 10 ? "0" + month :  month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    // 数值与字符间隔，否则会相加
    var clock = year + "" +month + "" + day + "" + hour + "" + minute + "" + seconds + "000";
	
   	//console.log(clock);
    return(clock);
} 

/**
 * 将格式：20150330010101000 转为：2015-03-30 01:01:01
 * @param time
 * @param str  转换格式
 * @returns
 */
function changeDateFomate(time,str) {
	
	if (time.length == 17) {
		if (str == "yyyy-mm-dd hh:mm:ss") {
			time = time.substring(0, 4)+"-"+time.substring(4, 6)+"-"+time.substring(6, 8)
			+" "+time.substring(8, 10)+":"+time.substring(10, 12)+":"+time.substring(12, 14);
		} else if (str == "yyyy-mm-dd hh:mm"){
			time = time.substring(0, 4)+"-"+time.substring(4, 6)+"-"+time.substring(6, 8)
			+" "+time.substring(8, 10)+":"+time.substring(10, 12);
		} else if (str == "yyyy-mm-dd"){
			time = time.substring(0, 4)+"-"+time.substring(4, 6)+"-"+time.substring(6, 8);
		} else if (str == "hh:mm"){
			time = time.substring(8, 10)+":"+time.substring(10, 12);
		} else if (str == "yyyymmdd000000000"){
			time = time = time.substring(0, 8) + "000000000";
		} else {
			
		}
	}
	return time;
}

/****************************校验******************/
/**
 * 校验空或null
 * @param str
 * @returns
 */
function checkNullOrEmptyStr(str) {
	return str == "" || str == null ? true : false;
}
	

/****************************数字处理******************/

/**
 * 保留两个小数
 * @param num
 */
function roundNum(num) {
	if (checkNullOrEmptyStr(num)) return '';
	num = Math.round(num*100)/100;
	return num;
}
	
/**************************table*************/

/**
 * 获取查询条件 返回json格式
 */
function getQueryParams(params, formId) {
    return $("#" + formId).serialize() + "&" + $.param(params);
}

/**
 * bootstrap-table传参,直接可以使用如：<table id="table" data-query-params="queryParams" ....>
 * 
 * @param params
 *  	searchForm  查询条件form的id 如：<form id="searchForm">
 *  
 * @returns
 */
function queryParams(params) {
    return getQueryParams(params, "searchForm");
}

/**********************返回按钮*****************/
/**
 * 【返回】按钮事件
 */
function goBack(){
	//window.history.back();//微信里使用不起作用
	history.back(-1);//微信里使用起作用
}

/**
 * 【提交成功后】返回上一页并刷新
 * 直接传上一页url
 */
function goBackUrl(url) {
	location.href = url;
}


/**
 * 【提交成功后】返回并刷新上一页  浏览器支持，手机不支持
 */
function goBackRefresh() {
	//window.location.href=document.referrer;//浏览器可以，微信不支持
	//history.back();location.reload();//浏览器可以，手机不刷新
	window.location.replace(document.referrer);//浏览器可以，手机不刷新
}


/************************pc**************/

/**
 * div : #div  .div
 */
function setScreenHeight(str) {
	var screenHeight = document.documentElement.clientHeight;//ie不支持 window.innerHeight;//窗口大小，随着窗口大小变化大小
	$(str).css({height: screenHeight+"px"});
}

/************************弹出层**************/

/**
 * 弹出层-右边显示
 */
function showRightLayer(layerId,layerTitle,layerUrl) {
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
			  
    });
    
}


/**************************************/


