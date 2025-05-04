import User from "../models/User.js";
import bcrypt from "bcrypt"

// 200 - request was successful and the server is responding with the requested data.

// Function to change a user's password
const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Find the user by ID
        const user = await User.findOne({ _id: userId });
        if (!user) {
            // If user not found, return an error
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Compare the provided old password with the stored password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            // If old password doesn't match, return an error
            return res.status(404).json({ success: false, error: "Wrong old password" });
        }

        // Hash the new password with a salt rounds value of 10
        const hashPassword = await bcrypt.hash(newPassword, 10);
        
        // Update the user's password with the newly hashed password
        const newUser = await User.findByIdAndUpdate(userId, { password: hashPassword }, { new: true });
        if (!newUser) {
            // If user update fails, return an error
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Return success response if password update is successful
        return res.status(200).json({ success: true, message: "Password update successful" });
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ success: false, error: "Setting error" });
    }
};

// Export the function to allow usage in other parts of the application
export { changePassword };
