import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteqrPage } from './docenteqr.page';

const routes: Routes = [
  {
    path: '',
    component: DocenteqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteqrPageRoutingModule {}
