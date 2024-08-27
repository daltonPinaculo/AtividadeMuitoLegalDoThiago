import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/persistence/database/prisma.module';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtAuthGuard } from './auth/guards/jwt.guards';
import { ResponseDto } from './dto/response.dto';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ResponseDto
  ],
  controllers: [UsuariosController,AuthController], // Registrando o controlador
  providers: [UsuariosService,JwtAuthGuard], // Registrando o serviço
})
export class AppModule {}
