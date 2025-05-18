const mongoose = require('mongoose');

const professeurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  dateNaissance: {
    type: Date,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  specialites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialite'
  }],
  diplomes: [{
    type: {
      type: String,
      required: true
    },
    etablissement: String,
    annee: Number
  }],
  experience: {
    type: Number, // en années
    default: 0
  },
  statut: {
    type: String,
    enum: ['دائم', 'متعاون', 'متقاعد'],
    default: 'دائم'
  },
  disponibilites: [{
    jour: {
      type: String,
      enum: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
    },
    periode: {
      type: String,
      enum: ['صباح', 'مساء']
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Professeur', professeurSchema); 