import React, { useState } from 'react';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Bloodtype as BloodTypeIcon,
  CalendarToday as CalendarIcon,
  Wc as GenderIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Class as ClassIcon,
  Science as ScienceIcon,
  SupervisorAccount as SupervisorIcon,
} from '@mui/icons-material';

// Données de test pour les listes déroulantes
const niveaux = ['السنة الأولى', 'السنة الثانية', 'السنة الثالثة'];
const specialites = [
  'علوم فيزيائية',
  'علوم الحياة والأرض',
  'علوم رياضية',
  'علوم اقتصادية',
  'علوم إنسانية',
  'علوم شرعية',
  'علوم تجريبية'
];

const pavillons = [
  { 
    id: 1, 
    nom: 'المبنى أ', 
    description: 'مبنى الفصول الدراسية الرئيسي',
    capacite: 20,
    etage: 1
  },
  { 
    id: 2, 
    nom: 'المبنى ب', 
    description: 'مبنى المختبرات العلمية',
    capacite: 15,
    etage: 2
  },
  { 
    id: 3, 
    nom: 'المبنى ج', 
    description: 'مبنى الفصول الدراسية الإضافي',
    capacite: 18,
    etage: 1
  },
];

const salles = [
  { 
    id: 1, 
    nom: 'قسم 101', 
    type: 'classe',
    pavillonId: 1,
    capacite: 30,
    equipement: ['سبورة ذكية', 'مكيف هواء', 'إنترنت']
  },
  { 
    id: 2, 
    nom: 'قسم 102', 
    type: 'classe',
    pavillonId: 1,
    capacite: 30,
    equipement: ['سبورة ذكية', 'مكيف هواء', 'إنترنت']
  },
  { 
    id: 3, 
    nom: 'مختبر الفيزياء', 
    type: 'laboratoire',
    pavillonId: 2,
    capacite: 25,
    equipement: ['أجهزة فيزيائية', 'سبورة ذكية', 'مكيف هواء', 'إنترنت']
  },
  { 
    id: 4, 
    nom: 'مختبر الكيمياء', 
    type: 'laboratoire',
    pavillonId: 2,
    capacite: 25,
    equipement: ['أجهزة كيميائية', 'سبورة ذكية', 'مكيف هواء', 'إنترنت']
  },
  { 
    id: 5, 
    nom: 'قسم 201', 
    type: 'classe',
    pavillonId: 3,
    capacite: 30,
    equipement: ['سبورة ذكية', 'مكيف هواء', 'إنترنت']
  },
];

const tuteurs = [
  { id: 1, nom: 'عبد الله', prenom: 'محمد', telephone: '0612345678' },
  { id: 2, nom: 'فاطمة', prenom: 'علي', telephone: '0698765432' },
];

// Données de test
const initialStudents = [
  {
    id: 1,
    nom: 'محمد',
    prenom: 'أحمد',
    dateNaissance: '2005-05-15',
    lieuNaissance: 'الدار البيضاء',
    groupeSanguin: 'A+',
    sexe: 'ذكر',
    adresse: '123 شارع محمد الخامس',
    telephone: '0612345678',
    email: 'ahmed@example.com',
    niveau: 'السنة الأولى',
    specialite: 'علوم فيزيائية',
    tuteurId: 1,
    classeId: 1,
  },
  {
    id: 2,
    nom: 'علي',
    prenom: 'سارة',
    dateNaissance: '2006-03-20',
    lieuNaissance: 'الرباط',
    groupeSanguin: 'O+',
    sexe: 'أنثى',
    adresse: '456 شارع الحسن الثاني',
    telephone: '0698765432',
    email: 'sara@example.com',
    niveau: 'السنة الثانية',
    specialite: 'علوم رياضية',
    tuteurId: 2,
    classeId: 2,
  },
];

const groupesSanguins = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const sexes = ['ذكر', 'أنثى'];

function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    groupeSanguin: '',
    sexe: '',
    adresse: '',
    telephone: '',
    email: '',
    niveau: '',
    specialite: '',
    tuteurId: '',
    classeId: '',
  });

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsAdding(true);
    setFormData({
      nom: '',
      prenom: '',
      dateNaissance: '',
      lieuNaissance: '',
      groupeSanguin: '',
      sexe: '',
      adresse: '',
      telephone: '',
      email: '',
      niveau: '',
      specialite: '',
      tuteurId: '',
      classeId: '',
    });
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsAdding(false);
    setFormData(student);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(null);
      setIsAdding(false);
      setFormData({
        nom: '',
        prenom: '',
        dateNaissance: '',
        lieuNaissance: '',
        groupeSanguin: '',
        sexe: '',
        adresse: '',
        telephone: '',
        email: '',
        niveau: '',
        specialite: '',
        tuteurId: '',
        classeId: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (selectedStudent) {
      setStudents(students.map(student => 
        student.id === selectedStudent.id ? { ...formData, id: student.id } : student
      ));
    } else {
      setStudents([...students, { ...formData, id: students.length + 1 }]);
    }
    setSelectedStudent(null);
    setIsAdding(false);
    setFormData({
      nom: '',
      prenom: '',
      dateNaissance: '',
      lieuNaissance: '',
      groupeSanguin: '',
      sexe: '',
      adresse: '',
      telephone: '',
      email: '',
      niveau: '',
      specialite: '',
      tuteurId: '',
      classeId: '',
    });
  };

  const handleCancel = () => {
    setSelectedStudent(null);
    setIsAdding(false);
    setFormData({
      nom: '',
      prenom: '',
      dateNaissance: '',
      lieuNaissance: '',
      groupeSanguin: '',
      sexe: '',
      adresse: '',
      telephone: '',
      email: '',
      niveau: '',
      specialite: '',
      tuteurId: '',
      classeId: '',
    });
  };

  const filteredStudents = students.filter((student) =>
    `${student.nom} ${student.prenom}`.includes(searchTerm)
  );

  const getTuteurName = (tuteurId) => {
    const tuteur = tuteurs.find(t => t.id === tuteurId);
    return tuteur ? `${tuteur.prenom} ${tuteur.nom}` : '';
  };

  const getClasseName = (classeId) => {
    const classe = salles.find(c => c.id === classeId);
    return classe ? classe.nom : '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <DashboardIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-primary">
                <GroupIcon className="ml-2" />
                الطلاب
              </button>
              <button className="btn-secondary">
                <ClassIcon className="ml-2" />
                الأقسام
              </button>
              <button className="btn-secondary">
                <ScienceIcon className="ml-2" />
                المختبرات
              </button>
              <button className="btn-secondary">
                <SupervisorIcon className="ml-2" />
                الأولياء
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <SchoolIcon className="ml-2 text-blue-600" />
              إدارة الطلاب
            </h2>
            <button
              onClick={handleAddStudent}
              className="btn-primary"
            >
              <AddIcon className="ml-2" />
              إضافة طالب
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="بحث عن طالب"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pr-10"
            />
          </div>

          {/* Liste des étudiants - 90% de largeur */}
          <div className="w-[90%] mx-auto mb-8">
            <div className="table-container">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="table-header">الاسم</th>
                      <th className="table-header">اللقب</th>
                      <th className="table-header">المستوى</th>
                      <th className="table-header">التخصص</th>
                      <th className="table-header">القسم</th>
                      <th className="table-header">الولي</th>
                      <th className="table-header">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr 
                        key={student.id} 
                        className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${selectedStudent?.id === student.id ? 'bg-blue-50' : ''}`}
                        onClick={() => handleEditStudent(student)}
                      >
                        <td className="table-cell">{student.nom}</td>
                        <td className="table-cell">{student.prenom}</td>
                        <td className="table-cell">{student.niveau}</td>
                        <td className="table-cell">{student.specialite}</td>
                        <td className="table-cell">{getClasseName(student.classeId)}</td>
                        <td className="table-cell">{getTuteurName(student.tuteurId)}</td>
                        <td className="table-cell">
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditStudent(student);
                              }}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteStudent(student.id);
                              }}
                              className="text-red-600 hover:text-red-900 transition-colors duration-150"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Formulaire - 70% de largeur */}
          {(selectedStudent || isAdding) && (
            <div className="w-[70%] mx-auto bg-white rounded-lg shadow-lg p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <SchoolIcon className="ml-2 text-blue-600" />
                {selectedStudent ? 'تعديل بيانات الطالب' : 'إضافة طالب جديد'}
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label flex items-center">
                      <PersonIcon className="ml-1 text-gray-500" />
                      اللقب
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label flex items-center">
                      <PersonIcon className="ml-1 text-gray-500" />
                      الاسم
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label flex items-center">
                      <CalendarIcon className="ml-1 text-gray-500" />
                      تاريخ الميلاد
                    </label>
                    <input
                      type="date"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label flex items-center">
                      <LocationIcon className="ml-1 text-gray-500" />
                      مكان الميلاد
                    </label>
                    <input
                      type="text"
                      name="lieuNaissance"
                      value={formData.lieuNaissance}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label flex items-center">
                      <BloodTypeIcon className="ml-1 text-gray-500" />
                      الفصيلة الدموية
                    </label>
                    <select
                      name="groupeSanguin"
                      value={formData.groupeSanguin}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">اختر الفصيلة الدموية</option>
                      {groupesSanguins.map(groupe => (
                        <option key={groupe} value={groupe}>{groupe}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label flex items-center">
                      <GenderIcon className="ml-1 text-gray-500" />
                      الجنس
                    </label>
                    <select
                      name="sexe"
                      value={formData.sexe}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">اختر الجنس</option>
                      {sexes.map(sexe => (
                        <option key={sexe} value={sexe}>{sexe}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label flex items-center">
                    <LocationIcon className="ml-1 text-gray-500" />
                    العنوان
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label flex items-center">
                      <PhoneIcon className="ml-1 text-gray-500" />
                      الهاتف (اختياري)
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label flex items-center">
                      <EmailIcon className="ml-1 text-gray-500" />
                      البريد الإلكتروني (اختياري)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">المستوى</label>
                    <select
                      name="niveau"
                      value={formData.niveau}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">اختر المستوى</option>
                      {niveaux.map(niveau => (
                        <option key={niveau} value={niveau}>{niveau}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">التخصص</label>
                    <select
                      name="specialite"
                      value={formData.specialite}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">اختر التخصص</option>
                      {specialites.map(specialite => (
                        <option key={specialite} value={specialite}>{specialite}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">القسم</label>
                    <select
                      name="classeId"
                      value={formData.classeId}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">اختر القسم</option>
                      {salles.map(classe => (
                        <option key={classe.id} value={classe.id}>
                          {classe.nom} - {pavillons.find(p => p.id === classe.pavillonId)?.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">الولي</label>
                    <select
                      name="tuteurId"
                      value={formData.tuteurId}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">اختر الولي</option>
                      {tuteurs.map(tuteur => (
                        <option key={tuteur.id} value={tuteur.id}>
                          {tuteur.prenom} {tuteur.nom} - {tuteur.telephone}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={handleCancel}
                    className="btn-secondary"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Students; 