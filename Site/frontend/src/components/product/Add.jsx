import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, files, value } = e.target;
    if (name === "image") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(formData).forEach(key => fd.append(key, formData[key]));

    try {
      const res = await axios.post("http://localhost:5000/api/product/add", fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.data.success) navigate("/admin-dashboard/products");
    } catch (err) {
      if (err.response && !err.response.data.success) alert(err.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="card w-96 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2><br/><br/>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="flex text-sm text-left font-medium">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mt-4">
            <label className="flex text-sm font-medium">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <button type="submit" className="btn bg-teal text-white w-full mt-6">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;