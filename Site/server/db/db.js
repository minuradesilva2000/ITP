import mongoose from "mongoose";

// Function to establish a connection to MongoDB using Mongoose
const connectToDatabase = async () => {
  try {
    // Check if MONGODB_URL environment variable is defined, if not, throw an error
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined. Check your .env file.");
    }

    // Attempt to connect to MongoDB using the connection string from the environment variable
    await mongoose.connect(process.env.MONGODB_URL, { 
      useNewUrlParser: true,  // Ensures the URL parser is compatible with new MongoDB versions
      useUnifiedTopology: true  // Uses the new unified topology engine for better connection handling
    });

    // If connection is successful, log a success message
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    // If there’s an error during the connection, log the error message and exit the process
    console.error("Database connection error:", error);
    process.exit(1);  // Exit the process with a failure status code
  }
};

// Export the function to be used elsewhere in the application
export default connectToDatabase;
