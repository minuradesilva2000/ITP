import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export const columns = [
  { name: "S No", selector: row => row.sno },
  { name: "Name", selector: row => row.name, sortable: true },
  {
    name: "Image",
    selector: row => (
      <img
        width={40}
        className="rounded"
        src={`http://localhost:5000/public/uploads/${row.image}`}
      />
    )
  },
  {
    name: "Action",
    selector: row => row.action,
    center: true,
    width: "220px"
  }
];

export const deleteProduct = async id => {
  try {
    if (!window.confirm("Are you sure you want to delete this product?")) return false;
    const response = await axios.delete(`http://localhost:5000/api/product/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    if (response.data.success) {
      alert("Product deleted successfully!");
      return true;
    } else {
      alert(response.data.error);
      return false;
    }
  } catch (err) {
    alert("Failed to delete product.");
    return false;
  }
};

export const ProductButtons = ({ Id,onDeleted }) => {
  const navigate = useNavigate();
  
  const handleDelete= async() =>{
    const confirmed = await deleteProduct(Id);
    if(confirmed && onDeleted){
      onDeleted();
    }  }

  return (
    <div className="flex space-x-3">
      <button className="actionBtnEdit" onClick={() => navigate(`/admin-dashboard/products/edit/${Id}`)}>
        <FaEdit />
      </button>
      <button className="actionBtnDelete" onClick={handleDelete}>
        <FaTrash />
      </button>
    </div>
  );
};