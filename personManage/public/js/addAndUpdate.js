!(function(){
	var submit = $("#submit"),
		inputName = $("#inputName"),
		inputimgUrl = $("#inputimgUrl"),
		inputDescription = $("#inputDescription"),
		inputBirth = $("#inputBirth"),
		inputCountry = $("#inputCountry"),
		inputOther = $("#inputOther"),
		mainForm = $("#mainForm");

	submit.click(function(event) {
		var msg;
		submit.attr("data-content","");
		if(inputName.val() == ""){
			msg = "姓名为空"
		}else if(inputimgUrl.val() == ""){
			msg = "图片地址为空"
		}else if(inputDescription.val() == ""){
			msg = "详细描述为空"
		}else if(inputBirth.val() == ""){
			msg = "出生日期为空"
		}else if(inputCountry.val() == ""){
			msg = "国籍为空"
		}else if(inputOther.val() == ""){
			msg = "其它信息为空"
		}
		if(msg){
			submit.attr("data-content",msg);
			submit.popover("show");
			return;
		}else{
			mainForm.submit();
		}
	});

})()