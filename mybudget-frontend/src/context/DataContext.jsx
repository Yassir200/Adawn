import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // On écoute le token depuis l'AuthContext pour savoir si l'utilisateur est connecté
  const { token } = useContext(AuthContext); 
  
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGlobalData = async () => {
    // Si l'utilisateur n'est pas connecté, on vide le cache par sécurité
    if (!token) {
      setTransactions([]);
      setCategories([]);
      return;
    }

    setLoading(true);
    try {
      const [resTx, resCat] = await Promise.all([
        api.get('/transactions'),
        api.get('/categories')
      ]);
      setTransactions(resTx.data);
      setCategories(resCat.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données globales :", error);
    } finally {
      setLoading(false);
    }
  };

  // Les données sont téléchargées automatiquement dès qu'un token est détecté
  useEffect(() => {
    fetchGlobalData();
  }, [token]);

  // Cette fonction permet à tes pages de forcer une mise à jour (ex: après avoir ajouté une dépense)
  const refreshData = () => {
    fetchGlobalData();
  };

  return (
    <DataContext.Provider value={{ transactions, categories, loading, refreshData }}>
      {children}
    </DataContext.Provider>
  );
};