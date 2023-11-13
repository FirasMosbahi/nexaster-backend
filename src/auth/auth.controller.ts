import { Body, Controller, Param, Post } from '@nestjs/common';
import { LoginDto, SignUpDoctorDto, SignUpPatientDto } from '../dto/auth.dto';
import { AuthService } from './auth.service';
import { LoginResponse } from '../types/auth.response';
import { RolesEnum } from '../enums/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login/:role')
  async login(
    @Body() loginDto: LoginDto,
    @Param('role') role: RolesEnum,
  ): Promise<LoginResponse> {
    const data: any = await this.authService.login(loginDto, role);
    return new LoginResponse(data);
  }

  @Post('/signup/doctor')
  async signup(@Body() signUpDoctorDto: SignUpDoctorDto) {
    await this.authService.signupDocotr(signUpDoctorDto);
    return { message: 'DOCTOR SIGNED UP SUCCESSFULLY' };
  }

  @Post('/signup/patient')
  async signUpPatient(@Body() signUpPatientDto: SignUpPatientDto) {
    await this.authService.signupPatient(signUpPatientDto);
    return { message: 'PATIENT SIGNED UP SUCCESSFULLY' };
  }
}
