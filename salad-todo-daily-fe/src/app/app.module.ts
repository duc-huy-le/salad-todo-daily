import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from './modules/ng-zorro-antd.module';
import { DashboardScreenComponent } from './routes/home/dashboard-screen/dashboard-screen.component';
import { RightSidebarComponent } from './routes/components/right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from './routes/components/left-sidebar/left-sidebar.component';
import { DailyTaskGroupComponent } from './routes/components/daily-task-group/daily-task-group.component';
import { DailyTaskItemComponent } from './routes/components/daily-task-item/daily-task-item.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardScreenComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    DailyTaskGroupComponent,
    DailyTaskItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
