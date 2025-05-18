const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
  lieuNaissance: {
    type: String,
    required: true
  },
  groupeSanguin: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  sexe: {
    type: String,
    required: true,
    enum: ['ذكر', 'أنثى']
  },
  adresse: {
    type: String,
    required: true
  },
  telephone: {
    type: String
  },
  email: {
    type: String
  },
  niveau: {
    type: String,
    required: true
  },
  specialite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialite',
    required: true
  },
  situationFamiliale: {
    type: String,
    enum: ['عادي', 'يتيم', 'يتيم الأب', 'يتيم الأم'],
    default: 'عادي'
  },
  situationSociale: {
    type: String,
    enum: ['عادي', 'محتاج', 'مستفيد من المنحة'],
    default: 'عادي'
  },
  handicap: {
    type: {
      type: String,
      enum: ['بدون', 'حركي', 'سمعي', 'بصري', 'ذهني', 'آخر'],
      default: 'بدون'
    },
    description: String
  },
  maladiesChroniques: [{
    type: {
      type: String,
      enum: ['داء السكري', 'ارتفاع ضغط الدم', 'قصر النظر', 'حساسية', 'آخر']
    },
    description: String,
    traitement: String,
    dateDiagnostic: Date
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
    salleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Salle'
    }
  }],
  tuteurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tuteur',
    required: true
  },
  statut: {
    type: String,
    enum: ['نشط', 'منقول', 'مغادر', 'متوقف'],
    default: 'نشط'
  },
  historiqueTransferts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transfert'
  }],
  dateInscription: {
    type: Date,
    default: Date.now
  },
  dateDepart: Date,
  motifDepart: String,
  etablissementPrecedent: {
    nom: String,
    ville: String,
    dateDepart: Date
  },
  classeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salle',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema); 