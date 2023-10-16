import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DailyTask } from 'src/app/models/DailyTask';
import { TaskTag } from 'src/app/models/TaskTag';
import { TaskDailyHistoryService } from 'src/app/services/task-daily-history/task-daily-history.service';
import { DailyTaskService } from 'src/app/services/daily-task/daily-task.service';
import { TaskTagService } from 'src/app/services/task-tag/task-tag.service';
import { LoadingService } from 'src/app/services/common/loading/loading.service';
import { BaseScreenComponent } from 'src/app/base/base-screen/base-screen.component';

@Component({
  selector: 'app-daily-task-item',
  templateUrl: './daily-task-item.component.html',
  styleUrls: ['./daily-task-item.component.css'],
})
export class DailyTaskItemComponent extends BaseScreenComponent implements OnInit {
  @Input() task?: DailyTask;
  @Output() onDeleteTaskDaily = new EventEmitter();
  @Output() onUpdateTaskDaily = new EventEmitter();
  listTaskTag?: TaskTag[];
  checked: boolean = false;
  constructor(
    private taskTagService: TaskTagService,
    private taskDailyService: DailyTaskService,
    private nzContextMenuService: NzContextMenuService,
    private msg: NzMessageService,
    private taskDailyHistory: TaskDailyHistoryService,
    protected loadingService: LoadingService
  ) {
    super(loadingService);
  }

  ngOnInit(): void {
    this.getAllTaskTag();
  }

  getAllTaskTag() {
    // this.taskTagService.getAllTaskTag().toPromise().then((response) => {
    //   this.listTaskTag = response;
    // })
    // this.listTaskTag = JSON.parse(localStorage.getItem('listTaskTag')!);
    this.taskTagService.getAllTaskTag().subscribe((taskTags) => {
      this.listTaskTag = taskTags;
    })
  }

  getTaskTagName(tagId: any): string {
    return this.listTaskTag?.find((item) => item.id === tagId)?.name!;
  }

  getTaskTagColor(tagId: any): string {
    return this.listTaskTag?.find((item) => item.id === tagId)?.color!;
  }

  // Context menu
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  onDeleteTaskDailyContextMenu() {
    this.taskDailyService
      .updatePropTaskDaily(this.task?.id, { isDeleted: true })
      .toPromise()
      .then((res: any) => {
        this.msg.success(
          'Xóa thói quen thành công. Thói quen đã được chuyển vào thùng rác.'
        );
        this.onDeleteTaskDaily.emit();
      });
  }

  onCheckTaskDaily(ev: any) {
    this.setLoading(true);
    if (ev) {
      const payload = {
        taskDailyId: this.task?.id,
        completionDate: new Date(),
      };
      this.taskDailyHistory
        .addNewTaskDailyHistory(payload)
        .toPromise()
        .then((res: any) => {
          if (res && res.result) {
            this.setLoading(false);
          }
        });
    } else {
      this.taskDailyHistory
        .deleteTaskDailyHistory(this.task?.id)
        .toPromise()
        .then((res: any) => {
          if (res && res.result) {
            this.setLoading(false);
          }
        });
    }
    this.onUpdateTaskDaily.emit();
  }
}
