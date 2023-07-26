import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { Project } from 'src/app/models/Project';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = 'http://localhost:3000/project';
  requestOption: any;
  userInfo: any;

  constructor(private http: HttpClient) {
    this.getRequestOption();
  }



  getJwtToken(): string {
    return localStorage.getItem(JWT_TOKEN)!;
  }
  getRequestOption() {
    const token = this.getJwtToken();
    const headers = { authorization: token };
    this.requestOption = { headers: headers };
  }
  getAllProject() {
    return this.http.get<any>(this.baseUrl, this.requestOption);
  }

  getProjectById(projectId: any) {
    return this.http.get<any>(`${this.baseUrl}/${projectId}`, this.requestOption);
  }

  addNewProject(data: any) {
    return this.http.post<Project>(this.baseUrl, data, this.requestOption);
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
