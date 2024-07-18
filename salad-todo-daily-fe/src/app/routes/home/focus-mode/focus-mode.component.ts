import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task, TaskCheckList } from 'src/app/models/Task';
import { LoadingService } from 'src/app/services/common/loading/loading.service';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskStatus } from '../../components/task/task-item/task-item.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskGroupComponent } from '../../components/task/task-group/task-group.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OrderIndexService } from 'src/app/services/order-index/order-index.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';

export enum FocusingMode {
  Pomodoro = 0,
  ShortBreak = 1,
  LongBreak = 2,
}
@Component({
  selector: 'app-focus-mode',
  templateUrl: './focus-mode.component.html',
  styleUrls: ['./focus-mode.component.css'],
})
export class FocusModeComponent extends TaskGroupComponent implements OnInit {
  // listTask: Task[] = [];
  // listOpenTask: Task[] = [];
  listInProgressTaskBase: Task[] = [];
  // listDoneTask: Task[] = [];
  isShowLoadingCheckList: boolean = false;
  editingCheckListIndex: number | null = null;
  focusPercent!: number;
  checkListPercent!: number;
  isEditingCheckList: boolean = false;
  isAddingCheckList: boolean = false;
  currentAddCheckListItem: string = '';
  readonly FocusingMode = FocusingMode;
  currentFocusingMode: FocusingMode = FocusingMode.Pomodoro;
  focusingTask: Task | null = null;
  currentStartTime: Date = new Date();
  currentDateline!: number;
  datelinePlaceholder: string = '25:00';
  isFocusing: boolean = false;
  private finishSectionAudio = new Audio('assets/audio/finish_section_bell.wav');
  private startSectionAudio = new Audio('assets/audio/start_section.wav');
  constructor(
    protected taskService: TaskService,
    protected msg: NzMessageService,
    protected notificationService: NotificationService,
    protected loadingService: LoadingService,
    protected orderIndexService: OrderIndexService,
    private nzContextMenuService: NzContextMenuService,
    private cdr: ChangeDetectorRef
  ) {
    super(
      taskService,
      msg,
      notificationService,
      loadingService,
      orderIndexService
    );
  }

  async ngOnInit(): Promise<void> {
    await this.getPageData();
    this.handleCurrentCycle();
  }
  handleCurrentCycle() {
    const localFocusingTime = localStorage.getItem('focusingTime');
    if (localFocusingTime) {
      const focusingTime = JSON.parse(localFocusingTime);
      if (focusingTime.currentDateline) {
        this.isFocusing = true;
        this.currentDateline = focusingTime.currentDateline;
        this.currentFocusingMode = focusingTime.currentFocusingMode;
      } else if (focusingTime.currentFocusingMode) {
        this.onChangeFocusMode(focusingTime.currentFocusingMode);
      }
    }
  }
  async getPageData() {
    await this.getAllTask();
    // this.currentDateline = Date.now() + 25 * 1000 * 60;
    this.handleFocusingTask();
    this.cdr.detectChanges();
  }
  handleFocusingTask() {
    this.listInProgressTaskBase = [...this.listInProgressTask];
    this.focusingTask = this.listInProgressTask[0];
    this.listInProgressTask.shift();
    this.focusingTask!.completedDuration =
      this.focusingTask?.completedDuration ?? 0;
    this.focusingTask!.duration = this.focusingTask?.duration ?? 1;
    this.focusPercent = Math.floor(
      (this.focusingTask?.completedDuration / this.focusingTask?.duration) * 100
    );
  }
  onChangeFocusMode(mode: FocusingMode) {
    if (this.currentFocusingMode != mode) {
      this.currentFocusingMode = mode;
      this.isFocusing = false;
      this.datelinePlaceholder =
        mode === FocusingMode.Pomodoro
          ? '25:00'
          : mode === FocusingMode.ShortBreak
          ? '05:00'
          : '15:00';
    }
  }
  onStartFocusing() {
    this.startSectionAudio.play();
    const focusingTime =
      this.currentFocusingMode === FocusingMode.Pomodoro
        ? 25
        : this.currentFocusingMode === FocusingMode.ShortBreak
        ? 5
        : 15;
    this.isFocusing = true;
    this.currentStartTime = new Date();
    this.currentDateline = Date.now() + focusingTime * 1000 * 60;
    // Lưu dateline vào localStorage
    localStorage.setItem(
      'focusingTime',
      JSON.stringify({
        currentDateline: this.currentDateline,
        currentFocusingMode: this.currentFocusingMode,
      })
    );
  }
  dropInViewMode(event: CdkDragDrop<string[]>) {
    if (this.isEditingCheckList)
      this.editingCheckListIndex = event.currentIndex; // Nếu drop khi đang trong chế độ sửa thì phải đổi cả editing index
    moveItemInArray(
      this.focusingTask!.checkList,
      event.previousIndex,
      event.currentIndex
    );
    this.updateCheckList(this.focusingTask!.checkList);
  }
  updateCheckList(newCheckList: TaskCheckList[]): void {
    // this.addTaskForm.get('checkList')?.patchValue(newCheckList);
    // this.getCurrentFormattedDate();
    this.taskService
      .updatePropTask(this.focusingTask?.id, { checkList: newCheckList })
      .toPromise()
      .then((res: any) => {
        // this.focusingTask = res.result[0];
      });
  }
  openCheckListItemMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    index: number
  ): void {
    this.nzContextMenuService.create($event, menu);
    this.editingCheckListIndex = index;
  }

  onCheckStep(ev: any, index: number): void {
    this.isShowLoadingCheckList = true;
    // Copy old checkList to new check list variables
    var newCheckList = [...this.focusingTask!.checkList];
    // Change new check list as action
    newCheckList[0] = { ...newCheckList[0], checked: ev };
    this.taskService
      .updatePropTask(this.focusingTask!.id, { checkList: newCheckList })
      .toPromise()
      .then((res) => {
        this.isShowLoadingCheckList = false;
        this.getCheckListPercent();
        // this.onCheckTodo.emit();
      });
  }
  getCheckListPercent() {
    var total = this.focusingTask!.checkList?.length;
    var complete = this.focusingTask!.checkList?.filter(
      (item) => item.checked == true
    ).length;
    this.checkListPercent = Math.floor((complete / total) * 100);
  }
  saveChangeCheckListItem(newContent: string, index: number) {
    this.focusingTask!.checkList[index].content = newContent;
    this.updateCheckList(this.focusingTask!.checkList);
    this.isEditingCheckList = false;
  }
  onEnterKeyInAddCheckList(event: any) {
    event.preventDefault(); // Prevent the default Enter key behavior
  }
  cancelEditCheckListItem() {
    this.isEditingCheckList = false;
  }
  onEditCheckListItem() {
    this.isEditingCheckList = true;
  }
  onCopyCheckListItem() {
    this.focusingTask!.checkList.splice(
      this.editingCheckListIndex!,
      0,
      this.focusingTask!.checkList[this.editingCheckListIndex!]
    );
    this.updateCheckList(this.focusingTask!.checkList);
  }
  onDeleteCheckListItemViewMode() {
    this.focusingTask!.checkList.splice(this.editingCheckListIndex!, 1);
    this.updateCheckList(this.focusingTask!.checkList);
  }
  onStopFocusing() {
    this.finishSectionAudio.play();
    // Tắt chế độ tập trung
    this.isFocusing = false;

    if (this.currentFocusingMode == FocusingMode.Pomodoro) {
      const newCompletedDuration = (this.focusingTask!.completedDuration += 1);
      this.taskService
        .updatePropTask(this.focusingTask?.id, {
          completedDuration: newCompletedDuration,
        })
        .toPromise()
        .then((res: any) => {
          this.focusingTask = res.result[0];
          this.cdr.detectChanges();
        });
      if (newCompletedDuration == this.focusingTask?.duration) {
        this.taskService
          .updatePropTask(this.focusingTask?.id, {
            status: TaskStatus.Done,
          })
          .toPromise()
          .then(async (res: any) => {
            await this.getPageData();
            // this.focusingTask = res.result[0];
          });
      }
      // Lấy số chu kỳ liên tiếp hiện tại
      const consecutiveCycles = JSON.parse(
        localStorage.getItem('consecutiveCycles') ?? ''
      );
      // Nếu số chu kỳ liên tiếp <3 thì tăng thêm 1
      if (consecutiveCycles < 3) {
        localStorage.setItem(
          'consecutiveCycles',
          String(consecutiveCycles + 1)
        );
        // Chuyển sang chế độ nghỉ ngắn
        this.onChangeFocusMode(FocusingMode.ShortBreak);
        // Lưu thông tin đến lượt chế độ nghỉ ngắn vào localStorage
        localStorage.setItem(
          'focusingTime',
          JSON.stringify({
            currentFocusingMode: FocusingMode.ShortBreak,
          })
        );
      }
      // còn nếu số chu kỳ liên tiếp =3 thì giờ đã đủ 4 chu kỳ => reset về 0
      else {
        localStorage.setItem('consecutiveCycles', '0');
        // Chuyển sang chê độ nghị dài
        this.onChangeFocusMode(FocusingMode.LongBreak);
        // Lưu thông tin đến lượt chế độ nghỉ ngắn vào localStorage
        localStorage.setItem(
          'focusingTime',
          JSON.stringify({
            currentFocusingMode: FocusingMode.LongBreak,
          })
        );
      }
    } else {
      // Chuyển sang chế độ tập trung
      this.onChangeFocusMode(FocusingMode.Pomodoro);
      localStorage.setItem(
        'focusingTime',
        JSON.stringify({
          currentFocusingMode: FocusingMode.Pomodoro,
        })
      );
    }
    this.cdr.detectChanges();
  }
  onClickAddCheckList(ev?: any) {
    if (
      this.currentAddCheckListItem != '' &&
      this.currentAddCheckListItem != '\n'
    ) {
      this.focusingTask!.checkList.push({
        checked: false,
        content: this.currentAddCheckListItem,
      });
      this.updateCheckList(this.focusingTask!.checkList);
      this.currentAddCheckListItem = '';
    }
  }
  onClickAddNewCheckList() {
    this.isAddingCheckList = true;
  }
  onClickCancelAddCheckList() {
    this.isAddingCheckList = false;
  }
  // async getAllTask() {
  //   this.loadingService.setLoading(true);
  //   const queryParam = {
  //     // ...this.filterFormValue,
  //     // projectId:
  //     //   this.filterFormValue.projectId.length > 0
  //     //     ? this.filterFormValue.projectId
  //     //     : null,
  //   };
  //   await this.taskService
  //     .getAllTask(queryParam)
  //     .toPromise()
  //     .then((res: any) => {
  //       if (res && res.result) {
  //         this.listTask = res?.result;
  //         this.listTask = this.listTask.filter(
  //           (item) =>
  //             new Date(item.startDate) <= new Date() &&
  //             (!item.finishDate || new Date(item.finishDate) >= new Date())
  //         );
  //         // this.listTask = this.listTask.sort((a, b) => b.priority - a.priority);
  //         this.listOpenTask = this.listTask.filter(
  //           (item) => item.status === TaskStatus.Open
  //         );
  //         this.listInProgressTask = this.listTask.filter(
  //           (item) => item.status === TaskStatus.InProgress
  //         );
  //         this.listDoneTask = this.listTask.filter(
  //           (item) => item.status === TaskStatus.Done
  //         );
  //       } else {
  //         this.msg.error('Có lỗi xảy ra. Không thể lấy danh sách công việc.');
  //       }
  //     })
  //     .finally(() => {
  //       this.loadingService.setLoading(false);
  //     });
  // }
}
