//src/component/froms/DepartmentFrom.js
import React ,{useState}from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const Setting = () => {

  const navigate=useNavigate();
  const {user}=useAuth();

  const [setting,setSetting] = useState({
    userId:user._id,
    oldPassword:"",
    newPassword:"",
    confirmPassword:"",
  });

  const [error,setError] = useState(null);

  const handleChange = (e) => {
    const{name,value}=e.target;
    setSetting({...setting,[name]:value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(setting.newPassword !==setting.confirmPassword){
      setError("Password not matched");
    }
    else
    {
      try
      {
        const response=await axios.put("http://localhost:5000/api/setting/change-password" , setting , {
          headers:{ "Authorization":`Bearer ${localStorage.getItem("token")}`} }
        );
        if(response.data.success){
          navigate("/admin-dashboard/employees");
          setError("")
        }
      }
      catch(error){
        if(error.response && !error.response.data.success){
          setError(error.response.data.error)
        }
      }
    }
  };

  return (

    <div className='p-6 text-center'>
      <div className="card w-96">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2><br/><br/>
        <p className="text-danger">{error}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">Old Password</label><br/>
            <input type="password" name="oldPassword" placeholder="Enter Old Password" onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">New Password</label><br/>
            <input type="password" name="newPassword" placeholder="Enter New Password" onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">Confirm Password</label><br/>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="input" required />
          </div>
          <br/><button type="submit" className="btn bg-teal text-white w-full">Change Password</button>
        </form>
      </div>
    </div>
  );

};

export default Setting