import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuth } from './dto/user-auth.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() userAuth: UserAuth) {
    return this.authService.login(userAuth);
  }

  @Post('/signup')
  async signup(@Body() userAuth: UserAuth) {
    return this.authService.signup(userAuth);
  }

  @Post('/logout')
  async logout() {
    return this.authService.logout();
  }

  @Get('/profile')
  async profile() {
    return this.authService.getProfile();
  }

  @Post('/update')
  async saveProfile(@Body() updateProfile: UpdateProfileDTO) {
    return this.authService.updateProfile(updateProfile);
  }
}
