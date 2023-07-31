import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskTag } from 'src/app/models/TaskTag';
import { TaskDailyService } from 'src/app/services/task-daily/task-daily.service';

@Component({
  selector: 'app-add-daily-task-modal',
  templateUrl: './add-daily-task-modal.component.html',
  styleUrls: ['./add-daily-task-modal.component.css'],
})
export class AddDailyTaskModalComponent implements OnInit {
  @Output() onAddTaskDaily = new EventEmitter();
  isVisible = false;
  addDailyTaskForm!: FormGroup;
  listTaskTag: TaskTag[] = [];
  today: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private taskDailyService: TaskDailyService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getAllTaskTag();
    this.initAddDailyTaskForm();
  }

  getAllTaskTag() {
    this.listTaskTag = JSON.parse(localStorage.getItem('listTaskTag')!);
  }

  initAddDailyTaskForm() {
    this.addDailyTaskForm = this.fb.group({
      name: [null, [Validators.required]],
      tagId: [[]],
      startDate: [this.today, [Validators.required]],
      description: [null],
      isDeleted: [0],
    });
  }

  handleAddTaskDaily(): void {
    this.taskDailyService
      .addNewTaskDaily(this.addDailyTaskForm.value)
      .toPromise()
      .then((res) => {
        this.msg.success('Tạo thói quen thành công!');
        this.onAddTaskDaily.emit();
        this.isVisible = false;
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
