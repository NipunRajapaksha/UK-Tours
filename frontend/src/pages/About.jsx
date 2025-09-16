import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-uk-blue to-uk-stone">
      {/* Header */}
      <header className="relative bg-uk-blue text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">UK Tours</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-uk-gold transition">Home</a>
            <a href="#" className="hover:text-uk-gold transition">Tours</a>
            <a href="#" className="text-uk-gold font-medium">About</a>
            <a href="#" className="hover:text-uk-gold transition">Gallery</a>
            <a href="#" className="hover:text-uk-gold transition">Contact</a>
          </nav>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-16 md:py-24 bg-uk-blue text-white">
        <div className="absolute inset-0 bg-uk-blue opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About UK Tours</h1>
          <p className="text-xl max-w-2xl mx-auto">Discover the beauty, culture, and adventure of Sri Lanka with us</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Intro Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-uk-blue mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2010, UK Tours began with a passion to showcase the wonders of Sri Lanka —
                from golden beaches and lush highlands to ancient cities and vibrant culture.
              </p>
              <p className="text-lg text-gray-700">
                What started as a small family-run travel service is now one of Sri Lanka’s trusted tour providers,
                helping travelers from all over the world create unforgettable memories on this beautiful island.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1600788842650-8fcf7e3a1f4f?auto=format&fit=crop&w=800&q=80" 
                  alt="Sigiriya Rock Fortress in Sri Lanka" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Experience Types */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-uk-blue text-center mb-12">Our Curated Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beach Experience */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1617196034130-d5bcd21679aa?auto=format&fit=crop&w=800&q=80" 
                  alt="Sri Lanka beach" 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-uk-blue mb-3">Tropical Beaches</h3>
                <p className="text-gray-700">Relax on Sri Lanka’s pristine beaches in Mirissa, Unawatuna, and Trincomalee.</p>
              </div>
            </div>
            
            {/* Hill Country */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1633419461186-f3e6a481508c?auto=format&fit=crop&w=800&q=80" 
                  alt="Sri Lanka hill country tea plantations" 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-uk-blue mb-3">Hill Country Escapes</h3>
                <p className="text-gray-700">Take a scenic train to Ella, wander through tea plantations, and enjoy cool mountain air.</p>
              </div>
            </div>
            
            {/* Cultural Heritage */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1613839943152-2d048121977f?auto=format&fit=crop&w=800&q=80" 
                  alt="Sri Lanka cultural heritage" 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-uk-blue mb-3">Cultural Wonders</h3>
                <p className="text-gray-700">Explore temples, UNESCO heritage sites, and the traditions that define Sri Lanka.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20 bg-uk-blue text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values & Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Authentic Journeys</h3>
              <p>Go beyond the usual routes with local, insider experiences.</p>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Sustainable Travel</h3>
              <p>We support eco-friendly tourism and empower local communities.</p>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Personalized Tours</h3>
              <p>Every trip is tailored to your pace, interests, and dreams.</p>
            </div>
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p>Your comfort and security are our top priorities.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-uk-blue mb-6">Ready to Explore Sri Lanka?</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
            Join us for unforgettable adventures across beaches, mountains, and ancient cities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-uk-gold text-uk-blue px-8 py-4 rounded-lg font-medium hover:bg-yellow-500 transition">Browse Our Tours</button>
            <button className="border-2 border-uk-blue text-uk-blue px-8 py-4 rounded-lg font-medium hover:bg-uk-blue hover:text-white transition">Contact Our Team</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-uk-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">UK Tours</h3>
              <p className="opacity-80">Unforgettable Sri Lankan travel experiences since 2010.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Explore</h3>
              <ul className="space-y-2 opacity-80">
                <li><a href="#" className="hover:text-uk-gold transition">Beach Escapes</a></li>
                <li><a href="#" className="hover:text-uk-gold transition">Hill Country Tours</a></li>
                <li><a href="#" className="hover:text-uk-gold transition">Cultural Heritage</a></li>
                <li><a href="#" className="hover:text-uk-gold transition">Wildlife Safaris</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2 opacity-80">
                <li><a href="#" className="hover:text-uk-gold transition">About Us</a></li>
                <li><a href="#" className="hover:text-uk-gold transition">Testimonials</a></li>
                <li><a href="#" className="hover:text-uk-gold transition">Travel Blog</a></li>
                <li><a href="#" className="hover:text-uk-gold transition">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="not-italic opacity-80">
                <p>No. 45, Galle Road</p>
                <p>Colombo, Sri Lanka</p>
                <p className="mt-2">+94 77 123 4567</p>
                <p>info@uktours.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white border-opacity-20 mt-12 pt-8 text-center opacity-70">
            <p>© 2025 UK Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        :root {
          --uk-blue: #1d3557;
          --uk-gold: #e9c46a;
          --uk-green: #2a9d8f;
          --uk-stone: #f1f1f1;
        }
        
        .bg-uk-blue { background-color: var(--uk-blue); }
        .bg-uk-gold { background-color: var(--uk-gold); }
        .bg-uk-green { background-color: var(--uk-green); }
        .bg-uk-stone { background-color: var(--uk-stone); }
        
        .text-uk-blue { color: var(--uk-blue); }
        .text-uk-gold { color: var(--uk-gold); }
        .text-uk-green { color: var(--uk-green); }
        
        .border-uk-blue { border-color: var(--uk-blue); }
      `}</style>
    </div>
  );
}
