import React, { useEffect, useState } from 'react';
import api from '../api/client.js';

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    contactNumber: '', 
    places: '', 
    days: '', 
    description: '' 
  });
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const load = async () => { 
    setIsLoading(true);
    try {
      const { data } = await api.get('/tours'); 
      setTours(data);
    } catch (error) {
      console.error('Failed to load tours:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => { load(); }, []);

  // Generate preview URLs for selected images
  useEffect(() => {
    if (!files.length) {
      setPreviewUrls([]);
      return;
    }

    const newPreviewUrls = [];
    Array.from(files).forEach(file => {
      newPreviewUrls.push(URL.createObjectURL(file));
    });
    setPreviewUrls(newPreviewUrls);

    // Clean up preview URLs when component unmounts or files change
    return () => {
      newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.price || form.price <= 0) newErrors.price = 'Valid price is required';
    if (!form.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!form.places.trim()) newErrors.places = 'Places are required';
    if (!form.days || form.days <= 0) newErrors.days = 'Valid number of days is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (files.length === 0 && !editingId) newErrors.photos = 'At least one photo is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      Array.from(files).forEach(f => fd.append('photos', f));
      
      if (editingId) {
        await api.put(`/tours/${editingId}`, fd, { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        });
        setSuccessMessage('Tour updated successfully!');
      } else {
        await api.post('/tours', fd, { 
          headers: { 'Content-Type': 'multipart/form-data' } 
        });
        setSuccessMessage('Tour created successfully!');
      }
      
      resetForm();
      await load();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save tour:', error);
      setErrors({ submit: 'Failed to save tour. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = (tour) => {
    setForm({
      name: tour.name,
      price: tour.price,
      contactNumber: tour.contactNumber,
      places: Array.isArray(tour.places) ? tour.places.join(', ') : tour.places,
      days: tour.days,
      description: tour.description
    });
    setEditingId(tour._id);
    setFiles([]);
    setPreviewUrls(tour.photos?.map(p => p.url) || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    
    try {
      await api.delete(`/tours/${id}`);
      setSuccessMessage('Tour deleted successfully!');
      await load();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to delete tour:', error);
      setErrors({ submit: 'Failed to delete tour. Please try again.' });
    }
  };

  const resetForm = () => {
    setForm({ 
      name: '', 
      price: '', 
      contactNumber: '', 
      places: '', 
      days: '', 
      description: '' 
    });
    setFiles([]);
    setPreviewUrls([]);
    setEditingId(null);
    setErrors({});
  };

  const handleImageDelete = (index) => {
    if (index < files.length) {
      // Remove from files array (for new uploads)
      const newFiles = Array.from(files);
      newFiles.splice(index, 1);
      setFiles(newFiles);
    } else {
      // This would be a previously uploaded image - in a real app
      // you might want to handle deletion from server too
      const newPreviewUrls = [...previewUrls];
      newPreviewUrls.splice(index, 1);
      setPreviewUrls(newPreviewUrls);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Tours</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create, edit, and manage your tour offerings
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingId ? 'Edit Tour' : 'Create New Tour'}
          </h2>
          {editingId && (
            <button
              onClick={resetForm}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={onCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tour Name *
            </label>
            <input 
              className={`input ${errors.name ? 'border-red-500' : ''}`} 
              placeholder="e.g., Himalayan Adventure" 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (Rs) *
            </label>
            <input 
              className={`input ${errors.price ? 'border-red-500' : ''}`} 
              placeholder="0.00" 
              type="number" 
              min="0"
              step="0.01"
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input 
              className={`input ${errors.contactNumber ? 'border-red-500' : ''}`} 
              placeholder="e.g., +1234567890" 
              value={form.contactNumber} 
              onChange={e => setForm({...form, contactNumber: e.target.value})} 
            />
            {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (Days) *
            </label>
            <input 
              className={`input ${errors.days ? 'border-red-500' : ''}`} 
              placeholder="e.g., 5" 
              type="number" 
              min="1"
              value={form.days} 
              onChange={e => setForm({...form, days: e.target.value})} 
            />
            {errors.days && <p className="mt-1 text-sm text-red-600">{errors.days}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Places (comma-separated) *
            </label>
            <input 
              className={`input ${errors.places ? 'border-red-500' : ''}`} 
              placeholder="e.g., Kathmandu, Pokhara, Chitwan" 
              value={form.places} 
              onChange={e => setForm({...form, places: e.target.value})} 
            />
            {errors.places && <p className="mt-1 text-sm text-red-600">{errors.places}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea 
              className={`input min-h-[120px] ${errors.description ? 'border-red-500' : ''}`} 
              placeholder="Describe the tour in detail..." 
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos {!editingId && '*'}
            </label>
            
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload images</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={e => setFiles(e.target.files)} 
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            
            {errors.photos && <p className="mt-1 text-sm text-red-600">{errors.photos}</p>}
            
            {previewUrls.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="flex flex-wrap gap-2">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={url} 
                        alt={`Preview ${index + 1}`} 
                        className="h-20 w-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {editingId ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                editingId ? 'Update Tour' : 'Create Tour'
              )}
            </button>
          </div>
        </form>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">All Tours</h2>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {tours.length} {tours.length === 1 ? 'tour' : 'tours'}
          </span>
        </div>

        {isLoading && !tours.length ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : tours.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No tours yet</h3>
            <p className="mt-2 text-sm text-gray-500">Get started by creating your first tour.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map(t => (
              <div key={t._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {t.photos?.[0]?.url && (
                  <div className="relative">
                    <img src={t.photos[0].url} className="w-full h-48 object-cover" alt={t.name}/>
                    <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {t.days} day{t.days !== 1 ? 's' : ''}
                    </div>
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{t.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{t.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-blue-600">Rs {t.price}</span>
                    <span className="text-sm text-gray-500">{t.contactNumber}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {Array.isArray(t.places) ? t.places.slice(0, 3).map((place, i) => (
                      <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded-full">
                        {place}
                      </span>
                    )) : (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded-full">
                        {t.places}
                      </span>
                    )}
                    {Array.isArray(t.places) && t.places.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded-full">
                        +{t.places.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEdit(t)}
                      className="btn btn-outline flex-1 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(t._id)}
                      className="btn btn-outline text-red-600 border-red-200 hover:bg-red-50 flex-1 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}