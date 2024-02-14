import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/v1/users/users.module';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  imports: [UsersModule],
  controllers: [AuthController]
})
export class AuthModule { }
