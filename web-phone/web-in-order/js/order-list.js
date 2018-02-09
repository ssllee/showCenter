/**********************/

$(document).ready(function() {
	testTbObj.initDateplugin();
	//testTbObj.validateInput();
	testTbObj.restContent();

	$(".nav-tabs li").click(function() {
		$(".nav-tabs li").removeClass("active");
		$(this).addClass("active");
	});


	$("#in_orderNumSearch").click(function() {
		$(".listArea").empty();
		var orderType = $("#orderType").val();
		var orderNum = $("#orderNum").val();
		if (orderType == "") {
			layer.open({
				content: '请选择订单类型！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (orderNum == "") {
			layer.open({
				content: '请输入订单号码！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		//传业务号码到订单列表页面：order-list	    		    
		getexTradeInmodeData(orderType, orderNum);
	});



	$("#in_serialNumberSearch").click(function() {
		$(".listArea").empty();
		var serialNumber = $("#serialNumber").val();
		//console.log(serialNumber);
		if (serialNumber == "") {
			layer.open({
				content: '请输入业务号码！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3,

			});
			return false;
		}
		//传业务号码到订单列表页面：order-list	    		    
		//testTbObj.ajaxValidate();
		getOrderData(serialNumber);
	});

	$("#in_exAcceptStaffidSearch").click(function() {
		$(".listArea").empty();
		var ocAcceptDate = $("#ocAcceptDate").val();
		var exAcceptStaffid = $("#exAcceptStaffid").val();
		if (ocAcceptDate == "") {
			layer.open({
				content: '请选择受理日期！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		if (exAcceptStaffid == "") {
			layer.open({
				content: '请输入受理人工号！',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
				time: 3
			});
			return false;
		}
		//传业务号码到订单列表页面：order-list	    		    
		//testTbObj.ajaxValidate();
		getOrderData_3(ocAcceptDate,exAcceptStaffid);
	});
	//重置
	// $("#resetBtn1,#resetBtn2,#resetBtn3").click(function() {
	// 	$('#searchForm').resetForm();
	// 	$(".listArea").empty();
	// });
});

var flowUrl = getRootPath_web() + "/web-phone/web-in-order/flow-list.html?orderNum=";

//切换div
function showDiv(objId) {
	var objDiv = document.getElementById(objId);
	var objDiv1 = document.getElementById("id1");
	var objDiv2 = document.getElementById("id2");
	var objDiv3 = document.getElementById("id3");

	objDiv1.style.display = "none";
	objDiv2.style.display = "none";
	objDiv3.style.display = "none";
	objDiv.style.display = "";


}



function getOrderData(serialNumber) {

	$.ajax({
		type: 'GET', // 测试  GET , 生成 POST
		async: true,
		//url: getRootPath_web() + "/trade/queryOrder?flag=int&serialNumber=" + serialNumber, //这里将业务号码和对内外的标志作为参数传入Ajax中的url    
		url: getRootPath_web() + "/js/data/order-list.json?flag=int",
		dataType: 'json',
		//显示加载图标
        beforeSend: function () {         
			showLoader();
	    },
	    complete: function() {
			hideLoader();
		},
		success: function(resData) {
			if(resData == null) return;
			if(resData.state == 1) {
				makeList(resData);
			}
			
			/*for (j = 0; j < resData.rows.length; j++) {
				if (resData.rows[j].serialNumber == serialNumber) {
					break;
				} else {
					console.log("123");
					layer.open({
						content: '您输入的业务号码不存在',
						style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
						time: 3
					});
				}
			}*/
			
		},
		error: function(e) {
			layer.open({
				content: '系统错误，请重试',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
					,
				time: 3
			});

		}
	});
}

function getexTradeInmodeData(orderType, orderNum) {

	$.ajax({
		type: 'GET', // 测试  GET , 生成 POST
		async: true,
		//url: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&orderType=" + orderType + "&orderNum=" + orderNum), //这里将业务号码和对内外的标志作为参数传入Ajax中的url    
		url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
		dataType: 'json',
		//显示加载图标
        beforeSend: function () {         
			showLoader();
	    },
	    complete: function() {
			hideLoader();
		},
		success: function(resData) {
			if(resData == null) return;
			if(resData.state == 1) {
				makeList(resData);
			}
		},
		error: function(e) {
			layer.open({
				content: '系统错误，请重试',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
					,
				time: 3
			});

		}
	});
}

function getOrderData_3(ocAcceptDate,exAcceptStaffid) {

	$.ajax({
		type: 'POST', // 测试  GET , 生成 POST
		async: true,
		url: getOutUrl(getRootPath_web(), "/trade/queryOrder?flag=int&ocAcceptDate=" + ocAcceptDate + "&exAcceptStaffid=" + exAcceptStaffid),
		//url: getOutUrl(getRootPath_web(),"/js/data/order-list.json?flag=out"),
		dataType: 'json',
		//显示加载图标
        beforeSend: function () {         
			showLoader();
	    },
	    complete: function() {
			hideLoader();
		},
		success: function(resData){
			if(resData == null) return;
			if(resData.state == 1) {
				makeList(resData);
			}
		},
		error: function(e) {
			layer.open({
				content: '系统错误，请重试',
				style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;' //自定风格
				,time: 3
			});

		}
	});
}

//组装列表
function makeList(resData) {

	for (i = 0; i < resData.rows.length; i++) {
		
		var orderNum = resData.rows[i].orderNum;
		var exTradeInmode = resData.rows[i].exTradeInmode;
		var serialNumber = resData.rows[i].serialNumber;
		var exAcceptStaffid = resData.rows[i].exAcceptStaffid;
		var ocAcceptDate = resData.rows[i].ocAcceptDate;
		
		orderNum = checkNullOrEmptyStr(orderNum) ? "" :  orderNum;
		exTradeInmode = checkNullOrEmptyStr(exTradeInmode) ? "" :  exTradeInmode;
		serialNumber = checkNullOrEmptyStr(serialNumber) ? "" :  serialNumber;
		exAcceptStaffid = checkNullOrEmptyStr(exAcceptStaffid) ? "" :  exAcceptStaffid;
		ocAcceptDate = checkNullOrEmptyStr(ocAcceptDate) ? "" :  ocAcceptDate;
			
		var listArea = "<ul>" +
			"<li class=\"hh1 line\">" +
			'<a href="'+ flowUrl + orderNum +'">' + "订单编号：" + orderNum + "</a>" +
			"</li>" +
			"<li class=\"hh2\">" +
			"订单类型：" + exTradeInmode +
			"</li>" +
			"<li class=\"hh3 line\">" +
			"业务号码：" + serialNumber +
			"</li>" +
			"<li class=\"hh3 line\">" +
			"受理工号：" + exAcceptStaffid +
			"</li>" +
			"<li class=\"hh6\">" +
			"<div class=\"fr\">" + ocAcceptDate + "</div>" +
			"</li>" +
			"</ul>"

		$('.listArea').append(listArea);
	}
}
	
	
//本页面对象
var testTbObj = {
	urlSearch: getRootPath_web() + "/js/data/table-phone-test.json", //  "/js/data/table.json"

	restContent: function() {
		$("#resetBtn1,#resetBtn2,#resetBtn3,.change").click(function() {
			$('#searchForm').resetForm();
			$(".listArea").empty();
		});
	},

	initDateplugin: function() {
		$('#ocAcceptDate').mobiscroll().date({
			theme: 'android-ics', //皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】 
			display: 'bottom', //显示方【modal】【inline】【bubble】【top】【bottom】 
			mode: "scroller", //操作方式【scroller】【clickpick】【mixed】
			dateFormat: 'yy-mm-dd', // 日期格式  
			dateOrder: 'yymmdd', //面板中日期排列格式  
			setText: '确定', //确认按钮名称  
			cancelText: '取消', //取消按钮名籍我  
			showNow: true, // [now]按钮是否显示
			nowText: "今天", // [now]按钮中文显示
			endYear: 2050, //结束年份  
			minWidth: 200,
			height: 50, //行高
			rows: 3, //可见行数
			lang: 'zh',
		});
	},



	//【提交】 业务号码查询
	// validateInput: function() {

	// },
	// validateInput: function() {
	// 	var exTradeInmode = $("#exTradeInmode").val();
	// 	var orderNum = $("#orderNum").val();
	// 	var serialNumber = $("#serialNumber").val();
	// 	var ocAcceptDate = $("#ocAcceptDate").val();
	// 	var exAcceptStaffid = $("#exAcceptStaffid").val();
	// 	if (exTradeInmode == "" && orderNum == "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid == "") {
	// 		layer.open({
	// 			content: '请输入订单类型和订单号，或者输入业务号码，或者输入受理日期和受理人工号',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 		return false;
	// 	}
	// 	if ((exTradeInmode && orderNum != "") || serialNumber != "" || (ocAcceptDate && exAcceptStaffid != "")) {
	// 		return true;
	// 	}
	// 	if (exTradeInmode != "" && orderNum == "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid == "") {
	// 		layer.open({
	// 			content: '请输入订单号',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 		return false;
	// 	}
	// 	if (exTradeInmode == "" && orderNum != "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid == "") {
	// 		layer.open({
	// 			content: '请输入订单类型',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 		return false;
	// 	}
	// 	if (exTradeInmode == "" && orderNum == "" && serialNumber != "" && ocAcceptDate == "" && exAcceptStaffid == "") {
	// 		return true;
	// 	}
	// 	if (exTradeInmode == "" && orderNum == "" && serialNumber == "" && ocAcceptDate != "" && exAcceptStaffid == "") {
	// 		layer.open({
	// 			content: '请输入受理人工号',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 		return false;
	// 	}
	// 	if (exTradeInmode == "" && orderNum == "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid != "") {
	// 		layer.open({
	// 			content: '请输入受理日期',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 		return false;
	// 	} else {
	// 		layer.open({
	// 			content: '请输入订单类型和订单号，或者输入业务号码，或者输入受理日期和受理人工号',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 	}
	// },

	// validateInput: function() {
	// 	var exTradeInmode = $("#exTradeInmode").val();
	// 	var orderNum = $("#orderNum").val();
	// 	var serialNumber = $("#serialNumber").val();
	// 	var ocAcceptDate = $("#ocAcceptDate").val();
	// 	var exAcceptStaffid = $("#exAcceptStaffid").val();

	// 	if (exTradeInmode != "" || orderNum != "") {
	// 		$("#serialNumber,#ocAcceptDate,#exAcceptStaffid").attr("disabled", "disabled");
	// 		// layer.open({
	// 		// 	content: '请输入订单类型和订单号，或者输入业务号码，或者输入受理日期和受理人工号',
	// 		// 	style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 		// 	time: 3
	// 		// });
	// 		return false;
	// 	}
	// 	if (serialNumber != "") {
	// 		$("#exTradeInmode,#orderNum,#ocAcceptDate,#exAcceptStaffid").attr("disabled", "disabled");
	// 	}
	// 	if (ocAcceptDate != "" || exAcceptStaffid != "") {
	// 		$("#exTradeInmode,#orderNum,#serialNumber").attr("disabled", "disabled");
	// 	}

	// },
	// ajaxValidate: function() {
	// 	$.ajax({
	// 		type: 'GET',
	// 		async: true,
	// 		url: testTbObj.urlSearch,
	// 		dataType: 'json',
	// 		beforeSend: function() {
	// 			showLoader();
	// 		},
	// 		complete: function() {
	// 			hideLoader();
	// 		},
	// 		success: function(resData) {
	// 			var title;
	// 			var content;
	// 			title = "<div class=\"content col-sm-12 col-xs-12\"><ul class=\"col-sm-4 col-xs-4\"><li>" + "订单类型" + "</li><li>" + "受理日期" + "</li><li>" + "订单号" + "</li><li>" + "业务号码" + "</li><li>" + "受理人工号" + "</li></ul>";
	// 			for (i = 0; i < resData.length; i++) {
	// 				content = title + "<ul class=\"col-sm-8 col-xs-8\"><li>" + resData[i].exTradeInmode + "</li><li>" + resData[i].ocAcceptDate + "</li><li>" + resData[i].orderNum + "</li><li>" + "<a href=>" + resData[i].serialNumber + "</a>" + "</li><li>" + resData[i].exAcceptStaffid + "</li></ul></div>";
	// 				$('.listArea').append(content);
	// 			}
	// 		}
	// 	});
	// },

	// ajaxValidate: function() {
	// 	$.ajax({
	// 		type: 'GET',
	// 		async: true,
	// 		url: testTbObj.urlSearch,
	// 		dataType: 'json',
	// 		beforeSend: function() {
	// 			showLoader();
	// 		},
	// 		complete: function() {
	// 			hideLoader();
	// 		},
	// 		success: function(resData) {
	// 			var content;
	// 			for (i = 0; i < resData.length; i++) {
	// 				content = "<div class=\"content col-sm-12 col-xs-12\">" +
	// 					"<ul class=\"contentul\"><li><div class=\"contentdiv1 col-sm-4 col-xs-4\">" + "订单类型：" +
	// 					"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + resData[i].exTradeInmode +
	// 					"</div></li><li><div class=\"contentdiv1 col-sm-4 col-xs-4\">" + "受理日期：" +
	// 					"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + resData[i].ocAcceptDate +
	// 					"</div></li><li><div class=\"contentdiv1 col-sm-4 col-xs-4\">" + "订单号：" +
	// 					"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + "<a href=\"http://127.0.0.1:8083/QueryCenterWeb/web-phone/web-in-order/flow-list.html\">" + resData[i].orderNum + "</a>" +
	// 					"</div></li><li><div class=\"contentdiv1 col-sm-4 col-xs-4\">" + "业务号码：" +
	// 					"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + resData[i].serialNumber +
	// 					"</div></li><li><div class=\"contentdiv1 col-sm-4 col-xs-4\">" + "受理工号：" +
	// 					"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + resData[i].exAcceptStaffid + "</div></li></ul></div>"
	// 				$('.listArea').append(content);
	// 			}
	// 		}
	// 	});
	// }

}



// "<ul>"+
//       "<li class=\"hh1 line\">"+
//         "<a href=>"+"订单编号："+resData.rows[i].orderNum+"</a>"+
//       "</li>"+
//       "<li class=\"hh2\">"+
//         "订单类型："+resData.rows[i].exTradeInmode+
//       "</li>"+
//       "<li class=\"hh3 line\">"+
//         "业务号码："+resData.rows[i].serialNumber+
//       "</li>"+
//       "<li class=\"hh3 line\">"+
//         "受理工号："+resData.rows[i].exAcceptStaffid+
//       "</li>"+
//       "<li class=\"hh6\">"+
//         "<div class=\"fr\">"+resData.rows[i].ocAcceptDate+"</div>"+
//       "</li>"+
//     "</ul>"


// var listArea = "<div class=\"listArea\">" +
// 		"<ul class=\"\"><li><div class=\"hh1 line\">" + "订单编号：" +
// 		"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + resData.rows[i].orderNum +
// 		"</div></li><li><div class=\"contentdiv1 col-sm-4 col-xs-4\">" + "受理日期：" +
// 		"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + resData.rows[i].ocAcceptDate +
// 		"</div></li><li><div class=\"contentdiv1 col-sm-4 col-xs-4\">" + "订单号：" +
// 		"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + "<a href=\"http://127.0.0.1:8083/QueryCenterWeb/web-phone/web-in-order/flow-list.html\">" + resData.rows[i].orderNum + "</a>" +
// 		"</div></li><li><div class=\"contentdiv1 col-sm-4 col-xs-4\">" + "业务号码：" +
// 		"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + resData.rows[i].serialNumber +
// 		"</div></li><li><div class=\"contentdiv1 col-sm-4 col-xs-4\">" + "受理工号：" +
// 		"</div><div class=\"contentdiv2 col-sm-8 col-xs-8\">" + resData.rows[i].exAcceptStaffid + "</div></li></ul></div>"