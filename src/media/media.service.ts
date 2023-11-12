import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as aws from 'aws-sdk';
import { MediaTypeEnum } from '../enums/media.enum';

@Injectable()
export class MediaService {
  private s3: aws.S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new aws.S3({
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      },
      endpoint: 'http://192.168.0.1:9000',
    });
  }

  generateBucketFileKey(mediaType: MediaTypeEnum): string {
    const randomPart = Math.floor(Math.random() * 9000) + 1000;
    return `${mediaType}/${Date.now()}${randomPart}`;
  }

  async uploadFileToS3(file: any, mediaType: MediaTypeEnum): Promise<string> {
    const params: aws.S3.PutObjectRequest = {
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: this.generateBucketFileKey(mediaType),
      Body: file.buffer,
      ACL: 'public-read',
    };
    console.log(params);
    try {
      const response: aws.S3.ManagedUpload.SendData = await this.s3
        .upload(params)
        .promise();
      return response.Location;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('FILE_UPLOAD_FAILED');
    }
  }
}
