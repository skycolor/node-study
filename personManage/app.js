var express = require("express");
var path = require("path");
var app = express();
var mongoose = require("mongoose");
var _ = require("underscore");//用于处理json对象合并
/*设置页面路径，以及前端模版引擎*/
app.set("views","./views/pages");;
app.set("view engine","jade");
/*设置静态资源路径,__dirname是本机该文件的物理目录*/
app.use(express.static(path.join(__dirname,"public")))
/*这个是express的中间件，用于解析客户端body中的内容*/
app.use(require('body-parser').urlencoded({extended: true}))
/*设置服务的端口号，前者是可以通过命令行传入端口号*/
var port = process.env.port || 3000;
app.listen(port);
/*mongodb 获取数据*/
mongoose.connect("mongodb://localhost/firstNode");
var Person = require("./models/person");
/*加载moment，直接在页面中调用*/
app.locals.moment = require("moment");
/*默认页面，即列表页面*/
app.get("/",function(req,res){
	Person.findAll(function(err,list){
		if(err){
			console.log(err);
		}
		res.render("index",{
			titile:"首页",
			list:list
		})
	});
});
/*人物详情*/
app.get("/detail/:id",function(req,res){
	var id = req.params.id;
	Person.findByID(id,function(err,person){
		if(err) console.log(err);
		res.render("detail",{
			titile : "详情",
			person : person
		})
	});
});
/*录入页面*/
app.get("/admin/add",function(req,res){
	res.render("addAndUpdate",{
		titile:"录入页",
		person:{
			name : "",
			imgUrl : "",
			description : "",
			birth : "",
			country : "",
			other : ""
		}
	});
});
/*修改页面*/
app.get("/admin/update/:id",function(req,res){
	var id = req.params.id;
	Person.findByID(id,function(err,person){
		if(err) console.log(err);
		res.render("addAndUpdate",{
			titile:"修改页",
			person:person
		});
	});
});
/*管理员 查看咧表页面*/
app.get("/admin/list",function(req,res){
	Person.findAll(function(err,list){
		if(err){
			console.log(err);
		}
		res.render("list",{
			titile:"列表页",
			list:list
		});
	});
});
/*保存*/
app.post("/admin/save",function(req,res){
	var id = req.body.person._id;
	var personObj = req.body.person;
	var _person;
	if(id !== "undefined"){	//	修改
		Person.findByID(id,function(err,person){
			if(err) console.log(err);
			//将修改的对象合并到查询到的对象中
			_person = _.extend(person, personObj);
			//保存
			_person.save(function(err,person){
				if(err) console.log(err);
				res.redirect("/admin/list");
			});
		});
	}else{	//新增
		_person = new Person({
			name : personObj.name,
			imgUrl : personObj.imgUrl,
			description : personObj.description,
			birth : personObj.birth,
			country : personObj.country,
			other : personObj.other
		});
		_person.save(function(err,person){
			if(err) console.log(err);
			res.redirect("/admin/list");
		});
	}
});
/*删除*/
app.delete("/admin/delete",function(req,res){
	var _id = req.query.id;
	if(!_id) return;
	Person.remove({_id:_id},function(err,person){
		if(err){	//失败时，直接返回失败的信息
			console.log(err);
			res.json({code:"0",msg:"error"});
		}else{	//成功时返回自定义的json
			res.json({code:"100",msg:"ok"});
		}
	});
});
console.log("port is " + port);
