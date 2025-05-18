import React, { useState } from 'react';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const initialTuteurs = [
  { 
    id: 1, 
    nom: 'عبد الله', 
    prenom: 'محمد', 
    telephone: '0612345678',
    email: 'mohamed@example.com',
    adresse: '123 شارع محمد الخامس',
    profession: 'مهندس',
    lienParente: 'أب'
  },
  { 
    id: 2, 
    nom: 'فاطمة', 
    prenom: 'علي', 
    telephone: '0698765432',
    email: 'fatima@example.com',
    adresse: '456 شارع الحسن الثاني',
    profession: 'طبيبة',
    lienParente: 'أم'
  },
];

const liensParente = ['أب', 'أم', 'وصي'];

function Tuteurs() {
  const [tuteurs, setTuteurs] = useState(initialTuteurs);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTuteur, setSelectedTuteur] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    profession: '',
    lienParente: '',
  });

  const handleAddTuteur = () => {
    setSelectedTuteur(null);
    setFormData({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      adresse: '',
      profession: '',
      lienParente: '',
    });
    setOpenDialog(true);
  };

  const handleEditTuteur = (tuteur) => {
    setSelectedTuteur(tuteur);
    setFormData(tuteur);
    setOpenDialog(true);
  };

  const handleDeleteTuteur = (id) => {
    setTuteurs(tuteurs.filter((tuteur) => tuteur.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (selectedTuteur) {
      setTuteurs(tuteurs.map(tuteur => 
        tuteur.id === selectedTuteur.id ? { ...formData, id: tuteur.id } : tuteur
      ));
    } else {
      setTuteurs([...tuteurs, { ...formData, id: tuteurs.length + 1 }]);
    }
    setOpenDialog(false);
  };

  const filteredTuteurs = tuteurs.filter((tuteur) =>
    `${tuteur.nom} ${tuteur.prenom}`.includes(searchTerm)
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">إدارة الأولياء</h1>
        <button
          onClick={handleAddTuteur}
          className="btn-primary"
        >
          <AddIcon className="ml-2" />
          إضافة ولي
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="بحث عن ولي"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">اللقب</th>
                <th className="table-header">الاسم</th>
                <th className="table-header">الهاتف</th>
                <th className="table-header">البريد الإلكتروني</th>
                <th className="table-header">العنوان</th>
                <th className="table-header">المهنة</th>
                <th className="table-header">صلة القرابة</th>
                <th className="table-header">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTuteurs.map((tuteur) => (
                <tr key={tuteur.id} className="hover:bg-gray-50">
                  <td className="table-cell">{tuteur.nom}</td>
                  <td className="table-cell">{tuteur.prenom}</td>
                  <td className="table-cell">{tuteur.telephone}</td>
                  <td className="table-cell">{tuteur.email}</td>
                  <td className="table-cell">{tuteur.adresse}</td>
                  <td className="table-cell">{tuteur.profession}</td>
                  <td className="table-cell">{tuteur.lienParente}</td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTuteur(tuteur)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteTuteur(tuteur.id)}
                        className="text-red-600 hover:text-red-900"
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

      {openDialog && (
        <div className="modal">
          <div className="modal-content">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {selectedTuteur ? 'تعديل بيانات الولي' : 'إضافة ولي جديد'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اللقب</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الهاتف</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المهنة</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">صلة القرابة</label>
                  <select
                    name="lienParente"
                    value={formData.lienParente}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">اختر صلة القرابة</option>
                    {liensParente.map(lien => (
                      <option key={lien} value={lien}>{lien}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setOpenDialog(false)}
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
        </div>
      )}
    </div>
  );
}

export default Tuteurs; 