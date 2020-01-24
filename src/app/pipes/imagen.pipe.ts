import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = environment.URL_Back + 'img';
    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
         url+='/usuarios/'+img;
        break;
      case 'medico':
         url+='/medicos/'+img;

        break;
      case 'hospital':
         url+='/hospital/'+img;

        break;

      default:
        console.log('Tipo de Imagen no existe');
         url +='/usuarios/xxx';

    }


    return url;
  }

}
