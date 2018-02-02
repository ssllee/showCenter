	
/**************************/
	
/******PC端对内流转轨迹******/
//本页面对象
var testTbObj = {
	//变量
	urlSearch: getRootPath_web()+"/js/data/inflow-table.json"
	//初始数据
	,initTable: function(){
		//var orderNum = $("#orderNum").val();
		var createDate = $("#createDate").val();
		var sysCode = $("#sysCode").val();
		var jobName = $("#jobName").val();
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	       // url: "http://localhost:8080/testSpringMvc/test/list.do",
	    	url: testTbObj.urlSearch,
	        method:"get",
	        contentType:"application/x-www-form-urlencoded",
	        queryParams:"queryParams",
	        pagination:false,
	        sidePagination:"server",
	        pageSize:"10",
	        pageList:"[5, 10, 20, 50 ]",
	        showRefresh:false, 
	        showToggle:false,
	        showPaginationSwitch:false,
	        showColumns:false,
	        search:false,
	        searchAlign:"left",
	        sortName:createDate,
	        sortOrder:"desc",
	    });
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

