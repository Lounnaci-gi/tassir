// Import the necessary modules and components
import './App.css';
import Menubar from './Menubar';
import Card from './Card';
// Import the Menubar and Card components
// Import the CSS file for styling

function App() {
  const cardData = {
    title: "الطلاب",
    description: " هنا تكتب خصائص الطالب التي تود أن تظهر في البطاقة",
    imageUrl: "https://img.icons8.com/?size=100&id=XKedzxVhRNPR&format=png&color=000000"
  };

  return (
    <>
      <div className="App" style={{ backgroundColor: '#f0f0f0', padding: '20px', display: 'flex' }}>
        <Menubar />

        <Card title={cardData.title} description={cardData.description} imageUrl={cardData.imageUrl} />

      </div>
    </>

  );
}

export default App;
