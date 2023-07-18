import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_INFO = 'TODO_DAILY_USER_INFO';
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
    return localStorage.getItem(this.JWT_TOKEN)!;
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
