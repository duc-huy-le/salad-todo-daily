import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DailyTask } from 'src/app/models/DailyTask';
import { DailyTaskService } from 'src/app/services/daily-task/daily-task.service';

@Component({
  selector: 'app-daily-task-screen',
  templateUrl: './daily-task-screen.component.html',
  styleUrls: ['./daily-task-screen.component.css'],
})
export class DailyTaskScreenComponent implements OnInit {
  dailyTaskList: DailyTask[] = [];

  constructor(
    private dailyTaskService: DailyTaskService,
  ) {}
  ngOnInit(): void {
    this.dailyTaskService.getAllTaskDailyToday().subscribe((dailyTasks) => {
      this.dailyTaskList = dailyTasks;
    });
  }

}
