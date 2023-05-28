import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardScreenComponent } from './routes/home/dashboard-screen/dashboard-screen.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  {
    path: 'dashboard',
    component: DashboardScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
