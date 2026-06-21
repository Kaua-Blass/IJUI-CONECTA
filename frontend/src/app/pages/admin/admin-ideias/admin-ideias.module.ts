import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminIdeiasPage } from './admin-ideias.page';

const routes: Routes = [{ path: '', component: AdminIdeiasPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [AdminIdeiasPage]
})
export class AdminIdeiasPageModule {}
