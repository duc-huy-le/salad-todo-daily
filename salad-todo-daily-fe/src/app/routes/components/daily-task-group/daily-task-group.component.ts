import { Component, OnInit, ViewChild } from '@angular/core';
import { DailyTask } from 'src/app/models/DailyTask';
import { DailyTaskService } from 'src/app/services/daily-task/daily-task.service';
import { TaskTagService } from 'src/app/services/task-tag/task-tag.service';
import { AddDailyTaskModalComponent } from './add-daily-task-modal/add-daily-task-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { OrderIndexService } from 'src/app/services/order-index/order-index.service';

@Component({
  selector: 'app-daily-task-group',
  templateUrl: './daily-task-group.component.html',
  styleUrls: ['./daily-task-group.component.css'],
})
export class DailyTaskGroupComponent implements OnInit {
  @ViewChild('addDailyTaskModal')
  addDailyTaskModal!: AddDailyTaskModalComponent;
  listDailyTask: DailyTask[] = [];
  totalTaskDaily?: number;
  completedTaskDaily?: number;
  dailyTaskOrder: any;
  newOrderIndex: number[] = [];
  constructor(
    private dailyTaskService: DailyTaskService,
    private msg: NzMessageService,
    private orderIndexService: OrderIndexService
  ) {}

  async ngOnInit(): Promise<void> {
    // await this.getAllTaskDaily();
    await this.getDailyTaskOrder();
  }

  async getDailyTaskOrder() {
    this.orderIndexService.getAll().subscribe((res) => {
      this.dailyTaskOrder = res.find((item) => item.type === 'daily-task');

      this.sortDailyTask(this.dailyTaskOrder?.orderList);
    });
  }
  sortDailyTask(dailyTaskOrderList: any[]): void {
    this.listDailyTask = this.listDailyTask?.sort((a, b) => {
      const indexA = dailyTaskOrderList.indexOf(a.id);
      const indexB = dailyTaskOrderList.indexOf(b.id);
      return indexA - indexB;
    });
  }
  async getAllTaskDaily() {
    this.dailyTaskService.getAllTaskDailyToday().subscribe((dailyTask) => {
      this.listDailyTask = dailyTask;
      this.setDailyTaskAmount();
    });
  }

  openAddTaskDailyModal() {
    this.addDailyTaskModal.isVisible = true;
  }

  setDailyTaskAmount() {
    this.totalTaskDaily = this.listDailyTask?.length;
    this.completedTaskDaily = this.listDailyTask?.filter(
      (item) => item.checked === true
    ).length;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.listDailyTask,
      event.previousIndex,
      event.currentIndex
    );
    this.newOrderIndex = this.listDailyTask.map(item => item.id);
    this.orderIndexService.updatePropByType("daily-task", {orderList: this.newOrderIndex}).toPromise().then((res) => {
    });
  }
}
