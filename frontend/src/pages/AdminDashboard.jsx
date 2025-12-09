import React, { useEffect, useState } from 'react';
import { fetchAdminCourts, updateCourtPrice, fetchCoaches, toggleCoach, createRule } from '../services/api';
import { Settings, Users, DollarSign, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [courts, setCourts] = useState([]);
  const [coaches, setCoaches] = useState([]);
  
  // Form State for new Rule
  const [ruleName, setRuleName] = useState('');
  const [ruleValue, setRuleValue] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setCourts(await fetchAdminCourts());
    setCoaches(await fetchCoaches());
  };

  const handlePriceChange = async (id, newPrice) => {
    await updateCourtPrice(id, newPrice);
    loadData(); // Refresh data
  };

  const handleCoachToggle = async (id, currentStatus) => {
    await toggleCoach(id, !currentStatus);
    loadData();
  };

  const handleAddRule = async (e) => {
    e.preventDefault();
    await createRule({
      name: ruleName,
      type: 'multiplier', // hardcoded for simplicity
      value: Number(ruleValue),
      conditions: { days: [0, 6] } // hardcoded for "Weekend"
    });
    alert('Weekend Rule Added!');
    setRuleName('');
    setRuleValue('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <Settings /> Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* SECTION 1: MANAGE COURTS */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="text-green-600" /> Court Pricing
          </h2>
          <div className="space-y-4">
            {courts.map(court => (
              <div key={court._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-bold">{court.name}</p>
                  <span className="text-xs text-gray-500 uppercase">{court.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">₹</span>
                  <input 
                    type="number" 
                    className="border rounded w-20 p-1"
                    defaultValue={court.basePrice}
                    onBlur={(e) => handlePriceChange(court._id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: MANAGE STAFF */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="text-blue-600" /> Coach Availability
          </h2>
          <div className="space-y-4">
            {coaches.map(coach => (
              <div key={coach._id} className="flex justify-between items-center border-b pb-2">
                <p className="font-medium">{coach.name}</p>
                <button 
                  onClick={() => handleCoachToggle(coach._id, coach.isAvailable)}
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    coach.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {coach.isAvailable ? 'Available' : 'Unavailable'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: ADD RULES */}
        <div className="bg-white p-6 rounded-xl shadow-sm md:col-span-2">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus className="text-purple-600" /> Add Pricing Rule
          </h2>
          <form onSubmit={handleAddRule} className="flex gap-4 items-end bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="block text-sm font-bold text-gray-700">Rule Name</label>
              <input 
                className="border p-2 rounded w-64" 
                placeholder="e.g. Holiday Surge"
                value={ruleName}
                onChange={e => setRuleName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Multiplier (e.g. 1.5)</label>
              <input 
                className="border p-2 rounded w-32" 
                type="number" 
                step="0.1"
                value={ruleValue}
                onChange={e => setRuleValue(e.target.value)}
              />
            </div>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700">
              Add Rule
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;