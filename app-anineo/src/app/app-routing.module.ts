import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AcercadeComponent } from './acercade/acercade.component';
import { AnimeComponent } from './anime/anime.component';
import { CrearAnimesComponent } from './crear-animes/crear-animes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'acercade', component: AcercadeComponent },
  { path: 'anime/:id', component: AnimeComponent },
  { path: 'crearanime', component: CrearAnimesComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
