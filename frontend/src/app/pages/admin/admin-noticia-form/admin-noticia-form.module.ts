import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminNoticiaFormPage } from './admin-noticia-form.page';

const routes: Routes = [{ path: '', component: AdminNoticiaFormPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [AdminNoticiaFormPage]
})
export class AdminNoticiaFormPageModule {}
