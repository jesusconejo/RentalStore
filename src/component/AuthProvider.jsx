import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Intenta cargar el usuario desde localStorage si existe
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
      });
    

  const login = (userData) => {
   // console.log('AuthProvider', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
  };

  const upDateUserLikes = (updatedLikes) => {
    const updatedUser = { ...user, likeList: updatedLikes };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, upDateUserLikes }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};

