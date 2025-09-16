import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import Tours from './pages/Tours.jsx';
import TourDetails from './pages/TourDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminTours from './pages/AdminTours.jsx';
import AdminBookings from './pages/AdminBookings.jsx';
import AdminMedia from './pages/AdminMedia.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import FeedbackForm from './pages/FeedbackForm.jsx';
import FeedbackList from './pages/FeedbackList.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedbackForm" element={<FeedbackForm />} />

          {/* Admin pages */}
          <Route
            path="/admin/tours"
            element={
              <ProtectedRoute role="admin">
                <AdminTours />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute role="admin">
                <AdminBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedRoute role="admin">
                <AdminMedia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/feedback"
            element={
              <ProtectedRoute role="admin">
                <FeedbackList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}
