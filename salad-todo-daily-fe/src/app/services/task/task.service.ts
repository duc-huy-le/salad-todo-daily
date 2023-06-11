import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'http://localhost:3000/todo-task';

  constructor(private http: HttpClient) {}

  getAllTask() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addNewTask(data: any) {
    return this.http.post<Task>(this.baseUrl, data);
  }

  updateTask(id: any, data: any) {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, data);
  }

  updatePropTask(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  deleteTask(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
