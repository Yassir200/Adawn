import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api'; // On importe l'API pour récupérer le profil

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // 1. Initialisation instantanée depuis le localStorage (zéro délai)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('utilisateur');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 2. Vérification silencieuse au chargement global
  useEffect(() => {
    const fetchUserGlobal = async () => {
      // Si on a un token mais que les infos complètes manquent
      if (token && (!user || !user.nom)) {
        try {
          const res = await api.get('/utilisateurs/me');
          const userData = {
            nom: res.data.nom || 'Utilisateur',
            email: res.data.email,
            avatar: res.data.avatar || ''
          };
          setUser(userData);
          localStorage.setItem('utilisateur', JSON.stringify(userData));
        } catch (err) {
          console.error("Erreur de récupération du profil global:", err);
        }
      }
    };
    fetchUserGlobal();
  }, [token]);

  // Fonction pour connecter (appelée dans Login.jsx)
  const login = (newToken, userData = null) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    if (userData) {
      localStorage.setItem('utilisateur', JSON.stringify(userData));
      setUser(userData);
    } else {
      setUser({ authenticated: true });
    }
  };

  // Fonction pour déconnecter proprement
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateur');
    setToken(null);
    setUser(null);
  };

  // 💡 NOUVEAU : Fonction pour mettre à jour le profil (à appeler quand l'utilisateur change son nom/avatar)
  const updateProfile = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('utilisateur', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};