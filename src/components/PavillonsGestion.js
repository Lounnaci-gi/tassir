import React, { useState } from 'react';
import './PavillonsGestion.css';

function PavillonsGestion() {
  const [pavillons, setPavillons] = useState([
    {
      id: 'pavillon-a',
      nom: 'الجناح أ',
      classes: ['قاعة 1-أ', 'قاعة 2-أ', 'قاعة 3-أ', 'قاعة 4-أ'],
      laboratoires: ['مختبر الفيزياء 1-أ', 'مختبر الكيمياء 1-أ']
    },
    {
      id: 'pavillon-b',
      nom: 'الجناح ب',
      classes: ['قاعة 1-ب', 'قاعة 2-ب', 'قاعة 3-ب', 'قاعة 4-ب'],
      laboratoires: ['مختبر الحاسوب 1-ب', 'مختبر العلوم 1-ب']
    },
    {
      id: 'pavillon-c',
      nom: 'الجناح ج',
      classes: ['قاعة 1-ج', 'قاعة 2-ج', 'قاعة 3-ج', 'قاعة 4-ج'],
      laboratoires: ['مختبر اللغات 1-ج', 'مختبر الوسائط 1-ج']
    }
  ]);

  const [nouveauPavillon, setNouveauPavillon] = useState({
    nom: '',
    nombreClasses: 1,
    nombreLaboratoires: 0
  });

  const [selectedPavillon, setSelectedPavillon] = useState(null);
  const [nouvelleClasse, setNouvelleClasse] = useState('');
  const [nouveauLaboratoire, setNouveauLaboratoire] = useState('');

  const handleAjoutPavillon = (e) => {
    e.preventDefault();
    const classes = Array.from({ length: nouveauPavillon.nombreClasses }, (_, i) => 
      `قاعة ${i + 1}-${nouveauPavillon.nom.slice(-1)}`
    );

    const laboratoires = Array.from({ length: nouveauPavillon.nombreLaboratoires }, (_, i) => 
      `مختبر ${i + 1}-${nouveauPavillon.nom.slice(-1)}`
    );

    const newPavillon = {
      id: `pavillon-${nouveauPavillon.nom.slice(-1).toLowerCase()}`,
      nom: nouveauPavillon.nom,
      classes: classes,
      laboratoires: laboratoires
    };

    setPavillons([...pavillons, newPavillon]);
    setNouveauPavillon({ nom: '', nombreClasses: 1, nombreLaboratoires: 0 });
  };

  const handleAjoutClasse = (pavillonId) => {
    if (!nouvelleClasse) return;

    setPavillons(pavillons.map(pavillon => {
      if (pavillon.id === pavillonId) {
        return {
          ...pavillon,
          classes: [...pavillon.classes, nouvelleClasse]
        };
      }
      return pavillon;
    }));

    setNouvelleClasse('');
  };

  const handleAjoutLaboratoire = (pavillonId) => {
    if (!nouveauLaboratoire) return;

    setPavillons(pavillons.map(pavillon => {
      if (pavillon.id === pavillonId) {
        return {
          ...pavillon,
          laboratoires: [...pavillon.laboratoires, nouveauLaboratoire]
        };
      }
      return pavillon;
    }));

    setNouveauLaboratoire('');
  };

  const handleSupprimerPavillon = (pavillonId) => {
    setPavillons(pavillons.filter(p => p.id !== pavillonId));
  };

  const handleSupprimerClasse = (pavillonId, classe) => {
    setPavillons(pavillons.map(pavillon => {
      if (pavillon.id === pavillonId) {
        return {
          ...pavillon,
          classes: pavillon.classes.filter(c => c !== classe)
        };
      }
      return pavillon;
    }));
  };

  const handleSupprimerLaboratoire = (pavillonId, laboratoire) => {
    setPavillons(pavillons.map(pavillon => {
      if (pavillon.id === pavillonId) {
        return {
          ...pavillon,
          laboratoires: pavillon.laboratoires.filter(lab => lab !== laboratoire)
        };
      }
      return pavillon;
    }));
  };

  return (
    <div className="pavillons-gestion" dir="rtl">
      <h2>إدارة الأجنحة والقاعات والمختبرات</h2>

      <div className="section-ajout-pavillon">
        <h3>إضافة جناح جديد</h3>
        <form onSubmit={handleAjoutPavillon} className="form-ajout-pavillon">
          <div className="form-group">
            <label htmlFor="nomPavillon">اسم الجناح</label>
            <input
              type="text"
              id="nomPavillon"
              value={nouveauPavillon.nom}
              onChange={(e) => setNouveauPavillon({...nouveauPavillon, nom: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombreClasses">عدد القاعات</label>
            <input
              type="number"
              id="nombreClasses"
              min="1"
              max="10"
              value={nouveauPavillon.nombreClasses}
              onChange={(e) => setNouveauPavillon({...nouveauPavillon, nombreClasses: parseInt(e.target.value)})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombreLaboratoires">عدد المختبرات</label>
            <input
              type="number"
              id="nombreLaboratoires"
              min="0"
              max="5"
              value={nouveauPavillon.nombreLaboratoires}
              onChange={(e) => setNouveauPavillon({...nouveauPavillon, nombreLaboratoires: parseInt(e.target.value)})}
            />
          </div>
          <button type="submit" className="btn-ajouter">إضافة جناح</button>
        </form>
      </div>

      <div className="liste-pavillons">
        <h3>الأجنحة والقاعات والمختبرات الحالية</h3>
        {pavillons.map(pavillon => (
          <div key={pavillon.id} className="pavillon-card">
            <div className="pavillon-header">
              <h4>{pavillon.nom}</h4>
              <button 
                onClick={() => handleSupprimerPavillon(pavillon.id)}
                className="btn-supprimer"
              >
                حذف الجناح
              </button>
            </div>
            
            <div className="section-salles">
              <h5>القاعات</h5>
              <div className="classes-list">
                {pavillon.classes.map((classe, index) => (
                  <div key={index} className="classe-item">
                    <span>{classe}</span>
                    <button 
                      onClick={() => handleSupprimerClasse(pavillon.id, classe)}
                      className="btn-supprimer-classe"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="ajouter-classe">
                <input
                  type="text"
                  placeholder="اسم القاعة الجديدة"
                  value={pavillon.id === selectedPavillon ? nouvelleClasse : ''}
                  onChange={(e) => {
                    setSelectedPavillon(pavillon.id);
                    setNouvelleClasse(e.target.value);
                  }}
                />
                <button 
                  onClick={() => handleAjoutClasse(pavillon.id)}
                  className="btn-ajouter-classe"
                >
                  إضافة قاعة
                </button>
              </div>
            </div>

            <div className="section-laboratoires">
              <h5>المختبرات</h5>
              <div className="laboratoires-list">
                {pavillon.laboratoires.map((laboratoire, index) => (
                  <div key={index} className="laboratoire-item">
                    <span>{laboratoire}</span>
                    <button 
                      onClick={() => handleSupprimerLaboratoire(pavillon.id, laboratoire)}
                      className="btn-supprimer-laboratoire"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="ajouter-laboratoire">
                <input
                  type="text"
                  placeholder="اسم المختبر الجديد"
                  value={pavillon.id === selectedPavillon ? nouveauLaboratoire : ''}
                  onChange={(e) => {
                    setSelectedPavillon(pavillon.id);
                    setNouveauLaboratoire(e.target.value);
                  }}
                />
                <button 
                  onClick={() => handleAjoutLaboratoire(pavillon.id)}
                  className="btn-ajouter-laboratoire"
                >
                  إضافة مختبر
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PavillonsGestion; 