import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Class as ClassIcon,
  Warning as WarningIcon,
  Assessment as AssessmentIcon,
  EventNote as EventNoteIcon
} from '@mui/icons-material';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: <DashboardIcon />, label: 'لوحة التحكم' },
    { path: '/students', icon: <PeopleIcon />, label: 'الطلاب' },
    { path: '/pavillons', icon: <BusinessIcon />, label: 'المباني' },
    { path: '/classes', icon: <ClassIcon />, label: 'الفصول والمختبرات' },
    { path: '/absences', icon: <EventNoteIcon />, label: 'الغيابات' },
    { path: '/warnings', icon: <WarningIcon />, label: 'الإنذارات' },
    { path: '/reports', icon: <AssessmentIcon />, label: 'التقارير' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900 text-center">نظام إدارة الثانوية</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 ${
              location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`}
          >
            <span className="ml-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar; 