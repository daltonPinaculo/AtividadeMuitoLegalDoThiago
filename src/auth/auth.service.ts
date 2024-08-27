import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuariosDto } from 'src/usuarios/dto/usuarios.dto';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async login(user: UsuariosDto) : Promise<ResponseDto> {
    
    const usuarioLogin = await this.usersService.getUserByLogin(user);
    console.log(usuarioLogin)
   
    if(usuarioLogin==null)                        return {data:{},message:"Não existe usuario com este email"}
    if(usuarioLogin.password != user.password)    return {data:{},message:"Senha incorreta"};
    
    const payload = { email: usuarioLogin.email, name: usuarioLogin.name };
    console.log(payload)
    return {
      data:{  
        access_token: this.jwtService.sign(payload),
      },
      message: "Login bem sucedido"
    };

  }
}
