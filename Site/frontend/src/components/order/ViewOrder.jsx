import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaBuilding, FaCogs, FaTachometerAlt, FaMoneyBillWave, FaUsers, FaShoppingCart, FaCreditCard, FaProductHunt, FaFish, FaFilePdf } from 'react-icons/fa';


const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  // This ref will point to the part of the page you want to PDF
  const pdfRef = useRef();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/order/${id}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
  
        if (response.data.success && response.data.order) {
          setOrder(response.data.order);
        } else {
          console.error("Order not found");
          setOrder(null);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setOrder(null);
      }
    };
  
    fetchOrder();
  }, [id]);
  

  if (!order) return <div>Loading...</div>;

  let statusDate = "";
  if (order.status !== "Placed") {
    statusDate = order.modifiedDate ? new Date(order.modifiedDate).toLocaleDateString() : "";
  }

  // --- PDF download handler ---
  const handleDownloadPdf = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'letter'
    });
    
    const imgProperties = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth)/imgProperties.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`order-${order.orderId}.pdf`);
  };
  
/*
    const handleDownloadPdf = async () => {
      const element = pdfRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
      pdf.addImage(imgData, 'PNG', 0, 0, 250, 100);
      pdf.save(`order-${order.orderId}.pdf`);
    };
    */

    

  if (!order) {
    return <div>Loading...</div>;
  }
  return (

    <div className="container">
      <div className="flex justify-end mb-4">
        <button className="btn bg-teal text-white" onClick={handleDownloadPdf}>Download PDF <FaFilePdf/> </button>{/* Button to trigger PDF download */}
      </div><br/><br/>

      {/* The area we’ll snapshot */}
      <div ref={pdfRef} className="card w-96 p-6 bg-white shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Order Details</h2><br/><br/><br/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Order Information</h3>

            <table>
              <tr><td>  <p className='mt-1'><strong>Order ID     </strong></p> </td><td>  <p className='mt-1 ml' > {order.orderId}</p> </td></tr>
              <tr><td>  <p className='mt-1'><strong>Product      </strong></p> </td><td>  <p className='mt-1 ml'  > {order.product}</p> </td></tr>
              <tr><td>  <p className='mt-1'><strong>Price        </strong></p> </td><td>  <p className='mt-1 ml' > {order.price}</p> </td></tr>
              <tr><td>  <p className='mt-1'><strong>Quantity     </strong></p> </td><td>  <p className='mt-1 ml' > {order.quantity}</p> </td></tr>
              <tr><td>  <p className='mt-1'><strong>Total        </strong></p> </td><td>  <p className='mt-1 ml' > {order.quantity}</p> </td></tr>
              <tr><td>  <p className='mt-1'><strong>Placed Date  </strong></p> </td><td>  <p className='mt-1 ml' > {new Date(order.placedDate).toLocaleDateString()}</p> </td></tr>
              <tr><td>  <p className='mt-1'><strong>Status       </strong></p> </td><td>  <p className='mt-1 ml' > {order.status}</p> 
                                                                                        {order.status !== "Placed" && (
                                                                                         <p className='mt-1'><strong>{order.status} Date:</strong> {statusDate}</p>
                                                                                      )}</td></tr>
            </table>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Supplier Information</h3>

            <table>
              <tr><td>  <p className='mt-1'><strong>Supplier ID  </strong></p> </td><td>  <p className='mt-1 ml' > {order.supplier._id}</p> </td></tr> 
              <tr><td>  <p className='mt-1'><strong>Name               </strong></p> </td><td>  <p className='mt-1 ml' > {order.supplier.name}</p> </td></tr> 
              <tr><td>  <p className='mt-1'><strong>Business           </strong></p> </td><td>  <p className='mt-1 ml' > {order.supplier.business}</p> </td></tr> 
              <tr><td>  <p className='mt-1'><strong>Phone              </strong></p> </td><td>  <p className='mt-1 ml' > {order.supplier.phone}</p> </td></tr> 
              <tr><td>  <p className='mt-1'><strong>Email              </strong></p> </td><td>  <p className='mt-1 ml' > {order.supplier.email}</p> </td></tr>
             </table>

          </div>
        </div><br/><br/>
     </div>
    </div>
  );
};

export default ViewOrder;