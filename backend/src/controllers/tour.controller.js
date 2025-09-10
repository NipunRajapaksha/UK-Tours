import Tour from '../models/Tour.js';

export const createTour = async (req, res) => {
  try {
    const { name, price, contactNumber, places, days, description } = req.body;
    const uploaded = (req.files || []).map(f => ({ url: f.path, public_id: f.filename || f.public_id }));
    const tour = await Tour.create({
      name,
      price,
      contactNumber,
      places: typeof places === 'string' ? places.split(',').map(p=>p.trim()) : places,
      days,
      description,
      photos: uploaded
    });
    res.status(201).json(tour);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getTours = async (req, res) => {
  const tours = await Tour.find().sort({ createdAt: -1 });
  res.json(tours);
};

export const getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) return res.status(404).json({ msg: 'Not found' });
  res.json(tour);
};

export const updateTour = async (req, res) => {
  try {
    const { name, price, contactNumber, places, days, description } = req.body;
    const uploaded = (req.files || []).map(f => ({ url: f.path, public_id: f.filename || f.public_id }));
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        contactNumber,
        places: typeof places === 'string' ? places.split(',').map(p=>p.trim()) : places,
        days,
        description,
        ...(uploaded.length ? { $push: { photos: { $each: uploaded } } } : {})
      },
      { new: true }
    );
    res.json(tour);
  } catch (e) { res.status(500).json({ msg: 'Server error' }); }
};

export const deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};
