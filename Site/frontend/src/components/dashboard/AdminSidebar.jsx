import React from 'react';
import { FaBuilding, FaCogs, FaTachometerAlt, FaMoneyBillWave, FaUsers, FaShoppingCart, FaCreditCard, FaProductHunt, FaFish } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import siteIcon from './joker.png';

// Import the CSS file
import '../../customStyles.css';

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center font-pacific text-primary'>Fish Marcket MS</h3>
      </div>
      <div className="mb-2 text-center">
        <img src={siteIcon} alt="Site Icon" style={{ height: '120px'}} />
      </div>
      <div className="px-4">
        <NavLink to="/admin-dashboard" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`} end>
          <FaTachometerAlt style={{ width: '20px'}}/> <span style={{margin:'10px'}}>Dashboard</span>
        </NavLink>
        <NavLink to="/admin-dashboard/employees" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaUsers style={{ width: '20px'}}/> <span style={{margin:'10px'}}>Employees</span>
        </NavLink>
        <NavLink to="/admin-dashboard/suppliers" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaUsers style={{ width: '20px'}}/> <span style={{margin:'10px'}}>Suppliers</span>
        </NavLink>
        <NavLink to="/admin-dashboard/products" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaFish style={{ width: '20px' }} /> <span style={{ margin: '10px' }}>Products</span>
        </NavLink>
        <NavLink to="/admin-dashboard/orders" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaShoppingCart style={{ width: '20px'}}/> <span style={{margin:'10px'}}>Orders</span>
        </NavLink>
        <NavLink to="/admin-dashboard/payments" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaCreditCard style={{ width: '20px'}}/> <span style={{margin:'10px'}}>Payments</span>
        </NavLink>
        <NavLink to="/admin-dashboard/setting"  className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaCogs style={{ width: '20px'}}/> <span style={{margin:'10px'}} >Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;