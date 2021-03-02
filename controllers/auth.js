//we will create controller fuctions for all the routes in this file
const User = require("./../models/User")




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

      res.status(500).json({
         success: false,
         error: error.message

      })
   }
}

const login = async (req, res, next) => {
  
   const {email, password} = req.body;

   if(!email||!password){
      res.status(400).json({
         success:false,
         error:"please provide an email and password"
      })
   }

   //now to check if the user already exist or not!!

   try{

      const user =  await User.findOne({email}).select("password");

      if(!user)
{
   res.status(404).json({
      success:false,
      error:"invalid credentials(user does not exist)"
   
   })
}

//checking if password match
const isMatch = await user.matchPasswords(password);

if(!isMatch){
   res.status(400).json({
  success:false,
  error:"invalid credentials(wrong password)",
   })
  
}


res.status(200).json({
   success: true,
   Token:"6t3ejhdu7"

});

   }catch(error){

      res.status(500).json({
         success:false,
         error:error.message
      })

   } 


 }


 const forgetPassword = (req, res, next) => {
    res.send("forget Password route");
 }


 const resetPassword = (req, res, next) => {
    res.send("Reset Password route");
 }

 module.exports = {register, login, forgetPassword, resetPassword};