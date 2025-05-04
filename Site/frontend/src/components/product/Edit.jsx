import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => setForm(res.data.product))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    const { name, files, value } = e.target;
    if (name === "image") {
      setForm(prev => ({ ...prev, imageFile: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    if (form.imageFile) fd.append("image", form.imageFile);

    try {
      const res = await axios.put(`http://localhost:5000/api/product/${id}`, fd, {
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

  if (!form) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="card w-96 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2><br/><br/>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="flex text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;