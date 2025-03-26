import { Request } from 'express';
import { AuthRequest, AuthResponse, RegisterRequest, User } from '../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthService {
  async login(credentials: AuthRequest): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { username: credentials.username }
    });
    
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: `ROLE_${user.role}` },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: `ROLE_${user.role}` as User['role'],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  }

  async register(userData: RegisterRequest): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { username: userData.username }
    });
    
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: 'USER',
      }
    });

    return {
      ...newUser,
      role: `ROLE_${newUser.role}` as User['role']
    };
  }

  async logout(req: Request): Promise<void> {
    // In a real application, you might want to invalidate the token
    // or implement a token blacklist
    return Promise.resolve();
  }
}

export const authService = new AuthService(); 