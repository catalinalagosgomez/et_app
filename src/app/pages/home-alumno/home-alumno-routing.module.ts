import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAlumnoPage } from './home-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAlumnoPageRoutingModule {}
