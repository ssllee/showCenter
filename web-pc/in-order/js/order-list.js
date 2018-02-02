//本页面对象
var testTbObj = {
  //变量
  urlSearch: getRootPath_web() + "/js/data/table-pc-test.json",

  initTable: function() {
    var menuid = $("#menuid").val();
    $('#table').bootstrapTable("destroy");
    $('#table').bootstrapTable({
      //url: "http://localhost:8080/testSpringMvc/test/list.do"
      url: testTbObj.urlSearch
    });
  },
  //表格超链接
  validateInput: function() {
    var orderType = $("#orderType").val();
    var orderNum = $("#orderNum").val();
    var serialNumber = $("#serialNumber").val();
    var ocAcceptDate = $("#ocAcceptDate").val();
    var exAcceptStaffid = $("#exAcceptStaffid").val();
    var customerName = $("#customerName").val();

    if (orderType == "" && orderNum == "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid == "") {
      layer.open({
        content: '请输入订单类型和订单号，或者输入业务号码，或者输入受理日期和受理人工号',
        style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
        time: 3
      });
      return false;
    }
    if ((orderType && orderNum != "") || serialNumber != "" || (ocAcceptDate && exAcceptStaffid != "")) {
      return true;
    }
    if (orderType != "" && orderNum == "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid == "") {
      layer.open({
        content: '请输入订单号',
        style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
        time: 3
      });
      return false;
    }
    if (orderType == "" && orderNum != "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid == "") {
      layer.open({
        content: '请输入订单类型',
        style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
        time: 3
      });
      return false;
    }
    if (orderType == "" && orderNum == "" && serialNumber != "" && ocAcceptDate == "" && exAcceptStaffid == "") {
      return true;
    }
    if (orderType == "" && orderNum == "" && serialNumber == "" && ocAcceptDate != "" && exAcceptStaffid == "") {
      layer.open({
        content: '请输入受理人工号',
        style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
        time: 3
      });
      return false;
    }
    if (orderType == "" && orderNum == "" && serialNumber == "" && ocAcceptDate == "" && exAcceptStaffid != "") {
      layer.open({
        content: '请输入受理日期',
        style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
        time: 3
      });
      return false;
    } else {
      layer.open({
        content: '请输入订单类型和订单号，或者输入业务号码，或者输入受理日期和受理人工号',
        style: 'background-color:#f7f7f8; width:50%;color:#323232; border:none;',
        time: 3
      });
    }
  },



  actionFormatter: function(value, row, index) {
    return '<a class="mod" >修改</a> ' + '<a class="delete">删除</a>';
  }
}


$(".submitBtn").click(function() {
  if (testTbObj.validateInput() == true) {
    testTbObj.initTable();
  }



});


//【查询】按钮
//  $(".submitBtn").click(function() {
//
//    var orderType = $("#orderType").val();
//    var orderNum = $("#orderNum").val();
//    var serialNumber = $("#serialNumber").val();
//    var ocAcceptDate = $("#ocAcceptDate").val();
//    var addrName = $("#addrName").val();
//
//    $.ajax({
//      type: 'GET',
//      async: true,
//      url: testTbObj.urlSearch,
//      dataType: 'json',
//      success: function(resData) {
//        if (orderNum == resData.orderNum) {
//          alert(resData.orderType);
//          $("#table").append(resData.orderType + resData.ocAcceptDate);
//        }
//      }
//    });
//  });



// jQuery.validator.addMethod("check", function() {
//   return $("#orderNum").val() != "" || $("#serialNumber").val() != "" || $("#ocAcceptDate").val() != "";
// }, "");



// jQuery.validator.setDefaults({
//   debug: true,
//   errorElement: 'div',
//   errorPlacement: function(error, element) {
//     if ($(element).parent().hasClass('form-control')) {
//       error.insertAfter(element.parent());
//     } else {
//       error.insertAfter(element);
//     }
//   }
// });


// $(".submitBtn").click(function() {

//   $("#searchForm").validate({

//     rules: {
//       orderType: {
//         required: true,
//       },
//       orderNum: {
//         // required: true,
//         check: true,
//       },
//       serialNumber: {
//         // required: true,
//         check: true,
//       },


//       ocAcceptDate: {
//         check: true,
//       },
//       exAcceptStaffid: {
//         required: true,

//       },
//       customerName: {


//       }

//     },
//     messages: {
//       orderType: "请输入订单类型",
//       orderNum: "请输入订单号",
//       serialNumber: "请输入业务号码",
//       ocAcceptDate: "请输入受理日期",
//       exAcceptStaffid: {
//         required: "请输入受理人工号",
//       },
//       customerName: {
//         required: "请输入",
//       }
//     }
//   })


// });



//【重置】按钮
$(".resetBtn").click(function() {
  $('#searchForm').resetForm();
  $('#table').bootstrapTable("destroy");
  $('#table').bootstrapTable();
});

//表格  - 操作 - 事件
window.actionEvents = {
  //修改操作
  'click .mod': function(e, value, row, index) {
    var menuid = row.MENUID;
    alert(menuid);
  },
  //删除操作
  'click .delete': function(e, value, row, index) {
    var menuid = row.MENUID;
    alert(menuid);
  }
}