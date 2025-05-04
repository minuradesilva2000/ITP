import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SupplierSelect from '../../utils/Supplier';

const AddOrder = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const [products,setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product: 'PID001',
    supplierId: '',
    price: '',
    quantity: '', 
    date: today
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/product", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });
          if (res.data.success) {
            setProducts(res.data.products);
          }
        } catch (err) {
          alert("Failed to fetch products.");
        }
      };
      fetchProducts();
    }, []);

  // Auto-calculate total (price * quantity)
  const total = Number(formData.price) * Number(formData.quantity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      total: total,
      status: "Placed" // default status
    };

    try {
      const response = await axios.post('http://localhost:5000/api/order/add', orderData, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        navigate("/admin-dashboard/orders");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    /*<div className='p-6'>
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">*/
    <div className="container">
             <div className="card w-96">
      <h2 className="text-2xl font-bold mb-6">Add New Order</h2><br/>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex text-sm font-medium text-gray-700">Product</label>
            <select
  name="product"
  value={formData.product}
  onChange={handleChange}
  className="mt-1 p-2 flex w-full border-gray-300 rounded-md"
  required
>
  <option value="">-- Select Product --</option>
  {products.map(p => (
    <option key={p._id} value={p.name}>
      {p.code} - {p.name}
    </option>
  ))}
</select>
          </div>
          <div>
            <label className="flex text-sm font-medium text-gray-700">Supplier</label>
            <SupplierSelect
              name="supplierId"
              className="supplierSelect"
              value={formData.supplierId}
              onChange={handleChange}
              //className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="flex text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 flex w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="flex text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 p-2 flex w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="flex text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date(new Date().setDate(new Date().getDate()-5)).toISOString().split('T')[0]}
              max={new Date(new Date().setDate(new Date().getDate())).toISOString().split('T')[0]}
              className="mt-1 p-2 flex w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="flex text-sm font-medium text-gray-700">Total Amount</label>
            <input
              type="number"
              value={total || 0}
              readOnly
              className="mt-1 p-2 flex w-full border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button type="submit" className="btn bg-teal text-white w-full">Add Order</button>

      </form>
    </div>
    </div>
  );
};

export default AddOrder;