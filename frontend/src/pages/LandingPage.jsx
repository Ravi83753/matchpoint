import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto w-full">
        <div className="text-2xl font-black text-green-700 tracking-tighter">
          MATCHPOINT
        </div>
        <div className="space-x-4">
          <Link to="/book" className="bg-green-600 text-white px-5 py-2 rounded-full font-bold hover:bg-green-700 transition">
            Book Court
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-10 mb-20">
        <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold mb-6">
          🚀 New: Weekend Surge Pricing is Live!
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Play Like a <span className="text-green-600">Pro.</span><br />
          Book in Seconds.
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mb-10">
          The premium badminton facility management system. Reserve courts, hire professional coaches, and rent gear—all in one seamless flow.
        </p>
        
        {/* Only "Book Now" remains */}
        <div className="flex gap-4">
          <Link to="/book" className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition transform hover:scale-105">
            Book Now <ArrowRight size={20} />
          </Link>
        </div>
      </header>

      {/* 3. Features Grid */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Trophy className="text-yellow-500" size={32} />}
            title="Pro-Grade Courts"
            desc="BWF-approved synthetic mats optimized for knee safety and grip."
          />
          <FeatureCard 
            icon={<Clock className="text-blue-500" size={32} />}
            title="Instant Availability"
            desc="Real-time syncing prevents double bookings. What you see is what you get."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-green-500" size={32} />}
            title="Dynamic Pricing"
            desc="Smart rates that adjust based on demand, weekends, and peak hours."
          />
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-gray-50 py-10 text-center text-gray-400 text-sm">
        © 2025 MatchPoint Inc. Built for Acorn Globus Assignment.
      </footer>
    </div>
  );
};

// Helper Component for the grid
const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100">
    <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;