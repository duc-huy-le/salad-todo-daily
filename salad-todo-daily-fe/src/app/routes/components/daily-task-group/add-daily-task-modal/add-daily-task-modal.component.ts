import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskDaily } from 'src/app/models/TaskDaily';
import { TaskTag } from 'src/app/models/TaskTag';
import { TaskDailyService } from 'src/app/services/task-daily/task-daily.service';

export enum DailyTaskModalViewMode {
  Create = 0,
  Edit = 1,
}
@Component({
  selector: 'app-add-daily-task-modal',
  templateUrl: './add-daily-task-modal.component.html',
  styleUrls: ['./add-daily-task-modal.component.css'],
})
export class AddDailyTaskModalComponent implements OnInit {
  @Input() dailyTask!: TaskDaily;
  @Output() onUpdateTaskDaily = new EventEmitter();
  viewMode: DailyTaskModalViewMode = DailyTaskModalViewMode.Create;
  isVisible = false;
  addDailyTaskForm!: FormGroup;
  listTaskTag: TaskTag[] = [];
  today: Date = new Date();
  formDefaultValue: any = {
    startDate: this.today,
    isDeleted: 0,
  }

  DailyTaskModalViewMode = DailyTaskModalViewMode;

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

  handleCancel(): void {
    this.isVisible = false;
  }

  onClickModalOk() {
    if (this.viewMode === DailyTaskModalViewMode.Create) {
      this.handleAddTaskDaily();
    } else if (this.viewMode === DailyTaskModalViewMode.Edit) {
      this.handleEditTaskDaily();
    }
  }

  handleAddTaskDaily(): void {
    this.taskDailyService
      .addNewTaskDaily(this.addDailyTaskForm.value)
      .toPromise()
      .then((res) => {
        this.msg.success('Tạo thói quen thành công!');
        this.onUpdateTaskDaily.emit();
        this.isVisible = false;
      });
  }

  handleEditTaskDaily(): void {
    this.taskDailyService
      .updateTaskDaily(this.dailyTask.id, this.addDailyTaskForm.value)
      .toPromise()
      .then((res) => {
        this.msg.success('Cập nhật thói quen thành công!');
        this.onUpdateTaskDaily.emit();
        this.isVisible = false;
      });
  }

  setDefaultValue(): void {
    this.addDailyTaskForm.reset();
    this.addDailyTaskForm.patchValue(this.formDefaultValue);
  }

}
