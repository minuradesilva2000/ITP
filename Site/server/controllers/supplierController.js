import multer from 'multer'
import bcrypt from 'bcrypt'
import path from "path"
import Supplier from '../models/Supplier.js'

// 200 - request was successful and the server is responding with the requested data.

// Configure the storage for uploaded files (profile images)
const storage = multer.diskStorage({
    // Destination folder for uploaded files
    destination: (req, file, cb) => {
        cb(null, "public/uploads") // Files will be stored in the "public/uploads" folder
    },
    // Filename setup to ensure unique names for each file
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as part of filename
    }
})

// Initialize multer with the specified storage configuration
const upload = multer({ storage: storage })

// Function to add a new supplier
const addSupplier = async (req, res) => {
    try {
        const {  name, business, email, phone } = req.body;
        
        // Check if the supplier already exists by email
        const supplier = await Supplier.findOne({ email });
        if (supplier) {
            return res.status(400).json({ success: false, error: "Supplier already registered" });
        }

        const supplierId = 'SUP' + Date.now();
        // Create a new supplier instance with the provided data
        const newSupplier = new Supplier({
            supplierId, name, business, email, phone, profileImage: req.file ? req.file.filename : ""
        });

        // Save the new supplier to the database
        await newSupplier.save();
        
        return res.status(200).json({ success: true, message: "Supplier added" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "AddSupplier server error" });
    }
};

// Function to get a list of all suppliers
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find().exec();
        
        // Check if any suppliers are found
        if (!suppliers) {
            return res.status(404).json({ success: false, error: "No suppliers found." });
        }
        
        // Return the list of suppliers
        return res.status(200).json({ success: true, suppliers });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get suppliers server error" });
    }
};

// Function to get a specific supplier by ID
const getSupplier = async (req, res) => {
    try {
        const { id } = req.params; // Get the supplier ID from request params
        
        // Fetch the supplier by ID
        const supplier = await Supplier.findById(id);
        
        // If the supplier is not found, return an error
        if (!supplier) {
            return res.status(404).json({ success: false, error: "Supplier not found" });
        }
        
        // Return the supplier details
        return res.status(200).json({ success: true, supplier });
    } catch (error) {
        console.error("Get Supplier Error:", error);
        return res.status(500).json({ success: false, error: "Get supplier server error" });
    }
};

// Function to update an existing supplier
const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params; // Get the supplier ID from request params
        const { supplierId, name, business, email, phone } = req.body;

        // Check if the supplier exists
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({ success: false, error: "Supplier not found" });
        }

        // Update the supplier with new data
        const updateSupplier = await Supplier.findByIdAndUpdate({ _id: id }, { supplierId, name, business, email, phone });

        // If update fails, return an error
        if (!updateSupplier) {
            return res.status(404).json({ success: false, error: "Supplier not updated" });
        }

        return res.status(200).json({ success: true, message: "Supplier updated" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Update supplier server error" });
    }
};

// Function to delete a supplier
const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params; // Get the supplier ID from request params
        
        // Find and delete the supplier by ID
        const supplier = await Supplier.findByIdAndDelete(id);
        
        // If the supplier doesn't exist, return an error
        if (!supplier) {
            return res.status(404).json({ success: false, error: "Supplier not found" });
        }
        
        // Return success message if deletion is successful
        return res.status(200).json({ success: true, message: "Supplier deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Delete supplier server error" });
    }
};

// GET /api/supplier/next-id
 const getNextSupplierId = async (req, res) => {
    try {
      // Find the supplier with the highest numeric ID
      const last = await Supplier.findOne()
        .sort({ supplierId: -1 })
        .select('supplierId')
        .lean();
      const nextId = last
        ? String(Number(last.supplierId) + 1)
        : '1'; // start at '1' if none exist
      return res.json({ success: true, nextId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err.message });
    }
  };

// Export the functions for use in other parts of the application
export { addSupplier, upload, getSuppliers, getSupplier, updateSupplier, deleteSupplier,getNextSupplierId }
