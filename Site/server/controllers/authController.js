import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Compare provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      /* access to process */
      /* process.env.JWT_KEY  environment variable aka sign kirimata screte key aka labanannawa */
      { expiresIn: "10d" }  /* Sets the expiration time of the JWT  */
    );

    // Respond with the token and user details
    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
    // If an error occurs, send a 500 status code - internal server error 
    //res.status() function aka ganne  set  status code to response
    //re.status() wala parameter widiyata ganne http status codes
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { login, verify };

