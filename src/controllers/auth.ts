import { Request } from 'express';
import { AuthRequest, AuthResponse, RegisterRequest, User } from '../types';
import { authService } from '../services/auth';

class AuthController {
  async login(credentials: AuthRequest): Promise<AuthResponse> {
    return authService.login(credentials);
  }

  async register(userData: RegisterRequest): Promise<User> {
    return authService.register(userData);
  }

  async logout(req: Request): Promise<void> {
    return authService.logout(req);
  }
}

export const authController = new AuthController(); 