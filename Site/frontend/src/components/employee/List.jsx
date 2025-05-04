import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { EmployeeButtons ,columns, deleteEmployee} from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  useEffect(() => {
      fetchEmployees();
  }, []);
 
  const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
          const response = await axios.get('http://localhost:5000/api/employee', {
              headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
          });

          if (response.data.success) {
              let sno = 1;
              const data = response.data.employees.map((emp) => ({
                  _id: emp._id,
                  sno: sno++,
                  name: emp.name,
                  phoneNumber: emp.phoneNumber,
                  type: emp.type,
                  profileImage: <img width={40} className="rounded-full" src={`http://localhost:5000/public/uploads/${emp.profileImage}`} />,
                  action: (<EmployeeButtons Id={emp._id} onDelete={handleDelete} />),
              }));
              setEmployees(data);
              setFilteredEmployees(data);
          }
      } catch (error) {
          alert("Failed to fetch employees.");
      } finally {
          setEmpLoading(false);
      }
  };

  const handleDelete = async (id) => {
      const deleted = await deleteEmployee(id); //line 45
      if (deleted) {
          setEmployees((prev) => prev.filter((emp) => emp._id !== id));
          setFilteredEmployees((prev) => prev.filter((emp) => emp._id !== id));
      }
  };

  return (
      <>
          {empLoading ? <div>Loading...</div> :
              <div className="p-6">
                  <div className="text-center">
                      <h3 className="text-2xl font-bold">Manage Employees</h3><br/>
                  </div>
                  <div className="flex justify-between items-center">
                      <input type="text" placeholder="Search By Employee Name" className="input" onChange={(e) => {
                          const records = employees.filter(emp =>
                              emp.name.toLowerCase().includes(e.target.value.toLowerCase())
                          );
                          setFilteredEmployees(records);
                      }} />
                      <Link to="/admin-dashboard/add-employee" className="btn bg-teal text-white">ADD New Employee</Link>
                  </div>
                  <div className="mt-6">
                      <DataTable columns={columns} data={filteredEmployee} pagination />
                  </div>
              </div>
          }
      </>
  );
};

export default List;