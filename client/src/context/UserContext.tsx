import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface User {
  id: string;
  name: string;
  email: string;
  isExpiringSoon?: number;
}

const UserContext = createContext<{ user: User | null, loginUser: (userData: any) => void, logoutUser: () => void, getUser: () => void }>({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
  getUser: () => {}
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children } : any) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionExpirationTime, setSessionExpirationTime] = useState<number>(0);
 
  const loginUser = async (userData: any) => {
    try {
        const response = await axiosInstance.post('/auth/signIn', userData);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
  };

  const logoutUser = async () => {
    try {
        await axiosInstance.delete('/auth/logout');
        setSessionExpirationTime(0);
        setUser(null);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/user');
      setUser(response.data.user);
      setSessionExpirationTime(response.data.user.isExpiringSoon);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post('/auth/signUp', {
        name: "Andrei Mocanu",
        email: "mandreicosmin@yahoo.com",
        password: "secret",
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const value = React.useMemo(() => ({ user, loginUser, logoutUser, getUser }), [user]);

  useEffect(() => {     
    getUser()
  } , []);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (sessionExpirationTime !== undefined && sessionExpirationTime > 0) {
//       interval = setInterval(() => {
//         setSessionExpirationTime((prevSessionExpirationTime) => {
//             const newExpiringInterval = prevSessionExpirationTime - 1;
//             if (newExpiringInterval <= 0) {
//               clearInterval(interval);
//               console.log('Session expired');
//             //   logoutUser();
//               return 0;
//             } else if (newExpiringInterval <= 10) {
//               console.log('session expires in: ', newExpiringInterval);
//             } else {
//                 console.log('session is about to expire in: ', newExpiringInterval);
//             }
//             return newExpiringInterval;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [sessionExpirationTime, user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export let useUser = () => useContext(UserContext);
