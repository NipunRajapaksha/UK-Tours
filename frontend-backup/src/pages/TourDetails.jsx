import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client.js';

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [booking, setBooking] = useState({ 
    customerName: '', 
    userEmail: '', 
    contactNumber: '', 
    notes: '',
    guests: 1,
    date: ''
  });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    fetchTour();
  }, [id]);

  const fetchTour = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/tours/${id}`);
      setTour(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tour details. Please try again.');
      console.error('Error fetching tour:', err);
    } finally {
      setLoading(false);
    }
  };

  const onBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg('');
    
    try {
      const payload = { ...booking, tourId: id };
      await api.post('/bookings', payload);
      setMsg('Booking confirmed! Check your email inbox for details.');
      setBooking({ 
        customerName: '', 
        userEmail: '', 
        contactNumber: '', 
        notes: '',
        guests: 1,
        date: ''
      });
    } catch (err) {
      setMsg('Failed to book. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button 
                  onClick={fetchTour}
                  className="mt-2 text-sm text-red-700 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-400 hover:text-gray-500">Home</a>
            </li>
            <li>
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            </li>
            <li>
              <a href="/tours" className="text-gray-400 hover:text-gray-500">Tours</a>
            </li>
            <li>
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            </li>
            <li>
              <span className="text-gray-600">{tour.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              {tour.photos?.length > 0 ? (
                <>
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <img 
                      src={tour.photos[selectedImage].url} 
                      alt={tour.name}
                      className="w-full h-96 object-cover cursor-pointer"
                      onClick={() => setShowAllPhotos(true)}
                    />
                    <button 
                      className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium flex items-center"
                      onClick={() => setShowAllPhotos(true)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                      View all photos
                    </button>
                  </div>
                  
                  {tour.photos.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {tour.photos.map((photo, index) => (
                        <div 
                          key={index} 
                          className={`relative cursor-pointer rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                          onClick={() => setSelectedImage(index)}
                        >
                          <img 
                            src={photo.url} 
                            alt={`${tour.name} ${index + 1}`}
                            className="w-full h-20 object-cover"
                          />
                          {selectedImage === index && (
                            <div className="absolute inset-0 bg-blue-500 bg-opacity-20"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-96 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
                  </svg>
                </div>
              )}
            </div>

            {/* Tour Information */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{tour.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-400 mr-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-700">4.8 (124 reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {tour.places?.length > 0 ? tour.places[0] : 'Multiple locations'}
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{tour.description}</p>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{tour.days} day{tour.days !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Group Size</p>
                      <p className="font-medium">Up to 15 people</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Destinations</p>
                      <p className="font-medium">{tour.places?.join(', ') || 'Multiple locations'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">{formatPrice(tour.price)} per person</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Itinerary Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(day => (
                  <div key={day} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{day}</span>
                      </div>
                      {day < 3 && <div className="w-0.5 h-16 bg-gray-200 my-1"></div>}
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className="font-medium text-lg mb-1">Day {day}: Exploring {tour.places?.[day-1] || 'Destination'}</h3>
                      <p className="text-gray-600">Experience the beauty and culture of this amazing destination with guided tours and free time to explore.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(tour.price)}</span>
                  <span className="text-gray-500">per person</span>
                </div>
                <div className="flex items-center text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Instant confirmation</span>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">Book this tour</h2>
              
              {msg && (
                <div className={`p-3 rounded-lg mb-4 ${msg.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {msg}
                </div>
              )}
              
              <form onSubmit={onBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Your name" 
                    value={booking.customerName} 
                    onChange={e => setBooking({...booking, customerName: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                    type="email" 
                    placeholder="Your email" 
                    value={booking.userEmail} 
                    onChange={e => setBooking({...booking, userEmail: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Contact number" 
                    value={booking.contactNumber} 
                    onChange={e => setBooking({...booking, contactNumber: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={booking.guests}
                      onChange={e => setBooking({...booking, guests: parseInt(e.target.value)})}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                      type="date" 
                      value={booking.date} 
                      onChange={e => setBooking({...booking, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Notes" 
                    rows="3"
                    value={booking.notes} 
                    onChange={e => setBooking({...booking, notes: e.target.value})}
                  />
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(tour.price * booking.guests)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Taxes & fees</span>
                    <span className="font-medium">{formatPrice(tour.price * booking.guests * 0.1)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(tour.price * booking.guests * 1.1)}</span>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  disabled={submitting}
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : 'Confirm Booking'}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By completing this booking, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Photo Gallery Modal */}
        {showAllPhotos && tour.photos?.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
              <div className="relative">
                <button 
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
                  onClick={() => setShowAllPhotos(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <img 
                  src={tour.photos[selectedImage].url} 
                  alt={tour.name}
                  className="w-full h-auto max-h-screen object-contain"
                />
                
                {tour.photos.length > 1 && (
                  <>
                    <button 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
                      onClick={() => setSelectedImage((selectedImage - 1 + tour.photos.length) % tour.photos.length)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
                      onClick={() => setSelectedImage((selectedImage + 1) % tour.photos.length)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              <div className="mt-4 text-white text-center">
                {selectedImage + 1} of {tour.photos.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}