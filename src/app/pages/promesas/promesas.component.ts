import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';
import { interval } from 'rxjs';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {



    this.contarTres().then(
      mensaje => console.log("termino!", mensaje)
    )
      .catch(error => console.error('Error en la promesa', error)
      );

  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    let promesa: Promise<boolean> = new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);

        if (contador === 3) {
          // reject('Simplemente un Error');
          resolve( true);

          clearInterval(intervalo)
        }
      }, 1000)
    });

    return promesa;
  }

}
