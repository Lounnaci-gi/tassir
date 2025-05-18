import React, { useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';

// Données de test
const initialWarnings = [
  {
    id: 1,
    studentName: 'أحمد محمد',
    date: '2024-03-20',
    type: 'غياب متكرر',
    description: 'تغيب عن المدرسة لمدة 3 أيام متتالية',
    status: 'نشط',
  },
  {
    id: 2,
    studentName: 'سارة علي',
    date: '2024-03-19',
    type: 'سلوك',
    description: 'عدم احترام المعلم',
    status: 'معلق',
  },
];

const warningTypes = [
  'غياب متكرر',
  'سلوك',
  'تأخير',
  'عدم إنجاز الواجبات',
  'أخرى',
];

const warningStatuses = ['نشط', 'معلق', 'محلول'];

function Warnings() {
  const [warnings, setWarnings] = useState(initialWarnings);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddWarning = () => {
    setOpenDialog(true);
  };

  const handleSave = (newWarning) => {
    setWarnings([...warnings, { ...newWarning, id: warnings.length + 1 }]);
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشط':
        return 'badge-error';
      case 'معلق':
        return 'badge-warning';
      case 'محلول':
        return 'badge-success';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">إدارة الإنذارات</h1>
        <button
          onClick={handleAddWarning}
          className="btn-primary inline-flex items-center"
        >
          <AddIcon className="ml-2" />
          إضافة إنذار
        </button>
      </div>

      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">اسم الطالب</th>
                <th className="table-header">التاريخ</th>
                <th className="table-header">نوع الإنذار</th>
                <th className="table-header">الوصف</th>
                <th className="table-header">الحالة</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {warnings.map((warning) => (
                <tr key={warning.id} className="hover:bg-gray-50">
                  <td className="table-cell">{warning.studentName}</td>
                  <td className="table-cell">{warning.date}</td>
                  <td className="table-cell">{warning.type}</td>
                  <td className="table-cell">{warning.description}</td>
                  <td className="table-cell">
                    <span className={`badge ${getStatusColor(warning.status)}`}>
                      {warning.status}
                    </span>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">إضافة إنذار جديد</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الطالب</label>
                  <select className="input-field">
                    <option value="أحمد محمد">أحمد محمد</option>
                    <option value="سارة علي">سارة علي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الإنذار</label>
                  <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع الإنذار</label>
                  <select className="input-field">
                    {warningTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">وصف الإنذار</label>
                  <textarea
                    rows="4"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <select className="input-field">
                    {warningStatuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
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
                  onClick={() => handleSave({
                    studentName: document.querySelector('select').value,
                    date: selectedDate.toISOString().split('T')[0],
                    type: document.querySelector('select:nth-of-type(2)').value,
                    description: document.querySelector('textarea').value,
                    status: document.querySelector('select:last-child').value
                  })}
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

export default Warnings; 