import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Pavillons from './pages/Pavillons';
import Classes from './pages/Classes';
import Absences from './pages/Absences';
import Warnings from './pages/Warnings';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/pavillons" element={<Pavillons />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/absences" element={<Absences />} />
              <Route path="/warnings" element={<Warnings />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
