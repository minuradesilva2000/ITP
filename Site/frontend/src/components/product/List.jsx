import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, deleteProduct, ProductButtons } from "../../utils/ProductHelper";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [filter, setFilter]     = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/product", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      if (res.data.success) {
        let sno = 1;
        const data = res.data.products.map(p => ({
          _id: p._id,
          sno: sno++,
          name: p.name,
          image: p.image,
          action: <ProductButtons Id={p._id} onDeleted={fetchProducts}/>
        }));
        setProducts(data);
        setFilter(data);
      }
    } catch {
      alert("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = e => {
    const text = e.target.value.toLowerCase();
    setFilter(products.filter(p => p.name.toLowerCase().includes(text)));
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Products</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by Name"
              className="input"
              onChange={handleSearch}
            />
            <Link to="/admin-dashboard/add-product" className="btn bg-teal text-white">
              ADD New Product
            </Link>
          </div>
          <DataTable columns={columns} data={filter} pagination />
        </div>
      )}
    </>
  );
};

export default ProductList;