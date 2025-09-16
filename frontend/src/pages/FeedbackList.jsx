import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(res.data);
      } catch (err) {
        setError("Failed to load feedback. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-uk-blue mb-8 text-center">
        What Our Customers Say
      </h2>

      {loading && <p className="text-center text-gray-500">Loading feedback...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.length > 0 ? (
            feedbacks.map((f) => (
              <div
                key={f._id}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <p className="italic mb-4 text-gray-700">“{f.message}”</p>
                <p className="font-semibold text-gray-900">
                  {f.name || f.user?.email || "Anonymous"}
                </p>
                {f.rating && (
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < f.rating ? "text-yellow-500" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No feedback available yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
