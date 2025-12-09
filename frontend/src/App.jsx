import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard'; // Import this

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} /> {/* New Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;