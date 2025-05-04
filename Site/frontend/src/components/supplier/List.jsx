import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { SupplierButtons ,columns} from '../../utils/SupplierHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
    const[suppliers,setSuppliers]=useState([]);
    const[supLoading,setSupLoading]=useState(false);
    const[filteredSupplier,setFilteredSuppliers]=useState([])
 
    const handleDeleteSupplier = (id) => {
        setSuppliers((prevSuppliers)=>prevSuppliers.filter((supplier)=>supplier._id !== id));
        //setFilteredSuppliers(filteredSupplier.filter(supplier=>supplier._id !== id));
        setFilteredSuppliers((prevFiltered) => prevFiltered.filter((supplier)=>supplier._id !== id))
    }

    useEffect(() => {
        const fetchSuppliers = async () => {
            setSupLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/supplier', {
                    headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
                });
                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.suppliers.map((sup) => ({
                        _id: sup._id,
                        sno: sno++,
                        supplierId: sup.supplierId,
                        name: sup.name,
                        business: sup.business,
                        email: sup.email,
                        phone: sup.phone,
                        profileImage: (
                            <img
                                width={40}
                                className="rounded-full"
                                src={
                                    sup.profileImage
                                        ? `http://localhost:5000/public/uploads/${sup.profileImage}`
                                        : "/default-profile.png"
                                }
                                alt="Supplier"
                                onError={(e) =>
                                    e.target.src = "http://localhost:5000/public/uploads/default-profile.png"
                                }
                            />
                        ),
                        action: (
                            <SupplierButtons
                                Id={sup._id}
                                onSupplierDelete={() => {
                                    // Option 1: Remove from state
                                    handleDeleteSupplier(sup._id);
                                    // Option 2: Re-fetch data
                                    // fetchSuppliers();
                                }}
                            />
                        ),
                    }));
                    setSuppliers(data);
                    setFilteredSuppliers(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setSupLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    const handleFilter = async(e) => {
        const records = suppliers.filter((sup) => 
            sup.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredSuppliers(records);
    }

    return (
        <>
            { supLoading ? <div>Loading...</div> :
                <div className='p-6'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold'>Manage Suppliers</h3><br/>
                    </div>
                    <div className='flex justify-between items-center'>
                        <input type="text" placeholder='Search By Supplier Name' className="px-4 py-0.5  border" onChange={handleFilter}/>
                        <Link to="/admin-dashboard/add-supplier" className="btn bg-teal text-white">ADD New Supplier </Link>
                    </div>
                    <div className='mt-6'>
                        <DataTable columns={columns} data={filteredSupplier} pagination/>
                    </div>
                </div>
            }
        </>
    )
}

export default List;
