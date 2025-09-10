import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/roles.js";
import {
  createTour,
  getTours,
  getTour,
  updateTour,
  deleteTour,
} from "../controllers/tour.controller.js";

const router = Router();

// 🔹 Setup Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "tour-photos",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    resource_type: "image",
  }),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 }, // 5MB, max 5 files
});

// 🔹 Public routes
router.get("/", getTours);       // list all tours
router.get("/:id", getTour);     // single tour

// 🔹 Admin-only routes
router.post("/", auth, adminOnly, upload.array("photos", 5), createTour);
router.put("/:id", auth, adminOnly, upload.array("photos", 5), updateTour);
router.delete("/:id", auth, adminOnly, deleteTour);

export default router;
