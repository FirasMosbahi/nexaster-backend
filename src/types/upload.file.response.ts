export class UploadFileResponse {
  message: string = 'FILE_UPLOADED_SUCCESSFULY';
  data: { url: any };
  constructor(url: any) {
    this.data.url = url;
  }
}
