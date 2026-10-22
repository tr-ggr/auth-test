import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { SupabaseStrategy } from './strategies/supabase.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: 40000 },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthGuard, AuthService, SupabaseService],
  controllers: [AuthController, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
