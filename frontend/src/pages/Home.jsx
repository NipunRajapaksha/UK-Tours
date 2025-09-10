import React, { useEffect, useState } from 'react';
import api from '../api/client.js';
import { Link } from 'react-router-dom';

export default function Home() {
  const [media, setMedia] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [m, t] = await Promise.all([
          api.get('/media'),
          api.get('/tours')
        ]);
        setMedia(m.data);
        setTours(t.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-ceylon-blue/10 to-ceylon-sand/20">
      {/* Hero Section */}
      <section className="relative h-80 md:h-screen max-h-[700px] rounded-b-3xl overflow-hidden">
        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        ) : media.find(x => x.type === 'video') ? (
          <video 
            src={media.find(x => x.type === 'video').url} 
            className="w-full h-full object-cover" 
            autoPlay 
            muted 
            loop 
          />
        ) : (
          <img 
            src={media[0]?.url || "https://images.unsplash.com/photo-1562583489-bf23ec64651d?auto=format&fit=crop&w=1200&h=700&q=80"} 
            className="w-full h-full object-cover" 
            alt="Sri Lanka landscape" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">UK Tours Sri Lanka</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
              Experience the pearl of the Indian Ocean with authentic Sri Lankan adventures
            </p>
            <button className="bg-ceylon-gold text-ceylon-blue px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition">
              Explore Tours
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ceylon-blue mb-4">Featured Tours</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the best Sri Lankan experiences, from pristine beaches to cultural wonders
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(item => (
              <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map(t => (
              <div key={t._id} className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Link to={`/tours/${t._id}`}>
                  <div className="relative overflow-hidden">
                    {t.photos?.[0]?.url ? (
                      <img 
                        src={t.photos[0].url} 
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110" 
                        alt={t.name}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-r from-ceylon-blue to-ceylon-green flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">UK Tours</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-ceylon-gold text-ceylon-blue px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-gray-800 mb-2">{t.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {t.description || "Experience the beauty of Sri Lanka with this amazing tour."}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">{t.days} days • {t.destinations?.length || 5} locations</p>
                        <p className="text-ceylon-blue font-bold text-lg">Rs {t.price?.toLocaleString()}</p>
                      </div>
                      <span className="bg-ceylon-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition">
                        Details
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/tours" className="inline-block border-2 border-ceylon-blue text-ceylon-blue px-8 py-3 rounded-full font-semibold hover:bg-ceylon-blue hover:text-white transition">
            View All Tours
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-ceylon-sand">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ceylon-blue mb-4">Why Choose UK Tours?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With years of experience and deep local knowledge, we provide unforgettable Sri Lankan experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl text-center shadow-md">
              <div className="w-16 h-16 bg-ceylon-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-ceylon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Local Expertise</h3>
              <p className="text-gray-600">Our guides are Sri Lankan natives with deep knowledge of culture, history, and hidden gems.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl text-center shadow-md">
              <div className="w-16 h-16 bg-ceylon-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-ceylon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Authentic Experiences</h3>
              <p className="text-gray-600">We go beyond tourist spots to show you the real Sri Lanka and its traditions.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl text-center shadow-md">
              <div className="w-16 h-16 bg-ceylon-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-ceylon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Safety First</h3>
              <p className="text-gray-600">Your wellbeing is our priority with vetted accommodations and experienced guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style>{`
        :root {
          --ceylon-blue: #0e4c92;
          --ceylon-gold: #d4af37;
          --ceylon-green: #2e5d34;
          --ceylon-sand: #f0e6d2;
        }
        .bg-ceylon-blue { background-color: var(--ceylon-blue); }
        .bg-ceylon-gold { background-color: var(--ceylon-gold); }
        .bg-ceylon-green { background-color: var(--ceylon-green); }
        .bg-ceylon-sand { background-color: var(--ceylon-sand); }
        .text-ceylon-blue { color: var(--ceylon-blue); }
        .text-ceylon-gold { color: var(--ceylon-gold); }
        .text-ceylon-green { color: var(--ceylon-green); }
        .border-ceylon-blue { border-color: var(--ceylon-blue); }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
