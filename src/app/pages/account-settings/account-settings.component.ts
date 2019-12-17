import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
  public _ajustes:SettingsService) { } //en mi caso por la version es necesario importar DOCUMENT desde el common ya no desde el brower

  ngOnInit() {
    this.colocarcheck();
  }
  cambiarColor(tema:string,link:any){
    this.aplicarcheck(link);
    this._ajustes.aplicartema(tema);
    
  }

  aplicarcheck(link:any){
    let selectores:any=document.getElementsByClassName('selector');
    for(let ref of selectores){
      ref.classList.remove('working')
    }
    link.classList.add('working');
  }
  colocarcheck(){
    let selectores:any=document.getElementsByClassName('selector');
    let tema=this._ajustes.ajustes.tema;
    for(let ref of selectores){
      if (ref.getAttribute('data-theme')===tema) {
        ref.classList.add('working');
        break;
        }
    }
  }
}
