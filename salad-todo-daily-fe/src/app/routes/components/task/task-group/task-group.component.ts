import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task/task.service';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { TaskStatus } from '../task-item/task-item.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { LoadingService } from 'src/app/services/common/loading/loading.service';
import { OrderIndexService } from 'src/app/services/order-index/order-index.service';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.css'],
})
export class TaskGroupComponent implements OnInit {
  @ViewChild('addTaskModal') addTaskModal!: AddTaskModalComponent;
  @Input() filterFormValue: any;
  readonly TaskStatus = TaskStatus;
  listTask: Task[] = [];
  listOpenTask: Task[] = [];
  listInProgressTask: Task[] = [];
  listDoneTask: Task[] = [];
  openDuration: string = '';
  inProgressDuration: string = '';
  doneDuration: string = '';

  constructor(
    private taskService: TaskService,
    private msg: NzMessageService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private orderIndexService: OrderIndexService
  ) {}

  async ngOnInit(): Promise<void> {
    // await this.getAllTask();
    // this.sendMessageToTelegram();
  }

  ngOnChanges() {
    this.getAllTask();
  }
  async getAllTask() {
    this.loadingService.setLoading(true);
    const queryParam = {
      ...this.filterFormValue,
      projectId:
        this.filterFormValue.projectId.length > 0
          ? this.filterFormValue.projectId
          : null,
    };
    await this.taskService
      .getAllTask(queryParam)
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.listTask = res?.result;
          this.listTask = this.listTask.filter(
            (item) =>
              new Date(item.startDate) <= new Date() &&
              (!item.finishDate || new Date(item.finishDate) >= new Date())
          );
          // this.listTask = this.listTask.sort((a, b) => b.priority - a.priority);
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
          this.loadingService.setLoading(false);
        } else {
          this.msg.error('Có lỗi xảy ra. Không thể lấy danh sách công việc.');
        }
      });
  }

  openAddTaskModal(taskStatus: TaskStatus) {
    this.addTaskModal.isVisible = true;
    this.addTaskModal.addTaskForm.get('status')?.patchValue(taskStatus);
  }

  sendMessageToTelegram() {
    const ENTER = '%0A';
    let message = '';
    if (this.listOpenTask && this.listOpenTask.length > 0) {
      message += `<b><u>Bạn còn ${this.listOpenTask?.length} việc chưa thực hiện:</u></b>`;
      this.listOpenTask?.forEach((task) => {
        message += `${ENTER}- ${task.name}`;
      });
    }
    if (this.listInProgressTask && this.listInProgressTask.length > 0) {
      message += `${ENTER}${ENTER}<b><u>Và ${this.listInProgressTask?.length} việc đang thực hiện:</u></b>`;
      this.listInProgressTask?.forEach((task) => {
        message += `${ENTER}> ${task.name}`;
      });
    }
    if (message != '') {
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

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let newOrderIndex;
      let taskType = '';
      switch (event.container.id) {
        case 'cdk-drop-list-1':
          taskType = 'open-task';
          newOrderIndex = this.listOpenTask.map((item) => item.id);
          break;
        case 'cdk-drop-list-2':
          taskType = 'in-progress-task';
          newOrderIndex = this.listInProgressTask.map((item) => item.id);
          break;
        case 'cdk-drop-list-3':
          taskType = 'done-task';
          newOrderIndex = this.listDoneTask.map((item) => item.id);
          break;
        default:
          break;
      }
      this.orderIndexService
        .updatePropByType(taskType, { orderList: newOrderIndex })
        .toPromise()
        .then((res) => {});
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let droppedTask;
      let newStatus;
      let newOrderIndex;
      let newTaskType = '';
      let previousOrderIndex;
      let previousTaskType = '';
      switch (event.container.id) {
        case 'cdk-drop-list-1':
          droppedTask = this.listOpenTask[event.currentIndex];
          newStatus = TaskStatus.Open;
          newOrderIndex = this.listOpenTask.map((item) => item.id);
          newTaskType = 'open-task';
          break;
        case 'cdk-drop-list-2':
          droppedTask = this.listInProgressTask[event.currentIndex];
          newStatus = TaskStatus.InProgress;
          newOrderIndex = this.listInProgressTask.map((item) => item.id);
          newTaskType = 'in-progress-task';
          break;
        case 'cdk-drop-list-3':
          droppedTask = this.listDoneTask[event.currentIndex];
          newStatus = TaskStatus.Done;
          newOrderIndex = this.listDoneTask.map((item) => item.id);
          newTaskType = 'done-task';
          break;
        default:
          break;
      }
      switch (event.previousContainer.id) {
        case 'cdk-drop-list-1':
          previousOrderIndex = this.listOpenTask.map((item) => item.id);
          previousTaskType = 'open-task';
          break;
        case 'cdk-drop-list-2':
          previousOrderIndex = this.listInProgressTask.map((item) => item.id);
          previousTaskType = 'in-progress-task';
          break;
        case 'cdk-drop-list-3':
          previousOrderIndex = this.listDoneTask.map((item) => item.id);
          previousTaskType = 'done-task';
          break;
        default:
          break;
      }
      this.taskService
        .updatePropTask(droppedTask?.id, { status: newStatus })
        .toPromise()
        .then((res) => {});
      this.orderIndexService
        .updatePropByType(newTaskType, { orderList: newOrderIndex })
        .toPromise();
      this.orderIndexService
        .updatePropByType(previousTaskType, { orderList: previousOrderIndex })
        .toPromise();
    }
  }
}
