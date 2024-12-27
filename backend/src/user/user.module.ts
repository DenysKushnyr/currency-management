import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataModule } from 'src/data/data.module';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [DataModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          global: true,
          secret: configService.getOrThrow("JWT_SECRET"),
          signOptions: { expiresIn: '60d' },
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
