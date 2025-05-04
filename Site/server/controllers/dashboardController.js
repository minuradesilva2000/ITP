import Supplier from "../models/Supplier.js";
import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js"

// Get a summary of the organization's key data
const getSummary = async (req, res) => {
  try {
    // Get the total number of employees
    const totalEmployees = await Employee.countDocuments();
    
      // Get the total number of suppliers
      const totalSuppliers = await Supplier.countDocuments();

    // Get the total number of departments
    const totalDepartments = await Department.countDocuments();
    
    // Calculate the total salary amount for all employees
    const totalSalaries = await Employee.aggregate([
      { 
        $group: { 
          _id: null, 
          totalSalary: { 
            $sum: { 
              $toDouble: { 
                $ifNull: ["$salary", 0] // Convert salary to a double and handle null or undefined values by defaulting to 0
              } 
            } 
          } 
        } 
      }
    ]);
    
    // If there are salaries, extract the total salary amount; otherwise, default to 0
    const totalSalaryAmount = totalSalaries.length > 0 ? totalSalaries[0].totalSalary : 0;

    // Get the total number of orders
    const totalOrders = await Order.countDocuments();
    
    // Get the number of orders with different statuses
    const placedOrders = await Order.countDocuments({ status: "Placed" });
    const receivedOrders = await Order.countDocuments({ status: "Received" });
    const cancelledOrders = await Order.countDocuments({ status: "Cancelled" });

    // Organize order summary
    const ordersSummary = {
      totalOrders,
      placed: placedOrders,
      received: receivedOrders,
      cancelled: cancelledOrders
    };

    // Get the total number of payments
    const totalPayments = await Payment.countDocuments();
    // Get the number of orders with different statuses
    const pendingPayments = await Payment.countDocuments({ paymentStatus: "Pending" });
    const payedPayments = await Payment.countDocuments({ paymentStatus: "Payed" });

    // Organize Payment summary
    const paymentsSummary = {
      totalPayments,
      pending: pendingPayments,
      payed: payedPayments,
    };

    // Return the summary response containing employees, departments, salary, and orders information
    return res.status(200).json({
      success: true,
      totalEmployees,
      totalSuppliers,
      totalDepartments,
      totalSalary: totalSalaryAmount,
      ordersSummary,
      paymentsSummary
    });
  } catch (error) {
    // Log the error and return a server error response
    console.error(error);
    return res.status(500).json({ success: false, error: "Dashboard summary error" });
  }
};

export { getSummary };
