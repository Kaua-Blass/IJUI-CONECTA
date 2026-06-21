import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalheReclamacaoPage } from './detalhe-reclamacao.page';

const routes: Routes = [{ path: '', component: DetalheReclamacaoPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [DetalheReclamacaoPage]
})
export class DetalheReclamacaoPageModule {}
