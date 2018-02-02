	
/**************pc test************/
(function(){
	
  })();

//本页面对象
var testTbObj = {
	//变量
	urlSearch: getRootPath_web()+"/test2/list" //  "/js/data/table.json"
	//初始数据
	,initTable: function(){
		var menuid = $("#menuid").val();
		
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	        //url: "http://localhost:8080/testSpringMvc/test/list.do"
	    	url: testTbObj.urlSearch
	    });
	}
	//表格超链接
	,actionFormatter: function(value, row, index) {
		 return '<a class="mod" >修改</a> ' + '<a class="delete">删除</a>';
	}
	
}


//【查询】按钮
$(".submitBtn").click(function(){
	testTbObj.initTable();
});
//【重置】按钮
$(".resetBtn").click(function(){
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
	'click .delete' : function(e, value, row, index) {
      var menuid = row.MENUID;
      alert(menuid); 
   }
}