import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css']
})
export class AddProjectModalComponent implements OnInit {
  @Output() onAddProject = new EventEmitter();
  isVisible: boolean = false;
  addProjectForm!: FormGroup;
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.initAddProjectForm();
  }

  initAddProjectForm() {
    this.addProjectForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      startDate: [this.today, [Validators.required]],
      isDeleted: [false],
      createdAt: [this.today]
    })
  }

  handleAddProject(): void {
    this.projectService.addNewProject(this.addProjectForm.value).toPromise().then(res => {
      this.msg.success('Tạo dự án thành công!');
      this.onAddProject.emit();
      this.isVisible = false;
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
