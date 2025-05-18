import React, { useState } from 'react';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Class as ClassIcon,
} from '@mui/icons-material';

function Classes() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      nom: 'قسم 1 أ',
      type: 'فصل دراسي',
      capacite: 30,
      pavillonId: 1,
      niveau: 'السنة الأولى',
      specialite: 'علوم طبيعية'
    },
    {
      id: 2,
      nom: 'مختبر 1',
      type: 'مختبر',
      capacite: 20,
      pavillonId: 2,
      niveau: 'السنة الأولى',
      specialite: 'علوم طبيعية'
    }
  ]);

  const [pavillons] = useState([
    { id: 1, nom: 'المبنى أ' },
    { id: 2, nom: 'المبنى ب' }
  ]);

  const [selectedClasse, setSelectedClasse] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    type: 'فصل دراسي',
    capacite: '',
    pavillonId: '',
    niveau: '',
    specialite: ''
  });

  const handleAddClasse = () => {
    setSelectedClasse(null);
    setIsAdding(true);
    setFormData({
      nom: '',
      type: 'فصل دراسي',
      capacite: '',
      pavillonId: '',
      niveau: '',
      specialite: ''
    });
  };

  const handleEditClasse = (classe) => {
    setSelectedClasse(classe);
    setIsAdding(false);
    setFormData(classe);
  };

  const handleDeleteClasse = (id) => {
    setClasses(classes.filter(classe => classe.id !== id));
    if (selectedClasse && selectedClasse.id === id) {
      setSelectedClasse(null);
      setIsAdding(false);
      setFormData({
        nom: '',
        type: 'فصل دراسي',
        capacite: '',
        pavillonId: '',
        niveau: '',
        specialite: ''
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
    if (selectedClasse) {
      setClasses(classes.map(classe => 
        classe.id === selectedClasse.id ? { ...formData, id: classe.id } : classe
      ));
    } else {
      setClasses([...classes, { ...formData, id: classes.length + 1 }]);
    }
    setSelectedClasse(null);
    setIsAdding(false);
    setFormData({
      nom: '',
      type: 'فصل دراسي',
      capacite: '',
      pavillonId: '',
      niveau: '',
      specialite: ''
    });
  };

  const handleCancel = () => {
    setSelectedClasse(null);
    setIsAdding(false);
    setFormData({
      nom: '',
      type: 'فصل دراسي',
      capacite: '',
      pavillonId: '',
      niveau: '',
      specialite: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <ClassIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">إدارة الفصول والمختبرات</h1>
            </div>
            <button
              onClick={handleAddClasse}
              className="btn-primary"
            >
              <AddIcon className="ml-2" />
              إضافة فصل/مختبر
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liste des classes */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">قائمة الفصول والمختبرات</h2>
            <div className="space-y-4">
              {classes.map((classe) => (
                <div
                  key={classe.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors duration-150 ${
                    selectedClasse?.id === classe.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleEditClasse(classe)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{classe.nom}</h3>
                      <p className="text-sm text-gray-500">{classe.type}</p>
                      <div className="mt-2 flex flex-wrap gap-4">
                        <span className="text-sm text-gray-600">السعة: {classe.capacite}</span>
                        <span className="text-sm text-gray-600">المبنى: {pavillons.find(p => p.id === classe.pavillonId)?.nom}</span>
                        <span className="text-sm text-gray-600">المستوى: {classe.niveau}</span>
                        <span className="text-sm text-gray-600">التخصص: {classe.specialite}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClasse(classe);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClasse(classe.id);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          {(selectedClasse || isAdding) && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedClasse ? 'تعديل الفصل/المختبر' : 'إضافة فصل/مختبر جديد'}
              </h2>
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">الاسم</label>
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
                  <label className="form-label">النوع</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="فصل دراسي">فصل دراسي</option>
                    <option value="مختبر">مختبر</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">السعة</label>
                    <input
                      type="number"
                      name="capacite"
                      value={formData.capacite}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">المبنى</label>
                    <select
                      name="pavillonId"
                      value={formData.pavillonId}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">اختر المبنى</option>
                      {pavillons.map(pavillon => (
                        <option key={pavillon.id} value={pavillon.id}>
                          {pavillon.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">المستوى</label>
                    <select
                      name="niveau"
                      value={formData.niveau}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">اختر المستوى</option>
                      <option value="السنة الأولى">السنة الأولى</option>
                      <option value="السنة الثانية">السنة الثانية</option>
                      <option value="السنة الثالثة">السنة الثالثة</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">التخصص</label>
                    <select
                      name="specialite"
                      value={formData.specialite}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">اختر التخصص</option>
                      <option value="علوم طبيعية">علوم طبيعية</option>
                      <option value="رياضيات">رياضيات</option>
                      <option value="فيزياء">فيزياء</option>
                      <option value="كيمياء">كيمياء</option>
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

export default Classes; 