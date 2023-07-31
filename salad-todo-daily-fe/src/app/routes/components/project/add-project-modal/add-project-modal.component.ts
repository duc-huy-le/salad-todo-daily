import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project/project.service';

export enum ProjectModalViewMode {
  Create = 0,
  Edit = 1,
}
@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css'],
})
export class AddProjectModalComponent implements OnInit {
  @Input() project!: Project;
  @Output() onUpdateProject = new EventEmitter();
  viewMode: ProjectModalViewMode = ProjectModalViewMode.Create;
  isVisible: boolean = false;
  addProjectForm!: FormGroup;
  today: Date = new Date();

  ProjectModalViewMode = ProjectModalViewMode;
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private msg: NzMessageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initAddProjectForm();
  }

  initAddProjectForm() {
    this.addProjectForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      startDate: [this.today, [Validators.required]],
      finishDate: [null, [Validators.required]],
      color: [null],
      isDeleted: [0],
    });
  }

  handleAddProject(): void {
    this.addProjectForm
      .get('startDate')
      ?.setValue(
        this.datePipe.transform(
          this.addProjectForm.value.startDate,
          'yyyy-MM-dd HH:mm:ss'
        )
      );
    this.projectService
      .addNewProject(this.addProjectForm.value)
      .toPromise()
      .then((res: any) => {
        if (res && res.result) this.msg.success('Tạo dự án thành công!');
        else this.msg.error("Có lỗi xảy ra. Không thể tạo dự án")
        this.onUpdateProject.emit();
        this.isVisible = false;
      });
  }

  handleEditProject(): void {
    this.projectService.updateProject(this.project.id, this.addProjectForm.value).toPromise().then((res: any) => {
      if (res && res.result) this.msg.success('Cập nhật dự án thành công!');
      else this.msg.error("Có lỗi xảy ra. Không thể cập nhật dự án");
      this.onUpdateProject.emit();
      this.isVisible = false;
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onClickModalOk() {
    if(this.viewMode === ProjectModalViewMode.Create) {
      this.handleAddProject();
    } else if(this.viewMode === ProjectModalViewMode.Edit) {
      this.handleEditProject();
    }
  }
}
