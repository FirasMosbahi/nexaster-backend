import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { MedicalStatusModule } from './medical.status/medical.status.module';
import { VisitModule } from './visit/visit.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        BCRYPT_ROUNDS: Joi.number().required(),
        S3_ACCESS_KEY_ID: Joi.string().required(),
        S3_SECRET_ACCESS_KEY: Joi.string().required(),
        S3_BUCKET_NAME: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_HOST'),
      }),
    }),
    CommonModule,
    AuthModule,
    PatientModule,
    DoctorModule,
    MedicalStatusModule,
    VisitModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
