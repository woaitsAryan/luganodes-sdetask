import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      fetch('http://localhost:1337/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error('Error fetching dashboard data:', error);
        });
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userData && <p>Welcome, {userData.name}!</p>}
    </div>
  );
}

export default Dashboard;
