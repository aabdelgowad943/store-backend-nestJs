import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Public } from './public.decorator';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';

// @UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @ApiBearerAuth('token')
  @Public()
  @Post('register')
  register(@Body() registerDto: Register) {
    return this.authService.register(registerDto);
  }

  // @ApiBearerAuth('token')
  @Public()
  @Post('login')
  login(@Body() loginDto: Login) {
    return this.authService.login(loginDto);
  }
}
