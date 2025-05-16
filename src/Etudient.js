import React, { useState } from 'react';
import './Etudient.css'; // Vous devrez créer ce fichier CSS pour le style

function Etudient() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    lieuNaissance: '',
    sexe: '',
    groupeSanguin: '',
    telephone: '',
    adresse: '',
    filiere: '',
    niveau: '',
    photo: null,
    situationParticuliere: false,
    typeSituation: [],
    detailsSituation: '',
    besoinsSpecifiques: '',
    contactUrgence: {
      nom: '',
      relation: '',
      telephone: '',
      email: ''
    },
    documentsMedicaux: [],
    autresDocuments: [],
    pavillon: '',
    classe: ''
  });

  const [previewUrls, setPreviewUrls] = useState({
    photo: null,
    documents: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (type === 'file') {
      if (name === 'photo') {
        const file = files[0];
        setFormData({
          ...formData,
          photo: file
        });
        // Créer une URL de prévisualisation
        const photoUrl = URL.createObjectURL(file);
        setPreviewUrls(prev => ({
          ...prev,
          photo: photoUrl
        }));
      } else if (name === 'documentsMedicaux') {
        const newDocuments = Array.from(files);
        setFormData({
          ...formData,
          documentsMedicaux: [...formData.documentsMedicaux, ...newDocuments]
        });
        // Créer des URLs de prévisualisation pour les documents
        const documentUrls = newDocuments.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => ({
          ...prev,
          documents: [...prev.documents, ...documentUrls]
        }));
      }
    } else if (name.startsWith('contactUrgence.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        contactUrgence: {
          ...formData.contactUrgence,
          [field]: value
        }
      });
    } else if (name === 'typeSituation') {
      const updatedSituations = formData.typeSituation.includes(value)
        ? formData.typeSituation.filter(situation => situation !== value)
        : [...formData.typeSituation, value];
      
      setFormData({
        ...formData,
        typeSituation: updatedSituations
      });
    } else if (name === 'pavillon') {
      setFormData({
        ...formData,
        pavillon: value
      });
    } else if (name === 'classe') {
      setFormData({
        ...formData,
        classe: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Créer un objet FormData pour l'envoi des fichiers
      const formDataToSend = new FormData();
      
      // Ajouter les données de base
      Object.keys(formData).forEach(key => {
        if (key !== 'photo' && key !== 'documentsMedicaux' && key !== 'autresDocuments') {
          if (typeof formData[key] === 'object') {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });
      
      // Ajouter la photo
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      }
      
      // Ajouter les documents médicaux
      formData.documentsMedicaux.forEach((doc, index) => {
        formDataToSend.append(`documentMedical_${index}`, doc);
      });
      
      // Ajouter les autres documents
      formData.autresDocuments.forEach((doc, index) => {
        formDataToSend.append(`autreDocument_${index}`, doc);
      });
      
      // Envoyer les données au serveur (à implémenter)
      // const response = await fetch('/api/etudiants', {
      //   method: 'POST',
      //   body: formDataToSend
      // });
      
      console.log('Données du formulaire soumises:', formDataToSend);
      // Réinitialiser le formulaire après succès
      // setFormData(initialFormState);
      // setPreviewUrls({ photo: null, documents: [] });
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      // Gérer l'erreur (afficher un message à l'utilisateur, etc.)
    }
  };

  const removeDocument = (index, type) => {
    if (type === 'medical') {
      const newDocs = formData.documentsMedicaux.filter((_, i) => i !== index);
      const newUrls = previewUrls.documents.filter((_, i) => i !== index);
      
      setFormData({
        ...formData,
        documentsMedicaux: newDocs
      });
      setPreviewUrls(prev => ({
        ...prev,
        documents: newUrls
      }));
    }
  };

  return (
    <div className="etudiant-container" dir="rtl">
      <h2>استمارة تسجيل الطالب</h2>
      <form onSubmit={handleSubmit} className="etudiant-form">
        <div className="form-section">
          <h3>المعلومات الأساسية</h3>
          <div className="form-group">
            <label htmlFor="nom">اللقب</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prenom">الاسم</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sexe">الجنس</label>
            <select
              id="sexe"
              name="sexe"
              value={formData.sexe}
              onChange={handleChange}
              required
            >
              <option value="">اختر الجنس</option>
              <option value="M">ذكر</option>
              <option value="F">أنثى</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telephone">رقم الهاتف</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateNaissance">تاريخ الميلاد</label>
            <input
              type="date"
              id="dateNaissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lieuNaissance">مكان الميلاد</label>
            <input
              type="text"
              id="lieuNaissance"
              name="lieuNaissance"
              value={formData.lieuNaissance}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="groupeSanguin">فصيلة الدم</label>
            <select
              id="groupeSanguin"
              name="groupeSanguin"
              value={formData.groupeSanguin}
              onChange={handleChange}
              required
            >
              <option value="">اختر فصيلة الدم</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="adresse">العنوان</label>
            <textarea
              id="adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>معلومات القاعة</h3>
          <div className="form-group">
            <label htmlFor="pavillon">الجناح</label>
            <select
              id="pavillon"
              name="pavillon"
              value={formData.pavillon}
              onChange={handleChange}
              required
            >
              <option value="">اختر الجناح</option>
              <option value="pavillon-a">الجناح أ</option>
              <option value="pavillon-b">الجناح ب</option>
              <option value="pavillon-c">الجناح ج</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="classe">القاعة</label>
            <select
              id="classe"
              name="classe"
              value={formData.classe}
              onChange={handleChange}
              required
              disabled={!formData.pavillon}
            >
              <option value="">اختر القاعة</option>
              {formData.pavillon === 'pavillon-a' && (
                <>
                  <option value="classe-a1">قاعة 1-أ</option>
                  <option value="classe-a2">قاعة 2-أ</option>
                  <option value="classe-a3">قاعة 3-أ</option>
                  <option value="classe-a4">قاعة 4-أ</option>
                </>
              )}
              {formData.pavillon === 'pavillon-b' && (
                <>
                  <option value="classe-b1">قاعة 1-ب</option>
                  <option value="classe-b2">قاعة 2-ب</option>
                  <option value="classe-b3">قاعة 3-ب</option>
                  <option value="classe-b4">قاعة 4-ب</option>
                </>
              )}
              {formData.pavillon === 'pavillon-c' && (
                <>
                  <option value="classe-c1">قاعة 1-ج</option>
                  <option value="classe-c2">قاعة 2-ج</option>
                  <option value="classe-c3">قاعة 3-ج</option>
                  <option value="classe-c4">قاعة 4-ج</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>المعلومات الأكاديمية</h3>
          <div className="form-group">
            <label htmlFor="filiere">التخصص</label>
            <select
              id="filiere"
              name="filiere"
              value={formData.filiere}
              onChange={handleChange}
              required
            >
              <option value="">اختر التخصص</option>
              <option value="informatique">علوم الحاسوب</option>
              <option value="gestion">إدارة الأعمال</option>
              <option value="droit">القانون</option>
              <option value="medecine">الطب</option>
              <option value="lettres">الآداب</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="niveau">المستوى الدراسي</label>
            <select
              id="niveau"
              name="niveau"
              value={formData.niveau}
              onChange={handleChange}
              required
            >
              <option value="">اختر المستوى</option>
              <option value="licence1">السنة الأولى إجازة</option>
              <option value="licence2">السنة الثانية إجازة</option>
              <option value="licence3">السنة الثالثة إجازة</option>
              <option value="master1">السنة الأولى ماجستير</option>
              <option value="master2">السنة الثانية ماجستير</option>
              <option value="doctorat">دكتوراه</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>الصورة الشخصية</h3>
          <div className="form-group">
            <label htmlFor="photo">تحميل صورة شخصية</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
            {previewUrls.photo && (
              <div className="photo-preview">
                <img src={previewUrls.photo} alt="صورة شخصية" />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>الوضع الخاص</h3>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="situationParticuliere"
                checked={formData.situationParticuliere}
                onChange={handleChange}
              />
              لدي وضع خاص يتطلب عناية خاصة
            </label>
          </div>

          {formData.situationParticuliere && (
            <>
              <div className="form-group situations-group">
                <label>نوع الوضع الخاص</label>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="typeSituation"
                      value="handicapPhysique"
                      checked={formData.typeSituation.includes('handicapPhysique')}
                      onChange={handleChange}
                    />
                    إعاقة جسدية
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="typeSituation"
                      value="handicapVisuel"
                      checked={formData.typeSituation.includes('handicapVisuel')}
                      onChange={handleChange}
                    />
                    إعاقة بصرية
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="typeSituation"
                      value="handicapAuditif"
                      checked={formData.typeSituation.includes('handicapAuditif')}
                      onChange={handleChange}
                    />
                    إعاقة سمعية
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="typeSituation"
                      value="maladieChronique"
                      checked={formData.typeSituation.includes('maladieChronique')}
                      onChange={handleChange}
                    />
                    مرض مزمن
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="typeSituation"
                      value="autre"
                      checked={formData.typeSituation.includes('autre')}
                      onChange={handleChange}
                    />
                    أخرى
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="detailsSituation">تفاصيل الوضع الخاص</label>
                <textarea
                  id="detailsSituation"
                  name="detailsSituation"
                  value={formData.detailsSituation}
                  onChange={handleChange}
                  placeholder="يرجى وصف وضعك الخاص بالتفصيل"
                />
              </div>

              <div className="form-group">
                <label htmlFor="besoinsSpecifiques">الاحتياجات الخاصة</label>
                <textarea
                  id="besoinsSpecifiques"
                  name="besoinsSpecifiques"
                  value={formData.besoinsSpecifiques}
                  onChange={handleChange}
                  placeholder="ما هي احتياجاتك الخاصة للدراسة؟"
                />
              </div>

              <div className="form-group">
                <label htmlFor="documentsMedicaux">الوثائق الطبية</label>
                <input
                  type="file"
                  id="documentsMedicaux"
                  name="documentsMedicaux"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                />
                <div className="documents-preview">
                  {formData.documentsMedicaux.map((doc, index) => (
                    <div key={index} className="document-item">
                      <span>{doc.name}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index, 'medical')}
                        className="remove-document"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="form-section">
          <h3>معلومات الاتصال في حالة الطوارئ</h3>
          <div className="form-group">
            <label htmlFor="contactUrgence.nom">الاسم الكامل</label>
            <input
              type="text"
              id="contactUrgence.nom"
              name="contactUrgence.nom"
              value={formData.contactUrgence.nom}
              onChange={handleChange}
              required={formData.situationParticuliere}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactUrgence.relation">صلة القرابة</label>
            <input
              type="text"
              id="contactUrgence.relation"
              name="contactUrgence.relation"
              value={formData.contactUrgence.relation}
              onChange={handleChange}
              required={formData.situationParticuliere}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactUrgence.telephone">رقم الهاتف</label>
            <input
              type="tel"
              id="contactUrgence.telephone"
              name="contactUrgence.telephone"
              value={formData.contactUrgence.telephone}
              onChange={handleChange}
              required={formData.situationParticuliere}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactUrgence.email">البريد الإلكتروني</label>
            <input
              type="email"
              id="contactUrgence.email"
              name="contactUrgence.email"
              value={formData.contactUrgence.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            تسجيل
          </button>
          <button type="reset" className="reset-button">
            إعادة تعيين
          </button>
        </div>
      </form>
    </div>
  );
}

export default Etudient;

