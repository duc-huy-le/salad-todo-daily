import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardScreenComponent } from './routes/home/dashboard-screen/dashboard-screen.component';
import { ProjectScreenComponent } from './routes/home/project-screen/project-screen.component';
import { DashboardContentComponent } from './routes/components/dashboard/dashboard-content/dashboard-content.component';
import { LoginScreenComponent } from './routes/auth/login-screen/login-screen.component';
import { AuthGuard } from './shared/auth.guard';
import { DailyTaskScreenComponent } from './routes/home/daily-task-screen/daily-task-screen.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/dashboard' },
  { path: 'login', component: LoginScreenComponent},
  {
    path: 'home',
    component: DashboardScreenComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardContentComponent },
      { path: 'project', component: ProjectScreenComponent },
      { path: 'daily-task', component: DailyTaskScreenComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
