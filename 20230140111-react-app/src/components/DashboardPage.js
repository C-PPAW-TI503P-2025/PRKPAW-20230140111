import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function DashboardPage() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let user = null;

  if (token) {
    user = jwtDecode(token);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Dashboard
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Halo, <span className="font-semibold">{user?.name}</span>!  
          <br />
          Kamu login sebagai: <span className="font-semibold">{user?.role}</span>
        </p>

        <button
          onClick={handleLogout}
          className="py-2 px-6 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
