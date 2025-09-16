import React, { useEffect, useState } from "react";
import api from "../utils/api"; // centralized axios
import { useAuth } from "../context/AuthContext.jsx";

export default function FeedbackForm() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get("/api/feedback");
        setFeedbacks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Failed to fetch feedbacks:", err);
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to leave feedback.");

    try {
      // ✅ Include token in Authorization header
      const res = await api.post(
        "/api/feedback",
        { message, rating },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setFeedbacks([res.data, ...feedbacks]); // prepend new feedback
      setMessage("");
      setRating(5);
    } catch (err) {
      console.error("❌ Error submitting feedback:", err.response?.data || err);
      alert(err.response?.data?.msg || "Error submitting feedback");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Leave Feedback</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            className="w-full border rounded-md p-2 mb-2"
            rows={3}
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="flex items-center gap-3">
            <label className="font-medium">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-1 rounded-md"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} ⭐
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      ) : (
        <p className="text-gray-600">Login to leave feedback.</p>
      )}

      <h2 className="text-xl font-bold mb-3">Customer Feedbacks</h2>

      {loading ? (
        <p className="text-gray-500">Loading feedbacks...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback yet.</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="border p-3 rounded-md shadow-sm bg-gray-50"
            >
              <p className="font-medium">
                {fb.user?.name || fb.user?.email || "Anonymous"} – {fb.rating}⭐
              </p>
              <p className="text-gray-700">{fb.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(fb.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
