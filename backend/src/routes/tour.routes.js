import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';
import { auth } from '../middleware/auth.js';
import { adminOnly } from '../middleware/roles.js';
import { createTour, getTours, getTour, updateTour, deleteTour } from '../controllers/tour.controller.js';

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'tour-photos',
    resource_type: 'image'
  })
});
const upload = multer({ storage, limits: { files: 5 } });

router.get('/', getTours);
router.get('/:id', getTour);
router.post('/', auth, adminOnly, upload.array('photos', 5), createTour);
router.put('/:id', auth, adminOnly, upload.array('photos', 5), updateTour);
router.delete('/:id', auth, adminOnly, deleteTour);

export default router;
