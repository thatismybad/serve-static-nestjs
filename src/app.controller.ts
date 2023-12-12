import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path'; // Import the 'extname' function
import { diskStorage } from 'multer';

@Controller('images')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/images',
        filename: (req, file, callback) => {
          const originalName = file.originalname;
          const extension = extname(originalName);
          const newFilename = `${Date.now()}${extension}`;
          callback(null, newFilename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    // Handle saving the file details to the database if needed
    return { imageUrl: file.filename };
  }
}
