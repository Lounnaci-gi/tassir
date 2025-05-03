export default function Menubar() {
    let style = {
        fontSize: "1.2em",
        display: "bloc",
        justifyContent: "space-between",
        listStyle: "none"
    }
    let styleli = {
        marginBottom: "20px",
        marginRight: "20px",
    }
    return (
        <div>
            <ul style={style}>
                <li style={styleli}>لوحة التحكم</li>
                <li style={styleli}>الطلاب</li>
                <li style={styleli}>الغيابات</li>
                <li style={styleli}>العقوبات</li>
                <li style={styleli}>الاستدعاءات</li>
                <li style={styleli}>جدول الحصص</li>
                <li style={styleli}>التقارير</li>
                <li style={styleli}>الملف الشخصي</li>
                <li style={{ marginBottom: "20px",marginRight: "20px", marginTop: "150px",color:"red" }}>تسجيل الخروج</li>
            </ul>
            
        </div>
    )
}
