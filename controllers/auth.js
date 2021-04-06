//we will create controller fuctions for all the routes in this file
const User = require("./../models/User");
const ErrorResponse = require("./../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")
const bcrypt = require("bcryptjs");


const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username||!email || !password) {
    //sending error
    return next(new ErrorResponse("please provide an (email/ password/ username)", 400));
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 201, res);

  } catch (error) {
    //sending error
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    //sending error
    return next(new ErrorResponse("please provide an email and password", 400));
  }

  //now to check if the user already exist or not!!

  try {
    const user = await User.findOne({ email }).select("password");

    if (!user) {
      //sending error
      return next(
        new ErrorResponse("invalid credentials(user does not exist)", 401)
      );
    }

    //checking if password match
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      //sending error
      return next(
        new ErrorResponse("invalid credentials(wrong password)"),
        401
      );
    }

    sendToken(user, 200, res);
  } catch (error) {
    //sending error
    next(error);
  }
};

//A fuction to send mail with password reset link
const forgetPassword = async (req, res, next) => {

  const {email} = req.body;

  try{

    
    let user = await User.findOne({email});

    //to make sure user is authentic
    if(!user){
      return next(new ErrorResponse("No such user", 404));
    }


    const resetToken = crypto.randomBytes(20).toString("hex");
    const reset_Password_Token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    

    const update = { 
      resetPasswordToken: reset_Password_Token,
      resetPasswordExpire: Date.now() + 10 * (60*1000) };
    await user.updateOne(update);
    
    
    
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to the link to reset your password</p>
    <a href = ${resetUrl} clicktracking=off>${resetUrl}</a>
    `
    
    try{
      await sendEmail({
        to:user.email,
        subject:"Password Reset Request",
        text:message,

      });

      res.status(200).json({
        success:true,
        data:"Email sent"
      });

    }catch(error){


      await user.updateOne({},{ 
        password : req.body.password,
        resetPasswordToken: undefined,
        resetPasswordExpire: undefined });

    return next(new ErrorResponse("Email could not be sent", 500));
    }

  }catch(error){
    

    return next(new ErrorResponse("Server error", 500));
  }

};

const resetPassword = async (req, res, next) => {

  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

  try{
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt: Date.now()}
    });

    if(!user){
      return next(new ErrorResponse("Invalid reset token", 400));
    }


    const salt = await bcrypt.genSalt(10);
    const new_password = await bcrypt.hash(req.body.password, salt);

    const update = { 
      password : new_password,
      resetPasswordToken: undefined,
      resetPasswordExpire: undefined }; 

    await user.updateOne(update);

    res.status(201).json({
      success: true,
      data: "Password reset success"
    })
  
  }catch(error){

    return next(new ErrorResponse("Server error", 500));
  }
};

//A function that create a signed jwt token for the authentication of the user
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};

module.exports = { register, login, forgetPassword, resetPassword };
