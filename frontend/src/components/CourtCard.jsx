import React from 'react';
import { MapPin, Info } from 'lucide-react';

const CourtCard = ({ court, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      
      {/* IMAGE SECTION (Replaces the old green box) */}
      <div className="h-48 relative">
        <img 
          src={court.image} 
          alt={court.name} 
          className="w-full h-full object-cover"
        />
        {/* Badge on top of the image */}
        <div className="absolute top-3 left-3">
           <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${
            court.type === 'indoor' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
          }`}>
            {court.type}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
             <h3 className="text-xl font-bold text-gray-900 leading-tight">{court.name}</h3>
          </div>
          <span className="text-green-700 font-bold text-xl">
            ₹{court.basePrice}<span className="text-gray-400 text-sm font-normal">/hr</span>
          </span>
        </div>

        <div className="space-y-2 text-gray-500 text-sm mb-6">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Sports Complex, Block A</span>
          </div>
          <div className="flex items-center gap-2">
            <Info size={16} />
            <span>BWF Standard | Synthetic Mat</span>
          </div>
        </div>

        <button 
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
          onClick={onBook} 
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CourtCard;