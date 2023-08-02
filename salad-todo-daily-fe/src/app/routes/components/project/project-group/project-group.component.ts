import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project/project.service';
import { AddProjectModalComponent } from '../add-project-modal/add-project-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.css'],
})
export class ProjectGroupComponent implements OnInit {
  @ViewChild('addProjectModal') addProjectModal!: AddProjectModalComponent;
  listProject?: Project[] = [];
  constructor(
    private projectService: ProjectService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    // this.getAllProjects();
    this.projectService.getProjectList().subscribe((projects) => {
      this.listProject = projects;
      this.listProject = this.listProject?.filter(
        (item) => item.totalTask !== 0 && item.totalTask !== item.completedTask
      );
    });
  }

  getAllProjects(): void {
    this.projectService
      .getAllProject()
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.listProject = res.result;
          this.listProject = this.listProject?.filter(
            (item) =>
              item.totalTask !== 0 && item.totalTask !== item.completedTask
          );
        } else {
          this.msg.error('Có lỗi xảy ra. Không thể lấy danh sách dự án.');
        }
      });
  }

  openAddProjectModal() {
    this.addProjectModal.isVisible = true;
  }
}
