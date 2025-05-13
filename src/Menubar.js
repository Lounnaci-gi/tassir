import './menubar.css';

export default function Menubar() {
    return (
        <div>
            <ul className="menu">
                <li className="liste-menu">الرئيسية</li>
                <li className="liste-menu">الطلاب</li>
                <li className="liste-menu">الغيابات</li>
                <li className="liste-menu">العقوبات</li>
                <li className="liste-menu">الاستدعاءات</li>
                <li className="liste-menu">جدول الحصص</li>
                <li className="liste-menu">التقارير</li>
                <li className="liste-menu">الملف الشخصي</li>
                <li className="liste-menu logout">تسجيل الخروج</li>
            </ul>        
        </div>
    )
}
