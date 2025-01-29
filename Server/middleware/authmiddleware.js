const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);

        if (!user) {
          return res
            .status(401)
            .json({ error: "User not found, unauthorized" });
        }

        req.user = user;
        next();
      }
    } catch (error) {
      // Token expired or invalid
      return res
        .status(401)
        .json({ error: "Not authorized, token expired. Please log in again." });
    }
  } else {
    return res
      .status(401)
      .json({ error: "No token provided. Authorization denied." });
  }
});

// check access
const checkAccess = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authorized, no user found." });
  }

  const { email } = req.user;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "User not found, unauthorized." });
  }

  const route = req.originalUrl.split("/")[2]; // Dynamically grab the route

  if (
    user.role.toLowerCase() === "admin" ||
    (user.role.toLowerCase() === "employee" &&
      user.allowedRoutes.includes(route))
  ) {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "You are not authorized to access this route." });
  }
});


module.exports = { authMiddleware, checkAccess };