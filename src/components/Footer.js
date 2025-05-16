import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>مدرستي</h3>
          <p>نظام إدارة المدرسة الشامل</p>
        </div>
        <div className="footer-section">
          <h3>روابط سريعة</h3>
          <ul>
            <li>الرئيسية</li>
            <li>الدعم الفني</li>
            <li>سياسة الخصوصية</li>
            <li>اتصل بنا</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>تواصل معنا</h3>
          <div className="social-links">
            <i className='bx bxl-facebook'></i>
            <i className='bx bxl-twitter'></i>
            <i className='bx bxl-linkedin'></i>
            <i className='bx bxl-instagram'></i>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>جميع الحقوق محفوظة © {currentYear} مدرستي</p>
      </div>
    </footer>
  );
};

export default Footer; 