import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  Warning as WarningIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/' },
  { text: 'الطلاب', icon: <PeopleIcon />, path: '/students' },
  { text: 'الغيابات', icon: <EventNoteIcon />, path: '/absences' },
  { text: 'الإنذارات', icon: <WarningIcon />, path: '/warnings' },
  { text: 'التقارير', icon: <AssessmentIcon />, path: '/reports' },
];

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="h-full bg-white shadow-lg">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">نظام إدارة المدرسة</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="ml-3">{item.icon}</span>
            <span>{item.text}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-20 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </button>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-10 transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={handleDrawerToggle} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          {drawer}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {drawer}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <h1 className="text-xl font-semibold text-gray-800">نظام إدارة المدرسة</h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout; 