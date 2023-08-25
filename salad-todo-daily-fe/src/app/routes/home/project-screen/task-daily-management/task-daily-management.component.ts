import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DailyTask } from 'src/app/models/DailyTask';
import { AddDailyTaskModalComponent, DailyTaskModalViewMode } from 'src/app/routes/components/daily-task-group/add-daily-task-modal/add-daily-task-modal.component';
import { DailyTaskService } from 'src/app/services/daily-task/daily-task.service';

@Component({
  selector: 'app-task-daily-management',
  templateUrl: './task-daily-management.component.html',
  styleUrls: ['./task-daily-management.component.css']
})
export class TaskDailyManagementComponent implements OnInit {
  @ViewChild('addDailyTaskModal') addDailyTaskModal!: AddDailyTaskModalComponent;
  taskDailyList: DailyTask[] = [];

  constructor(
    private dailyTaskService: DailyTaskService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getTaskDailyList();
  }
  getTaskDailyList() {
    this.dailyTaskService.getAllTaskDaily().subscribe((dailyTaskList: any) => {
        this.taskDailyList = dailyTaskList;
    })
  }

  transformDailyTaskData(taskDailyItem: DailyTask): void {
    // taskDailyItem.tagName
  }

  openAddModal(): void {
    this.addDailyTaskModal.viewMode = DailyTaskModalViewMode.Create;
    this.addDailyTaskModal.isVisible = true;
    this.addDailyTaskModal.setDefaultValue();
  }

  onClickEdit(data: DailyTask) {
    this.addDailyTaskModal.dailyTask = data;
    this.addDailyTaskModal.viewMode = DailyTaskModalViewMode.Edit;
    this.addDailyTaskModal.addDailyTaskForm.patchValue(data);
    this.addDailyTaskModal.isVisible = true;
  }

  deleteDailyTask(dailyTaskId: any) {
    const payload = {
      isDeleted: 1,
    };
    this.dailyTaskService.updatePropTaskDaily(dailyTaskId, payload).toPromise().then((res: any) => {
      if(res && res.result) {
        this.msg.success('Xóa thói quen thành công!');
        this.getTaskDailyList();
      } else {
        this.msg.error("Có lỗi xảy ra. Không thể xóa thói quen");
      }
    })
  }

}
