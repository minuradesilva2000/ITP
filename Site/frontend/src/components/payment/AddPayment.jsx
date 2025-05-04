import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { PaymentButtons, paymentColumns, fetchPayments } from '../../utils/PaymentHelper.jsx';
import { Link } from 'react-router-dom';

const AddPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // ← new

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true);
      try {
        const response = await fetchPayments();
        if (response.success) {
          let count = 1;
          const data = response.payments.map(p => ({
            ...p,
            sno: count++,
            orderId: p.order?.orderId || 'No Order',
            orderStatus: p.order?.status || 'No Order',
            paymentDate: p.payedDate
              ? new Date(p.payedDate).toLocaleDateString()
              : 'Not Paid',
            total: p.total,
            paymentStatus: p.paymentStatus || 'Pending',
            action: (
              <PaymentButtons
                id={p._id}
                onPaymentDelete={() => handleDeletePayment(p._id)}
              />
            ),
          }));
          setPayments(data);
          setFilteredPayments(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPayments();
  }, []);

  const handleDeletePayment = (id) => {
    setPayments(prev => prev.filter(p => p._id !== id));
    setFilteredPayments(prev => prev.filter(p => p._id !== id));
  };

  const handleFilterText = (e) => {
    const txt = e.target.value.toLowerCase();
    applyFilters(txt, statusFilter);
  };

  const applyFilters = (text, status) => {
    let temp = payments;
    if (text) {
      temp = temp.filter(p =>
        p.orderId.toLowerCase().includes(text) ||
        p.orderStatus.toLowerCase().includes(text) ||
        p.paymentStatus.toLowerCase().includes(text) ||
        p.paymentDate.toLowerCase().includes(text)
      );
    }
    if (status === 'pending' || status === 'payed') {
      temp = temp.filter(p => p.paymentStatus.toLowerCase() === status);
    }
    setFilteredPayments(temp);
  };

  const handleStatusClick = (status) => {
    setStatusFilter(status);
    applyFilters('', status);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Payments</h3>
      </div>

      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search by Order ID, Status, Date…"
          className="px-4 py-1 border rounded"
          onChange={handleFilterText}
        />
      </div>

      {/* New status buttons */}
      <div className="flex space-x-2 mb-4">
        <button className='actionBtnView'
          onClick={() => handleStatusClick('all')}
          //className={`px-4 py-1 rounded ${statusFilter === 'all' ? 'bg-blue text-white' : 'border'}`}
        >
          All
        </button>
        <button className={'actionBtnEdit' }
          onClick={() => handleStatusClick('pending')}
         // className={`px-4 py-1 rounded ${statusFilter === 'pending' ? 'bg-yellow text-white' : 'border'}`}
        >
          Pending
        </button>
        <button className='actionBtnDelete'
          onClick={() => handleStatusClick('payed')}
         // className={`px-4 py-1 rounded ${statusFilter === 'payed' ? 'bg-green text-white' : 'border'}`}
        >
          Payed
        </button>
        <div className="mb-4">
          <p className="paymentText">
            {statusFilter === 'all' && "All payments"}
            {statusFilter === 'pending' && "Pending payments"}
            {statusFilter === 'payed' && "Payed payments"}
          </p>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable
          columns={paymentColumns}
          data={filteredPayments}
          pagination
        />
      )}
    </div>
  );
};

export default AddPayment;