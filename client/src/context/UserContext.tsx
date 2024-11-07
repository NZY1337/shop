import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

// Create the UserContext
const UserContext = createContext<{ user: any, loginUser: (userData: any) => void, logoutUser: () => void, getUser: () => void }>({
  user: null,
  loginUser: async () => {},
  logoutUser: async () => {},
  getUser: async () => {}
});

// Create a provider component
interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children } : any) => {
  const [user, setUser] = useState(null); // Initial user state is `null`

  // Function to update the user (e.g., on login or logout)
  const loginUser = async (userData: any) => {
    try {
        const response = await axiosInstance.post('/auth/signIn', userData);
        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
  };

  const logoutUser = () => {
    setUser(null);
    console.log('User logged out');
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/user');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  const value = React.useMemo(() => ({ user, loginUser, logoutUser, getUser }), [user]);

  useEffect(() => {     
    getUser()
  } , []);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext in other components
export const useUser = () => useContext(UserContext);
