const Auction = require("./../models/Auctions");
const ErrorResponse = require("./../utils/errorResponse");

const  RegisterAuction  = async(req, res, next) => {

    const {auctionID, auctionName, status, auctioneer, lot, minEstimation, maxEstimation, location, timings, discription} = req.body;

    if (!auctionID||!auctionName||!status||!auctioneer||!lot||!minEstimation||!maxEstimation||!location||!timings||!discription) {
        //sending error
        return next(new ErrorResponse("please provide all required fields", 400));
      }

      try{

        const auction = await Auction.create({
            auctionID,
            status,
            auctionName,
            auctioneer,
            lot,
            minEstimation,
            maxEstimation,
            location,
            timings,
            discription
        });

        res.status(201).json({
            success: true,
            auction
        })

      }
      catch(error){
          //sending errors
          next(error);

      }
}

const UpcomingAuctions = async(req,res, next) => {

    try{

        const upcomingAuctions = await Auction.find( { status : "upcoming" } );


        res.status(200).json({
            success:true,
            upcomingAuctions
        })
    }
    catch(error){
      next(error);
    }

}

const Results = async(req, res, next) =>{

    try{

        const finishedAuctions = await Auction.find( { status : "finished" } );


        res.status(200).json({
            success:true,
            finishedAuctions
        })
    }
    catch(error){
      next(error);
    }

}

const ActiveAuctions = async(req, res, next) =>{

    try{

        const activeAuctions = await Auction.find( { status : "active" } );


        res.status(200).json({
            success:true,
            activeAuctions
        })
    }
    catch(error){
      next(error);
    }
    
}

module.exports = {UpcomingAuctions, ActiveAuctions,Results, RegisterAuction};