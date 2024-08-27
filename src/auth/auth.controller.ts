import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosDto } from 'src/usuarios/dto/usuarios.dto';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/dto/response.dto';


@Controller('/auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('/login')
  async login(@Body() usuariosDto: UsuariosDto) : Promise<ResponseDto>{
    return await this.appService.login(usuariosDto);
}

}
