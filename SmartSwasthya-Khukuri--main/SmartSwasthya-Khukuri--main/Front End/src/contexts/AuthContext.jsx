// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : {};
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }, [users]);

  const login = (username, password) => {
    if (users[username] && users[username].password === password) {
      const currentUser = { username: username };
      setUser(currentUser);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid username or password.' };
  };

  const register = (username, password) => {
    if (users[username]) {
      return { success: false, message: 'Username already exists.' };
    }
    setUsers(prevUsers => ({
      ...prevUsers,
      [username]: { password: password }
    }));
    const currentUser = { username: username };
    setUser(currentUser);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return { success: true, message: 'Registration successful and logged in!' };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
  };

  const authValue = {
    isLoggedIn,
    user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};