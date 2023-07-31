import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_TOKEN } from 'src/app/constants/constants';
import { getRequestOption } from 'src/app/helpers/helper';
import { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'http://localhost:3000/task';

  constructor(private http: HttpClient) {}

  getAllTask() {
    return this.http.get<any>(this.baseUrl, getRequestOption());
  }

  addNewTask(data: any) {
    return this.http.post<Task>(this.baseUrl, data, getRequestOption());
  }

  updateTask(id: any, data: any) {
    return this.http.put<any>(
      `${this.baseUrl}/${id}`,
      data,
      getRequestOption()
    );
  }

  updatePropTask(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data, getRequestOption());
  }

  deleteTask(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
