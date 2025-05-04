import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

// Data functions
export const fetchPayments = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/payment', {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPaymentById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:5000/api/payment/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePaymentStatus = async (id, payload) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `http://localhost:5000/api/payment/${id}`,
      payload,
      { headers: { "Authorization": `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePayment = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`http://localhost:5000/api/payment/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Updated table columns for Payment pages
export const paymentColumns = [
  { name: "S No", selector: row => row.sno },
  { name: "Order ID", selector: row => row.orderId, sortable: true },
  { name: "Order Status", selector: row => row.orderStatus, sortable: true },
  { name: "Total", selector: row => row.total },
  { name: "Payment Status", selector: row => row.paymentStatus },
  { name: "Payment Date", selector: row => row.paymentDate },
  { name:"Action", selector:(row) => row.action ,center:"true",width:"250px" },
];

export const PaymentButtons = ({ id, onPaymentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!id) {
      alert("Payment ID is undefined.");
      return;
    }
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/payment/${id}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data.success) {
          alert("Payment deleted successfully.");
          onPaymentDelete();
        } else {
          alert(response.data.error || "Failed to delete payment.");
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error deleting payment.");
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className='actionBtnEdit'/*"px-5 py-1 bg-teal-600 text-white"*/
        onClick={() => navigate(`/admin-dashboard/payment/edit/${id}`)}
      >
        <FaEye/>
      </button>
      <button className="actionBtnDelete"/*"px-5 py-1 bg-red-600 text-white"*/ onClick={handleDelete}>
      <FaTrash/>
      </button>
    </div>
  );
};