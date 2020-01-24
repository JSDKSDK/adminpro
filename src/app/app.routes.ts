
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './login/registrer.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const appRoutes: Routes =[

  {path: 'login',component :LoginComponent,data:[{titulo:'Login'},{descripcion:'Login para el Usuario'}]},
  {path: 'registrer',component:RegistrerComponent,data:[{titulo:'REGISTRER'},{descripcion:'Registro para el Usuario'}]},
  {path:'**',component:NopagefoundComponent}


];
export const APP_ROUTES= RouterModule.forRoot(appRoutes,{useHash:true});
