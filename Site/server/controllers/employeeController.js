import multer from 'multer'
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import path  from "path"

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
      // Change from "public" to "public/uploads"
      cb(null, "public/uploads"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});



//Set up storage configuration for Multer
const upload=multer({storage:storage})

const addEmployee = async(req,res) => {
    try{
        const { name,  dob, gender, maritalStatus, designation, salary, type, phoneNumber } = req.body;

        // Validate that phoneNumber is exactly 10 digits.
        if (!/^\d{10}$/.test(phoneNumber)) {
          return res.status(400).json({ success: false, error: "Invalid phone number. It must be exactly 10 digits." });
        }
        const employeeId = 'EMP' + Date.now();
        const newEmployee = new Employee({
          name,          
          employeeId,
          dob,          
          gender,
          maritalStatus,          
          designation,          
          salary,
          type,          
          phoneNumber,
          profileImage: req.file ? req.file.filename : "",
        });
        
        await newEmployee.save();
        return res.status(200).json({ success: true, message: "Employee created" });
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({sucess:false,error:"AddEmployee server error"})
    }
};

const getEmployees = async(req,res) => {
    try{
        const employees=await Employee.find().exec()
        if(!employees){ 
            return res.status(404).json({success:false,error :"No employees found."})
        }
        // 200 - request was successful and the server is responding with the requested data.
        return res.status(200).json({success:true,employees})
    }
    catch(error){
        // Catch any errors and send a generic error message to the client
        // If something goes wrong, respond with an error
        return res.status(500).json({success:false,error :"Get employees server error"})
    }
};

/*const getEmployee = async(req,res) => {
    const{id}=req.params;
    try{
        let employee;
        employee=await Employee.findById({_id:id}).populate('userId',{password:0}).populate("department");
        if(!employee){ 
            employee=await Employee.findOne({userId:id}).populate('userId',{password:0}).populate("department");
        }
        return res.status(200).json({success:true,employee})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error :"Get employee server error"})
    }
};
*/

const getEmployee = async (req, res) => {
    try {
      const { id } = req.params; // get the employee id from params
      // Use findById directly with id (not an object)
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found" });
      }
      // 200 - request was successful and the server is responding with the requested data.
      return res.status(200).json({ success: true, employee });
    } catch (error) {
      console.error("Get Employee Error:", error);
      return res.status(500).json({ success: false, error: "Get employee server error" });
    }
  };



const updateEmployee = async(req,res) => {
    try{
        const{id}=req.params;
        const{name,phoneNumber,maritalStatus,designation,salary} = req.body;

        const employee=await Employee.findById({_id:id})
        if(!employee){
            return res.status(404).json({success:false,error :"Employee not found"}) 
        }

       /* const user=await User.findById({_id:employee.userId})
        if(!user){
            return res.status(404).json({success:false,error :"User not found"}) 
        }
        const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name})*/

        const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{name,phoneNumber,maritalStatus,designation,salary})

        //if(!updateEmployee || !updateUser)
        if(!updateEmployee){
            return res.status(404).json({success:false,error :"Employee not found"}) 
        }
        // 200 - request was successful and the server is responding with the requested data.
        return res.status(200).json({success:true,message :"Employee updated"}) 
    }
    catch(error)
    {
        return res.status(500).json({success:false,error :"Update employees server error"})
    }
};
/*
const  fetchEmployeesByDepId = async(req,res) => {
    const{id}=req.params;
    try{
        const employees=await Employee.find({department:id})
        return res.status(200).json({success:true,employees})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error :"fetchEmployeesByDepId server error"})
    }
};*/

/*const fetchEmployeesByDepId = async (req, res) => {
    const { id } = req.params;
    try {
      const employees = await Employee.find({ department: id });
      if (!employees || employees.length === 0) {
        return res.status(404).json({ success: false, error: "No employees found for this department" });
      }
      // 200 - request was successful and the server is responding with the requested data.
      return res.status(200).json({ success: true, employees });
    } catch (error) {
      console.error("fetchEmployeesByDepId Error:", error);
      return res.status(500).json({ success: false, error: "fetchEmployeesByDepId server error" });
    }
  };
*/

  const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the employee
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // Delete the associated user
        //await User.findByIdAndDelete(employee.userId);

        // Delete the employee record
        await Employee.findByIdAndDelete(id);

        // 200 - request was successful and the server is responding with the requested data.
        return res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Delete Employee Error:", error);
        return res.status(500).json({ success: false, error: "Delete employee server error" });
    }
};

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, deleteEmployee };