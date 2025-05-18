const mongoose = require('mongoose');

const transfertSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  type: {
    type: String,
    enum: ['دخول', 'خروج'],
    required: true
  },
  dateTransfert: {
    type: Date,
    required: true
  },
  etablissement: {
    nom: {
      type: String,
      required: true
    },
    adresse: String,
    ville: String,
    telephone: String,
    email: String
  },
  niveau: {
    type: String,
    required: true
  },
  specialite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialite'
  },
  motif: {
    type: String,
    required: true
  },
  documents: [{
    type: {
      type: String,
      enum: ['شهادة مدرسية', 'كشف النقاط', 'شهادة صحية', 'آخر']
    },
    numero: String,
    date: Date,
    fichier: String // URL ou chemin du fichier
  }],
  statut: {
    type: String,
    enum: ['قيد الانتظار', 'تم القبول', 'مرفوض', 'مكتمل'],
    default: 'قيد الانتظار'
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Transfert', transfertSchema); 