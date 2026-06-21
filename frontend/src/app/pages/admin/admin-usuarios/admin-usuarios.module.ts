import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminUsuariosPage } from './admin-usuarios.page';

const routes: Routes = [{ path: '', component: AdminUsuariosPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [AdminUsuariosPage]
})
export class AdminUsuariosPageModule {}
