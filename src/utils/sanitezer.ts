

class Sanitizer{

    validate_email(email:string) : boolean{
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexEmail.test(email);
    }

    validate_string(string:string,tamanhoMinimo:number) : boolean{
        if(string)  return string.length >= tamanhoMinimo;
        return false;
    }
    
    validate_stringIgual(string:string,string2:string) : boolean{
        if(string===string2)
            return true;
        return false;
    }
    validate_telefone(telefone:string) : boolean{
        let tel = telefone.replace(/[^0-9]/g, '');
    
        if (tel.length === 10 || tel.length === 11) return true; 
        return false; 
        
    }
    validate_senhaForte(senha: string) : boolean{  
        const regexSenhaForte = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
        return regexSenhaForte.test(senha);
    }
    
}

const sanitizar = new Sanitizer();
export default sanitizar;