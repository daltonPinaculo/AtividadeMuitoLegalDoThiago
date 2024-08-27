
export class UsuariosDto {
    readonly email: string;
    readonly name ?: string;
    readonly password: string;
}


export class UsuariosListagemDto{
    readonly page: number;
    readonly limit: number;
    readonly search ?: string
}