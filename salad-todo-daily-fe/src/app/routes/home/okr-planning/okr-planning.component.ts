import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task/task.service';
import {
  TaskPriority,
  TaskStatus,
} from '../../components/task/task-item/task-item.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-okr-planning',
  templateUrl: './okr-planning.component.html',
  styleUrls: ['./okr-planning.component.css'],
})
export class OkrPlanningComponent implements OnInit {
  plannerForm!: FormGroup;
  freeTime: number = 0;
  freePomodoro: number = 0;
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private msg: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.plannerForm = this.fb.group({
      totalTime: [null],
      fixedTime: [null],
      highlightTask: [null],
      firstHighlightKr: [null],
      firstHighlightKrPomodoro: [null],
      firstHighlightKr1: [null],
      firstHighlightKr2: [null],
      firstHighlightKr3: [null],
      secondHighlightKr: [null],
      secondHighlightKrPomodoro: [null],
      secondHighlightKr1: [null],
      secondHighlightKr2: [null],
      secondHighlightKr3: [null],
      thirdHighlightKr: [null],
      thirdHighlightKrPomodoro: [null],
      thirdHighlightKr1: [null],
      thirdHighlightKr2: [null],
      thirdHighlightKr3: [null],
    });
    // this.plannerForm.setValue({
    //   totalTime: 10,
    //   fixedTime: 2,
    //   highlightTask: "Hoàn thành báo cáo đồ án 3 cho thầy",
    //   firstHighlightKr: 'Trình bày về chức năng lập kế hoạch bằng phương pháp OKRs',
    //   secondHighlightKr: 'Trình bày về chức năng nâng cao năng suất bằng phương pháp Pomodoro',
    //   thirdHighlightKr: 'Trình bày về những chức năng dự kiến phát triển trong tương lai',
    //   firstHighlightKrPomodoro: 2,
    //   secondHighlightKrPomodoro: 3,
    //   thirdHighlightKrPomodoro: 3,
    //   firstHighlightKr1: "Trình bày về phương pháp OKRs",
    //   firstHighlightKr2: "Highlight OKR's key results a",
    //   firstHighlightKr3: "Highlight OKR's key results e",
    //   secondHighlightKr1: "Highlight OKR's key results b",
    //   secondHighlightKr2: "Highlight OKR's key results b",
    //   secondHighlightKr3: "Highlight OKR's key results f",
    //   thirdHighlightKr1: "Highlight OKR's key results c",
    //   thirdHighlightKr2: "Highlight OKR's key results d",
    //   thirdHighlightKr3: "Highlight OKR's key results g",
    // });
    // this.calculateFreeTime();
  }
  calculateFreeTime() {
    const totalTime = this.plannerForm.get('totalTime')?.value;
    const fixedTime = this.plannerForm.get('fixedTime')?.value;
    if (totalTime && fixedTime) {
      this.freeTime = totalTime - fixedTime;
      this.freePomodoro = Math.floor(this.freeTime / 0.5);
    }
  }
  onClickAddTasks() {
    const firstTaskPayload = this.createTaskPayload(
      this.plannerForm.get('firstHighlightKr')?.value,
      this.plannerForm.get('firstHighlightKrPomodoro')?.value,
      this.plannerForm.get('firstHighlightKr1')?.value,
      this.plannerForm.get('firstHighlightKr2')?.value,
      this.plannerForm.get('firstHighlightKr3')?.value
    );
    const secondTaskPayload = this.createTaskPayload(
      this.plannerForm.get('secondHighlightKr')?.value,
      this.plannerForm.get('secondHighlightKrPomodoro')?.value,
      this.plannerForm.get('secondHighlightKr1')?.value,
      this.plannerForm.get('secondHighlightKr2')?.value,
      this.plannerForm.get('secondHighlightKr3')?.value
    );
    const thirdTaskPayload = this.createTaskPayload(
      this.plannerForm.get('thirdHighlightKr')?.value,
      this.plannerForm.get('thirdHighlightKrPomodoro')?.value,
      this.plannerForm.get('thirdHighlightKr1')?.value,
      this.plannerForm.get('thirdHighlightKr2')?.value,
      this.plannerForm.get('thirdHighlightKr3')?.value
    );
    Promise.all([
      this.taskService.addNewTask(firstTaskPayload).toPromise(),
      this.taskService.addNewTask(secondTaskPayload).toPromise(),
      this.taskService.addNewTask(thirdTaskPayload).toPromise(),
    ]).then((res: any) => {
      this.msg.success('Tạo các công việc thành công!');
      this.router.navigate(['/home/focus-mode']);
    });
  }
  createTaskPayload(
    taskName: string,
    taskDuration: number,
    firstTodo: string,
    secondTodo: string,
    thirdTodo: string
  ) {
    return {
      name: taskName,
      startDate: this.today,
      // finishDate: this.today,
      checkList: [
        {
          content: firstTodo,
          checked: false,
        },
        {
          content: secondTodo,
          checked: false,
        },
        {
          content: thirdTodo,
          checked: false,
        },
      ],
      priority: [TaskPriority.Medium],
      status: TaskStatus.InProgress,
      duration: taskDuration,
      isDeleted: 0,
    };
  }
}
