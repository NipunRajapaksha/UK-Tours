import Media from '../models/Media.js';

export const createMedia = async (req, res) => {
  try {
    const type = req.body.type || (req.file.mimetype.startsWith('video') ? 'video' : 'image');
    const url = req.file?.path; // provided by cloudinary storage
    const public_id = req.file?.filename || req.file?.public_id;
    const { caption } = req.body;
    const item = await Media.create({ type, url, public_id, caption });
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ msg: 'Server error' }); }
};

export const listMedia = async (req, res) => {
  const items = await Media.find().sort({ createdAt: -1 });
  res.json(items);
};

export const deleteMedia = async (req, res) => {
  await Media.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};
