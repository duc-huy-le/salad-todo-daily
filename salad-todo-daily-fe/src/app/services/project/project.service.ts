import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { getRequestOption } from 'src/app/helpers/helper';
import { Project } from 'src/app/models/Project';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = 'http://localhost:3000/project';
  private projectList$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  constructor(private http: HttpClient) {
    this.fetchProjectList();
  }

  getProjectList(): Observable<Project[]> {
    return this.projectList$.asObservable();
  }

  private fetchProjectList() {
    this.http.get<any>(this.baseUrl, getRequestOption()).subscribe(
      (res) => this.projectList$.next(res.result),
      (err) => console.error(err)
    )
  }

  getAllProject() {
    return this.http.get<any>(this.baseUrl, getRequestOption());
  }

  getProjectById(projectId: any) {
    return this.http.get<any>(`${this.baseUrl}/${projectId}`, getRequestOption());
  }

  addNewProject(data: any) {
    return this.http.post<Project>(this.baseUrl, data, getRequestOption());
  }

  updateProject(id: any, data: any) {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, data, getRequestOption());
  }

  updatePropProject(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data, getRequestOption());
  }

  deleteProject(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
