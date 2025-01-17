import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MondongoComponent } from './mondongo/mondongo.component';
import { AcercadeComponent } from './acercade/acercade.component';
import { CommonModule } from '@angular/common';
import { AnimeComponent } from './anime/anime.component';
import { CrearAnimesComponent } from './crear-animes/crear-animes.component';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarAnimeComponent } from './editar-anime/editar-anime.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    MondongoComponent,
    AcercadeComponent,
    AnimeComponent,
    CrearAnimesComponent,
    LoginComponent,
    CrearUsuarioComponent,
    ListaUsuariosComponent,
    EditarAnimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
