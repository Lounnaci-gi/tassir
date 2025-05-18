const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/students', require('./routes/students'));
app.use('/api/salles', require('./routes/salles'));
app.use('/api/pavillons', require('./routes/pavillons'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 