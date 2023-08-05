import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project/project.service';
import {
  AddProjectModalComponent,
  ProjectModalViewMode,
} from '../../components/project/add-project-modal/add-project-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-screen',
  templateUrl: './project-screen.component.html',
  styleUrls: ['./project-screen.component.css'],
})
export class ProjectScreenComponent implements OnInit {
  @ViewChild('addProjectModal') addProjectModal!: AddProjectModalComponent;
  listProjects: Project[] = [];
  initialTabIndex: number = 0;
  constructor(
    private projectService: ProjectService,
    private msg: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListProjects();

    this.route.queryParams.subscribe((params) => {
      if (params.type) {
        this.setInitialTabIndex(params.type);
      }
    });
  }

  getListProjects() {
    this.projectService
      .getAllProject()
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.listProjects = res.result;
        } else {
          this.msg.error('Có lỗi xảy ra. Không thể lấy danh sách dự án.');
        }
        this.listProjects = this.listProjects?.filter(
          (item) => item.isDeleted === 0
        );
      });
  }

  onClickEdit(data: Project) {
    this.addProjectModal.project = data;
    this.addProjectModal.viewMode = ProjectModalViewMode.Edit;
    this.addProjectModal.addProjectForm.patchValue(data);
    this.addProjectModal.isVisible = true;
  }

  deleteProject(projectId: any) {
    const payload = {
      isDeleted: 1,
    };
    this.projectService
      .updatePropProject(projectId, payload)
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.msg.success('Xóa dự án thành công!');
          this.getListProjects();
        } else {
          this.msg.error('Có lỗi xảy ra. Không thể xóa dự án');
        }
      });
  }

  setInitialTabIndex(categoryType: string) {
    switch (categoryType) {
      case 'project':
        this.initialTabIndex = 0;
        break;
      case 'tag':
        this.initialTabIndex = 1;
        break;
      case 'daily-task':
        this.initialTabIndex = 2;
        break;
      default:
        this.initialTabIndex = 0;
        break;
    }
  }

  onChangeTab(ev: any) {
    let params = {};
    switch (ev) {
      case 0:
        params = { type: 'project' };
        break;
      case 1:
        params = { type: 'tag' };
        break;
      case 2:
        params = { type: 'daily-task' };
        break;
      default:
        break;
    }
    this.router.navigate(['/home/project'], { queryParams: params });
  }
}
