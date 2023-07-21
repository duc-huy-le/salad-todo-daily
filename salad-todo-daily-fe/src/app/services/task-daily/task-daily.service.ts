import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDaily } from 'src/app/models/TaskDaily';

@Injectable({
  providedIn: 'root',
})
export class TaskDailyService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_INFO = 'TODO_DAILY_USER_INFO';
  baseUrl = 'http://localhost:3000/task-daily';
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

  getAllTaskDaily() {
    return this.http.get<any>(this.baseUrl, this.requestOption);
  }

  getAllTaskDailyToday() {
    return this.http.get<any>(`${this.baseUrl}/today`, this.requestOption);
  }

  addNewTaskDaily(data: any) {
    return this.http.post<TaskDaily>(this.baseUrl, data);
  }

  updateTaskDaily(id: any, data: any) {
    return this.http.put<TaskDaily>(`${this.baseUrl}/${id}`, data);
  }

  updatePropTaskDaily(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  deleteTaskDaily(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
