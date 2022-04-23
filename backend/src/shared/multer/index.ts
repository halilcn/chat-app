import multer from 'multer';

import { FILE_TYPES, FILE_IMAGE_TYPES, FILE_VIDEO_TYPES } from '../../constants';

const storage = multer.diskStorage({
  destination: 'public/uploads/file',
  filename: function (req, file, cb) {
    const fileType = req.params.fileType == FILE_TYPES.IMAGE ? '.png' : '.mp4';

    cb(null, Date.now() + fileType);
  }
});

export default multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: (req, file, cb) => {
    if (req.params.fileType == FILE_TYPES.IMAGE && !FILE_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, false);
      return cb(new Error('File image type error'));
    }

    if (req.params.fileType == FILE_TYPES.VIDEO && !FILE_VIDEO_TYPES.includes(file.mimetype)) {
      cb(null, false);
      return cb(new Error('File video type error'));
    }

    cb(null, true);
  }
});
