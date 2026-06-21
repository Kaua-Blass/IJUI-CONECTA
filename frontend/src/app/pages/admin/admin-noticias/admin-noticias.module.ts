import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminNoticiasPage } from './admin-noticias.page';

const routes: Routes = [{ path: '', component: AdminNoticiasPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [AdminNoticiasPage]
})
export class AdminNoticiasPageModule {}
