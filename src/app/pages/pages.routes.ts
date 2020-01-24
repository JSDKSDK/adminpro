import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';

const pagesRoutes : Routes=[
  {
    path: '',
    component:PagesComponent,
    canActivate:[LoginGuardGuard],
    children:[
      {path: 'dashboard',component: DashboardComponent,data:[{titulo:'Dashboard'},{descripcion:'Descripcion de prueba para una pagina'}]},//de esta manera mando informacion en la ruta y para el meta tag
      {path:'progress',component:ProgressComponent,data:[{titulo:'Progress'},{descripcion:'Progress y view child'}]},
      {path:'graficas1',component:Graficas1Component,data:[{titulo:'Gráficas'},{descripcion:'Gráficas y estadisticas'}]},
      {path:'promesas',component:PromesasComponent,data:[{titulo:'Promesas'},{descripcion:'Uso de Promesas'}]},
      {path:'rxjs',component:RxjsComponent,data:[{titulo:'Rxjs'},{descripcion:'Rxjs'}]},
      {path:'account-settings',component:AccountSettingsComponent,data:[{titulo:'Ajustes'},{descripcion:'Ajustes del Temas del Usuario'}]},
      {path:'perfil',component:ProfileComponent,data:[{titulo:'Perfil'},{descripcion:'Perfil de Usuario'}]},

      

      {path:'',redirectTo:'/dashboard',pathMatch: 'full'},
    ]
  }
];

export const PAGES_ROUTES =RouterModule.forChild(pagesRoutes);
