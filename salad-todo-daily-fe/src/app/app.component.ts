import { Component } from '@angular/core';
import { TaskTagService } from './services/task-tag/task-tag.service';
import { TaskTag } from './models/TaskTag';
import { NotificationService } from './services/notification/notification.service';
import { AuthService } from './shared/auth.service';
import { LoadingService } from './services/common/loading/loading.service';
import { DeviceService } from './services/device/device.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Quản lý công việc Salad Task';
  isLoading: boolean = false;
  loadingMessage: string = 'Đang lấy dữ liệu...';
  listTaskTag?: TaskTag[];

  constructor(
    private notificationService: NotificationService,
    // private authService: AuthService,
    private loadingService: LoadingService,
    private deviceService: DeviceService
  ) {
    // this.authService.checkSession();
    // this.authService.getUserInfo().toPromise().then((res) => {
    // });
    this.loadingService.loading$.subscribe(data => {
      this.isLoading = data;
    })
  }
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.sendMessageToTelegram();
    // }, 10000);
  }

  sendMessageToTelegram() {
    this.notificationService
      .sendMessage('5426764053', 'adsf\nALoo')
      .toPromise()
      .then((res) => {});
  }
}
