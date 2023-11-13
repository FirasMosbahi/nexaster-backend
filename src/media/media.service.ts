import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable()
export class MediaService {
  private blobServiceClient;
  constructor(private readonly configService: ConfigService) {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      this.configService.get('STORAGE_CONNECTION_STRING'),
    );
  }

  generateBucketFileKey(): string {
    return `${Date.now()}`;
  }

  async uploadFile(file: any, containerName: string): Promise<any> {
    console.log(file.originalname);
    const stream = file.buffer;
    console.log(file);
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const blobClient = containerClient.getBlockBlobClient(
      this.generateBucketFileKey(),
    );
    const data = await blobClient.upload(stream, stream.length);
    return data;
  }

  async getFile(
    blobName: string,
    containerName: string,
  ): Promise<Buffer | undefined> {
    console.log('start');
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);

    const containerExists = await containerClient.exists();
    if (!containerExists) {
      console.log('no container');
      return undefined;
    }

    const blobClient = containerClient.getBlobClient(blobName);

    const blobExists = await blobClient.exists();
    if (!blobExists) {
      console.log('no blob');
      return undefined;
    }

    return await blobClient.downloadToBuffer();
  }
}
