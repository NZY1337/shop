import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
const UserContext = createContext<{ user: any, loginUser: (userData: any) => void, logoutUser: () => void }>({
  user: null,
  loginUser: () => {},
  logoutUser: () => {}
});

// Create a provider component
interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null); // Initial user state is `null`

  // Function to update the user (e.g., on login or logout)
  const loginUser = (userData: any) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  const logoutUser = () => {
    setUser(null);
    console.log('User logged out');
  };

  const value = React.useMemo(() => ({ user, loginUser, logoutUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext in other components
export const useUser = () => useContext(UserContext);
