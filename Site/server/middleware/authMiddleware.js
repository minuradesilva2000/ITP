import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Middleware to verify if the user is authenticated using JWT
const verifyUser = async (req, res, next) => {
  try {
    // Retrieve the token from the authorization header (format: "Bearer <token>")
    const token = req.headers.authorization.split(' ')[1];

    // If no token is provided, return an error response
    if (!token) {
      return res.status(404).json({ success: false, error: "Token not Provided" });
    }

    // Verify the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // If token is invalid or expired, return an error response
    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token not valid" });
    }

    // Find the user associated with the decoded token (excluding password field)
    const user = await User.findById({ _id: decoded._id }).select('-password');
    
    // If the user doesn't exist, return an error response
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Attach the user object to the request for use in subsequent middleware or route handlers
    req.user = user;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    // If any error occurs (e.g., invalid token or server error), return a server error response
    res.status(500).json({ success: false, error: "Server side error" });
  }
};

export default verifyUser;
