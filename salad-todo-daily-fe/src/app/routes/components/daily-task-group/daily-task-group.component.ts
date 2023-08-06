import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskDaily } from 'src/app/models/TaskDaily';
import { TaskDailyService } from 'src/app/services/task-daily/task-daily.service';
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
  listTaskDaily?: TaskDaily[];
  totalTaskDaily?: number;
  completedTaskDaily?: number;
  constructor(
    private taskDailyService: TaskDailyService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getAllTaskDaily();
  }

  getAllTaskDaily() {
    this.taskDailyService
      .getAllTaskDailyToday()
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.listTaskDaily = res.result;
          this.setDailyTaskAmount();
        } else {
          this.msg.error(
            'Có lỗi xảy ra. Không thể lấy danh sách công việc hàng ngày.'
          );
        }
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
