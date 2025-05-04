import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {

    const [employee,setEmployee] = useState({
        name:'', phoneNumber:'',maritalStatus:'', designation:'', salary:0,
    });
    const navigate=useNavigate();
    const {id}=useParams();

    useEffect(() => {

        const fetchEmployee = async() => {
            try{
                const response=await axios.get(`http://localhost:5000/api/employee/${id}`,{
                    headers:{"Authorization":`Bearer ${localStorage.getItem('token')}` },
                });

                if(response.data.success)
                {
                    const  employee = response.data.employee
                    setEmployee((prev) => ({
                        ...prev,
                        name:employee.name,
                        phoneNumber:employee.phoneNumber,
                        maritalStatus:employee.maritalStatus,
                        designation:employee.designation,
                        salary:employee.salary,
                    }));
                }
            }
            catch(error)
            {
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }
        };
        fetchEmployee();
    },[]);

    const handleChange = (e) => {
        const {name,value}=e.target;
        setEmployee((prevData)=>({...prevData,[name]:value}));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response=await axios.put(`http://localhost:5000/api/employee/${id}`,employee,{
                headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`,}
            });

            if(response.data.success){
                navigate("/admin-dashboard/employees");  //navigate to admindashbord 
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
        <>{ employee ?(
           /* <div className='p-6'>
            <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-md shadow-md">*/
            <div className="container">
             <div className="card w-96">
                <h2 className="text-2xl font-bold mb-6">Edit Employee</h2><br/>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label  className="flex text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" placeholder="Insert Name" value={employee.name} onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" name="phoneNumber" placeholder="Enter 10-digit phone number"
                            value={employee.phoneNumber || ""} onChange={handleChange}
                            className="mt-1 p-2 flex w-full border-gray-300 rounded-md"
                            required pattern="\d{10}" maxLength="10"
                            />
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700">Marital Status</label>
                            <select name="maritalStatus" onChange={handleChange} value={employee.maritalStatus} className="mt-1 p-2 flex w-full border-gray-300 rounded-md" required>
                                <option value="">Select Status</option>
                                <option value="single">Single</option><option value="married">Married</option>
                            </select>
                        </div>
                        <div>
                            <label  className="flex text-sm font-medium text-gray-700">Designation</label>
                            <input type="text" name="designation" onChange={handleChange} value={employee.designation} placeholder="Designation" className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                        </div>
                        <div>
                            <label  className="flex text-sm font-medium text-gray-700">Salary</label>
                            <input type="number" name="salary" onChange={handleChange} value={employee.salary} placeholder="Salary" className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                        </div>
                    </div>
                    <button type="submit" className="btn bg-teal text-white w-full">
                        Save Changes
                    </button>
                </form>
            </div>
            </div>
        ): <div>Loading...</div>}</>
    );
};

export default Edit;