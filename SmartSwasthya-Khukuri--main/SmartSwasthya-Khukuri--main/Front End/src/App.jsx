// Frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import About from './pages/About';
import Contact from './pages/Contact';
import AuthPage from './pages/AuthPage';
import GeneralCheckups from './pages/GeneralCheckups';
import PreventiveCare from './pages/PreventiveCare';
import TelehealthConsultations from './pages/TelehealthConsultations';
import EmergencyCare from './pages/EmergencyCare';
import MedicalReports from './pages/MedicalReports';          // New import
import InsuranceDetails from './pages/Insurancedetails';      // New import
import PatientQR from './pages/PatientQR';                    // New import
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Service Routes */}
              <Route path="/services/general-checkups" element={<GeneralCheckups />} />
              <Route path="/services/preventive-care" element={<PreventiveCare />} />
              <Route path="/services/telehealth-consultations" element={<TelehealthConsultations />} />
              <Route path="/services/emergency-care" element={<EmergencyCare />} />
              
              {/* Patient Portal Routes */}
              <Route path="/medical-reports" element={<MedicalReports />} />
              <Route path="/insurance-details" element={<InsuranceDetails />} />
              <Route path="/patient-qr" element={<PatientQR />} />
              
              {/* Add more routes here as your application grows */}
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;