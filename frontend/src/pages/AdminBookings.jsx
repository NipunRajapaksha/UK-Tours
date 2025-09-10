import React, { useEffect, useState } from "react";
import api from "../api/client.js";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // for modal
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/bookings");
      setBookings(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await api.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Failed to delete booking:", err);
      alert("Delete failed");
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const filteredAndSortedBookings = bookings
    .filter((booking) => {
      const matchesSearch =
        booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.tour?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // special case for nested tour.name
      if (sortBy === "tour.name") {
        aValue = a.tour?.name || "";
        bValue = b.tour?.name || "";
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusClasses[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "N/A"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={fetchBookings}
              className="mt-2 text-sm text-red-700 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bookings Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and review all customer bookings
          </p>
        </div>

        {/* Filters + Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contact
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => handleSort("tour.name")}
                  >
                    Tour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    When
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedBookings.length > 0 ? (
                  filteredAndSortedBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.userEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.contactNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.tour?.name || "N/A"} <br />
                        <span className="text-gray-500 text-sm">
                          {booking.tour?.price
                            ? `$${booking.tour.price}`
                            : "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(booking.createdAt).toLocaleDateString()}{" "}
                        <span className="text-gray-500 text-sm">
                          {new Date(booking.createdAt).toLocaleTimeString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          View
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(booking._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for View */}
        {selectedBooking && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              <p>
                <strong>Customer:</strong> {selectedBooking.customerName}
              </p>
              <p>
                <strong>Email:</strong> {selectedBooking.userEmail}
              </p>
              <p>
                <strong>Contact:</strong> {selectedBooking.contactNumber}
              </p>
              <p>
                <strong>Tour:</strong>{" "}
                {selectedBooking.tour?.name || "N/A"} (
                {selectedBooking.tour?.price
                  ? `$${selectedBooking.tour.price}`
                  : "N/A"}
                )
              </p>
              <p>
                <strong>Status:</strong> {selectedBooking.status}
              </p>
              <p>
                <strong>Guests:</strong> {selectedBooking.guests || 1}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedBooking.createdAt).toLocaleString()}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setSelectedBooking(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
