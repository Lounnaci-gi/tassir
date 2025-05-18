import React, { useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';

// Données de test
const initialAbsences = [
  {
    id: 1,
    studentName: 'أحمد محمد',
    date: '2024-03-20',
    reason: 'مرض',
    justified: true,
  },
  {
    id: 2,
    studentName: 'سارة علي',
    date: '2024-03-19',
    reason: 'سفر',
    justified: false,
  },
];

function Absences() {
  const [absences, setAbsences] = useState(initialAbsences);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddAbsence = () => {
    setOpenDialog(true);
  };

  const handleSave = (newAbsence) => {
    setAbsences([...absences, { ...newAbsence, id: absences.length + 1 }]);
    setOpenDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">إدارة الغيابات</h1>
        <button
          onClick={handleAddAbsence}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <AddIcon className="ml-2" />
          تسجيل غياب
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الطالب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السبب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مبرر</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {absences.map((absence) => (
                <tr key={absence.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{absence.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{absence.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{absence.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      absence.justified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {absence.justified ? 'نعم' : 'لا'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">تسجيل غياب جديد</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الطالب</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="أحمد محمد">أحمد محمد</option>
                    <option value="سارة علي">سارة علي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الغياب</label>
                  <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">سبب الغياب</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مبرر</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="true">نعم</option>
                    <option value="false">لا</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setOpenDialog(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => handleSave({
                    studentName: document.querySelector('select').value,
                    date: selectedDate.toISOString().split('T')[0],
                    reason: document.querySelector('input[type="text"]').value,
                    justified: document.querySelector('select:last-child').value === 'true'
                  })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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

export default Absences; 