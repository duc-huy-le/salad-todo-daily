import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskDailyHistory } from 'src/app/models/TaskDailyHistory';

@Injectable({
  providedIn: 'root'
})
export class TaskDailyHistoryService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_INFO = 'TODO_DAILY_USER_INFO';
  baseUrl = 'http://localhost:3000/task-daily-history';
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

  addNewTaskDailyHistory(data: any) {
    return this.http.post<TaskDailyHistory>(this.baseUrl, data, this.requestOption);
  }

  deleteTaskDailyHistory(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.requestOption);
  }
}
