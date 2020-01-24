import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//Routes
import { APP_ROUTES } from './app.routes';

//Modulos
import { PagesModule } from './pages/pages.module';

//servicios
import { ServiceModule } from './services/service.module';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './login/registrer.component';

//temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrerComponent
   ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
