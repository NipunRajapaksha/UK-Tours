import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';
import { auth } from '../middleware/auth.js';
import { adminOnly } from '../middleware/roles.js';
import { createMedia, listMedia, deleteMedia } from '../controllers/media.controller.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'tour-media',
    resource_type: 'auto'
  })
});
const upload = multer({ storage });

const router = Router();

router.get('/', listMedia);
router.post('/', auth, adminOnly, upload.single('file'), createMedia);
router.delete('/:id', auth, adminOnly, deleteMedia);

export default router;
