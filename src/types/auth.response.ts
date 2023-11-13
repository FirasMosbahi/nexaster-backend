export class LoginResponse {
  message: string;
  data: { token: string; user: any };
  constructor(data: { token: string; user: any }) {
    this.message = 'Login Successful';
    this.data = data;
  }
}
