import { Component, OnInit } from '@angular/core';
declare function init_plugins();//con esta instruccion se puede llamar a cualquier script de js  que este fuera de angular

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
