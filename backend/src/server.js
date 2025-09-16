// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import tourRoutes from "./routes/tour.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import { v2 as cloudinary } from "cloudinary";
import feedbackRoutes from "./routes/feedback.js";
dotenv.config();
const app = express();

// For __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || "http://localhost:5173", // Vite default port
  "http://localhost:3000",                             // CRA fallback
  "https://your-netlify-app.netlify.app",              // Replace with actual Netlify URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow requests with no origin
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed by server"));
    },
    credentials: true,
  })
);

// ✅ Cloudinary config (only if keys provided in .env)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("☁️ Cloudinary connected");
}

// ✅ Static uploads folder (for local file storage)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API routes
app.get("/", (req, res) => res.send("API is running 🚀"));
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/feedback", feedbackRoutes);
// ✅ Start server
const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(`✅ Server listening on http://localhost:${port}`)
    );
  } catch (err) {
    console.error("❌ Server startup error:", err.message);
    process.exit(1);
  }
};

start();
