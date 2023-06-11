import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';

export enum TaskPriority {
  Undefined = 0,
  High = 1,
  Medium = 2,
  Low = 3,
}

export enum TaskStatus {
  Open = 0,
  InProgress = 1,
  Done = 2,
}

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  TaskPriority = TaskPriority;
  constructor() {}

  ngOnInit(): void {}

  getPriorityLabel(taskPriority: TaskPriority): string {
    switch (taskPriority) {
      case TaskPriority.High:
        return 'Cao';
      case TaskPriority.Medium:
        return 'Trung bình';
      case TaskPriority.Low:
        return 'Thấp';
      default:
        return '';
    }
  }

  getPriorityColor(taskPriority: TaskPriority): string {
    switch (taskPriority) {
      case TaskPriority.High:
        return 'red';
      case TaskPriority.Medium:
        return 'blue';
      case TaskPriority.Low:
        return 'default';
      default:
        return '';
    }
  }
}
