import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Données de test pour les graphiques
const absenceData = [
  { name: 'يناير', value: 12 },
  { name: 'فبراير', value: 8 },
  { name: 'مارس', value: 15 },
  { name: 'أبريل', value: 10 },
  { name: 'مايو', value: 7 },
];

const warningData = [
  { name: 'غياب متكرر', value: 30 },
  { name: 'سلوك', value: 20 },
  { name: 'تأخير', value: 15 },
  { name: 'عدم إنجاز الواجبات', value: 25 },
  { name: 'أخرى', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Reports() {
  const [selectedClass, setSelectedClass] = useState('all');

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900">التقارير والإحصائيات</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">الصف</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="input-field md:w-64"
        >
          <option value="all">جميع الصفوف</option>
          <option value="الصف الأول">الصف الأول</option>
          <option value="الصف الثاني">الصف الثاني</option>
          <option value="الصف الثالث">الصف الثالث</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الغيابات الشهرية</h2>
          <div className="w-full overflow-x-auto">
            <BarChart
              width={500}
              height={300}
              data={absenceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="عدد الغيابات" />
            </BarChart>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">توزيع الإنذارات حسب النوع</h2>
          <div className="w-full overflow-x-auto">
            <PieChart width={500} height={300}>
              <Pie
                data={warningData}
                cx={250}
                cy={150}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {warningData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className="md:col-span-2 card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">ملخص الإحصائيات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">إجمالي الطلاب</p>
              <p className="text-3xl font-bold text-gray-900">150</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">إجمالي الغيابات</p>
              <p className="text-3xl font-bold text-gray-900">52</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">إجمالي الإنذارات</p>
              <p className="text-3xl font-bold text-gray-900">100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports; 