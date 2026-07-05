import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. TOUS TES IMPORTS D'ORIGINE RESTENT INTACTS ICI
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import ProtectedRoute from './components/ProtectedRoute'; 
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Support from './pages/Support';
import Budgets from './pages/Budgets';
import Notifications from './pages/Notifications';

// 2. LE NOUVEL IMPORT DE LA SIDEBAR
import Sidebar from './components/Sidebar';

// 3. LE NOUVEAU CONTENEUR FIXE (MainLayout)
const MainLayout = ({ children }) => (
  <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
    <Sidebar />
    <div className="flex-1 overflow-y-auto">
      {children}
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

        {/* ROUTES PRIVÉES (Avec la Sidebar grâce au MainLayout) */}
        <Route path="/Dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/Transactions" element={<ProtectedRoute><MainLayout><Transactions /></MainLayout></ProtectedRoute>} />
        <Route path="/Categories" element={<ProtectedRoute><MainLayout><Categories /></MainLayout></ProtectedRoute>} />
        <Route path="/Profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
        <Route path="/Support" element={<ProtectedRoute><MainLayout><Support /></MainLayout></ProtectedRoute>} />
        <Route path="/Budgets" element={<ProtectedRoute><MainLayout><Budgets /></MainLayout></ProtectedRoute>} />
        <Route path="/Notifications" element={<ProtectedRoute><MainLayout><Notifications /></MainLayout></ProtectedRoute>} />
        
        {/* ROUTE DE SÉCURITÉ */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;