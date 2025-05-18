import React, { useState } from 'react';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

function Pavillons() {
  const [pavillons, setPavillons] = useState([
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
    }
  ]);

  const [selectedPavillon, setSelectedPavillon] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    capacite: '',
    etage: ''
  });

  const handleAddPavillon = () => {
    setSelectedPavillon(null);
    setIsAdding(true);
    setFormData({
      nom: '',
      description: '',
      capacite: '',
      etage: ''
    });
  };

  const handleEditPavillon = (pavillon) => {
    setSelectedPavillon(pavillon);
    setIsAdding(false);
    setFormData(pavillon);
  };

  const handleDeletePavillon = (id) => {
    setPavillons(pavillons.filter(pavillon => pavillon.id !== id));
    if (selectedPavillon && selectedPavillon.id === id) {
      setSelectedPavillon(null);
      setIsAdding(false);
      setFormData({
        nom: '',
        description: '',
        capacite: '',
        etage: ''
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
    if (selectedPavillon) {
      setPavillons(pavillons.map(pavillon => 
        pavillon.id === selectedPavillon.id ? { ...formData, id: pavillon.id } : pavillon
      ));
    } else {
      setPavillons([...pavillons, { ...formData, id: pavillons.length + 1 }]);
    }
    setSelectedPavillon(null);
    setIsAdding(false);
    setFormData({
      nom: '',
      description: '',
      capacite: '',
      etage: ''
    });
  };

  const handleCancel = () => {
    setSelectedPavillon(null);
    setIsAdding(false);
    setFormData({
      nom: '',
      description: '',
      capacite: '',
      etage: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <BusinessIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">إدارة المباني</h1>
            </div>
            <button
              onClick={handleAddPavillon}
              className="btn-primary"
            >
              <AddIcon className="ml-2" />
              إضافة مبنى
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liste des pavillons */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">قائمة المباني</h2>
            <div className="space-y-4">
              {pavillons.map((pavillon) => (
                <div
                  key={pavillon.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors duration-150 ${
                    selectedPavillon?.id === pavillon.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleEditPavillon(pavillon)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{pavillon.nom}</h3>
                      <p className="text-sm text-gray-500">{pavillon.description}</p>
                      <div className="mt-2 flex space-x-4">
                        <span className="text-sm text-gray-600">السعة: {pavillon.capacite}</span>
                        <span className="text-sm text-gray-600">الطابق: {pavillon.etage}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPavillon(pavillon);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePavillon(pavillon.id);
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
          {(selectedPavillon || isAdding) && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedPavillon ? 'تعديل المبنى' : 'إضافة مبنى جديد'}
              </h2>
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">اسم المبنى</label>
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
                  <label className="form-label">الوصف</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input"
                    rows="3"
                    required
                  />
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
                    <label className="form-label">الطابق</label>
                    <input
                      type="number"
                      name="etage"
                      value={formData.etage}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
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

export default Pavillons; 