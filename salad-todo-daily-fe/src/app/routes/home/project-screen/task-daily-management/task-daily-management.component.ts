import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskDaily } from 'src/app/models/TaskDaily';
import { AddDailyTaskModalComponent, DailyTaskModalViewMode } from 'src/app/routes/components/daily-task-group/add-daily-task-modal/add-daily-task-modal.component';
import { TaskDailyService } from 'src/app/services/task-daily/task-daily.service';

@Component({
  selector: 'app-task-daily-management',
  templateUrl: './task-daily-management.component.html',
  styleUrls: ['./task-daily-management.component.css']
})
export class TaskDailyManagementComponent implements OnInit {
  @ViewChild('addDailyTaskModal') addDailyTaskModal!: AddDailyTaskModalComponent;
  taskDailyList: TaskDaily[] = [];

  constructor(
    private taskDailyService: TaskDailyService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getTaskDailyList();
  }
  getTaskDailyList() {
    this.taskDailyService.getAllTaskDaily().toPromise().then((res: any) => {
      if(res && res.result) {
        this.taskDailyList = res.result;
      } else {
        this.msg.error("Có lỗi xảy ra. Không thể lấy danh sách thói quen.");
      }
    })
  }

  transformDailyTaskData(taskDailyItem: TaskDaily): void {
    // taskDailyItem.tagName
  }

  openAddModal(): void {
    this.addDailyTaskModal.viewMode = DailyTaskModalViewMode.Create;
    this.addDailyTaskModal.isVisible = true;
    this.addDailyTaskModal.setDefaultValue();
  }

  onClickEdit(data: TaskDaily) {
    this.addDailyTaskModal.dailyTask = data;
    this.addDailyTaskModal.viewMode = DailyTaskModalViewMode.Edit;
    this.addDailyTaskModal.addDailyTaskForm.patchValue(data);
    this.addDailyTaskModal.isVisible = true;
  }

  deleteDailyTask(dailyTaskId: any) {
    const payload = {
      isDeleted: 1,
    };
    this.taskDailyService.updatePropTaskDaily(dailyTaskId, payload).toPromise().then((res: any) => {
      if(res && res.result) {
        this.msg.success('Xóa thói quen thành công!');
        this.getTaskDailyList();
      } else {
        this.msg.error("Có lỗi xảy ra. Không thể xóa thói quen");
      }
    })
  }

}
