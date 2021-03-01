//we will create controller fuctions for all the routes in this file

const register = (req, res, next) => {
   res.send("Regiter route");
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