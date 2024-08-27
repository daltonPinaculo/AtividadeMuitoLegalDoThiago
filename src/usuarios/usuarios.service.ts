import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistence/database/prisma.service';
import { UsuariosDto, UsuariosListagemDto } from './dto/usuarios.dto';
import sanitizar from 'src/utils/sanitezer';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly prismaService: PrismaService ,
  ) {}



  async saveUser(usuarioDto: UsuariosDto) {
    
    try{

        if(!sanitizar.validate_email(usuarioDto.email))                 return {message:"Email invalido"}
        if(!sanitizar.validate_senhaForte(usuarioDto.password))         return {message:"Senha não é forte suficiente"}
        if(!sanitizar.validate_string(usuarioDto.name,3))         return {message:"Nome de usuario deve conter pelo menos 3 caracteres"}

         const user = await this.prismaService.user.create({
          data:{
            email: usuarioDto.email,
            password: usuarioDto.password,
            name:usuarioDto.name
          },
          select:{
            email:true,
            name:true,
            id:true,
          }
        });
        return {data:user,message:"Usuário cadastrado com sucesso"};
    }
    catch(err){
      return {message:err};
    }
    
  }

  async getUserByLogin(usuarioDto: UsuariosDto){

    return await this.prismaService.user.findUnique({
          where:{
            email: usuarioDto.email
          }
      })
  }

  async getUsersList(listagemUsuario: UsuariosListagemDto){
    console.log(listagemUsuario)
    return await this.prismaService.user.findMany(
      {
      skip:(listagemUsuario.page-1)*listagemUsuario.limit,
      take: listagemUsuario.limit,
      where: {
        name: {
          contains: listagemUsuario.search, 
          mode: 'insensitive', 
      },  
    }})

  }

}
