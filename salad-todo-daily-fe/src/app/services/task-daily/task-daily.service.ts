import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDaily } from 'src/app/models/TaskDaily';

@Injectable({
  providedIn: 'root'
})
export class TaskDailyService {
  baseUrl =
    'http://localhost:3000/task-daily';

  constructor(private http: HttpClient) {}

  getAllTaskDaily(){
    return this.http.get<TaskDaily[]>(this.baseUrl);
  }
}
