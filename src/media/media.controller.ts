import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '../../interceptors/file.interceptor';
import { UploadFileResponse } from '../types/upload.file.response';
import { MediaTypeEnum } from '../enums/media.enum';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/:mediaType')
  @UseInterceptors(FileInterceptor)
  async uploadFile(
    @UploadedFiles() file: any,
    @Param('mediaType') mediaType: MediaTypeEnum,
  ): Promise<UploadFileResponse> {
    const data: string = await this.mediaService.uploadFileToS3(
      file[0],
      mediaType,
    );
    return new UploadFileResponse(data);
  }
}
