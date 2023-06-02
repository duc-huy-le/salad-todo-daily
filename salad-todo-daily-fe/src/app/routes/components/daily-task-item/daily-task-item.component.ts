import { Component, Input, OnInit } from '@angular/core';
import { TaskDaily } from 'src/app/models/TaskDaily';
import { TaskTag } from 'src/app/models/TaskTag';
import { TaskTagService } from 'src/app/services/task-tag/task-tag.service';

@Component({
  selector: 'app-daily-task-item',
  templateUrl: './daily-task-item.component.html',
  styleUrls: ['./daily-task-item.component.css'],
})
export class DailyTaskItemComponent implements OnInit {
  @Input() task?: TaskDaily;
  listTaskTag?: TaskTag[];
  checked: boolean = false;
  constructor(private taskTagService: TaskTagService) {}

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
}
