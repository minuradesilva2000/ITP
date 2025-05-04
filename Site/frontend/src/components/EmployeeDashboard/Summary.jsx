import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const SummaryCard= () => {

    const {user}=useAuth()
    return (
        <div className="p-6">
          <div className="summary-card">
            <div className="icon bg-teal text-white">{FaUser}</div>
            <div className="summary-text">
              <p className="text-lg font-semibold">Welcome Back</p>
              <p className="text-xl font-bold">{user.name}</p>
            </div>
          </div>
        </div>
      );
}

export default SummaryCard