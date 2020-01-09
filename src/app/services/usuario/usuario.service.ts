import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import  "rxjs/add/operator/map";
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router:Router
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

}
