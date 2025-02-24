import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy, JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [UsersModule, JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtRefreshStrategy, JwtStrategy],
})
export class AuthModule { }
