//we will create controller fuctions for all the routes in this file
const User = require("./../models/User")
const ErrorResponse = require("./../utils/errorResponse");



const register = async (req, res, next) => {

   const {username, email, password} = req.body;

   try{

      const user = await User.create({
         username, email, password
      });
  
       res.status(201).json({
          success: true,
          user

       })


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


res.status(200).json({
   success: true,
   Token:"6t3ejhdu7"

});

   }catch(error){

        //sending error
      next(error);
   } 


 }


 const forgetPassword = (req, res, next) => {
    res.send("forget Password route");
 }


 const resetPassword = (req, res, next) => {
    res.send("Reset Password route");
 }

 module.exports = {register, login, forgetPassword, resetPassword};