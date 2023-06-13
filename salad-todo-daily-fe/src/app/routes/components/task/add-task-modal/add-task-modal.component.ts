import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskPriority, TaskStatus } from '../task-item/task-item.component';
import { Task, TaskCheckList } from 'src/app/models/Task';
import { ProjectService } from 'src/app/services/project/project.service';
import { Project } from 'src/app/models/Project';

export enum TaskItemViewMode {
  Create = 0,
  View = 1,
  Edit = 2,
}
@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css'],
})
export class AddTaskModalComponent implements OnInit {
  @Input() task!: Task;
  @Input() viewMode: TaskItemViewMode = TaskItemViewMode.Create;
  @Output() onAddTask = new EventEmitter();
  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;
  TaskItemViewMode = TaskItemViewMode;

  isVisible = false;
  addTaskForm!: FormGroup;
  today: Date = new Date();
  isShowLoadingCheckList: boolean = false;
  listProjects: Project[] = [];
  checkListPercent!: number;
  isAddingCheckList: boolean = false;
  newCheckList: TaskCheckList[] = [];
  currentAddCheckListItem: string = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getListProjects();
    this.initAddTaskForm();
  }

  ngOnChanges() {
    this.getCheckListPercent();
  }

  getListProjects() {
    this.projectService
      .getAllProject()
      .toPromise()
      .then((res) => {
        this.listProjects = res;
        this.listProjects = this.listProjects.filter(
          (item) => item.isDeleted === false
        );
      });
  }

  initAddTaskForm() {
    this.addTaskForm = this.fb.group({
      name: [null, [Validators.required]],
      projectId: [null],
      description: [null],
      startDate: [this.today, [Validators.required]],
      checkList: [[]],
      endDate: [null],
      priority: [0],
      status: [TaskStatus.Open, [Validators.required]],
      isDeleted: [false],
      createdAt: [this.today],
    });
  }

  handleAddTask(): void {
    this.addTaskForm.get('checkList')?.patchValue(this.newCheckList);
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

  onCheckStep(ev: any, index: number): void {
    this.isShowLoadingCheckList = true;
    // Copy old checkList to new check list variables
    var newCheckList = [...this.task.checkList];
    // Change new check list as action
    newCheckList[0] = { ...newCheckList[0], checked: ev };
    this.taskService
      .updatePropTask(this.task.id, { checkList: newCheckList })
      .toPromise()
      .then((res) => {
        this.isShowLoadingCheckList = false;
        this.getCheckListPercent();
      });
  }

  getCheckListPercent() {
    var total = this.task.checkList?.length;
    var complete = this.task.checkList?.filter(
      (item) => item.checked == true
    ).length;
    this.checkListPercent = Math.floor((complete / total) * 100);
  }

  onClickAddNewCheckList() {
    this.isAddingCheckList = true;
  }

  onClickCancelAddCheckList() {
    this.isAddingCheckList = false;
  }

  onClickAddCheckList(ev?: any) {
    if (this.currentAddCheckListItem != '' && this.currentAddCheckListItem != "\n") {
      this.newCheckList.push({
        checked: false,
        content: this.currentAddCheckListItem,
      });
      this.currentAddCheckListItem = '';
    }
  }

  onDeleteAddCheckListItem(index: number) {
    this.newCheckList.splice(index, 1);
  }

  onEnterKeyInAddCheckList(event: any) {
    event.preventDefault(); // Prevent the default Enter key behavior
  }
}
