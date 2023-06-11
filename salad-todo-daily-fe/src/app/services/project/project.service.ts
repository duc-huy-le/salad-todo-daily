import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from 'src/app/models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = 'http://localhost:3000/todo-project';

  constructor(private http: HttpClient) { }

  getAllProject() {
    return this.http.get<Project[]>(this.baseUrl);
  }

  addNewProject(data: any) {
    return this.http.post<Project>(this.baseUrl, data);
  }

  updateProject(id: any, data: any) {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, data);
  }

  updatePropProject(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  deleteProject(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
