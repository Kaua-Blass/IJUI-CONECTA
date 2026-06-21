import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificacoesPage } from './notificacoes.page';

const routes: Routes = [{ path: '', component: NotificacoesPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [NotificacoesPage]
})
export class NotificacoesPageModule {}
