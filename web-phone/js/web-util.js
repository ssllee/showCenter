
/**********这里写手机端 需要的公用js**********/
//页面加载前执行
autoAdapt();

/*
 * 自适应设置
 * html里设置换算单位   font-size=20px;
 * clientWidth*20/720 表示按720px宽度设计图开发页面，然后把css中px  换算成rem 实现响应式   
 */
function autoAdapt(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth*20/720+'px';
	window.onresize=function(){
	  document.documentElement.style.fontSize=document.documentElement.clientWidth*20/720+'px';       
	};
}



/************旧************/
// 存储 对外 订单列表   (查询到订单数据时，返回了json数据，需要将这个json数据存到全局变量中，等跳转至订单页面时，能直接从全局变量中获取)
function setOrderList(data) {
	data = JSON.stringify(data)
	sessionStorage.setItem("orderListData",data);
}

// 获取  对外 订单列表
function getOrderList() {
	var str = sessionStorage.getItem("orderListData");
	var arr = JSON.parse(str);
	return arr;
}


/************新************/
//存储 对外 订单列表   (查询条件)
function setOrderQueryStr(query) {
	sessionStorage.setItem("orderListQueryStr",query);
}

// 获取  对外 订单列表  (查询条件)
function getOrderQueryStr() {
	var str = sessionStorage.getItem("orderListQueryStr");
	return str;
}
