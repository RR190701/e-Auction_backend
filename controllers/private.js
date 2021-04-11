//to access private data after logIn
const User = require("./../models/User");
const ErrorResponse = require("./../utils/errorResponse");

exports.getPrivateData = async (req, res, next) => {
  const email = req.params.email;

  if (!email) {
    //sending error
    return next(new ErrorResponse("No username mentioned", 400));
  }

  let user;

  try {
    user = await User.findOne({ email }).populate('-password');

    if (!user) {
        //sending error
        return next(
          new ErrorResponse("user does not exist", 401)
        );
    }

  } catch (error) {
    //sending error
    next(error);
  }

  res.status(200).json({
    success: true,
    user,
  });
};
