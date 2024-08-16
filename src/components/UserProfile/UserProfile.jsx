"use client"
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { fetchUserData } from '@/utils/getUserById';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
  
    const getUserData = async () => {
      const data = await fetchUserData(userId, token);
      setUserData(data);
    };

    if (userId && token) {
      getUserData();
    }
  }, [userId, token]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>Email: {userData.email}</p>
      {/* Renderiza aquí más información del usuario si es necesario */}
    </div>
  );
};

export default UserProfile;
