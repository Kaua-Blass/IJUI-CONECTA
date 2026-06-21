import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NovaIdeiaPage } from './nova-ideia.page';

const routes: Routes = [{ path: '', component: NovaIdeiaPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [NovaIdeiaPage]
})
export class NovaIdeiaPageModule {}
