export class LoginResponse {
  message: string;
  data: { token: string };
  constructor(token: string) {
    this.message = 'Login Successful';
    this.data = { token };
  }
}
