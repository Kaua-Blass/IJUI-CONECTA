import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminEventoFormPage } from './admin-evento-form.page';

const routes: Routes = [{ path: '', component: AdminEventoFormPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [AdminEventoFormPage]
})
export class AdminEventoFormPageModule {}
