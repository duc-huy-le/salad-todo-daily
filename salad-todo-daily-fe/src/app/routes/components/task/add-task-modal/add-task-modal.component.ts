import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskPriority, TaskStatus } from '../task-item/task-item.component';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css']
})
export class AddTaskModalComponent implements OnInit {
  @Output() onAddTask = new EventEmitter();
  isVisible = false;
  addTaskForm!: FormGroup;
  today: Date = new Date();
  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.initAddTaskForm();
  }

  initAddTaskForm() {
    this.addTaskForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      startDate: [this.today, [Validators.required]],
      endDate: [null],
      priority: [0],
      status: [TaskStatus.Open, [Validators.required]],
      isDeleted: [false],
      createdAt: [this.today]
    });
  }

  handleAddTask(): void {
    this.taskService
      .addNewTask(this.addTaskForm.value)
      .toPromise()
      .then((res) => {
        this.msg.success('Tạo công việc thành công!');
        this.onAddTask.emit();
        this.isVisible = false;
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
