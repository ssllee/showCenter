/*************对内-PC-订单查询*********/


$(document).ready(function() {

  testTbObj.validateInput();
  //tab切换
  $(".nav-tabs li").click(function() {
    $(".nav-tabs li").removeClass("active");
    $(this).addClass("active");
  });

});


function showDiv(objId) {
  var objDiv = document.getElementById(objId);
  var objDiv1 = document.getElementById("id1");
  var objDiv2 = document.getElementById("id2");
  var objDiv3 = document.getElementById("id3");

  objDiv1.style.display = "none";
  objDiv2.style.display = "none";
  objDiv3.style.display = "none";
  objDiv.style.display = "";
};


//本页面对象
var testTbObj = {
	  //变量
	  //urlSearch: getRootPath_web() + "/js/data/table-pc-test.jso?flag=intn",
	  serilUrlSearch: getRootPath_web() + "/trade/queryOrder?flag=int",
	  orderSearch: getRootPath_web() + "/trade/queryOrder?flag=int",
	  dateSearch: getRootPath_web() + "/trade/queryOrder?flag=int",
	  //查询方式二
	  initSerilUrTable: function() {
		var customerName = $("#cn2").val();
	    $('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	      url: testTbObj.serilUrlSearch + "&customerName=" +customerName
	    });
	  },
	  //查询方式一
	  initOrderTable: function() {
		var customerName = $("#cn1").val();
	    $('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	      url: testTbObj.orderSearch + "&customerName=" +customerName
	    });
	  },
	  //查询方式三
	  initDateTable: function() {
		var customerName = $("#cn3").val();
	    $('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	      url: testTbObj.dateSearch + "&customerName=" +customerName
	    });
	  },
	  //th超链接
	  actionFormatter: function(value, row, index) {
		  return '<a class="orderNum" >' + value + '</a> ';
	  },
      //【查询】【重置】按钮事件
	  validateInput: function() {
	
		    $("#in_orderNumSearch").click(function() {
			      var orderType = $("#orderType").val();
			      var orderNum = $("#orderNum").val();
			      if (orderType == "") {
			        layer.msg('请选择订单类型！', {
	        			time: 2000 //2s后自动关闭
			        });
			        return false;
			      }
			      if (orderNum == "") {
			        layer.msg('请输入订单号码！', {
	        			time: 2000 //2s后自动关闭
			        });
			        return false;
			      }
			      //传业务号码到订单列表页面：order-list             
			      testTbObj.initOrderTable();
		    });
		
		    $("#in_serialNumberSearch").click(function() {
			      var serialNumber = $("#serialNumber").val();
			      if (serialNumber == "") {
			        layer.msg('请输入您的业务号码！', {
	        			time: 2000 //2s后自动关闭
			        });
			        return false;
			      }
			      //传业务号码到订单列表页面：order-list             
			      testTbObj.initSerilUrTable();
		    });
		
		    $("#in_exAcceptStaffidSearch").click(function() {
			      var ocAcceptDate = $("#ocAcceptDate").val();
			      var exAcceptStaffid = $("#exAcceptStaffid").val();
			      if (ocAcceptDate == "") {
			        layer.msg('请选择受理日期！', {
	        			time: 2000 //2s后自动关闭
			        });
			        return false;
			      }
			      if (exAcceptStaffid == "") {
			        layer.msg('请输入受理人工号！', {
	        			time: 2000 //2s后自动关闭
			        });
			        return false;
			      }
			      //传业务号码到订单列表页面：order-list             
			      testTbObj.initDateTable();
		    });
		    
		    //【重置】按钮
		    $(".resetBtn,.change").click(function() {
		    	$('#searchForm').resetForm();
		    	$('#table').bootstrapTable("destroy");
		    	$('#table').bootstrapTable();
		    });
	  }
};


////表格  - 操作 - 事件
window.actionEvents = {
	//跳转
	'click .orderNum': function(e, value, row, index) {
		var orderNum = row.orderNum;
        var htmlUrl = getRootPath_web() + "/web-pc/in-order/flow-list.html?orderNum="+orderNum;
        location.href = htmlUrl;
	}
}