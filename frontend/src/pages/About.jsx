import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ceylon-blue to-ceylon-sand">
      {/* Header */}
      <header className="relative bg-ceylon-blue text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Ceylon Explorers</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-ceylon-gold transition">Home</a>
            <a href="#" className="hover:text-ceylon-gold transition">Tours</a>
            <a href="#" className="text-ceylon-gold font-medium">About</a>
            <a href="#" className="hover:text-ceylon-gold transition">Gallery</a>
            <a href="#" className="hover:text-ceylon-gold transition">Contact</a>
          </nav>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-16 md:py-24 bg-ceylon-blue text-white">
        <div className="absolute inset-0 bg-ceylon-blue opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Ceylon Explorers</h1>
          <p className="text-xl max-w-2xl mx-auto">Discover the pearl of the Indian Ocean with Sri Lanka's premier tour company</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Intro Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-ceylon-blue mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2010, Ceylon Explorers began with a simple mission: to share the breathtaking beauty and rich cultural heritage of Sri Lanka with the world.
              </p>
              <p className="text-lg text-gray-700">
                We are a Sri Lankan tour company offering curated experiences across beaches, highlands and cultural heritage. What started as a small family business has grown into a premier tour company, but we've never lost sight of our roots.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1580502304784-8985b7eb7260?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Sri Lankan beach" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Experience Types */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-ceylon-blue text-center mb-12">Our Curated Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beach Experience */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80" 
                  alt="Sri Lankan beaches" 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-ceylon-blue mb-3">Pristine Beaches</h3>
                <p className="text-gray-700">From the golden shores of the west coast to the surfing paradises of the east, experience Sri Lanka's breathtaking coastline.</p>
              </div>
            </div>
            
            {/* Highlands Experience */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1596979556850-41fde50b8c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80" 
                  alt="Sri Lankan highlands" 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-ceylon-blue mb-3">Majestic Highlands</h3>
                <p className="text-gray-700">Explore the misty mountains, lush tea plantations, and breathtaking vistas of Sri Lanka's hill country.</p>
              </div>
            </div>
            
            {/* Cultural Experience */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582494600741-be1a599c37c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80" 
                  alt="Sri Lankan cultural sites" 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-ceylon-blue mb-3">Cultural Heritage</h3>
                <p className="text-gray-700">Discover ancient temples, historic kingdoms, and vibrant traditions that span over 2,500 years of recorded history.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20 bg-ceylon-blue text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values & Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
              <div className="inline-block p-4 mb-4 rounded-full bg-ceylon-gold text-ceylon-blue">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Authentic Experiences</h3>
              <p>We connect you with local communities and hidden gems beyond the typical tourist trails.</p>
            </div>
            
            {/* Value 2 */}
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
              <div className="inline-block p-4 mb-4 rounded-full bg-ceylon-gold text-ceylon-blue">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainable Tourism</h3>
              <p>We're committed to preserving Sri Lanka's natural beauty and supporting local communities.</p>
            </div>
            
            {/* Value 3 */}
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
              <div className="inline-block p-4 mb-4 rounded-full bg-ceylon-gold text-ceylon-blue">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Service</h3>
              <p>Every tour is customized to your interests, pace, and preferences for a truly personal experience.</p>
            </div>
            
            {/* Value 4 */}
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
              <div className="inline-block p-4 mb-4 rounded-full bg-ceylon-gold text-ceylon-blue">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p>Your wellbeing is our priority, with thoroughly vetted accommodations and experienced guides.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ceylon-blue mb-6">Ready to Explore Sri Lanka?</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">Join us for an unforgettable journey through the diverse landscapes and rich culture of this island paradise.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-ceylon-gold text-ceylon-blue px-8 py-4 rounded-lg font-medium hover:bg-yellow-500 transition">Browse Our Tours</button>
            <button className="border-2 border-ceylon-blue text-ceylon-blue px-8 py-4 rounded-lg font-medium hover:bg-ceylon-blue hover:text-white transition">Contact Our Team</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ceylon-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ceylon Explorers</h3>
              <p className="opacity-80">Premium Sri Lankan tour experiences since 2010.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Explore</h3>
              <ul className="space-y-2 opacity-80">
                <li><a href="#" className="hover:text-ceylon-gold transition">Beach Tours</a></li>
                <li><a href="#" className="hover:text-ceylon-gold transition">Highland Adventures</a></li>
                <li><a href="#" className="hover:text-ceylon-gold transition">Cultural Experiences</a></li>
                <li><a href="#" className="hover:text-ceylon-gold transition">Wildlife Safaris</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2 opacity-80">
                <li><a href="#" className="hover:text-ceylon-gold transition">About Us</a></li>
                <li><a href="#" className="hover:text-ceylon-gold transition">Testimonials</a></li>
                <li><a href="#" className="hover:text-ceylon-gold transition">Travel Blog</a></li>
                <li><a href="#" className="hover:text-ceylon-gold transition">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="not-italic opacity-80">
                <p>123 Galle Road</p>
                <p>Colombo, Sri Lanka</p>
                <p className="mt-2">+94 112 345 678</p>
                <p>info@ceylonexplorers.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white border-opacity-20 mt-12 pt-8 text-center opacity-70">
            <p>© 2023 Ceylon Explorers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        :root {
          --ceylon-blue: #0e4c92;
          --ceylon-gold: #d4af37;
          --ceylon-green: #2e5d34;
          --ceylon-sand: #f0e6d2;
        }
        
        .bg-ceylon-blue {
          background-color: var(--ceylon-blue);
        }
        
        .bg-ceylon-gold {
          background-color: var(--ceylon-gold);
        }
        
        .bg-ceylon-green {
          background-color: var(--ceylon-green);
        }
        
        .bg-ceylon-sand {
          background-color: var(--ceylon-sand);
        }
        
        .text-ceylon-blue {
          color: var(--ceylon-blue);
        }
        
        .text-ceylon-gold {
          color: var(--ceylon-gold);
        }
        
        .text-ceylon-green {
          color: var(--ceylon-green);
        }
        
        .border-ceylon-blue {
          border-color: var(--ceylon-blue);
        }
      `}</style>
    </div>
  );
}