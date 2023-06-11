import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskDaily } from 'src/app/models/TaskDaily';
import { TaskTag } from 'src/app/models/TaskTag';
import { TaskDailyService } from 'src/app/services/task-daily/task-daily.service';
import { TaskTagService } from 'src/app/services/task-tag/task-tag.service';

@Component({
  selector: 'app-daily-task-item',
  templateUrl: './daily-task-item.component.html',
  styleUrls: ['./daily-task-item.component.css'],
})
export class DailyTaskItemComponent implements OnInit {
  @Input() task?: TaskDaily;
  @Output() onDeleteTaskDaily = new EventEmitter();
  listTaskTag?: TaskTag[];
  checked: boolean = false;
  constructor(
    private taskTagService: TaskTagService,
    private taskDailyService: TaskDailyService,
    private nzContextMenuService: NzContextMenuService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getAllTaskTag();
  }

  getAllTaskTag() {
    // this.taskTagService.getAllTaskTag().toPromise().then((response) => {
    //   this.listTaskTag = response;
    // })
    this.listTaskTag = JSON.parse(localStorage.getItem('listTaskTag')!);
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
    this.taskDailyService.updatePropTaskDaily(this.task?.id, { isDeleted: true })
      .toPromise().then(res => {
        this.msg.success('Xóa thói quen thành công. Thói quen đã được chuyển vào thùng rác.')
        this.onDeleteTaskDaily.emit();
      })
  }
}
