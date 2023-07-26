import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'http://localhost:3000/task';
  requestOption: any;

  constructor(private http: HttpClient) {
    this.getRequestOption();
  }

  getRequestOption() {
    const token = this.getJwtToken();
    const headers = { authorization: token };
    this.requestOption = { headers: headers };
  }

  getJwtToken(): string {
    return localStorage.getItem(JWT_TOKEN)!;
  }

  getAllTask() {
    return this.http.get<any>(this.baseUrl, this.requestOption);
  }

  addNewTask(data: any) {
    return this.http.post<Task>(this.baseUrl, data, this.requestOption);
  }

  updateTask(id: any, data: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data, this.requestOption);
  }

  updatePropTask(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data, this.requestOption);
  }

  deleteTask(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
