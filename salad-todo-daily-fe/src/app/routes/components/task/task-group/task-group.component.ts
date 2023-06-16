import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task/task.service';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { TaskStatus } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.css'],
})
export class TaskGroupComponent implements OnInit {
  @ViewChild('addTaskModal') addTaskModal!: AddTaskModalComponent;
  listTask?: Task[];
  listOpenTask?: Task[];
  listInProgressTask?: Task[];
  listDoneTask?: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.taskService
      .getAllTask()
      .toPromise()
      .then((response) => {
        this.listTask = response;
        this.listOpenTask = this.listTask.filter((item) => {
          return (
            item.isDeleted === false &&
            item.status === TaskStatus.Open &&
            new Date(item.startDate) <= new Date() &&
            (!item.endDate || new Date(item.endDate) >= new Date())
          );
        });
        this.listInProgressTask = this.listTask.filter((item) => {
          return (
            item.isDeleted === false &&
            item.status === TaskStatus.InProgress &&
            new Date(item.startDate) <= new Date() &&
            (!item.endDate || new Date(item.endDate) >= new Date())
          );
        });
        this.listDoneTask = this.listTask.filter((item) => {
          return (
            item.isDeleted === false &&
            item.status === TaskStatus.Done &&
            new Date(item.startDate) <= new Date() &&
            (!item.endDate || new Date(item.endDate) >= new Date())
          );
        });
        this.listTask = this.listTask.filter(
          (item) => item.isDeleted === false
        );
      });
  }

  openAddTaskModal() {
    this.addTaskModal.isVisible = true;
  }
}
