// Import the necessary modules and components
import React, { useState, Suspense } from 'react';
import './App.css';
import Menubar from './Menubar';
import Card from './Card';
import Dashboard from './components/Dashboard';
import PavillonsGestion from './components/PavillonsGestion';
import Footer from './components/Footer';

// Import the Menubar and Card components
// Import the CSS file for styling

function App() {
  // Import du composant Etudient
  const Etudient = React.lazy(() => import('./Etudient'));
  const [showEtudientForm, setShowEtudientForm] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Données de test pour le tableau de bord
  const dashboardData = {
    statistics: {
      totalStudents: 150,
      specialCases: 15,
      urgentCases: 5
    },
    specialCases: [
      {
        id: 1,
        studentName: "أحمد محمد",
        type: "حالة صحية",
        status: "urgent",
        statusText: "يحتاج متابعة عاجلة",
        tuteur: {
          nom: "محمد علي",
          relation: "الأب",
          telephone: "0600000001",
          email: "mohamed.ali@email.com"
        }
      },
      {
        id: 2,
        studentName: "سارة أحمد",
        type: "حالة اجتماعية",
        status: "stable",
        statusText: "تحت المتابعة",
        tuteur: {
          nom: "فاطمة أحمد",
          relation: "الأم",
          telephone: "0600000002",
          email: "fatima.ahmed@email.com"
        }
      },
      {
        id: 3,
        studentName: "محمد علي",
        type: "حالة تعليمية",
        status: "pending",
        statusText: "في انتظار التقييم",
        tuteur: {
          nom: "خالد علي",
          relation: "الأخ الأكبر",
          telephone: "0600000003",
          email: "khaled.ali@email.com"
        }
      }
    ]
  };

  // Fonction pour afficher/masquer le formulaire étudiant
  const toggleEtudientForm = () => {
    setShowEtudientForm(!showEtudientForm);
    setCurrentPage('etudiant');
  };

  const handleMenuClick = (page) => {
    setCurrentPage(page);
    if (page !== 'etudiant') {
      setShowEtudientForm(false);
    }
  };

  const cardData = {
    title: "الطلاب",
    description: " هنا تكتب خصائص الطالب التي تود أن تظهر في البطاقة",
    imageUrl: "https://img.icons8.com/?size=100&id=XKedzxVhRNPR&format=png&color=000000"
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard statistics={dashboardData.statistics} specialCases={dashboardData.specialCases} />;
      case 'etudiant':
        return showEtudientForm ? (
          <Etudient />
        ) : (
          <Card 
            title={cardData.title} 
            description={cardData.description} 
            imageUrl={cardData.imageUrl}
            onClick={toggleEtudientForm}
          />
        );
      case 'pavillons':
        return <PavillonsGestion />;
      default:
        return <Dashboard statistics={dashboardData.statistics} specialCases={dashboardData.specialCases} />;
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <Menubar onEtudiantClick={toggleEtudientForm} onMenuClick={handleMenuClick} />
        <main className="main-content">
          <Suspense fallback={<div>Chargement...</div>}>
            {renderContent()}
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
