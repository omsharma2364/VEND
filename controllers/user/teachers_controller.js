var validator=require('validator');

var Teacher=require('../../models/users/Teacher');
var Account=require('../../models/Account');
var RecentlyViewed=require('../../models/RecentlyViewed');
var Advertisement=require('../../models/Advertisement');
var Wish=require('../../models/Wish');	
var Notification=require('../../models/Notification');	

var userFunctions=require("../functions/user");
var helper=require('../functions/helper');


//for profile picture
var path = require('path');
var APP_DIR = path.dirname(require.main.filename);

//after confirm page this register is done
exports.register=function(req,res,input,image_path,callback){
	var teacher=new Teacher(input);
	teacher.department=input.teacher_department;
	//profile picture
 	
 		var oldPath=image_path;
 		var ext=path.extname(oldPath);
 		var savedPath="/uploads/profilepictures/teachers/"+teacher._id+ext;
        var newPath = APP_DIR +'/public'+ savedPath;
		helper.resizeAndMoveImage(oldPath,newPath);
		
 	//picture done



	teacher.save();
	
	var account=userFunctions.saveAccount(teacher,savedPath,input.username,input.password,input.type);

	delete req.session.temp_id;
	

	userFunctions.setSession(req,account);
	callback();
	
}
exports.find=function(account,callback){
	Teacher.findOne({_id:id},function(err,teacher){
		if(err)
			console.log(err);
		else{
			callback(teacher);
		}
	});
}

exports.changeEmail=function(id,email,callback){
	Teacher.findOne({_id:id},function(err,user){
		if(err||user===null){
			callback(1);
		}
		else{
			if(validator.isEmail(email)){
	 			user.email=email;
		 		user.save(function(){
		 			callback(0);
		 		});
		 	}
		 	else
		 		callback(1);
		}
	});
}

exports.changeContact=function(id,contact,callback){
	Teacher.findOne({_id:id},function(err,user){
		if(err||user===null){
			callback(1);
		}
		else{
			if(validator.isMobilePhone(contact,'en-IN')){
	 			user.contact=contact;
		 		user.save(function(){
		 			callback(0);
		 		});
		 	}
		 	else
		 		callback(1);
		}
	});
}
