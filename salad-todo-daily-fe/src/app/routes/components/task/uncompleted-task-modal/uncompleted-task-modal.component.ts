import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-uncompleted-task-modal',
  templateUrl: './uncompleted-task-modal.component.html',
  styleUrls: ['./uncompleted-task-modal.component.css'],
})
export class UncompletedTaskModalComponent implements OnInit {
  isVisible: boolean = false;
  uncompletedTaskList: Task[] = [];
  checked: boolean = false;
  indeterminate: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  openModal(): void {
    this.isVisible = true;
  }

  setUncompletedTaskList(data: Task[]): void {
    this.uncompletedTaskList = data;
  }
  handleCancel() {
    this.isVisible = false;
  }
  handleOk() {}
  onAllChecked(e: any) {

  }
}
