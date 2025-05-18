const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['classe', 'laboratoire']
  },
  pavillonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pavillon',
    required: true
  },
  capacite: {
    type: Number,
    required: true
  },
  equipement: [{
    type: String
  }],
  emploiDuTemps: [{
    jour: {
      type: String,
      enum: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
    },
    periode: {
      type: String,
      enum: ['صباح', 'مساء']
    },
    professeurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professeur'
    },
    specialiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specialite'
    },
    niveau: {
      type: String,
      required: true
    }
  }],
  accessibilite: {
    type: {
      type: String,
      enum: ['عادي', 'مكيف للمعاقين'],
      default: 'عادي'
    },
    description: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Salle', salleSchema); 