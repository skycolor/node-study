var mongoose = require("mongoose");
/*创建数据表的实例*/
var PersonSchma = new mongoose.Schema({
	name:String,
	imgUrl:String,
	description:String,
	birth:String,
	country:String,
	other:String,
	meta:{
		createTime:{
			type:Date,
			default:Date.now()
		},
		updateTime:{
			type:Date,
			default:Date.now()
		}
	}
});
/*
* mongoose有相关的方法提供给操作者，如最为简单
* 的增删改，pre方法则是给文档操作提供一个前缀
* 我的理解就是在实际的数据操作前进行处理
*/
/*保存方法的额外处理*/
PersonSchma.pre("save",function(next){
	console.log(this);
	//当数据为新数据时，创建时间跟修改时间一致
	if(this.isNew){
		this.meta.createTime = this.meta.updateTime;
	}else{	//当数据为旧数据时，更新修改时间
		this.meta.updateTime = Date.now();
	}
	next();
});
/*
* statics方法的目的是为了定义私有方法，方便模型
* mode创造的实例进行调用
*/
/*定义私有方法*/
PersonSchma.statics = {
	findAll:function(cb){
		return this.find({}).sort("meta.updateTime").exec(cb);
	},
	findByID:function(id,cb){
		return this.findOne({_id:id}).exec(cb);
	}
}
/*将Schma 对外开放*/
module.exports = PersonSchma;


