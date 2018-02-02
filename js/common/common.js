
//对外访问页面身份验证3个必须条件
var exCode = "";//系统编码
var userName = "";//用户账号
var callCode = "";//加密字符串

(function(){
	//页面初始加载时执行
	initSaveOutParams();
})();


/**
 * 初始保存对外访问url传的参数
 */
function initSaveOutParams() {
	exCode = getUrlParam("exCode");
	userName = getUrlParam("userName");
	callCode = getUrlParam("callCode");
	console.log("params:"+exCode,userName,callCode);
}

/**
 * 对外访问接口url组装
 * 
 * 【页面跳转html】与【ajax】都需要使用该方法
 * 
 * 例如：getOutUrl(getRootPath_web(),"/test/test1?flag=out&orderNum=1001");
 * 
 * 输入格式：http://localhost:8090/QueryCenterWeb/test/test1?flag=out&orderNum=1001&exCode=....
 * 
 * @param uri
 * @param query
 * @returns {String}
 */
function getOutUrl(uri,query) {
	var str = "exCode="+exCode+"&userName="+userName+"&callCode="+callCode;
	if (query.indexOf("?") > 0) {
		str = '&' + str;
	} else {
		str = '?' + str;
	}
	var url = uri + query + str;
	console.log("outApiUrl:"+url);
	return url;
}


/**
 * 获取url中的参数
 * @param name 参数名称
 * @returns
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    //if (r != null) return unescape(r[2]); return null; //返回参数值 escape()编码/unescape()解码
    if (r != null) return decodeURI(r[2]); return null; //返回参数值 encodeURI()编码/decodeURI()解码
}

/**
 * 获取主机名+项目名
 * @returns
 */
function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}

/**
 * 图片最大化，最小化切换
 * @param obj img对象
 */
function changeImgSize(obj) {
	var divId = obj.id;
	$("#"+divId).toggleClass('minImg');
	$("#"+divId).toggleClass('maxImg');
}

//加载等待 显示
function showLoader() {
	$(".fakeloader").show();
	$(".fakeloader").fakeLoader({
    	timeToHide:60000,
        bgColor:"rgba(0,0,0,.1)",
        pos:'absolute',// fakeloader Position
        top:'50%',  // fakeloader Top value
        left:'50%', // fakeloader Left value
        width:'100px', // fakeloader width 
        height:'60px', // fakeloader Height
        marginTop:'-50px',//
        marginLeft:'-30px',//
        borderRadius:'10px',//
        spinner:"spinner2"//使用类型
    });
}

//加载等待 关闭
function hideLoader() {
	$(".fakeloader").hide();
}