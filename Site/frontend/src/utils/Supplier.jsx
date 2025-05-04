import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierSelect = ({ name, value, onChange }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/supplier', {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data.success) {
          setSuppliers(response.data.suppliers);
        }
      } catch (error) {
        console.error("Error fetching suppliers", error);
      }
    };
    fetchSuppliers();
  }, []);

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 flex w-full border-gray-300 rounded-md"
      required
    >
      <option value="">Select Supplier</option>
      {suppliers.map(supplier => (
        <option key={supplier._id} value={supplier._id}>
          {supplier.name}
        </option>
      ))}
    </select>
  );
};

export default SupplierSelect;
