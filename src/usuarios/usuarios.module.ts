import { Module } from '@nestjs/common';
import { PrismaService } from 'src/persistence/database/prisma.service';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { JwtModule } from '@nestjs/jwt';

@Module({
  exports:[UsuariosService,JwtAuthGuard],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '60m' },
    }),],
  controllers: [UsuariosController],
  providers: [UsuariosService,PrismaService,JwtAuthGuard],
})
export class UsuariosModule {}
