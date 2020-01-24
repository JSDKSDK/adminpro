import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }


  subirArchivo(archivo:File,tipo:string,id:string){
    return new Promise((resolve,reject)=>{

      let formData=new FormData();
      let xhr= new XMLHttpRequest();
      formData.append('imagen',archivo,archivo.name);
  
      xhr.onreadystatechange=function () {
        if (xhr.readyState===4) {
          if (xhr.status===200) {
            console.log('Imagen Subida');
          resolve (JSON.parse(xhr.response));
          
          }else{
            console.log('Fallo la subida');
            reject(xhr.response);
            
          }
          
        }
        
      };

    
      let url = environment.URL_Back + 'upload/'+tipo+'/'+id;
      console.log(url);
      //localhost:3000/upload/usuarios/5e17559087d7b77f98b98c3e
      
      xhr.open('PUT',url,true);
      xhr.send(formData);''
    });
  }
}
