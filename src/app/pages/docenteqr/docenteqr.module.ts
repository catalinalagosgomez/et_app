import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteqrPageRoutingModule } from './docenteqr-routing.module';

import { DocenteqrPage } from './docenteqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteqrPageRoutingModule
  ],
  declarations: [DocenteqrPage]
})
export class DocenteqrPageModule {}
