import React, { useState } from 'react';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const initialLaboratoires = [
  { id: 1, nom: 'مختبر الفيزياء', pavillonId: 2, capacite: 20, type: 'فيزياء' },
  { id: 2, nom: 'مختبر الكيمياء', pavillonId: 2, capacite: 25, type: 'كيمياء' },
  { id: 3, nom: 'مختبر الأحياء', pavillonId: 2, capacite: 20, type: 'أحياء' },
];

const pavillons = [
  { id: 1, nom: 'المبنى أ' },
  { id: 2, nom: 'المبنى ب' },
  { id: 3, nom: 'المبنى ج' },
];

const typesLaboratoire = [
  'فيزياء',
  'كيمياء',
  'أحياء',
  'حاسوب',
  'إلكترونيات',
];

function Laboratoires() {
  const [laboratoires, setLaboratoires] = useState(initialLaboratoires);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLaboratoire, setSelectedLaboratoire] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    pavillonId: '',
    capacite: '',
    type: '',
  });

  const handleAddLaboratoire = () => {
    setSelectedLaboratoire(null);
    setFormData({
      nom: '',
      pavillonId: '',
      capacite: '',
      type: '',
    });
    setOpenDialog(true);
  };

  const handleEditLaboratoire = (laboratoire) => {
    setSelectedLaboratoire(laboratoire);
    setFormData(laboratoire);
    setOpenDialog(true);
  };

  const handleDeleteLaboratoire = (id) => {
    setLaboratoires(laboratoires.filter((laboratoire) => laboratoire.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (selectedLaboratoire) {
      setLaboratoires(laboratoires.map(laboratoire => 
        laboratoire.id === selectedLaboratoire.id ? { ...formData, id: laboratoire.id } : laboratoire
      ));
    } else {
      setLaboratoires([...laboratoires, { ...formData, id: laboratoires.length + 1 }]);
    }
    setOpenDialog(false);
  };

  const filteredLaboratoires = laboratoires.filter((laboratoire) =>
    laboratoire.nom.includes(searchTerm)
  );

  const getPavillonName = (pavillonId) => {
    const pavillon = pavillons.find(p => p.id === pavillonId);
    return pavillon ? pavillon.nom : '';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">إدارة المختبرات</h1>
        <button
          onClick={handleAddLaboratoire}
          className="btn-primary"
        >
          <AddIcon className="ml-2" />
          إضافة مختبر
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="بحث عن مختبر"
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
                <th className="table-header">اسم المختبر</th>
                <th className="table-header">المبنى</th>
                <th className="table-header">النوع</th>
                <th className="table-header">السعة</th>
                <th className="table-header">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLaboratoires.map((laboratoire) => (
                <tr key={laboratoire.id} className="hover:bg-gray-50">
                  <td className="table-cell">{laboratoire.nom}</td>
                  <td className="table-cell">{getPavillonName(laboratoire.pavillonId)}</td>
                  <td className="table-cell">{laboratoire.type}</td>
                  <td className="table-cell">{laboratoire.capacite}</td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditLaboratoire(laboratoire)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteLaboratoire(laboratoire.id)}
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
                {selectedLaboratoire ? 'تعديل بيانات المختبر' : 'إضافة مختبر جديد'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم المختبر</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">المبنى</label>
                  <select
                    name="pavillonId"
                    value={formData.pavillonId}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">اختر المبنى</option>
                    {pavillons.map(pavillon => (
                      <option key={pavillon.id} value={pavillon.id}>{pavillon.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">اختر النوع</option>
                    {typesLaboratoire.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">السعة</label>
                  <input
                    type="number"
                    name="capacite"
                    value={formData.capacite}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
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

export default Laboratoires; 