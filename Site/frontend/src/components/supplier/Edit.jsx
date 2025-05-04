import React, { useEffect, useState } from 'react';
//import { fetchDepartments} from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {

    const [supplier,setSupplier] = useState({
        supplierId:'', name:'', business:'', email:'', phone:''
    });
    //const[departments,setDepartments]=useState(null);
    const navigate=useNavigate();
    const {id}=useParams();

    /*useEffect(() => {
        const getDepartments = async() => {
            const departments=await  fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    },[]);*/

    useEffect(() => {

        const fetchSupplier = async() => {
            try{
                const response=await axios.get(`http://localhost:5000/api/supplier/${id}`,{
                    headers:{"Authorization":`Bearer ${localStorage.getItem('token')}` },
                });

                if(response.data.success)
                {
                    const  supplier = response.data.supplier
                    setSupplier((prev) => ({
                        ...prev,
                        supplierId:supplier.supplierId,
                        name:supplier.name,
                        business:supplier.business,
                        email:supplier.email,
                        phone:supplier.phone,
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
        fetchSupplier();
    },[id]);

    const handleChange = (e) => {
        const {name,value}=e.target;
        setSupplier((prevData)=>({...prevData,[name]:value}));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response=await axios.put(`http://localhost:5000/api/supplier/${id}`,supplier,{
                headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`,}
            });

            if(response.data.success){
                navigate("/admin-dashboard/suppliers");  //navigate to admindashbord 
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
        //supLoading ? <div>Loading.....</div>:
       /* <div className='p-6'>
            <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-md shadow-md">*/
            <div className="container">
             <div className="card w-96">
                <h2 className="text-2xl font-bold mb-6">Edit Supplier</h2><br/>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label  className="flex text-sm font-medium text-gray-700">Supplier Id</label>
                            <input type="text" name="supplierId" value={supplier.supplierId} onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                        </div>
                        <div>
                            <label  className="flex text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" value={supplier.name} onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                        </div>
                        <div>
                            <label  className="flex text-sm font-medium text-gray-700">Business name</label>
                            <input type="text" name="business" value={supplier.business} onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                        </div>
                        <div>
                            <label  className="flex text-sm font-medium text-gray-700">E-mail</label>
                            <input type="email" name="email" value={supplier.email} onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                        </div>
                        <div>
                            <label  className="flex text-sm font-medium text-gray-700">Phone number</label>
                            <input type="text" name="phone" value={supplier.phone} title="Phone number should start with '0' and contain 10 digits"  pattern="0[0-9]{9}" onChange={handleChange} className="mt-1 p-2 flex w-full border-gray-300 rounded-md"required />
                        </div>

                    </div>
                    <button type="submit" className="btn bg-teal text-white w-full">
                    Save Changes
                    </button>
                </form>
            </div>
            </div>
    );
};

export default Edit;