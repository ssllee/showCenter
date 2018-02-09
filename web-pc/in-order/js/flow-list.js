	
/************对内-PC-流程查询**************/
$(document).ready(function() {
	//初始加载该页面获取orderNum直接查询
	testTbObj.initTable();
});	

(function(){
	
	//input 提示语placeholder ie兼容初始化
	placeholder("#jobName");
	
  })();
//本页面对象
var testTbObj = {
	//变量
		
	//urlSearch: getOutUrl(getRootPath_web(),"/process/queryProcess?flag=int&orderNum="+orderNum+"&sysCode="+sysCode+"&jobName="+jobName)
	//urlSearch:getRootPath_web()+"/process/queryProcess"//"/js/data/inflow-table.json"
	//初始数据
	initTable: function(){
		var orderNum = getUrlParam("orderNum");
		var sysCode = $('#sysCode').val();
		var jobName = $('#jobName').val();
		$('#table').bootstrapTable("destroy");
	    $('#table').bootstrapTable({
	       // url: "http://localhost:8080/testSpringMvc/test/list.do",
	    	url: getRootPath_web() + "/process/queryProcess?flag=int&orderNum="+orderNum+"&sysCode="+sysCode+"&jobName="+jobName,
		    dataType : 'json',
	        method:"post",
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

