var validator=require('validator');
var path=require('path');
var shortid=require('shortid');


var TemporaryUser=require('../../models/users/TemporaryUser');

var CONF_FILE=require('../../conf.json');

function sendMail(mail_to,mail_subject,mail_body){
	var nodemailer=require("nodemailer");
	var smtpTransport=nodemailer.createTransport('SMTP',{
			sevice: 'Gmail',
			auth: {
				user: CONF_FILE.email.username,
				pass: CONF_FILE.email.password
			}
	});
	//mail notification
    console.log("Sending mail");	
	var mailOptions = {
    from: '"VEND SERVICE"'+'<'+CONF_FILE.email.username+'>', // sender address 
    to: mail_to, // list of receivers 
    subject:mail_subject, // Subject line 
    text: mail_body // body 
	};
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
     }else{
            console.log("Message sent: " + response.message);
         }
	});
	return;
}

//for now leave it, make it work later
function sendMessage(message_to,message_body){

	var sinchSms = require('sinch-sms')({
		key: 'fb551b96-662d-441b-92df-2de5e22b1534', 
		secret: 'xMMXfBJ5D0++AUfYQRoOkA=='
	});
	sinchSms.send('+919882553532', message_body).then(function(response) {
		//All good, response contains messageId
		console.log(response);
	}).fail(function(error) {
		// Some type of error, see error object
		console.log(error);
	});
	/*var text = require('textbelt');
	var opts={
		fromAddr:CONF_FILE.email.username,
		fromName:"VEND-SMS",
		region:"intl",
		subject:"VEND NOTIFICATION MESSAGE"};
	text.debug(true);
	text.sendText('9882553532', 'A sample text message!',opts, function(err) {
	  if (err) {
	    console.log(err);
	  }
	});*/

}

exports.validateRegistrationData= function(input,imagefile){
	var error;
	// validate the input


	//firstname
	if (validator.isNull(input.firstname)||!validator.isAlpha(input.firstname)) {
		error="Firstname is not valid!! It can contain only alphabets.";
		return error;
	}
	//lastname
	if(validator.isNull(input.lastname)||!validator.isAlpha(input.lastname)){
		error="Lastname is not valid!! It can contain only alphabets.";
		return error;
	}
	//email
	if(!validator.isEmail(input.email)){
		error="Email is not valid.";
		return error;
	}
	//phone number
	if(!validator.isMobilePhone(input.contact,'en-IN')){
		error="Phone Number is not valid.";
		return error;
	}
	//profile picture
	if(imagefile!==undefined){
		var ext=path.extname(imagefile.path);
		//for now only two types of images
		if(ext!=='.jpg'&& ext!=='.png'&&ext!=='.JPG'&&ext!=='.PNG'){
			error="Image file is not supported!! Only .jpg and .png are supported.";
			return error;
		}
	}
	if(validator.isNull(input.username)){
		error="Username can not be empty!!";
		return error;
	}
	if(validator.isNull(input.username)||input.password.length<8){
		console.log("Inside password test.");

		error="Password is not valid!!";
		return error;
	}
	if(input.type==="Student"){
		//test specific to student details
		if(!validator.isAlphanumeric(input.rollno)){
			error="Roll Number is not valid!!";
			return error;
		}
		if(validator.isNull(input.department)){
			error="Department needs to be selected!!";
			return error;
		}
		if(validator.isNull(input.degree)){
			error="Degree type needs to be selected!!";
			return error;
		}
		
		switch(input.department){
				case 'CED':
					if(input.degree==='BTECH'){
						if(input.rollno.length!==5){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(2))!==1){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
					if(input.degree==='MTECH'){
						if(input.rollno.length!==6){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(3))!==1||input.rollno.charAt(2)!=='M'){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
				break;
				case 'EED':
					if(input.degree==='BTECH'){
						if(input.rollno.length!==5){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(2))!==2){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
					if(input.degree==='MTECH'){
						if(input.rollno.length!==6){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(3))!==2||input.rollno.charAt(2)!=='M'){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
				break;
				case 'MED':
					if(input.degree==='BTECH'){
						if(input.rollno.length!==5){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(2))!==3){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
					if(input.degree==='MTECH'){
						if(input.rollno.length!==6){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(3))!==3||input.rollno.charAt(2)!=='M'){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
				break;
				case 'ECE':
					if(input.degree==='BTECH'){
						if(input.rollno.length!==5){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(2))!==4){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
					if(input.degree==='MTECH'){
						if(input.rollno.length!==6){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(3))!==4||input.rollno.charAt(2)!=='M'){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
				break;
				case 'CSE':
					if(input.degree==='BTECH'){
						if(input.rollno.length!==5){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(2))!==5){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
					if(input.degree==='MTECH'){
						if(input.rollno.length!==6){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(3))!==5||input.rollno.charAt(2)!=='M'){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
				break;
				case 'ARCH':
					if(input.degree==='BTECH'){
						if(input.rollno.length!==5){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(2))!==6){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
					if(input.degree==='MTECH'){
						if(input.rollno.length!==6){
							error="Roll Number is not valid!!";
							return error;
						}
						if(parseInt(input.rollno.charAt(3))!==6||input.rollno.charAt(2)!=='M'){
							error="Roll Number does not match with you department!!";
							return error;
						}
					}
				break;
		}
		
	}
	if(input.type==="Teacher"){
		//test specific to teacher details 

		if(validator.isNull(input.teacher_department)){
			error="Department needs to be selected!!";
			return error;
		}
		if(validator.isNull(input.designation)){
			error="Designation needs to be selected!!";
			return error;
		}
	}

	return error;
}

exports.storeTemporaryUser=function(input,image_path){
	var temporaryUser=new TemporaryUser(input);

	temporaryUser.user_description=JSON.stringify(input);
	temporaryUser.temp_id=shortid.generate();
	temporaryUser.token=Math.floor(10000000+Math.random()*90000000);
	temporaryUser.image_path=image_path;
	temporaryUser.save();
	return temporaryUser.temp_id;

}

exports.deleteTemporaryUser=function(input){
	TemporaryUser.remove({temp_id:input},function(err){
		if(err)
			console.log(err);
	});
}

exports.sendConfirmationMail=function(input){
	var temp_id=input;
	TemporaryUser.findOne({temp_id:temp_id},function(err,temporaryUser){
		if(err)
			console.log(err);
		var data=JSON.parse(temporaryUser.user_description);		
		var token=temporaryUser.token;
		var mail_to=data.email;
		var mail_subject="VEND Account Verification";
		var mail_body="Your Account verification token is "+token+"."+
						" This token is valid only for this on the browser."+
						" After 15 minutes, this token will not be applicable.";
		// sendMail(mail_to,mail_subject,mail_body);
		return;
	});
}

exports.sendPasswordMail=function(email,firstname,username,password){
	var mail_to=email;
	var mail_subject="VEND Password Request";
	var mail_body="Hello "+firstname+", this email contains your VEND account password. "+
					"Please change your password for more safety from settings panel. "+
					"Your account credentials are:\n"+
					"Username: "+firstname+"\n"+
					"Password: "+password+"\n";
	// sendMail(mail_to,mail_subject,mail_body);
	return;

}
exports.sendConfirmationMessage=function(input){
	var temp_id=input;
	TemporaryUser.findOne({temp_id:temp_id},function(err,temporaryUser){
		if(err)
			console.log(err);
		var data=JSON.parse(temporaryUser.user_description);		
		var token=temporaryUser.token;
		var message_to='+91'+data.contact;
		var message_body="Your Account verification token is "+token+"."+
		" This token is valid only for this on the browser."+
		" After 15 minutes, this token will not be applicable.";
		 // sendMessage(message_to,message_body);
		return;
	});
	

}