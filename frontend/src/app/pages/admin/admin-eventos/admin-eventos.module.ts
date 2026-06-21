import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminEventosPage } from './admin-eventos.page';

const routes: Routes = [{ path: '', component: AdminEventosPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [AdminEventosPage]
})
export class AdminEventosPageModule {}
