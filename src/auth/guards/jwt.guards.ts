import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Cadê o token seu caba?");
    }
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Token levemente falsificado");
    }
  }
}
