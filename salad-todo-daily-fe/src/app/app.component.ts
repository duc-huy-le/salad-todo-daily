import { Component } from '@angular/core';
import { TaskTagService } from './services/task-tag/task-tag.service';
import { TaskTag } from './models/TaskTag';
import { NotificationService } from './services/notification/notification.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'salad-todo-daily-fe';
  listTaskTag?: TaskTag[];

  constructor(private taskTagService: TaskTagService,
    private notificationService: NotificationService, private authService: AuthService) {
      // this.authService.checkSession();
      // this.authService.getUserInfo().toPromise().then((res) => {
      // });
    }
  ngOnInit(): void {
    this.getAllTaskTag();
    // this.sendMessageToTelegram();
  }
  getAllTaskTag() {
    this.taskTagService
      .getAllTaskTag()
      .toPromise()
      .then((res: any) => {
        if(res && res.result) {
          this.listTaskTag = res.result;
          localStorage.setItem('listTaskTag', JSON.stringify(res.result));
        }
      });
  }

  sendMessageToTelegram() {
    this.notificationService.sendMessage('5426764053', 'adsf\nALoo').toPromise().then(res => {
    })
  }
}
