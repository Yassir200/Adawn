import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// 1. IMPORTATION DES PAGES
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Support from './pages/Support';
import Budgets from './pages/Budgets';
import Notifications from './pages/Notifications';

// 2. IMPORTATION DES COMPOSANTS DE SÉCURITÉ ET DE NAVIGATION
import ProtectedRoute from './components/ProtectedRoute'; 
import Sidebar from './components/Sidebar';

// 3. LE LAYOUT GLOBAL FIXE (La Sidebar ne se rechargera plus jamais)
const MainLayout = () => (
  <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
    <Sidebar />
    <div className="flex-1 overflow-y-auto relative">
      {/* L'Outlet permet d'injecter les pages ici, sans recharger la page web */}
      <Outlet />
    </div>
  </div>
);

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* ROUTES PUBLIQUES (Sans la Sidebar) */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/Dashboard" /> : <LandingPage />} />
        <Route path="/Login" element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Login />} />
        <Route path="/Register" element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ROUTES PRIVÉES (Protégées ET englobées par la Sidebar) */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Transactions" element={<Transactions />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/Budgets" element={<Budgets />} />
          <Route path="/Notifications" element={<Notifications />} />
        </Route>
        
        {/* SÉCURITÉ : Redirection vers l'accueil si l'URL n'existe pas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;