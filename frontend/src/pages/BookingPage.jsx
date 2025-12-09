import React, { useEffect, useState } from 'react';
import { fetchCourts } from '../services/api';
import CourtCard from '../components/CourtCard';
import BookingModal from '../components/BookingModal';
import { Calendar, ArrowLeft } from 'lucide-react'; // Added ArrowLeft icon
import { Link } from 'react-router-dom'; // Import Link for navigation

const BookingPage = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for the Modal
  const [selectedCourt, setSelectedCourt] = useState(null);

  // ⚠️ TEMPORARY: Paste your User ID from the test script here!
  const TEST_USER_ID = "6938462396ad7f8d98211fb9"; 

  useEffect(() => {
    const loadCourts = async () => {
      try {
        const data = await fetchCourts();
        setCourts(data);
      } catch (error) {
        console.error("Failed to fetch courts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCourts();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading Courts...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        
        {/* Left Side: Back Button + Title */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="bg-white p-2 rounded-full border shadow-sm hover:bg-gray-100 transition-colors text-gray-600"
            title="Back to Home"
          >
            <ArrowLeft size={20} />
          </Link>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">MatchPoint</h1>
            <p className="text-gray-500">Book your slot in seconds</p>
          </div>
        </div>

        {/* Right Side: My Bookings Button */}
        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-medium hover:bg-gray-50 transition">
          <Calendar size={18} />
          <span>My Bookings</span>
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Available Courts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court) => (
            <CourtCard 
              key={court._id} 
              court={court} 
              onBook={() => setSelectedCourt(court)} 
            />
          ))}
        </div>
      </main>

      {/* MODAL */}
      {selectedCourt && (
        <BookingModal 
          court={selectedCourt} 
          userId={TEST_USER_ID}
          onClose={() => setSelectedCourt(null)} 
        />
      )}
    </div>
  );
};

export default BookingPage;