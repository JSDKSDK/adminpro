import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import  "rxjs/add/operator/map";
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-Archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router:Router,
    public _subirArchivoService:SubirArchivoService
  ) { this.cargarStorage();}
  estaLogueado(){
      return (this.token.length>5)?true:false;
  }
  cargarStorage(){
    if (localStorage.getItem('token')) {
      
      this.token=localStorage.getItem('token');
      this.usuario=JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token='';
      this.usuario=null;
    }
  }
  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }
  logout(){
    this.usuario=null;
    this.token='';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);

  }
  loginGoogle(token: string) {
    let url = environment.URL_Back + 'login/google';
    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        Swal.fire(
          'Bienvenido!',
          resp.Usuario.email,
          'success'
        )
        this.guardarStorage(resp.id, resp.token, resp.Usuario)
        return true;
      }));
  }
  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = environment.URL_Back + 'login';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        Swal.fire(
          'Bienvenido!',
          usuario.email,
          'success'
        )
        this.guardarStorage(resp.id, resp.token, resp.Usuario)
        return true;
      }));
  }
  crearUsuario(usuario: Usuario) {
    let url = environment.URL_Back + 'usuario';

    return this.http.post(url, usuario).pipe(map((resp: any) => {
      Swal.fire(
        'Usuario Creado!',
        usuario.email,
        'success'
      )
      return resp.usuario;
    }));
  }
  updateUsuario(usuario:Usuario){
    let url = environment.URL_Back + 'usuario/'+usuario._id;
    url+='?token='+this.token;

     return this.http.put(url,usuario)  
      .pipe(map((resp:any)=>{
        let usuarioDB:Usuario=resp.usuario;
    this.guardarStorage(usuarioDB._id,this.token,usuarioDB);
        Swal.fire(
          'Usuario Actualizado!',usuario.nombre,
          'success'
        )
        return true;
      }));
  }
cambiarImagen(archivo:File,id:string){
    this._subirArchivoService.subirArchivo(archivo,'usuarios',id)
      .then((resp:any)=>{
          console.log(resp);
          this.usuario.img=resp.usuario.img;
          Swal.fire(
            'Imangen Actualizado!',this.usuario.nombre,
            'success'
          );
          this.guardarStorage(id,this.token,this.usuario)
      })
      .catch(resp=>{
        console.log(resp);

      });
}
}
