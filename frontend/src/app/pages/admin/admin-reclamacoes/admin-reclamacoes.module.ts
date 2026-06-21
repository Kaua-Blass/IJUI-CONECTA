import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminReclamacoesPage } from './admin-reclamacoes.page';

const routes: Routes = [{ path: '', component: AdminReclamacoesPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [AdminReclamacoesPage]
})
export class AdminReclamacoesPageModule {}
