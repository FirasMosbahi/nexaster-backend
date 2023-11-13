import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '../../interceptors/file.interceptor';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor)
  async uploadFile(@UploadedFiles() file: any): Promise<any> {
    const data = await this.mediaService.uploadFile(file[0], 'docs');
    return data;
  }
  @Get('/:tag')
  async downloadFile(@Param('tag') tag: string): Promise<any> {
    const data = await this.mediaService.getFile(tag, 'docs');
    return { data: data };
  }
}
