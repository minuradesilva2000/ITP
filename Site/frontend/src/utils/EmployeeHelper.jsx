import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export const columns=[
    {name:"S No",selector:(row)=>row.sno /*, width:"70px"*/},
    {name:"Name",selector:(row)=>row.name ,sortable:true/*,width:"100px"*/},
    {name:"Phone number",selector:(row)=>row.phoneNumber/*,width:"100px"*/},
    {name:"Image",selector:(row)=>row.profileImage /*,width:"90px"*/},
    {name:"Type",selector:(row)=>row.type ,sortable:true},
    {name:"Action",selector:(row)=>row.action ,center:"true",width:"250px"},
];

export const getEmployees = async (id) => {
    let employees;
    try {
      const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        employees = response.data.employees;
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
    return employees;
};

  export const deleteEmployee = async (id) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (!confirmDelete) return false;

        const response = await axios.delete(`http://localhost:5000/api/employee/${id}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
        });

        if (response.data.success) {
            alert("Employee deleted successfully!");
            return true;
        } else {
            alert(response.data.error);
            return false;
        }
    } catch (error) {
        alert("Failed to delete employee.");
        return false;
    }
};
  
  export const EmployeeButtons = ({ Id, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            <button className="actionBtnView"/*className="px-3 py-1 bg-teal-600 text-white"*/ onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}><FaEye/></button>
            <button className="actionBtnEdit" onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}><FaEdit/></button>
            <button className="actionBtnDelete"/*"px-3 py-1 bg-red-700 text-white"*/ onClick={() => onDelete(Id)}><FaTrash/></button>
        </div>
    );
};