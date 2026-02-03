import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const userData = { name: user.name, email: user.email };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return false; // User already exists
    }
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    const userData = { name, email };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};