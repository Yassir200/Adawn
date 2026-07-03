require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
// On définit le port correctement : Azure fournit son port, sinon on utilise 3000
const port = process.env.PORT || 3000;

// Configuration des middlewares
app.use(cors({
    origin: [
        'https://adawn.tech', 
        'https://www.adawn.tech',
        'http://localhost:5173'
    ],
    credentials: true
}));

app.use(express.json());

// Permettre à React de lire les images du dossier uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion a la base de donnees
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gestion_budget')
  .then(() => console.log('MongoDB connecte'))
  .catch((err) => console.error('Erreur MongoDB :', err));

// Import des routes
const routesUtilisateurs = require('./routes/utilisateurs');
const routesCategories = require('./routes/categories');
const routesTransactions = require('./routes/transactions');
const routesStatistiques = require('./routes/statistiques');

// Utilisation des routes
app.use('/api/utilisateurs', routesUtilisateurs);
app.use('/api/categories', routesCategories);
app.use('/api/transactions', routesTransactions);
app.use('/api/statistiques', routesStatistiques);

// Route de test simple
app.get('/api/test', (req, res) => {
  res.json({ message: 'Serveur marche bien' });
});

// Démarrage du serveur : Un seul appel, avec la bonne variable 'port'
app.listen(port, () => {
  console.log(`Serveur demarre sur le port ${port}`);
});

module.exports = app;