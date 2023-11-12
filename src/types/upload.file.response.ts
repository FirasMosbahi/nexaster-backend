export class UploadFileResponse {
  message: string = 'FILE_UPLOADED_SUCCESSFULY';
  data: { url: string };
  constructor(url: string) {
    this.data.url = url;
  }
}
