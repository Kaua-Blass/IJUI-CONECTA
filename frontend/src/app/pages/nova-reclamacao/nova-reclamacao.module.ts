import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NovaReclamacaoPage } from './nova-reclamacao.page';

const routes: Routes = [{ path: '', component: NovaReclamacaoPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [NovaReclamacaoPage]
})
export class NovaReclamacaoPageModule {}
