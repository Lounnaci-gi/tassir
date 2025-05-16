import './menubar.css';

export default function Menubar({ onEtudiantClick, onMenuClick }) {
    const handleMenuItemClick = (page) => {
        if (page === 'etudiant') {
            onEtudiantClick();
        }
        onMenuClick(page);
    };

    return (
        <div>
            <ul className="menu">
                <li className="liste-menu" onClick={() => handleMenuItemClick('dashboard')}>
                    <i className='bx bxs-dashboard'></i>
                    الرئيسية
                </li>
                <li className="liste-menu" onClick={() => handleMenuItemClick('etudiant')}>
                    <i className='bx bxs-user-detail'></i>
                    الطلاب
                </li>
                <li className="liste-menu" onClick={() => handleMenuItemClick('pavillons')}>
                    <i className='bx bxs-building'></i>
                    الأجنحة والقاعات
                </li>
                <li className="liste-menu" onClick={() => handleMenuItemClick('absences')}>
                    <i className='bx bxs-time-five'></i>
                    الغيابات
                </li>
                <li className="liste-menu" onClick={() => handleMenuItemClick('sanctions')}>
                    <i className='bx bxs-error'></i>
                    العقوبات
                </li>
                <li className="liste-menu" onClick={() => handleMenuItemClick('convocations')}>
                    <i className='bx bxs-envelope'></i>
                    الاستدعاءات
                </li>
                <li className="liste-menu" onClick={() => handleMenuItemClick('schedule')}>
                    <i className='bx bxs-calendar'></i>
                    جدول الحصص
                </li>
                <li className="liste-menu" onClick={() => handleMenuItemClick('reports')}>
                    <i className='bx bxs-report'></i>
                    التقارير
                </li>
                <li className="liste-menu" onClick={() => handleMenuItemClick('profile')}>
                    <i className='bx bxs-user-circle'></i>
                    الملف الشخصي
                </li>
                <div className="logout">
                    <i className='bx bxs-log-in'></i>
                    <li className="liste-menu">تسجيل الخروج</li>
                </div>
            </ul>
        </div>
    );
}
