const mongoose = require('mongoose');

const specialiteSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  niveau: {
    type: String,
    required: true,
    enum: ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة']
  },
  coefficient: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  professeurs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professeur'
  }],
  salles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salle'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Specialite', specialiteSchema); 