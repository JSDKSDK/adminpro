import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes:Ajustes={
    temaUrl:'assets/css/colors/default.css',
    tema:'default'
  }
  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }
  guardarAjustes(){
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes))
  }
  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes=JSON.parse(localStorage.getItem('ajustes'));
      this.aplicartema(this.ajustes.tema);
   
    }else{
      this.aplicartema(this.ajustes.tema);

      
    }
  }

  aplicartema(tema:string){
    let url=`assets/css/colors/${tema}.css`//se llama al path del estilo usando el ${} el bastik
    this._document.getElementById('tema').setAttribute('href',url)//hago una referencia al DOM a todo el DOM

    this.ajustes.tema=tema;
    this.ajustes.temaUrl=url;
    this.guardarAjustes();
  }

}

interface Ajustes{
  temaUrl:string;
  tema:string;
}