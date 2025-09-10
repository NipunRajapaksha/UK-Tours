export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ msg: 'Admin only' });
  next();
};
