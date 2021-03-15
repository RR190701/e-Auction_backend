//we will create controller fuctions for all the routes in this file
const User = require("./../models/User")
const ErrorResponse = require("./../utils/errorResponse");
const sendEmail = require('../utils/sendEmail')


const register = async (req, res, next) => {

   const {username, email, password} = req.body;

   try{

      const user = await User.create({
         username, email, password
      });
  
     sendToken(user, 201, res)


   }catch(error){

  //sending error
  next(error);
   }
}

const login = async (req, res, next) => {
  
   const {email, password} = req.body;

   if(!email||!password){

      //sending error
      return next( new ErrorResponse("please provide an email and password",400))
   }

   //now to check if the user already exist or not!!

   try{

      const user =  await User.findOne({email}).select("password");

      if(!user)
{

     //sending error
     return next( new ErrorResponse("invalid credentials(user does not exist)",401))

}

//checking if password match
const isMatch = await user.matchPasswords(password);

if(!isMatch){
   
     //sending error
     return next( new ErrorResponse("invalid credentials(wrong password)"),401)

  
}

sendToken(user, 200, res)

   }catch(error){

        //sending error
      next(error);
   } 


 }


 const forgetPassword = async (req, res, next) => {
   //  res.send("forget Password route");
    const {email} = req.body;
    try{
       const user = await User.findOne({email});
    if(!user){
       return next( new ErrorResponse("Email Could Not be sent", 404))
     } const resetToken = user.getResetPasswordToken();
     await user.save()

     const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
     const message = `<h1>You have requested a password reset</h1><a href= ${resetUrl} clicktracking=off>${reseturl}</a>`
try{
   await sendEmail({
      to: user.email,
      subject: "PASSWORD RESET REQUEST",
      text: message
   })
   res.status(200).json({ success: true, data: "email sent"})


}catch(error){
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;

await user.save();
return next(new ErrorResponse("EMAIL COULD NOT BE SENT", 500))
}
    } catch(error){
next(error)
    }
 }



 const resetPassword = (req, res, next) => {
    res.send("Reset Password route");
 }
 const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
   res.status(statusCode).json({ success: true, token})
   }

 module.exports = {register, login, forgetPassword, resetPassword};