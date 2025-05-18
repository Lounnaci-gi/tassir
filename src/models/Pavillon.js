const mongoose = require('mongoose');

const pavillonSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  capacite: {
    type: Number,
    required: true
  },
  etage: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pavillon', pavillonSchema); 