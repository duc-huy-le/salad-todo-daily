import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { Task } from 'src/app/models/Task';
import { ProjectService } from 'src/app/services/project/project.service';
import { TaskService } from 'src/app/services/task/task.service';

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
  @Output() onTaskChange = new EventEmitter();
  TaskPriority = TaskPriority;
  listProject: Project[] = [];
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.getListProjects();
  }

  getListProjects() {
    this.projectService.getAllProject().toPromise().then(res => {
      this.listProject = res;
    })
  }

  getProjectInfo(projectId: any): string {
    // return this.projectService
  }

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

  quickChangeTaskStatus() {
    var newStatus = this.task.status === TaskStatus.Open ? TaskStatus.InProgress : TaskStatus.Done;
    this.taskService.updatePropTask(this.task.id, {status: newStatus}).toPromise().then(res => {
      this.onTaskChange.emit();
    })
  }
}
