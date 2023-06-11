import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDaily } from 'src/app/models/TaskDaily';

@Injectable({
  providedIn: 'root',
})
export class TaskDailyService {
  baseUrl = 'http://localhost:3000/task-daily';

  constructor(private http: HttpClient) {}

  getAllTaskDaily() {
    return this.http.get<TaskDaily[]>(this.baseUrl);
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
