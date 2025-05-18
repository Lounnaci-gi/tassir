import React from 'react';
import { School as SchoolIcon, Phone as PhoneIcon, Email as EmailIcon, LocationOn as LocationIcon } from '@mui/icons-material';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo et nom du lycée */}
          <div className="flex items-center space-x-2">
            <SchoolIcon className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">ثانوية الاخوة مسعودي البرواقية</h2>
          </div>

          {/* Informations de contact */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">025 45 67 89</span>
            </div>
            <div className="flex items-center space-x-2">
              <EmailIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">contact@lycee-messaoudi.edu.dz</span>
            </div>
            <div className="flex items-center space-x-2">
              <LocationIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">البرواقية، المدية</span>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="flex items-center space-x-4">
            <a href="https://www.lycee-messaoudi.edu.dz" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600">
              الموقع الرسمي
            </a>
            <a href="https://elearning.lycee-messaoudi.edu.dz" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600">
              المنصة التعليمية
            </a>
            <a href="https://results.lycee-messaoudi.edu.dz" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600">
              النتائج المدرسية
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} ثانوية الاخوة مسعودي البرواقية. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 