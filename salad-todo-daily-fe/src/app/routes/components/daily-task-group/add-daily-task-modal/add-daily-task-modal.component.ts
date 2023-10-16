import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DailyTask } from 'src/app/models/DailyTask';
import { TaskTag } from 'src/app/models/TaskTag';
import { DailyTaskService } from 'src/app/services/daily-task/daily-task.service';
import { TaskTagService } from 'src/app/services/task-tag/task-tag.service';

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
  @Input() dailyTask!: DailyTask;
  @Output() onUpdateTaskDaily = new EventEmitter();
  viewMode: DailyTaskModalViewMode = DailyTaskModalViewMode.Create;
  isVisible = false;
  addDailyTaskForm!: FormGroup;
  listTaskTag: TaskTag[] = [];
  today: Date = new Date();
  formDefaultValue: any = {
    startDate: this.today,
    isDeleted: 0,
    schedule: [1, 2, 3, 4, 5, 6, 0],
  };
  dayList: any[] = [
    { label: 'Thứ hai', value: 1 },
    { label: 'Thứ ba', value: 2 },
    { label: 'Thứ tư', value: 3 },
    { label: 'Thứ năm', value: 4 },
    { label: 'Thứ sáu', value: 5 },
    { label: 'Thứ bảy', value: 6 },
    { label: 'Chủ nhật', value: 0 },
  ];

  DailyTaskModalViewMode = DailyTaskModalViewMode;

  constructor(
    private fb: FormBuilder,
    private taskDailyService: DailyTaskService,
    private msg: NzMessageService,
    private taskTagService: TaskTagService
  ) {}

  ngOnInit(): void {
    this.getAllTaskTag();
    this.initAddDailyTaskForm();
  }

  getAllTaskTag() {
    // this.listTaskTag = JSON.parse(localStorage.getItem('listTaskTag')!);
    this.taskTagService.getAllTaskTag().subscribe((taskTags) => {
      this.listTaskTag = taskTags;
    })
  }

  initAddDailyTaskForm() {
    this.addDailyTaskForm = this.fb.group({
      name: [null, [Validators.required]],
      tagId: [[]],
      startDate: [this.today, [Validators.required]],
      schedule: [[]],
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
