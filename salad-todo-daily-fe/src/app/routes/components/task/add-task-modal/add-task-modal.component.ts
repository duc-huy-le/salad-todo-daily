import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskPriority, TaskStatus } from '../task-item/task-item.component';
import { Task, TaskCheckList } from 'src/app/models/Task';
import { ProjectService } from 'src/app/services/project/project.service';
import { Project } from 'src/app/models/Project';
import { DatePipe } from '@angular/common';
import { DateType, getFormattedStartDate } from 'src/app/helpers/helper';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { LoadingService } from 'src/app/services/common/loading/loading.service';

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
  @Output() onUpdateTask = new EventEmitter();
  @Output() onCheckTodo = new EventEmitter();
  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;
  TaskItemViewMode = TaskItemViewMode;

  deadline: any;
  isCountdown: boolean = false;
  isVisible = false;
  addTaskForm!: FormGroup;
  today: Date = new Date();
  isShowLoadingCheckList: boolean = false;
  listProjects: Project[] = [];
  checkListPercent!: number;
  isAddingCheckList: boolean = false;
  isEditingCheckList: boolean = false;
  editingCheckListIndex: number | null = null;
  newCheckList: TaskCheckList[] = [];
  currentAddCheckListItem: string = '';
  defaultFormValue: any = {
    startDate: this.today,
    priority: TaskPriority.Medium,
    status: TaskStatus.Open,
    checkList: [],
    isDeleted: 0,
  };

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private msg: NzMessageService,
    private nzContextMenuService: NzContextMenuService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initAddTaskForm();

    this.projectService
      .getProjectList()
      .subscribe((projects) => (this.listProjects = projects));
  }

  ngOnChanges() {
    this.getCheckListPercent();
  }

  initAddTaskForm() {
    this.addTaskForm = this.fb.group({
      name: [null, [Validators.required]],
      projectId: [null],
      description: [null],
      startDate: [this.today, [Validators.required]],
      finishDate: [null],
      checkList: [[]],
      priority: [TaskPriority.Medium],
      status: [TaskStatus.Open, [Validators.required]],
      duration: [1],
      isDeleted: [0],
    });
  }

  onClickModalOk(): void {
    switch (this.viewMode) {
      case TaskItemViewMode.Create:
        this.handleAddTask();
        break;
      case TaskItemViewMode.View:
        this.handleEditTask();
        break;
      case TaskItemViewMode.Edit:
        this.updateTask();
        break;
      default:
        break;
    }
  }

  handleAddTask(): void {
    //h
    this.loadingService.setLoading(true);
    this.addTaskForm.get('checkList')?.patchValue(this.newCheckList);
    this.getCurrentFormattedDate();
    this.taskService
      .addNewTask(this.addTaskForm.value)
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.msg.success('Tạo công việc thành công!');
          this.addTaskForm.reset();
          this.addTaskForm.patchValue(this.defaultFormValue);
          this.onAddTask.emit();
          this.isVisible = false;
          this.newCheckList = [];
          this.isAddingCheckList = false;
        } else {
          this.msg.error('Tạo công việc thất bại');
        }
      })
      .finally(() => {
        this.loadingService.setLoading(false);
      });
  }

  updateTask(): void {
    this.loadingService.setLoading(true);
    this.addTaskForm.get('checkList')?.patchValue(this.newCheckList);
    this.getCurrentFormattedDate();
    this.taskService
      .updateTask(this.task.id, this.addTaskForm.value)
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.msg.success('Cập nhật thành công');
          this.task = res.result[0];
          this.newCheckList = [];
          this.isAddingCheckList = false;
        } else {
          this.msg.error('Cập nhật thất bại');
        }
        this.viewMode = TaskItemViewMode.View;
      })
      .finally(() => {
        this.loadingService.setLoading(false);
      });
  }

  updateCheckList(newCheckList: TaskCheckList[]): void {
    this.addTaskForm.get('checkList')?.patchValue(newCheckList);
    this.getCurrentFormattedDate();
    this.taskService
      .updatePropTask(this.task.id, { checkList: newCheckList })
      .toPromise()
      .then((res: any) => {
        this.task = res.result[0];
      });
  }

  handleEditTask(inputTask: any = this.task): void {
    this.addTaskForm.patchValue(inputTask);
    this.newCheckList = [...inputTask.checkList];
    this.viewMode = TaskItemViewMode.Edit;
  }

  handleCancel(): void {
    // if(this.viewMode === TaskItemViewMode.Edit) {
    //   this.viewMode = TaskItemViewMode.View;
    // } else {
    this.isVisible = false;
    // }
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
        this.onCheckTodo.emit();
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
    if (
      this.currentAddCheckListItem != '' &&
      this.currentAddCheckListItem != '\n'
    ) {
      if (this.viewMode === TaskItemViewMode.View) {
        this.task.checkList.push({
          checked: false,
          content: this.currentAddCheckListItem,
        });
        this.updateCheckList(this.task.checkList);
      } else {
        this.newCheckList.push({
          checked: false,
          content: this.currentAddCheckListItem,
        });
      }
      this.currentAddCheckListItem = '';
    }
  }

  onDeleteAddCheckListItem(index: number) {
    this.newCheckList.splice(index, 1);
  }

  onEnterKeyInAddCheckList(event: any) {
    event.preventDefault(); // Prevent the default Enter key behavior
  }

  getCurrentFormattedDate(): void {
    if (this.addTaskForm.get('startDate')?.value) {
      this.addTaskForm
        .get('startDate')
        ?.patchValue(
          getFormattedStartDate(
            this.addTaskForm.get('startDate')?.value,
            DateType.StartDate
          )
        );
    }
    if (this.addTaskForm.get('finishDate')?.value) {
      this.addTaskForm
        .get('finishDate')
        ?.patchValue(
          getFormattedStartDate(
            this.addTaskForm.get('finishDate')?.value,
            DateType.FinishDate
          )
        );
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.isEditingCheckList)
      this.editingCheckListIndex = event.currentIndex; // Nếu drop khi đang trong chế độ sửa thì phải đổi cả editing index
    moveItemInArray(this.newCheckList, event.previousIndex, event.currentIndex);
    this.updateCheckList(this.newCheckList);
  }
  dropInViewMode(event: CdkDragDrop<string[]>) {
    if (this.isEditingCheckList)
      this.editingCheckListIndex = event.currentIndex; // Nếu drop khi đang trong chế độ sửa thì phải đổi cả editing index
    moveItemInArray(
      this.task.checkList,
      event.previousIndex,
      event.currentIndex
    );
    this.updateCheckList(this.task.checkList);
  }

  afterCloseTaskModal() {
    this.onUpdateTask.emit();
  }

  openCheckListItemMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    index: number
  ): void {
    this.nzContextMenuService.create($event, menu);
    this.editingCheckListIndex = index;
  }

  onEditCheckListItem() {
    this.isEditingCheckList = true;
  }
  cancelEditCheckListItem() {
    this.isEditingCheckList = false;
  }
  saveChangeCheckListItem(newContent: string, index: number) {
    if (this.viewMode === TaskItemViewMode.View) {
      this.task.checkList[index].content = newContent;
      this.updateCheckList(this.task.checkList);
    } else {
      this.newCheckList[index].content = newContent;
      this.updateCheckList(this.newCheckList);
    }
    this.isEditingCheckList = false;
  }

  onCopyCheckListItem() {
    if (this.viewMode === TaskItemViewMode.View) {
      this.task.checkList.splice(
        this.editingCheckListIndex!,
        0,
        this.task.checkList[this.editingCheckListIndex!]
      );
      this.updateCheckList(this.task.checkList);
    } else {
      this.newCheckList.splice(
        this.editingCheckListIndex!,
        0,
        this.newCheckList[this.editingCheckListIndex!]
      );
      this.updateCheckList(this.newCheckList);
    }
  }
  onDeleteCheckListItemViewMode() {
    this.task.checkList.splice(this.editingCheckListIndex!, 1);
    this.updateCheckList(this.task.checkList);
  }
  onClickCountDown() {
    // this.deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
    this.deadline = Date.now() + this.task.duration * 1000 * 60;
    this.isCountdown = true;
  }
}
