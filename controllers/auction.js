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
const AuctionDetails = async(req, res, next) =>{

    const auctionID = req.params.auctionID;
    if (!auctionID) {
        //sending error
        return next(new ErrorResponse("No auction ID mentioned", 400));
      }
    
      let auction;
    
      try {
        auction = await Auction.findOne({ auctionID });
    
        if (!auction) {
            //sending error
            return next(
              new ErrorResponse("No auction with that ID", 401)
            );
        }
    
      } catch (error) {
        //sending error
        next(error);
      }
    
      res.status(200).json({
        success: true,
        auction,
      });

}

const GetAllBids = async(req, res, next) =>{

  const auctionID = req.params.auctionID;
  if (!auctionID) {
      //sending error
      return next(new ErrorResponse("No auction ID mentioned", 400));
    }
  
    let auction;
    let allBids;
  
    try {
      auction = await Auction.findOne({ auctionID });
  
      if (!auction) {
          //sending error
          return next(
            new ErrorResponse("No auction with that ID", 401)
          );
      }

      allBids = auction.allBids;
  
    } catch (error) {
      //sending error
      next(error);
    }
  
    res.status(200).json({
      success: true,
      allBids,
    });

}

const RegisterBid = async(req, res, next) =>{


  const auctionID = req.params.auctionID;
  const {username, bid} = req.body;

  if (!username||!bid) {
    //sending error
    return next(new ErrorResponse("please provide required credentials", 400));
  }

  try{

    const auction = await Auction.findOne({auctionID});
    
    if (!auction) {
      //sending error
      return next(
        new ErrorResponse("No auction with that ID", 401)
      );
    
  }

  if(auction.status!=="active"){
    return next(
      new ErrorResponse("This auction is currently not active", 401)
    );
  }

  auction.allBids.push({
    username,
    bid
  });

  await auction.save();
  

  res.status(200).json({
    success: true,
    data:"Your bid registered successfully",
  });


  }
  catch(error){
    next(error);
  }

}

module.exports = {UpcomingAuctions, ActiveAuctions,Results, RegisterAuction, AuctionDetails, GetAllBids, RegisterBid};