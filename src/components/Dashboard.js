import React from 'react';
import './Dashboard.css';

function Dashboard({ statistics, specialCases }) {
  const pavillonsStats = {
    totalPavillons: 3,
    totalClasses: 12,
    occupationRate: 85
  };

  const handleResourceClick = (resourceType) => {
    // Logique à implémenter pour chaque type de ressource
    console.log(`Accès à la ressource: ${resourceType}`);
  };

  return (
    <div className="dashboard-container" dir="rtl">
      <h2>لوحة المتابعة</h2>
      
      <div className="statistics-section">
        <h3>إحصائيات عامة</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>العدد الإجمالي للطلاب</h4>
            <p>{statistics.totalStudents || 0}</p>
          </div>
          <div className="stat-card">
            <h4>حالات خاصة</h4>
            <p>{statistics.specialCases || 0}</p>
          </div>
          <div className="stat-card">
            <h4>حالات عاجلة</h4>
            <p>{statistics.urgentCases || 0}</p>
          </div>
        </div>
      </div>

      <div className="statistics-section">
        <h3>إحصائيات الأجنحة والقاعات</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>عدد الأجنحة</h4>
            <p>{pavillonsStats.totalPavillons}</p>
          </div>
          <div className="stat-card">
            <h4>عدد القاعات</h4>
            <p>{pavillonsStats.totalClasses}</p>
          </div>
          <div className="stat-card">
            <h4>نسبة الإشغال</h4>
            <p>{pavillonsStats.occupationRate}%</p>
          </div>
        </div>
      </div>

      <div className="special-cases-section">
        <h3>متابعة الحالات الخاصة</h3>
        <div className="cases-grid">
          {specialCases?.map((caseItem) => (
            <div key={caseItem.id} className={`case-card ${caseItem.status}`}>
              <h4>{caseItem.studentName}</h4>
              <p className="case-type">{caseItem.type}</p>
              <p className="case-status">{caseItem.statusText}</p>
              
              <div className="tutor-info">
                <h5>معلومات الوصي</h5>
                <p><strong>الإسم:</strong> {caseItem.tuteur.nom}</p>
                <p><strong>صلة القرابة:</strong> {caseItem.tuteur.relation}</p>
                <p><strong>الهاتف:</strong> {caseItem.tuteur.telephone}</p>
                <p><strong>البريد الإلكتروني:</strong> {caseItem.tuteur.email}</p>
              </div>

              <div className="case-actions">
                <button 
                  className="action-button"
                  onClick={() => handleResourceClick(`update-${caseItem.id}`)}
                  aria-label={`تحديث حالة ${caseItem.studentName}`}
                >
                  تحديث الحالة
                </button>
                <button 
                  className="action-button"
                  onClick={() => handleResourceClick(`view-${caseItem.id}`)}
                  aria-label={`عرض تفاصيل ${caseItem.studentName}`}
                >
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-activities">
        <h3>النشاطات الأخيرة</h3>
        <div className="activity-list" role="log" aria-label="النشاطات الأخيرة">
          {/* Liste des activités récentes */}
        </div>
      </div>

      <div className="support-resources">
        <h3>موارد الدعم</h3>
        <div className="resources-grid">
          <button 
            onClick={() => handleResourceClick('guide')}
            className="resource-button"
            aria-label="فتح دليل المساعدة"
          >
            <h4>دليل المساعدة</h4>
          </button>
          <button 
            onClick={() => handleResourceClick('contact')}
            className="resource-button"
            aria-label="الاتصال بالمختصين"
          >
            <h4>اتصال بالمختصين</h4>
          </button>
          <button 
            onClick={() => handleResourceClick('services')}
            className="resource-button"
            aria-label="عرض خدمات الدعم"
          >
            <h4>خدمات الدعم</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 