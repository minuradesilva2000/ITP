import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaBuilding, FaCogs, FaTachometerAlt, FaMoneyBillWave, FaUsers, FaShoppingCart, FaCreditCard, FaProductHunt, FaFish, FaFilePdf } from 'react-icons/fa';

const View = () => {
    
    const{id}=useParams()
    const[employee,setEmployee]=useState(null)

      // This ref will point to the part of the page you want to PDF
      const pdfRef = useRef();

    useEffect(() => {
        const fetchEmployee = async() => {
            try{
                const response=await axios.get(`http://localhost:5000/api/employee/${id}`,{
                    headers:{"Authorization":`Bearer ${localStorage.getItem('token')}` },
                });
                if(response.data.success){
                    setEmployee(response.data.employee)
                }
            }
            catch(error)
            {       
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }
        };
        fetchEmployee();
    },[]);

      // --- PDF download handler ---
      const handleDownloadPdf = async () => {
        const element = pdfRef.current;
        const all = [element, ...element.querySelectorAll("*")];
      
        // 1) Snapshot original inline styles
        const originals = new Map();
        all.forEach(el => {
          originals.set(el, {
            background: el.style.background,
            backgroundColor: el.style.backgroundColor,
            boxShadow: el.style.boxShadow,
            filter: el.style.filter,
            backdropFilter: el.style.backdropFilter
          });
        });
      
        // 2) Apply “clean” inline overrides
        all.forEach(el => {
          el.style.background = "#ffffff";
          el.style.backgroundColor = "#ffffff";
          el.style.boxShadow = "none";
          el.style.filter = "none";
          el.style.backdropFilter = "none";
        });
      
        // 3) Render canvas
        const canvas = await html2canvas(element, {
          scale: 1,
          useCORS: true,
          allowTaint: false,
          imageTimeout: 15000,
          backgroundColor: "#ffffff"    // force any transparent bits to white
        });
      
        // 4) Revert to original inline styles
        all.forEach(el => {
          const o = originals.get(el);
          el.style.background     = o.background;
          el.style.backgroundColor = o.backgroundColor;
          el.style.boxShadow      = o.boxShadow;
          el.style.filter         = o.filter;
          el.style.backdropFilter = o.backdropFilter;
        });
      
        // 5) Build & save the PDF
        const imgData = canvas.toDataURL("image/png");
        const wPx = canvas.width;
        const hPx = canvas.height;
        const pdf = new jsPDF({
          unit: 'px',
          format: [wPx, hPx],
          orientation: wPx > hPx ? 'landscape' : 'portrait'
        });
        pdf.addImage(imgData, 'PNG', 0, 0, wPx, hPx);
        pdf.save(`employee-${employee.employeeId}.pdf`);
        /*
        const pdf = new jsPDF({ unit: "px", format: "letter", orientation: "portrait" });
        const { width: wPx, height: hPx } = canvas;
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = (hPx * pdfW) / wPx;
        pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
        pdf.save(`employee-${employee.employeeId}.pdf`);
        */
      };

    return (
        <>{employee ? (
            <div >
            <div className="container" >
            <div className="flex justify-end mb-4">
                <button className="btn bg-teal text-white" onClick={handleDownloadPdf}>Download PDF <FaFilePdf/> </button>{/* Button to trigger PDF download */}
            </div><br/><br/>
             <div  className="card w-96" ref={pdfRef}>
                <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2><br/><br/>
                <div className="viewCard"> 
                    <div>   
                        <img src={`http://localhost:5000/public/uploads/${employee.profileImage}`} className="viewImage" crossOrigin='anonymous'/>
                    </div>
                    <div className='details'> 

                        <table>
                            <tr><td>  <p className='mt-1'><strong>Name               </strong></p> </td><td>  <p className='mt-1 ml' > {employee.name}</p> </td></tr> 
                            <tr><td>  <p className='mt-1'><strong>Employee ID        </strong></p> </td><td>  <p className='mt-1 ml' > {employee.employeeId}</p> </td></tr> 
                            <tr><td>  <p className='mt-1'><strong>Date of Birth     </strong></p> </td><td>  <p className='mt-1 ml' > {new Date(employee.dob).toLocaleDateString()}</p> </td></tr>
                            <tr><td>  <p className='mt-1'><strong>Gender            </strong></p> </td><td>  <p className='mt-1 ml' > {employee.gender}</p> </td></tr> 
                            <tr><td>  <p className='mt-1'><strong>Type              </strong></p> </td><td>  <p className='mt-1 ml' > {employee.type}</p> </td></tr> 
                            <tr><td>  <p className='mt-1'><strong>Phone             </strong></p> </td><td>  <p className='mt-1 ml' > {employee.phoneNumber}</p> </td></tr> 
                            <tr><td>  <p className='mt-1'><strong>Designation       </strong></p> </td><td>  <p className='mt-1 ml' > {employee.designation}</p> </td></tr> 
                            <tr><td>  <p className='mt-1'><strong>Marital Status    </strong></p> </td><td>  <p className='mt-1 ml' > {employee.maritalStatus}</p> </td></tr> 
                        </table>
                    </div>
                </div>
            </div>
            </div>
            </div>
        ):<div>Loading .....</div>}</>
    )
}
export default View