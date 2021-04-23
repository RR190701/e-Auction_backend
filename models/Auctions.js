const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken')
// const crypto = require("crypto")

const auctionSchema = new mongoose.Schema({

    auctionID: {
        type: String,
        unique:true,
        required:[true, "Please provide an auction ID"]

    },
    status: {
        type: String,
        required:[true, "Please provide the status of the auction"]

    },
    auctionName: {
        type: String,
        required:[true, "Please provide an auction name"]

    },
    auctioneer: {
        type: String,
        required:[true, "Please provide auctioneer"]

    },
    lot: {
        type: Number,
        required:[true, "Please provide lot"]

    },
    minEstimation: {
        type:Number,
        required:[true, "Please provide a minimum estimated price"]
    },
    maxEstimation: {
        type:Number,
        required:[true, "Please provide a maximum estimated price"]
    },
    location: {
        type:String,
        required:[true, "Please provide a location"]
    },
    discription: {
        type:String,
        required:[true, "Please provide a discription"]
    },
    timings:Date,
    allBids:[
        {

            username: {
                type:String,
                required:[true, "username is required"]
            },
            bid: {
                type:Number,
                required:[true, "Please provide a bid value"]
            }
           
        }
    ]

});

// //before saving
// userSchema.pre("save", async function(){

//     //if the password is not changed
//     if(!this.isModified("password")){
//         next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);

// });

// //for checking password during login
// userSchema.methods.matchPasswords = async function(password){
// return await bcrypt.compare(password,this.password);
// }

// //for getting a signed token for password reset
// userSchema.methods.getSignedToken = function(){
//     return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
// }

// userSchema.methods.getResetPasswordToken = function() {
//     const resetToken = crypto.randomBytes(20).toString("hex");    
//     return resetToken;
// }
const Auction = mongoose.model("Auction", auctionSchema); 

module.exports = Auction;