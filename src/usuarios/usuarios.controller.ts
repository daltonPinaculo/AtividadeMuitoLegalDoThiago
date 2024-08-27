import { Body, Controller, Get, ParseIntPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosDto, UsuariosListagemDto } from './dto/usuarios.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('/usuarios')
export class UsuariosController {
  constructor(private readonly appService: UsuariosService) {}

  @Post('/cadastro')
  async cadastro(@Body() usuariosDto: UsuariosDto){
    return await this.appService.saveUser(usuariosDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('listar')
  async listar(
  @Query('page',ParseIntPipe) page:number = 1,
  @Query('limit',ParseIntPipe) limit:number = 10,
  @Query('search') search:string) : Promise<ResponseDto>{
    const lista = await this.appService.getUsersList({page:page,limit:limit,search:search});
    return {data: lista,message: lista.length>0 ? "Usuarios listados com sucesso" : "Listagem vazia"}
  }

}
