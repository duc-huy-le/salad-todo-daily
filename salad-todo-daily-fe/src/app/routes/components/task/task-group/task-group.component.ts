import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task/task.service';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { TaskStatus } from '../task-item/task-item.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.css'],
})
export class TaskGroupComponent implements OnInit {
  @ViewChild('addTaskModal') addTaskModal!: AddTaskModalComponent;
  @Input() filterForm: any;
  listTask: Task[] = [];
  listOpenTask?: Task[];
  listInProgressTask?: Task[];
  listDoneTask?: Task[];
  openDuration: string = '';
  inProgressDuration: string = '';
  doneDuration: string = '';

  constructor(
    private taskService: TaskService,
    private msg: NzMessageService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAllTask();
    // this.sendMessageToTelegram();
  }

  ngOnChanges() {
    this.getAllTask();
  }

  async getAllTask() {
    await this.taskService
      .getAllTask(this.filterForm)
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.listTask = res?.result;
          this.listTask = this.listTask.filter(
            (item) =>
              new Date(item.startDate) <= new Date() &&
              (!item.finishDate || new Date(item.finishDate) >= new Date())
          );
          this.listTask = this.listTask.sort((a, b) => b.priority - a.priority);
          this.listOpenTask = this.listTask.filter(
            (item) => item.status === TaskStatus.Open
          );
          this.openDuration = this.getRemainingTime(this.listOpenTask);
          this.listInProgressTask = this.listTask.filter(
            (item) => item.status === TaskStatus.InProgress
          );
          this.inProgressDuration = this.getRemainingTime(
            this.listInProgressTask
          );
          this.listDoneTask = this.listTask.filter(
            (item) => item.status === TaskStatus.Done
          );
        } else {
          this.msg.error('Có lỗi xảy ra. Không thể lấy danh sách công việc.');
        }
      });
  }

  openAddTaskModal() {
    this.addTaskModal.isVisible = true;
  }

  sendMessageToTelegram() {
    const ENTER = '%0A';
    let message = '';
    if(this.listOpenTask && this.listOpenTask.length > 0) {
      message += `<b><u>Bạn còn ${this.listOpenTask?.length} việc chưa thực hiện:</u></b>`;
      this.listOpenTask?.forEach((task) => {
        message += `${ENTER}- ${task.name}`;
      })
    }
    if(this.listInProgressTask && this.listInProgressTask.length > 0) {
      message += `${ENTER}${ENTER}<b><u>Và ${this.listInProgressTask?.length} việc đang thực hiện:</u></b>`;
      this.listInProgressTask?.forEach((task) => {
        message += `${ENTER}> ${task.name}`;
      })
    }
    if(message != '') {
      this.notificationService
        .sendMessage('5426764053', message)
        .toPromise()
        .then((res) => {});
    }
  }

  getRemainingTime(listTask: any): string {
    let remainingTimeText = '';
    const total = listTask.reduce(
      (sum: number, item: any) => sum + item.duration,
      0
    );
    const hours = Math.floor(total / 60);
    const remainingMinutes = total % 60;
    if (hours != 0) remainingTimeText += `${hours} giờ `;
    if (remainingMinutes != 0) remainingTimeText += `${remainingMinutes} phút`;
    else remainingTimeText.slice(0, -1);
    return remainingTimeText;
  }
}
