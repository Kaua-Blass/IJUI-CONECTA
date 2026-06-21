import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardPage } from './admin-dashboard.page';

const routes: Routes = [{ path: '', component: AdminDashboardPage }];

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [AdminDashboardPage]
})
export class AdminDashboardPageModule {}
