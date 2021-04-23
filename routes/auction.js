const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth')
const {UpcomingAuctions, ActiveAuctions, Results, RegisterAuction, AuctionDetails, GetAllBids, RegisterBid} =  require("./../controllers/auction");

router.route("/upcomingAuctions").get(UpcomingAuctions);

router.route("/activeAuctions").get(ActiveAuctions);

router.route("/results").get(Results);

router.route("/registerAuction").post(RegisterAuction);

router.route("/biding/:auctionID").get( protect, AuctionDetails)

router.route("/allBids/:auctionID").get(protect, GetAllBids);

router.route("/registerBid/:auctionID").post(RegisterBid);


module.exports = router;  
