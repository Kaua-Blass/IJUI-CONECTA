import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EventoDetalhePage } from './evento-detalhe.page';

const routes: Routes = [{ path: '', component: EventoDetalhePage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [EventoDetalhePage]
})
export class EventoDetalhePageModule {}
