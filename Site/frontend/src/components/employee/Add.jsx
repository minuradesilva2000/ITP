import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const[formData,setFormData]=useState({});
    const navigate=useNavigate()

    const handleChange = (e) => {
        const {name,value,files}=e.target;
        if(name==="image"){
            setFormData((prevData)=>({...prevData,[name]:files[0]}))
        }
        else{
            setFormData((prevData)=>({...prevData,[name]:value}))
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formDataObj = new FormData()

        Object.keys(formData).forEach((key) => {
            formDataObj.append(key,formData[key])   //FormData.append()parameterwenne name akay eta adala value akay
        })

        try{
            const response=await axios.post('http://localhost:5000/api/employee/add',formDataObj,{ //line 29
                headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`,}
            });

            if(response.data.success){
                navigate("/admin-dashboard/employees");  //admindashbord akata navigate wenawa 
            }
        }
        catch(error)
        {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }

    return (
        //<div className='p-6'>
       /* <div className="container">
             <div className="card w-96">*/
             <div className="container">
             <div className="card w-96">
            <h2 className="text-2xl font-bold mb-6">Add New Employee</h2><br/>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                    <div> {/*Name */}
                        <label  className="flex text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" placeholder="Insert Name" onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                    </div>
                    <div> {/*Phone number */}
                        <label className="flex text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="phoneNumber" placeholder="Enter 10-digit phone number"
                        onChange={handleChange}   className="mt-1 p-2 flex w-full border-gray-300 rounded-md"
                        required pattern="\d{10}" maxLength="10"
                        />
                    </div>   
                    <div> {/*dob */}
                        <label  className="flex text-sm font-medium text-gray-700">Date Of Birth</label>
                        <input type="date" name="dob" placeholder="Insert DOB" onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"  required 
                            min={new Date(new Date().setFullYear(new Date().getFullYear()-60)).toISOString().split('T')[0]}
                            max={new Date(new Date().setFullYear(new Date().getFullYear()-18)).toISOString().split('T')[0]}/>
                    </div>        
                    <div> {/*Gender  */}
                        <label className="flex text-sm font-medium text-gray-700">Gender</label>
                        <select name="gender" onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md" required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div> {/* Marital Status */}
                        <label className="flex text-sm font-medium text-gray-700">Marital Status</label>
                        <select name="maritalStatus" onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md" required>
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>
                    <div> {/* Role */}
                        <label className="flex text-sm font-medium text-gray-700">Employee Type</label>
                        <select name="type" onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md" required>
                            <option value="">Select Role</option>
                            <option value="Permanent Employee">Permanent Employee</option>
                            <option value="Contract Employee">Contract Employee</option>
                        </select>
                    </div>
                    <div> {/*Designation */}
                        <label  className="flex text-sm font-medium text-gray-700">Designation</label>
                        <input type="text" name="designation" placeholder="Insert Designation" onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                    </div>   
                    <div> {/*Salary */}
                        <label  className="flex text-sm font-medium text-gray-700">Salary</label>
                        <input type="number" name="salary" placeholder="Insert salary" onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                    </div>
                    <div> {/* Image Upload*/ }
                        <label  className="flex text-sm font-medium text-gray-700">Upload Image</label>
                        <input type="file" name="image" onChange={handleChange} placeholder="Upload Image" className="mt-1 p-2 flex w-full border-gray-300 rounded-md"/>
                    </div>
                </div>

                <button type="submit" className="btn bg-teal text-white w-full">Add Employee</button>
            </form>
        </div>
        </div>
    );
};

export default Add;