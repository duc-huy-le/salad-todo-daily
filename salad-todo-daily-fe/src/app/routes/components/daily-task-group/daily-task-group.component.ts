import { Component, OnInit, ViewChild } from '@angular/core';
import { DailyTask } from 'src/app/models/DailyTask';
import { DailyTaskService } from 'src/app/services/daily-task/daily-task.service';
import { TaskTagService } from 'src/app/services/task-tag/task-tag.service';
import { AddDailyTaskModalComponent } from './add-daily-task-modal/add-daily-task-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-daily-task-group',
  templateUrl: './daily-task-group.component.html',
  styleUrls: ['./daily-task-group.component.css'],
})
export class DailyTaskGroupComponent implements OnInit {
  @ViewChild('addDailyTaskModal')
  addDailyTaskModal!: AddDailyTaskModalComponent;
  listTaskDaily?: DailyTask[];
  totalTaskDaily?: number;
  completedTaskDaily?: number;
  constructor(
    private taskDailyService: DailyTaskService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getAllTaskDaily();
  }

  getAllTaskDaily() {
    this.taskDailyService.getAllTaskDailyToday().subscribe((dailyTask) => {
      this.listTaskDaily = dailyTask;
      this.setDailyTaskAmount();
    });
  }

  openAddTaskDailyModal() {
    this.addDailyTaskModal.isVisible = true;
  }

  setDailyTaskAmount() {
    this.totalTaskDaily = this.listTaskDaily?.length;
    this.completedTaskDaily = this.listTaskDaily?.filter(
      (item) => item.checked === true
    ).length;
  }
}
