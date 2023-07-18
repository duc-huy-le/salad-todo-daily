import { Component, OnInit, ViewChild } from '@angular/core';
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
  listTask: Task[] = [];
  listOpenTask?: Task[];
  listInProgressTask?: Task[];
  listDoneTask?: Task[];

  constructor(
    private taskService: TaskService,
    private msg: NzMessageService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAllTask();
  }

  async getAllTask() {
    // const response = await this.taskService.getAllTask().toPromise();
    await this.taskService
      .getAllTask()
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.listTask = res?.result;
          this.listTask = this.listTask.sort((a, b) => b.priority - a.priority);
          this.listOpenTask = this.listTask.filter((item) => {
            return (
              item.status === TaskStatus.Open &&
              new Date(item.startDate) <= new Date() &&
              (!item.finishDate || new Date(item.finishDate) >= new Date())
            );
          });
          this.listInProgressTask = this.listTask.filter((item) => {
            return (
              item.status === TaskStatus.InProgress &&
              new Date(item.startDate) <= new Date() &&
              (!item.finishDate || new Date(item.finishDate) >= new Date())
            );
          });
          this.listDoneTask = this.listTask.filter((item) => {
            return (
              item.status === TaskStatus.Done &&
              new Date(item.startDate) <= new Date() &&
              (!item.finishDate || new Date(item.finishDate) >= new Date())
            );
          });
        } else {
          this.msg.error('Có lỗi xảy ra. Không thể lấy danh sách công việc.');
        }
      });
  }

  openAddTaskModal() {
    this.addTaskModal.isVisible = true;
  }

  sendMessageToTelegram() {
    var listTodoTitle = this.listOpenTask?.map((task) => task.name);
    var todoList = listTodoTitle?.join(', ');
    todoList = 'Bạn còn các công việc sau chưa hoàn thành: ' + todoList;
    this.notificationService
      .sendMessage('5426764053', todoList ?? '')
      .toPromise()
      .then((res) => {});
  }
}
