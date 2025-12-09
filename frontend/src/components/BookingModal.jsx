import React, { useState } from 'react';
import { X, Clock, Calendar } from 'lucide-react';
import { createBooking } from '../services/api';

const BookingModal = ({ court, onClose, userId }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [addCoach, setAddCoach] = useState(false);
  const [addRackets, setAddRackets] = useState(false);
  
  // Quick status for feedback
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Checking availability...' });

    // 1. Format Dates for Backend (YYYY-MM-DDTHH:MM:00.000Z)
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    // 2. Prepare Payload
    const bookingData = {
      userId: userId, // We will pass this from the parent
      courtId: court._id,
      startTime: startDateTime,
      endTime: endDateTime,
      resources: []
    };

    // Add Resources if checked (Dummy IDs for now, or just empty to test logic)
    if (addRackets) bookingData.resources.push({ quantity: 2 }); // sending dummy structure

    try {
      await createBooking(bookingData);
      setStatus({ type: 'success', msg: '✅ Booking Confirmed!' });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        alert("Booking Successful!"); // Simple feedback
      }, 1500);

    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Booking Failed';
      setStatus({ type: 'error', msg: errorMsg });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-900 p-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">Book {court.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="date" 
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                  type="time" 
                  required
                  className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                  type="time" 
                  required
                  className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Resources (Optional) */}
          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <p className="text-xs font-bold text-gray-500 uppercase">Add-ons</p>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={addCoach} onChange={(e) => setAddCoach(e.target.checked)} />
              <span className="text-sm">Book a Coach (+₹200)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={addRackets} onChange={(e) => setAddRackets(e.target.checked)} />
              <span className="text-sm">Rent Rackets (+₹50)</span>
            </label>
          </div>

          {/* Status Message */}
          {status.msg && (
            <div className={`p-3 rounded text-sm text-center ${status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {status.msg}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={status.type === 'loading'}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            {status.type === 'loading' ? 'Processing...' : `Confirm Booking`}
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookingModal;