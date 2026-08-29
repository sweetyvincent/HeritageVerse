import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Heart, Users, Car, Check, ChevronRight, ChevronLeft, Map as MapIcon, Share2, Bookmark } from 'lucide-react';
import { heritageSites } from '../data/heritageSites';

const TripPlannerPage = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);

  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  
  const interestOptions = ['History', 'Architecture', 'Art', 'Religion', 'Photography', 'Food', 'Culture', 'Family'];

  const toggleInterest = (i: string) => {
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setStep(5);
    setTimeout(() => {
      setIsGenerating(false);
      setItinerary({
        title: `Heritage Journey in ${location || 'India'}`,
        totalTime: '6 Hours',
        sites: [
          { ...heritageSites[0], timeSpend: '2 hrs', travelToNext: '30 mins' },
          { ...heritageSites[1], timeSpend: '1.5 hrs', travelToNext: 'None' }
        ]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 bg-heritage-dark pb-24">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold mb-4">AI Trip <span className="text-gold">Planner</span></h1>
          <p className="text-gray-400">Let our Heritage AI curate the perfect historical journey for you.</p>
        </div>

        {/* Step Indicator */}
        {step < 5 && (
          <div className="flex justify-between items-center mb-12 relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-800 -z-10 -translate-y-1/2"></div>
            <div className="absolute left-0 top-1/2 h-1 bg-gold transition-all duration-500 -z-10 -translate-y-1/2" style={{ width: `${((step-1)/3)*100}%` }}></div>
            {[1, 2, 3, 4].map(num => (
              <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-gold text-heritage-dark' : 'bg-heritage-card border-2 border-gray-700 text-gray-500'}`}>
                {step > num ? <Check className="w-5 h-5" /> : num}
              </div>
            ))}
          </div>
        )}

        {/* Form Container */}
        <div className="glass p-8 rounded-2xl border-gold/20 relative min-h-[400px]">
          
          {step === 1 && (
            <div className="animate-fadeInUp space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center"><MapPin className="text-gold mr-3" /> Where are you going?</h2>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Destination City or Region</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g., Delhi, Agra, Hampi..."
                  className="w-full bg-heritage-card border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fadeInUp space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center"><Calendar className="text-gold mr-3" /> When and how long?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Date</label>
                  <select className="w-full bg-heritage-card border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold appearance-none">
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>This Weekend</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Time Available</label>
                  <select className="w-full bg-heritage-card border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold appearance-none">
                    <option>2 Hours</option>
                    <option>4 Hours</option>
                    <option>Half Day</option>
                    <option>Full Day</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fadeInUp space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center"><Heart className="text-gold mr-3" /> What interests you?</h2>
              <p className="text-gray-400 text-sm">Select multiple interests to personalize your route.</p>
              <div className="flex flex-wrap gap-3 mt-4">
                {interestOptions.map(i => (
                  <button 
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${interests.includes(i) ? 'bg-gold text-heritage-dark shadow-[0_0_15px_rgba(212,160,23,0.3)]' : 'bg-heritage-card border border-gray-700 text-gray-300 hover:border-gold/50'}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fadeInUp space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center"><Car className="text-gold mr-3" /> Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Transport Mode</label>
                  <div className="flex gap-4">
                    {['Walking', 'Taxi/Auto', 'Public Transit'].map(mode => (
                      <button key={mode} className="flex-1 py-3 bg-heritage-card border border-gray-700 rounded-xl text-sm text-gray-300 hover:border-gold transition-colors">{mode}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="absolute bottom-8 left-8 right-8 flex justify-between pt-6 border-t border-gray-800">
              <button 
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`flex items-center text-gray-400 hover:text-white transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <ChevronLeft className="w-5 h-5 mr-1" /> Back
              </button>
              
              {step < 4 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  className="bg-gold hover:bg-gold-light text-heritage-dark px-6 py-2 rounded-lg font-bold flex items-center transition-colors"
                >
                  Next <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              ) : (
                <button 
                  onClick={handleGenerate}
                  className="bg-gold hover:bg-gold-light text-heritage-dark px-6 py-2 rounded-lg font-bold flex items-center transition-colors shadow-[0_0_20px_rgba(212,160,23,0.3)]"
                >
                  Generate Itinerary <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              )}
            </div>
          )}

          {/* Step 5: Results */}
          {step === 5 && (
            <div className="animate-fadeInUp h-full">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <div className="w-16 h-16 border-4 border-gray-800 border-t-gold rounded-full animate-spin mb-6"></div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">Curating Your Journey</h3>
                  <p className="text-gray-400">Our Heritage AI is analyzing sites, distances, and your preferences...</p>
                </div>
              ) : itinerary && (
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-white mb-2">{itinerary.title}</h2>
                      <p className="text-gold flex items-center font-medium"><Clock className="w-4 h-4 mr-2" /> Total Duration: {itinerary.totalTime}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 glass rounded-lg text-white hover:text-gold"><Share2 className="w-5 h-5" /></button>
                      <button className="p-2 glass rounded-lg text-white hover:text-gold"><Bookmark className="w-5 h-5" /></button>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="w-full h-48 bg-heritage-card rounded-xl border border-gray-800 flex items-center justify-center relative overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/OSM_map_of_Agra.png/800px-OSM_map_of_Agra.png" alt="Map" className="w-full h-full object-cover opacity-50 grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <button className="absolute bottom-4 right-4 bg-heritage-dark/80 backdrop-blur text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center border border-white/10 hover:border-gold/50">
                      <MapIcon className="w-4 h-4 mr-2" /> View Full Map
                    </button>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:h-full before:w-0.5 before:bg-gray-800">
                    {itinerary.sites.map((site: any, idx: number) => (
                      <div key={idx} className="relative pl-12">
                        <div className="absolute left-2.5 top-5 w-3 h-3 bg-gold rounded-full ring-4 ring-heritage-dark -translate-x-1/2"></div>
                        
                        <div className="glass p-4 rounded-xl border border-gray-800 hover:border-gold/30 transition-colors">
                          <div className="flex gap-4">
                            <img src={site.images[0]} alt={site.name} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                            <div>
                              <h4 className="font-bold text-white text-lg">{site.name}</h4>
                              <div className="flex gap-4 mt-2 text-xs text-gray-400">
                                <span className="flex items-center text-gold"><Clock className="w-3 h-3 mr-1" /> {site.timeSpend}</span>
                              </div>
                              <p className="mt-2 text-sm text-gray-300 line-clamp-2">Start your journey here by exploring the intricate architecture that defines this era.</p>
                            </div>
                          </div>
                        </div>
                        
                        {idx < itinerary.sites.length - 1 && (
                          <div className="ml-6 py-4 text-xs text-gray-500 flex items-center border-l-2 border-dashed border-gray-700 pl-4 h-full">
                            <Car className="w-4 h-4 mr-2" /> {site.travelToNext} travel to next stop
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center pt-6">
                    <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white transition-colors text-sm">Regenerate Itinerary</button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TripPlannerPage;
