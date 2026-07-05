import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext'; // 💡 NOUVEL IMPORT
import { ThemeProvider } from './context/ThemeContext';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider> {/* 💡 LE PROVIDER EST ICI */}
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
);