!(function(){
	$(".delete").click(function(){
		var _this = $(this),
			nid = _this.data("nid");
		if(!nid){
			return;
		}
		if(confirm("是否确定删除改条信息")){
			$.ajax({
				type:"delete",
				url:"/admin/delete?id=" + nid
			}).done(function(ret){
				if(ret && ret.code == "100"){
					_this.parents("tr").remove();
				}
			});
		}
	});

})();