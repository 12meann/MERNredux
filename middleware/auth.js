const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  //check token
  if (!token)
    return res.status(401).json({
      msg: "Authorization denied. You have to be logged in to do that."
    });

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // add user payload
    req.user = decoded;
    next();
  } catch (e) {
    res
      .status(400)
      .json({
        msg:
          "Invalid token. You have to be logged in with your account to do that"
      });
  }
}

module.exports = auth;
