const express = require("express");
const router = express.Router();
const {UpcomingAuctions, ActiveAuctions, Results, RegisterAuction} =  require("./../controllers/auction");

router.route("/upcomingAuctions").get(UpcomingAuctions);

router.route("/activeAuctions").get(ActiveAuctions);

router.route("/results").get(Results);

router.route("/registerAuction").post(RegisterAuction);


module.exports = router;  
