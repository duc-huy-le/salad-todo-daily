import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { getRequestOption } from 'src/app/helpers/helper';
import { TaskDaily } from 'src/app/models/TaskDaily';

@Injectable({
  providedIn: 'root',
})
export class TaskDailyService {
  baseUrl = 'http://localhost:3000/task-daily';

  constructor(private http: HttpClient) {
  }

  getAllTaskDaily() {
    return this.http.get<any>(this.baseUrl, getRequestOption());
  }

  getAllTaskDailyToday() {
    return this.http.get<any>(`${this.baseUrl}/today`, getRequestOption());
  }

  addNewTaskDaily(data: any) {
    return this.http.post<TaskDaily>(this.baseUrl, data, getRequestOption());
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
