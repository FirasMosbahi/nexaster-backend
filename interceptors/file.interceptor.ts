import { UnsupportedMediaTypeException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

export const FileInterceptor = FilesInterceptor('file', 1, {
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, callback) => {
    if (file.originalname.split('.')[0] === 'pdf') {
      return callback(
        new UnsupportedMediaTypeException('file type should be a pdf file'),
        false,
      );
    }
    callback(null, true);
  },
});
