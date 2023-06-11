import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskDaily } from 'src/app/models/TaskDaily';
import { TaskDailyService } from 'src/app/services/task-daily/task-daily.service';
import { TaskTagService } from 'src/app/services/task-tag/task-tag.service';
import { AddDailyTaskModalComponent } from './add-daily-task-modal/add-daily-task-modal.component';

@Component({
  selector: 'app-daily-task-group',
  templateUrl: './daily-task-group.component.html',
  styleUrls: ['./daily-task-group.component.css'],
})
export class DailyTaskGroupComponent implements OnInit {
  @ViewChild('addDailyTaskModal')
  addDailyTaskModal!: AddDailyTaskModalComponent;
  listTaskDaily?: TaskDaily[];
  constructor(private taskDailyService: TaskDailyService) {}

  ngOnInit(): void {
    this.getAllTaskDaily();
  }

  getAllTaskDaily() {
    this.taskDailyService
      .getAllTaskDaily()
      .toPromise()
      .then((response) => {
        this.listTaskDaily = response;
        this.listTaskDaily = this.listTaskDaily.filter(
          (item) => item.isDeleted === false
        );
      });
  }

  openAddTaskDailyModal() {
    this.addDailyTaskModal.isVisible = true;
  }
}
