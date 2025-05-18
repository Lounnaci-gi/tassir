import React from 'react';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Warning as WarningIcon,
  EventNote as EventNoteIcon
} from '@mui/icons-material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Enregistrer les composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  // Données pour les graphiques
  const lineChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'الحضور',
        data: [95, 92, 88, 94, 90, 96],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const barChartData = {
    labels: ['علوم طبيعية', 'رياضيات', 'فيزياء', 'كيمياء'],
    datasets: [
      {
        label: 'عدد الطلاب',
        data: [120, 90, 80, 70],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ]
      }
    ]
  };

  const stats = [
    { title: 'إجمالي الطلاب', value: '360', icon: <GroupIcon className="h-6 w-6" /> },
    { title: 'الفصول الدراسية', value: '12', icon: <SchoolIcon className="h-6 w-6" /> },
    { title: 'الغيابات اليوم', value: '15', icon: <EventNoteIcon className="h-6 w-6" /> },
    { title: 'الإنذارات', value: '5', icon: <WarningIcon className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <DashboardIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-blue-600">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">معدل الحضور</h2>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">توزيع الطلاب حسب التخصص</h2>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 