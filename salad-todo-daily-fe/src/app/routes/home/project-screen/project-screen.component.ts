import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-screen',
  templateUrl: './project-screen.component.html',
  styleUrls: ['./project-screen.component.css'],
})
export class ProjectScreenComponent implements OnInit {
  listProjects: Project[] = [];
  constructor(
    private projectService: ProjectService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getListProjects();
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
}
