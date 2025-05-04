import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { OrderButtons, orderColumns } from '../../utils/OrderHelper';
import axios from 'axios';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleDeleteOrder = (id) => {
    setOrders(prev => prev.filter(order => order._id !== id));
    setFilteredOrders(prev => prev.filter(order => order._id !== id));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/order', {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data.success) {
          let count = 1;
          const data = response.data.orders.map((order) => {
            // Determine which date to display: if status is Placed, use placedDate, otherwise use modifiedDate.
            let displayDate = "";
            if (order.status === "Placed") {
              displayDate = order.placedDate ? new Date(order.placedDate).toLocaleDateString() : "";
            } else {
              displayDate = order.modifiedDate ? new Date(order.modifiedDate).toLocaleDateString() : "";
            }
            return {
              _id: order._id,
              sno: count++,
              orderId: order.orderId,
              product: order.product,
              price: order.price,
              quantity: order.quantity,
              total: order.total,
              date: displayDate,
              status: order.status,
              action: (
                <OrderButtons
                  id={order._id}
                  onOrderDelete={() => handleDeleteOrder(order._id)}
                />
              ),
            };
          });
          setOrders(data);
          setFilteredOrders(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleFilter = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = orders.filter(order =>
      order.orderId.toLowerCase().includes(searchText) ||
      order.status.toLowerCase().includes(searchText) ||
      order.product.toLowerCase().includes(searchText)
    );
    setFilteredOrders(filtered);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Orders</h3><br/>
      </div>
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search by Order ID, Status, or Product"
          className="px-4 py-1 border"
          onChange={handleFilter}
        />
        <Link to="/admin-dashboard/add-order" className="btn bg-teal text-white">
          Add New Order
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={orderColumns} data={filteredOrders} pagination />
      )}
    </div>
  );
};

export default OrdersList;