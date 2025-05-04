import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaUsers, FaBuilding, FaMoneyBillWave, FaShoppingCart, FaCheckCircle, FaTruck, FaTimes, FaCreditCard, FaHandHoldingUsd } from 'react-icons/fa';
import axios from 'axios';

// Import the CSS file
import '../../customStyles.css';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
        setSummary(response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  // Safeguard for ordersSummary and paymentsSummary
  const ordersSummary = summary.ordersSummary || {
    totalOrders: 0,
    placed: 0,
    received: 0,
    cancelled: 0
  };
  const paymentsSummary = summary.paymentsSummary || {
    pending: 0,
    payed: 0
  };
  const supplierSummary = summary.supplierSummary || {
    pending: 0,
    payed: 0
  };

  return (
    <div className="p-6">
      {/* Dashboard Overview Section */}
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <SummaryCard 
          icon={<FaUsers />} 
          text="Total Employees" 
          number={summary.totalEmployees} 
          color="bg-teal" 
        />
        <SummaryCard 
          icon={<FaUsers />} 
          text="Total Suppliers" 
          number={summary.totalSuppliers} 
          color="bg-green" 
        />
      </div>

      {/* Orders Summary Section */}
      <h3 className="text-2xl font-bold mt-8">Orders Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <SummaryCard 
          icon={<FaShoppingCart />} 
          text="Total Orders" 
          number={ordersSummary.totalOrders} 
          color="bg-blue" 
        />
        <SummaryCard 
          icon={<FaCheckCircle />} 
          text="Placed Orders" 
          number={ordersSummary.placed} 
          color="bg-green" 
        />
        <SummaryCard 
          icon={<FaTruck />} 
          text="Received Orders" 
          number={ordersSummary.received} 
          color="bg-purple" 
        />
        <SummaryCard 
          icon={<FaTimes />} 
          text="Cancelled Orders" 
          number={ordersSummary.cancelled} 
          color="bg-red" 
        />
      </div>

      {/* Payments Summary Section */}
      <h3 className="text-2xl font-bold mt-8">Payment Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard 
          icon={<FaMoneyBillWave />} 
          text="Total Payments" 
          number={paymentsSummary.totalPayments} 
          color="bg-blue" 
        />
        <SummaryCard 
          icon={<FaCreditCard />} 
          text="Pending Payments" 
          number={paymentsSummary.pending} 
          color="bg-orange" 
        />
        <SummaryCard 
          icon={<FaHandHoldingUsd />} 
          text="Paid Payments" 
          number={paymentsSummary.payed} 
          color="bg-green" 
        />
      </div>
    </div>
  );
};

export default AdminSummary;