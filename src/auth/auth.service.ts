import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, SignUpDoctorDto, SignUpPatientDto } from '../dto/auth.dto';
import { Auth } from '../schema/auth.schema';
import { RolesEnum } from '../enums/roles.enum';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class AuthService extends CommonRepository<Auth> {
  protected readonly modelName: string = Auth.name;

  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {
    super(authModel);
  }

  private async generatePasswordAndHash(password: string): Promise<string> {
    const passwordSalt = await bcrypt.genSalt(
      this.configService.get('BCRYPT_ROUNDS'),
    );
    return await bcrypt.hash(password, passwordSalt);
  }

  private generateAccessToken(userId: Types.ObjectId, role: RolesEnum): string {
    return this.jwtService.sign(
      { userId, role },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      },
    );
  }

  async login(loginDto: LoginDto, role: RolesEnum): Promise<string> {
    const auth: Auth = await this.findOne({ email: loginDto.email, role });
    if (!auth) {
      throw new NotFoundException(`No ${role.toLowerCase()} with this email`);
    }
    const isValid: boolean = await bcrypt.compare(
      loginDto.password,
      auth.password,
    );
    if (isValid) {
      return this.generateAccessToken(auth.userId, role);
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async signupDocotr(signUpDto: SignUpDoctorDto): Promise<Auth> {
    const doctorAuth: Auth = await this.findOne({
      email: signUpDto.email,
      role: RolesEnum.DOCTOR,
    });
    if (doctorAuth) {
      throw new ConflictException('Email already used');
    }
    const hashedPassword: string = await this.generatePasswordAndHash(
      signUpDto.password,
    );
    const doctorId = await this.doctorService.createDoctor(signUpDto);
    return await this.create({
      email: signUpDto.email,
      password: hashedPassword,
      role: RolesEnum.DOCTOR,
      userId: doctorId,
    });
  }
  async signupPatient(signUpDto: SignUpPatientDto): Promise<Auth> {
    const patientAuth: Auth = await this.findOne({
      email: signUpDto.email,
      role: RolesEnum.PATIENT,
    });
    if (patientAuth) {
      throw new ConflictException('Email already used');
    }
    const hashedPassword: string = await this.generatePasswordAndHash(
      signUpDto.password,
    );
    const patientId = await this.patientService.createPatient(signUpDto);
    return await this.create({
      email: signUpDto.email,
      password: hashedPassword,
      role: RolesEnum.PATIENT,
      userId: patientId,
    });
  }
}
