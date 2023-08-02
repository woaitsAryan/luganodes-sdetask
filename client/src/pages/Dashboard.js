import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      fetch('http://localhost:1337/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.userInfo);
        })
        .catch((error) => {
          console.error('Error fetching dashboard data:', error);
        });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
        {userData && (
          <p className="text-center text-lg">
            Welcome, <span className="text-blue-600">{userData}</span>!
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
