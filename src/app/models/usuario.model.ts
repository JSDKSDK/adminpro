export class Usuario{
    constructor(
        public nombre:string,
        public email:string,
        public password:string,
        public img?:string,
        public role?:string,
        public google?:boolean,
        public _id?:string,

    ){}
}

//====================================
//Si un elemento es marcado como ?
//todos los demás deben ser iguales
// o tner un default
//====================================
