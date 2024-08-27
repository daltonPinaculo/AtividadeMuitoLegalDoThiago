import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtAuthGuard } from './guards/jwt.guards';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' }, 
    }),
  ],
  providers: [AuthService,JwtAuthGuard],
  exports: [AuthService,JwtAuthGuard,JwtModule],
})
export class AuthModule {}
