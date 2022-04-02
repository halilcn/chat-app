import multer from 'multer';

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
  destination: 'public/uploads/user-images',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.png');
  }
});

export default multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: (req, file, cb) => {
    if (!types.includes(file.mimetype)) {
      cb(null, false);
      return cb(new Error('Image upload error'));
    }
    cb(null, true);
  }
});
