import Payment from '../models/Payment.js';

// 200 - request was successful and the server is responding with the requested data.

// Function to get all payments, including order and supplier details
export const getPayments = async (req, res) => {
  try {
    // Retrieve all payments and populate order and supplier details
    const payments = await Payment.find().populate({
      path: 'order',
      populate: { path: 'supplier' } // Populate supplier details for each order
    });
    
    // If no payments are found, return a 404 error
    if (!payments) {
      return res.status(404).json({ success: false, error: "No payments found." });
    }
    
    // Return the retrieved payments
    return res.status(200).json({ success: true, payments });
  } catch (error) {
    // Return server error if something goes wrong
    return res.status(500).json({ success: false, error: "Get payments server error" });
  }
};

// Function to get a specific payment by ID, including order and supplier details
export const getPayment = async (req, res) => {
  try {
    const { id } = req.params; // Get payment ID from URL parameters
    
    // Retrieve the payment by ID and populate order and supplier details
    const payment = await Payment.findById(id).populate({
      path: 'order',
      populate: { path: 'supplier' }
    });
    
    // If the payment is not found, return a 404 error
    if (!payment) {
      return res.status(404).json({ success: false, error: "Payment not found" });
    }
    
    // Return the retrieved payment
    return res.status(200).json({ success: true, payment });
  } catch (error) {
    // Return server error if something goes wrong
    return res.status(500).json({ success: false, error: "Get payment server error" });
  }
};

// Function to update the status and date of a specific payment
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params; // Get payment ID from URL parameters
    const { paymentStatus, paymentDate } = req.body; // Extract the payment status and date from the request body
    
    // Find the payment by ID
    const payment = await Payment.findById(id);
    
    // If the payment is not found, return a 404 error
    if (!payment) {
      return res.status(404).json({ success: false, error: "Payment not found" });
    }

    // Update the payment status
    payment.paymentStatus = paymentStatus;
    
    // If the payment status is "Payed", update the paid date
    if (paymentStatus === "Payed" && paymentDate) {
      payment.payedDate = new Date(paymentDate); // Store the payment date
    }
    
    // Set the updated time for the payment
    payment.updatedAt = Date.now();
    
    // Save the updated payment to the database
    await payment.save();
    
    // Return success response with the updated payment
    return res.status(200).json({ success: true, message: "Payment updated", payment });
  } catch (error) {
    // Return server error if something goes wrong during the update
    return res.status(500).json({ success: false, error: "Update payment server error" });
  }
};

// Function to delete a specific payment by ID
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params; // Get payment ID from URL parameters
    
    // Find and delete the payment by ID
    const payment = await Payment.findByIdAndDelete(id);
    
    // If the payment is not found, return a 404 error
    if (!payment) {
      return res.status(404).json({ success: false, error: "Payment not found" });
    }
    
    // Return success message if the payment was deleted successfully
    return res.status(200).json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    // Return server error if something goes wrong during the deletion
    return res.status(500).json({ success: false, error: "Delete payment server error" });
  }
};
