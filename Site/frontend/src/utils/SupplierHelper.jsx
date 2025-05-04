import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const columns=[
    { name:"S No", selector:(row ) => row.sno },
    { name:"Image",selector:(row)=>row.profileImage  },
    { name:"Supplier Id", selector:(row) => row.supplierId , sortable:true },
    { name:"Supplier name", selector:(row) => row.name , sortable:true },
    { name:"Business name", selector:(row) => row.business , sortable:true },
    { name:"E-mail", selector:(row) => row.email },
    { name:"Phone", selector:(row) => row.phone },
    { name:"Action", selector:(row) => row.action ,center:"true",width:"250px" },
];

export const SupplierButtons = ({ Id, onSupplierDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!Id) {
            alert("Supplier ID is undefined.");
            return;
        }

        const confirmDelete = window.confirm("Do you want to delete?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/supplier/${Id}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
                });

                if (response.data.success) {
                    alert("Supplier deleted successfully.");
                    onSupplierDelete(); // Refresh supplier list
                } else {
                    alert(response.data.error || "Failed to delete supplier.");
                    return;
                }
            } catch (error) {
                alert(error.response?.data?.error || "Error deleting supplier.");
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button className="actionBtnView"/*className="px-3 py-1 bg-teal-600 text-white"*/ onClick={() => navigate(`/admin-dashboard/supplier/view-supplier/${Id}`)}> <FaEye/></button>
            <button className="actionBtnEdit"/*className="px-5 py-1 bg-teal-600 text-white" */onClick={() => navigate(`/admin-dashboard/supplier/edit-supplier/${Id}`)}> <FaEdit/></button>
            <button className="actionBtnDelete"/*className="px-5 py-1 bg-red-600 text-white"*/ onClick={handleDelete}><FaTrash/></button>
        </div>
    );
};
