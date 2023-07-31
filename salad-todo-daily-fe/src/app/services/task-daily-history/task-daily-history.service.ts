import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { getRequestOption } from 'src/app/helpers/helper';
import { TaskDailyHistory } from 'src/app/models/TaskDailyHistory';

@Injectable({
  providedIn: 'root'
})
export class TaskDailyHistoryService {
  baseUrl = 'http://localhost:3000/task-daily-history';
  constructor(private http: HttpClient) {
  }

  addNewTaskDailyHistory(data: any) {
    return this.http.post<TaskDailyHistory>(this.baseUrl, data, getRequestOption());
  }

  deleteTaskDailyHistory(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`, getRequestOption());
  }
}
