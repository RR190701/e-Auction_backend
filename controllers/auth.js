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

const login = (req, res, next) => {
    res.send("login route");
 }


 const forgetPassword = (req, res, next) => {
    res.send("forget Password route");
 }


 const resetPassword = (req, res, next) => {
    res.send("Reset Password route");
 }

 module.exports = {register, login, forgetPassword, resetPassword};