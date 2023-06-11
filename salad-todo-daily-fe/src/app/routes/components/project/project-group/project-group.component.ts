import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project/project.service';
import { AddProjectModalComponent } from '../add-project-modal/add-project-modal.component';

@Component({
  selector: 'app-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.css'],
})
export class ProjectGroupComponent implements OnInit {
  @ViewChild('addProjectModal') addProjectModal!: AddProjectModalComponent;
  listProject?: Project[] = [];
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService
      .getAllProject()
      .toPromise()
      .then((res) => {
        this.listProject = res;
        this.listProject = this.listProject.filter(
          (item) => item.isDeleted === false
        );
      });
  }

  openAddProjectModal() {
    this.addProjectModal.isVisible = true;
  }
}
