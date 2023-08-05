import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from './modules/ng-zorro-antd.module';
import { DashboardScreenComponent } from './routes/home/dashboard-screen/dashboard-screen.component';
import { RightSidebarComponent } from './routes/components/right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from './routes/components/left-sidebar/left-sidebar.component';
import { DailyTaskGroupComponent } from './routes/components/daily-task-group/daily-task-group.component';
import { DailyTaskItemComponent } from './routes/components/daily-task-item/daily-task-item.component';
import { NoteGroupComponent } from './routes/components/note/note-group/note-group.component';
import { NoteItemComponent } from './routes/components/note/note-item/note-item.component';
import { NavbarComponent } from './routes/components/navbar/navbar.component';
import { ProjectGroupComponent } from './routes/components/project/project-group/project-group.component';
import { AddDailyTaskModalComponent } from './routes/components/daily-task-group/add-daily-task-modal/add-daily-task-modal.component';
import { AddProjectModalComponent } from './routes/components/project/add-project-modal/add-project-modal.component';
import { DashboardContentComponent } from './routes/components/dashboard/dashboard-content/dashboard-content.component';
import { TaskGroupComponent } from './routes/components/task/task-group/task-group.component';
import { TaskItemComponent } from './routes/components/task/task-item/task-item.component';
import { AddTaskModalComponent } from './routes/components/task/add-task-modal/add-task-modal.component';
import { ProjectScreenComponent } from './routes/home/project-screen/project-screen.component';
import { LoginScreenComponent } from './routes/auth/login-screen/login-screen.component';
import { UserInfoComponent } from './routes/components/user-info/user-info.component';
import { TagManagementComponent } from './routes/home/project-screen/tag-management/tag-management.component';
import { TaskDailyManagementComponent } from './routes/home/project-screen/task-daily-management/task-daily-management.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardScreenComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    DailyTaskGroupComponent,
    DailyTaskItemComponent,
    NoteGroupComponent,
    NoteItemComponent,
    NavbarComponent,
    ProjectGroupComponent,
    AddDailyTaskModalComponent,
    AddProjectModalComponent,
    DashboardContentComponent,
    TaskGroupComponent,
    TaskItemComponent,
    AddTaskModalComponent,
    ProjectScreenComponent,
    LoginScreenComponent,
    UserInfoComponent,
    TagManagementComponent,
    TaskDailyManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
