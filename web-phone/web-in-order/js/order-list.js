/**********************/

$(document).ready(function() {
	testTbObj.initDateplugin();
	

	//查询
	// $(".submitBtn").click(function() {
	// 	$("#searchResult").empty();

	// 	if (testTbObj.validateInput() == true) {
	// 		testTbObj.ajaxValidate();
	// 	}

	// });


	$('#serialNumber,#orderNum,#exAcceptStaffid').bind('input propertychange', function() {testTbObj.validateInput();}); 



	$("#orderType").click(function() {
		testTbObj.validateInput();
	});

	$("#ocAcceptDate").focus(function() {
		testTbObj.validateInput();
	});


	//重置
	$(".resetBtn").click(function() {
		$('#searchForm').resetForm();
		$("#searchResult").empty();
	});


});



//本页面对象
var testTbObj = {
	urlSearch: getRootPath_web() + "/js/data/table-phone-test.json", //  "/js/data/table.json"

	initDateplugin: function() {
		$('#ocAcceptDate').mobiscroll().date({
			theme: 'ios', //皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】 
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

	// validateInput: function() {
	// 	var orderType = $("#orderType").val();
	// 	var orderNum = $("#orderNum").val();
	// 	var serialNumber = $("#serialNumber").val();
	// 	var ocAcceptDate = $("#ocAcceptDate").val();
	// 	var exAcceptStaffid = $("#exAcceptStaffid").val();
	// 	if (orderType == "" && orderNum == "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid == "") {
	// 		layer.open({
	// 			content: '请输入订单类型和订单号，或者输入业务号码，或者输入受理日期和受理人工号',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 		return false;
	// 	}
	// 	if ((orderType && orderNum != "") || serialNumber != "" || (ocAcceptDate && exAcceptStaffid != "")) {
	// 		return true;
	// 	}
	// 	if (orderType != "" && orderNum == "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid == "") {
	// 		layer.open({
	// 			content: '请输入订单号',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 		return false;
	// 	}
	// 	if (orderType == "" && orderNum != "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid == "") {
	// 		layer.open({
	// 			content: '请输入订单类型',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 		return false;
	// 	}
	// 	if (orderType == "" && orderNum == "" && serialNumber != "" && ocAcceptDate == "" && exAcceptStaffid == "") {
	// 		return true;
	// 	}
	// 	if (orderType == "" && orderNum == "" && serialNumber == "" && ocAcceptDate != "" && exAcceptStaffid == "") {
	// 		layer.open({
	// 			content: '请输入受理人工号',
	// 			style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
	// 			time: 3
	// 		});
	// 		return false;
	// 	}
	// 	if (orderType == "" && orderNum == "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid != "") {
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

	validateInput: function() {
		var orderType = $("#orderType").val();
		var orderNum = $("#orderNum").val();
		var serialNumber = $("#serialNumber").val();
		var ocAcceptDate = $("#ocAcceptDate").val();
		var exAcceptStaffid = $("#exAcceptStaffid").val();

		if (orderType != ""||orderNum != "") {
			$("#serialNumber,#ocAcceptDate,#exAcceptStaffid").attr("disabled", "disabled");
			// layer.open({
			// 	content: '请输入订单类型和订单号，或者输入业务号码，或者输入受理日期和受理人工号',
			// 	style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
			// 	time: 3
			// });
			return false;
		}
		if(serialNumber != ""){
			$("#orderType,#orderNum,#ocAcceptDate,#exAcceptStaffid").attr("disabled", "disabled");
		}
		if(ocAcceptDate != ""||exAcceptStaffid != ""){
			$("#orderType,#orderNum,#serialNumber").attr("disabled", "disabled");
		}

	},
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
	// 				content = title + "<ul class=\"col-sm-8 col-xs-8\"><li>" + resData[i].orderType + "</li><li>" + resData[i].ocAcceptDate + "</li><li>" + resData[i].orderNum + "</li><li>" + "<a href=>" + resData[i].serialNumber + "</a>" + "</li><li>" + resData[i].exAcceptStaffid + "</li></ul></div>";
	// 				$('.searchResult').append(content);
	// 			}
	// 		}
	// 	});
	// },

	ajaxValidate: function() {
		$.ajax({
			type: 'GET',
			async: true,
			url: testTbObj.urlSearch,
			dataType: 'json',
			beforeSend: function() {
				showLoader();
			},
			complete: function() {
				hideLoader();
			},
			success: function(resData) {
				var content;
				for (i = 0; i < resData.length; i++) {
					content = "<div class=\"content col-sm-12 col-xs-12\">" +
						"<ul class=\"contentul\"><li><div class=\"col-sm-4 col-xs-4\">" + "订单类型" +
						"</div><div class=\"col-sm-8 col-xs-8\">" + resData[i].orderType +
						"</div></li><li><div class=\"col-sm-4 col-xs-4\">" + "受理日期" +
						"</div><div class=\"col-sm-8 col-xs-8\">" + resData[i].ocAcceptDate +
						"</div></li><li><div class=\"col-sm-4 col-xs-4\">" + "订单号" +
						"</div><div class=\"col-sm-8 col-xs-8\">" + resData[i].orderNum +
						"</div></li><li><div class=\"col-sm-4 col-xs-4\">" + "业务号码" +
						"</div><div class=\"col-sm-8 col-xs-8\">" + "<a href=>" + resData[i].serialNumber +
						"</a>" + "</div></li><li><div class=\"col-sm-4 col-xs-4\">" + "受理人工号" +
						"</div><div class=\"col-sm-8 col-xs-8\">" + resData[i].exAcceptStaffid + "</div></li></ul></div>"
					$('.searchResult').append(content);
				}
			}
		});
	}

}